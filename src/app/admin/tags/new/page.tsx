import AdminPageLayout from '../../../../components/admin/AdminPageLayout/AdminPageLayout';
import { TagForm } from '../../../../components/admin/AdminTags';

export default function NewTagPage() {
  return (
    <AdminPageLayout title="New Tag">
      <TagForm />
    </AdminPageLayout>
  );
}
