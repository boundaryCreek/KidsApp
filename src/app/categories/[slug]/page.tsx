'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import BaseLayout from '../../../components/BaseLayout/BaseLayout'
import LocationCard from '../../../components/LocationCard/LocationCard'
import ActivityCard from '../../../components/ActivityCard/ActivityCard'
import Link from 'next/link'
import { ArrowLeft, MapPin, Activity, Users, Star, Clock, DollarSign, Loader } from 'lucide-react'
import {
  categoryDetailsContainerStyles,
  backLinkStyles,
  categoryHeaderStyles,
  categoryIconStyles,
  categoryTitleStyles,
  categoryDescriptionStyles,
  categoryStatsStyles,
  statItemStyles,
  sectionStyles,
  sectionTitleStyles,
  gridStyles,
  cardStyles,
  cardHeaderStyles,
  cardTitleStyles,
  cardMetaStyles,
  cardDescriptionStyles,
  locationCardStyles,
  activityCardStyles,
  loadingContainerStyles,
  errorContainerStyles
} from './page.styles'

interface CategoryDetails {
  id: string
  name: string
  slug: string
  description: string | null
  icon: string
  color: string
  locations: Array<{
    id: string
    name: string
    slug: string
    description: string
    type: string
    address: string | null
    city: {
      name: string
    } | null
    organization: {
      name: string
    }
    _count: {
      activities: number
      reviews: number
    }
  }>
  activities: Array<{
    id: string
    title: string
    slug: string
    description: string
    organizer: string
    costDisplay: string | null
    isFree: boolean
    location: {
      name: string
      city: {
        name: string
      } | null
      organization: {
        name: string
      }
    } | null
    ageGroup: {
      name: string
    }
    _count: {
      favorites: number
      reviews: number
    }
  }>
  _count: {
    locations: number
    activities: number
  }
}

export default function CategoryDetailsPage() {
  const params = useParams()
  const slug = params.slug as string
  
  const [category, setCategory] = useState<CategoryDetails | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (slug) {
      fetchCategoryDetails()
    }
  }, [slug])

  const fetchCategoryDetails = async () => {
    try {
      const response = await fetch(`/api/categories/${slug}`)
      if (!response.ok) {
        throw new Error('Failed to fetch category details')
      }
      const data = await response.json()
      setCategory(data)
    } catch (err) {
      setError('Failed to load category details. Please try again later.')
      console.error('Error fetching category details:', err)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <BaseLayout>
        <div style={loadingContainerStyles}>
          <Loader size={48} color="var(--color-primary-600)" className="animate-spin" />
          <p>Loading category details...</p>
        </div>
      </BaseLayout>
    )
  }

  if (error || !category) {
    return (
      <BaseLayout>
        <div style={errorContainerStyles}>
          <p>{error || 'Category not found'}</p>
          <Link href="/categories" style={backLinkStyles}>
            <ArrowLeft size={18} />
            Back to Categories
          </Link>
        </div>
      </BaseLayout>
    )
  }

  return (
    <BaseLayout>
      <div style={categoryDetailsContainerStyles}>
        <Link href="/categories" style={backLinkStyles}>
          <ArrowLeft size={18} />
          Back to Categories
        </Link>
        
        <div style={categoryHeaderStyles}>
          <div style={categoryIconStyles}>
            <span style={{ fontSize: 'var(--font-size-6xl)', color: category.color }}>
              {category.icon}
            </span>
          </div>
          <h1 style={{
            ...categoryTitleStyles,
            color: category.color
          }}>
            {category.name}
          </h1>
          {category.description && (
            <p style={categoryDescriptionStyles}>
              {category.description}
            </p>
          )}
          
          <div style={categoryStatsStyles}>
            <div style={statItemStyles}>
              <MapPin size={20} color="var(--color-muted)" />
              <span>{category._count.locations} Locations</span>
            </div>
            <div style={statItemStyles}>
              <Activity size={20} color="var(--color-muted)" />
              <span>{category._count.activities} Activities</span>
            </div>
          </div>
        </div>

        {/* Locations Section */}
        {category.locations.length > 0 && (
          <section style={sectionStyles}>
            <h2 style={sectionTitleStyles}>
              <MapPin size={24} />
              Locations ({category._count.locations})
            </h2>
            <div style={gridStyles}>
              {category.locations.map((location) => (
                <LocationCard
                  key={location.id}
                  id={location.id}
                  name={location.name}
                  slug={location.slug}
                  type={location.type as any}
                  description={location.description}
                  address={location.address}
                  city={location.city}
                  organization={location.organization}
                  _count={location._count}
                  showCategories={false}
                  showStats={true}
                  showTypeTag={false}
                />
              ))}
            </div>
          </section>
        )}

        {/* Activities Section */}
        {category.activities.length > 0 && (
          <section style={sectionStyles}>
            <h2 style={sectionTitleStyles}>
              <Activity size={24} />
              Activities ({category._count.activities})
            </h2>
            <div style={gridStyles}>
              {category.activities.map((activity) => (
                <ActivityCard
                  key={activity.id}
                  id={activity.id}
                  title={activity.title}
                  slug={activity.slug}
                  description={activity.description}
                  organizer={activity.organizer}
                  costDisplay={activity.costDisplay}
                  isFree={activity.isFree}
                  location={activity.location}
                  ageGroup={activity.ageGroup}
                  _count={activity._count}
                  showLocation={true}
                  showCategories={false}
                  showStats={true}
                  showAgeGroup={true}
                  showOrganizer={true}
                  showCost={true}
                />
              ))}
            </div>
          </section>
        )}

        {category.locations.length === 0 && category.activities.length === 0 && (
          <div style={{
            textAlign: 'center',
            padding: 'var(--space-12)',
            color: 'var(--color-muted)'
          }}>
            <Activity size={64} color="var(--color-muted)" />
            <h3>No locations or activities yet</h3>
            <p>This category doesn't have any locations or activities listed yet.</p>
          </div>
        )}
      </div>
    </BaseLayout>
  )
}