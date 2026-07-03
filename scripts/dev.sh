#!/usr/bin/env bash
#
# Start the local Next.js dev server (http://localhost:3000).
#
# Usage:
#   ./scripts/dev.sh

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

npm run dev
