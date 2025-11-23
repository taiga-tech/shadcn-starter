import type { Organization, WithContext } from 'schema-dts'

// import { SOCIALS } from '@/const/sns'

const BASE_URL = process.env.VERCEL_URL!
    ? `https://${process.env.VERCEL_URL!}`
    : 'http://localhost:3000'

export const organization: WithContext<Organization> = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'shadcn/ui Starter',
    description:
        'Next.js 15、React 19、Turborepoを使用したshadcn/uiコンポーネントライブラリのモノレポテンプレート',
    url: BASE_URL,
    logo: `${BASE_URL}/favicon.ico`,
    foundingDate: '2024',
    // sameAs: SOCIALS.map((item) => item.href),
}

/**
 * ブログ記事用のArticle構造化データを生成
 */
export const generateArticleJsonLd = ({
    title,
    description,
    publishedTime,
    modifiedTime,
    url,
    imageUrl,
    authorName = 'Taiga',
    section,
}: {
    title: string
    description: string
    publishedTime: string
    modifiedTime?: string
    url: string
    imageUrl?: string
    authorName?: string
    section?: string
}): WithContext<import('schema-dts').Article> => ({
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    image: imageUrl || `${BASE_URL}/api/og?title=${encodeURIComponent(title)}`,
    datePublished: publishedTime,
    dateModified: modifiedTime || publishedTime,
    author: {
        '@type': 'Person',
        name: authorName,
    },
    publisher: organization,
    url: `${BASE_URL}${url}`,
    ...(section && { articleSection: section }),
})

/**
 * WebSite構造化データ
 */
export const websiteJsonLd: WithContext<import('schema-dts').WebSite> = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'shadcn/ui Starter',
    description:
        'Next.js 15、React 19、Turborepoを使用したshadcn/uiコンポーネントライブラリのモノレポテンプレート',
    url: BASE_URL,
    publisher: organization,
}
