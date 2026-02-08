import AdminPageLayout from '../../../../../components/admin/AdminPageLayout/AdminPageLayout';
import { TagForm } from '../../../../../components/admin/AdminTags';
import { prisma } from '../../../../../lib/prisma';
import { notFound } from 'next/navigation';

interface EditTagPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditTagPage({ params }: EditTagPageProps) {
  const { id } = await params;

  const tag = await prisma.tag.findUnique({
    where: { id },
  });

  if (!tag) {
    notFound();
  }

  return (
    <AdminPageLayout title={`Edit Tag: ${tag.name}`}>
      <TagForm tag={tag} isEdit={true} />
    </AdminPageLayout>
  );
}
