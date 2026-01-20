import Link from 'next/link';
import AdminLayout from '../../../../components/admin/AdminLayout/AdminLayout';
import AdminPageLayout from '../../../../components/admin/AdminPageLayout/AdminPageLayout';
import OrganizationForm from '../../../../components/admin/AdminOrganizations/OrganizationForm';

export default function NewOrganizationPage() {
  return (
    <AdminLayout>
      <AdminPageLayout title="Add New Organization">
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
        <OrganizationForm />
      </AdminPageLayout>
    </AdminLayout>
  );
}
