'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import AdminLayout from '../../../../../components/admin/AdminLayout/AdminLayout';
import AdminPageLayout from '../../../../../components/admin/AdminPageLayout/AdminPageLayout';
import ActivityForm from '../../../../../components/admin/AdminActivities/ActivityForm';

export default function EditActivityPage() {
  const params = useParams<{ id: string }>();
  const activityId = params?.id;
  const [activity, setActivity] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchActivity = async () => {
      try {
        if (!activityId) {
          setError('Invalid activity id.');
          return;
        }

        const response = await fetch(`/api/admin/activities/${activityId}`);
        if (!response.ok) {
          setError('Failed to load activity.');
          return;
        }
        const data = await response.json();
        setActivity(data);
      } catch (err) {
        console.error('Error fetching activity:', err);
        setError('Failed to load activity.');
      } finally {
        setLoading(false);
      }
    };

    fetchActivity();
  }, [activityId]);

  if (loading) {
    return (
      <AdminLayout>
        <AdminPageLayout title="Edit Activity" loading>
          <div />
        </AdminPageLayout>
      </AdminLayout>
    );
  }

  if (error || !activity) {
    return (
      <AdminLayout>
        <AdminPageLayout title="Edit Activity" error={error || 'Activity not found.'}>
          <div />
        </AdminPageLayout>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <AdminPageLayout title="Edit Activity">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-6)' }}>
          <Link
            href="/admin/activities"
            style={{
              color: 'var(--color-primary-600)',
              textDecoration: 'none',
              fontSize: 'var(--font-size-sm)',
              fontWeight: 'var(--font-weight-medium)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 'var(--space-2)',
              transition: 'var(--transition-colors)',
            }}
          >
            ← Back to Activities
          </Link>
          
          <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
            <Link
              href={`/admin/events?activityId=${activityId}`}
              style={{
                padding: 'var(--space-2) var(--space-4)',
                backgroundColor: 'var(--color-neutral-200)',
                color: 'var(--color-text)',
                textDecoration: 'none',
                borderRadius: 'var(--radius-md)',
                fontSize: 'var(--font-size-sm)',
                fontWeight: 'var(--font-weight-medium)',
                transition: 'var(--transition-colors)',
              }}
            >
              View Events
            </Link>
            <Link
              href={`/admin/events/new?activityId=${activityId}`}
              style={{
                padding: 'var(--space-2) var(--space-4)',
                backgroundColor: 'var(--color-primary-600)',
                color: 'var(--color-neutral-50)',
                textDecoration: 'none',
                borderRadius: 'var(--radius-md)',
                fontSize: 'var(--font-size-sm)',
                fontWeight: 'var(--font-weight-medium)',
                transition: 'var(--transition-colors)',
              }}
            >
              + Add Event
            </Link>
          </div>
        </div>
        <ActivityForm activity={activity} isEdit />
      </AdminPageLayout>
    </AdminLayout>
  );
}
