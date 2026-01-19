'use client';

import { useState, useEffect } from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import BaseLayout from '../../../components/BaseLayout/BaseLayout';
import ActivityCard from '../../../components/ActivityCard/ActivityCard';
import {
  MapPin, Phone, Mail, Globe, Star, Activity, Users, Building2, 
  Trees, Warehouse, ChevronRight, Calendar, DollarSign
} from 'lucide-react';
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

interface AgeGroup {
  id: string;
  name: string;
  minAge: number;
  maxAge: number;
}

interface Activity {
  id: string;
  title: string;
  slug: string;
  description: string;
  costMin?: number;
  costMax?: number;
  costDisplay?: string;
  isFree: boolean;
  ageGroup?: AgeGroup;
  categories: Category[];
  _count: {
    favorites: number;
    reviews: number;
  };
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
  activities: Activity[];
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

const formatCost = (activity: Activity) => {
  if (activity.isFree) return 'Free';
  if (activity.costDisplay) return activity.costDisplay;
  if (activity.costMin && activity.costMax) {
    return `$${activity.costMin} - $${activity.costMax}`;
  }
  if (activity.costMin) return `From $${activity.costMin}`;
  return 'Contact for pricing';
};

export default function LocationPage({ params }: { params: Promise<{ slug: string }> }) {
  const [location, setLocation] = useState<Location | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const resolvedParams = await params;
        const response = await fetch(`/api/locations/${resolvedParams.slug}`);
        if (response.status === 404) {
          notFound();
          return;
        }
        if (!response.ok) {
          throw new Error('Failed to fetch location');
        }
        const data = await response.json();
        setLocation(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load location');
      } finally {
        setIsLoading(false);
      }
    };

    fetchLocation();
  }, [params]);

  if (isLoading) {
    return (
      <BaseLayout>
        <div style={styles.pageContainer}>
          <div style={styles.container}>
            <div style={styles.loadingSpinner}>
              Loading location...
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
              <h2>Oops! Something went wrong</h2>
              <p>{error}</p>
              <Link href="/locations" style={styles.breadcrumbLink}>
                ← Back to Locations
              </Link>
            </div>
          </div>
        </div>
      </BaseLayout>
    );
  }

  if (!location) {
    notFound();
    return null;
  }

  const LocationIcon = getLocationTypeIcon(location.type);

  return (
    <BaseLayout>
      <div style={styles.pageContainer}>
        <div style={styles.container}>
          {/* Breadcrumb */}
          <nav style={styles.breadcrumb}>
            <Link href="/" style={styles.breadcrumbLink}>Home</Link>
            <ChevronRight size={16} />
            <Link href="/locations" style={styles.breadcrumbLink}>Locations</Link>
            <ChevronRight size={16} />
            <span>{location.name}</span>
          </nav>

          {/* Location Header */}
          <header style={styles.locationHeader}>
            <div style={styles.locationMeta}>
              <div style={styles.typeTag}>
                <LocationIcon size={16} />
                {formatLocationType(location.type)}
              </div>
              {location.rating && (
                <div style={styles.rating}>
                  <Star size={16} fill="currentColor" />
                  <span>{location.rating}</span>
                  <span style={{ color: 'var(--color-neutral-500)' }}>
                    ({location.reviewCount} reviews)
                  </span>
                </div>
              )}
            </div>

            <h1 style={styles.locationTitle}>{location.name}</h1>
            
            {location.description && (
              <p style={styles.locationDescription}>{location.description}</p>
            )}

            {location.categories.length > 0 && (
              <div style={styles.categoriesList}>
                {location.categories.map((category) => (
                  <span key={category.id} style={styles.categoryTag}>
                    {category.name}
                  </span>
                ))}
              </div>
            )}
          </header>

          {/* Details Grid */}
          <div style={styles.detailsGrid}>
            {/* Activities Section */}
            <section style={styles.detailsSection}>
              <h2 style={styles.sectionTitle}>
                <Activity size={20} />
                Activities ({location._count.activities})
              </h2>
              
              {location.activities.length > 0 ? (
                <div style={styles.activitiesGrid}>
                  {location.activities.map((activity) => (
                    <ActivityCard
                      key={activity.id}
                      id={activity.id}
                      title={activity.title}
                      slug={activity.slug}
                      description={activity.description}
                      costMin={activity.costMin}
                      costMax={activity.costMax}
                      costDisplay={activity.costDisplay}
                      isFree={activity.isFree}
                      ageGroup={activity.ageGroup}
                      categories={activity.categories}
                      _count={activity._count}
                      showLocation={false}
                      showCategories={true}
                      showStats={true}
                      showAgeGroup={true}
                      showOrganizer={false}
                      showCost={true}
                    />
                  ))}
                </div>
              ) : (
                <p style={{ color: 'var(--color-neutral-600)' }}>
                  No activities available at this location yet.
                </p>
              )}
            </section>

            {/* Contact & Info Section */}
            <section style={styles.detailsSection}>
              <h2 style={styles.sectionTitle}>
                <MapPin size={20} />
                Contact & Info
              </h2>
              
              <div style={styles.contactInfo}>
                {location.address && (
                  <div style={styles.contactItem}>
                    <MapPin size={16} />
                    <span style={styles.contactText}>{location.address}</span>
                  </div>
                )}

                {location.phone && (
                  <a 
                    href={`tel:${location.phone}`} 
                    style={{ ...styles.contactItem, textDecoration: 'none' }}
                  >
                    <Phone size={16} />
                    <span style={styles.contactText}>{location.phone}</span>
                  </a>
                )}

                {location.email && (
                  <a 
                    href={`mailto:${location.email}`} 
                    style={{ ...styles.contactItem, textDecoration: 'none' }}
                  >
                    <Mail size={16} />
                    <span style={styles.contactText}>{location.email}</span>
                  </a>
                )}

                {location.website && (
                  <a 
                    href={location.website} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    style={{ ...styles.contactItem, textDecoration: 'none' }}
                  >
                    <Globe size={16} />
                    <span style={styles.contactText}>Visit Website</span>
                  </a>
                )}

                {location.city && (
                  <div style={styles.contactItem}>
                    <Building2 size={16} />
                    <span style={styles.contactText}>{location.city.name}</span>
                  </div>
                )}

                {location.organization && (
                  <div style={styles.contactItem}>
                    <Users size={16} />
                    <span style={styles.contactText}>{location.organization.name}</span>
                  </div>
                )}

                {location.capacity && (
                  <div style={styles.contactItem}>
                    <Users size={16} />
                    <span style={styles.contactText}>Capacity: {location.capacity}</span>
                  </div>
                )}
              </div>

              {location.amenities.length > 0 && (
                <>
                  <h3 style={{ ...styles.sectionTitle, fontSize: 'var(--font-size-lg)', marginTop: 'var(--space-6)' }}>
                    Amenities
                  </h3>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                    {location.amenities.map((amenity, index) => (
                      <li key={index} style={{ 
                        padding: 'var(--space-1) 0', 
                        color: 'var(--color-neutral-700)',
                        fontSize: 'var(--font-size-sm)'
                      }}>
                        • {amenity}
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </section>
          </div>
        </div>
      </div>
    </BaseLayout>
  );
}