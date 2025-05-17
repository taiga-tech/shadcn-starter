import { Noto_Sans_JP } from 'next/font/google'

export const sans = Noto_Sans_JP({
    weight: ['400', '700'],
    // subsets: ['latin'],
    variable: '--font-noto-sans',
    // display: 'swap',
    preload: false,
    adjustFontFallback: false,
})
