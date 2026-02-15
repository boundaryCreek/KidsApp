'use client';

import { useState, useMemo } from 'react';
import { ArrowUpDown } from 'lucide-react';
import LocationCard from '../LocationCard/LocationCard';
import CategoryFilter from '../CategoryFilter/CategoryFilter';
import { Category } from '../../types';

type SortOption = 'name-asc' | 'name-desc' | 'activities-desc' | 'rating-desc';

interface City {
  id: string;
  name: string;
  slug: string;
}

interface Organization {
  id: string;
  name: string;
  slug: string;
}

interface Location {
  id: string;
  name: string;
  slug: string;
  description: string;
  address?: string | null;
  phone?: string | null;
  email?: string | null;
  website?: string | null;
  imageUrl?: string | null;
  amenities: string[];
  capacity?: number | null;
  accessibility: string[];
  parking?: string | null;
  publicTransport?: string | null;
  operatingHours?: any; // JsonValue from Prisma
  rating?: number | null;
  reviewCount?: number | null;
  city?: City | null;
  organization?: Organization | null;
  categories: Category[];
  _count: {
    activities: number;
    reviews: number;
  };
}

interface FilterableLocationsGridProps {
  locations: Location[];
  cityName: string;
}

export default function FilterableLocationsGrid({
  locations,
  cityName,
}: FilterableLocationsGridProps) {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<SortOption>('name-asc');

  // Extract unique categories from all locations
  const allCategories = useMemo(() => {
    const categoryMap = new Map<string, Category>();
    locations.forEach((location) => {
      location.categories.forEach((category) => {
        if (!categoryMap.has(category.id)) {
          categoryMap.set(category.id, category);
        }
      });
    });
    return Array.from(categoryMap.values()).sort((a, b) =>
      a.name.localeCompare(b.name)
    );
  }, [locations]);

  // Filter and sort locations
  const filteredAndSortedLocations = useMemo(() => {
    // First, filter by categories
    let filtered = selectedCategories.length === 0
      ? [...locations]
      : locations.filter((location) =>
          location.categories.some((category) =>
            selectedCategories.includes(category.id)
          )
        );

    // Then, sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name-asc':
          return a.name.localeCompare(b.name);
        case 'name-desc':
          return b.name.localeCompare(a.name);
        case 'activities-desc':
          return b._count.activities - a._count.activities;
        case 'rating-desc':
          return (b.rating || 0) - (a.rating || 0);
        default:
          return 0;
      }
    });

    return filtered;
  }, [locations, selectedCategories, sortBy]);

  const handleCategoryToggle = (categoryId: string) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const handleClearFilters = () => {
    setSelectedCategories([]);
  };

  const sortOptions: { value: SortOption; label: string }[] = [
    { value: 'name-asc', label: 'Name (A-Z)' },
    { value: 'name-desc', label: 'Name (Z-A)' },
    { value: 'activities-desc', label: 'Most Activities' },
    { value: 'rating-desc', label: 'Highest Rated' },
  ];

  return (
    <>
      {allCategories.length > 0 && (
        <CategoryFilter
          categories={allCategories}
          selectedCategories={selectedCategories}
          onCategoryToggle={handleCategoryToggle}
          onClearFilters={handleClearFilters}
        />
      )}

      {/* Sort Controls */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 'var(--space-6)',
          padding: 'var(--space-4)',
          backgroundColor: 'var(--color-surface)',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--color-neutral-200)',
          boxShadow: 'var(--shadow-sm)',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--space-3)',
          }}
        >
          <ArrowUpDown size={18} color="var(--color-neutral-600)" />
          <span
            style={{
              fontSize: 'var(--font-size-sm)',
              fontWeight: 'var(--font-weight-medium)',
              color: 'var(--color-neutral-700)',
            }}
          >
            Sort by:
          </span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortOption)}
            style={{
              padding: 'var(--space-2) var(--space-3)',
              fontSize: 'var(--font-size-sm)',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--color-neutral-300)',
              backgroundColor: 'var(--color-surface)',
              color: 'var(--color-neutral-900)',
              cursor: 'pointer',
              fontWeight: 'var(--font-weight-medium)',
            }}
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        <div
          style={{
            fontSize: 'var(--font-size-sm)',
            color: 'var(--color-neutral-600)',
          }}
        >
          {filteredAndSortedLocations.length} location{filteredAndSortedLocations.length !== 1 ? 's' : ''}
        </div>
      </div>

      {filteredAndSortedLocations.length > 0 ? (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: 'var(--space-6)',
          }}
        >
          {filteredAndSortedLocations.map((location) => (
            <LocationCard
              key={location.id}
              id={location.id}
              name={location.name}
              slug={location.slug}
              description={location.description}
              address={location.address}
              city={location.city}
              organization={location.organization}
              categories={location.categories}
              rating={location.rating}
              reviewCount={location.reviewCount ?? undefined}
              _count={location._count}
              showCategories={true}
              showStats={true}
            />
          ))}
        </div>
      ) : (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '300px',
            textAlign: 'center',
            padding: 'var(--space-12)',
            background: 'var(--color-surface)',
            borderRadius: 'var(--radius-2xl)',
            border: '2px dashed var(--color-neutral-300)',
          }}
        >
          <p
            style={{
              fontSize: 'var(--font-size-xl)',
              color: 'var(--color-neutral-600)',
              marginBottom: 'var(--space-4)',
              fontWeight: 'var(--font-weight-medium)',
            }}
          >
            No locations match your filters
          </p>
          <button
            onClick={handleClearFilters}
            style={{
              padding: 'var(--space-3) var(--space-6)',
              backgroundColor: 'var(--color-primary-600)',
              color: 'var(--color-neutral-50)',
              border: 'none',
              borderRadius: 'var(--radius-lg)',
              fontSize: 'var(--font-size-base)',
              fontWeight: 'var(--font-weight-medium)',
              cursor: 'pointer',
              boxShadow: 'var(--shadow-md)',
              transition: 'var(--transition-all)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--color-primary-700)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--color-primary-600)';
            }}
          >
            Clear Filters
          </button>
        </div>
      )}
    </>
  );
}
