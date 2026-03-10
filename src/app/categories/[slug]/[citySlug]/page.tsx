import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';
import BaseLayout from '../../../../components/BaseLayout/BaseLayout';
import LocationCard from '../../../../components/LocationCard/LocationCard';
import Breadcrumb from '../../../../components/Breadcrumb/Breadcrumb';
import EmptyState from '../../../../components/EmptyState/EmptyState';
import { prisma } from '../../../../lib/prisma';
import { generatePageMetadata } from '../../../../lib/metadata';
import * as LucideIcons from 'lucide-react';
import { MapPin } from 'lucide-react';

const DEFAULT_RADIUS_MILES = 10;

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

interface PageProps {
  params: Promise<{ slug: string; citySlug: string }>;
  searchParams: Promise<{ radius?: string }>;
}

export async function generateMetadata({ params, searchParams }: PageProps): Promise<Metadata> {
  const { slug, citySlug } = await params;

  const [category, city] = await Promise.all([
    prisma.category.findFirst({ where: { slug } }),
    prisma.city.findFirst({ where: { slug: citySlug } }),
  ]);

  if (!category || !city) return { title: 'Not Found | Kids App' };

  return generatePageMetadata({
    title: `${category.name} near ${city.name}`,
    description: `Browse ${category.name.toLowerCase()} near ${city.name}. Find the best spots for kids and families in the area.`,
    url: `/categories/${slug}/${citySlug}`,
  });
}

export default async function CategoryCityPage({ params, searchParams }: PageProps) {
  const { slug, citySlug } = await params;
  const { radius: radiusParam } = await searchParams;
  const radius = radiusParam ? Math.min(parseInt(radiusParam, 10) || DEFAULT_RADIUS_MILES, 100) : DEFAULT_RADIUS_MILES;

  const [category, city] = await Promise.all([
    prisma.category.findFirst({
      where: { slug },
      select: { id: true, name: true, slug: true, icon: true, color: true, description: true },
    }),
    prisma.city.findFirst({
      where: { slug: citySlug },
      select: { id: true, name: true, slug: true, latitude: true, longitude: true },
    }),
  ]);

  if (!category || !city) notFound();

  // Fetch all locations for this category (with coordinates for distance filtering)
  const allLocations = await prisma.location.findMany({
    where: {
      isActive: true,
      categories: { some: { id: category.id } },
    },
    select: {
      id: true,
      name: true,
      slug: true,
      description: true,
      address: true,
      latitude: true,
      longitude: true,
      city: { select: { id: true, name: true, slug: true } },
      organization: { select: { id: true, name: true, slug: true } },
      _count: { select: { activities: true, reviews: true } },
    },
    orderBy: { name: 'asc' },
  });

  // Filter by distance if the city has coordinates
  const locations =
    city.latitude != null && city.longitude != null
      ? allLocations.filter((loc) => {
          if (loc.latitude == null || loc.longitude == null) return false;
          return haversineDistance(city.latitude!, city.longitude!, loc.latitude, loc.longitude) <= radius;
        })
      : allLocations;

  // Sort by distance when we have city coordinates
  const locationsWithDistance =
    city.latitude != null && city.longitude != null
      ? locations
          .map((loc) => ({
            ...loc,
            distance:
              loc.latitude != null && loc.longitude != null
                ? haversineDistance(city.latitude!, city.longitude!, loc.latitude, loc.longitude)
                : null,
          }))
          .sort((a, b) => (a.distance ?? Infinity) - (b.distance ?? Infinity))
      : locations.map((loc) => ({ ...loc, distance: null }));

  const IconComponent = category.icon.startsWith('/')
    ? null
    : (LucideIcons as any)[category.icon] ?? null;

  const RADIUS_OPTIONS = [5, 10, 25, 50];

  return (
    <BaseLayout>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-8)' }}>
        <Breadcrumb
          items={[
            { href: '/', label: 'Home' },
            { href: '/categories', label: 'Categories' },
            { href: `/categories/${category.slug}`, label: category.name },
          ]}
          currentPage={city.name}
        />

        {/* Page Header */}
        <div
          style={{
            position: 'relative',
            padding: 'var(--space-10) var(--space-8)',
            borderRadius: 'var(--radius-2xl)',
            background: `linear-gradient(135deg, ${category.color}12 0%, ${category.color}06 50%, transparent 100%)`,
            border: `1px solid ${category.color}30`,
            overflow: 'hidden',
          }}
        >
          {/* Accent bar */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '4px',
              height: '100%',
              backgroundColor: category.color,
              borderRadius: 'var(--radius-2xl) 0 0 var(--radius-2xl)',
            }}
          />

          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-6)' }}>
            {/* Icon */}
            <div
              style={{
                flexShrink: 0,
                width: '72px',
                height: '72px',
                borderRadius: 'var(--radius-xl)',
                backgroundColor: `${category.color}18`,
                border: `1px solid ${category.color}30`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {category.icon.startsWith('/') ? (
                <img src={category.icon} alt={category.name} style={{ width: '36px', height: '36px', objectFit: 'contain' }} />
              ) : IconComponent ? (
                <IconComponent size={36} color={category.color} strokeWidth={1.75} />
              ) : (
                <span style={{ fontSize: 'var(--font-size-3xl)', color: category.color }}>{category.icon}</span>
              )}
            </div>

            <div style={{ flex: 1, minWidth: 0 }}>
              <p
                style={{
                  fontSize: 'var(--font-size-xs)',
                  fontWeight: 'var(--font-weight-semibold)',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: 'var(--color-neutral-500)',
                  marginBottom: 'var(--space-1)',
                }}
              >
                {category.name}
              </p>
              <h1
                style={{
                  fontSize: 'var(--font-size-3xl)',
                  fontWeight: 'var(--font-weight-bold)',
                  lineHeight: 'var(--line-height-tight)',
                  color: category.color,
                  marginBottom: 'var(--space-2)',
                }}
              >
                {category.name} near {city.name}
              </h1>
              <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-neutral-500)', margin: 0 }}>
                {locations.length} location{locations.length !== 1 ? 's' : ''} within {radius} miles
              </p>
            </div>
          </div>
        </div>

        {/* Radius switcher */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', flexWrap: 'wrap' }}>
          <span style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-neutral-500)' }}>
            Search radius:
          </span>
          {RADIUS_OPTIONS.map((r) => (
            <Link
              key={r}
              href={`/categories/${category.slug}/${city.slug}?radius=${r}`}
              style={{
                padding: 'var(--space-1) var(--space-3)',
                borderRadius: 'var(--radius-full)',
                fontSize: 'var(--font-size-sm)',
                fontWeight: 'var(--font-weight-medium)',
                textDecoration: 'none',
                border: `1px solid ${r === radius ? category.color : 'var(--color-neutral-300)'}`,
                backgroundColor: r === radius ? `${category.color}15` : 'transparent',
                color: r === radius ? category.color : 'var(--color-neutral-600)',
              }}
            >
              {r} mi
            </Link>
          ))}
        </div>

        {/* Location grid */}
        {locationsWithDistance.length > 0 ? (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
              gap: 'var(--space-6)',
            }}
          >
            {locationsWithDistance.map((location) => (
              <div key={location.id} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-1)' }}>
                <LocationCard
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
                {location.distance != null && (
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 'var(--space-1)',
                      fontSize: 'var(--font-size-xs)',
                      color: 'var(--color-neutral-500)',
                      paddingLeft: 'var(--space-1)',
                    }}
                  >
                    <MapPin size={11} />
                    {location.distance.toFixed(1)} miles from {city.name}
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <EmptyState
            icon={<MapPin size={48} color="var(--color-neutral-400)" />}
            title={`No ${category.name.toLowerCase()} within ${radius} miles`}
            description={`Try expanding the search radius or browse all ${category.name.toLowerCase()}.`}
          />
        )}

        {/* Back link */}
        <div style={{ paddingTop: 'var(--space-4)', borderTop: '1px solid var(--color-neutral-200)' }}>
          <Link
            href={`/categories/${category.slug}`}
            style={{
              fontSize: 'var(--font-size-sm)',
              color: 'var(--color-primary-600)',
              textDecoration: 'none',
              fontWeight: 'var(--font-weight-medium)',
            }}
          >
            ← Browse all {category.name}
          </Link>
        </div>
      </div>
    </BaseLayout>
  );
}
