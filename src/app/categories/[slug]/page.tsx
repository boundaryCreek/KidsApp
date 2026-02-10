import { notFound } from 'next/navigation';
import Link from 'next/link';
import BaseLayout from '../../../components/BaseLayout/BaseLayout';
import LocationCard from '../../../components/LocationCard/LocationCard';
import ActivityCard from '../../../components/ActivityCard/ActivityCard';
import CategoryHeader from '../../../components/CategoryHeader/CategoryHeader';
import SectionHeader from '../../../components/SectionHeader/SectionHeader';
import EmptyState from '../../../components/EmptyState/EmptyState';
import { prisma } from '../../../lib/prisma';
import { CategoryDetails } from '../../../types';
import { ArrowLeft, MapPin, Activity } from 'lucide-react';
import { backLinkStyles, sectionStyles, gridStyles } from './page.styles';

export default async function CategoryDetailsPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  
  const category = await prisma.category.findFirst({
    where: {
      slug: slug,
    },
    include: {
      locations: {
        where: {
          isActive: true,
        },
        include: {
          city: true,
          organization: true,
          _count: {
            select: {
              activities: true,
              reviews: true,
            },
          },
        },
        orderBy: {
          name: 'asc',
        },
      },
      activities: {
        where: {
          isActive: true,
        },
        include: {
          location: {
            include: {
              city: true,
              organization: true,
            },
          },
          ageGroups: true,
          _count: {
            select: {
              favorites: true,
              reviews: true,
            },
          },
        },
        orderBy: {
          title: 'asc',
        },
      },
      _count: {
        select: {
          locations: true,
          activities: true,
        },
      },
    },
  });

  if (!category) {
    notFound();
  }

  return (
    <BaseLayout>
      <div style={{ padding: 'var(--space-6)' }}>
        <Link href="/categories" style={backLinkStyles}>
          <ArrowLeft size={18} />
          Back to Categories
        </Link>
        
        <CategoryHeader category={category} />

        {/* Locations Section */}
        {category.locations.length > 0 && (
          <section style={sectionStyles}>
            <SectionHeader 
              icon={<MapPin size={24} />} 
              title="Locations" 
              count={category._count.locations}
            />
            <div style={gridStyles}>
              {category.locations.map((location: any) => (
                <LocationCard
                  key={location.id}
                  id={location.id}
                  name={location.name}
                  slug={location.slug}
                  type={location.type}
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
            <SectionHeader 
              icon={<Activity size={24} />} 
              title="Activities" 
              count={category._count.activities}
            />
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
          </section>
        )}

        {category.locations.length === 0 && category.activities.length === 0 && (
          <EmptyState
            icon={<Activity size={64} color="var(--color-neutral-400)" />}
            title="No locations or activities yet"
            description="This category doesn't have any locations or activities listed yet."
          />
        )}
      </div>
    </BaseLayout>
  );
}