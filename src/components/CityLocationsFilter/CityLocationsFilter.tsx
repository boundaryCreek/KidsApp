'use client';

import { useState, useMemo } from 'react';
import { SlidersHorizontal } from 'lucide-react';
import SimpleLocationsList from '../SimpleLocationsList/SimpleLocationsList';

interface LocationItem {
  id: string;
  name: string;
  slug: string;
  description: string;
  address: string | null;
  phone?: string | null;
  email?: string | null;
  website?: string | null;
  imageUrl?: string | null;
  amenities: string[];
  capacity?: number | null;
  accessibility: string[];
  parking?: string | null;
  publicTransport?: string | null;
  operatingHours?: any;
  rating?: number | null;
  reviewCount?: number | null;
  latitude: number | null;
  longitude: number | null;
  city: { id: string; name: string; slug: string } | null;
  organization: { id: string; name: string; slug: string } | null;
  categories: { id: string; name: string; slug: string; icon: string; color: string }[];
  _count: { activities: number; reviews: number };
}

interface Props {
  locations: LocationItem[];
  cityName: string;
  cityId: string;
  cityLatitude: number | null;
  cityLongitude: number | null;
}

type FilterMode = 'city' | number;

const getRangeOptions = (cityName: string): { value: FilterMode; label: string }[] => [
  { value: 'city', label: `${cityName} Only` },
  { value: 5, label: 'Within 5 miles' },
  { value: 10, label: 'Within 10 miles' },
  { value: 25, label: 'Within 25 miles' },
  { value: 50, label: 'Within 50 miles' },
];

function haversineDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 3958.8;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

export default function CityLocationsFilter({ locations, cityName, cityId, cityLatitude, cityLongitude }: Props) {
  const [mode, setMode] = useState<FilterMode>(10);

  const filtered = useMemo(() => {
    if (mode === 'city') {
      return locations.filter((loc) => loc.city?.id === cityId);
    }
    if (cityLatitude == null || cityLongitude == null) return locations;
    return locations.filter((loc) => {
      if (loc.latitude == null || loc.longitude == null) return true;
      const dist = haversineDistance(cityLatitude, cityLongitude, loc.latitude, loc.longitude);
      return dist <= (mode as number);
    });
  }, [locations, mode, cityId, cityLatitude, cityLongitude]);

  return (
    <div>
      {/* Filter Bar */}
      <div
        style={{
          display: 'flex',
          gap: 'var(--space-3)',
          alignItems: 'center',
          flexWrap: 'wrap',
          marginBottom: 'var(--space-6)',
        }}
      >
        <SlidersHorizontal size={16} color="var(--color-neutral-500)" />

        <div style={{ display: 'flex', gap: 'var(--space-2)', flexWrap: 'wrap' }}>
          {getRangeOptions(cityName).map((opt) => {
            const active = mode === opt.value;
            return (
              <button
                key={String(opt.value)}
                onClick={() => setMode(opt.value)}
                disabled={typeof opt.value === 'number' && (cityLatitude == null || cityLongitude == null)}
                style={{
                  padding: 'var(--space-1) var(--space-3)',
                  borderRadius: 'var(--radius-md)',
                  border: `1px solid ${active ? 'var(--color-primary-400)' : 'var(--color-neutral-300)'}`,
                  fontSize: 'var(--font-size-sm)',
                  fontWeight: active ? 'var(--font-weight-medium)' : 'var(--font-weight-normal)',
                  backgroundColor: active ? 'var(--color-primary-100)' : 'var(--color-surface)',
                  color: active ? 'var(--color-primary-700)' : 'var(--color-neutral-600)',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                }}
              >
                {opt.label}
              </button>
            );
          })}
        </div>

      </div>

      {filtered.length > 0 ? (
        <SimpleLocationsList locations={filtered} cityName={cityName} />
      ) : (
        <div
          style={{
            textAlign: 'center',
            padding: 'var(--space-12)',
            color: 'var(--color-neutral-500)',
            fontSize: 'var(--font-size-base)',
          }}
        >
          No locations found within that range. Try a larger distance.
        </div>
      )}
    </div>
  );
}
