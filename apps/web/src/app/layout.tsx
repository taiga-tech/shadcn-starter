import { PropsWithChildren } from 'react'

import { sans } from '@/lib/fonts'

import { Providers } from '@/components/providers'

import '@workspace/ui/globals.css'

export const metadata = {
    title: 'Next.js + Tailwind CSS + TypeScript + Vitest + React Testing Library',
    description:
        'A template for Next.js with Tailwind CSS, TypeScript, Vitest, and React Testing Library',
}

const RootLayout = ({ children }: Readonly<PropsWithChildren>) => {
    return (
        <html lang="ja" className={sans.variable} suppressHydrationWarning>
            <body>
                <Providers>{children}</Providers>
            </body>
        </html>
    )
}

export default RootLayout
