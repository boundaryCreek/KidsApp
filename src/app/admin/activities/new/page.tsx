import Link from 'next/link';
import AdminLayout from '../../../../components/admin/AdminLayout/AdminLayout';
import AdminPageLayout from '../../../../components/admin/AdminPageLayout/AdminPageLayout';
import ActivityForm from '../../../../components/admin/AdminActivities/ActivityForm';

export default function NewActivityPage() {
  return (
    <AdminLayout>
      <AdminPageLayout title="Add New Activity">
        <div style={{ marginBottom: 'var(--space-6)' }}>
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
        </div>
        <ActivityForm />
      </AdminPageLayout>
    </AdminLayout>
  );
}