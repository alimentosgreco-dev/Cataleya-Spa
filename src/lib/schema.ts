import { siteConfig } from "@/data/navigation";

export function getLocalBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "BeautySalon",
    name: siteConfig.name,
    description: siteConfig.description,
    image: "https://cataleyabeautyspa.mx/og-image.jpg",
    telephone: `+52-${siteConfig.phone}`,
    email: siteConfig.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Calle Mina 93A",
      addressLocality: "Ciudad de México",
      addressRegion: "CDMX",
      addressCountry: "MX",
      postalCode: "06300",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 19.4412,
      longitude: -99.1456,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        opens: "09:00",
        closes: "20:00",
      },
    ],
    priceRange: "$$",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5",
      reviewCount: "250",
    },
  };
}
