#!/usr/bin/env bash
# Runs the Playwright suite in the pinned Linux image CI uses. Screenshots
# depend on the OS font stack, so baselines only hold inside this image: a
# macOS update once shifted text in 26 of them with no code change.
# amd64 even on Apple silicon, to render exactly like the CI runner.
set -euo pipefail

IMAGE='mcr.microsoft.com/playwright:v1.63.0-noble@sha256:eff16c30e6f3f4af0a03fa4b706120d5e9b0891c344a27d64559aff5900a4a27'

cd "$(dirname "$0")/../.."

# Named volumes keep Linux node_modules, the Prisma client and the build
# separate from the host's macOS copies in the same checkout.
exec docker run --rm --init --ipc=host --platform linux/amd64 \
  -v "$PWD":/work -w /work \
  -v portfolio-visual-node-modules:/work/node_modules \
  -v portfolio-visual-generated:/work/generated \
  -v portfolio-visual-next:/work/.next-visual \
  -v portfolio-visual-pnpm-store:/pnpm-store \
  -e VISUAL_DOCKER=1 \
  -e COREPACK_ENABLE_DOWNLOAD_PROMPT=0 \
  -e pnpm_config_store_dir=/pnpm-store \
  "$IMAGE" bash -c '
    git config --global --add safe.directory /work
    corepack enable >/dev/null
    pnpm install --frozen-lockfile --prefer-offline >/dev/null
    pnpm exec playwright test "$@"
  ' bash "$@"
