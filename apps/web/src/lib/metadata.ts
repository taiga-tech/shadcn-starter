import type { Metadata } from 'next'

import type { Thing, WithContext } from 'schema-dts'

const BASE_URL = process.env.VERCEL_URL!
    ? `https://${process.env.VERCEL_URL!}`
    : 'http://localhost:3000'

const SITE_NAME = 'shadcn/ui Starter'
const SITE_TITLE =
    'shadcn/ui Starter - Next.js 15 + React 19 + Turborepo モノレポテンプレート'
const SITE_DESCRIPTION =
    'Next.js 15、React 19、Turborepoを使用したshadcn/uiコンポーネントライブラリのモノレポテンプレート。TypeScript、Tailwind CSS、Jest、Playwrightを含む包括的な開発環境。GitHubテンプレートとして公開予定。'

export const defaultMetadata: Metadata = {
    metadataBase: new URL(BASE_URL),
    title: {
        default: SITE_TITLE,
        template: `%s | ${SITE_NAME}`,
    },
    description: SITE_DESCRIPTION,
    keywords: [
        'Next.js',
        'React',
        'TypeScript',
        'shadcn/ui',
        'Tailwind CSS',
        'Turborepo',
        'モノレポ',
        'テンプレート',
        'Storybook',
        'Jest',
        'Playwright',
    ],
    authors: [{ name: 'Taiga' }],
    creator: 'Taiga',
    publisher: 'Taiga',
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
    openGraph: {
        type: 'website',
        locale: 'ja_JP',
        url: BASE_URL,
        siteName: SITE_NAME,
        title: SITE_TITLE,
        description: SITE_DESCRIPTION,
        images: [
            {
                url: '/api/og',
                width: 1200,
                height: 630,
                alt: SITE_TITLE,
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: SITE_TITLE,
        description: SITE_DESCRIPTION,
        images: ['/api/og'],
        creator: '@your_twitter_handle',
    },
    icons: {
        icon: '/favicon.ico',
        shortcut: '/favicon-16x16.png',
        apple: '/apple-touch-icon.png',
    },
    manifest: '/site.webmanifest',
}

interface GenerateMetadataProps {
    title?: string
    description?: string
    image?: string
    url?: string
    type?: 'website' | 'article' | 'profile'
    publishedTime?: string
    modifiedTime?: string
    section?: string
    tags?: string[]
    authors?: Array<{ name: string; url?: string }>
    jsonLd?: WithContext<Thing> | WithContext<Thing>[]
    noindex?: boolean
    nofollow?: boolean
    canonical?: string
}

export const generateMetadata = ({
    title,
    description,
    image,
    url,
    type = 'website',
    publishedTime,
    modifiedTime,
    section,
    tags,
    authors,
    noindex = false,
    nofollow = false,
    canonical,
}: GenerateMetadataProps = {}): Metadata => {
    const metaTitle = title ? `${title} | ${SITE_NAME}` : SITE_TITLE
    const metaDescription = description || SITE_DESCRIPTION

    // 動的OG画像URLを生成
    const ogImageUrl =
        image ||
        `/api/og?${new URLSearchParams({
            title: title || SITE_NAME,
            subtitle: 'Next.js 15 + React 19 + Turborepo',
            description: description || 'モノレポテンプレート',
        }).toString()}`

    const metaUrl = url ? `${BASE_URL}${url}` : BASE_URL
    const canonicalUrl = canonical ? `${BASE_URL}${canonical}` : metaUrl

    const baseMetadata: Metadata = {
        ...defaultMetadata,
        title: metaTitle,
        description: metaDescription,
        alternates: {
            canonical: canonicalUrl,
        },
        robots: {
            index: !noindex,
            follow: !nofollow,
            ...(typeof defaultMetadata.robots === 'object' &&
            defaultMetadata.robots &&
            'googleBot' in defaultMetadata.robots
                ? { googleBot: defaultMetadata.robots.googleBot }
                : {}),
        },
        openGraph: {
            ...defaultMetadata.openGraph,
            type,
            title: metaTitle,
            description: metaDescription,
            url: metaUrl,
            images: [
                {
                    url: ogImageUrl,
                    width: 1200,
                    height: 630,
                    alt: metaTitle,
                },
            ],
            ...(type === 'article' && {
                publishedTime,
                modifiedTime,
                section,
                tags,
                authors: authors?.map((author) => author.name),
            }),
        },
        twitter: {
            ...defaultMetadata.twitter,
            title: metaTitle,
            description: metaDescription,
            images: [ogImageUrl],
        },
    }

    // キーワードを動的に追加
    if (tags && tags.length > 0) {
        baseMetadata.keywords = [...(defaultMetadata.keywords || []), ...tags]
    }

    // 作者情報を追加
    if (authors && authors.length > 0) {
        baseMetadata.authors = authors
    }

    return baseMetadata
}

/**
 * ページタイプに応じたメタデータを生成する関数
 */
export const generateArticleMetadata = ({
    title,
    description,
    publishedTime,
    modifiedTime,
    section,
    tags,
    authors,
    url,
    image,
    jsonLd,
}: Omit<GenerateMetadataProps, 'type'> & {
    publishedTime: string
    authors: Array<{ name: string; url?: string }>
}): Metadata => {
    return generateMetadata({
        title,
        description,
        type: 'article',
        publishedTime,
        modifiedTime,
        section,
        tags,
        authors,
        url,
        image,
        jsonLd,
    })
}

export const generateProfileMetadata = ({
    title,
    description,
    url,
    image,
    jsonLd,
}: Omit<GenerateMetadataProps, 'type'>): Metadata => {
    return generateMetadata({
        title,
        description,
        type: 'profile',
        url,
        image,
        jsonLd,
    })
}
