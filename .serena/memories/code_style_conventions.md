# コードスタイル・規約

## Prettierフォーマット設定

### 基本設定

- **セミコロンなし**: `semi: false`
- **シングルクォート**: `singleQuote: true`
- **行長制限**: 80文字
- **インデント**: 2スペース（一部ファイルは4スペース）
- **末尾コンマ**: ES5形式
- **ブラケット改行**: なし

### ファイル別インデント設定（4スペース）

- Markdown (`.md`, `.mdx`)
- HTML (`.html`)
- JavaScript関連 (`.js`, `.mjs`, `.jsx`, `.ts`, `.tsx`)
- JSON (`.json`)
- XML (`.xml`)

## インポート順序

Prettierが自動的に以下の順序でインポートをソート：

1. **React関連**: `react`, `react-dom`
2. **Next.js関連**: `next/*`
3. **サードパーティモジュール**: npmパッケージ
4. **内部ライブラリ**: `@/lib`, `@/metadata`, `@/const`
5. **その他エイリアス**: `@/providers`, `@/atoms`, `@/hooks`, `@/components`
6. **スタイル関連**: `@/styles`, `.css`
7. **相対パス**: `./`, `../`

## TypeScript規約

### 必須要件

- **型エラーゼロ**: 作業完了前に必ず解決
- **any型禁止**: 適切な型定義を使用
- **ESLintエラー**: ignoreでの回避禁止、根本的解決必須

### 命名規則

- **コンポーネント**: PascalCase (`UserCard`)
- **関数・変数**: camelCase (`getUserData`)
- **定数**: UPPER_SNAKE_CASE (`API_BASE_URL`)
- **ファイル名**: kebab-case (`user-card.tsx`)

## React/Next.js規約

### コンポーネント構造

```tsx
// ✅ 推奨パターン
import { useState } from 'react'

import { Button } from '@workspace/ui/components/button'
import { cn } from '@workspace/ui/lib/utils'

interface UserCardProps {
    name: string
    email: string
    isActive?: boolean
}

export function UserCard({ name, email, isActive = false }: UserCardProps) {
    const [isExpanded, setIsExpanded] = useState(false)

    return (
        <div
            className={cn(
                'rounded-lg border p-4',
                isActive && 'border-blue-500',
                isExpanded && 'shadow-lg'
            )}
        >
            <h3>{name}</h3>
            <p>{email}</p>
        </div>
    )
}
```

### className結合規則

- **必須**: `cn()` 関数を使用（テンプレートリテラル禁止）
- **条件付きスタイル**: cn()内で条件分岐

```tsx
// ❌ 禁止
className={`${baseClass} ${conditionalClass}`}

// ✅ 推奨
className={cn(baseClass, conditionalClass, isActive && 'active-class')}
```

## ファイル構成

### ディレクトリレイアウト（apps/web/src）

```
app/         # ルーティング & ページ
components/  # 汎用UI（再利用可能）
lib/         # ユーティリティ関数
hooks/       # カスタムフック
const/       # 定数定義
```

### コンポーネント配置ルール

- **専用コンポーネント**: 対応するpage.tsxと同階層
- **汎用コンポーネント**: components/ または packages/ui/

## パフォーマンス最適化

### 定数・固定値の配置

```tsx
// ❌ 毎レンダリングで新オブジェクト作成
const Component = () => {
  const options = { style: 'solid', size: 'lg' }
  return <Button {...options} />
}

// ✅ コンポーネント外に定義
const BUTTON_OPTIONS = { style: 'solid', size: 'lg' }
const Component = () => {
  return <Button {...BUTTON_OPTIONS} />
}
```

### メモ化指針

- **useMemo**: 重い計算結果、複雑なオブジェクト生成
- **useCallback**: 子コンポーネントのイベントハンドラー
- **React.memo**: レンダリングコストが高いコンポーネント

## ESLint・品質ルール

### 厳格な品質管理

- ワーニング数: **ゼロ必須**
- 未使用変数: **禁止**
- console.log: **本番環境では削除**
- 魔法の数値: **定数化必須**

### ファイル命名（ls-lint）

- TypeScript: `kebab-case.tsx`
- スタイル: `kebab-case.css`
- 設定ファイル: `dot-case` または `kebab-case`
