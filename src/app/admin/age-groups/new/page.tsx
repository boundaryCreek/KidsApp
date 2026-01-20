import Link from 'next/link';
import AdminLayout from '../../../../components/admin/AdminLayout/AdminLayout';
import AdminPageLayout from '../../../../components/admin/AdminPageLayout/AdminPageLayout';
import AgeGroupForm from '../../../../components/admin/AdminAgeGroups/AgeGroupForm';

export default function NewAgeGroupPage() {
  return (
    <AdminLayout>
      <AdminPageLayout title="Add New Age Group">
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
        <AgeGroupForm />
      </AdminPageLayout>
    </AdminLayout>
  );
}
