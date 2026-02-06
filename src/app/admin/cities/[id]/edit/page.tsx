'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import AdminLayout from '../../../../../components/admin/AdminLayout/AdminLayout';
import AdminPageLayout from '../../../../../components/admin/AdminPageLayout/AdminPageLayout';
import CityForm from '../../../../../components/admin/AdminCities/CityForm';
import { City } from '../../../../../types';

export default function EditCityPage() {
  const params = useParams<{ id: string }>();
  const cityId = params?.id;
  const [city, setCity] = useState<City | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCity = async () => {
      try {
        if (!cityId) {
          setError('Invalid city id.');
          return;
        }

        const response = await fetch(`/api/admin/cities/${cityId}`);
        if (!response.ok) {
          setError('Failed to load city.');
          return;
        }

        const data = await response.json();
        setCity(data);
      } catch (err) {
        console.error('Error fetching city:', err);
        setError('Failed to load city.');
      } finally {
        setLoading(false);
      }
    };

    fetchCity();
  }, [cityId]);

  if (loading) {
    return (
      <AdminLayout>
        <AdminPageLayout title="Edit City" loading>
          <div />
        </AdminPageLayout>
      </AdminLayout>
    );
  }

  if (error || !city) {
    return (
      <AdminLayout>
        <AdminPageLayout title="Edit City" error={error || 'City not found.'}>
          <div />
        </AdminPageLayout>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <AdminPageLayout title="Edit City">
        <div style={{ marginBottom: 'var(--space-6)' }}>
          <Link
            href="/admin/cities"
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
            ← Back to Cities
          </Link>
        </div>
        <CityForm city={city} isEdit />
      </AdminPageLayout>
    </AdminLayout>
  );
}
