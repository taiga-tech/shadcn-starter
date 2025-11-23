# プロジェクト概要

## プロジェクトの目的

shadcn/ui コンポーネント用のモノレポテンプレート。再利用可能なUIコンポーネントライブラリとWebアプリケーション、ドキュメントサイトを統合した開発環境を提供。

## 技術スタック

### コア技術

- **Turborepo**: ビルドオーケストレーション、モノレポ管理
- **pnpm**: パッケージマネージャー（v10.15.1+）
- **TypeScript**: 型安全な開発
- **Node.js**: 20以上必須

### フロントエンド

- **Next.js 15**: React 19 + Turbopack（apps/web）
- **Storybook**: コンポーネントドキュメント（apps/docs）
- **shadcn/ui**: UIコンポーネントライブラリ
- **Tailwind CSS**: スタイリングフレームワーク
- **Radix UI**: アクセシブルなプリミティブコンポーネント
- **next-themes**: テーマサポート
- **class-variance-authority**: コンポーネントバリアント管理
- **lucide-react**: アイコンライブラリ
- **nuqs**: URL状態管理
- **zod**: スキーマバリデーション

### テスト・品質管理

- **Jest**: ユニット・インテグレーションテスト
- **Playwright**: E2Eテスト
- **Testing Library**: React コンポーネントテスト
- **ESLint**: 静的コード解析
- **Prettier**: コードフォーマット
- **ls-lint**: ファイル命名規則チェック
- **Husky**: Git プリコミットフック

### ビルド・デプロイ

- **Changesets**: バージョニング・リリース管理
- **Bundle Analyzer**: バンドルサイズ分析
- **NX**: ビルドキャッシュ最適化

## プロジェクト構造

```
shadcn-starter/
├── apps/
│   ├── web/           # Next.js Webアプリケーション
│   └── docs/          # Storybook ドキュメント
├── packages/
│   ├── ui/            # 共有UIコンポーネント
│   ├── eslint-config/ # 共有ESLint設定
│   ├── typescript-config/ # 共有TypeScript設定
│   └── jest-config/   # 共有Jest設定
└── scripts/           # ユーティリティスクリプト
```

## 主要な設計原則

- TypeScript必須（型エラー・ESLintエラーはゼロ）
- ワークスペース管理による設定とコンポーネントの共有
- App Router採用（API Routesは使用しない）
- Server Actions による サーバーサイド処理
- セマンティックHTML + ARIA によるアクセシビリティ対応
