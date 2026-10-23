#!/usr/bin/env bash
# Deploy del sitio de Nexus (nexus.wefaber.net).
#
#   deploy/site-deploy.sh            publica dist/ como release nueva
#   deploy/site-deploy.sh rollback   vuelve a la release anterior
#   deploy/site-deploy.sh status     release activa y lista de releases
#
# Cada deploy copia dist/ a $SITE_DIR/releases/<commit> y mueve el symlink
# $SITE_DIR/current de forma atómica (ln + mv -T). nginx sirve $SITE_DIR/current, así que
# no hay corte ni recarga de nginx. Se conservan las últimas $KEEP releases.
#
# Variables:
#   SITE_DIR   raíz del sitio en el VPS (default /srv/nexus-site)
#   KEEP       releases que se conservan (default 5)
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
SITE_DIR="${SITE_DIR:-/srv/nexus-site}"
KEEP="${KEEP:-5}"
RELEASES="$SITE_DIR/releases"
CURRENT="$SITE_DIR/current"
CMD="${1:-deploy}"

die() { printf '\nERROR: %s\n' "$*" >&2; exit 1; }
ok()  { printf '    ok    %s\n' "$*"; }

activar() {
  local destino="$1"
  ln -sfn "$destino" "$CURRENT.tmp"
  mv -Tf "$CURRENT.tmp" "$CURRENT"
  ok "activa: $(basename "$destino")"
}

case "$CMD" in
  deploy)
    [ -f "$ROOT/dist/index.html" ] || die "No hay dist/index.html: corré bun run build antes."
    tag="$(git -C "$ROOT" rev-parse --short=12 HEAD 2>/dev/null || date -u +%Y%m%d%H%M%S)"
    mkdir -p "$RELEASES"
    destino="$RELEASES/$tag"
    rm -rf "$destino.tmp"
    cp -a "$ROOT/dist" "$destino.tmp"
    rm -rf "$destino"
    mv "$destino.tmp" "$destino"
    ok "copiada release $tag"
    activar "$destino"
    # Poda: conserva las $KEEP más recientes, nunca la activa.
    activa="$(readlink -f "$CURRENT")"
    ls -1dt "$RELEASES"/*/ 2>/dev/null | tail -n +"$((KEEP + 1))" | while read -r vieja; do
      [ "$(readlink -f "$vieja")" = "$activa" ] && continue
      rm -rf "$vieja"
    done
    ;;
  rollback)
    activa="$(readlink -f "$CURRENT" 2>/dev/null || true)"
    anterior="$(ls -1dt "$RELEASES"/*/ 2>/dev/null | while read -r r; do
      [ "$(readlink -f "$r")" != "$activa" ] && { readlink -f "$r"; break; }
    done)"
    [ -n "$anterior" ] || die "No hay release anterior en $RELEASES"
    activar "$anterior"
    ;;
  status)
    printf 'activa: %s\n' "$(readlink -f "$CURRENT" 2>/dev/null || echo ninguna)"
    ls -1dt "$RELEASES"/*/ 2>/dev/null || true
    ;;
  *) die "Comando desconocido: $CMD (deploy | rollback | status)" ;;
esac
