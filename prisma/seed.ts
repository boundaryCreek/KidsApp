import { config } from 'dotenv'
import { resolve } from 'path'
import { PrismaClient } from '@prisma/client'

// Load environment variables from .env.local
config({ path: resolve(process.cwd(), '.env.local') })

// Fallback to alternative environment variable if DATABASE_URL is not set
const databaseUrl = process.env.DATABASE_URL || process.env.POSTGRES_URL

if (!databaseUrl) {
  console.error('❌ No database URL found. Please check your .env.local file.')
  process.exit(1)
}

console.log('🔗 Using database URL:', databaseUrl.substring(0, 50) + '...')

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...')

  // Create Age Groups
  const ageGroups = [
    { name: 'Toddlers', slug: 'toddlers', minAge: 1, maxAge: 3, description: 'Activities for toddlers (1-3 years)' },
    { name: 'Preschoolers', slug: 'preschoolers', minAge: 3, maxAge: 5, description: 'Activities for preschoolers (3-5 years)' },
    { name: 'School Age', slug: 'school-age', minAge: 5, maxAge: 12, description: 'Activities for school-age children (5-12 years)' },
    { name: 'Teens', slug: 'teens', minAge: 13, maxAge: 18, description: 'Activities for teenagers (13-18 years)' },
    { name: 'All Ages', slug: 'all-ages', minAge: null, maxAge: null, description: 'Activities suitable for all ages' },
  ]

  for (const ageGroup of ageGroups) {
    await prisma.ageGroup.upsert({
      where: { slug: ageGroup.slug },
      update: {},
      create: ageGroup,
    })
  }

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

  for (const category of categories) {
    await prisma.category.upsert({
      where: { slug: category.slug },
      update: {},
      create: category,
    })
  }

  // Create Cities
  const cities = [
    { name: 'Minneapolis', slug: 'minneapolis', description: 'Activities in Minneapolis, MN', latitude: 44.9778, longitude: -93.2650 },
    { name: 'St. Paul', slug: 'st-paul', description: 'Activities in St. Paul, MN', latitude: 44.9537, longitude: -93.0900 },
    { name: 'Maple Grove', slug: 'maple-grove', description: 'Activities in Maple Grove, MN', latitude: 45.0724, longitude: -93.4557 },
    { name: 'Plymouth', slug: 'plymouth', description: 'Activities in Plymouth, MN', latitude: 45.0105, longitude: -93.4555 },
  ]

  for (const city of cities) {
    await prisma.city.upsert({
      where: { slug: city.slug },
      update: {},
      create: city,
    })
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

  for (const org of organizations) {
    await prisma.organization.upsert({
      where: { slug: org.slug },
      update: {},
      create: org,
    })
  }

  // Get all existing activities to create events for them
  const activities = await prisma.activity.findMany({
    where: { isActive: true },
    select: { id: true, slug: true, title: true }
  })

  console.log(`📅 Creating events for ${activities.length} activities...`)

  // Create events for each activity
  const eventTypes = [
    { 
      titleSuffix: 'Workshop', 
      description: 'Hands-on interactive workshop session',
      time: '10:00 AM'
    },
    { 
      titleSuffix: 'Class', 
      description: 'Regular scheduled class session',
      time: '2:00 PM'
    },
    { 
      titleSuffix: 'Special Event', 
      description: 'Special themed event with unique activities',
      time: '11:00 AM'
    },
    { 
      titleSuffix: 'Open Play', 
      description: 'Drop-in open play session',
      time: '9:30 AM'
    }
  ]

  // Helper function to generate future dates
  function getFutureDates(count: number): Date[] {
    const dates = []
    const today = new Date()
    
    for (let i = 1; i <= count; i++) {
      const futureDate = new Date(today)
      futureDate.setDate(today.getDate() + (i * 7)) // Weekly intervals
      dates.push(futureDate)
    }
    
    return dates
  }

  // Create 2-4 events per activity
  for (const activity of activities) {
    const numEvents = Math.floor(Math.random() * 3) + 2 // 2-4 events
    const futureDates = getFutureDates(8) // Get 8 future dates to choose from
    const selectedDates = futureDates
      .sort(() => 0.5 - Math.random()) // Shuffle
      .slice(0, numEvents) // Take the first numEvents
      .sort((a, b) => a.getTime() - b.getTime()) // Sort chronologically

    for (let i = 0; i < selectedDates.length; i++) {
      const eventType = eventTypes[i % eventTypes.length]
      const date = selectedDates[i]
      
      // Create unique slug for event
      const eventSlug = `${activity.slug}-${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
      
      // Some events have custom titles, others use activity title
      const hasCustomTitle = Math.random() > 0.3 // 70% chance of custom title
      const eventTitle = hasCustomTitle ? `${activity.title} ${eventType.titleSuffix}` : null
      
      // Some events have additional notes
      const hasNotes = Math.random() > 0.6 // 40% chance of notes
      const notes = hasNotes ? [
        'Please arrive 15 minutes early for check-in',
        'Bring a water bottle and comfortable shoes',
        'Materials provided - just bring your enthusiasm!',
        'Limited spots available - register early',
        'Perfect for beginners and experienced participants'
      ][Math.floor(Math.random() * 5)] : null

      await prisma.event.upsert({
        where: { slug: eventSlug },
        update: {},
        create: {
          activityId: activity.id,
          slug: eventSlug,
          date: date,
          time: eventType.time,
          title: eventTitle,
          description: eventType.description,
          cancelled: false,
          notes: notes
        }
      })
    }
  }

  console.log(`✅ Created events for all activities!`)
  console.log('✅ Database seeded successfully!')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })