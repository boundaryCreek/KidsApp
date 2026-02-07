import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prisma';

// GET /api/admin/locations - List all locations with pagination
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const search = searchParams.get('search') || '';
    
    const skip = (page - 1) * limit;
    
    const where = search
      ? {
          OR: [
            { name: { contains: search, mode: 'insensitive' as const } },
            { description: { contains: search, mode: 'insensitive' as const } },
            { address: { contains: search, mode: 'insensitive' as const } },
          ],
        }
      : {};

    const [locations, total] = await Promise.all([
      prisma.location.findMany({
        where,
        include: {
          organization: {
            select: { id: true, name: true, slug: true },
          },
          city: {
            select: { id: true, name: true, slug: true },
          },
          categories: {
            select: { id: true, name: true, slug: true },
          },
          _count: {
            select: { activities: true, reviews: true },
          },
        },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      prisma.location.count({ where }),
    ]);

    return NextResponse.json({
      locations,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Error fetching locations:', error);
    return NextResponse.json(
      { error: 'Failed to fetch locations' },
      { status: 500 }
    );
  }
}

// POST /api/admin/locations - Create new location
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const {
      name,
      slug,
      type,
      description,
      address,
      latitude,
      longitude,
      phone,
      email,
      website,
      imageUrl,
      amenities,
      capacity,
      accessibility,
      parking,
      costRange,
      publicTransport,
      operatingHours,
      timezone,
      socialMedia,
      organizationId,
      cityId,
      categoryIds,
      ageGroupIds,
    } = body;

    // Create the location with categories
    const location = await prisma.location.create({
      data: {
        name,
        slug,
        type,
        description,
        address,
        latitude: latitude ? parseFloat(latitude) : null,
        longitude: longitude ? parseFloat(longitude) : null,
        phone,
        email,
        website,
        imageUrl,
        amenities: amenities || [],
        capacity: capacity ? parseInt(capacity) : null,
        accessibility: accessibility || [],
        parking,
        costRange,
        publicTransport,
        operatingHours,
        timezone: timezone || 'America/Chicago',
        socialMedia,
        organizationId,
        cityId: cityId || null,
        categories: categoryIds?.length
          ? {
              connect: categoryIds.map((id: string) => ({ id })),
            }
          : undefined,
        ageGroups: ageGroupIds?.length
          ? {
              connect: ageGroupIds.map((id: string) => ({ id })),
            }
          : undefined,
      },
      include: {
        organization: {
          select: { id: true, name: true, slug: true },
        },
        city: {
          select: { id: true, name: true, slug: true },
        },
        categories: {
          select: { id: true, name: true, slug: true },
        },
        ageGroups: {
          select: { id: true, name: true, slug: true },
        },
      },
    });

    return NextResponse.json(location, { status: 201 });
  } catch (error) {
    console.error('Error creating location:', error);
    return NextResponse.json(
      { error: 'Failed to create location' },
      { status: 500 }
    );
  }
}