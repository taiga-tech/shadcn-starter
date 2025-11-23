import type { Metadata } from 'next'

import { generateArticleJsonLd } from '@/lib/json-ld'
import { generateArticleMetadata } from '@/lib/metadata'

import { JsonLdScript } from '@/components/json-ld-script'

// 記事の動的メタデータを生成する例
export async function generateMetadata(): Promise<Metadata> {
    // 実際の実装では、APIやデータベースからデータを取得
    const articleData = {
        title: 'Next.js App Routerでの動的メタデータ設定',
        description:
            'Next.js App Routerを使用して動的にメタデータを設定する方法について詳しく解説します。',
        publishedTime: '2024-01-01T00:00:00.000Z',
        modifiedTime: '2024-01-02T00:00:00.000Z',
        section: 'Technology',
        tags: ['Next.js', 'React', 'TypeScript', 'SEO'],
        authors: [{ name: 'Taiga', url: 'https://github.com/taiga-tech' }],
        url: '/example-article',
    }

    return generateArticleMetadata(articleData)
}

// 記事データ（実際の実装では props で受け取るか、データを取得）
const articleData = {
    title: 'Next.js App Routerでの動的メタデータ設定',
    description:
        'Next.js App Routerを使用して動的にメタデータを設定する方法について詳しく解説します。',
    publishedTime: '2024-01-01T00:00:00.000Z',
    modifiedTime: '2024-01-02T00:00:00.000Z',
    url: '/example-article',
    authorName: 'Taiga',
    section: 'Technology',
}

// JSON-LD構造化データを生成
const articleJsonLd = generateArticleJsonLd(articleData)

export default function ExampleArticlePage() {
    return (
        <>
            <JsonLdScript data={articleJsonLd} />
            <main className="container mx-auto px-4 py-8">
                <article>
                    <header className="mb-8">
                        <h1 className="mb-4 text-4xl font-bold">
                            {articleData.title}
                        </h1>
                        <div className="mb-4 text-gray-600">
                            <time dateTime={articleData.publishedTime}>
                                {new Date(
                                    articleData.publishedTime
                                ).toLocaleDateString('ja-JP')}
                            </time>
                            {' by '}
                            <span className="font-medium">
                                {articleData.authorName}
                            </span>
                        </div>
                        <p className="text-lg text-gray-700">
                            {articleData.description}
                        </p>
                    </header>

                    <div className="prose max-w-none">
                        <p>
                            この記事では、Next.js App
                            Routerでの動的メタデータ設定について説明します。
                        </p>

                        <h2>メタデータAPIの活用</h2>
                        <p>
                            Next.js 13.2以降のApp
                            Routerでは、generateMetadata関数を使用して
                            動的にメタデータを生成できます。
                        </p>

                        <h2>構造化データの実装</h2>
                        <p>
                            JSON-LDを使用した構造化データにより、検索エンジンに
                            より詳細な情報を提供できます。
                        </p>
                        <pre>{JSON.stringify(articleJsonLd, null, 4)}</pre>
                    </div>
                </article>
            </main>
        </>
    )
}
