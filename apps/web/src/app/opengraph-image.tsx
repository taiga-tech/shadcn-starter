import { ImageResponse } from 'next/og'

export const runtime = 'edge'

const FONT_SIZE = {
    title: 48,
    subtitle: 28,
    description: 20,
} as const

const COLORS = {
    background: '#0f172a',
    backgroundGradient:
        'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)',
    primary: '#ffffff',
    secondary: '#cbd5e1',
    accent: '#3b82f6',
    accentSecondary: '#8b5cf6',
    highlight: '#06b6d4',
} as const

const OpenGraphImage = () => {
    try {
        const title = 'shadcn/ui Starter'
        const subtitle = 'Next.js 15 + React 19 + Turborepo'
        const description = 'モノレポテンプレート'

        return new ImageResponse(
            (
                <div
                    style={{
                        height: '100%',
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: COLORS.backgroundGradient,
                        backgroundImage: `
                            radial-gradient(circle at 20% 20%, ${COLORS.accent}40 0%, transparent 50%),
                            radial-gradient(circle at 80% 80%, ${COLORS.accentSecondary}30 0%, transparent 50%),
                            radial-gradient(circle at 40% 60%, ${COLORS.highlight}20 0%, transparent 50%)
                        `,
                        fontFamily: '"Inter", sans-serif',
                        position: 'relative',
                        overflow: 'hidden',
                    }}
                >
                    {/* バックグラウンドの装飾的な要素 */}
                    <div
                        style={{
                            position: 'absolute',
                            top: '-100px',
                            right: '-100px',
                            width: '400px',
                            height: '400px',
                            background: `linear-gradient(45deg, ${COLORS.accent}20, ${COLORS.accentSecondary}20)`,
                            borderRadius: '50%',
                            filter: 'blur(100px)',
                        }}
                    />
                    <div
                        style={{
                            position: 'absolute',
                            bottom: '-150px',
                            left: '-150px',
                            width: '500px',
                            height: '500px',
                            background: `linear-gradient(-45deg, ${COLORS.highlight}15, ${COLORS.accent}15)`,
                            borderRadius: '50%',
                            filter: 'blur(120px)',
                        }}
                    />

                    {/* メインコンテンツエリア */}
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: 'rgba(15, 23, 42, 0.8)',
                            backdropFilter: 'blur(20px)',
                            borderRadius: '32px',
                            padding: '80px 60px',
                            margin: '40px',
                            boxShadow: `
                                0 25px 50px -12px rgba(0, 0, 0, 0.5),
                                0 0 0 1px rgba(255, 255, 255, 0.1)
                            `,
                            border: `1px solid rgba(255, 255, 255, 0.1)`,
                            maxWidth: '1000px',
                            textAlign: 'center',
                            position: 'relative',
                        }}
                    >
                        {/* ブランドロゴ風のアイコン */}
                        <div
                            style={{
                                width: '80px',
                                height: '80px',
                                background: `linear-gradient(135deg, ${COLORS.accent}, ${COLORS.accentSecondary})`,
                                borderRadius: '20px',
                                marginBottom: '32px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                boxShadow: `0 20px 40px rgba(59, 130, 246, 0.3)`,
                            }}
                        >
                            <div
                                style={{
                                    color: 'white',
                                    fontSize: '36px',
                                    fontWeight: 'bold',
                                }}
                            >
                                S
                            </div>
                        </div>

                        {/* タイトル */}
                        <div
                            style={{
                                fontSize: FONT_SIZE.title + 8,
                                fontWeight: '900',
                                background: `linear-gradient(135deg, ${COLORS.primary}, ${COLORS.secondary})`,
                                backgroundClip: 'text',
                                color: 'transparent',
                                marginBottom: '16px',
                                lineHeight: 1.1,
                                letterSpacing: '-0.02em',
                            }}
                        >
                            {title}
                        </div>

                        {/* サブタイトル */}
                        <div
                            style={{
                                fontSize: FONT_SIZE.subtitle,
                                fontWeight: '600',
                                background: `linear-gradient(135deg, ${COLORS.accent}, ${COLORS.highlight})`,
                                backgroundClip: 'text',
                                color: 'transparent',
                                marginBottom: '24px',
                                lineHeight: 1.3,
                            }}
                        >
                            {subtitle}
                        </div>

                        {/* 説明文 */}
                        <div
                            style={{
                                fontSize: FONT_SIZE.description,
                                color: COLORS.secondary,
                                lineHeight: 1.5,
                                maxWidth: '800px',
                            }}
                        >
                            {description}
                        </div>

                        {/* テクノロジーバッジ */}
                        <div
                            style={{
                                display: 'flex',
                                flexWrap: 'wrap',
                                gap: '16px',
                                marginTop: '40px',
                                justifyContent: 'center',
                            }}
                        >
                            {[
                                'TypeScript',
                                'Tailwind CSS',
                                'shadcn/ui',
                                'Storybook',
                            ].map((tech) => (
                                <div
                                    key={tech}
                                    style={{
                                        background: `linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(139, 92, 246, 0.1))`,
                                        backdropFilter: 'blur(10px)',
                                        color: COLORS.primary,
                                        padding: '12px 20px',
                                        borderRadius: '24px',
                                        fontSize: '18px',
                                        fontWeight: '600',
                                        border: `1px solid rgba(255, 255, 255, 0.2)`,
                                        boxShadow:
                                            '0 8px 32px rgba(0, 0, 0, 0.1)',
                                    }}
                                >
                                    {tech}
                                </div>
                            ))}
                        </div>

                        {/* CTA風の要素 */}
                        <div
                            style={{
                                marginTop: '48px',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '16px',
                            }}
                        >
                            <div
                                style={{
                                    background: `linear-gradient(135deg, ${COLORS.accent}, ${COLORS.accentSecondary})`,
                                    color: 'white',
                                    padding: '16px 32px',
                                    borderRadius: '28px',
                                    fontSize: '20px',
                                    fontWeight: '700',
                                    boxShadow: `0 16px 32px rgba(59, 130, 246, 0.3)`,
                                }}
                            >
                                Get Started
                            </div>
                            <div
                                style={{
                                    color: COLORS.secondary,
                                    fontSize: '18px',
                                    fontWeight: '500',
                                }}
                            >
                                →
                            </div>
                        </div>
                    </div>

                    {/* フッター */}
                    <div
                        style={{
                            position: 'absolute',
                            bottom: '30px',
                            right: '30px',
                            fontSize: '16px',
                            color: COLORS.secondary,
                            fontWeight: '500',
                            background: 'rgba(15, 23, 42, 0.6)',
                            padding: '8px 16px',
                            borderRadius: '16px',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                        }}
                    >
                        taiga-tech.dev
                    </div>
                </div>
            ),
            {
                width: 1200,
                height: 630,
            }
        )
    } catch (error) {
        console.error('OG画像生成エラー:', error)

        // エラー時のフォールバック画像
        return new ImageResponse(
            (
                <div
                    style={{
                        height: '100%',
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: COLORS.backgroundGradient,
                        fontSize: '32px',
                        fontWeight: 'bold',
                        color: COLORS.primary,
                    }}
                >
                    shadcn/ui Starter
                </div>
            ),
            {
                width: 1200,
                height: 630,
            }
        )
    }
}

export default OpenGraphImage
