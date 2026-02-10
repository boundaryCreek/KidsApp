import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prisma';

// GET /api/events - Get all events with filters
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');
    const category = searchParams.get('category');
    const location = searchParams.get('location');
    const limit = searchParams.get('limit');

    // Build where clause for filtering
    const where: any = {
      cancelled: false,
    };

    // Date range filter
    if (startDate && endDate) {
      where.date = {
        gte: new Date(startDate),
        lte: new Date(endDate),
      };
    } else if (startDate) {
      where.date = {
        gte: new Date(startDate),
      };
    } else if (endDate) {
      where.date = {
        lte: new Date(endDate),
      };
    }

    // Category filter through activity relation
    if (category) {
      where.activity = {
        categories: {
          some: {
            slug: category,
          },
        },
      };
    }

    // Location filter through activity relation
    if (location) {
      where.activity = {
        ...where.activity,
        location: {
          slug: location,
        },
      };
    }

    const events = await prisma.event.findMany({
      where,
      include: {
        activity: {
          include: {
            location: {
              include: {
                organization: true,
              },
            },
            categories: true,
            ageGroups: true,
          },
        },
      },
      orderBy: {
        date: 'asc',
      },
      take: limit ? parseInt(limit) : undefined,
    });

    return NextResponse.json(events);
  } catch (error) {
    console.error('Events API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch events' },
      { status: 500 }
    );
  }
}