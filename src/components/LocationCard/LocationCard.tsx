'use client';

import { useState } from 'react';
import Link from 'next/link';
import { MapPin, Star } from 'lucide-react';
import * as styles from './LocationCard.styles';

interface Category {
  id: string;
  name: string;
  slug: string;
  icon?: string;
  color?: string;
}

interface City {
  id?: string;
  name: string;
  slug?: string;
}

interface Organization {
  id?: string;
  name: string;
  slug?: string;
}

interface LocationCardProps {
  id: string;
  name: string;
  slug: string;
  description: string;
  address?: string | null;
  city?: City | null;
  organization?: Organization | null;
  categories?: Category[];
  rating?: number | null;
  reviewCount?: number;
  _count?: {
    activities: number;
    reviews: number;
  };
  showCategories?: boolean;
  showStats?: boolean;
  className?: string;
}

export default function LocationCard({
  id,
  name,
  slug,
  description,
  address,
  city,
  organization,
  categories = [],
  rating,
  reviewCount,
  _count,
  showCategories = true,
  showStats = true,
  className,
}: LocationCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link href={`/locations/${slug}`} style={{ textDecoration: 'none' }}>
      <div
        style={isHovered ? styles.locationCardHover : styles.locationCard}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={className}
      >
        <div style={styles.locationHeader}>
          <div style={styles.locationInfo}>
            <h3 style={styles.locationName}>{name}</h3>
            <div style={styles.locationMeta}>
              {organization && <span>{organization.name}</span>}
              {city && <span>• {city.name}</span>}
            </div>
          </div>
        </div>

        <p style={styles.locationDescription}>
          {description}
        </p>

        {address && (
          <div style={styles.locationAddress}>
            <MapPin size={16} />
            <span>{address}</span>
          </div>
        )}

        {showCategories && categories.length > 0 && (
          <div style={styles.categoriesList}>
            {categories.slice(0, 3).map((category) => (
              <span key={category.id} style={styles.categoryTag}>
                {category.name}
              </span>
            ))}
            {categories.length > 3 && (
              <span style={styles.categoryTag}>
                +{categories.length - 3} more
              </span>
            )}
          </div>
        )}

        {showStats && _count && (
          <div style={styles.locationStats}>
            {rating && (
              <div style={styles.rating}>
                <Star size={16} />
                <span>{rating}</span>
              </div>
            )}
          </div>
        )}
      </div>
    </Link>
  );
}