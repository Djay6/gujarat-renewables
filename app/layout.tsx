import type { Metadata } from "next";
import { hindVadodara } from './fonts';
import "./globals.css";
import { LanguageProvider } from './context/LanguageContext';

export const metadata: Metadata = {
  metadataBase: new URL('https://gujaratrenewables.com'),
  title: "ગુજરાત રિન્યુએબલ્સ | સોલાર લેન્ડ એગ્રિગેટર",
  description: "ગુજરાતમાં સોલાર પ્રોજેક્ટ્સ માટે તમારી જમીન ભાડે આપો અથવા વેચો. સોલાર પ્રોજેક્ટ્સ માટે અમે જમીન સંપાદન અને લીઝ સેવાઓ પ્રદાન કરીએ છીએ.",
  keywords: "solar land Gujarat, solar land aggregator, solar farm land Gujarat, sell land for solar Gujarat, lease land for solar projects, ગુજરાતમાં સોલાર પ્રોજેક્ટ્સ, solar land investment Gujarat",
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
    locale: 'gu_IN',
    url: 'https://gujaratrenewables.com',
    title: 'ગુજરાત રિન્યુએબલ્સ | સોલાર લેન્ડ એગ્રિગેટર',
    description: 'ગુજરાતમાં સોલાર પ્રોજેક્ટ્સ માટે તમારી જમીન ભાડે આપો અથવા વેચો. સોલાર પ્રોજેક્ટ્સ માટે અમે જમીન સંપાદન અને લીઝ સેવાઓ પ્રદાન કરીએ છીએ.',
    siteName: 'ગુજરાત રિન્યુએબલ્સ',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ગુજરાત રિન્યુએબલ્સ | સોલાર લેન્ડ એગ્રિગેટર',
    description: 'ગુજરાતમાં સોલાર પ્રોજેક્ટ્સ માટે તમારી જમીન ભાડે આપો અથવા વેચો.',
  },
  verification: {
    google: 'google-site-verification-code',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="gu" className={hindVadodara.variable}>
      <head>
        <link rel="canonical" href="https://gujaratrenewables.com" />
      </head>
      <body className={`font-sans ${hindVadodara.className}`}>
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
