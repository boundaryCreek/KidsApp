import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';
import BaseLayout from '../../../components/BaseLayout/BaseLayout';
import ActivityCard from '../../../components/ActivityCard/ActivityCard';
import CategoryHeader from '../../../components/CategoryHeader/CategoryHeader';
import SectionHeader from '../../../components/SectionHeader/SectionHeader';
import EmptyState from '../../../components/EmptyState/EmptyState';
import CategoryLocationsFilter from '../../../components/CategoryLocationsFilter/CategoryLocationsFilter';
import { prisma } from '../../../lib/prisma';
import { generatePageMetadata } from '../../../lib/metadata';
import { ArrowLeft, MapPin, Activity } from 'lucide-react';
import { backLinkStyles, sectionStyles, gridStyles } from './page.styles';

const ACTIVITY_LIMIT = 20;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const category = await prisma.category.findFirst({ where: { slug } });

  if (!category) return { title: 'Category Not Found | Kids App' };

  return generatePageMetadata({
    title: category.name,
    description:
      category.description ||
      `Browse kids activities and locations in the ${category.name} category.`,
    url: `/categories/${slug}`,
  });
}

export default async function CategoryDetailsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const [category, cities] = await Promise.all([
    prisma.category.findFirst({
      where: { slug },
      include: {
        locations: {
          where: { isActive: true },
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
        },
        activities: {
          where: { isActive: true },
          include: {
            location: { include: { city: true, organization: true } },
            ageGroups: true,
            _count: { select: { favorites: true, reviews: true } },
          },
          orderBy: { title: 'asc' },
          take: ACTIVITY_LIMIT,
        },
        _count: {
          select: { locations: true, activities: true },
        },
      },
    }),
    prisma.city.findMany({
      select: { id: true, name: true, slug: true, latitude: true, longitude: true },
      where: { isActive: true },
      orderBy: { name: 'asc' },
    }),
  ]);

  if (!category) notFound();

  const hasMoreActivities = category._count.activities > ACTIVITY_LIMIT;

  return (
    <BaseLayout>
      <div style={{ padding: '0 var(--space-6) var(--space-6)' }}>
        <Link href="/categories" style={backLinkStyles}>
          <ArrowLeft size={18} />
          Back to Categories
        </Link>

        <CategoryHeader category={category} />

        {/* Locations Section */}
        <section style={sectionStyles}>
          {category.locations.length > 0 ? (
            <CategoryLocationsFilter locations={category.locations} cities={cities} categorySlug={category.slug} />
          ) : (
            <EmptyState
              icon={<MapPin size={48} color="var(--color-neutral-400)" />}
              title="No locations yet"
              description={`No locations are listed under ${category.name} yet.`}
            />
          )}
        </section>

        {/* Activities Section */}
        <section style={sectionStyles}>
          <SectionHeader
            icon={<Activity size={24} />}
            title="Activities"
            count={category._count.activities}
          />
          {category.activities.length > 0 ? (
            <>
              <div style={gridStyles}>
                {category.activities.map((activity: any) => (
                  <ActivityCard
                    key={activity.id}
                    id={activity.id}
                    title={activity.title}
                    slug={activity.slug}
                    description={activity.description}
                    organizer={activity.organizer}
                    costMin={activity.costMin}
                    costMax={activity.costMax}
                    costDisplay={activity.costDisplay}
                    isFree={activity.isFree}
                    imageUrl={activity.imageUrl}
                    location={activity.location}
                    ageGroups={activity.ageGroups}
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
              {hasMoreActivities && (
                <div style={{ marginTop: 'var(--space-6)', textAlign: 'center' }}>
                  <Link
                    href={`/activities?category=${category.slug}`}
                    style={{
                      color: 'var(--color-primary-600)',
                      fontWeight: 'var(--font-weight-medium)',
                      fontSize: 'var(--font-size-sm)',
                      textDecoration: 'none',
                    }}
                  >
                    View all {category._count.activities} activities →
                  </Link>
                </div>
              )}
            </>
          ) : (
            <EmptyState
              icon={<Activity size={48} color="var(--color-neutral-400)" />}
              title="No activities yet"
              description={`No activities are listed under ${category.name} yet.`}
            />
          )}
        </section>
      </div>
    </BaseLayout>
  );
}
