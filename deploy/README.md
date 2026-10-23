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

## Cómo está repartido hoy (hecho el 2026-10-23)

- `nexus.wefaber.net` → este sitio, público, sin Cloudflare Access.
- `gravida.wefaber.net` → el producto (gravida en Podman, front en `127.0.0.1:18080`),
  detrás de Cloudflare Access (app `0b676246-247e-4796-82e6-3f42a44ee5b0`).
- Las rutas viejas del producto en el dominio del sitio (`/login.php`, `/pages/`,
  `/api/`, `/js/`, `/css/`, `/images/`, `/uploads/`, `*.php`) redirigen con 301 a
  `gravida.wefaber.net`. La referencia del vhost es `deploy/nginx/nexus.wefaber.net.conf`.

## Por qué el producto no quedó en app.nexus.wefaber.net

La zona `wefaber.net` está en plan Free. El Universal SSL cubre `wefaber.net` y
`*.wefaber.net`: un solo nivel. Un host de dos niveles (`app.nexus.wefaber.net`) no
recibe certificado en el edge de Cloudflare y el handshake falla antes de llegar al
origen. Crear un certificate pack avanzado por API devuelve `503 1401` porque requiere
Advanced Certificate Manager (pago), y `total_tls` no existe como setting en la zona.

Consecuencia práctica: **ningún subdominio de dos niveles** bajo `wefaber.net` va a
funcionar con HTTPS mientras la zona siga en Free. Si hace falta uno, la salida gratis
es un nombre de un solo nivel (`algo.wefaber.net`).

Si en algún momento se activa ACM o Total TLS, los pasos para retomar la idea original:

1. **DNS:** CNAME `app.nexus` → `wefaber.net`, proxied.
2. **Access:** agregar `app.nexus.wefaber.net` a la aplicación del producto.
3. **Certificado de origen:** `certbot certonly --dns-cloudflare --dns-cloudflare-credentials
   /home/hermes/apolo/config/cloudflare.ini --dns-cloudflare-propagation-seconds 30
   -d app.nexus.wefaber.net --key-type ecdsa`.
4. **nginx:** copiar `deploy/nginx/app.nexus.wefaber.net.conf` a
   `/etc/nginx/sites-available/`, symlink en `sites-enabled/`, `nginx -t` y reload.
5. Cambiar el 301 de `deploy/nginx/nexus.wefaber.net.conf` de `gravida.wefaber.net` a
   `app.nexus.wefaber.net`.

## Notas del VPS

- El vhost usa el snippet `cloudflare-edge-gate.conf` (`$cf_edge_allowed`) y no
  `allow/deny`: con `cloudflare-realip.conf` activo, `$remote_addr` es la IP real del
  cliente y un `allow/deny` devuelve 403 a todo el mundo después del login de Access.
- El gate de origen deja pasar solo conexiones que vengan del edge de Cloudflare o de
  loopback. Además hay `listen 127.0.0.1:443` para probar el vhost sin pasar por el edge:
  `curl --resolve nexus.wefaber.net:443:127.0.0.1 https://nexus.wefaber.net/`.
- El include `snippets/wellknown.conf` mantiene `security.txt` y `llms.txt` vivos en el
  vhost (corta el soft-404 del SPA).
- Los backup del vhost anterior quedan en `/etc/nginx/sites-available/nexus.wefaber.net.bak-*`.
