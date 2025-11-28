import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Conectividad Rural LATAM | Redes Mesh LoRa + IA para America Latina',
  description: 'Sistema de bajo costo que lleva seguridad infantil, educacion inteligente y asistencia agricola a zonas rurales sin cobertura movil. 100x mas economico que torres celulares. Conectando 180 millones de personas.',
  keywords: [
    'conectividad rural',
    'mesh LoRa',
    'educacion rural',
    'seguridad infantil',
    'America Latina',
    'agricultura',
    'IA educativa',
    'Claude AI',
    'Meshtastic',
    'desarrollo rural',
  ],
  authors: [{ name: 'Conectividad Rural LATAM' }],
  creator: 'Conectividad Rural LATAM',
  openGraph: {
    type: 'website',
    locale: 'es_LA',
    url: 'https://conectividad-rural.vercel.app',
    siteName: 'Conectividad Rural LATAM',
    title: 'Conectividad Rural LATAM | Redes Mesh LoRa + IA',
    description: 'Sistema de bajo costo que conecta 180 millones de personas rurales con seguridad, educacion e IA. 100x mas economico que torres celulares.',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Conectividad Rural LATAM - Redes Mesh LoRa + IA',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Conectividad Rural LATAM | Redes Mesh LoRa + IA',
    description: 'Conectando 180 millones de personas rurales con seguridad, educacion e IA. 100x mas economico.',
    images: ['/images/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className="scroll-smooth">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#0ea5e9" />
      </head>
      <body className="min-h-screen bg-white antialiased">
        {children}
      </body>
    </html>
  )
}
