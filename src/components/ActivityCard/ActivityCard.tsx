'use client';

import { useState } from 'react';
import Link from 'next/link';
import { MapPin, Users, Heart, MessageSquare, Star, DollarSign, Calendar, Building2 } from 'lucide-react';
import { Category, AgeGroup } from '../../types';
import * as styles from './ActivityCard.styles';

interface Location {
  id?: string;
  name: string;
  slug?: string;
  city?: {
    name: string;
  } | null;
  organization?: {
    name: string;
  } | null;
}

interface ActivityCardProps {
  id: string;
  title: string;
  slug: string;
  description: string;
  organizer?: string;
  costMin: number | null;
  costMax: number | null;
  costDisplay: string | null;
  isFree: boolean;
  featured?: boolean;
  imageUrl: string | null;
  location?: Location | null;
  ageGroup?: AgeGroup | null;
  categories?: Category[];
  _count?: {
    favorites: number;
    reviews: number;
  };
  showLocation?: boolean;
  showCategories?: boolean;
  showStats?: boolean;
  showAgeGroup?: boolean;
  showOrganizer?: boolean;
  showCost?: boolean;
  className?: string;
}

const formatCost = (activity: {
  costMin: number | null;
  costMax: number | null;
  costDisplay: string | null;
  isFree: boolean;
}) => {
  if (activity.isFree) return 'Free';
  if (activity.costDisplay) return activity.costDisplay;
  if (activity.costMin && activity.costMax) {
    return `$${activity.costMin} - $${activity.costMax}`;
  }
  if (activity.costMin) return `From $${activity.costMin}`;
  return 'Contact for pricing';
};

export default function ActivityCard({
  id,
  title,
  slug,
  description,
  organizer,
  costMin,
  costMax,
  costDisplay,
  isFree,
  featured = false,
  imageUrl,
  location,
  ageGroup,
  categories = [],
  _count,
  showLocation = true,
  showCategories = true,
  showStats = true,
  showAgeGroup = true,
  showOrganizer = true,
  showCost = true,
  className,
}: ActivityCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const cardStyle = featured ? styles.cardWithFeatured : styles.activityCard;
  const finalStyle = isHovered ? { ...cardStyle, ...styles.activityCardHover } : cardStyle;

  // Generate the URL using simplified /a/{slug} structure
  const activityUrl = `/a/${slug}`;

  return (
    <Link href={activityUrl} style={{ textDecoration: 'none' }}>
      <div
        style={finalStyle}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={className}
      >
        {featured && (
          <div style={styles.featuredBadge}>
            <Star size={12} />
            Featured
          </div>
        )}

        <div style={styles.activityHeader}>
          <div style={{ flex: 1 }}>
            <h3 style={styles.activityTitle}>{title}</h3>
            
            <div style={styles.activityMeta}>
              {showAgeGroup && ageGroup && (
                <div style={styles.ageGroupTag}>
                  <Users size={12} />
                  {ageGroup.name}
                </div>
              )}
              
              {showCost && (
                <div style={isFree ? styles.costFree : styles.costPaid}>
                  <DollarSign size={12} />
                  {formatCost({ costMin, costMax, costDisplay, isFree })}
                </div>
              )}
            </div>
          </div>
        </div>

        <p style={styles.activityDescription}>
          {description}
        </p>

        {showOrganizer && organizer && (
          <div style={styles.organizerInfo}>
            <Building2 size={16} />
            <span>by {organizer}</span>
          </div>
        )}

        {showLocation && location && (
          <div style={styles.activityLocation}>
            <MapPin size={16} />
            <span>
              {location.name}
              {location.city && `, ${location.city.name}`}
            </span>
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
          <div style={styles.activityStats}>
            <div style={styles.statItem}>
              <Heart size={16} />
              <span>{_count.favorites} favorites</span>
            </div>
            <div style={styles.statItem}>
              <MessageSquare size={16} />
              <span>{_count.reviews} reviews</span>
            </div>
          </div>
        )}
      </div>
    </Link>
  );
}