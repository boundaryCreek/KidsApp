import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../../../lib/prisma';

// GET /api/admin/age-groups - List all age groups with pagination and search
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
          ],
        }
      : {};

    const [ageGroups, total] = await Promise.all([
      prisma.ageGroup.findMany({
        where,
        skip,
        take: limit,
        orderBy: { minAge: 'asc' },
        include: {
          _count: {
            select: { activities: true },
          },
        },
      }),
      prisma.ageGroup.count({ where }),
    ]);

    const totalPages = Math.ceil(total / limit);

    return NextResponse.json({
      ageGroups,
      total,
      page,
      totalPages,
    });
  } catch (error) {
    console.error('Error fetching age groups:', error);
    return NextResponse.json(
      { error: 'Failed to fetch age groups' },
      { status: 500 }
    );
  }
}

// POST /api/admin/age-groups - Create new age group
export async function POST(request: NextRequest) {
  try {
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

    // Check for overlapping age groups
    const overlappingAgeGroup = await prisma.ageGroup.findFirst({
      where: {
        AND: [
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

    const ageGroup = await prisma.ageGroup.create({
      data: {
        name,
        slug: name.toLowerCase().replace(/\s+/g, '-'),
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

    return NextResponse.json(ageGroup, { status: 201 });
  } catch (error) {
    console.error('Error creating age group:', error);
    return NextResponse.json(
      { error: 'Failed to create age group' },
      { status: 500 }
    );
  }
}