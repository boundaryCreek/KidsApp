import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Metadata } from 'next';
import BaseLayout from '../../../components/BaseLayout/BaseLayout';
import ActivityCard from '../../../components/ActivityCard/ActivityCard';
import LocationCard from '../../../components/LocationCard/LocationCard';
import Breadcrumb from '../../../components/Breadcrumb/Breadcrumb';
import SectionHeader from '../../../components/SectionHeader/SectionHeader';
import CategoryList from '../../../components/CategoryList/CategoryList';
import AdPlaceholder from '../../../components/AdPlaceholder/AdPlaceholder';
import ShareToolbar from '../../../components/ShareToolbar/ShareToolbar';
import ContactInfo from '../../../components/ContactInfo/ContactInfo';
import { prisma } from '../../../lib/prisma';
import { generateLocationMetadata } from '../../../lib/metadata';
import { Location, LocationType, formatCostRange } from '../../../types';
import {
  MapPin, Phone, Mail, Globe, Star, Activity, Users, Building2, 
  Trees, Warehouse, ChevronRight, Calendar, DollarSign
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

const convertTo12Hour = (time: string): string => {
  const [hours, minutes] = time.split(':');
  const hour = parseInt(hours, 10);
  const ampm = hour >= 12 ? 'PM' : 'AM';
  const hour12 = hour % 12 || 12;
  return `${hour12}:${minutes} ${ampm}`;
};

const formatOperatingHours = (hours: string): string => {
  if (hours.toLowerCase() === 'closed') return 'Closed';
  const [start, end] = hours.split('-');
  return `${convertTo12Hour(start.trim())} - ${convertTo12Hour(end.trim())}`;
};

const DAYS_ORDER = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];

const isLocationOpen = (operatingHours: Record<string, string>): boolean => {
  const now = new Date();
  const currentDay = DAYS_ORDER[now.getDay()];
  const currentTime = now.getHours() * 60 + now.getMinutes(); // minutes since midnight
  
  const todayHours = operatingHours[currentDay];
  if (!todayHours || todayHours.toLowerCase() === 'closed') {
    return false;
  }
  
  try {
    const [start, end] = todayHours.split('-');
    const [startHour, startMin] = start.trim().split(':').map(Number);
    const [endHour, endMin] = end.trim().split(':').map(Number);
    
    const startTime = startHour * 60 + startMin;
    const endTime = endHour * 60 + endMin;
    
    return currentTime >= startTime && currentTime <= endTime;
  } catch (error) {
    return false;
  }
};

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  
  const location = await prisma.location.findFirst({
    where: {
      slug: slug,
      isActive: true,
    },
    select: {
      name: true,
      description: true,
      address: true,
      slug: true,
      imageUrl: true,
      city: {
        select: { name: true },
      },
    },
  });

  if (!location) {
    return {
      title: 'Location Not Found | Kids App',
    };
  }

  return generateLocationMetadata(
    location.name,
    location.description || 'Discover activities and information about this location',
    `${location.address}${location.city ? ', ' + location.city.name : ''}`,
    location.slug,
    location.imageUrl || undefined
  );
}

export default async function LocationPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  
  const location = await prisma.location.findFirst({
    where: {
      slug: slug,
      isActive: true,
    },
    include: {
      city: true,
      organization: true,
      categories: true,
      ageGroups: true,
      tags: {
        select: { id: true, name: true, slug: true, color: true },
      },
      activities: {
        where: {
          isActive: true,
        },
        include: {
          ageGroups: true,
          categories: true,
          _count: {
            select: {
              favorites: true,
              reviews: true,
            },
          },
        },
        orderBy: {
          title: 'asc',
        },
      },
      _count: {
        select: {
          activities: true,
        },
      },
    },
  });

  if (!location) {
    notFound();
  }

  // Fetch other locations from the same organization
  const otherLocations = await prisma.location.findMany({
    where: {
      organizationId: location.organizationId,
      slug: { not: slug },
      isActive: true,
    },
    include: {
      city: true,
      organization: true,
      categories: true,
      _count: {
        select: { activities: true, reviews: true },
      },
    },
    take: 6,
    orderBy: { name: 'asc' },
  });

  const LocationIcon = getLocationTypeIcon(location.type);
  
  // Get gradient colors from categories or tags
  const getGradientColors = () => 'var(--color-success-600)';

  const primaryColor = getGradientColors();
  
console.log('Fetched location:', location);
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
        <Breadcrumb
          items={[
            { href: '/', label: 'Home' },
            { href: '/locations', label: 'Locations' },
          ]}
          currentPage={location.name}
        />
        
        {/* Hero Section */}
        <div
          style={{
            ...styles.heroSection,
            ...(location.imageUrl ? {} : styles.heroSectionNoImage),
          }}
        >
          {location.imageUrl && (
            <div style={styles.heroImageContainer}>
              <img 
                src={location.imageUrl} 
                alt={location.name}
                style={styles.heroImage}
              />
              <div style={styles.heroOverlay} />
            </div>
          )}
          <div style={styles.heroContent}>
            <h1 style={styles.heroTitle}>{location.name}</h1>
            {location.summary && (
              <p style={styles.heroSummary}>{location.summary}</p>
            )}
            {location.tags && location.tags.length > 0 && (
              <div style={styles.heroTags}>
                {location.tags.map((tag) => (
                  <span
                    key={tag.id}
                    style={{
                      ...styles.heroTag,
                      backgroundColor: tag.color || 'var(--color-primary-600)',
                    }}
                  >
                    {tag.name}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

      

        {/* Location Header */}
        <header style={styles.locationHeader}>          {location.rating && (
            <div style={styles.locationMeta}>
              <div style={styles.rating}>
                <Star size={16} fill="currentColor" />
                <span>{location.rating}</span>
                <span style={{ color: 'var(--color-neutral-500)' }}>
                  ({location.reviewCount} reviews)
                </span>
              </div>
            </div>
          )}

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--space-4)', flexWrap: 'wrap', marginBottom: 'var(--space-4)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)', flexWrap: 'wrap' }}>
              <CategoryList categories={location.categories} />
              {location.costRange && (
                <span style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 'var(--space-2)',
                  backgroundColor: 'var(--color-success-100)',
                  color: 'var(--color-success-700)',
                  padding: 'var(--space-1) var(--space-3)',
                  borderRadius: 'var(--radius-full)',
                  fontSize: 'var(--font-size-sm)',
                  fontWeight: 'var(--font-weight-medium)',
                  border: '1px solid var(--color-success-200)',
                }}>
                  {formatCostRange(location.costRange)}
                </span>
              )}
            </div>
            
            <ShareToolbar 
              url={`${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/locations/${location.slug}`}
              title={location.name}
              description={location.summary || location.description || undefined}
            />
          </div>
          
          {(location.address || location.phone || location.website) && (
            <ContactInfo
              address={location.address}
              phone={location.phone}
              website={location.website}
              email={location.email}
              city={location.city}
              variant="grid"
            />
          )}

          {/* Operating Hours & More Details - Two Column Layout */}
          {location.operatingHours && (
            <div style={{ ...styles.detailsGrid, marginTop: 'var(--space-8)' }}>
              {/* Operating Hours Column */}
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--space-4)' }}>
                  <h2 style={{ ...styles.sectionTitle, margin: 0 }}>
                    <Calendar size={20} />
                    Operating Hours
                  </h2>
                  {(() => {
                    const open = isLocationOpen(location.operatingHours as Record<string, string>);
                    return (
                      <span
                        style={{
                          padding: 'var(--space-1) var(--space-3)',
                          borderRadius: 'var(--radius-full)',
                          fontSize: 'var(--font-size-sm)',
                          fontWeight: 'var(--font-weight-semibold)',
                          backgroundColor: open ? 'var(--color-success-100)' : 'var(--color-error-100)',
                          color: open ? 'var(--color-success-700)' : 'var(--color-error-700)',
                        }}
                      >
                        {open ? 'Open Now' : 'Closed'}
                      </span>
                    );
                  })()}
                </div>
                <div style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-neutral-700)' }}>
                  {DAYS_ORDER
                    .filter(day => (location.operatingHours as Record<string, string>)[day])
                    .map((day) => {
                      const hours = (location.operatingHours as Record<string, string>)[day];
                      return (
                        <div key={day} style={{ 
                          display: 'flex', 
                          justifyContent: 'space-between', 
                          padding: 'var(--space-2) 0',
                          borderBottom: '1px solid var(--color-neutral-200)'
                        }}>
                          <span style={{ fontWeight: 'var(--font-weight-medium)', textTransform: 'capitalize' }}>{day}</span>
                          <span>{typeof hours === 'string' ? formatOperatingHours(hours) : 'Closed'}</span>
                        </div>
                      );
                    })}
                </div>
              </div>

              {/* More Details Column */}
              <div>
                {location.email && (
                  <div style={{ marginBottom: 'var(--space-4)' }}>
                    <a 
                      href={`mailto:${location.email}`} 
                      style={{ ...styles.contactItem, textDecoration: 'none' }}
                    >
                      <Mail size={16} />
                      <span style={styles.contactText}>{location.email}</span>
                    </a>
                  </div>
                )}

                {location.ageGroups && location.ageGroups.length > 0 && (
                  <div style={{ marginBottom: 'var(--space-4)' }}>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-2)' }}>
                      {location.ageGroups.map((ageGroup: any) => (
                        <span
                          key={ageGroup.id}
                          style={{
                            display: 'inline-block',
                            padding: 'var(--space-1) var(--space-3)',
                            backgroundColor: 'var(--color-primary-100)',
                            color: 'var(--color-primary-700)',
                            borderRadius: 'var(--radius-full)',
                            fontSize: 'var(--font-size-sm)',
                            fontWeight: 'var(--font-weight-medium)',
                          }}
                        >
                          {ageGroup.name}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {location.amenities.length > 0 && (
                  <div>
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                      {location.amenities.map((amenity, index) => (
                        <li key={index} style={styles.contactItem}>
                          • {amenity}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          )}

        <div style={{
                backgroundColor: 'var(--color-info-50)',
                border: '1px solid var(--color-info-200)',
                borderRadius: 'var(--radius-md)',
                padding: 'var(--space-4)',
                marginTop: 'var(--space-4)',
                fontSize: 'var(--font-size-sm)',
                color: 'var(--color-info-700)',
              }}>
                <p style={{ margin: 0 }}>
                  Please check with the location to confirm details and hours before visiting.
                </p>
              </div>

        </header>

        

     

        {/* Additional Info Section */}
        <section style={styles.detailsSection}>
     
          {location.description && (
            <div>
              <p style={styles.locationDescription}>{location.description}</p>
            
            </div>
          )}
        </section>

        {/* Activities Section */}
        {location.activities.length > 0 && (
          <section style={styles.detailsSection}>
            <SectionHeader 
              icon={<Activity size={20} />} 
              title="Activities" 
              count={location._count.activities} 
            />
            
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
                  imageUrl={activity.imageUrl}
                  ageGroups={activity.ageGroups}
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
          </section>
        )}

        {/* Other Locations Section */}
        {otherLocations.length > 0 && (
          <section style={styles.detailsSection}>
            <SectionHeader 
              icon={<MapPin size={20} />} 
              title="Other Locations" 
              count={otherLocations.length} 
            />
            
            <div style={styles.activitiesGrid}>
              {otherLocations.map((otherLocation) => (
                <LocationCard
                  key={otherLocation.id}
                  id={otherLocation.id}
                  name={otherLocation.name}
                  slug={otherLocation.slug}
                  description={otherLocation.description}
                  address={otherLocation.address}
                  city={otherLocation.city}
                  organization={otherLocation.organization}
                  categories={otherLocation.categories}
                  rating={otherLocation.rating}
                  reviewCount={otherLocation.reviewCount ?? undefined}
                  _count={otherLocation._count}
                  showCategories={true}
                  showStats={true}
                />
              ))}
            </div>
          </section>
        )}
      </div>
    </BaseLayout>
  );
}