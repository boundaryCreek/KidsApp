import { notFound } from 'next/navigation';
import Link from 'next/link';
import BaseLayout from '../../../components/BaseLayout/BaseLayout';
import Breadcrumb from '../../../components/Breadcrumb/Breadcrumb';
import SectionHeader from '../../../components/SectionHeader/SectionHeader';
import CategoryList from '../../../components/CategoryList/CategoryList';
import ContactInfo from '../../../components/ContactInfo/ContactInfo';
import StatsGrid from '../../../components/StatsGrid/StatsGrid';
import { prisma } from '../../../lib/prisma';
import { ActivityDetails, formatActivityCost } from '../../../types';
import {
  MapPin, Phone, Mail, Globe, Star, Activity, Users, Building2, 
  ChevronRight, Calendar, DollarSign, Heart, MessageSquare, Clock
} from 'lucide-react';
import * as styles from './page.styles';

export default async function ActivityPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  
  const activity = await prisma.activity.findFirst({
    where: {
      slug: slug,
      isActive: true,
    },
    include: {
      location: {
        include: {
          city: true,
          organization: true,
          categories: true,
        },
      },
      ageGroup: true,
      categories: true,
      events: {
        where: {
          date: {
            gte: new Date(), // Only show future events
          },
          cancelled: false,
        },
        orderBy: {
          date: 'asc',
        },
      },
      reviews: {
        where: {
          isActive: true,
        },
        include: {
          user: {
            select: {
              name: true,
              email: true,
            },
          },
        },
        orderBy: {
          createdAt: 'desc',
        },
        take: 10,
      },
      _count: {
        select: {
          favorites: true,
          reviews: true,
        },
      },
    },
  });

  if (!activity) {
    notFound();
  }

  return (
    <BaseLayout>
      <div style={styles.pageContainer}>
        <div style={styles.container}>
            <Breadcrumb
            items={[
              { href: '/', label: 'Home' },
              ...(activity.location ? [{ href: `/locations/${activity.location.slug}`, label: activity.location.name }] : []),
            ]}
            currentPage={activity.title}
            />

          {/* Activity Header */}
          <header style={styles.activityHeader}>
            <div style={styles.activityMeta}>
              {activity.ageGroup && (
                <div style={styles.ageGroupTag}>
                  <Users size={16} />
                  {activity.ageGroup.name}
                </div>
              )}
              
              <div style={activity.isFree ? styles.costFree : styles.costPaid}>
                <DollarSign size={16} />
                {formatActivityCost(activity)}
              </div>

              {activity.featured && (
                <div style={styles.featuredBadge}>
                  <Star size={16} />
                  Featured
                </div>
              )}
            </div>

            <h1 style={styles.activityTitle}>{activity.title}</h1>
            
            <div style={styles.organizerSection}>
              <Building2 size={20} />
              <div>
                <strong>Organized by:</strong> {activity.organizer}
              </div>
            </div>

            {activity.description && (
              <p style={styles.activityDescription}>{activity.description}</p>
            )}

            <CategoryList categories={activity.categories} />
          </header>

          {/* Details Grid */}
          <div style={styles.detailsGrid}>
            {/* Location Section */}
            <section style={styles.detailsSection}>
              <SectionHeader icon={<MapPin size={20} />} title="Location Details" />
              
              <div>
                <h3 style={{ fontSize: 'var(--font-size-lg)', fontWeight: 'var(--font-weight-semibold)', marginBottom: 'var(--space-3)' }}>
                  {activity.location.name}
                </h3>

                <ContactInfo
                  address={activity.location.address}
                  phone={activity.location.phone}
                  email={activity.location.email}
                  website={activity.location.website}
                  city={activity.location.city}
                  organization={activity.location.organization}
                />
              </div>

              <Link 
                href={`/locations/${activity.location.slug}`}
                style={{
                  display: 'block',
                  marginTop: 'var(--space-6)',
                  padding: 'var(--space-3)',
                  backgroundColor: 'var(--color-primary-600)',
                  color: 'var(--color-neutral-50)',
                  textDecoration: 'none',
                  borderRadius: 'var(--radius-lg)',
                  textAlign: 'center',
                  fontWeight: 'var(--font-weight-medium)',
                  fontSize: 'var(--font-size-sm)',
                  transition: 'background-color 0.2s ease',
                }}
              >
                View All Activities at {activity.location.name}
              </Link>
            </section>

            {/* Stats & Actions Section */}
            <section style={styles.detailsSection}>
              <SectionHeader icon={<Activity size={20} />} title="Activity Stats" />
              
              <StatsGrid 
                stats={[
                  {
                    icon: <Heart size={24} color="var(--color-primary-600)" />,
                    value: activity._count.favorites,
                    label: 'Favorites'
                  },
                  {
                    icon: <MessageSquare size={24} color="var(--color-primary-600)" />,
                    value: activity._count.reviews,
                    label: 'Reviews'
                  }
                ]}
              />
            </section>
          </div>

          {/* Events Section */}
          {activity.events && activity.events.length > 0 && (
            <section style={styles.detailsSection}>
              <SectionHeader icon={<Calendar size={20} />} title="Upcoming Events" />
              
              <div style={styles.eventsContainer}>
                {activity.events.map((event) => (
                  <div key={event.id} style={styles.eventCard}>
                    <div style={styles.eventDate}>
                      <div style={styles.eventDay}>
                        {new Date(event.date).toLocaleDateString('en-US', { day: 'numeric' })}
                      </div>
                      <div style={styles.eventMonth}>
                        {new Date(event.date).toLocaleDateString('en-US', { month: 'short' })}
                      </div>
                    </div>
                    
                    <div style={styles.eventDetails}>
                      <h4 style={styles.eventTitle}>
                        {event.title || activity.title}
                      </h4>
                      
                      <div style={styles.eventMeta}>
                        <div style={styles.eventTime}>
                          <Clock size={16} />
                          {event.time || 'Time TBD'}
                        </div>
                      </div>
                      
                      {event.description && (
                        <p style={styles.eventDescription}>{event.description}</p>
                      )}
                      
                      {event.notes && (
                        <p style={styles.eventNotes}>{event.notes}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </BaseLayout>
  );
}