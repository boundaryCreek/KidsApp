import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prisma';

// GET /api/admin/activities - List all activities with pagination
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
            { title: { contains: search, mode: 'insensitive' as const } },
            { description: { contains: search, mode: 'insensitive' as const } },
            { organizer: { contains: search, mode: 'insensitive' as const } },
          ],
        }
      : {};

    const [activities, total] = await Promise.all([
      prisma.activity.findMany({
        where,
        include: {
          location: {
            select: { id: true, name: true, slug: true },
          },
          ageGroup: {
            select: { id: true, name: true, minAge: true, maxAge: true },
          },
          categories: {
            select: { id: true, name: true, slug: true },
          },
          _count: {
            select: { favorites: true, reviews: true },
          },
        },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      prisma.activity.count({ where }),
    ]);

    return NextResponse.json({
      activities,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Error fetching activities:', error);
    return NextResponse.json(
      { error: 'Failed to fetch activities' },
      { status: 500 }
    );
  }
}

// POST /api/admin/activities - Create new activity
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const {
      title,
      slug,
      description,
      organizer,
      time,
      costMin,
      costMax,
      costDisplay,
      isFree,
      imageUrl,
      featured,
      recurrence,
      recurrenceFrequency,
      recurrenceInterval,
      ageGroupId,
      locationId,
      categoryIds,
    } = body;

    // Create the activity with categories
    const activity = await prisma.activity.create({
      data: {
        title,
        slug,
        description,
        organizer,
        time,
        costMin: costMin ? parseFloat(costMin) : null,
        costMax: costMax ? parseFloat(costMax) : null,
        costDisplay,
        isFree: Boolean(isFree),
        imageUrl,
        featured: Boolean(featured),
        recurrence,
        recurrenceFrequency,
        recurrenceInterval: recurrenceInterval ? parseInt(recurrenceInterval) : null,
        ageGroupId,
        locationId: locationId || null,
        categories: categoryIds?.length
          ? {
              connect: categoryIds.map((id: string) => ({ id })),
            }
          : undefined,
      },
      include: {
        location: {
          select: { id: true, name: true, slug: true },
        },
        ageGroup: {
          select: { id: true, name: true, minAge: true, maxAge: true },
        },
        categories: {
          select: { id: true, name: true, slug: true },
        },
      },
    });

    return NextResponse.json(activity, { status: 201 });
  } catch (error) {
    console.error('Error creating activity:', error);
    return NextResponse.json(
      { error: 'Failed to create activity' },
      { status: 500 }
    );
  }
}