"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import * as LucideIcons from 'lucide-react';
import { Edit2, Plus, Search, Trash2 } from 'lucide-react';
import {
  adminButtonStyles,
  adminCardStyles,
  adminInputStyles,
  adminTableCellStyles,
  adminTableHeaderStyles,
  adminTableStyles,
} from '../AdminLayout/AdminLayout.styles';

interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  icon: string;
  color: string;
  _count: {
    activities: number;
    locations: number;
  };
}

interface CategoryListResponse {
  categories: Category[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

interface PaginationState {
  page: number;
  limit: number;
  total: number;
  pages: number;
}

export default function CategoriesList() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState<PaginationState>({
    page: 1,
    limit: 10,
    total: 0,
    pages: 1,
  });

  const fetchCategories = async (page = 1, searchTerm = '') => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        page: page.toString(),
        limit: '10',
        ...(searchTerm && { search: searchTerm }),
      });

      const response = await fetch(`/api/admin/categories?${params}`);
      const data: CategoryListResponse = await response.json();

      setCategories(data.categories);
      setPagination(data.pagination);
    } catch (error) {
      console.error('Error fetching categories:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories(currentPage, search);
  }, [currentPage]);

  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault();
    setCurrentPage(1);
    fetchCategories(1, search);
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete "${name}"?`)) {
      return;
    }

    try {
      const response = await fetch(`/api/admin/categories/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        fetchCategories(currentPage, search);
      } else {
        const error = await response.json();
        alert(error.error || 'Failed to delete category');
      }
    } catch (error) {
      console.error('Error deleting category:', error);
      alert('Failed to delete category');
    }
  };

  return (
    <div style={adminCardStyles}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 'var(--space-6)',
          gap: 'var(--space-4)',
        }}
      >
        <form onSubmit={handleSearch} style={{ flex: 1, maxWidth: '400px' }}>
          <div style={{ position: 'relative' }}>
            <input
              type="text"
              placeholder="Search categories..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                ...adminInputStyles,
                paddingLeft: 'var(--space-10)',
                width: '100%',
              }}
            />
            <Search
              size={18}
              style={{
                position: 'absolute',
                left: 'var(--space-3)',
                top: '50%',
                transform: 'translateY(-50%)',
                color: 'var(--color-text-secondary)',
                pointerEvents: 'none',
              }}
            />
          </div>
        </form>

        <Link href="/admin/categories/new" style={adminButtonStyles}>
          <Plus size={18} />
          Add Category
        </Link>
      </div>

      {loading ? (
        <div
          style={{
            textAlign: 'center',
            padding: 'var(--space-8)',
            color: 'var(--color-text-secondary)',
          }}
        >
          Loading categories...
        </div>
      ) : (
        <>
          <table style={adminTableStyles}>
            <thead>
              <tr>
                <th style={adminTableHeaderStyles}>Category</th>
                <th style={adminTableHeaderStyles}>Icon & Color</th>
                <th style={adminTableHeaderStyles}>Description</th>
                <th style={adminTableHeaderStyles}>Stats</th>
                <th style={adminTableHeaderStyles}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category) => (
                <tr key={category.id}>
                  <td style={adminTableCellStyles}>
                    <div>
                      <div style={{ fontWeight: 'var(--font-weight-medium)' }}>
                        {category.name}
                      </div>
                      <div
                        style={{
                          fontSize: 'var(--font-size-xs)',
                          color: 'var(--color-text-secondary)',
                          marginTop: 'var(--space-1)',
                        }}
                      >
                        /{category.slug}
                      </div>
                    </div>
                  </td>
                  <td style={adminTableCellStyles}>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 'var(--space-3)',
                      }}
                    >
                      <div
                        style={{
                          backgroundColor: category.color,
                          padding: 'var(--space-2)',
                          borderRadius: 'var(--radius-md)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          width: '40px',
                          height: '40px',
                        }}
                      >
                        {(() => {
                          const IconComponent = (LucideIcons as any)[category.icon];
                          return IconComponent ? (
                            <IconComponent size={20} color="white" />
                          ) : (
                            <LucideIcons.HelpCircle size={20} color="white" />
                          );
                        })()}
                      </div>
                      <div
                        style={{
                          fontSize: 'var(--font-size-xs)',
                          color: 'var(--color-text-secondary)',
                        }}
                      >
                        {category.icon}
                      </div>
                    </div>
                  </td>
                  <td style={adminTableCellStyles}>
                    <div
                      style={{
                        fontSize: 'var(--font-size-sm)',
                        color: 'var(--color-text-secondary)',
                        maxWidth: '300px',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {category.description || '—'}
                    </div>
                  </td>
                  <td style={adminTableCellStyles}>
                    <div
                      style={{
                        fontSize: 'var(--font-size-xs)',
                        color: 'var(--color-text-secondary)',
                      }}
                    >
                      <div>{category._count.activities} activities</div>
                      <div>{category._count.locations} locations</div>
                    </div>
                  </td>
                  <td style={adminTableCellStyles}>
                    <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
                      <Link
                        href={`/admin/categories/${category.id}/edit`}
                        style={{
                          ...adminButtonStyles,
                          padding: 'var(--space-1)',
                          backgroundColor: 'var(--color-warning-600)',
                        }}
                        title="Edit category"
                      >
                        <Edit2 size={14} />
                      </Link>
                      <button
                        onClick={() => handleDelete(category.id, category.name)}
                        style={{
                          ...adminButtonStyles,
                          padding: 'var(--space-1)',
                          backgroundColor: 'var(--color-error-600)',
                        }}
                        title="Delete category"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {pagination.pages > 1 && (
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: 'var(--space-2)',
                marginTop: 'var(--space-6)',
              }}
            >
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage <= 1}
                style={{
                  ...adminButtonStyles,
                  backgroundColor:
                    currentPage <= 1 ? 'var(--color-neutral-200)' : 'var(--color-primary-600)',
                  cursor: currentPage <= 1 ? 'not-allowed' : 'pointer',
                }}
              >
                Previous
              </button>

              <span
                style={{
                  fontSize: 'var(--font-size-sm)',
                  color: 'var(--color-text-secondary)',
                }}
              >
                Page {currentPage} of {pagination.pages}
              </span>

              <button
                onClick={() => setCurrentPage(Math.min(pagination.pages, currentPage + 1))}
                disabled={currentPage >= pagination.pages}
                style={{
                  ...adminButtonStyles,
                  backgroundColor:
                    currentPage >= pagination.pages ? 'var(--color-neutral-200)' : 'var(--color-primary-600)',
                  cursor: currentPage >= pagination.pages ? 'not-allowed' : 'pointer',
                }}
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
