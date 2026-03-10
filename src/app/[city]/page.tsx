import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import BaseLayout from '../../components/BaseLayout/BaseLayout';
import CityLocationsFilter from '../../components/CityLocationsFilter/CityLocationsFilter';
import AdPlaceholder from '../../components/AdPlaceholder/AdPlaceholder';
import { prisma } from '../../lib/prisma';

interface PageProps {
  params: Promise<{ city: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { city: citySlug } = await params;

  const city = await prisma.city.findUnique({
    where: { slug: citySlug },
    select: {
      name: true,
      description: true,
      _count: { select: { locations: true } },
    },
  });

  if (!city) {
    return {
      title: 'City Not Found | Kids App',
      description: 'The requested city could not be found.',
    };
  }

  return {
    title: `${city.name} | Kids App`,
    description:
      city.description ||
      `Discover ${city._count.locations} amazing locations in ${city.name} where kids can learn, play, and grow.`,
  };
}

export async function generateStaticParams() {
  const cities = await prisma.city.findMany({
    where: { isActive: true },
    select: { slug: true },
    take: 20,
  });
  return cities.map((city) => ({ city: city.slug }));
}

export default async function CityLocationsPage({ params }: PageProps) {
  const { city: citySlug } = await params;

  const city = await prisma.city.findUnique({
    where: { slug: citySlug, isActive: true },
    select: {
      id: true,
      name: true,
      slug: true,
      description: true,
      imageUrl: true,
      imageCredit: true,
      imageCreditUrl: true,
      latitude: true,
      longitude: true,
    },
  });

  if (!city) notFound();

  // Always include the city's own locations (even if they lack coordinates), plus any nearby
  // locations within a 50-mile bounding box so the client radius filter has full data.
  const MAX_MILES = 50;
  const bboxCondition =
    city.latitude != null && city.longitude != null
      ? {
          latitude: {
            gte: city.latitude - MAX_MILES / 69.0,
            lte: city.latitude + MAX_MILES / 69.0,
          },
          longitude: {
            gte: city.longitude - MAX_MILES / (69.0 * Math.cos((city.latitude * Math.PI) / 180)),
            lte: city.longitude + MAX_MILES / (69.0 * Math.cos((city.latitude * Math.PI) / 180)),
          },
        }
      : null;

  const locations = await prisma.location.findMany({
    where: {
      isActive: true,
      OR: [
        { cityId: city.id },
        ...(bboxCondition ? [bboxCondition] : []),
      ],
    },
    include: {
      city: { select: { id: true, name: true, slug: true } },
      organization: { select: { id: true, name: true, slug: true } },
      categories: { select: { id: true, name: true, slug: true, icon: true, color: true } },
      _count: { select: { activities: true, reviews: true } },
    },
    orderBy: { name: 'asc' },
  });

  const styles = {
    pageContainer: {
      display: 'flex',
      flexDirection: 'column' as const,
      gap: 'var(--space-8)',
    },
    breadcrumb: {
      display: 'flex',
      alignItems: 'center',
      gap: 'var(--space-2)',
      fontSize: 'var(--font-size-sm)',
      color: 'var(--color-neutral-600)',
    },
    breadcrumbLink: {
      color: 'var(--color-primary-600)',
      textDecoration: 'none',
      fontWeight: 'var(--font-weight-medium)',
    },
    breadcrumbSeparator: {
      color: 'var(--color-neutral-400)',
    },
    breadcrumbCurrent: {
      color: 'var(--color-neutral-700)',
      fontWeight: 'var(--font-weight-medium)',
    },
    heroSection: {
      display: 'flex',
      flexDirection: 'column' as const,
      width: '100%',
      borderRadius: 'var(--radius-2xl)',
      overflow: 'hidden',
      boxShadow: 'var(--shadow-xl)',
      border: '1px solid var(--color-neutral-200)',
    },
    heroImageContainer: {
      position: 'relative' as const,
      width: '100%',
      height: '280px',
      flexShrink: 0,
    },
    heroImage: {
      width: '100%',
      height: '100%',
      objectFit: 'cover' as const,
    },
    heroOverlay: {
      position: 'absolute' as const,
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'linear-gradient(to bottom, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.3) 100%)',
    },
    photoCreditBadge: {
      position: 'absolute' as const,
      bottom: 'var(--space-2)',
      right: 'var(--space-3)',
      fontSize: 'var(--font-size-xs)',
      color: 'rgba(255,255,255,0.85)',
      textDecoration: 'none',
      background: 'rgba(0,0,0,0.45)',
      padding: '2px var(--space-2)',
      borderRadius: 'var(--radius-sm)',
      backdropFilter: 'blur(4px)',
    },
    heroContent: {
      padding: 'var(--space-8)',
      backgroundColor: 'var(--color-surface)',
    },
    heroTitle: {
      fontSize: 'var(--font-size-4xl)',
      fontWeight: 'var(--font-weight-bold)',
      color: 'var(--color-neutral-900)',
      margin: '0 0 var(--space-3) 0',
      lineHeight: 'var(--line-height-tight)',
    },
    heroDescription: {
      fontSize: 'var(--font-size-lg)',
      color: 'var(--color-neutral-600)',
      margin: 0,
      lineHeight: 'var(--line-height-relaxed)',
    },
    emptyState: {
      display: 'flex',
      flexDirection: 'column' as const,
      alignItems: 'center',
      justifyContent: 'center',
      padding: 'var(--space-12) var(--space-8)',
      textAlign: 'center' as const,
      backgroundColor: 'var(--color-neutral-50)',
      borderRadius: 'var(--radius-xl)',
      border: '1px solid var(--color-neutral-200)',
    },
    emptyStateText: {
      fontSize: 'var(--font-size-lg)',
      color: 'var(--color-neutral-600)',
      margin: '0 0 var(--space-4) 0',
    },
    emptyStateLink: {
      color: 'var(--color-primary-600)',
      textDecoration: 'none',
      fontSize: 'var(--font-size-base)',
      fontWeight: 'var(--font-weight-medium)',
      padding: 'var(--space-3) var(--space-6)',
      backgroundColor: 'var(--color-primary-100)',
      borderRadius: 'var(--radius-lg)',
      border: '1px solid var(--color-primary-300)',
    },
  };

  return (
    <BaseLayout
      rightRail={(
        <>
          <AdPlaceholder size="medium" label="Advertisement" />
          <AdPlaceholder size="medium" label="Advertisement" />
        </>
      )}
    >
      <div style={styles.pageContainer}>
        {/* Breadcrumb */}
        <nav style={styles.breadcrumb}>
          <Link href="/" style={styles.breadcrumbLink}>Home</Link>
          <span style={styles.breadcrumbSeparator}>/</span>
          <Link href="/locations" style={styles.breadcrumbLink}>Locations</Link>
          <span style={styles.breadcrumbSeparator}>/</span>
          <span style={styles.breadcrumbCurrent}>{city.name}</span>
        </nav>

        {/* Hero */}
        <div style={styles.heroSection}>
          {city.imageUrl && (
            <div style={styles.heroImageContainer}>
              <img src={city.imageUrl} alt={city.name} style={styles.heroImage} />
              <div style={styles.heroOverlay} />
              {city.imageCredit && (
                city.imageCreditUrl ? (
                  <a
                    href={city.imageCreditUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={styles.photoCreditBadge}
                  >
                    {city.imageCredit}
                  </a>
                ) : (
                  <span style={styles.photoCreditBadge}>{city.imageCredit}</span>
                )
              )}
            </div>
          )}
          <div style={styles.heroContent}>
            <h1 style={styles.heroTitle}>{city.name}</h1>
            {city.description && (
              <p style={styles.heroDescription}>{city.description}</p>
            )}
          </div>
        </div>

        {/* Locations */}
        {locations.length > 0 ? (
          <CityLocationsFilter
            locations={locations}
            cityName={city.name}
            cityId={city.id}
            cityLatitude={city.latitude}
            cityLongitude={city.longitude}
          />
        ) : (
          <div style={styles.emptyState}>
            <p style={styles.emptyStateText}>No locations found in {city.name} yet.</p>
            <Link href="/locations" style={styles.emptyStateLink}>
              Browse all locations
            </Link>
          </div>
        )}
      </div>
    </BaseLayout>
  );
}
