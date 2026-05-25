#!/usr/bin/env bash
set -euo pipefail

REMOTE_URL=${1:-https://github.com/sanchitbajpai/Workspace.git}
BRANCH=${2:-main}
FORCE=${3:-}

echo "Working in: $(pwd)"

if [ ! -d .git ]; then
  git init
  echo "Initialized empty git repository"
fi

git add . || true

if [ -n "$(git status --porcelain)" ]; then
  git commit -m "Initial commit" || true
  echo "Created commit"
else
  echo "No changes to commit"
fi

if git remote get-url origin >/dev/null 2>&1; then
  git remote remove origin || true
fi
git remote add origin "$REMOTE_URL"
echo "Set remote origin to $REMOTE_URL"

if [ "$FORCE" = "--force" ] || [ "$FORCE" = "-f" ]; then
  git push -u origin "$BRANCH" --force
else
  git push -u origin "$BRANCH"
fi

echo "Done"