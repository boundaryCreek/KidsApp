import AdminLayout from '../../../../components/admin/AdminLayout/AdminLayout';
import CategoryForm from '../../../../components/admin/AdminCategories/CategoryForm';
import {
  adminPageHeaderStyles,
  adminPageTitleStyles,
} from '../../../../components/admin/AdminLayout/AdminLayout.styles';

export default function NewCategoryPage() {
  return (
    <AdminLayout>
      <div style={adminPageHeaderStyles}>
        <h1 style={adminPageTitleStyles}>Create New Category</h1>
      </div>

      <CategoryForm />
    </AdminLayout>
  );
}
