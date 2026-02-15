import Link from 'next/link';
import { Metadata } from 'next';
import BaseLayout from '../../components/BaseLayout/BaseLayout';
import SimpleLocationsList from '../../components/SimpleLocationsList/SimpleLocationsList';
import { prisma } from '../../lib/prisma';
import * as styles from './page.styles';

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

export const metadata: Metadata = {
  title: 'Locations | Kids App',
  description: 'Discover Minnesota\'s amazing locations where kids can learn, play, and grow.',
};

export default async function LocationsPage() {
  const locations = await prisma.location.findMany({
    where: {
      isActive: true,
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

  return (
    <BaseLayout>
      <div style={styles.pageContainer}>
        <div style={styles.container}>
          <header style={styles.headerSection}>
            <h1 style={styles.title}>Discover Minnesota's Amazing Locations</h1>
            <p style={styles.subtitle}>
              Explore venues across the Twin Cities, Duluth, and throughout Minnesota where kids can learn, play, and grow. 
              From children's museums and theaters to state parks and community centers.
            </p>
          </header>

          <SimpleLocationsList
            locations={locations}
            cityName="Minnesota"
          />
        </div>
      </div>
    </BaseLayout>
  );
}