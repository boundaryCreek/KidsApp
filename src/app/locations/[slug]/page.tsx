import { notFound } from 'next/navigation';
import Link from 'next/link';
import BaseLayout from '../../../components/BaseLayout/BaseLayout';
import ActivityCard from '../../../components/ActivityCard/ActivityCard';
import LocationCard from '../../../components/LocationCard/LocationCard';
import Breadcrumb from '../../../components/Breadcrumb/Breadcrumb';
import SectionHeader from '../../../components/SectionHeader/SectionHeader';
import CategoryList from '../../../components/CategoryList/CategoryList';
import AdPlaceholder from '../../../components/AdPlaceholder/AdPlaceholder';
import { prisma } from '../../../lib/prisma';
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
      activities: {
        where: {
          isActive: true,
        },
        include: {
          ageGroup: true,
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

        {/* Location Header */}
        <header style={styles.locationHeader}>
          {location.rating && (
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

          <h1 style={styles.locationTitle}>{location.name}</h1>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-6)', marginBottom: 'var(--space-6)', flexWrap: 'wrap' }}>
            <CategoryList categories={location.categories} />
          </div>
          
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-4)', marginBottom: 'var(--space-6)', color: 'var(--color-neutral-700)' }}>
            {location.address && (
              <a 
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${location.address}${location.city ? ', ' + location.city.name : ''}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', textDecoration: 'none', color: 'inherit', transition: 'color 0.2s' }}
              >
                <MapPin size={16} />
                <span>{location.address}{location.city && `, ${location.city.name}`}</span>
              </a>
            )}

            {location.phone && (
              <a 
                href={`tel:${location.phone}`} 
                style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', textDecoration: 'none', color: 'inherit' }}
              >
                <Phone size={16} />
                <span>{location.phone}</span>
              </a>
            )}

            {location.website && (
              <a 
                href={location.website} 
                target="_blank" 
                rel="noopener noreferrer"
                style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', textDecoration: 'none', color: 'var(--color-primary-600)' }}
              >
                <Globe size={16} />
                <span>Visit Website</span>
              </a>
            )}
          </div>

        </header>

        

        {/* Operating Hours & More Details - Two Column Layout */}
        {location.operatingHours && (
          <div style={styles.detailsGrid}>
            {/* Operating Hours Section */}
            <section style={styles.detailsSection}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
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
              <div style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-neutral-700)', marginTop: 'var(--space-4)' }}>
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
            </section>

            {/* More Details Section */}
            <section style={styles.detailsSection}>
            
              
              <div style={styles.contactInfo}>
                {location.email && (
                  <a 
                    href={`mailto:${location.email}`} 
                    style={{ ...styles.contactItem, textDecoration: 'none' }}
                  >
                    <Mail size={16} />
                    <span style={styles.contactText}>{location.email}</span>
                  </a>
                )}

              
                

               
              </div>

              {location.ageGroups && location.ageGroups.length > 0 && (
                <>
                  
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
                </>
              )}

              {location.amenities.length > 0 && (
                <>
                  <h3 style={{ ...styles.sectionTitle, fontSize: 'var(--font-size-lg)', marginTop: 'var(--space-4)', marginBottom: 'var(--space-2)' }}>
                    Amenities
                  </h3>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                    {location.amenities.map((amenity, index) => (
                      <li key={index} style={styles.contactItem}>
                        • {amenity}
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </section>
          </div>
        )}

        {/* Additional Info Section */}
        <section style={styles.detailsSection}>
     
          {location.description && (
            <p style={styles.locationDescription}>{location.description}</p>
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
                  type={otherLocation.type as LocationType}
                  description={otherLocation.description}
                  address={otherLocation.address}
                  city={otherLocation.city}
                  organization={otherLocation.organization}
                  categories={otherLocation.categories}
                  rating={otherLocation.rating}
                  reviewCount={otherLocation.reviewCount || 0}
                  _count={otherLocation._count}
                  showCategories={true}
                  showStats={true}
                  showTypeTag={true}
                />
              ))}
            </div>
          </section>
        )}
      </div>
    </BaseLayout>
  );
}