import AdminLayout from '../../../components/admin/AdminLayout/AdminLayout';
import AgeGroupsList from '../../../components/admin/AdminAgeGroups/AgeGroupsList';
import {
  adminPageHeaderStyles,
  adminPageTitleStyles,
  adminPageDescriptionStyles,
} from '../../../components/admin/AdminLayout/AdminLayout.styles';

export default function AgeGroupsPage() {
  return (
    <AdminLayout>
      <div style={adminPageHeaderStyles}>
        <h1 style={adminPageTitleStyles}>Age Groups Management</h1>
        <p style={adminPageDescriptionStyles}>
          Manage age ranges for activities and locations
        </p>
      </div>

      <AgeGroupsList />
    </AdminLayout>
  );
}
