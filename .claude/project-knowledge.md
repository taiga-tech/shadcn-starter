# 技術的知見・パターン

## Turborepo設定の理解

### タスク依存関係

- `build`: `^build` - 依存パッケージのビルド完了後に実行
- `test:e2e`: `build` - ビルド完了が前提（静的サイト必要）
- `lint`: `^lint` + `//#lint:ls` - パッケージのlintとファイル命名規則チェック

### キャッシュ戦略

- `dev`: キャッシュ無効（persistent: true）
- `build`: .next/** 出力（cache/**除く）+ storybook-static/\*\*
- `test:unit`: coverage/\*\* 出力

## ワークスペース間の依存関係パターン

### パッケージエクスポート構造

```typescript
// @workspace/ui のエクスポート
"./globals.css": "./src/styles/globals.css"
"./lib/*": "./src/lib/*.ts"
"./components/*": "./src/components/*.tsx"
"./hooks/*": "./src/hooks/*.ts"
```

### 共有設定パッケージ

- `@workspace/eslint-config`: base, next, react-internal, prettier-base
- `@workspace/typescript-config`: 共通TypeScript設定
- `@workspace/jest-config`: Jest設定テンプレート

## Next.js 15 + React 19 特有の考慮事項

### App Router必須パターン

- `app/` ディレクトリによるファイルベースルーティング
- Server Components優先、Client Componentsは最小限
- Server Actions によるサーバーサイド処理（API Routes非推奨）

### レンダリング戦略

```tsx
// Server Component（デフォルト）
async function ServerPage() {
    // サーバーでデータ取得
    const data = await fetchData()
    return <Component data={data} />
}

// Client Component（明示的に必要な場合のみ）
;('use client')
function ClientComponent() {
    // インタラクション・状態管理
}
```

## shadcn/ui 統合パターン

### コンポーネント追加フロー

1. `pnpm dlx shadcn@latest add [component] -c apps/web`
2. コンポーネントは `packages/ui/src/components/` に配置
3. 自動的に `@workspace/ui/components/[component]` でエクスポート

### カスタマイズパターン

```tsx
// class-variance-authority でバリアント管理
const buttonVariants = cva('inline-flex items-center justify-center', {
    variants: {
        variant: {
            default: 'bg-primary text-primary-foreground',
            destructive: 'bg-destructive text-destructive-foreground',
        },
        size: {
            default: 'h-10 px-4 py-2',
            sm: 'h-9 rounded-md px-3',
        },
    },
    defaultVariants: {
        variant: 'default',
        size: 'default',
    },
})
```

## テスト戦略の実装パターン

### テストタイプ別配置

```
__test__/
├── unit/          # 純粋関数・ユーティリティ
├── integration/   # コンポーネント統合テスト
└── e2e/           # Playwright E2Eテスト
```

### E2Eテスト前提条件

- ビルド完了必須（`pnpm build`）
- 静的サイト生成後のテスト実行

## パフォーマンス最適化パターン

### バンドル最適化

```tsx
// 動的インポートによる遅延読み込み
const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
    loading: () => <Skeleton />,
    ssr: false,
})
```

### メモ化の適切な使用

```tsx
// 重い計算のメモ化
const expensiveValue = useMemo(
    () => items.reduce((acc, item) => acc + item.value, 0),
    [items]
)

// イベントハンドラーのメモ化
const handleClick = useCallback(
    (id: string) => {
        onItemClick(id)
    },
    [onItemClick]
)
```

## 開発環境の最適化

### Turbopack統合

- Next.js 15のTurbopack使用（apps/web）
- 高速な開発サーバー起動
- HMR（Hot Module Replacement）の向上

### ESLint設定の階層化

```javascript
// ルートレベル: 基本設定
// パッケージレベル: 専用設定（React、Next.js等）
// ファイルレベル: 個別ルールオーバーライド
```

## よくある技術的問題と解決策

### 型エラーの解決パターン

1. `any`型使用は禁止 - 適切な型定義を作成
2. ESLintエラーはignoreせず根本解決
3. 型エラー発生時は作業完了前に必ず解決

### パッケージ間依存の管理

```json
// workspace:* パターンで内部パッケージ参照
{
    "dependencies": {
        "@workspace/ui": "workspace:*",
        "@workspace/eslint-config": "workspace:*"
    }
}
```

### ビルドエラーの対処

1. 型チェック: `pnpm check-types`
2. Lint実行: `pnpm lint`
3. 依存関係確認: pnpmワークスペース設定
4. Turboキャッシュクリア: `pnpm turbo clean`

## 拡張可能性のための設計

### 新しいアプリケーション追加

```
apps/
├── web/           # 既存Next.jsアプリ
├── docs/          # 既存Storybook
└── admin/         # 新しいアプリ（例）
```

### 新しい共有パッケージ追加

```
packages/
├── ui/            # UIコンポーネント
├── utils/         # 共通ユーティリティ（例）
└── config/        # 設定管理（例）
```
