import Link from 'next/link';
import AdminLayout from '../../../../components/admin/AdminLayout/AdminLayout';
import AdminPageLayout from '../../../../components/admin/AdminPageLayout/AdminPageLayout';
import CityForm from '../../../../components/admin/AdminCities/CityForm';

export default function NewCityPage() {
  return (
    <AdminLayout>
      <AdminPageLayout title="Add New City">
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
        <CityForm />
      </AdminPageLayout>
    </AdminLayout>
  );
}
