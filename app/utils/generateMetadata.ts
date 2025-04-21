import { Metadata } from "next";

type GenerateMetadataProps = {
  title?: string;
  description?: string;
  keywords?: string;
  locale?: 'gu_IN' | 'en_US';
  pathname?: string;
  openGraphImage?: string;
  noIndex?: boolean;
  metadataBaseUrl?: string;
};

/**
 * Generate consistent metadata for any page in the application
 */
export function generateMetadata({
  title = 'ગુજરાત રિન્યુએબલ્સ | સોલાર લેન્ડ એગ્રિગેટર',
  description = 'ગુજરાતમાં સોલાર પ્રોજેક્ટ્સ માટે તમારી જમીન ભાડે આપો અથવા વેચો. સોલાર પ્રોજેક્ટ્સ માટે અમે જમીન સંપાદન અને લીઝ સેવાઓ પ્રદાન કરીએ છીએ.',
  keywords = 'solar land Gujarat, solar land aggregator, solar farm land Gujarat, sell land for solar Gujarat, lease land for solar projects, ગુજરાતમાં સોલાર પ્રોજેક્ટ્સ, solar land investment Gujarat',
  locale = 'gu_IN',
  pathname = '',
  openGraphImage = '/og-image.svg',
  noIndex = false,
  metadataBaseUrl = 'https://gujaratrenewables.com',
}: GenerateMetadataProps): Metadata {
  
  const url = `${metadataBaseUrl}${pathname}`;
  
  const metadata: Metadata = {
    metadataBase: new URL(metadataBaseUrl),
    title,
    description,
    keywords,
    alternates: {
      canonical: url,
    },
    robots: {
      index: !noIndex,
      follow: !noIndex,
      googleBot: {
        index: !noIndex,
        follow: !noIndex,
        'max-image-preview': 'large',
        'max-video-preview': -1,
        'max-snippet': -1,
      },
    },
    openGraph: {
      type: 'website',
      locale,
      url,
      title,
      description,
      siteName: 'ગુજરાત રિન્યુએબલ્સ',
      images: [
        {
          url: `${openGraphImage}`,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [openGraphImage],
    },
    verification: {
      google: 'google-site-verification-code',
    },
  };
  
  return metadata;
} 