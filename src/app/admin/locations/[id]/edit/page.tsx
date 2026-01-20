'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import AdminLayout from '../../../../../components/admin/AdminLayout/AdminLayout';
import AdminPageLayout from '../../../../../components/admin/AdminPageLayout/AdminPageLayout';
import LocationForm from '../../../../../components/admin/AdminLocations/LocationForm';
import { Location } from '../../../../../types';

export default function EditLocationPage() {
  const params = useParams<{ id: string }>();
  const locationId = params?.id;
  const [location, setLocation] = useState<Location | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        if (!locationId) {
          setError('Invalid location id.');
          return;
        }

        const response = await fetch(`/api/admin/locations/${locationId}`);
        if (!response.ok) {
          setError('Failed to load location.');
          return;
        }

        const data = await response.json();
        setLocation(data);
      } catch (err) {
        console.error('Error fetching location:', err);
        setError('Failed to load location.');
      } finally {
        setLoading(false);
      }
    };

    fetchLocation();
  }, [locationId]);

  if (loading) {
    return (
      <AdminLayout>
        <AdminPageLayout title="Edit Location" loading>
          <div />
        </AdminPageLayout>
      </AdminLayout>
    );
  }

  if (error || !location) {
    return (
      <AdminLayout>
        <AdminPageLayout title="Edit Location" error={error || 'Location not found.'}>
          <div />
        </AdminPageLayout>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <AdminPageLayout title="Edit Location">
        <div style={{ marginBottom: 'var(--space-6)' }}>
          <Link
            href="/admin/locations"
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
             Back to Locations
          </Link>
        </div>
        <LocationForm location={location} isEdit />
      </AdminPageLayout>
    </AdminLayout>
  );
}
