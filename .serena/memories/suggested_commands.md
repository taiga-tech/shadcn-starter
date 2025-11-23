# 推奨コマンド

## 開発・ビルド

### 基本的な開発コマンド

```bash
pnpm dev                    # 全開発サーバー起動
pnpm build                  # 全アプリケーションビルド
pnpm preview-storybook      # ビルド済みStorybookプレビュー
```

### テスト実行

```bash
pnpm test                   # 全テスト実行
pnpm test:unit              # ユニットテストのみ
pnpm test:integration       # インテグレーションテストのみ
pnpm test:e2e              # E2Eテスト（ビルド必須）
pnpm test:all              # 全テストタイプ実行
```

### コード品質チェック

```bash
pnpm lint                   # 全パッケージESLint実行
pnpm lint:ls               # ファイル命名規則チェック
pnpm check-types           # TypeScript型チェック
pnpm format                # Prettierフォーマット
```

## shadcn/ui コンポーネント管理

### コンポーネント追加

```bash
# Webアプリにコンポーネントを追加
pnpm dlx shadcn@latest add button -c apps/web
pnpm dlx shadcn@latest add card -c apps/web
```

## バージョン管理・リリース

### リリース管理

```bash
pnpm changeset              # チェンジセット作成
pnpm version-packages       # パッケージバージョン更新
pnpm release               # パッケージ公開
```

## ユーティリティ

### プロジェクト管理

```bash
pnpm generate:graph         # 依存関係グラフ生成（graph.svg）
pnpm generate:index         # インデックスファイル生成
pnpm clean-install         # 依存関係クリーンインストール
pnpm update-deps           # 依存関係更新
```

### タスク管理

```bash
pnpm task-master           # AIタスク管理ツール
```

## Git・システムコマンド（macOS）

### 基本的なシステムコマンド

```bash
ls -la                     # ファイル・ディレクトリ一覧
find . -name "*.tsx"       # ファイル検索
grep -r "pattern" src/     # パターン検索
cd <directory>             # ディレクトリ移動
```

### Git操作

```bash
git status                 # 作業ディレクトリ状態
git add .                  # 全変更をステージング
git commit -m "message"    # コミット
git push                   # プッシュ
git log --oneline         # コミット履歴
```

## 実行順序の推奨

### タスク完了時の品質チェック

```bash
pnpm check-types          # 1. 型チェック
pnpm lint                 # 2. ESLintチェック
pnpm test                 # 3. テスト実行
pnpm build                # 4. ビルド確認
```
