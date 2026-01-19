import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(
  request: Request,
  { params }: { params: Promise<{ locationSlug: string }> }
) {
  try {
    const { locationSlug } = await params;

    const locationData = await prisma.location.findUnique({
      where: {
        slug: locationSlug,
      },
      include: {
        city: true,
        organization: true,
        categories: true,
        activities: {
          include: {
            location: {
              select: {
                id: true,
                name: true,
                slug: true,
              }
            },
            ageGroup: true,
            categories: true,
            _count: {
              select: {
                favorites: true,
                reviews: true,
              }
            }
          }
        },
        _count: {
          select: {
            activities: true,
            reviews: true,
          }
        }
      },
    });

    if (!locationData) {
      return NextResponse.json(
        { error: 'Location not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(locationData);
  } catch (error) {
    console.error('Error fetching location:', error);
    return NextResponse.json(
      { error: 'Failed to fetch location' },
      { status: 500 }
    );
  }
}