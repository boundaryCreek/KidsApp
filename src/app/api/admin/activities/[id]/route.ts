import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../../../lib/prisma';

interface Params {
  id: string;
}

// GET /api/admin/activities/[id] - Get single activity
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<Params> }
) {
  try {
    const { id } = await params;

    const activity = await prisma.activity.findUnique({
      where: { id },
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
    });

    if (!activity) {
      return NextResponse.json(
        { error: 'Activity not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(activity);
  } catch (error) {
    console.error('Error fetching activity:', error);
    return NextResponse.json(
      { error: 'Failed to fetch activity' },
      { status: 500 }
    );
  }
}

// PUT /api/admin/activities/[id] - Update activity
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<Params> }
) {
  try {
    const { id } = await params;
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
      isActive,
    } = body;

    // First, disconnect all existing categories
    await prisma.activity.update({
      where: { id },
      data: {
        categories: {
          set: [],
        },
      },
    });

    // Then update the activity with new data
    const activity = await prisma.activity.update({
      where: { id },
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
        isActive: Boolean(isActive),
        categories: categoryIds?.length
          ? {
              connect: categoryIds.map((categoryId: string) => ({ id: categoryId })),
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

    return NextResponse.json(activity);
  } catch (error) {
    console.error('Error updating activity:', error);
    return NextResponse.json(
      { error: 'Failed to update activity' },
      { status: 500 }
    );
  }
}

// DELETE /api/admin/activities/[id] - Delete activity
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<Params> }
) {
  try {
    const { id } = await params;

    await prisma.activity.delete({
      where: { id },
    });

    return NextResponse.json({ message: 'Activity deleted successfully' });
  } catch (error) {
    console.error('Error deleting activity:', error);
    return NextResponse.json(
      { error: 'Failed to delete activity' },
      { status: 500 }
    );
  }
}