'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import AdminLayout from '../../../../../components/admin/AdminLayout/AdminLayout';
import AdminPageLayout from '../../../../../components/admin/AdminPageLayout/AdminPageLayout';
import OrganizationForm from '../../../../../components/admin/AdminOrganizations/OrganizationForm';
import { Organization } from '../../../../../types';

export default function EditOrganizationPage() {
  const params = useParams<{ id: string }>();
  const organizationId = params?.id;
  const [organization, setOrganization] = useState<Organization | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrganization = async () => {
      try {
        if (!organizationId) {
          setError('Invalid organization id.');
          return;
        }

        const response = await fetch(`/api/admin/organizations/${organizationId}`);
        if (!response.ok) {
          setError('Failed to load organization.');
          return;
        }

        const data = await response.json();
        setOrganization(data);
      } catch (err) {
        console.error('Error fetching organization:', err);
        setError('Failed to load organization.');
      } finally {
        setLoading(false);
      }
    };

    fetchOrganization();
  }, [organizationId]);

  if (loading) {
    return (
      <AdminLayout>
        <AdminPageLayout title="Edit Organization" loading>
          <div />
        </AdminPageLayout>
      </AdminLayout>
    );
  }

  if (error || !organization) {
    return (
      <AdminLayout>
        <AdminPageLayout title="Edit Organization" error={error || 'Organization not found.'}>
          <div />
        </AdminPageLayout>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <AdminPageLayout title="Edit Organization">
        <div style={{ marginBottom: 'var(--space-6)' }}>
          <Link
            href="/admin/organizations"
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
             Back to Organizations
          </Link>
        </div>
        <OrganizationForm organization={organization} isEdit />
      </AdminPageLayout>
    </AdminLayout>
  );
}
