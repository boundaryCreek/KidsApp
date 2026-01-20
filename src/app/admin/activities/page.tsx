import AdminLayout from '../../../components/admin/AdminLayout/AdminLayout';
import ActivitiesList from '../../../components/admin/AdminActivities/ActivitiesList';
import {
  adminPageHeaderStyles,
  adminPageTitleStyles,
  adminPageDescriptionStyles,
} from '../../../components/admin/AdminLayout/AdminLayout.styles';

export default function ActivitiesPage() {
  return (
    <AdminLayout>
      <div style={adminPageHeaderStyles}>
        <h1 style={adminPageTitleStyles}>Activities Management</h1>
        <p style={adminPageDescriptionStyles}>
          Manage all activities in your platform
        </p>
      </div>
      
      <ActivitiesList />
    </AdminLayout>
  );
}