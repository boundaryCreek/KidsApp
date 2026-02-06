import AdminLayout from '../../../components/admin/AdminLayout/AdminLayout';
import CitiesList from '../../../components/admin/AdminCities/CitiesList';
import {
  adminPageHeaderStyles,
  adminPageTitleStyles,
  adminPageDescriptionStyles,
} from '../../../components/admin/AdminLayout/AdminLayout.styles';

export default function CitiesPage() {
  return (
    <AdminLayout>
      <div style={adminPageHeaderStyles}>
        <h1 style={adminPageTitleStyles}>Cities Management</h1>
        <p style={adminPageDescriptionStyles}>
          Manage cities and geographic locations
        </p>
      </div>

      <CitiesList />
    </AdminLayout>
  );
}
