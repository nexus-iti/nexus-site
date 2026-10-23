# Deploy

`nexus.wefaber.net` sirve este sitio estático desde el VPS. nginx del host apunta a
`/srv/nexus-site/current`, un symlink a la última release.

Cada push a `main` dispara `.github/workflows/deploy.yml` en el runner self-hosted
`vps-nexus`. El workflow corre `bun install`, `oxlint` y `vite build`, y después
`deploy/site-deploy.sh`. El script copia `dist/` a `releases/<commit>` y mueve el
symlink de forma atómica, sin corte y sin recargar nginx.

```bash
bash deploy/site-deploy.sh status     # release activa y releases guardadas
bash deploy/site-deploy.sh rollback   # vuelve a la release anterior
```

## Mudanza: el producto pasa a app.nexus.wefaber.net

Hasta ahora `nexus.wefaber.net` servía gravida (Podman, front en `127.0.0.1:18080`,
detrás de Cloudflare Access). Para que el producto no quede caído en ningún
momento, seguí este orden.

### 1. Una sola vez en el VPS (root)

```bash
sudo mkdir -p /srv/nexus-site/releases
sudo chown -R hermes:hermes /srv/nexus-site
sudo chmod 755 /srv/nexus-site
```

El runner `vps-nexus` tiene que estar disponible para este repo. Si hoy está
registrado solo en `gravida`, movelo a un runner group de la org `nexus-iti` que
incluya `nexus-site`, o registrá otro runner con la label `vps-nexus`.

### 2. Primer deploy del sitio

Hacé push a `main`, o corré el workflow a mano. El sitio queda en
`/srv/nexus-site/current`, pero todavía nadie lo sirve.

### 3. Levantar app.nexus.wefaber.net (el producto sigue en el dominio viejo)

1. **Cloudflare DNS:** agregá `app.nexus` con el mismo destino que `nexus` hoy, en
   modo proxied.
2. **Cloudflare Access:** agregá `app.nexus.wefaber.net` a la aplicación de Access
   del producto, con la misma política.
3. **Certificado:** si el cert actual no cubre `app.nexus.wefaber.net`, emitilo.
4. **nginx:** creá el bloque de `app.nexus.wefaber.net` copiando el bloque actual.
   La referencia está en `deploy/nginx/app.nexus.wefaber.net.conf`.
5. Corré `sudo nginx -t && sudo systemctl reload nginx`. Probá
   `https://app.nexus.wefaber.net`: login, CSRF y subida de fotos.

### 4. Cambiar nexus.wefaber.net al sitio

1. **nginx:** reemplazá el bloque de `nexus.wefaber.net` por
   `deploy/nginx/nexus.wefaber.net.conf`, conservando las líneas de TLS. Las rutas
   viejas del producto (`/login.php`, `/pages/`, `/api/`...) redirigen con 301 a la app.
2. Corré `sudo nginx -t && sudo systemctl reload nginx`.
3. **Cloudflare Access:** sacá `nexus.wefaber.net` de la aplicación de Access. El
   sitio es público; la app sigue protegida en su subdominio.

### 5. Después

- En `gravida`, actualizá las menciones a `nexus.wefaber.net` (están en
  `deploy/README.md`, `.github/workflows/deploy.yml` y `README.md`).
- El healthcheck de gravida usa `127.0.0.1:18080`, así que no cambia.
