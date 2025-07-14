import type { Metadata } from "next";
import { hindVadodara } from './fonts';
import "./globals.css";
import { LanguageProvider } from './context/LanguageContext';
import Navigation from './components/Navigation';

export const metadata: Metadata = {
  metadataBase: new URL('https://www.gujaratrenewables.in'),
  title: "Gujarat Renewables | Solar & Renewable Energy Land Aggregator in Gujarat",
  description: "Gujarat Renewables provides premium land acquisition and leasing services for solar and renewable energy projects in Gujarat. Lease or sell your land for solar and renewable energy projects with the leading land aggregator in Gujarat.",
  keywords: "solar land Gujarat, solar land aggregator, renewable land aggregator, renewable energy Gujarat, solar farm land Gujarat, sell land for solar Gujarat, lease land for solar projects, solar project land, solar land investment Gujarat, gujarat renewable energy, solar land acquisition, solar energy land Gujarat, land for renewable projects, sell land to solar companies, lease land to solar developers, renewable energy land investment, solar power plant land Gujarat, solar panel farm land, renewable energy project land, solar energy investment Gujarat, land leasing for solar farms, Kutch solar land, Banaskantha solar land, Patan solar land, North Gujarat solar land, Saurashtra solar land, Central Gujarat solar land, South Gujarat renewable land, agricultural land for solar Gujarat, barren land for solar projects, unused land for renewable energy, wasteland for solar development, non-agricultural land for solar Gujarat, industrial land for solar projects, land aggregation for solar developers, land pooling for renewable projects, long-term land lease for solar, land purchase for renewable energy, land valuation for solar projects, land due diligence for solar farms, minimum land size for solar project Gujarat, land requirements for 1MW solar plant, solar farm land specifications, ideal land for solar installation, solar land site selection criteria, land survey for renewable projects, landowner benefits from solar leasing, passive income from solar land, land monetization through renewables, land value appreciation with solar, guaranteed land rent from solar projects, how to lease land for solar in Gujarat, where to sell land for solar projects, best districts for solar land in Gujarat, how much land needed for solar farm, solar land lease rates in Gujarat, land acquisition process for solar",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-video-preview': -1,
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://www.gujaratrenewables.in',
    title: 'Gujarat Renewables | Solar & Renewable Energy Land Aggregator in Gujarat',
    description: 'Gujarat Renewables provides premium land acquisition and leasing services for solar and renewable energy projects in Gujarat. Lease or sell your land for solar and renewable energy projects with the leading land aggregator in Gujarat.',
    siteName: 'Gujarat Renewables',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Gujarat Renewables | Solar & Renewable Energy Land Aggregator in Gujarat',
    description: 'Gujarat Renewables provides premium land acquisition and leasing services for solar and renewable energy projects in Gujarat.',
  },
  verification: {
    google: 'google-site-verification-code',
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '32x32' },
      { url: '/favicon.svg', type: 'image/svg+xml' }
    ],
    shortcut: '/favicon.svg',
    apple: '/apple-touch-icon.png',
    // apple: '/favicon.svg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={hindVadodara.variable} suppressHydrationWarning>
      {/* <head>
        <link rel="canonical" href="https://www.gujaratrenewables.in" />
        <link rel="icon" href="/favicon.ico" sizes="32x32" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/favicon.svg" />
      </head> */}
      <body className={`font-sans ${hindVadodara.className} overflow-x-hidden bg-gradient-to-br from-gray-50 to-gray-100 text-gray-800`} suppressHydrationWarning>
        <LanguageProvider>
          <Navigation />
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
