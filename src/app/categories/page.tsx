'use client'

import { useState, useEffect } from 'react'
import BaseLayout from '../../components/BaseLayout/BaseLayout'
import Link from 'next/link'
import { Tag, Activity, MapPin, Loader } from 'lucide-react'
import {
  categoriesContainerStyles,
  categoriesHeaderStyles,
  categoriesIconStyles,
  categoriesTitleStyles,
  categoriesDescriptionStyles,
  categoriesGridStyles,
  categoryCardStyles,
  categoryCardHoverStyles,
  categoryIconStyles,
  categoryNameStyles,
  categoryDescriptionStyles,
  categoryStatsStyles,
  categoryStatsItemStyles,
  loadingContainerStyles,
  errorContainerStyles,
  errorMessageStyles
} from './page.styles'

interface Category {
  id: string
  name: string
  slug: string
  description: string | null
  icon: string
  color: string
  _count: {
    activities: number
    locations: number
  }
}

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)

  useEffect(() => {
    fetchCategories()
  }, [])

  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/categories')
      if (!response.ok) {
        throw new Error('Failed to fetch categories')
      }
      const data = await response.json()
      setCategories(data)
    } catch (err) {
      setError('Failed to load categories. Please try again later.')
      console.error('Error fetching categories:', err)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <BaseLayout>
        <div style={loadingContainerStyles}>
          <Loader size={48} color="var(--color-primary-600)" className="animate-spin" />
          <p>Loading categories...</p>
        </div>
      </BaseLayout>
    )
  }

  if (error) {
    return (
      <BaseLayout>
        <div style={errorContainerStyles}>
          <p style={errorMessageStyles}>{error}</p>
          <button 
            onClick={fetchCategories}
            style={{
              backgroundColor: 'var(--color-primary-600)',
              color: 'var(--color-neutral-50)',
              border: 'none',
              padding: 'var(--space-3) var(--space-6)',
              borderRadius: 'var(--radius-lg)',
              cursor: 'pointer',
              fontSize: 'var(--font-size-base)',
              fontWeight: 'var(--font-weight-medium)'
            }}
          >
            Try Again
          </button>
        </div>
      </BaseLayout>
    )
  }

  return (
    <BaseLayout>
      <div style={categoriesContainerStyles}>
        <div style={categoriesHeaderStyles}>
          <div style={categoriesIconStyles}>
            <Tag size={64} color="var(--color-primary-600)" />
          </div>
          <h1 style={categoriesTitleStyles}>
            Minnesota Activity Categories
          </h1>
          <p style={categoriesDescriptionStyles}>
            Discover amazing kids activities across Minnesota, organized by type and interest.
          </p>
        </div>
        
        <div style={categoriesGridStyles}>
          {categories.map((category) => (
            <Link 
              key={category.id} 
              href={`/categories/${category.slug}`}
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <div 
                style={{
                  ...categoryCardStyles,
                  ...(hoveredCard === category.id ? categoryCardHoverStyles : {}),
                  borderColor: category.color
                }}
                onMouseEnter={() => setHoveredCard(category.id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
              <div style={categoryIconStyles}>
                <span style={{ fontSize: 'var(--font-size-5xl)', color: category.color }}>
                  {category.icon}
                </span>
              </div>
              <h3 style={{
                ...categoryNameStyles,
                color: category.color
              }}>
                {category.name}
              </h3>
              {category.description && (
                <p style={categoryDescriptionStyles}>
                  {category.description}
                </p>
              )}
              <div style={categoryStatsStyles}>
                <div style={categoryStatsItemStyles}>
                  <Activity size={16} color="var(--color-muted)" />
                  <span>{category._count.activities} activities</span>
                </div>
                <div style={categoryStatsItemStyles}>
                  <MapPin size={16} color="var(--color-muted)" />
                  <span>{category._count.locations} locations</span>
                </div>
              </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </BaseLayout>
  )
}