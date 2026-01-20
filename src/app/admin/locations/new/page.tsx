import Link from 'next/link';
import AdminLayout from '../../../../components/admin/AdminLayout/AdminLayout';
import AdminPageLayout from '../../../../components/admin/AdminPageLayout/AdminPageLayout';
import LocationForm from '../../../../components/admin/AdminLocations/LocationForm';

export default function NewLocationPage() {
  return (
    <AdminLayout>
      <AdminPageLayout title="Add New Location">
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
        <LocationForm />
      </AdminPageLayout>
    </AdminLayout>
  );
}
