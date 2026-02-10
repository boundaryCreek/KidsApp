import { prisma } from '../../../lib/prisma';
import FeaturedActivitiesClient from './FeaturedActivitiesClient';

// Simplified types for featured activities
interface FeaturedLocation {
  id: string;
  name: string;
  slug: string;
  address: string | null;
}

interface FeaturedCategory {
  id: string;
  name: string;
  slug: string;
  icon: string | null;
  color: string | null;
}

interface FeaturedAgeGroup {
  id: string;
  name: string;
  slug: string;
  minAge: number | null;
  maxAge: number | null;
}

export interface FeaturedActivity {
  id: string;
  title: string;
  slug: string;
  description: string;
  organizer: string;
  costMin: number | null;
  costMax: number | null;
  costDisplay: string | null;
  isFree: boolean;
  featured: boolean;
  imageUrl: string | null;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  location: FeaturedLocation | null;
  ageGroups: FeaturedAgeGroup[];
  categories: FeaturedCategory[];
  _count: {
    favorites: number;
    reviews: number;
  };
}

interface FeaturedActivitiesProps {
  className?: string;
}

export default async function FeaturedActivities({ className }: FeaturedActivitiesProps) {
  try {
    // Fetch featured activities server-side
    const activitiesData = await prisma.activity.findMany({
      where: {
        isActive: true,
        featured: true,
      },
      include: {
        location: {
          select: {
            id: true,
            name: true,
            slug: true,
            address: true,
          }
        },
        categories: {
          select: {
            id: true,
            name: true,
            slug: true,
            icon: true,
            color: true,
          }
        },
        ageGroups: {
          select: {
            id: true,
            name: true,
            slug: true,
            minAge: true,
            maxAge: true,
          }
        },
        _count: {
          select: {
            favorites: true,
            reviews: true,
          }
        }
      },
      orderBy: [
        { featured: 'desc' },
        { favoriteCount: 'desc' },
        { createdAt: 'desc' }
      ],
      take: 6,
    });

    // Convert to our simplified type interface
    const activities: FeaturedActivity[] = activitiesData.map(activity => ({
      id: activity.id,
      title: activity.title,
      slug: activity.slug,
      description: activity.description,
      organizer: activity.organizer,
      costMin: activity.costMin,
      costMax: activity.costMax,
      costDisplay: activity.costDisplay,
      isFree: activity.isFree,
      featured: activity.featured,
      imageUrl: activity.imageUrl,
      isActive: activity.isActive,
      createdAt: activity.createdAt,
      updatedAt: activity.updatedAt,
      location: activity.location,
      ageGroups: activity.ageGroups,
      categories: activity.categories,
      _count: {
        favorites: activity._count.favorites,
        reviews: activity._count.reviews,
      },
    }));

    return <FeaturedActivitiesClient activities={activities} className={className} />;
  } catch (error) {
    console.error('Error fetching featured activities:', error);
    return (
      <div style={{
        backgroundColor: 'var(--color-surface)',
        borderRadius: 'var(--radius-lg)',
        padding: 'var(--space-4)',
        boxShadow: 'var(--shadow-sm)',
        marginBottom: 'var(--space-4)',
      }} className={className}>
        <h3 style={{
          fontSize: 'var(--font-size-lg)',
          fontWeight: 'var(--font-weight-semibold)',
          color: 'var(--color-text)',
          margin: 0,
          marginBottom: 'var(--space-4)',
        }}>Featured Activities</h3>
        <div style={{ 
          height: '160px', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          color: 'var(--color-text-secondary)'
        }}>
          Error loading featured activities
        </div>
      </div>
    );
  }
}