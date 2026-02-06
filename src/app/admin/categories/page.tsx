import AdminLayout from '../../../components/admin/AdminLayout/AdminLayout';
import CategoriesList from '../../../components/admin/AdminCategories/CategoriesList';
import {
  adminPageHeaderStyles,
  adminPageTitleStyles,
  adminPageDescriptionStyles,
} from '../../../components/admin/AdminLayout/AdminLayout.styles';

export default function CategoriesPage() {
  return (
    <AdminLayout>
      <div style={adminPageHeaderStyles}>
        <h1 style={adminPageTitleStyles}>Categories Management</h1>
        <p style={adminPageDescriptionStyles}>
          Manage activity and location categories
        </p>
      </div>

      <CategoriesList />
    </AdminLayout>
  );
}
