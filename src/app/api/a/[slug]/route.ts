import { NextResponse } from 'next/server';
import { prisma } from '../../../../../lib/prisma';


export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;

    const activity = await prisma.activity.findFirst({
      where: {
        slug: slug,
        isActive: true,
      },
      include: {
        location: {
          include: {
            city: true,
            organization: true,
            categories: true,
          },
        },
        ageGroup: true,
        categories: true,
        reviews: {
          where: {
            isActive: true,
          },
          include: {
            user: {
              select: {
                name: true,
                email: true,
              },
            },
          },
          orderBy: {
            createdAt: 'desc',
          },
          take: 10,
        },
        _count: {
          select: {
            favorites: true,
            reviews: true,
          },
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