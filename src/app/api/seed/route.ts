import { NextResponse } from 'next/server'
import { prisma } from '../../../../lib/prisma'

export async function POST() {
  try {
    console.log('🌱 Seeding database...')

    // Create Categories
    const categories = [
      { name: 'Sports & Recreation', slug: 'sports-recreation', description: 'Physical activities and sports', icon: '⚽', color: '#10B981' },
      { name: 'Arts & Crafts', slug: 'arts-crafts', description: 'Creative and artistic activities', icon: '🎨', color: '#8B5CF6' },
      { name: 'STEM', slug: 'stem', description: 'Science, technology, engineering, and math', icon: '🔬', color: '#F59E0B' },
      { name: 'Music & Performance', slug: 'music-performance', description: 'Musical and performing arts', icon: '🎵', color: '#EF4444' },
      { name: 'Reading & Literature', slug: 'reading-literature', description: 'Books, stories, and literacy', icon: '📚', color: '#3B82F6' },
      { name: 'Outdoor Adventures', slug: 'outdoor-adventures', description: 'Nature and outdoor activities', icon: '🌳', color: '#059669' },
      { name: 'Educational', slug: 'educational', description: 'Learning and educational programs', icon: '🎓', color: '#7C3AED' },
    ]

    const createdCategories = []

    for (const category of categories) {
      const created = await prisma.category.upsert({
        where: { slug: category.slug },
        update: {},
        create: category,
      })
      createdCategories.push(created)
    }

    // Create Age Groups
    const ageGroups = [
      { name: 'Toddlers', slug: 'toddlers', minAge: 1, maxAge: 3, description: 'Activities for toddlers (1-3 years)' },
      { name: 'Preschoolers', slug: 'preschoolers', minAge: 3, maxAge: 5, description: 'Activities for preschoolers (3-5 years)' },
      { name: 'School Age', slug: 'school-age', minAge: 5, maxAge: 12, description: 'Activities for school-age children (5-12 years)' },
      { name: 'Teens', slug: 'teens', minAge: 13, maxAge: 18, description: 'Activities for teenagers (13-18 years)' },
      { name: 'All Ages', slug: 'all-ages', minAge: null, maxAge: null, description: 'Activities suitable for all ages' },
    ]

    const createdAgeGroups = []

    for (const ageGroup of ageGroups) {
      const created = await prisma.ageGroup.upsert({
        where: { slug: ageGroup.slug },
        update: {},
        create: ageGroup,
      })
      createdAgeGroups.push(created)
    }

    // Create Cities
    const cities = [
      { name: 'Minneapolis', slug: 'minneapolis', description: 'Activities in Minneapolis, MN', latitude: 44.9778, longitude: -93.2650 },
      { name: 'St. Paul', slug: 'st-paul', description: 'Activities in St. Paul, MN', latitude: 44.9537, longitude: -93.0900 },
      { name: 'Maple Grove', slug: 'maple-grove', description: 'Activities in Maple Grove, MN', latitude: 45.0724, longitude: -93.4557 },
      { name: 'Plymouth', slug: 'plymouth', description: 'Activities in Plymouth, MN', latitude: 45.0105, longitude: -93.4555 },
    ]

    const createdCities = []

    for (const city of cities) {
      const created = await prisma.city.upsert({
        where: { slug: city.slug },
        update: {},
        create: city,
      })
      createdCities.push(created)
    }

    // Create Organizations
    const organizations = [
      {
        name: 'Minneapolis Parks & Recreation',
        slug: 'minneapolis-parks-rec',
        description: 'Official parks and recreation department for Minneapolis',
        website: 'https://www.minneapolisparks.org/',
      },
      {
        name: 'St. Paul Parks & Recreation',
        slug: 'st-paul-parks-rec',
        description: 'Official parks and recreation department for St. Paul',
        website: 'https://www.stpaul.gov/departments/parks-recreation',
      },
      {
        name: 'YMCA',
        slug: 'ymca',
        description: 'Youth programs and community activities',
        website: 'https://www.ymcamn.org/',
      },
    ]

    const createdOrganizations = []

    for (const org of organizations) {
      const created = await prisma.organization.upsert({
        where: { slug: org.slug },
        update: {},
        create: org,
      })
      createdOrganizations.push(created)
    }

    console.log('✅ Database seeded successfully!')

    return NextResponse.json({
      success: true,
      message: 'Database seeded successfully!',
      data: {
        categories: createdCategories.length,
        ageGroups: createdAgeGroups.length,
        cities: createdCities.length,
        organizations: createdOrganizations.length
      }
    })

  } catch (error) {
    console.error('Error seeding database:', error)
    return NextResponse.json(
      { 
        success: false,
        error: 'Failed to seed database',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}