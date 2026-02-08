import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../../../lib/prisma';

interface Params {
  id: string;
}

// GET /api/admin/locations/[id] - Get single location
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<Params> }
) {
  try {
    const { id } = await params;

    const location = await prisma.location.findUnique({
      where: { id },
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
        _count: {
          select: { activities: true, reviews: true },
        },
      },
    });

    if (!location) {
      return NextResponse.json(
        { error: 'Location not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(location);
  } catch (error) {
    console.error('Error fetching location:', error);
    return NextResponse.json(
      { error: 'Failed to fetch location' },
      { status: 500 }
    );
  }
}

// PUT /api/admin/locations/[id] - Update location
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<Params> }
) {
  try {
    const { id } = await params;
    const body = await request.json();

    const {
      name,
      slug,
      type,
      description,
      summary,
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
      tagIds,
      isActive,
    } = body;

    // First, disconnect all existing categories and ageGroups
    await prisma.location.update({
      where: { id },
      data: {
        categories: {
          set: [],
        },
        ageGroups: {
          set: [],
        },
        tags: {
          set: [],
        },
      },
    });

    // Then update the location with new data
    const location = await prisma.location.update({
      where: { id },
      data: {
        name,
        slug,
        type,
        description,
        summary,
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
        hoursUpdatedAt: operatingHours ? new Date() : null,
        timezone: timezone || 'America/Chicago',
        socialMedia,
        organizationId,
        cityId: cityId || null,
        isActive: Boolean(isActive),
        categories: categoryIds?.length
          ? {
              connect: categoryIds.map((categoryId: string) => ({ id: categoryId })),
            }
          : undefined,
        ageGroups: ageGroupIds?.length
          ? {
              connect: ageGroupIds.map((ageGroupId: string) => ({ id: ageGroupId })),
            }
          : undefined,
        tags: tagIds?.length
          ? {
              connect: tagIds.map((tagId: string) => ({ id: tagId })),
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

    return NextResponse.json(location);
  } catch (error) {
    console.error('Error updating location:', error);
    return NextResponse.json(
      { error: 'Failed to update location' },
      { status: 500 }
    );
  }
}

// DELETE /api/admin/locations/[id] - Delete location
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<Params> }
) {
  try {
    const { id } = await params;

    await prisma.location.delete({
      where: { id },
    });

    return NextResponse.json({ message: 'Location deleted successfully' });
  } catch (error) {
    console.error('Error deleting location:', error);
    return NextResponse.json(
      { error: 'Failed to delete location' },
      { status: 500 }
    );
  }
}