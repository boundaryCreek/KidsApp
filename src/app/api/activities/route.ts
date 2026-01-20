import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const featured = searchParams.get('featured') === 'true';
    const limit = parseInt(searchParams.get('limit') || '10');

    const activities = await prisma.activity.findMany({
      where: {
        isActive: true,
        ...(featured && { featured: true }),
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
        ageGroup: {
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
      take: limit,
    });

    return NextResponse.json(activities);
  } catch (error) {
    console.error('Error fetching activities:', error);
    return NextResponse.json(
      { error: 'Failed to fetch activities' },
      { status: 500 }
    );
  }
}