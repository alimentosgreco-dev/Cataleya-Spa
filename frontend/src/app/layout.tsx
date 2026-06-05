import type { Metadata, Viewport } from "next";
import { Playfair_Display, DM_Sans } from "next/font/google";
import { ClientProviders } from "@/components/providers/ClientProviders";
import { getLocalBusinessSchema } from "@/lib/schema";
import { siteConfig } from "@/data/navigation";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#7C529C" },
    { media: "(prefers-color-scheme: dark)", color: "#0f0d12" },
  ],
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://cataleyabeautyspa.mx"),
  title: {
    default: `${siteConfig.name} | Spa Premium en CDMX`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "spa CDMX",
    "beauty center Ciudad de México",
    "tratamientos faciales",
    "masajes relajantes",
    "manicure gelish",
    "depilación láser",
    "Cataleya Beauty Spa",
    "spa Colonia Guerrero",
    "centro estético premium",
    "wellness CDMX",
  ],
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  openGraph: {
    type: "website",
    locale: "es_MX",
    url: "https://cataleyabeautyspa.mx",
    siteName: siteConfig.name,
    title: `${siteConfig.name} | Spa Premium en CDMX`,
    description: siteConfig.description,
    images: [
      {
        url: "/img/hero/muestra.jpg",
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} — Spa premium en Colonia Guerrero, CDMX`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: ["/img/hero/muestra.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://cataleyabeautyspa.mx",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const schema = getLocalBusinessSchema();

  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      </head>
      <body
        className={`${playfair.variable} ${dmSans.variable} min-h-screen bg-background text-foreground antialiased`}
      >
        <ClientProviders>
          <a
            href="#inicio"
            className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[200] focus:rounded-lg focus:bg-purple focus:px-4 focus:py-2 focus:text-white"
          >
            Saltar al contenido
          </a>
          {children}
        </ClientProviders>
      </body>
    </html>
  );
}
