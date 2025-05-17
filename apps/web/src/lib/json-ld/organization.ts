import type { Organization, WithContext } from 'schema-dts'

import { SOCIALS } from '@/const/sns'

// import INFO from '@/const/info'
// import { SOCIALS } from '@/const/sns'

// https://www.itti.jp/web-design/microdata-json-ld/

export const organization: WithContext<Organization> = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    // founder: '',
    // name: INFO.name,
    // description: '',
    // founder: '仲野 大雅',
    // foundingDate: '2023-08-04',
    // image: INFO.contact.hp.content + '/opengraph-image/',
    // url: INFO.contact.hp.content,
    // logo: INFO.contact.hp.content + '/public/favicons/icon-512x512.png',
    // telephone: INFO.contact.tel.content,
    // "faxNumber": "+81-00-0000-0000",
    // address: {
    //     '@type': 'PostalAddress',
    //     streetAddress: INFO.address.street,
    //     addressLocality: INFO.address.locality,
    //     addressRegion: INFO.address.region,
    //     postalCode: INFO.address.code,
    //     addressCountry: 'JP',
    // },
    // geo: {
    //     '@type': 'GeoCoordinates',
    //     latitude: INFO.geo.lat,
    //     longitude: INFO.geo.long,
    // },
    // "contactPoint": [
    //     {
    //         "@type": "ContactPoint",
    //         "telephone": "+81-00-0000-0000",
    //         "contactType": "customer service"
    //     }
    // ],
    sameAs: SOCIALS.map((item) => item.href),
}
