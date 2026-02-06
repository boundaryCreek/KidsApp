import { notFound } from 'next/navigation';
import AdminLayout from '../../../../../components/admin/AdminLayout/AdminLayout';
import CategoryForm from '../../../../../components/admin/AdminCategories/CategoryForm';
import {
  adminPageHeaderStyles,
  adminPageTitleStyles,
} from '../../../../../components/admin/AdminLayout/AdminLayout.styles';

interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  icon: string;
  color: string;
}

interface EditCategoryPageProps {
  params: Promise<{
    id: string;
  }>;
}

async function getCategory(id: string): Promise<Category | null> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const response = await fetch(`${baseUrl}/api/admin/categories/${id}`, {
      cache: 'no-store',
    });

    if (!response.ok) {
      return null;
    }

    return response.json();
  } catch (error) {
    console.error('Error fetching category:', error);
    return null;
  }
}

export default async function EditCategoryPage({ params }: EditCategoryPageProps) {
  const { id } = await params;
  const category = await getCategory(id);

  if (!category) {
    notFound();
  }

  return (
    <AdminLayout>
      <div style={adminPageHeaderStyles}>
        <h1 style={adminPageTitleStyles}>Edit Category</h1>
      </div>

      <CategoryForm category={category} isEdit />
    </AdminLayout>
  );
}
