import { Category } from '../../types';

interface CategoryListProps {
  categories: Category[];
}

const categoryListStyles = {
  categoriesList: {
    display: 'flex',
    flexWrap: 'wrap' as const,
    gap: 'var(--space-2)',
   
  },
  categoryTag: {
    display: 'inline-flex',
    alignItems: 'center',
    padding: 'var(--space-1) var(--space-3)',
    backgroundColor: 'var(--color-neutral-100)',
    color: 'var(--color-neutral-800)',
    borderRadius: 'var(--radius-full)',
    fontSize: 'var(--font-size-sm)',
    fontWeight: 'var(--font-weight-medium)',
    border: '1px solid var(--color-neutral-200)',
  },
};

export default function CategoryList({ categories }: CategoryListProps) {
  if (categories.length === 0) return null;

  return (
    <div style={categoryListStyles.categoriesList}>
      {categories.map((category) => (
        <span key={category.id} style={categoryListStyles.categoryTag}>
          {category.name}
        </span>
      ))}
    </div>
  );
}