import { PropsWithChildren } from 'react'

import { cn } from '@workspace/ui/lib/utils'

import { sans } from '@/lib/fonts'
import { websiteJsonLd } from '@/lib/json-ld'
import { defaultMetadata } from '@/lib/metadata'

import { JsonLdScript } from '@/components/json-ld-script'
import { Providers } from '@/components/providers'

import '@workspace/ui/globals.css'

export const metadata = defaultMetadata

const RootLayout = ({ children }: Readonly<PropsWithChildren>) => {
    return (
        <html
            lang="ja"
            className={cn(sans.variable, 'scroll-smooth')}
            suppressHydrationWarning
        >
            <body>
                <JsonLdScript data={websiteJsonLd} />
                <Providers>{children}</Providers>
            </body>
        </html>
    )
}

export default RootLayout
