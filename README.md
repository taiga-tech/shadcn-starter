# shadcn/ui モノレポテンプレート

モダンな shadcn/ui コンポーネントライブラリ用のモノレポテンプレートです。Turborepo、pnpm ワークスペース、Next.js 15、React 19、Storybook を統合した本格的な開発環境を提供します。

## 🚀 技術スタック

### コア技術

- **Turborepo** - ビルドオーケストレーション・モノレポ管理
- **pnpm** - 高速パッケージマネージャー（ワークスペース対応）
- **TypeScript** - 型安全な開発環境
- **Node.js 22+** - ランタイム要件

### フロントエンド

- **Next.js 15** - React フレームワーク（App Router + Turbopack）
- **React 19** - 最新のReactライブラリ
- **Storybook** - コンポーネント開発・ドキュメント
- **shadcn/ui** - 高品質UIコンポーネントライブラリ
- **Tailwind CSS** - ユーティリティファーストCSS
- **Radix UI** - アクセシブルなプリミティブ
- **next-themes** - テーマサポート
- **class-variance-authority** - バリアント管理
- **lucide-react** - アイコンライブラリ

### 開発・テストツール

- **Jest** - ユニット・インテグレーションテスト
- **Playwright** - E2Eテスト
- **Testing Library** - Reactコンポーネントテスト
- **ESLint** - コード品質・スタイル
- **Prettier** - コードフォーマット
- **Husky** - Git プリコミットフック

## 📁 プロジェクト構造

```
shadcn-starter/
├── apps/
│   ├── web/                    # Next.js Webアプリケーション
│   │   ├── src/app/           # App Router ページ
│   │   ├── src/components/    # アプリ固有コンポーネント
│   │   └── src/lib/          # ユーティリティ
│   └── docs/                  # Storybook ドキュメント
│       └── stories/          # コンポーネントストーリー
├── packages/
│   ├── ui/                    # 共有UIコンポーネント
│   │   ├── src/components/   # shadcn/ui コンポーネント
│   │   └── src/lib/         # ユーティリティ
│   ├── e2e-web/              # Playwright E2Eテスト
│   ├── eslint-config/        # 共有ESLint設定
│   ├── typescript-config/    # 共有TypeScript設定
│   └── jest-config/          # 共有Jest設定
└── scripts/                   # ビルド・ユーティリティスクリプト
```

## 🛠️ 開発コマンド

### 基本的な開発・ビルド

```bash
# 開発サーバー起動（Web + Storybook）
pnpm dev

# 全アプリケーションをビルド
pnpm build

# ビルド済みStorybookをプレビュー
pnpm preview-storybook
```

### テスト実行

```bash
# 全テスト実行
pnpm test

# テストタイプ別実行
pnpm test:unit              # ユニットテストのみ
pnpm test:integration       # インテグレーションテストのみ
pnpm test:e2e              # E2Eテスト
pnpm test:all              # 全テストタイプ
```

### コード品質管理

```bash
# ESLint実行
pnpm lint

# ファイル命名規則チェック
pnpm lint:ls

# TypeScript型チェック
pnpm check-types

# Prettierフォーマット
pnpm format
```

### バージョン管理・リリース

```bash
# チェンジセット作成
pnpm changeset

# パッケージバージョン更新
pnpm version-packages

# パッケージ公開
pnpm release
```

### ユーティリティ

```bash
# 依存関係グラフ生成
pnpm generate:graph

# インデックスファイル生成
pnpm generate:index

# 依存関係クリーンインストール
pnpm clean-install

# 依存関係更新
pnpm update-deps
```

## 🎨 shadcn/ui コンポーネント管理

### 新しいコンポーネントの追加

Webアプリケーションにshadcn/uiコンポーネントを追加：

```bash
# 基本的なコンポーネント追加
pnpm dlx shadcn@latest add button -c apps/web
pnpm dlx shadcn@latest add card -c apps/web
pnpm dlx shadcn@latest add dialog -c apps/web

# 複数コンポーネント同時追加
pnpm dlx shadcn@latest add button card dialog -c apps/web
```

コンポーネントは `packages/ui/src/components/` に配置され、プロジェクト全体で共有できます。

### コンポーネントの使用

```tsx
import { Button } from '@workspace/ui/components/button'
import { Card, CardContent, CardHeader } from '@workspace/ui/components/card'

export default function MyPage() {
    return (
        <Card>
            <CardHeader>
                <h2>タイトル</h2>
            </CardHeader>
            <CardContent>
                <Button variant="default">クリック</Button>
            </CardContent>
        </Card>
    )
}
```

## ⚙️ 技術仕様・要件

### システム要件

- **Node.js**: 22以上必須
- **パッケージマネージャー**: pnpm@10.0.0+ （npmやyarn使用不可）
- **Git**: プリコミットフック有効化済み

### 開発原則

- **TypeScript必須**: 型エラー・ESLintエラーは常にゼロ
- **App Router採用**: API Routesは使用しない（Server Actions使用）
- **ワークスペース管理**: `@workspace/*` での設定・コンポーネント共有
- **セマンティックHTML**: ARIA対応によるアクセシビリティ確保

### コードスタイル

- セミコロンなし、シングルクォート使用
- 行長制限80文字、インデント2スペース
- Tailwindクラス・インポート文は自動ソート
- `cn()` 関数によるclassName結合必須

## 📚 開発ガイドライン

### プロジェクト初期化

```bash
# リポジトリクローン後の初期セットアップ
pnpm install
pnpm prepare  # Huskyフック有効化
```

### 開発ワークフロー

1. **機能開発**: `pnpm dev` で開発サーバー起動
2. **コンポーネント開発**: Storybookで視覚確認
3. **品質チェック**: 以下のコマンドを順次実行

```bash
pnpm check-types    # 型チェック
pnpm lint          # ESLint
pnpm test          # テスト実行
pnpm build         # ビルド確認
```

### テスト戦略

- **ユニットテスト**: `__test__/unit/` - 純粋関数・ユーティリティ
- **インテグレーションテスト**: `__test__/integration/` - コンポーネント統合
- **E2Eテスト**: `packages/e2e-web/` - Playwright使用
- **ビジュアルテスト**: Storybook - コンポーネント表示・操作

### パフォーマンス最適化

- Server Components優先、`use client`は最小限
- 動的import・Suspenseでコード分割
- メモ化（useMemo/useCallback）の適切な使用
- 画像は`next/image`、リンクは`next/link`使用

## 🔗 依存関係グラフ

プロジェクト内の依存関係は以下のコマンドで可視化できます：

```bash
pnpm generate:graph
```

![依存関係グラフ](./graph.svg)

## 📄 ライセンス

UNLICENSED - プライベートテンプレート
