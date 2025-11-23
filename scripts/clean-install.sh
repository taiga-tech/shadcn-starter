#!/bin/bash

# プロジェクト内のnode_modulesと.turboディレクトリを削除するスクリプト

set -e

echo "🧹 Cleaning project dependencies and cache..."

# プロジェクトルートのnode_modules削除
if [ -d "node_modules" ]; then
  echo "  📦 Removing root node_modules..."
  rm -rf node_modules
fi

# .turboディレクトリ削除
if [ -d ".turbo" ]; then
  echo "  🚀 Removing .turbo cache..."
  rm -rf .turbo
fi

# apps配下のnode_modules削除
find apps -name "node_modules" -type d -exec rm -rf {} + 2>/dev/null || true

# packages配下のnode_modules削除
find packages -name "node_modules" -type d -exec rm -rf {} + 2>/dev/null || true

# .turboディレクトリを再帰的に削除
find . -name ".turbo" -type d -exec rm -rf {} + 2>/dev/null || true

echo "✅ Cleanup completed!"
echo "💡 Run 'pnpm install' to reinstall dependencies"

pnpm install
