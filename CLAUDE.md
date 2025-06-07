# CLAUDE.md

このファイルは、Claude Code (claude.ai/code) がこのリポジトリで作業する際のガイダンスを提供します。

## プロジェクト構造

shadcn/ui コンポーネント用のモノレポテンプレートです：

- **Turborepo** - ビルドオーケストレーション
- **pnpm** + ワークスペース - パッケージ管理
- **Next.js 15** + **React 19** - Webアプリケーション（apps/web）
- **Storybook** - コンポーネントドキュメント（apps/docs）
- **共有パッケージ** - 再利用可能な設定とUIコンポーネント

### アプリケーション

- `apps/web/` - Next.js + React 19 + Turbopack
- `apps/docs/` - Storybook コンポーネントドキュメント

### パッケージ

- `packages/ui/` - shadcn/ui + Tailwind CSS 共有UIコンポーネント
- `packages/eslint-config/` - 共有 ESLint 設定
- `packages/typescript-config/` - 共有 TypeScript 設定
- `packages/jest-config/` - 共有 Jest 設定

## 開発コマンド

### 開発・ビルド

```bash
pnpm dev                    # 全開発サーバー起動
pnpm build                  # 全アプリケーションビルド
pnpm preview-storybook      # ビルド済みStorybookプレビュー
```

### テスト

```bash
pnpm test                   # 全テスト実行
pnpm test:unit              # ユニットテストのみ
pnpm test:integration       # インテグレーションテストのみ
pnpm test:e2e               # E2Eテスト（ビルド必須）
pnpm test:all               # 全テストタイプ実行
```

### コード品質

```bash
pnpm lint                   # 全パッケージESLint実行
pnpm lint:ls                # ファイル命名規則チェック
pnpm check-types            # TypeScript型チェック
pnpm format                 # Prettierフォーマット
```

### その他

```bash
pnpm changeset              # バージョニング用チェンジセット作成
pnpm version-packages       # パッケージバージョン更新
pnpm coupling-graph         # 依存関係グラフ生成（graph.svg）
pnpm generate:index         # インデックスファイル生成
```

## shadcn/ui コンポーネント追加

Webアプリにコンポーネントを追加：

```bash
pnpm dlx shadcn@latest add button -c apps/web
```

コンポーネントは `packages/ui/src/components/` に配置され、以下のようにインポート：

```tsx
import { Button } from '@workspace/ui/components/button'
```

## コードアーキテクチャ

### ワークスペース構造

- pnpm ワークスペースと `@workspace/*` パッケージ名を使用
- 共有設定は `packages/` に集約
- UIコンポーネントは class-variance-authority でバリアント管理
- Tailwind CSS 設定は UI パッケージ経由で共有

### インポート順序

Prettier が自動的に以下の順序でインポートをソート：

1. React, Next.js
2. サードパーティモジュール
3. `@/lib`, `@/metadata`, `@/const`
4. その他エイリアスパス (`@/providers`, `@/atoms`)
5. スタイル関連インポート (`@/styles`, `.css`)
6. 相対パス (`./`, `../`)

### テスト戦略

- **ユニットテスト**: `__test__/unit/` - 純粋関数・コンポーネントテスト
- **インテグレーションテスト**: `__test__/integration/` - コンポーネント統合
- **E2Eテスト**: Playwright使用、ビルドステップが必要
- **Jest設定**: `@workspace/jest-config` で共有

### コンポーネント開発

- UIコンポーネント: `packages/ui/src/components/`
- Radix UIプリミティブとカスタムスタイリング使用
- next-themes によるテーマサポート
- コンポーネントストーリー: `apps/docs/stories/`

## Next.js 開発原則

### 1. コア原則

- **App Router** を標準採用
- **TypeScript 必須**（ESLint/型エラーは常にゼロ）
    - ESLintエラーが発生した場合はignoreせず根本的な解決をする
- **API Routes** は使用しない - すべてのサーバー処理は Server Actions で実装

### 2. ディレクトリレイアウト（apps/web/src内）

```
app/         # ルーティング & ページ
components/  # 汎用UI（再利用可能・ロジックなし）
lib/         # ユーティリティ関数
hooks/       # カスタムフック
const/       # 定数（このプロジェクトではsns.tsが存在）
```

- **専用コンポーネント**: 対応する page.tsx と同階層に配置
- **汎用コンポーネント**: components/ または packages/ui/ に配置

### 3. データハンドリング

| 依存条件                 | 実装方法                                    |
| ------------------------ | ------------------------------------------- |
| ユーザー操作に依存しない | Server Components + Server Actions          |
| ユーザー操作に依存する   | Client Components + Server Actions + useSWR |

- 更新は Server Actions、即時反映は useSWR.mutate で楽観的更新

### 4. UI・状態管理

- **UI**: shadcn/ui コンポーネントを優先使用
- **アイコン**: lucide-react を統一使用（このプロジェクトで既に導入済み）
- **グローバル状態**: ライブラリは使用しない（必要時は React Context + useReducer）

### 5. パフォーマンス

- `use client` / `useEffect` / `useState` は最小限、まず RSC
- クライアント側は Suspense でフォールバック
- 動的 import で遅延読み込み
- 画像は next/image、リンクは next/link
- ルートベースのコード分割を徹底

### 6. フォーム・バリデーション

- 制御コンポーネント + react-hook-form
- スキーマ検証は Zod（packages/ui で既に導入済み）
- クライアント/サーバー両方で入力チェック

### 7. 品質・セキュリティ

#### エラーハンドリング

- ガード節で早期 return、成功パスは最後にまとめる

#### アクセシビリティ

- セマンティック HTML + ARIA、キーボード操作サポート

#### Server Actions セキュリティ

- ユーザーが許可された操作だけを Server Action として実装
- 汎用的・多目的なサーバー関数は実装しない

## コードスタイル規則

- セミコロンなし (`semi: false`)
- シングルクォート (`singleQuote: true`)
- 行長制限 80文字
- インデント 2スペース（一部ファイルタイプは4スペース）
- ES5 形式の末尾コンマ
- Tailwind クラスは自動ソート
- インポート文は自動ソート・グループ化

## 実装フロー

1. **設計**: コア原則とディレクトリ構造決定
2. **データ**: Server Components/Actions + useSWR パターン確立
3. **UI**: shadcn/ui + lucide-react 使用
4. **パフォーマンス**: RSC・Suspense・dynamic import で最適化
5. **フォーム**: Zod × react-hook-form
6. **品質管理**: エラー処理 → アクセシビリティ → テスト
