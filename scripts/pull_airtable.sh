#!/usr/bin/env bash
#
# Pull the latest Posters data from Airtable: fetch records, download poster
# images into public/posters/, and rewrite src/app/stuff/posters.json.
#
# Requires AIRTABLE_TOKEN in .env.local (see scripts/fetch-airtable.mjs).
#
# Usage:
#   ./scripts/pull_airtable.sh

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

npm run fetch:airtable
