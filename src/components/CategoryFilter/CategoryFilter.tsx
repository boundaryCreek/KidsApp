'use client';

import { useState } from 'react';
import * as LucideIcons from 'lucide-react';
import { Category } from '../../types';
import * as styles from './CategoryFilter.styles';

interface CategoryFilterProps {
  categories: Category[];
  selectedCategories: string[];
  onCategoryToggle: (categoryId: string) => void;
  onClearFilters: () => void;
}

export default function CategoryFilter({
  categories,
  selectedCategories,
  onCategoryToggle,
  onClearFilters,
}: CategoryFilterProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  if (categories.length === 0) return null;

  const displayedCategories = isExpanded ? categories : categories.slice(0, 6);
  const hasMore = categories.length > 6;

  return (
    <div style={styles.filterContainer}>
      <div style={styles.filterHeader}>
        <h3 style={styles.filterTitle}>Filter by Category</h3>
        {selectedCategories.length > 0 && (
          <button
            onClick={onClearFilters}
            style={styles.clearButton}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--color-error-700)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--color-error-600)';
            }}
          >
            Clear ({selectedCategories.length})
          </button>
        )}
      </div>

      <div style={styles.categoriesGrid}>
        {displayedCategories.map((category) => {
          const isSelected = selectedCategories.includes(category.id);
          return (
            <button
              key={category.id}
              onClick={() => onCategoryToggle(category.id)}
              style={
                isSelected
                  ? styles.categoryButtonActive
                  : styles.categoryButton
              }
              onMouseEnter={(e) => {
                if (!isSelected) {
                  e.currentTarget.style.backgroundColor = 'var(--color-neutral-100)';
                  e.currentTarget.style.borderColor = 'var(--color-primary-400)';
                }
              }}
              onMouseLeave={(e) => {
                if (!isSelected) {
                  e.currentTarget.style.backgroundColor = 'var(--color-surface)';
                  e.currentTarget.style.borderColor = 'var(--color-neutral-300)';
                }
              }}
            >
              <span style={styles.categoryIcon}>
                {(() => {
                  // Check if it's a custom icon path
                  if (category.icon.startsWith('/')) {
                    return (
                      <img
                        src={category.icon}
                        alt={category.name}
                        style={{
                          width: '24px',
                          height: '24px',
                          objectFit: 'contain',
                        }}
                      />
                    );
                  }
                  // Otherwise, try to render as Lucide icon
                  const IconComponent = (LucideIcons as any)[category.icon];
                  return IconComponent ? (
                    <IconComponent size={24} strokeWidth={2} />
                  ) : (
                    <span>{category.icon}</span>
                  );
                })()}
              </span>
              <span style={styles.categoryName}>{category.name}</span>
            </button>
          );
        })}
      </div>

      {hasMore && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          style={styles.expandButton}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'var(--color-primary-100)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'var(--color-neutral-100)';
          }}
        >
          {isExpanded ? 'Show Less' : `Show ${categories.length - 6} More`}
        </button>
      )}
    </div>
  );
}
