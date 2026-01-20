import AdminLayout from '../../../components/admin/AdminLayout/AdminLayout';
import LocationsList from '../../../components/admin/AdminLocations/LocationsList';
import {
  adminPageHeaderStyles,
  adminPageTitleStyles,
  adminPageDescriptionStyles,
} from '../../../components/admin/AdminLayout/AdminLayout.styles';

export default function LocationsPage() {
  return (
    <AdminLayout>
      <div style={adminPageHeaderStyles}>
        <h1 style={adminPageTitleStyles}>Locations Management</h1>
        <p style={adminPageDescriptionStyles}>
          Manage venues, facilities, and organizations in your platform
        </p>
      </div>

      <LocationsList />
    </AdminLayout>
  );
}
