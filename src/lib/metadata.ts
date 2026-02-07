import { Metadata } from 'next';

export interface MetadataParams {
  title: string;
  description: string;
  url?: string;
  image?: string;
  author?: string;
  type?: 'website' | 'article';
}

/**
 * Generate SEO-friendly metadata for any page
 * @param params - Page metadata parameters
 * @returns Next.js Metadata object
 */
export function generatePageMetadata(params: MetadataParams): Metadata {
  const {
    title,
    description,
    url = '',
    image = '/og-image.jpg',
    author = 'Kids App',
    type = 'website',
  } = params;

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://kids-app.local';
  const fullUrl = url ? `${baseUrl}${url}` : baseUrl;

  return {
    title: `${title} | Kids App`,
    description,
    authors: [{ name: author }],
    alternates: {
      canonical: fullUrl,
    },
    openGraph: {
      title: `${title} | Kids App`,
      description,
      url: fullUrl,
      siteName: 'Kids App',
      images: [
        {
          url: image.startsWith('http') ? image : `${baseUrl}${image}`,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      type,
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | Kids App`,
      description,
      images: [image.startsWith('http') ? image : `${baseUrl}${image}`],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

/**
 * Generate location-specific metadata with structured data
 * @param locationName - Name of the location
 * @param description - Location description
 * @param address - Location address
 * @param slug - URL slug for canonical link
 * @param image - Location image URL
 * @returns Next.js Metadata object with location-specific SEO
 */
export function generateLocationMetadata(
  locationName: string,
  description: string,
  address: string,
  slug: string,
  image?: string
): Metadata {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://kids-app.local';
  const locationUrl = `/locations/${slug}`;
  const fullUrl = `${baseUrl}${locationUrl}`;

  return {
    title: `${locationName} | Kids Activities & Locations`,
    description: `${description} Located at ${address}. Find activities, hours, and more at ${locationName} on Kids App.`,
    authors: [{ name: 'Kids App' }],
    keywords: [locationName, 'kids activities', 'family', 'entertainment', address],
    alternates: {
      canonical: fullUrl,
    },
    openGraph: {
      title: `${locationName} | Kids App`,
      description: `Discover activities and information about ${locationName}`,
      url: fullUrl,
      siteName: 'Kids App',
      images: [
        {
          url: image?.startsWith('http') ? image : `${baseUrl}${image || '/og-image.jpg'}`,
          width: 1200,
          height: 630,
          alt: locationName,
        },
      ],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${locationName} | Kids App`,
      description: `Discover activities and information about ${locationName}`,
      images: [image?.startsWith('http') ? image : `${baseUrl}${image || '/og-image.jpg'}`],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}
