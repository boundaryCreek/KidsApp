import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../../../../lib/prisma';

interface Params {
  id: string;
}

// GET /api/admin/cities/[id] - Get single city
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<Params> }
) {
  try {
    const { id } = await params;

    const city = await prisma.city.findUnique({
      where: { id },
      include: {
        _count: {
          select: { locations: true },
        },
      },
    });

    if (!city) {
      return NextResponse.json(
        { error: 'City not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(city);
  } catch (error) {
    console.error('Error fetching city:', error);
    return NextResponse.json(
      { error: 'Failed to fetch city' },
      { status: 500 }
    );
  }
}

// PUT /api/admin/cities/[id] - Update city
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<Params> }
) {
  try {
    const { id } = await params;
    const body = await request.json();

    const { name, description, latitude, longitude } = body;

    // Validate required fields
    if (!name) {
      return NextResponse.json(
        { error: 'Name is required' },
        { status: 400 }
      );
    }

    // Check for duplicate city name
    const existingCity = await prisma.city.findFirst({
      where: {
        AND: [
          { id: { not: id } },
          { name: { equals: name, mode: 'insensitive' } },
        ],
      },
    });

    if (existingCity) {
      return NextResponse.json(
        { error: 'A city with this name already exists' },
        { status: 400 }
      );
    }

    const city = await prisma.city.update({
      where: { id },
      data: {
        name,
        description,
        latitude,
        longitude,
      },
      include: {
        _count: {
          select: { locations: true },
        },
      },
    });

    return NextResponse.json(city);
  } catch (error) {
    console.error('Error updating city:', error);
    return NextResponse.json(
      { error: 'Failed to update city' },
      { status: 500 }
    );
  }
}

// DELETE /api/admin/cities/[id] - Delete city
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<Params> }
) {
  try {
    const { id } = await params;

    // Check if city is being used
    const city = await prisma.city.findUnique({
      where: { id },
      include: {
        _count: {
          select: { locations: true },
        },
      },
    });

    if (!city) {
      return NextResponse.json(
        { error: 'City not found' },
        { status: 404 }
      );
    }

    if (city._count.locations > 0) {
      return NextResponse.json(
        { error: 'Cannot delete city that is being used by locations' },
        { status: 400 }
      );
    }

    await prisma.city.delete({
      where: { id },
    });

    return NextResponse.json({ message: 'City deleted successfully' });
  } catch (error) {
    console.error('Error deleting city:', error);
    return NextResponse.json(
      { error: 'Failed to delete city' },
      { status: 500 }
    );
  }
}