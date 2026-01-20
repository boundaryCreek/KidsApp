import { NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prisma';

// GET /api/admin/options - Get all options for form dropdowns
export async function GET() {
  try {
    const [locations, ageGroups, categories, organizations, cities] = await Promise.all([
      prisma.location.findMany({
        where: { isActive: true },
        select: { id: true, name: true, slug: true },
        orderBy: { name: 'asc' },
      }),
      prisma.ageGroup.findMany({
        where: { isActive: true },
        select: { id: true, name: true, minAge: true, maxAge: true },
        orderBy: { sortOrder: 'asc' },
      }),
      prisma.category.findMany({
        select: { id: true, name: true, slug: true, icon: true, color: true },
        orderBy: { name: 'asc' },
      }),
      prisma.organization.findMany({
        where: { isActive: true },
        select: { id: true, name: true, slug: true },
        orderBy: { name: 'asc' },
      }),
      prisma.city.findMany({
        where: { isActive: true },
        select: { id: true, name: true, slug: true },
        orderBy: { name: 'asc' },
      }),
    ]);

    return NextResponse.json({
      locations,
      ageGroups,
      categories,
      organizations,
      cities,
    });
  } catch (error) {
    console.error('Error fetching options:', error);
    return NextResponse.json(
      { error: 'Failed to fetch options' },
      { status: 500 }
    );
  }
}