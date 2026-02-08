import AdminPageLayout from '../../../components/admin/AdminPageLayout/AdminPageLayout';
import { TagsList } from '../../../components/admin/AdminTags';

export default function TagsAdminPage() {
  return (
    <AdminPageLayout title="Manage Tags">
      <TagsList />
    </AdminPageLayout>
  );
}
