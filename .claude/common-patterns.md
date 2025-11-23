# 頻用コマンドパターン

## 日常的な開発フロー

### 開発開始

```bash
# 依存関係の確認・インストール
pnpm install

# 開発サーバー起動（全アプリケーション）
pnpm dev

# 特定のアプリのみ起動
turbo dev --filter=web
turbo dev --filter=docs
```

### コード品質チェック

```bash
# 基本的な品質チェックセット
pnpm check-types && pnpm lint && pnpm test:unit

# 完了前の必須チェック
pnpm build && pnpm test:all
```

## テスト実行パターン

### 開発中のテスト

```bash
# 高速フィードバックループ
pnpm test:unit

# 特定ファイルのテスト
turbo test:unit --filter=web -- --testPathPattern=components/button

# テスト監視モード
turbo test:unit --filter=web -- --watch
```

### リリース前のテスト

```bash
# E2Eテスト（開発サーバーで実行）
pnpm test:e2e

# 全テスト実行
pnpm test:all

# 独立したE2Eテストパッケージでの直接実行
cd packages/e2e-web
pnpm test:e2e
```

## shadcn/ui コンポーネント管理

### 新しいコンポーネント追加

```bash
# 利用可能コンポーネント確認
pnpm dlx shadcn@latest list

# コンポーネント追加
pnpm dlx shadcn@latest add button -c apps/web
pnpm dlx shadcn@latest add form -c apps/web

# 複数コンポーネント同時追加
pnpm dlx shadcn@latest add button form input -c apps/web
```

### Storybook でのコンポーネント確認

```bash
# Storybook開発サーバー
turbo dev --filter=docs

# Storybookビルド・プレビュー
turbo build --filter=docs
pnpm preview-storybook
```

## ビルド・デプロイパターン

### 段階的ビルド

```bash
# 依存関係のみビルド
turbo build --filter=ui

# 特定アプリのビルド
turbo build --filter=web
turbo build --filter=docs

# 全体ビルド
pnpm build
```

### ビルドの最適化

```bash
# キャッシュクリア後のクリーンビルド
turbo clean
pnpm build

# 並列ビルドの活用
turbo build --parallel
```

## エラー対応パターン

### 型エラー解決

```bash
# 型エラー特定
pnpm check-types

# 特定パッケージの型チェック
turbo check-types --filter=ui
turbo check-types --filter=web
```

### ESLintエラー解決

```bash
# ESLintエラー確認
pnpm lint

# 自動修正可能エラーの修正
pnpm lint --fix

# 特定ファイルのlint
turbo lint --filter=web -- src/components/button.tsx
```

### 依存関係の問題解決

```bash
# 依存関係のクリーンインストール
pnpm clean-install

# パッケージ整合性チェック
pnpm install --frozen-lockfile

# workspace依存関係の確認
pnpm list --depth=0
```

## パフォーマンス分析

### バンドル分析

```bash
# Next.jsバンドル分析
ANALYZE=true pnpm build

# 依存関係グラフ生成
pnpm generate:graph
```

### 開発効率の向上

```bash
# 高速な型チェック（増分）
turbo check-types

# 変更されたパッケージのみテスト
turbo test --filter="[HEAD^1]"

# 影響範囲を限定したlint
turbo lint --filter="[HEAD^1]"
```

## ファイル・ディレクトリ管理

### インデックスファイル生成

```bash
# 自動インデックスファイル生成
pnpm generate:index
```

### ファイル命名規則チェック

```bash
# ls-lintによる命名規則チェック
pnpm lint:ls
```

## バージョン管理

### Changeset管理

```bash
# 変更セット作成
pnpm changeset

# バージョン更新
pnpm version-packages

# リリース（publish）
pnpm release
```

## デバッグ・調査

### 設定確認

```bash
# Turbo設定確認
turbo run build --dry-run

# pnpmワークスペース確認
pnpm -r list

# 依存関係ツリー表示
pnpm why package-name
```

### ログ・詳細表示

```bash
# 詳細ログ付きビルド
turbo build --verbosity=2

# キャッシュ情報表示
turbo build --summarize
```

## 環境別の設定

### 開発環境

```bash
# 開発専用の高速ビルド
NODE_ENV=development pnpm build

# ホットリロード有効化
pnpm dev
```

### 本番環境準備

```bash
# 本番ビルド
NODE_ENV=production pnpm build

# 最適化されたテスト実行
CI=true pnpm test:all
```

## よく使うコマンド組み合わせ

### コード変更後の確認

```bash
pnpm check-types && pnpm lint && pnpm test:unit && pnpm build
```

### 新機能開発完了時

```bash
pnpm format && pnpm lint --fix && pnpm test:all
```

### E2Eテスト専用コマンド

```bash
# 特定のE2Eテストファイルを実行
cd packages/e2e-web
pnpm test:e2e -- tests/specific-test.e2e-spec.ts

# E2Eテストのデバッグモード
cd packages/e2e-web
pnpm test:e2e -- --debug

# E2EテストのUIモード
cd packages/e2e-web
pnpm test:e2e -- --ui
```

### トラブルシューティング

```bash
pnpm clean-install && pnpm build && pnpm test:all
```
