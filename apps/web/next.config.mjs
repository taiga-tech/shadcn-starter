/** @type {import('next').NextConfig} */
import withPlugins from 'next-compose-plugins'
import { withContentlayer } from 'next-contentlayer2'

const config = withPlugins([[withContentlayer]], {
    swcMinify: true,
    trailingSlash: true,
    reactStrictMode: true,
    poweredByHeader: false,

    pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
    transpilePackages: ['@workspace/ui'],

    images: {
        formats: ['image/avif', 'image/webp'],
        remotePatterns: [
            { protocol: 'https', hostname: '*.unsplash.com' },
            { protocol: 'https', hostname: '*.google.com' },
            { protocol: 'https', hostname: 'placekitten.com' },
            {
                protocol: 'https',
                hostname: 'qiita-image-store.s3.ap-northeast-1.amazonaws.com',
            },
            {
                protocol: 'https',
                hostname: 'qiita-image-store.s3.amazonaws.com',
            },
            { protocol: 'http', hostname: 'cdn.qiita.com' },
        ],
    },

    rewrites() {
        return [
            { source: '/healthz', destination: '/api/health' },
            { source: '/api/healthz', destination: '/api/health' },
            { source: '/health', destination: '/api/health' },
            { source: '/ping', destination: '/api/health' },
        ]
    },
})

export default config
