import { NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prisma';

export async function GET() {
  try {
    const locations = await prisma.location.findMany({
      where: {
        isActive: true,
      },
      include: {
        city: true,
        organization: true,
        categories: {
          select: {
            id: true,
            name: true,
            slug: true,
            icon: true,
            color: true,
          },
        },
        _count: {
          select: {
            activities: true,
            reviews: true,
          },
        },
      },
      orderBy: {
        name: 'asc',
      },
    });

    // Transform the data to match the expected format
    const formattedLocations = locations.map(location => ({
      id: location.id,
      name: location.name,
      slug: location.slug,
      type: location.type,
      description: location.description,
      address: location.address,
      phone: location.phone,
      email: location.email,
      website: location.website,
      imageUrl: location.imageUrl,
      amenities: location.amenities,
      capacity: location.capacity,
      accessibility: location.accessibility,
      parking: location.parking,
      publicTransport: location.publicTransport,
      operatingHours: location.operatingHours,
      rating: location.rating,
      reviewCount: location.reviewCount,
      city: location.city,
      organization: location.organization,
      categories: location.categories,
      _count: {
        activities: location._count.activities,
        reviews: location._count.reviews,
      },
    }));

    return NextResponse.json(formattedLocations);
  } catch (error) {
    console.error('Failed to fetch locations:', error);
    return NextResponse.json(
      { error: 'Failed to fetch locations' },
      { status: 500 }
    );
  }
}