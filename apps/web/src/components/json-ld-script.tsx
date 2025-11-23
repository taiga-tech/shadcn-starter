import type { Thing, WithContext } from 'schema-dts'

import { generateJsonLd } from '@/lib/json-ld'

interface JsonLdScriptProps {
    data: WithContext<Thing> | WithContext<Thing>[]
}

export function JsonLdScript({ data }: JsonLdScriptProps) {
    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: generateJsonLd(data) }}
        />
    )
}
