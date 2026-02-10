import { NextResponse } from 'next/server'
import { prisma } from '../../../../lib/prisma'

export async function GET(request: Request, { params }: { params: Promise<{ slug: string }> }) {
  try {
    const { slug } = await params

    const category = await prisma.category.findUnique({
      where: { slug },
      include: {
        locations: {
          include: {
            city: true,
            organization: true,
            _count: {
              select: {
                activities: true,
                reviews: true
              }
            }
          },
          take: 10,
          orderBy: {
            name: 'asc'
          }
        },
        activities: {
          include: {
            location: {
              include: {
                city: true,
                organization: true
              }
            },
            ageGroups: true,
            _count: {
              select: {
                favorites: true,
                reviews: true
              }
            }
          },
          take: 10,
          orderBy: {
            title: 'asc'
          }
        },
        _count: {
          select: {
            locations: true,
            activities: true
          }
        }
      }
    })

    if (!category) {
      return NextResponse.json(
        { error: 'Category not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(category)
  } catch (error) {
    console.error('Error fetching category details:', error)
    return NextResponse.json(
      { error: 'Failed to fetch category details' },
      { status: 500 }
    )
  }
}