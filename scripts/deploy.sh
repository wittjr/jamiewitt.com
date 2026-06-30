#!/usr/bin/env bash
#
# Build the static site and upload it to the web host over SSH (rsync).
#
# Usage:
#   ./scripts/deploy.sh            # build + upload
#   ./scripts/deploy.sh --no-build # upload the existing out/ without rebuilding
#
# Configuration lives in scripts/.env.deploy (gitignored). Copy the example:
#   cp scripts/.env.deploy.example scripts/.env.deploy
# then fill in your server details.

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

CONFIG_FILE="scripts/.env.deploy"
if [[ ! -f "$CONFIG_FILE" ]]; then
  echo "ERROR: $CONFIG_FILE not found." >&2
  echo "Create it with:  cp scripts/.env.deploy.example $CONFIG_FILE" >&2
  exit 1
fi
# shellcheck disable=SC1090
source "$CONFIG_FILE"

# Required settings
: "${HOST:?Set HOST in $CONFIG_FILE (a hostname or an SSH config alias)}"
: "${REMOTE_DIR:?Set REMOTE_DIR (the site root on the server) in $CONFIG_FILE}"
# SSH_USER/PORT are optional — omit them when HOST is an SSH config alias.
# (Note: this is SSH_USER, not USER — USER is a standard shell env var that is
# always set, which would otherwise override the user baked into the alias.)
SSH_USER="${SSH_USER:-}"
PORT="${PORT:-}"

# 1. Build the static export (Next.js writes to out/)
if [[ "${1:-}" != "--no-build" ]]; then
  echo "==> Building static site..."
  npm run build
fi

if [[ ! -d out ]]; then
  echo "ERROR: out/ does not exist. Run a build first." >&2
  exit 1
fi

# 2. Upload via rsync over SSH — only changed files are transferred, and
#    --delete removes files on the server that no longer exist locally.
SSH_PORT_OPT=()
[[ -n "$PORT" ]] && SSH_PORT_OPT=(-e "ssh -p $PORT")
# With an SSH config alias, SSH_USER is left blank and ssh resolves it.
REMOTE_TARGET="${HOST}"
[[ -n "$SSH_USER" ]] && REMOTE_TARGET="${SSH_USER}@${HOST}"
echo "==> Uploading out/ to ${REMOTE_TARGET}:${REMOTE_DIR} via rsync/SSH..."
rsync -avz --delete ${SSH_PORT_OPT[@]+"${SSH_PORT_OPT[@]}"} out/ "${REMOTE_TARGET}:${REMOTE_DIR}/"

echo "==> Done. https://jamiewitt.com should now be updated."
