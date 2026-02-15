'use client';

import { MapPin, Star, Building2, ExternalLink, Phone, Mail } from 'lucide-react';
import Link from 'next/link';
import { Category } from '../../types';

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
  address?: string | null;
  phone?: string | null;
  email?: string | null;
  website?: string | null;
  imageUrl?: string | null;
  amenities: string[];
  capacity?: number | null;
  accessibility: string[];
  parking?: string | null;
  publicTransport?: string | null;
  operatingHours?: any;
  rating?: number | null;
  reviewCount?: number | null;
  city?: City | null;
  organization?: Organization | null;
  categories: Category[];
  _count: {
    activities: number;
    reviews: number;
  };
}

interface FilterableLocationsListProps {
  locations: Location[];
  cityName: string;
}

export default function FilterableLocationsList({
  locations,
  cityName,
}: FilterableLocationsListProps) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--space-4)',
      }}
    >
      {locations.map((location) => (
        <Link
          key={location.id}
          href={`/locations/${location.slug}`}
          style={{ textDecoration: 'none' }}
        >
          <div
            style={{
              padding: 'var(--space-6)',
              backgroundColor: 'var(--color-surface)',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--color-neutral-200)',
              boxShadow: 'var(--shadow-sm)',
              transition: 'var(--transition-all)',
              cursor: 'pointer',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'var(--color-primary-300)';
              e.currentTarget.style.boxShadow = 'var(--shadow-md)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'var(--color-neutral-200)';
              e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                marginBottom: 'var(--space-4)',
              }}
            >
              <div style={{ flex: 1 }}>
                <h3
                  style={{
                    fontSize: 'var(--font-size-xl)',
                    fontWeight: 'var(--font-weight-bold)',
                    color: 'var(--color-neutral-900)',
                    margin: '0 0 var(--space-2) 0',
                  }}
                >
                  {location.name}
                </h3>
                
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 'var(--space-4)',
                    marginBottom: 'var(--space-3)',
                    fontSize: 'var(--font-size-sm)',
                    color: 'var(--color-neutral-600)',
                  }}
                >
                  {location.organization && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                      <Building2 size={16} />
                      <span>{location.organization.name}</span>
                    </div>
                  )}
                  
                  {location.address && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                      <MapPin size={16} />
                      <span>{location.address}</span>
                    </div>
                  )}
                </div>
              </div>
              
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--space-4)',
                  fontSize: 'var(--font-size-sm)',
                  color: 'var(--color-neutral-600)',
                }}
              >
                {location.rating && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-1)' }}>
                    <Star size={16} color="var(--color-accent-600)" fill="var(--color-accent-600)" />
                    <span style={{ fontWeight: 'var(--font-weight-medium)' }}>{location.rating}</span>
                  </div>
                )}
                
                <div
                  style={{
                    padding: 'var(--space-1) var(--space-3)',
                    backgroundColor: 'var(--color-primary-100)',
                    color: 'var(--color-primary-800)',
                    borderRadius: 'var(--radius-full)',
                    fontSize: 'var(--font-size-xs)',
                    fontWeight: 'var(--font-weight-medium)',
                  }}
                >
                  {location._count.activities} activities
                </div>
              </div>
            </div>

            <p
              style={{
                color: 'var(--color-neutral-700)',
                fontSize: 'var(--font-size-base)',
                lineHeight: 'var(--line-height-relaxed)',
                marginBottom: 'var(--space-4)',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical' as const,
                overflow: 'hidden',
              }}
            >
              {location.description}
            </p>

            {location.categories.length > 0 && (
              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: 'var(--space-2)',
                  marginBottom: 'var(--space-4)',
                }}
              >
                {location.categories.slice(0, 4).map((category) => (
                  <span
                    key={category.id}
                    style={{
                      padding: 'var(--space-1) var(--space-2)',
                      backgroundColor: 'var(--color-secondary-100)',
                      color: 'var(--color-secondary-800)',
                      borderRadius: 'var(--radius-base)',
                      fontSize: 'var(--font-size-xs)',
                      fontWeight: 'var(--font-weight-medium)',
                    }}
                  >
                    {category.name}
                  </span>
                ))}
                {location.categories.length > 4 && (
                  <span
                    style={{
                      padding: 'var(--space-1) var(--space-2)',
                      backgroundColor: 'var(--color-neutral-100)',
                      color: 'var(--color-neutral-700)',
                      borderRadius: 'var(--radius-base)',
                      fontSize: 'var(--font-size-xs)',
                      fontWeight: 'var(--font-weight-medium)',
                    }}
                  >
                    +{location.categories.length - 4} more
                  </span>
                )}
              </div>
            )}

            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingTop: 'var(--space-3)',
                borderTop: '1px solid var(--color-neutral-200)',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--space-4)',
                  fontSize: 'var(--font-size-sm)',
                  color: 'var(--color-neutral-600)',
                }}
              >
                {location.phone && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-1)' }}>
                    <Phone size={14} />
                    <span>{location.phone}</span>
                  </div>
                )}
                
                {location.website && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-1)' }}>
                    <ExternalLink size={14} />
                    <span>Website</span>
                  </div>
                )}
              </div>
              
              <div
                style={{
                  fontSize: 'var(--font-size-sm)',
                  color: 'var(--color-primary-600)',
                  fontWeight: 'var(--font-weight-medium)',
                }}
              >
                View Details →
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}