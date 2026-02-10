import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const search = searchParams.get('search') || '';
    const activityId = searchParams.get('activityId');

    const skip = (page - 1) * limit;

    // Build where clause
    const whereClause: any = {
      OR: [
        { title: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
        { activity: { title: { contains: search, mode: 'insensitive' } } },
      ],
    };

    // Add activityId filter if provided
    if (activityId) {
      whereClause.activityId = activityId;
    }

    const [events, total] = await Promise.all([
      prisma.event.findMany({
        where: whereClause,
        include: {
          activity: {
            select: { id: true, title: true, slug: true },
          },
          _count: {
            select: { reviews: true },
          },
        },
        orderBy: { date: 'desc' },
        skip,
        take: limit,
      }),
      prisma.event.count({
        where: whereClause,
      }),
    ]);

    return NextResponse.json({
      data: events,
      total,
      pages: Math.ceil(total / limit),
      currentPage: page,
    });
  } catch (error) {
    console.error('Error fetching events:', error);
    return NextResponse.json({ error: 'Failed to fetch events' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { 
      activityId, 
      title, 
      date, 
      time, 
      cancelled, 
      notes,
      repeatPattern = 'none',
      repeatEnd,
      repeatOccurrences,
    } = body;

    // Generate events
    const events = [];
    let currentDate = new Date(date);
    const baseDate = new Date(date);
    let occurrenceCount = 0;
    const maxOccurrences = repeatOccurrences || 52; // Default to 52 weeks of recurrence
    const endDate = repeatEnd ? new Date(repeatEnd) : new Date(baseDate.getFullYear() + 1, baseDate.getMonth(), baseDate.getDate());

    while (currentDate <= endDate && occurrenceCount < maxOccurrences) {
      occurrenceCount++;

      // Generate slug from title
      const slug = `${title
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^\w-]/g, '')}-${currentDate.getTime()}`;

      events.push({
        activityId,
        title,
        date: new Date(currentDate),
        time,
        cancelled: cancelled || false,
        notes,
        slug,
      });

      // Move to next occurrence
      if (repeatPattern === 'none') {
        break;
      } else if (repeatPattern === 'daily') {
        currentDate.setDate(currentDate.getDate() + 1);
      } else if (repeatPattern === 'weekdays') {
        // Move to next weekday (skip weekends)
        currentDate.setDate(currentDate.getDate() + 1);
        while (currentDate.getDay() === 0 || currentDate.getDay() === 6) {
          currentDate.setDate(currentDate.getDate() + 1);
        }
      } else if (repeatPattern === 'weekly') {
        currentDate.setDate(currentDate.getDate() + 7);
      } else if (repeatPattern === 'biweekly') {
        currentDate.setDate(currentDate.getDate() + 14);
      } else if (repeatPattern === 'monthly') {
        currentDate.setMonth(currentDate.getMonth() + 1);
      }
    }

    // Create all events
    const createdEvents = await Promise.all(
      events.map((eventData) =>
        prisma.event.create({
          data: eventData,
          include: {
            activity: {
              select: { id: true, title: true, slug: true },
            },
            _count: {
              select: { reviews: true },
            },
          },
        })
      )
    );

    return NextResponse.json(
      { 
        data: createdEvents, 
        count: createdEvents.length,
        message: `Created ${createdEvents.length} event${createdEvents.length !== 1 ? 's' : ''}`,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating event:', error);
    return NextResponse.json({ error: 'Failed to create event' }, { status: 500 });
  }
}
