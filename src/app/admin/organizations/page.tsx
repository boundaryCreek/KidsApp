import AdminLayout from '../../../components/admin/AdminLayout/AdminLayout';
import OrganizationsList from '../../../components/admin/AdminOrganizations/OrganizationsList';
import {
  adminPageHeaderStyles,
  adminPageTitleStyles,
  adminPageDescriptionStyles,
} from '../../../components/admin/AdminLayout/AdminLayout.styles';

export default function OrganizationsPage() {
  return (
    <AdminLayout>
      <div style={adminPageHeaderStyles}>
        <h1 style={adminPageTitleStyles}>Organizations Management</h1>
        <p style={adminPageDescriptionStyles}>
          Manage partner organizations, venues, and providers
        </p>
      </div>

      <OrganizationsList />
    </AdminLayout>
  );
}
