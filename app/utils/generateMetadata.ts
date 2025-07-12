import { Metadata } from "next";

type GenerateMetadataProps = {
  title?: string;
  description?: string;
  keywords?: string;
  locale?: 'gu_IN' | 'en_US' | 'en_IN';
  pathname?: string;
  openGraphImage?: string;
  noIndex?: boolean;
  metadataBaseUrl?: string;
};

/**
 * Generate consistent metadata for any page in the application
 */
export function generateMetadata({
  title = 'Gujarat Renewables | Solar & Renewable Energy Land Aggregator in Gujarat',
  description = 'Gujarat Renewables provides premium land acquisition and leasing services for solar and renewable energy projects in Gujarat. Lease or sell your land for solar and renewable energy projects with the leading land aggregator in Gujarat.',
  keywords = 'solar land Gujarat, solar land aggregator, renewable land aggregator, renewable energy Gujarat, solar farm land Gujarat, sell land for solar Gujarat, lease land for solar projects, solar project land, solar land investment Gujarat, gujarat renewable energy, solar land acquisition, solar energy land Gujarat, land for renewable projects, Kutch solar land, Banaskantha solar land, Patan solar land, North Gujarat solar land, Saurashtra solar land, Central Gujarat solar land, South Gujarat renewable land, agricultural land for solar Gujarat, barren land for solar projects, unused land for renewable energy, wasteland for solar development, non-agricultural land for solar Gujarat, industrial land for solar projects, land aggregation for solar developers, land pooling for renewable projects, long-term land lease for solar, land purchase for renewable energy, land valuation for solar projects, land due diligence for solar farms, minimum land size for solar project Gujarat, land requirements for 1MW solar plant, solar farm land specifications, ideal land for solar installation, solar land site selection criteria, land survey for renewable projects, landowner benefits from solar leasing, passive income from solar land, land monetization through renewables, land value appreciation with solar, guaranteed land rent from solar projects',
  locale = 'en_IN',
  pathname = '',
  openGraphImage = '/og-image.svg',
  noIndex = false,
  metadataBaseUrl = 'https://www.gujaratrenewables.in',
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
      siteName: 'Gujarat Renewables',
      images: [
        {
          url: openGraphImage.startsWith('http') ? openGraphImage : `${metadataBaseUrl}${openGraphImage}`,
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
      images: [openGraphImage.startsWith('http') ? openGraphImage : `${metadataBaseUrl}${openGraphImage}`],
    },
    verification: {
      google: 'google-site-verification-code',
    },
  };
  
  return metadata;
} 