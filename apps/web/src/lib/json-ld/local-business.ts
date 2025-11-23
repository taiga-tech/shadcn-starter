import type { Organization, WithContext } from 'schema-dts'

// import INFO from '@/const/info'

// import { SOCIALS } from '@/const/sns'

export const localBuisiness: WithContext<Organization> = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    // name: INFO.name,
    // image: INFO.contact.hp.content + '/opengraph-image/',
    // url: INFO.contact.hp.content,
    // telephone: INFO.contact.tel.content,
    // priceRange: '¥80,000',
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
    // openingHoursSpecification: {
    //     '@type': 'OpeningHoursSpecification',
    //     dayOfWeek: [
    //         'Monday',
    //         'Tuesday',
    //         'Wednesday',
    //         'Thursday',
    //         'Friday',
    //         'Saturday',
    //         'Sunday',
    //     ],
    //     opens: '00:00',
    //     closes: '23:59',
    // },
    // sameAs: SOCIALS.map((item) => item.href),
}
