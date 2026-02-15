import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import BaseLayout from '../../components/BaseLayout/BaseLayout';
import SimpleLocationsList from '../../components/SimpleLocationsList/SimpleLocationsList';
import { prisma } from '../../lib/prisma';

interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string;
  color: string;
}

interface City {
  id: string;
  name: string;
  slug: string;
}

interface Organization {
  id: string;
  name: string;
  slug: string;
}

interface Location {
  id: string;
  name: string;
  slug: string;
  description: string;
  address?: string;
  phone?: string;
  email?: string;
  website?: string;
  imageUrl?: string;
  amenities: string[];
  capacity?: number;
  accessibility: string[];
  parking?: string;
  publicTransport?: string;
  operatingHours?: Record<string, string>;
  rating?: number;
  reviewCount?: number;
  city?: City;
  organization?: Organization;
  categories: Category[];
  _count: {
    activities: number;
    reviews: number;
  };
}

interface PageProps {
  params: Promise<{ city: string }>;
}

// Generate metadata for SEO
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { city: citySlug } = await params;
  
  const city = await prisma.city.findUnique({
    where: { slug: citySlug },
    select: {
      name: true,
      description: true,
      _count: {
        select: {
          locations: true,
        },
      },
    },
  });

  if (!city) {
    return {
      title: 'City Not Found | Kids App',
      description: 'The requested city could not be found.',
    };
  }

  return {
    title: `${city.name} Locations | Kids App`,
    description: city.description || 
      `Discover ${city._count.locations} amazing locations in ${city.name} where kids can learn, play, and grow. Find venues, museums, parks, and more.`,
  };
}

// Generate static params for common cities (optional optimization)
export async function generateStaticParams() {
  const cities = await prisma.city.findMany({
    where: { isActive: true },
    select: { slug: true },
    take: 20, // Limit to most common cities for build time
  });

  return cities.map((city) => ({
    city: city.slug,
  }));
}

export default async function CityLocationsPage({ params }: PageProps) {
  const { city: citySlug } = await params;

  // Fetch the city data
  const city = await prisma.city.findUnique({
    where: { 
      slug: citySlug,
      isActive: true,
    },
    select: {
      id: true,
      name: true,
      slug: true,
      description: true,
      latitude: true,
      longitude: true,
    },
  });

  // Return 404 if city doesn't exist
  if (!city) {
    notFound();
  }

  // Fetch all active locations in this city
  const locations = await prisma.location.findMany({
    where: {
      isActive: true,
      cityId: city.id,
    },
    include: {
      city: {
        select: {
          id: true,
          name: true,
          slug: true,
        },
      },
      organization: {
        select: {
          id: true,
          name: true,
          slug: true,
        },
      },
      categories: {
        select: {
          id: true,
          name: true,
          slug: true,
          icon: true,
          color: true,
        },
      },
      _count: {
        select: {
          activities: true,
          reviews: true,
        },
      },
    },
    orderBy: {
      name: 'asc',
    },
  });

  const styles = {
    pageContainer: {
      minHeight: '100vh',
      padding: 'var(--space-8) var(--space-4)',
      background: 'linear-gradient(to bottom, var(--color-neutral-50), var(--color-surface))',
    },
    container: {
      maxWidth: 'var(--container-7xl)',
      margin: '0 auto',
      padding: '0 var(--space-4)',
    },
    breadcrumb: {
      display: 'flex',
      alignItems: 'center',
      gap: 'var(--space-2)',
      marginBottom: 'var(--space-6)',
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
      fontWeight: 'var(--font-weight-normal)',
    },
    breadcrumbCurrent: {
      color: 'var(--color-primary-600)',
      fontWeight: 'var(--font-weight-medium)',
    },
    headerSection: {
      textAlign: 'center' as const,
      marginBottom: 'var(--space-12)',
      padding: 'var(--space-8) 0',
    },
    title: {
      fontSize: 'var(--font-size-4xl)',
      fontWeight: 'var(--font-weight-black)',
      color: 'var(--color-neutral-900)',
      margin: '0 0 var(--space-4) 0',
      lineHeight: 'var(--line-height-tight)',
    },
    subtitle: {
      fontSize: 'var(--font-size-xl)',
      color: 'var(--color-neutral-600)',
      margin: '0 0 var(--space-6) 0',
      lineHeight: 'var(--line-height-relaxed)',
    },
    statsBar: {
      display: 'flex',
      justifyContent: 'center',
      gap: 'var(--space-8)',
      marginTop: 'var(--space-6)',
    },
    statItem: {
      display: 'flex',
      flexDirection: 'column' as const,
      alignItems: 'center',
      padding: 'var(--space-4)',
      backgroundColor: 'var(--color-primary-50)',
      borderRadius: 'var(--radius-lg)',
      border: '1px solid var(--color-primary-200)',
      minWidth: '120px',
    },
    statValue: {
      fontSize: 'var(--font-size-2xl)',
      fontWeight: 'var(--font-weight-bold)',
      color: 'var(--color-primary-700)',
      marginBottom: 'var(--space-1)',
    },
    statLabel: {
      fontSize: 'var(--font-size-sm)',
      color: 'var(--color-primary-600)',
      textTransform: 'uppercase' as const,
      letterSpacing: '0.05em',
      fontWeight: 'var(--font-weight-medium)',
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
      transition: 'var(--transition-colors)',
    }
  };

  return (
    <BaseLayout>
      <div style={styles.pageContainer}>
        <div style={styles.container}>
          {/* Breadcrumb */}
          <nav style={styles.breadcrumb}>
            <Link href="/" style={styles.breadcrumbLink}>
              Home
            </Link>
            <span style={styles.breadcrumbSeparator}>/</span>
            <Link href="/locations" style={styles.breadcrumbLink}>
              Locations
            </Link>
            <span style={styles.breadcrumbSeparator}>/</span>
            <span style={styles.breadcrumbCurrent}>{city.name}</span>
          </nav>

          {/* Header */}
          <header style={styles.headerSection}>
            <h1 style={styles.title}>Locations in {city.name}</h1>
            {city.description && (
              <p style={styles.subtitle}>{city.description}</p>
            )}
            {!city.description && (
              <p style={styles.subtitle}>
                Discover {locations.length} amazing location{locations.length !== 1 ? 's' : ''} in {city.name} where kids can learn, play, and grow.
              </p>
            )}
            <div style={styles.statsBar}>
              <div style={styles.statItem}>
                <span style={styles.statValue}>{locations.length}</span>
                <span style={styles.statLabel}>Location{locations.length !== 1 ? 's' : ''}</span>
              </div>
              <div style={styles.statItem}>
                <span style={styles.statValue}>
                  {locations.reduce((sum, loc) => sum + loc._count.activities, 0)}
                </span>
                <span style={styles.statLabel}>Activities</span>
              </div>
            </div>
          </header>

          {/* Locations List */}
          {locations.length > 0 ? (
            <SimpleLocationsList
              locations={locations}
              cityName={city.name}
            />
          ) : (
            <div style={styles.emptyState}>
              <p style={styles.emptyStateText}>
                No locations found in {city.name} yet.
              </p>
              <Link href="/locations" style={styles.emptyStateLink}>
                Browse all locations
              </Link>
            </div>
          )}
        </div>
      </div>
    </BaseLayout>
  );
}
