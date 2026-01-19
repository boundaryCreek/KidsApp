'use client';

import { useState, useEffect } from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import BaseLayout from '../../../components/BaseLayout/BaseLayout';
import {
  MapPin, Phone, Mail, Globe, Star, Activity, Users, Building2, 
  ChevronRight, Calendar, DollarSign, Heart, MessageSquare, Clock
} from 'lucide-react';
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
  type: string;
  description: string;
  address?: string;
  phone?: string;
  email?: string;
  website?: string;
  city?: City;
  organization?: Organization;
  categories: Category[];
}

interface AgeGroup {
  id: string;
  name: string;
  minAge: number;
  maxAge: number;
}

interface ActivityDetails {
  id: string;
  title: string;
  slug: string;
  description: string;
  organizer: string;
  costMin?: number;
  costMax?: number;
  costDisplay?: string;
  isFree: boolean;
  featured: boolean;
  imageUrl?: string;
  location: Location;
  ageGroup?: AgeGroup;
  categories: Category[];
  _count: {
    favorites: number;
    reviews: number;
  };
}

const formatCost = (activity: ActivityDetails) => {
  if (activity.isFree) return 'Free';
  if (activity.costDisplay) return activity.costDisplay;
  if (activity.costMin && activity.costMax) {
    return `$${activity.costMin} - $${activity.costMax}`;
  }
  if (activity.costMin) return `From $${activity.costMin}`;
  return 'Contact for pricing';
};

export default function ActivityPage({ params }: { params: { slug: string } }) {
  const [activity, setActivity] = useState<ActivityDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchActivity = async () => {
      try {
        const response = await fetch(`/api/a/${params.slug}`);
        if (response.status === 404) {
          notFound();
          return;
        }
        if (!response.ok) {
          throw new Error('Failed to fetch activity');
        }
        const data = await response.json();
        setActivity(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load activity');
      } finally {
        setIsLoading(false);
      }
    };

    fetchActivity();
  }, [params.slug]);

  if (isLoading) {
    return (
      <BaseLayout>
        <div style={styles.pageContainer}>
          <div style={styles.container}>
            <div style={styles.loadingSpinner}>
              Loading activity...
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

  if (!activity) {
    notFound();
    return null;
  }

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
            <Link href={`/locations/${activity.location.slug}`} style={styles.breadcrumbLink}>
              {activity.location.name}
            </Link>
            <ChevronRight size={16} />
            <span>{activity.title}</span>
          </nav>

          {/* Activity Header */}
          <header style={styles.activityHeader}>
            <div style={styles.activityMeta}>
              {activity.ageGroup && (
                <div style={styles.ageGroupTag}>
                  <Users size={16} />
                  {activity.ageGroup.name}
                </div>
              )}
              
              <div style={activity.isFree ? styles.costFree : styles.costPaid}>
                <DollarSign size={16} />
                {formatCost(activity)}
              </div>

              {activity.featured && (
                <div style={styles.featuredBadge}>
                  <Star size={16} />
                  Featured
                </div>
              )}
            </div>

            <h1 style={styles.activityTitle}>{activity.title}</h1>
            
            <div style={styles.organizerSection}>
              <Building2 size={20} />
              <div>
                <strong>Organized by:</strong> {activity.organizer}
              </div>
            </div>

            {activity.description && (
              <p style={styles.activityDescription}>{activity.description}</p>
            )}

            {activity.categories.length > 0 && (
              <div style={styles.categoriesList}>
                {activity.categories.map((category) => (
                  <span key={category.id} style={styles.categoryTag}>
                    {category.name}
                  </span>
                ))}
              </div>
            )}
          </header>

          {/* Details Grid */}
          <div style={styles.detailsGrid}>
            {/* Location Section */}
            <section style={styles.detailsSection}>
              <h2 style={styles.sectionTitle}>
                <MapPin size={20} />
                Location Details
              </h2>
              
              <div style={styles.locationInfo}>
                <h3 style={{ fontSize: 'var(--font-size-lg)', fontWeight: 'var(--font-weight-semibold)', marginBottom: 'var(--space-3)' }}>
                  {activity.location.name}
                </h3>

                {activity.location.address && (
                  <div style={styles.locationItem}>
                    <MapPin size={16} />
                    <span style={styles.locationText}>{activity.location.address}</span>
                  </div>
                )}

                {activity.location.phone && (
                  <a 
                    href={`tel:${activity.location.phone}`} 
                    style={{ ...styles.locationItem, textDecoration: 'none' }}
                  >
                    <Phone size={16} />
                    <span style={styles.locationText}>{activity.location.phone}</span>
                  </a>
                )}

                {activity.location.email && (
                  <a 
                    href={`mailto:${activity.location.email}`} 
                    style={{ ...styles.locationItem, textDecoration: 'none' }}
                  >
                    <Mail size={16} />
                    <span style={styles.locationText}>{activity.location.email}</span>
                  </a>
                )}

                {activity.location.website && (
                  <a 
                    href={activity.location.website} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    style={{ ...styles.locationItem, textDecoration: 'none' }}
                  >
                    <Globe size={16} />
                    <span style={styles.locationText}>Visit Website</span>
                  </a>
                )}

                {activity.location.city && (
                  <div style={styles.locationItem}>
                    <Building2 size={16} />
                    <span style={styles.locationText}>{activity.location.city.name}</span>
                  </div>
                )}

                {activity.location.organization && (
                  <div style={styles.locationItem}>
                    <Users size={16} />
                    <span style={styles.locationText}>{activity.location.organization.name}</span>
                  </div>
                )}
              </div>

              <Link 
                href={`/locations/${activity.location.slug}`}
                style={{
                  display: 'block',
                  marginTop: 'var(--space-6)',
                  padding: 'var(--space-3)',
                  backgroundColor: 'var(--color-primary-600)',
                  color: 'var(--color-neutral-50)',
                  textDecoration: 'none',
                  borderRadius: 'var(--radius-lg)',
                  textAlign: 'center',
                  fontWeight: 'var(--font-weight-medium)',
                  fontSize: 'var(--font-size-sm)',
                  transition: 'background-color 0.2s ease',
                }}
              >
                View All Activities at {activity.location.name}
              </Link>
            </section>

            {/* Stats & Actions Section */}
            <section style={styles.detailsSection}>
              <h2 style={styles.sectionTitle}>
                <Activity size={20} />
                Activity Stats
              </h2>
              
              <div style={styles.statsGrid}>
                <div style={styles.statItem}>
                  <Heart size={24} color="var(--color-primary-600)" />
                  <div style={styles.statNumber}>{activity._count.favorites}</div>
                  <div style={styles.statLabel}>Favorites</div>
                </div>
                
                <div style={styles.statItem}>
                  <MessageSquare size={24} color="var(--color-primary-600)" />
                  <div style={styles.statNumber}>{activity._count.reviews}</div>
                  <div style={styles.statLabel}>Reviews</div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </BaseLayout>
  );
}