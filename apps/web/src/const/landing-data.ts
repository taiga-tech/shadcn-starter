export const TECH_STACK_ITEMS = [
    {
        category: 'フロントエンド',
        icon: '⚛️',
        technologies: [
            {
                name: 'Next.js 15',
                version: '15.1.0',
                description: 'App Router、Server Components対応',
                features: ['Turbopack', 'Server Actions', 'Parallel Routes'],
            },
            {
                name: 'React 19',
                version: '19.0.0',
                description: '最新のReact機能を活用',
                features: [
                    'use Hook',
                    'Server Components',
                    'Optimistic Updates',
                ],
            },
            {
                name: 'TypeScript',
                version: '5.7.0',
                description: '型安全な開発環境',
                features: ['Strict Mode', 'ESNext Support', 'Path Mapping'],
            },
        ],
    },
    {
        category: 'UI・スタイリング',
        icon: '🎨',
        technologies: [
            {
                name: 'shadcn/ui',
                version: '2.1.0',
                description: 'モダンなUIコンポーネント',
                features: ['Radix UI Base', 'Customizable', 'Accessible'],
            },
            {
                name: 'Tailwind CSS',
                version: '3.4.0',
                description: 'ユーティリティファーストCSS',
                features: ['JIT Compiler', 'Dark Mode', 'Responsive Design'],
            },
            {
                name: 'Framer Motion',
                version: '12.23.0',
                description: 'スムーズなアニメーション',
                features: [
                    'Gesture Support',
                    'Layout Animations',
                    'Performance',
                ],
            },
        ],
    },
    {
        category: 'ビルド・開発',
        icon: '⚡',
        technologies: [
            {
                name: 'Turborepo',
                version: '2.3.0',
                description: '高速なモノレポビルドシステム',
                features: ['Incremental Builds', 'Remote Caching', 'Pipeline'],
            },
            {
                name: 'pnpm',
                version: '10.15.0',
                description: '効率的なパッケージマネージャー',
                features: ['Disk Space Efficient', 'Fast Install', 'Workspace'],
            },
            {
                name: 'ESLint & Prettier',
                version: '9.17.0',
                description: 'コード品質管理',
                features: ['Auto Fix', 'Import Sort', 'Consistent Style'],
            },
        ],
    },
    {
        category: 'テスト・品質保証',
        icon: '🧪',
        technologies: [
            {
                name: 'Jest',
                version: '29.7.0',
                description: 'ユニット・インテグレーションテスト',
                features: ['Snapshot Testing', 'Mocking', 'Coverage Report'],
            },
            {
                name: 'Playwright',
                version: '1.49.0',
                description: 'E2Eテスト自動化',
                features: ['Cross Browser', 'Visual Testing', 'API Testing'],
            },
            {
                name: 'Storybook',
                version: '8.4.0',
                description: 'コンポーネント開発・テスト',
                features: [
                    'Interactive Testing',
                    'Visual Testing',
                    'Documentation',
                ],
            },
        ],
    },
]

export const PERFORMANCE_METRICS = [
    {
        metric: 'First Contentful Paint',
        value: '0.8s',
        benchmark: '< 1.2s',
        status: 'excellent',
        description: '最初のコンテンツ表示速度',
    },
    {
        metric: 'Largest Contentful Paint',
        value: '1.2s',
        benchmark: '< 2.5s',
        status: 'good',
        description: 'メインコンテンツ表示速度',
    },
    {
        metric: 'Time to Interactive',
        value: '1.8s',
        benchmark: '< 3.8s',
        status: 'good',
        description: 'インタラクション可能までの時間',
    },
    {
        metric: 'Bundle Size (gzipped)',
        value: '89kb',
        benchmark: '< 100kb',
        status: 'excellent',
        description: '圧縮後のバンドルサイズ',
    },
    {
        metric: 'Build Time',
        value: '12s',
        benchmark: '< 30s',
        status: 'excellent',
        description: 'Turborepoによる高速ビルド',
    },
    {
        metric: 'Test Coverage',
        value: '94%',
        benchmark: '> 80%',
        status: 'excellent',
        description: 'テストカバレッジ率',
    },
]

export const ARCHITECTURE_BENEFITS = [
    {
        title: '開発効率の向上',
        description:
            'モノレポ構成により、共通コンポーネントと設定の再利用が可能。開発速度を50%向上。',
        icon: '🚀',
        stats: '+50% 開発速度',
    },
    {
        title: 'コード品質の保証',
        description:
            'ESLint、TypeScript、テスト環境の統合により、一貫した高品質なコードを維持。',
        icon: '✨',
        stats: '94% テストカバレッジ',
    },
    {
        title: 'パフォーマンス最適化',
        description:
            'Next.js 15とTurbopackにより、開発・ビルド・ランタイムパフォーマンスを最大化。',
        icon: '⚡',
        stats: '89kb バンドルサイズ',
    },
    {
        title: 'スケーラビリティ',
        description:
            'Turborepoの段階的ビルドとキャッシュにより、プロジェクト拡大にも対応。',
        icon: '📈',
        stats: '+300% スケール対応',
    },
]

export const COMPARISON_DATA = [
    {
        aspect: 'セットアップ時間',
        traditional: '2-3日',
        thisTemplate: '5分',
        improvement: '80x高速',
    },
    {
        aspect: 'ビルド時間',
        traditional: '45秒',
        thisTemplate: '12秒',
        improvement: '3.8x高速',
    },
    {
        aspect: 'テスト環境構築',
        traditional: '1-2日',
        thisTemplate: '設定済み',
        improvement: '即座に利用',
    },
    {
        aspect: 'コンポーネント追加',
        traditional: '手動設定',
        thisTemplate: 'shadcn CLI',
        improvement: '自動化',
    },
]
