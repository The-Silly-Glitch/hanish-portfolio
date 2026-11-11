#!/usr/bin/env bash
# Deploy the portfolio Worker and keep the custom domains attached.
# Usage: ./scripts/deploy-site.sh  (run from the repo root, after `npm run build`)
set -euo pipefail
cd "$(dirname "$0")/.."
python3 - <<'EOF'
import json
p = 'dist/server/wrangler.custom.json'
cfg = json.load(open('dist/server/wrangler.json'))
cfg['name'] = 'hanish-portfolio'
cfg['routes'] = [
    {'pattern': 'the-silly-glitch.tech', 'custom_domain': True},
    {'pattern': 'www.the-silly-glitch.tech', 'custom_domain': True},
]
json.dump(cfg, open(p, 'w'), indent=2)
print('wrote', p)
EOF
npx wrangler deploy --config dist/server/wrangler.custom.json
