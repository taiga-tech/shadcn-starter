import { memo } from 'react'

import { Badge } from '@workspace/ui/components/badge'
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from '@workspace/ui/components/card'
import { cn } from '@workspace/ui/lib/utils'

import { ButtonLink } from '@/components/button-link'

// カスタムCSSアニメーション
const customStyles = `
  @keyframes gradient {
    0%, 100% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
  }
  @keyframes fade-in {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .animate-gradient { animation: gradient 6s ease infinite; }
  .animate-fade-in { animation: fade-in 1s ease-out; }
  .bg-300% { background-size: 300% 300%; }
`

// 共通スタイル定数
const GLASS_CARD_STYLES =
    'border-violet-500/20 bg-black/40 backdrop-blur-md transition-all duration-500 hover:border-violet-400/60 hover:shadow-lg hover:shadow-violet-500/10 hover:scale-[1.02] group'
const GRADIENT_HEADING_STYLES =
    'bg-gradient-to-r from-white via-violet-100 to-violet-300 bg-clip-text text-transparent'
const GRADIENT_BADGE_STYLES = 'text-white backdrop-blur-sm'
const CODE_BLOCK_STYLES = 'rounded-lg bg-gray-900/50 p-4 font-mono text-sm'
const PRIMARY_BUTTON_STYLES =
    'border-0 bg-gradient-to-r from-violet-600 to-purple-600 shadow-lg shadow-purple-500/25 backdrop-blur-sm hover:from-violet-700 hover:to-purple-700 hover:shadow-xl hover:shadow-purple-500/40 text-lg px-8 py-4 text-white font-semibold'
const OUTLINE_BUTTON_STYLES =
    'border-violet-400/50 text-violet-300 backdrop-blur-sm hover:bg-violet-500/10 hover:border-violet-400/80 hover:shadow-lg hover:shadow-violet-500/20 text-lg px-8 py-4'

// データ定数
const PROJECT_ITEMS = [
    {
        badge: {
            text: 'Apps',
            gradient: 'from-violet-600/70 to-purple-600/70',
        },
        title: 'Webアプリケーション',
        items: [
            'Next.js 15 + React 19',
            'Turbopack',
            'TypeScript',
            'Tailwind CSS',
        ],
    },
    {
        badge: {
            text: 'Docs',
            gradient: 'from-indigo-600/70 to-violet-600/70',
        },
        title: 'Storybook',
        items: [
            'コンポーネント一覧',
            'インタラクションテスト',
            'ビジュアルテスト',
            'ドキュメント生成',
        ],
    },
    {
        badge: { text: 'UI', gradient: 'from-purple-600/70 to-pink-600/70' },
        title: 'コンポーネント',
        items: ['shadcn/ui', 'Radix UI', 'Tailwind CSS', 'クラスバリアント'],
    },
    {
        badge: {
            text: 'Config',
            gradient: 'from-cyan-600/70 to-violet-600/70',
        },
        title: '共有設定',
        items: ['ESLint設定', 'TypeScript設定', 'Jest設定', 'Prettier設定'],
    },
    {
        badge: {
            text: 'Tools',
            gradient: 'from-emerald-600/70 to-violet-600/70',
        },
        title: '開発ツール',
        items: [
            'Turborepo',
            'pnpm workspace',
            'Playwright',
            'Husky + lint-staged',
        ],
    },
    {
        badge: {
            text: 'Test',
            gradient: 'from-orange-600/70 to-violet-600/70',
        },
        title: 'テスト環境',
        items: [
            'Jest（ユニット）',
            'Playwright（E2E）',
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
    },
    {
        title: 'Next.js 15 + React 19',
        description:
            '最新のNext.js App RouterとReact 19の新機能を活用。 Server ComponentsとServer Actionsでパフォーマンス最適化。',
    },
    {
        title: '型安全な開発',
        description:
            'TypeScript + Zod によるエンドツーエンドの型安全性。ESLintとPrettierで一貫したコード品質を維持。',
    },
    {
        title: '包括的テスト',
        description:
            'ユニット・インテグレーション・E2E・ビジュアルテストを統合。CI/CDパイプラインでの自動品質チェック。',
    },
]

const QUICK_START_ITEMS = [
    {
        title: 'インストール',
        commands: [
            {
                comment: '# リポジトリをクローン',
                command: 'git clone [repository-url]',
            },
            { comment: '# 依存関係をインストール', command: 'pnpm install' },
            { comment: '# 開発サーバーを起動', command: 'pnpm dev' },
        ],
        description:
            'すべてのアプリケーション（Web、Storybook）が同時に起動されます。',
    },
    {
        title: 'コンポーネント追加',
        commands: [
            {
                comment: '# shadcn/uiコンポーネントを追加',
                command: 'pnpm dlx shadcn@latest add button -c apps/web',
            },
            {
                comment: '# 使用例',
                command:
                    "import { Button } from '@workspace/ui/components/button'",
                isImport: true,
            },
        ],
        description: 'コンポーネントは自動的に共有UIパッケージに配置されます。',
    },
    {
        title: 'テスト実行',
        commands: [
            { comment: '# 全テスト実行', command: 'pnpm test' },
            {
                comment: '# E2Eテスト（ビルド必要）',
                command: 'pnpm build && pnpm test:e2e',
            },
        ],
        description:
            'ユニット、インテグレーション、E2Eテストが含まれています。',
    },
    {
        title: 'コード品質',
        commands: [
            { comment: '# リント実行', command: 'pnpm lint' },
            { comment: '# 型チェック', command: 'pnpm check-types' },
            { comment: '# フォーマット', command: 'pnpm format' },
        ],
        description: 'ESLint、TypeScript、Prettierで品質を保証します。',
    },
]

// コンポーネント
const GradientBadge = memo(
    ({ text, gradient }: { text: string; gradient: string }) => (
        <Badge
            className={cn('bg-gradient-to-r', gradient, GRADIENT_BADGE_STYLES)}
            variant="secondary"
        >
            {text}
        </Badge>
    )
)

GradientBadge.displayName = 'GradientBadge'

const ProjectCard = memo(
    ({ item }: { item: (typeof PROJECT_ITEMS)[number] }) => (
        <Card className={GLASS_CARD_STYLES}>
            <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-violet-500/5 to-purple-500/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100"></div>
            <CardHeader className="relative z-10">
                <CardTitle className="flex items-center gap-3 text-white transition-colors duration-300 group-hover:text-violet-100">
                    <div className="transform transition-transform duration-300 group-hover:scale-110">
                        <GradientBadge
                            text={item.badge.text}
                            gradient={item.badge.gradient}
                        />
                    </div>
                    <span className="transition-transform duration-300 group-hover:translate-x-1">
                        {item.title}
                    </span>
                </CardTitle>
            </CardHeader>
            <CardContent className="relative z-10">
                <ul className="space-y-3 text-sm text-gray-300">
                    {item.items.map((listItem, index) => (
                        <li
                            key={index}
                            className="flex items-center gap-2 transition-colors duration-300 group-hover:text-gray-200"
                            style={{ animationDelay: `${index * 100}ms` }}
                        >
                            <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-violet-400 to-purple-400 transition-all duration-300 group-hover:shadow-sm group-hover:shadow-violet-400/50"></span>
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
        <Card className={GLASS_CARD_STYLES}>
            <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-violet-500/5 to-purple-500/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100"></div>
            <CardHeader className="relative z-10">
                <CardTitle className="flex items-center gap-2 text-white transition-colors duration-300 group-hover:text-violet-100">
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-r from-violet-500/20 to-purple-500/20 transition-transform duration-300 group-hover:scale-110">
                        ✨
                    </span>
                    <span className="transition-transform duration-300 group-hover:translate-x-1">
                        {item.title}
                    </span>
                </CardTitle>
            </CardHeader>
            <CardContent className="relative z-10">
                <p className="leading-relaxed text-gray-300 transition-colors duration-300 group-hover:text-gray-200">
                    {item.description}
                </p>
            </CardContent>
        </Card>
    )
)

FeatureCard.displayName = 'FeatureCard'

const QuickStartCard = memo(
    ({ item }: { item: (typeof QUICK_START_ITEMS)[number] }) => (
        <Card className={cn(GLASS_CARD_STYLES, 'relative overflow-hidden')}>
            <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-violet-500/5 to-purple-500/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100"></div>
            <div className="absolute left-0 top-0 h-1 w-full bg-gradient-to-r from-violet-500 to-purple-500 opacity-0 transition-opacity duration-500 group-hover:opacity-100"></div>

            <CardHeader className="relative z-10">
                <CardTitle className="flex items-center gap-3 text-white transition-colors duration-300 group-hover:text-violet-100">
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-r from-violet-500/20 to-purple-500/20 transition-transform duration-300 group-hover:scale-110">
                        ⚡
                    </span>
                    <span className="transition-transform duration-300 group-hover:translate-x-1">
                        {item.title}
                    </span>
                </CardTitle>
            </CardHeader>

            <CardContent className="relative z-10 space-y-4">
                <div
                    className={cn(
                        CODE_BLOCK_STYLES,
                        'relative transition-colors duration-300 group-hover:bg-gray-900/70'
                    )}
                >
                    <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-violet-500/5 to-purple-500/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100"></div>
                    <div className="relative z-10">
                        {item.commands.map((cmd, index) => (
                            <div
                                key={index}
                                className="group/command rounded p-1 transition-colors duration-200 hover:bg-gray-800/30"
                            >
                                {index > 0 && <div className="mt-3" />}
                                <div className="mb-1 text-xs text-gray-400 transition-colors duration-200 group-hover/command:text-gray-300">
                                    {cmd.comment}
                                </div>
                                <div
                                    className={cn(
                                        'relative font-mono transition-colors duration-200',
                                        cmd.isImport
                                            ? 'text-green-400 group-hover/command:text-green-300'
                                            : 'text-violet-300 group-hover/command:text-violet-200'
                                    )}
                                >
                                    <span className="relative z-10">
                                        {cmd.command}
                                    </span>
                                    {!cmd.isImport && (
                                        <div className="absolute inset-y-0 left-0 w-1 rounded bg-gradient-to-b from-violet-500 to-purple-500 opacity-0 transition-opacity duration-200 group-hover/command:opacity-100"></div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <p className="text-sm leading-relaxed text-gray-300 transition-colors duration-300 group-hover:text-gray-200">
                    {item.description}
                </p>
            </CardContent>
        </Card>
    )
)

QuickStartCard.displayName = 'QuickStartCard'

const SectionHeading = memo(({ children }: { children: React.ReactNode }) => (
    <div className="relative mb-12 text-center">
        <div className="absolute -top-4 left-1/2 h-1 w-32 -translate-x-1/2 bg-gradient-to-r from-transparent via-violet-500/50 to-transparent"></div>
        <h2 className="relative inline-block text-4xl font-bold">
            <span className={cn('relative z-10', GRADIENT_HEADING_STYLES)}>
                {children}
            </span>
            <div className="absolute -inset-2 -z-10 rounded-lg bg-gradient-to-r from-purple-600/10 to-violet-600/10 blur-lg"></div>
        </h2>
        <div className="absolute -bottom-4 left-1/2 h-0.5 w-16 -translate-x-1/2 bg-gradient-to-r from-violet-500 to-purple-500"></div>
    </div>
))

SectionHeading.displayName = 'SectionHeading'

const Page = () => {
    return (
        <>
            <style dangerouslySetInnerHTML={{ __html: customStyles }} />
            <div className="relative min-h-svh overflow-hidden bg-black text-white">
                {/* 動的背景エフェクト */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 via-violet-800/15 to-indigo-900/30"></div>
                <div className="absolute inset-0 animate-pulse bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-purple-600/20 via-transparent to-transparent"></div>
                <div className="absolute inset-0 animate-pulse bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-violet-600/20 via-transparent to-transparent [animation-delay:1s]"></div>
                <div className="absolute inset-0 animate-ping bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-transparent via-purple-500/5 to-transparent [animation-duration:4s]"></div>

                {/* グリッドパターン */}
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGcgY2xpcC1wYXRoPSJ1cmwoI2NsaXAwXzFfMikiPgo8cGF0aCBkPSJNMCAwSDQwVjQwSDBWMFoiIGZpbGw9InVybCgjcGFpbnQwX3JhZGlhbF8xXzIpIiBmaWxsLW9wYWNpdHk9IjAuMDUiLz4KPC9nPgo8ZGVmcz4KPGNsaXBQYXRoIGlkPSJjbGlwMF8xXzIiPgo8cmVjdCB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIGZpbGw9IndoaXRlIi8+CjwvY2xpcFBhdGg+CjxyYWRpYWxHcmFkaWVudCBpZD0icGFpbnQwX3JhZGlhbF8xXzIiIGN4PSIyMCIgY3k9IjIwIiByPSIyMCIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiPgo8c3RvcCBzdG9wLWNvbG9yPSIjOEI1Q0Y2Ii8+CjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iIzhCNUNGNiIgc3RvcC1vcGFjaXR5PSIwIi8+CjwvcmFkaWFsR3JhZGllbnQ+CjwvZGVmcz4KPC9zdmc+')] opacity-30"></div>
                <main className="container relative z-10 mx-auto px-4 py-12">
                    <section className="relative mb-20 text-center">
                        {/* ヒーローグロー効果 */}
                        <div className="absolute -top-10 left-1/2 h-96 w-96 -translate-x-1/2 animate-pulse rounded-full bg-gradient-to-r from-purple-600/20 to-violet-600/20 blur-3xl"></div>

                        <div className="relative z-10">
                            <div className="animate-fade-in mb-6 inline-flex items-center gap-3">
                                <Badge
                                    className="border-violet-400/50 bg-violet-500/10 text-violet-300 shadow-lg shadow-violet-500/25 backdrop-blur-sm transition-all duration-300 hover:bg-violet-500/20"
                                    variant="outline"
                                >
                                    <span className="mr-2 inline-block h-2 w-2 animate-pulse rounded-full bg-emerald-400"></span>
                                    v1.0.0
                                </Badge>
                                <Badge className="bg-gradient-to-r from-purple-600/80 to-violet-600/80 text-white shadow-lg shadow-purple-500/25 backdrop-blur-sm transition-all duration-300 hover:from-purple-600 hover:to-violet-600">
                                    ✨ モノレポテンプレート
                                </Badge>
                            </div>

                            <h1 className="relative mb-8 text-5xl font-bold tracking-tight md:text-7xl">
                                <span className="animate-gradient bg-300% relative inline-block bg-gradient-to-r from-white via-violet-100 to-purple-200 bg-clip-text text-transparent">
                                    shadcn/ui Starter
                                </span>
                                <div className="absolute -inset-1 -z-10 animate-pulse bg-gradient-to-r from-purple-600/20 to-violet-600/20 blur-lg"></div>
                            </h1>

                            <p className="mx-auto mb-10 max-w-3xl text-xl leading-relaxed text-gray-300 md:text-2xl">
                                <span className="bg-gradient-to-r from-gray-200 to-gray-400 bg-clip-text text-transparent">
                                    Next.js 15 + React 19 + Turborepo を使用した
                                </span>
                                <br />
                                <span className="bg-gradient-to-r from-violet-300 to-purple-300 bg-clip-text font-medium text-transparent">
                                    モダンなUIコンポーネントライブラリテンプレート
                                </span>
                            </p>

                            <div className="flex flex-col items-center gap-6 sm:flex-row sm:justify-center">
                                <ButtonLink
                                    href="#quick-start"
                                    size="lg"
                                    className={cn(
                                        PRIMARY_BUTTON_STYLES,
                                        'group transform transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/25'
                                    )}
                                >
                                    <span className="flex items-center gap-2">
                                        🚀 開発を開始
                                        <span className="transition-transform duration-300 group-hover:translate-x-1">
                                            →
                                        </span>
                                    </span>
                                </ButtonLink>
                                <ButtonLink
                                    href="https://storybook.js.org/"
                                    variant="outline"
                                    size="lg"
                                    external
                                    className={cn(
                                        OUTLINE_BUTTON_STYLES,
                                        'group transform transition-all duration-300 hover:scale-105'
                                    )}
                                >
                                    <span className="flex items-center gap-2">
                                        📚 ドキュメント
                                        <span className="transition-transform duration-300 group-hover:rotate-12">
                                            📖
                                        </span>
                                    </span>
                                </ButtonLink>
                            </div>

                            {/* フローティング要素 */}
                            <div className="absolute left-10 top-20 hidden h-4 w-4 animate-bounce rounded-full bg-purple-500/30 [animation-delay:0.5s] lg:block"></div>
                            <div className="absolute right-16 top-32 hidden h-3 w-3 animate-bounce rounded-full bg-violet-500/30 [animation-delay:1s] lg:block"></div>
                            <div className="absolute bottom-10 left-20 hidden h-2 w-2 animate-bounce rounded-full bg-indigo-500/30 [animation-delay:1.5s] lg:block"></div>
                        </div>
                    </section>

                    <section className="mb-16">
                        <SectionHeading>プロジェクト構成</SectionHeading>
                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {PROJECT_ITEMS.map((item, index) => (
                                <ProjectCard key={index} item={item} />
                            ))}
                        </div>
                    </section>

                    <section className="mb-16">
                        <SectionHeading>主な機能</SectionHeading>
                        <div className="grid gap-8 md:grid-cols-2">
                            {FEATURE_ITEMS.map((item, index) => (
                                <FeatureCard key={index} item={item} />
                            ))}
                        </div>
                    </section>

                    <section id="quick-start" className="mb-16 scroll-mt-20">
                        <SectionHeading>クイックスタート</SectionHeading>
                        <div className="grid gap-8 lg:grid-cols-2">
                            {QUICK_START_ITEMS.map((item, index) => (
                                <QuickStartCard key={index} item={item} />
                            ))}
                        </div>

                        <Card className="group mt-12 border-violet-500/20 bg-black/40 backdrop-blur-md transition-all duration-500 hover:border-violet-400/60 hover:shadow-lg hover:shadow-violet-500/10">
                            <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-violet-500/5 to-purple-500/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100"></div>
                            <CardHeader className="relative z-10">
                                <CardTitle className="flex items-center gap-3 text-white transition-colors duration-300 group-hover:text-violet-100">
                                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-r from-violet-500/20 to-purple-500/20 transition-transform duration-300 group-hover:scale-110">
                                        📁
                                    </span>
                                    <span className="transition-transform duration-300 group-hover:translate-x-1">
                                        プロジェクト構造
                                    </span>
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="relative z-10">
                                <div
                                    className={cn(
                                        CODE_BLOCK_STYLES,
                                        'transition-colors duration-300 group-hover:bg-gray-900/70'
                                    )}
                                >
                                    <div className="mb-2 font-semibold text-gray-400">
                                        📦 shadcn-starter/
                                    </div>
                                    <div className="text-gray-400 transition-colors duration-200 hover:text-gray-300">
                                        ├──
                                        <span className="font-medium text-violet-300">
                                            📱 apps/
                                        </span>
                                    </div>
                                    <div className="text-gray-400 transition-colors duration-200 hover:text-gray-300">
                                        │ ├──
                                        <span className="text-green-400">
                                            🌐 web/ # Next.js アプリケーション
                                        </span>
                                    </div>
                                    <div className="text-gray-400 transition-colors duration-200 hover:text-gray-300">
                                        │ └──
                                        <span className="text-green-400">
                                            📚 docs/ # Storybook ドキュメント
                                        </span>
                                    </div>
                                    <div className="text-gray-400 transition-colors duration-200 hover:text-gray-300">
                                        ├──
                                        <span className="font-medium text-violet-300">
                                            📦 packages/
                                        </span>
                                    </div>
                                    <div className="text-gray-400 transition-colors duration-200 hover:text-gray-300">
                                        │ ├──
                                        <span className="text-green-400">
                                            🎨 ui/ # 共有UIコンポーネント
                                        </span>
                                    </div>
                                    <div className="text-gray-400 transition-colors duration-200 hover:text-gray-300">
                                        │ ├──
                                        <span className="text-green-400">
                                            🔧 eslint-config/ # ESLint設定
                                        </span>
                                    </div>
                                    <div className="text-gray-400 transition-colors duration-200 hover:text-gray-300">
                                        │ ├──
                                        <span className="text-green-400">
                                            ⚙️ typescript-config/ #
                                            TypeScript設定
                                        </span>
                                    </div>
                                    <div className="text-gray-400 transition-colors duration-200 hover:text-gray-300">
                                        │ └──
                                        <span className="text-green-400">
                                            🧪 jest-config/ # Jest設定
                                        </span>
                                    </div>
                                    <div className="text-gray-400 transition-colors duration-200 hover:text-gray-300">
                                        └──
                                        <span className="font-medium text-violet-300">
                                            ⚡ turbo.json # Turborepo設定
                                        </span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </section>

                    <section className="text-center">
                        <SectionHeading>今すぐ始めよう</SectionHeading>
                        <p className="mb-8 text-lg text-gray-300">
                            モダンなWebアプリケーション開発のベストプラクティスが詰まったテンプレート
                        </p>
                        <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
                            <ButtonLink
                                href="https://github.com/taiga-tech/shadcn-starter/generate"
                                size="lg"
                                external
                                className={PRIMARY_BUTTON_STYLES}
                            >
                                テンプレートを使用
                            </ButtonLink>
                            <ButtonLink
                                href="https://github.com/taiga-tech/shadcn-starter"
                                variant="outline"
                                size="lg"
                                external
                                className={OUTLINE_BUTTON_STYLES}
                            >
                                GitHubで確認
                            </ButtonLink>
                        </div>
                    </section>
                </main>
            </div>
        </>
    )
}

export default Page
