import { Metadata } from 'next';
import Link from 'next/link';
import BaseLayout from '../../components/BaseLayout/BaseLayout';
import { prisma } from '../../lib/prisma';
import { generatePageMetadata } from '../../lib/metadata';
import {
  categoriesContainerStyles,
  categoriesHeaderStyles,

  categoriesTitleStyles,
  categoriesDescriptionStyles,
  categoriesGridStyles,
  categoryCardStyles,
  categoryIconStyles,
  categoryNameStyles,
  categoryDescriptionStyles,
} from './page.styles';

export const metadata: Metadata = generatePageMetadata({
  title: 'Activity Categories',
  description: 'Browse kids activities by category — sports, arts, education, outdoors, and more.',
  url: '/categories',
});

export default async function CategoriesPage() {
  const categories = await prisma.category.findMany({
    include: {
      _count: {
        select: {
          activities: true,
          locations: true,
        },
      },
    },
    orderBy: { name: 'asc' },
  });

  return (
    <BaseLayout>
      <div style={categoriesContainerStyles}>
        <div style={categoriesHeaderStyles}>
          <h1 style={categoriesTitleStyles}>Categories</h1>
          <p style={categoriesDescriptionStyles}>
            Find the best places for kids and families across Minnesota — from indoor playgrounds to outdoor adventures.
          </p>
        </div>

        <div style={categoriesGridStyles}>
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/categories/${category.slug}`}
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <div
                style={categoryCardStyles}
              >
                <div style={categoryIconStyles}>
                  {category.icon.startsWith('/') ? (
                    <img
                      src={category.icon}
                      alt={category.name}
                      style={{
                        width: '64px',
                        height: '64px',
                        objectFit: 'contain',
                        filter: 'brightness(0)',
                      }}
                    />
                  ) : (
                    <span style={{ fontSize: 'var(--font-size-5xl)', color: category.color }}>
                      {category.icon}
                    </span>
                  )}
                </div>
                <h3 style={{ ...categoryNameStyles, color: 'var(--color-neutral-900)' }}>
                  {category.name}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </BaseLayout>
  );
}
