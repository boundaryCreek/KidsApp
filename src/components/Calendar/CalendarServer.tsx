import { prisma } from '../../../lib/prisma';
import { Category, Location } from '../../types';
import CalendarClient from './CalendarClient';

// Server component that pre-loads filter data
export default async function CalendarServer() {
  try {
    // Fetch categories and locations server-side
    const [categoriesData, locationsData] = await Promise.all([
      prisma.category.findMany({
        select: {
          id: true,
          name: true,
          slug: true,
          description: true,
          icon: true,
          color: true,
        },
        orderBy: {
          name: 'asc',
        },
      }),
      prisma.location.findMany({
        where: {
          isActive: true,
        },
        include: {
          organization: true,
          city: true,
          categories: {
            select: {
              id: true,
              name: true,
              slug: true,
              icon: true,
              color: true,
            }
          },
          _count: {
            select: {
              activities: true,
              reviews: true,
            }
          }
        },
        orderBy: {
          name: 'asc',
        },
      }),
    ]);

    // Convert to our type interfaces
    const categories: Category[] = categoriesData.map(cat => ({
      id: cat.id,
      name: cat.name,
      slug: cat.slug,
      description: cat.description,
      icon: cat.icon,
      color: cat.color,
    }));

    const locations: Location[] = locationsData.map(loc => ({
      id: loc.id,
      name: loc.name,
      slug: loc.slug,
      description: loc.description,
      address: loc.address,
      type: loc.type as Location['type'],
      latitude: loc.latitude,
      longitude: loc.longitude,
      phone: loc.phone,
      email: loc.email,
      website: loc.website,
      imageUrl: loc.imageUrl,
      amenities: loc.amenities || [],
      accessibility: loc.accessibility || [],
      capacity: loc.capacity,
      parking: loc.parking as Location['parking'],
      publicTransport: loc.publicTransport,
      operatingHours: loc.operatingHours,
      socialMedia: loc.socialMedia,
      rating: loc.rating,
      reviewCount: loc.reviewCount,
      averageRating: loc.averageRating,
      isActive: loc.isActive,
      createdAt: loc.createdAt,
      updatedAt: loc.updatedAt,
      organization: loc.organization,
      city: loc.city,
      categories: loc.categories,
      _count: loc._count,
    }));

    return (
      <CalendarClient 
        initialCategories={categories}
        initialLocations={locations}
      />
    );
  } catch (error) {
    console.error('Error fetching calendar data:', error);
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '400px',
        color: 'var(--color-error-600)',
        fontSize: 'var(--font-size-lg)',
        textAlign: 'center',
        flexDirection: 'column',
        gap: 'var(--space-4)',
      }}>
        <p>Failed to load calendar. Please try again.</p>
      </div>
    );
  }
}