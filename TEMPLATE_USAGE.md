# テンプレート使用後の設定手順

このテンプレートを使用してプロジェクトを作成した後、以下の手順で設定を完了してください。

## 1. リンクの更新

### ランディングページ（apps/web/src/app/page.tsx）

以下のプレースホルダーリンクを実際のリポジトリURLに更新してください：

```tsx
// 現在のプレースホルダー
href = 'https://github.com/taiga-tech/shadcn-starter/generate'
href = 'https://github.com/taiga-tech/shadcn-starter'

// 更新例
href = 'https://github.com/your-actual-username/your-project-name/generate'
href = 'https://github.com/your-actual-username/your-project-name'
```

### Storybookリンク

開発環境でStorybookを起動している場合は、以下のリンクを使用：

```tsx
href = 'http://localhost:6006'
```

本番環境でStorybookをホストしている場合は、実際のURLに変更してください。

## 2. メタデータの更新

### apps/web/src/app/layout.tsx

プロジェクト名と説明を更新：

```tsx
export const metadata = {
    title: 'あなたのプロジェクト名 - 説明',
    description: 'あなたのプロジェクトの説明文',
}
```

## 3. README.mdの更新

- プロジェクト名
- 説明文
- インストール手順
- 使用方法
- ライセンス情報

## 4. package.jsonの更新

各package.jsonファイルで以下を更新：

- `name`: プロジェクト名
- `description`: プロジェクトの説明
- `repository`: リポジトリURL
- `author`: 作者情報
- `license`: ライセンス情報

## 5. GitHubテンプレート設定

リポジトリをテンプレートとして使用可能にするには：

1. GitHubのリポジトリページに移動
2. Settings → General
3. "Template repository" にチェック
4. 変更を保存

## 6. 環境変数の設定

必要に応じて`.env.local.example`を`.env.local`にコピーし、環境変数を設定してください。

## 7. デプロイ設定

### Vercel

- プロジェクトをVercelにインポート
- ビルド設定: `pnpm build`
- 出力ディレクトリ: `apps/web/.next`

### その他のプラットフォーム

各プラットフォームの設定に従ってデプロイを行ってください。

---

このファイルは設定完了後に削除してください。
