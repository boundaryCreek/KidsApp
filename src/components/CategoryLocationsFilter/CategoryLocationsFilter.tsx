'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { MapPin, SlidersHorizontal } from 'lucide-react';
import LocationCard from '../LocationCard/LocationCard';

interface City {
  id: string;
  name: string;
  slug: string;
  latitude: number | null;
  longitude: number | null;
}

interface LocationItem {
  id: string;
  name: string;
  slug: string;
  description: string;
  address: string | null;
  latitude: number | null;
  longitude: number | null;
  city: { id: string; name: string; slug: string } | null;
  organization: { id: string; name: string; slug: string } | null;
  _count: { activities: number; reviews: number };
}

interface Props {
  locations: LocationItem[];
  cities: City[];
  categorySlug: string;
}

const RANGE_OPTIONS = [
  { value: 0, label: 'Any distance' },
  { value: 5, label: 'Within 5 miles' },
  { value: 10, label: 'Within 10 miles' },
  { value: 25, label: 'Within 25 miles' },
  { value: 50, label: 'Within 50 miles' },
  { value: 100, label: 'Within 100 miles' },
];

function haversineDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 3958.8; // Earth radius in miles
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

const selectStyle = {
  padding: 'var(--space-2) var(--space-3)',
  borderRadius: 'var(--radius-md)',
  border: '1px solid var(--color-neutral-300)',
  fontSize: 'var(--font-size-sm)',
  backgroundColor: 'var(--color-surface)',
  color: 'var(--color-text)',
  cursor: 'pointer',
} as const;

export default function CategoryLocationsFilter({ locations, cities, categorySlug }: Props) {
  const [selectedCityId, setSelectedCityId] = useState<string>('');
  const [maxRange, setMaxRange] = useState<number>(0);

  const selectedCity = cities.find((c) => c.id === selectedCityId) ?? null;
  const isFiltering = !!selectedCityId;

  const filtered = useMemo(() => {
    if (!selectedCity || !selectedCity.latitude || !selectedCity.longitude || maxRange === 0) {
      return locations;
    }
    return locations.filter((loc) => {
      if (loc.latitude == null || loc.longitude == null) return true;
      const dist = haversineDistance(
        selectedCity.latitude!,
        selectedCity.longitude!,
        loc.latitude,
        loc.longitude
      );
      return dist <= maxRange;
    });
  }, [locations, selectedCity, maxRange]);

  const handleClearFilters = () => {
    setSelectedCityId('');
    setMaxRange(0);
  };

  return (
    <div>
      {/* Filter Bar */}
      <div
        style={{
          display: 'flex',
          gap: 'var(--space-3)',
          alignItems: 'center',
          flexWrap: 'wrap',
          padding: 'var(--space-4)',
          backgroundColor: 'var(--color-neutral-50)',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--color-neutral-200)',
          marginBottom: 'var(--space-6)',
        }}
      >
        <SlidersHorizontal size={16} color="var(--color-neutral-500)" />

        {/* City selector */}
        <select
          value={selectedCityId}
          onChange={(e) => {
            setSelectedCityId(e.target.value);
            if (!e.target.value) setMaxRange(0);
          }}
          style={selectStyle}
          aria-label="Filter by city"
        >
          <option value="">All cities</option>
          {cities.map((city) => (
            <option key={city.id} value={city.id}>
              {city.name}
            </option>
          ))}
        </select>

        {/* Range selector — only active once a city is chosen */}
        <select
          value={maxRange}
          onChange={(e) => setMaxRange(Number(e.target.value))}
          disabled={!isFiltering}
          style={{
            ...selectStyle,
            backgroundColor: isFiltering ? 'var(--color-surface)' : 'var(--color-neutral-100)',
            color: isFiltering ? 'var(--color-text)' : 'var(--color-neutral-400)',
            cursor: isFiltering ? 'pointer' : 'not-allowed',
          }}
          aria-label="Filter by max distance"
        >
          {RANGE_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>

        {/* Result count */}
        <span
          style={{
            fontSize: 'var(--font-size-sm)',
            color: 'var(--color-neutral-500)',
            marginLeft: 'auto',
          }}
        >
          {filtered.length} of {locations.length} location{locations.length !== 1 ? 's' : ''}
        </span>

        {/* Clear */}
        {(isFiltering || maxRange > 0) && (
          <button
            onClick={handleClearFilters}
            style={{
              padding: 'var(--space-1) var(--space-3)',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--color-neutral-300)',
              fontSize: 'var(--font-size-xs)',
              backgroundColor: 'transparent',
              color: 'var(--color-neutral-600)',
              cursor: 'pointer',
            }}
          >
            Clear
          </button>
        )}

        {/* Link to dedicated city page */}
        {selectedCity && (
          <Link
            href={`/categories/${categorySlug}/${selectedCity.slug}`}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 'var(--space-1)',
              padding: 'var(--space-1) var(--space-3)',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--color-primary-300)',
              fontSize: 'var(--font-size-xs)',
              fontWeight: 'var(--font-weight-medium)',
              backgroundColor: 'var(--color-primary-50)',
              color: 'var(--color-primary-600)',
              textDecoration: 'none',
              whiteSpace: 'nowrap',
            }}
          >
            <MapPin size={11} />
            View {selectedCity.name} page
          </Link>
        )}
      </div>

      {/* Location Cards */}
      {filtered.length > 0 ? (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: 'var(--space-6)',
          }}
        >
          {filtered.map((location) => (
            <LocationCard
              key={location.id}
              id={location.id}
              name={location.name}
              slug={location.slug}
              description={location.description}
              address={location.address}
              city={location.city}
              organization={location.organization}
              _count={location._count}
              showCategories={false}
              showStats={false}
            />
          ))}
        </div>
      ) : (
        <div
          style={{
            textAlign: 'center',
            padding: 'var(--space-12)',
            color: 'var(--color-neutral-500)',
            fontSize: 'var(--font-size-base)',
          }}
        >
          No locations found within that range. Try a larger distance or a different city.
        </div>
      )}
    </div>
  );
}
