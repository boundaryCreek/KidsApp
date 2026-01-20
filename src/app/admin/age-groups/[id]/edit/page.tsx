'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import AdminLayout from '../../../../../components/admin/AdminLayout/AdminLayout';
import AdminPageLayout from '../../../../../components/admin/AdminPageLayout/AdminPageLayout';
import AgeGroupForm from '../../../../../components/admin/AdminAgeGroups/AgeGroupForm';

export default function EditAgeGroupPage() {
  const params = useParams<{ id: string }>();
  const ageGroupId = params?.id;
  const [ageGroup, setAgeGroup] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAgeGroup = async () => {
      try {
        if (!ageGroupId) {
          setError('Invalid age group id.');
          return;
        }

        const response = await fetch(`/api/admin/age-groups/${ageGroupId}`);
        if (!response.ok) {
          setError('Failed to load age group.');
          return;
        }
        const data = await response.json();
        setAgeGroup(data);
      } catch (err) {
        console.error('Error fetching age group:', err);
        setError('Failed to load age group.');
      } finally {
        setLoading(false);
      }
    };

    fetchAgeGroup();
  }, [ageGroupId]);

  if (loading) {
    return (
      <AdminLayout>
        <AdminPageLayout title="Edit Age Group" loading>
          <div />
        </AdminPageLayout>
      </AdminLayout>
    );
  }

  if (error || !ageGroup) {
    return (
      <AdminLayout>
        <AdminPageLayout title="Edit Age Group" error={error || 'Age group not found.'}>
          <div />
        </AdminPageLayout>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <AdminPageLayout title="Edit Age Group">
        <div style={{ marginBottom: 'var(--space-6)' }}>
          <Link
            href="/admin/age-groups"
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
            ← Back to Age Groups
          </Link>
        </div>
        <AgeGroupForm ageGroup={ageGroup} isEdit />
      </AdminPageLayout>
    </AdminLayout>
  );
}
