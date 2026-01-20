import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../../../../lib/prisma';

interface Params {
  id: string;
}

// GET /api/admin/age-groups/[id] - Get single age group
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<Params> }
) {
  try {
    const { id } = await params;

    const ageGroup = await prisma.ageGroup.findUnique({
      where: { id },
      include: {
        _count: {
          select: { activities: true },
        },
      },
    });

    if (!ageGroup) {
      return NextResponse.json(
        { error: 'Age group not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(ageGroup);
  } catch (error) {
    console.error('Error fetching age group:', error);
    return NextResponse.json(
      { error: 'Failed to fetch age group' },
      { status: 500 }
    );
  }
}

// PUT /api/admin/age-groups/[id] - Update age group
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<Params> }
) {
  try {
    const { id } = await params;
    const body = await request.json();

    const { name, minAge, maxAge, description } = body;

    // Validate required fields
    if (!name || minAge === undefined || maxAge === undefined) {
      return NextResponse.json(
        { error: 'Name, minAge, and maxAge are required' },
        { status: 400 }
      );
    }

    // Validate age range
    if (minAge < 0 || maxAge < 0 || minAge > maxAge) {
      return NextResponse.json(
        { error: 'Invalid age range. minAge must be less than or equal to maxAge and both must be non-negative' },
        { status: 400 }
      );
    }

    // Check for overlapping age groups (excluding current one)
    const overlappingAgeGroup = await prisma.ageGroup.findFirst({
      where: {
        AND: [
          { id: { not: id } },
          { minAge: { lte: maxAge } },
          { maxAge: { gte: minAge } },
        ],
      },
    });

    if (overlappingAgeGroup) {
      return NextResponse.json(
        { error: `Age range overlaps with existing age group: ${overlappingAgeGroup.name}` },
        { status: 400 }
      );
    }

    const ageGroup = await prisma.ageGroup.update({
      where: { id },
      data: {
        name,
        minAge,
        maxAge,
        description,
      },
      include: {
        _count: {
          select: { activities: true },
        },
      },
    });

    return NextResponse.json(ageGroup);
  } catch (error) {
    console.error('Error updating age group:', error);
    return NextResponse.json(
      { error: 'Failed to update age group' },
      { status: 500 }
    );
  }
}

// DELETE /api/admin/age-groups/[id] - Delete age group
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<Params> }
) {
  try {
    const { id } = await params;

    // Check if age group is being used
    const ageGroup = await prisma.ageGroup.findUnique({
      where: { id },
      include: {
        _count: {
          select: { activities: true },
        },
      },
    });

    if (!ageGroup) {
      return NextResponse.json(
        { error: 'Age group not found' },
        { status: 404 }
      );
    }

    if (ageGroup._count.activities > 0) {
      return NextResponse.json(
        { error: 'Cannot delete age group that is being used by activities' },
        { status: 400 }
      );
    }

    await prisma.ageGroup.delete({
      where: { id },
    });

    return NextResponse.json({ message: 'Age group deleted successfully' });
  } catch (error) {
    console.error('Error deleting age group:', error);
    return NextResponse.json(
      { error: 'Failed to delete age group' },
      { status: 500 }
    );
  }
}