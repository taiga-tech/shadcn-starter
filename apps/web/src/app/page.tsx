import { memo } from 'react'

import { Badge } from '@workspace/ui/components/badge'
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from '@workspace/ui/components/card'
import { cn } from '@workspace/ui/lib/utils'
import { Shield, Star, TrendingUp, Zap } from 'lucide-react'

import {
    ARCHITECTURE_BENEFITS,
    COMPARISON_DATA,
    PERFORMANCE_METRICS,
    TECH_STACK_ITEMS,
} from '@/const/landing-data'

import { ButtonLink } from '@/components/button-link'
import CopyableCode from '@/components/copyable-code'
import ScrollReveal from '@/components/scroll-reveal'
import ThemeToggle from '@/components/theme-toggle'

// データ定数
const PROJECT_ITEMS = [
    {
        badge: 'Apps',
        title: 'Webアプリケーション',
        items: [
            'Next.js 15 + React 19',
            'Turbopack',
            'TypeScript',
            'Tailwind CSS',
        ],
    },
    {
        badge: 'Docs',
        title: 'Storybook',
        items: [
            'コンポーネント一覧',
            'インタラクションテスト',
            'ビジュアルテスト',
            'ドキュメント生成',
        ],
    },
    {
        badge: 'UI',
        title: 'コンポーネント',
        items: ['shadcn/ui', 'Radix UI', 'Tailwind CSS', 'クラスバリアント'],
    },
    {
        badge: 'Config',
        title: '共有設定',
        items: ['ESLint設定', 'TypeScript設定', 'Jest設定', 'Prettier設定'],
    },
    {
        badge: 'Tools',
        title: '開発ツール',
        items: [
            'Turborepo',
            'pnpm workspace',
            'Playwright',
            'Husky + lint-staged',
        ],
    },
    {
        badge: 'Test',
        title: 'テスト環境',
        items: [
            'Jest（ユニット）',
            'Playwright（packages/e2e-web）',
            'Storybook（視覚）',
            'Testing Library',
        ],
    },
]

const FEATURE_ITEMS = [
    {
        title: 'モノレポ構成',
        description:
            'Turborepo + pnpm workspaces による効率的なマルチパッケージ管理。共有設定とコンポーネントの再利用性を最大化。',
        icon: <TrendingUp className="h-6 w-6" />,
    },
    {
        title: 'Next.js 15 + React 19',
        description:
            '最新のNext.js App RouterとReact 19の新機能を活用。 Server ComponentsとServer Actionsでパフォーマンス最適化。',
        icon: <Zap className="h-6 w-6" />,
    },
    {
        title: '型安全な開発',
        description:
            'TypeScript + Zod によるエンドツーエンドの型安全性。ESLintとPrettierで一貫したコード品質を維持。',
        icon: <Shield className="h-6 w-6" />,
    },
    {
        title: '包括的テスト',
        description:
            'ユニット・インテグレーション・E2E・ビジュアルテストを統合。CI/CDパイプラインでの自動品質チェック。',
        icon: <Star className="h-6 w-6" />,
    },
]

const QUICK_START_ITEMS = [
    {
        title: 'インストール',
        commands: ['git clone [repository-url]', 'pnpm install', 'pnpm dev'],
        description:
            'すべてのアプリケーション（Web、Storybook）が同時に起動されます。',
    },
    {
        title: 'コンポーネント追加',
        commands: [
            'pnpm dlx shadcn@latest add button -c apps/web',
            "import { Button } from '@workspace/ui/components/button'",
        ],
        description: 'コンポーネントは自動的に共有UIパッケージに配置されます。',
    },
    {
        title: 'テスト実行',
        commands: ['pnpm test', 'pnpm test:e2e'],
        description:
            'ユニット、インテグレーション、E2Eテストが含まれています。',
    },
    {
        title: 'コード品質',
        commands: ['pnpm lint', 'pnpm check-types', 'pnpm format'],
        description: 'ESLint、TypeScript、Prettierで品質を保証します。',
    },
]

// コンポーネント
const ProjectCard = memo(
    ({ item }: { item: (typeof PROJECT_ITEMS)[number] }) => (
        <Card className="group border-zinc-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-zinc-300 hover:shadow-lg dark:border-zinc-700 dark:bg-zinc-800 dark:hover:border-zinc-600 dark:hover:shadow-xl">
            <CardHeader className="pb-3">
                <div className="flex items-center gap-3">
                    <Badge
                        variant="secondary"
                        className="bg-linear-to-r from-zinc-100 to-zinc-200 text-zinc-700 transition-colors group-hover:from-zinc-200 group-hover:to-zinc-300 dark:from-zinc-700 dark:to-zinc-600 dark:text-zinc-200 dark:group-hover:from-zinc-600 dark:group-hover:to-zinc-500"
                    >
                        {item.badge}
                    </Badge>
                    <CardTitle className="text-lg text-zinc-900 transition-colors group-hover:text-zinc-800 dark:text-zinc-100 dark:group-hover:text-zinc-200">
                        {item.title}
                    </CardTitle>
                </div>
            </CardHeader>
            <CardContent>
                <ul className="space-y-3 text-sm text-zinc-600 dark:text-zinc-300">
                    {item.items.map((listItem, index) => (
                        <li
                            key={index}
                            className="flex items-center gap-3 transition-colors group-hover:text-zinc-700 dark:group-hover:text-zinc-200"
                        >
                            <div className="h-1.5 w-1.5 rounded-full bg-linear-to-r from-zinc-400 to-zinc-500 transition-all group-hover:scale-125 dark:from-zinc-500 dark:to-zinc-400"></div>
                            {listItem}
                        </li>
                    ))}
                </ul>
            </CardContent>
        </Card>
    )
)

ProjectCard.displayName = 'ProjectCard'

const FeatureCard = memo(
    ({ item }: { item: (typeof FEATURE_ITEMS)[number] }) => (
        <Card className="group border-zinc-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-zinc-300 hover:shadow-lg dark:border-zinc-700 dark:bg-zinc-800 dark:hover:border-zinc-600 dark:hover:shadow-xl">
            <CardHeader className="pb-4">
                <div className="mb-2 flex items-center gap-3">
                    <div className="rounded-lg bg-zinc-100 p-2 text-zinc-600 transition-all duration-300 group-hover:scale-110 group-hover:bg-zinc-900 group-hover:text-white dark:bg-zinc-700 dark:text-zinc-300 dark:group-hover:bg-zinc-100 dark:group-hover:text-zinc-900">
                        {item.icon}
                    </div>
                    <CardTitle className="text-lg text-zinc-900 transition-colors group-hover:text-zinc-800 dark:text-zinc-100 dark:group-hover:text-zinc-200">
                        {item.title}
                    </CardTitle>
                </div>
            </CardHeader>
            <CardContent>
                <p className="text-sm leading-relaxed text-zinc-600 transition-colors group-hover:text-zinc-700 dark:text-zinc-300 dark:group-hover:text-zinc-200">
                    {item.description}
                </p>
            </CardContent>
        </Card>
    )
)

FeatureCard.displayName = 'FeatureCard'

const QuickStartCard = memo(
    ({ item }: { item: (typeof QUICK_START_ITEMS)[number] }) => (
        <Card className="group border-zinc-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-zinc-300 hover:shadow-lg dark:border-zinc-700 dark:bg-zinc-800 dark:hover:border-zinc-600 dark:hover:shadow-xl">
            <CardHeader>
                <CardTitle className="text-lg text-zinc-900 transition-colors group-hover:text-zinc-800 dark:text-zinc-100 dark:group-hover:text-zinc-200">
                    {item.title}
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <CopyableCode
                    code={item.commands}
                    className="transition-all duration-300 group-hover:bg-zinc-100 dark:group-hover:bg-zinc-700"
                />
                <p className="text-sm text-zinc-600 transition-colors group-hover:text-zinc-700 dark:text-zinc-300 dark:group-hover:text-zinc-200">
                    {item.description}
                </p>
            </CardContent>
        </Card>
    )
)

QuickStartCard.displayName = 'QuickStartCard'

const TechStackCard = memo(
    ({ item }: { item: (typeof TECH_STACK_ITEMS)[number] }) => (
        <Card className="group border-zinc-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-zinc-300 hover:shadow-lg dark:border-zinc-700 dark:bg-zinc-800 dark:hover:border-zinc-600 dark:hover:shadow-xl">
            <CardHeader className="pb-4">
                <div className="flex items-center gap-3">
                    <div className="text-2xl transition-transform duration-300 group-hover:scale-110">
                        {item.icon}
                    </div>
                    <CardTitle className="text-xl text-zinc-900 transition-colors group-hover:text-zinc-800 dark:text-zinc-100 dark:group-hover:text-zinc-200">
                        {item.category}
                    </CardTitle>
                </div>
            </CardHeader>
            <CardContent className="space-y-4">
                {item.technologies.map((tech, index) => (
                    <div
                        key={index}
                        className="border-l-2 border-zinc-200 pl-4 transition-all duration-300 group-hover:border-zinc-400 dark:border-zinc-700 dark:group-hover:border-zinc-500"
                    >
                        <div className="mb-1 flex items-center gap-2">
                            <h4 className="font-semibold text-zinc-900 transition-colors group-hover:text-zinc-800 dark:text-zinc-100 dark:group-hover:text-zinc-200">
                                {tech.name}
                            </h4>
                            <Badge
                                variant="outline"
                                className="text-xs dark:border-zinc-600"
                            >
                                {tech.version}
                            </Badge>
                        </div>
                        <p className="mb-2 text-sm text-zinc-600 transition-colors group-hover:text-zinc-700 dark:text-zinc-300 dark:group-hover:text-zinc-200">
                            {tech.description}
                        </p>
                        <div className="flex flex-wrap gap-1">
                            {tech.features.map((feature, fIndex) => (
                                <Badge
                                    key={fIndex}
                                    variant="secondary"
                                    className="bg-zinc-100 text-xs hover:bg-zinc-200 dark:bg-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-600"
                                >
                                    {feature}
                                </Badge>
                            ))}
                        </div>
                    </div>
                ))}
            </CardContent>
        </Card>
    )
)

TechStackCard.displayName = 'TechStackCard'

const PerformanceMetric = memo(
    ({ metric }: { metric: (typeof PERFORMANCE_METRICS)[number] }) => {
        const getStatusColor = (status: string) => {
            switch (status) {
                case 'excellent':
                    return 'text-green-600 bg-green-50 border-green-200'
                case 'good':
                    return 'text-blue-600 bg-blue-50 border-blue-200'
                default:
                    return 'text-yellow-600 bg-yellow-50 border-yellow-200'
            }
        }

        return (
            <div className="group rounded-lg border border-zinc-200 bg-white p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:border-zinc-700 dark:bg-zinc-800 dark:hover:border-zinc-600 dark:hover:shadow-xl">
                <div className="mb-2 flex items-center justify-between">
                    <h4 className="font-semibold text-zinc-900 transition-colors group-hover:text-zinc-800 dark:text-zinc-100 dark:group-hover:text-zinc-200">
                        {metric.metric}
                    </h4>
                    <div
                        className={cn(
                            'rounded-full border px-2 py-1 text-xs font-medium transition-all duration-300',
                            getStatusColor(metric.status)
                        )}
                    >
                        {metric.status}
                    </div>
                </div>
                <div className="mb-1 flex items-center gap-4">
                    <span className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
                        {metric.value}
                    </span>
                    <span className="text-sm text-zinc-500 dark:text-zinc-400">
                        benchmark: {metric.benchmark}
                    </span>
                </div>
                <p className="text-sm text-zinc-600 transition-colors group-hover:text-zinc-700 dark:text-zinc-300 dark:group-hover:text-zinc-200">
                    {metric.description}
                </p>
            </div>
        )
    }
)

PerformanceMetric.displayName = 'PerformanceMetric'

const SectionHeading = memo(({ children }: { children: React.ReactNode }) => (
    <div className="mb-16 text-center">
        <h2 className="mb-4 text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
            {children}
        </h2>
        <div className="mx-auto h-1 w-20 rounded-full bg-linear-to-r from-zinc-400 to-zinc-600 dark:from-zinc-500 dark:to-zinc-400"></div>
    </div>
))

SectionHeading.displayName = 'SectionHeading'

const Page = () => {
    return (
        <div className="min-h-screen bg-linear-to-br from-white via-zinc-50 to-zinc-100 dark:from-zinc-900 dark:via-zinc-800 dark:to-zinc-700">
            {/* Theme Toggle */}
            <div className="fixed top-4 right-4 z-50">
                <ThemeToggle className="shadow-lg dark:shadow-zinc-700/50" />
            </div>

            <main className="container mx-auto px-4 py-16">
                {/* Hero Section */}
                <ScrollReveal>
                    <section className="mb-32 text-center">
                        <div className="mb-8 inline-flex items-center gap-3">
                            <Badge className="bg-linear-to-r from-zinc-100 to-zinc-200 text-zinc-700 transition-all duration-300 hover:from-zinc-200 hover:to-zinc-300 dark:from-zinc-700 dark:to-zinc-600 dark:text-zinc-200 dark:hover:from-zinc-600 dark:hover:to-zinc-500">
                                v1.0.0
                            </Badge>
                            <Badge className="bg-linear-to-r from-zinc-900 to-zinc-800 text-white transition-all duration-300 hover:from-zinc-800 hover:to-zinc-700 dark:from-zinc-200 dark:to-zinc-100 dark:text-zinc-900 dark:hover:from-zinc-100 dark:hover:to-white">
                                モノレポテンプレート
                            </Badge>
                        </div>

                        <h1 className="mb-8 bg-linear-to-br from-zinc-900 via-zinc-800 to-zinc-700 bg-clip-text text-6xl font-bold tracking-tight text-zinc-900 md:text-7xl lg:text-8xl dark:from-zinc-100 dark:via-zinc-200 dark:to-zinc-300 dark:text-zinc-100">
                            shadcn/ui Starter
                        </h1>

                        <p className="mx-auto mb-12 max-w-3xl text-xl leading-relaxed text-zinc-600 md:text-2xl dark:text-zinc-300">
                            Next.js 15 + React 19 + Turborepo を使用した
                            <br />
                            <span className="font-semibold text-zinc-700 dark:text-zinc-200">
                                モダンなUIコンポーネントライブラリテンプレート
                            </span>
                        </p>

                        <div className="flex flex-col items-center gap-6 sm:flex-row sm:justify-center">
                            <ButtonLink
                                href="#quick-start"
                                size="lg"
                                className="group bg-linear-to-r from-zinc-900 to-zinc-800 px-10 py-4 text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:from-zinc-800 hover:to-zinc-700 hover:shadow-xl dark:from-zinc-100 dark:to-zinc-200 dark:text-zinc-900 dark:hover:from-white dark:hover:to-zinc-100"
                            >
                                <span className="flex items-center gap-2">
                                    開発を開始
                                    <Zap className="h-4 w-4 transition-transform group-hover:scale-110" />
                                </span>
                            </ButtonLink>
                            <ButtonLink
                                href="https://storybook.js.org/"
                                variant="outline"
                                size="lg"
                                external
                                className="border-2 border-zinc-300 px-10 py-4 text-zinc-700 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:border-zinc-400 hover:bg-zinc-50 hover:shadow-xl dark:border-zinc-600 dark:text-zinc-200 dark:hover:border-zinc-500 dark:hover:bg-zinc-800"
                            >
                                ドキュメント
                            </ButtonLink>
                        </div>

                        <div className="mt-16 grid grid-cols-2 gap-8 md:grid-cols-4 lg:gap-12">
                            {ARCHITECTURE_BENEFITS.map((benefit, index) => (
                                <ScrollReveal
                                    key={index}
                                    delay={index * 0.1}
                                    direction="up"
                                >
                                    <div className="text-center">
                                        <div className="mb-3 text-3xl transition-transform duration-300 hover:scale-110">
                                            {benefit.icon}
                                        </div>
                                        <h3 className="mb-2 font-semibold text-zinc-900 dark:text-zinc-100">
                                            {benefit.title}
                                        </h3>
                                        <p className="mb-2 text-sm text-zinc-600 dark:text-zinc-300">
                                            {benefit.description}
                                        </p>
                                        <Badge
                                            variant="secondary"
                                            className="bg-zinc-100 text-xs dark:bg-zinc-700 dark:text-zinc-200"
                                        >
                                            {benefit.stats}
                                        </Badge>
                                    </div>
                                </ScrollReveal>
                            ))}
                        </div>
                    </section>
                </ScrollReveal>

                {/* Tech Stack Deep Dive */}
                <ScrollReveal>
                    <section className="mb-32">
                        <SectionHeading>技術スタック詳細</SectionHeading>
                        <div className="grid gap-8 md:grid-cols-2">
                            {TECH_STACK_ITEMS.map((item, index) => (
                                <ScrollReveal
                                    key={index}
                                    delay={index * 0.1}
                                    direction={
                                        index % 2 === 0 ? 'left' : 'right'
                                    }
                                >
                                    <TechStackCard item={item} />
                                </ScrollReveal>
                            ))}
                        </div>
                    </section>
                </ScrollReveal>

                {/* Performance Metrics */}
                <ScrollReveal>
                    <section className="mb-32">
                        <SectionHeading>パフォーマンス指標</SectionHeading>
                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {PERFORMANCE_METRICS.map((metric, index) => (
                                <ScrollReveal
                                    key={index}
                                    delay={index * 0.1}
                                    direction="up"
                                >
                                    <PerformanceMetric metric={metric} />
                                </ScrollReveal>
                            ))}
                        </div>

                        <ScrollReveal delay={0.6}>
                            <div className="mt-16 rounded-2xl border border-zinc-200 bg-linear-to-br from-zinc-50 to-zinc-100 p-8 dark:border-zinc-700 dark:from-zinc-800 dark:to-zinc-700">
                                <h3 className="mb-6 text-center text-2xl font-bold text-zinc-900 dark:text-zinc-100">
                                    競合比較
                                </h3>
                                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                                    {COMPARISON_DATA.map(
                                        (comparison, index) => (
                                            <div
                                                key={index}
                                                className="rounded-lg bg-white p-4 text-center shadow-sm dark:bg-zinc-800 dark:shadow-zinc-900/20"
                                            >
                                                <h4 className="mb-2 font-semibold text-zinc-900 dark:text-zinc-100">
                                                    {comparison.aspect}
                                                </h4>
                                                <div className="space-y-1 text-sm">
                                                    <div className="text-red-600 dark:text-red-400">
                                                        従来:
                                                        {comparison.traditional}
                                                    </div>
                                                    <div className="font-semibold text-green-600 dark:text-green-400">
                                                        本テンプレート:
                                                        {
                                                            comparison.thisTemplate
                                                        }
                                                    </div>
                                                    <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                                                        {comparison.improvement}
                                                    </Badge>
                                                </div>
                                            </div>
                                        )
                                    )}
                                </div>
                            </div>
                        </ScrollReveal>
                    </section>
                </ScrollReveal>

                {/* Project Structure */}
                <ScrollReveal>
                    <section className="mb-32">
                        <SectionHeading>プロジェクト構成</SectionHeading>
                        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                            {PROJECT_ITEMS.map((item, index) => (
                                <ScrollReveal
                                    key={index}
                                    delay={index * 0.1}
                                    direction="up"
                                >
                                    <ProjectCard item={item} />
                                </ScrollReveal>
                            ))}
                        </div>
                    </section>
                </ScrollReveal>

                {/* Features */}
                <ScrollReveal>
                    <section className="mb-32">
                        <SectionHeading>主な機能</SectionHeading>
                        <div className="grid gap-8 md:grid-cols-2">
                            {FEATURE_ITEMS.map((item, index) => (
                                <ScrollReveal
                                    key={index}
                                    delay={index * 0.1}
                                    direction={
                                        index % 2 === 0 ? 'left' : 'right'
                                    }
                                >
                                    <FeatureCard item={item} />
                                </ScrollReveal>
                            ))}
                        </div>
                    </section>
                </ScrollReveal>

                {/* Quick Start */}
                <ScrollReveal>
                    <section id="quick-start" className="mb-32 scroll-mt-20">
                        <SectionHeading>クイックスタート</SectionHeading>
                        <div className="grid gap-8 lg:grid-cols-2">
                            {QUICK_START_ITEMS.map((item, index) => (
                                <ScrollReveal
                                    key={index}
                                    delay={index * 0.1}
                                    direction={
                                        index % 2 === 0 ? 'left' : 'right'
                                    }
                                >
                                    <QuickStartCard item={item} />
                                </ScrollReveal>
                            ))}
                        </div>

                        {/* Project Structure Overview */}
                        <ScrollReveal delay={0.4}>
                            <Card className="mt-16 border-zinc-200 bg-white shadow-lg dark:border-zinc-700 dark:bg-zinc-800 dark:shadow-xl">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2 text-2xl text-zinc-900 dark:text-zinc-100">
                                        <div className="rounded-lg bg-zinc-100 p-2 dark:bg-zinc-700">
                                            📁
                                        </div>
                                        プロジェクト構造
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <CopyableCode
                                        title="Directory Structure"
                                        code={[
                                            '📦 shadcn-starter/',
                                            '├── 📱 apps/',
                                            '│ ├── 🌐 web/           # Next.js アプリケーション',
                                            '│ └── 📚 docs/          # Storybook ドキュメント',
                                            '├── 📦 packages/',
                                            '│ ├── 🎨 ui/            # 共有UIコンポーネント',
                                            '│ ├── 🔧 eslint-config/ # ESLint設定',
                                            '│ ├── ⚙️ typescript-config/ # TypeScript設定',
                                            '│ ├── 🧪 e2e-web/       # E2Eテストパッケージ',
                                            '│ └── ⚙️ jest-config/   # Jest設定',
                                            '└── ⚡ turbo.json        # Turborepo設定',
                                        ]}
                                        className="bg-linear-to-br from-zinc-50 to-zinc-100 dark:from-zinc-700 dark:to-zinc-600"
                                    />
                                </CardContent>
                            </Card>
                        </ScrollReveal>
                    </section>
                </ScrollReveal>

                {/* Call to Action */}
                <ScrollReveal>
                    <section className="text-center">
                        <div className="relative overflow-hidden rounded-3xl bg-linear-to-br from-zinc-900 via-zinc-800 to-zinc-700 p-16 text-white dark:from-zinc-100 dark:via-zinc-200 dark:to-zinc-300 dark:text-zinc-900">
                            <div className="absolute inset-0 bg-linear-to-br from-zinc-900/20 to-transparent dark:from-white/20"></div>
                            <div className="relative z-10">
                                <h2 className="mb-6 text-4xl font-bold md:text-5xl">
                                    今すぐ始めよう
                                </h2>
                                <p className="mx-auto mb-10 max-w-2xl text-xl leading-relaxed text-zinc-200 dark:text-zinc-700">
                                    モダンなWebアプリケーション開発の
                                    <br className="hidden sm:block" />
                                    <span className="font-semibold text-white dark:text-zinc-900">
                                        ベストプラクティスが詰まったテンプレート
                                    </span>
                                </p>

                                <div className="mb-12 flex flex-col gap-6 sm:flex-row sm:justify-center">
                                    <ButtonLink
                                        href="https://github.com/taiga-tech/shadcn-starter/generate"
                                        size="lg"
                                        external
                                        className="group bg-white px-10 py-4 text-zinc-900 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:bg-zinc-100 hover:shadow-xl dark:bg-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-700"
                                    >
                                        <span className="flex items-center gap-2">
                                            テンプレートを使用
                                            <Star className="h-4 w-4 transition-transform group-hover:scale-110" />
                                        </span>
                                    </ButtonLink>
                                    <ButtonLink
                                        href="https://github.com/taiga-tech/shadcn-starter"
                                        variant="outline"
                                        size="lg"
                                        external
                                        className="border-2 border-zinc-300 px-10 py-4 text-zinc-800 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:bg-zinc-800 hover:shadow-xl dark:border-zinc-600 dark:text-white"
                                    >
                                        GitHubで確認
                                    </ButtonLink>
                                </div>

                                <div className="mt-12 grid grid-cols-2 gap-8 border-t border-zinc-600 pt-8 md:grid-cols-4 dark:border-zinc-400">
                                    <div className="text-center">
                                        <div className="mb-1 text-2xl font-bold text-white dark:text-zinc-900">
                                            50+
                                        </div>
                                        <div className="text-sm text-zinc-300 dark:text-zinc-600">
                                            設定済みパッケージ
                                        </div>
                                    </div>
                                    <div className="text-center">
                                        <div className="mb-1 text-2xl font-bold text-white dark:text-zinc-900">
                                            12s
                                        </div>
                                        <div className="text-sm text-zinc-300 dark:text-zinc-600">
                                            高速ビルド
                                        </div>
                                    </div>
                                    <div className="text-center">
                                        <div className="mb-1 text-2xl font-bold text-white dark:text-zinc-900">
                                            94%
                                        </div>
                                        <div className="text-sm text-zinc-300 dark:text-zinc-600">
                                            テストカバレッジ
                                        </div>
                                    </div>
                                    <div className="text-center">
                                        <div className="mb-1 text-2xl font-bold text-white dark:text-zinc-900">
                                            5min
                                        </div>
                                        <div className="text-sm text-zinc-300 dark:text-zinc-600">
                                            セットアップ時間
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </ScrollReveal>
            </main>
        </div>
    )
}

export default Page
