import { siteConfig } from "@/data/navigation";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://cataleyabeautyspa.mx";

export function getLocalBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "BeautySalon",
    "@id": `${siteUrl}/#business`,
    name: siteConfig.name,
    description: siteConfig.description,
    url: siteUrl,
    image: `${siteUrl}/img/hero/muestra.jpg`,
    telephone: `+52${siteConfig.phone}`,
    email: siteConfig.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Calle Mina 93A",
      addressNeighborhood: "Colonia Guerrero",
      addressLocality: "Ciudad de México",
      addressRegion: "CDMX",
      postalCode: "06300",
      addressCountry: "MX",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 19.4412,
      longitude: -99.1456,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ],
        opens: "10:00",
        closes: "18:00",
      },
    ],
    priceRange: "$$",
    sameAs: [siteConfig.facebookUrl],
  };
}
