# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.
回答は必ず日本語で行ってください。
serena mcpを積極的に使用して下さい。

## 詳細な知識管理

このプロジェクトでは `.claude/` ディレクトリに体系的な知識管理システムを構築しています：

- **`.claude/context.md`** - プロジェクトの背景・制約・位置づけ
- **`.claude/project-knowledge.md`** - 技術的知見・アーキテクチャパターン
- **`.claude/common-patterns.md`** - 頻用コマンドパターン・実用的な操作例
- **`.claude/project-improvements.md`** - 改善履歴・教訓
- **`.claude/debug-log.md`** - 重要なデバッグ記録・トラブルシューティング

作業開始時は、これらのファイルを参照して詳細な背景知識を確認してください。

**重要**: 新しい実装や重要な決定を行った際は、該当するファイルを更新してください。知識の継続的な蓄積により、将来の開発効率と品質が向上します。

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
- `packages/e2e-web/` - Webアプリケーション用E2Eテスト（Playwright）
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
pnpm test:e2e               # E2Eテスト（開発サーバーで実行）
pnpm test:all               # 全テストタイプ実行
```

### コード品質

```bash
pnpm lint                   # 全パッケージESLint実行
pnpm lint:ls                # ファイル命名規則チェック
pnpm check-types            # TypeScript型チェック
pnpm format                 # Prettierフォーマット
```

### バージョン管理・ユーティリティ

```bash
pnpm changeset              # バージョニング用チェンジセット作成
pnpm version-packages       # パッケージバージョン更新
pnpm release                # パッケージ公開
pnpm generate:graph         # 依存関係グラフ生成（graph.svg）
pnpm clean-install          # 依存関係クリーンインストール
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
- **E2Eテスト**: `packages/e2e-web/` - Playwright使用、開発サーバーで実行
- **Jest設定**: `@workspace/jest-config` で共有

#### テスト指針

- **画面**: Playwright で E2Eテスト（`packages/e2e-web/` - 開発サーバーで実行）
- **コンポーネント**: Storybook でビジュアル・インタラクションテスト
- **ユーティリティ関数**: Jest でユニットテスト（`lib/` 内の関数）
- **Server Actions**: Jest でユニットテスト（入力/出力・エラーハンドリング）
- **ビジネスロジック**: Jest でユニットテスト（純粋関数・カスタムフック）

### コンポーネント開発

- UIコンポーネント: `packages/ui/src/components/`
- Radix UIプリミティブとカスタムスタイリング使用
- next-themes によるテーマサポート
- コンポーネントストーリー: `apps/docs/stories/`

## Next.js 開発原則

### 1. コア原則

- **App Router** を標準採用
- **TypeScript 必須**（ESLint/型エラーは常にゼロ）
    - any型の使用は避けて下さい
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
- **URL 状態** nuqs に統一

### 5. パフォーマンス

- `use client` / `useEffect` / `useState` は最小限、まず RSC
- クライアント側は Suspense でフォールバック
- 動的 import で遅延読み込み
- 画像は next/image、リンクは next/link
- ルートベースのコード分割を徹底
- 1ファイルの行数は 300 行以下を目安
- できるだけコンポーネントを小さく保つ

#### メモ化と定数の最適化

**定数・固定値の配置:**

- **コンポーネント外**: 依存関係がない配列、オブジェクト、文字列定数
- **別ファイル**: 複数コンポーネントで使用する定数は `const/` ディレクトリ
- **コンポーネント内**: props や state に依存する動的な値のみ

```tsx
// ❌ Bad: 毎回新しいオブジェクトを作成
const Component = () => {
  const options = { style: 'solid', size: 'lg' }
  return <Button {...options} />
}

// ✅ Good: コンポーネント外に定義
const BUTTON_OPTIONS = { style: 'solid', size: 'lg' }
const Component = () => {
  return <Button {...BUTTON_OPTIONS} />
}
```

**メモ化の適用指針:**

- **useMemo**: 重い計算結果、複雑なオブジェクト/配列の生成
- **useCallback**: 子コンポーネントに渡すイベントハンドラー
- **React.memo**: レンダリングコストが高いコンポーネント

```tsx
// ✅ Good: 重い計算をメモ化
const expensiveValue = useMemo(() => {
    return items.reduce((acc, item) => acc + item.value, 0)
}, [items])

// ✅ Good: イベントハンドラーをメモ化
const handleClick = useCallback(
    (id: string) => {
        onItemClick(id)
    },
    [onItemClick]
)

// ❌ Bad: 不要なメモ化
const simpleValue = useMemo(() => 'static string', []) // 定数なのでコンポーネント外へ
```

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

### className の結合

- **必須**: `cn()` 関数を使用してclassNameを結合する
- テンプレートリテラル（`${}`）による文字列結合は使用しない
- `cn()` は `@workspace/ui/lib/utils` からインポート

```tsx
// ❌ Bad: テンプレートリテラルを使用
className={`${baseClass} ${conditionalClass}`}

// ✅ Good: cn()関数を使用
className={cn(baseClass, conditionalClass)}

// ✅ Good: 条件付きクラス
className={cn(
  'base-class',
  isActive && 'active-class',
  variant === 'primary' ? 'primary-class' : 'secondary-class'
)}
```

## 実装フロー

1. **設計**: コア原則とディレクトリ構造決定
2. **データ**: Server Components/Actions + useSWR パターン確立
3. **UI**: shadcn/ui + lucide-react 使用
4. **パフォーマンス**: RSC・Suspense・dynamic import で最適化
5. **フォーム**: Zod × react-hook-form
6. **品質管理**: エラー処理 → アクセシビリティ → テスト

## 注意事項

- **Node.js要件**: 20以上必須
- **パッケージマネージャー**: pnpm@10.12.1+使用（npmやyarnは使用不可）
- **Huskyプリコミットフック**: 有効化済み（`pnpm prepare`で初期化）
- **型エラー**: 作業完了前に必ず解決（`pnpm check-types`で確認）
- **ESLintエラー**: ignoreでの回避禁止、根本的解決必須
