#!/usr/bin/env bash
# Copy the simulation engines, their styles, their language strings (as JSON) and the teacher guides (as HTML)
# from filter_aisim (the single source) into vendor/aisim.
#   bash scripts/sync-aisim.sh [path-to-moodle-filter_aisim]
set -euo pipefail
here="$(cd "$(dirname "$0")/.." && pwd)"
src="${1:-$here/../moodle-filter_aisim}"
dst="$here/vendor/aisim"
rm -rf "$dst" && mkdir -p "$dst/sims"
cp "$src"/amd/src/sims/*.js "$dst/sims/"
cp "$src/styles.css" "$dst/styles.css"
node "$here/scripts/lang2json.mjs" "$src" "$dst/strings"
node "$here/scripts/md2html.mjs" "$src" "$dst/guide"
echo "filter_aisim $(git -C "$src" describe --tags --always 2>/dev/null || echo '?')" > "$dst/VERSION"
echo "synced from $src ($(cat "$dst/VERSION"))"
