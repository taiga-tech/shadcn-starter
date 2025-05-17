import type { BreadcrumbList, WithContext } from 'schema-dts'

export type Links = {
    href: string
    title: string
    current?: boolean
}[]

export const breadcrumbsList = (links: Links): WithContext<BreadcrumbList> => ({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: links.map((item, i: number) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: item.title,
        // item: INFO.contact.hp.content + item.href,
    })),
})
