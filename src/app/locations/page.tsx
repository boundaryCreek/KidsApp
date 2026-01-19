'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import BaseLayout from '../../components/BaseLayout/BaseLayout';
import LocationCard from '../../components/LocationCard/LocationCard';
import { MapPin, Users, Star, Activity, Building2, Trees, Warehouse, Globe } from 'lucide-react';
import * as styles from './page.styles';

type LocationType = 'VENUE' | 'ORGANIZATION' | 'FACILITY' | 'OUTDOOR' | 'ONLINE';

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
  type: LocationType;
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

const getLocationTypeIcon = (type: LocationType) => {
  switch (type) {
    case 'VENUE':
      return Building2;
    case 'ORGANIZATION':
      return Users;
    case 'FACILITY':
      return Warehouse;
    case 'OUTDOOR':
      return Trees;
    case 'ONLINE':
      return Globe;
    default:
      return Building2;
  }
};

const formatLocationType = (type: LocationType) => {
  return type.toLowerCase().replace('_', ' ');
};

// Hook to handle responsive grid
const useResponsiveGrid = () => {
  const [windowWidth, setWindowWidth] = useState<number>(0);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    handleResize(); // Set initial value
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const getGridStyle = () => {
    if (windowWidth >= 1536) return styles.locationsGridResponsive.xl;
    if (windowWidth >= 1024) return styles.locationsGridResponsive.lg;
    if (windowWidth >= 768) return styles.locationsGridResponsive.md;
    return styles.locationsGridResponsive.base;
  };

  return getGridStyle();
};

export default function LocationsPage() {
  const [locations, setLocations] = useState<Location[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const gridStyle = useResponsiveGrid();

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await fetch('/api/locations');
        if (!response.ok) {
          throw new Error('Failed to fetch locations');
        }
        const data = await response.json();
        setLocations(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load locations');
      } finally {
        setIsLoading(false);
      }
    };

    fetchLocations();
  }, []);

  if (isLoading) {
    return (
      <BaseLayout>
        <div style={styles.pageContainer}>
          <div style={styles.container}>
            <div style={styles.loadingSpinner}>
              Loading locations...
            </div>
          </div>
        </div>
      </BaseLayout>
    );
  }

  if (error) {
    return (
      <BaseLayout>
        <div style={styles.pageContainer}>
          <div style={styles.container}>
            <div style={styles.errorMessage}>
              {error}
            </div>
          </div>
        </div>
      </BaseLayout>
    );
  }

  return (
    <BaseLayout>
      <div style={styles.pageContainer}>
        <div style={styles.container}>
        <header style={styles.headerSection}>
          <h1 style={styles.title}>Discover Amazing Locations</h1>
          <p style={styles.subtitle}>
            Explore venues, organizations, and facilities where kids can learn, play, and grow. 
            From museums and theaters to parks and sports centers, find the perfect place for your next adventure.
          </p>
        </header>

        <div style={gridStyle}>
          {locations.map((location) => (
            <LocationCard
              key={location.id}
              id={location.id}
              name={location.name}
              slug={location.slug}
              type={location.type}
              description={location.description}
              address={location.address}
              city={location.city}
              organization={location.organization}
              categories={location.categories}
              rating={location.rating}
              reviewCount={location.reviewCount}
              _count={location._count}
              showCategories={true}
              showStats={true}
              showTypeTag={true}
            />
          ))}
        </div>
      </div>
    </div>
    </BaseLayout>
  );
}