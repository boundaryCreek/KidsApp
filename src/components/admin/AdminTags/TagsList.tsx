"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Edit2, Plus, Search, Trash2 } from 'lucide-react';
import {
  adminButtonStyles,
  adminCardStyles,
  adminInputStyles,
  adminTableCellStyles,
  adminTableHeaderStyles,
  adminTableStyles,
} from '../AdminLayout/AdminLayout.styles';

interface Tag {
  id: string;
  name: string;
  slug: string;
  color: string | null;
  isActive: boolean;
  _count: {
    locations: number;
  };
}

interface TagListResponse {
  tags: Tag[];
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

export default function TagsList() {
  const [tags, setTags] = useState<Tag[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState<PaginationState>({
    page: 1,
    limit: 10,
    total: 0,
    pages: 1,
  });

  const fetchTags = async (page = 1, searchTerm = '') => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        page: page.toString(),
        limit: '10',
        ...(searchTerm && { search: searchTerm }),
      });

      const response = await fetch(`/api/admin/tags?${params}`);
      const data: TagListResponse = await response.json();

      setTags(data.tags);
      setPagination(data.pagination);
    } catch (error) {
      console.error('Error fetching tags:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTags(currentPage, search);
  }, [currentPage]);

  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault();
    setCurrentPage(1);
    fetchTags(1, search);
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete the tag "${name}"?`)) {
      return;
    }

    try {
      const response = await fetch(`/api/admin/tags/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        fetchTags(currentPage, search);
      } else {
        const data = await response.json();
        alert(`Error: ${data.error || 'Failed to delete tag'}`);
      }
    } catch (error) {
      console.error('Error deleting tag:', error);
      alert('Failed to delete tag');
    }
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const handleStatusToggle = async (tag: Tag) => {
    try {
      const response = await fetch(`/api/admin/tags/${tag.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: tag.name,
          slug: tag.slug,
          color: tag.color,
          isActive: !tag.isActive,
        }),
      });

      if (response.ok) {
        fetchTags(currentPage, search);
      }
    } catch (error) {
      console.error('Error updating tag status:', error);
    }
  };

  return (
    <div>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 'var(--space-6)',
      }}>
        <h1 style={{ fontSize: 'var(--font-size-2xl)', fontWeight: 'var(--font-weight-bold)' }}>
          Tags
        </h1>
        <Link href="/admin/tags/new" style={adminButtonStyles}>
          <Plus size={18} />
          New Tag
        </Link>
      </div>

      <div style={{
        ...adminCardStyles,
        marginBottom: 'var(--space-6)',
      }}>
        <form onSubmit={handleSearch} style={{ display: 'flex', gap: 'var(--space-2)' }}>
          <input
            type="text"
            placeholder="Search tags..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={adminInputStyles}
          />
          <button type="submit" style={adminButtonStyles}>
            <Search size={18} />
            Search
          </button>
        </form>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: 'var(--space-8)' }}>
          <p>Loading tags...</p>
        </div>
      ) : tags.length === 0 ? (
        <div style={{ textAlign: 'center', padding: 'var(--space-8)' }}>
          <p style={{ color: 'var(--color-neutral-600)' }}>No tags found</p>
        </div>
      ) : (
        <>
          <div style={adminCardStyles}>
            <table style={adminTableStyles}>
              <thead>
                <tr style={{ backgroundColor: 'var(--color-neutral-100)' }}>
                  <th style={adminTableHeaderStyles}>Name</th>
                  <th style={adminTableHeaderStyles}>Slug</th>
                  <th style={adminTableHeaderStyles}>Color</th>
                  <th style={adminTableHeaderStyles}>Status</th>
                  <th style={adminTableHeaderStyles}>Locations</th>
                  <th style={adminTableHeaderStyles}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {tags.map((tag) => (
                  <tr key={tag.id} style={{ borderBottom: '1px solid var(--color-neutral-200)' }}>
                    <td style={adminTableCellStyles}>{tag.name}</td>
                    <td style={adminTableCellStyles}>
                      <code style={{ fontSize: 'var(--font-size-sm)' }}>{tag.slug}</code>
                    </td>
                    <td style={adminTableCellStyles}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                        {tag.color && (
                          <div
                            style={{
                              width: '24px',
                              height: '24px',
                              backgroundColor: tag.color,
                              borderRadius: 'var(--radius-sm)',
                            }}
                          />
                        )}
                        <code style={{ fontSize: 'var(--font-size-sm)' }}>{tag.color || 'None'}</code>
                      </div>
                    </td>
                    <td style={adminTableCellStyles}>
                      <button
                        onClick={() => handleStatusToggle(tag)}
                        style={{
                          padding: 'var(--space-1) var(--space-3)',
                          borderRadius: 'var(--radius-lg)',
                          border: 'none',
                          cursor: 'pointer',
                          fontSize: 'var(--font-size-sm)',
                          fontWeight: 'var(--font-weight-medium)',
                          backgroundColor: tag.isActive ? 'var(--color-success-100)' : 'var(--color-neutral-200)',
                          color: tag.isActive ? 'var(--color-success-700)' : 'var(--color-neutral-700)',
                        }}
                      >
                        {tag.isActive ? 'Active' : 'Inactive'}
                      </button>
                    </td>
                    <td style={adminTableCellStyles}>{tag._count.locations}</td>
                    <td style={adminTableCellStyles}>
                      <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
                        <Link
                          href={`/admin/tags/${tag.id}/edit`}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 'var(--space-1)',
                            color: 'var(--color-primary-600)',
                            textDecoration: 'none',
                            fontSize: 'var(--font-size-sm)',
                          }}
                        >
                          <Edit2 size={16} />
                          Edit
                        </Link>
                        <button
                          onClick={() => handleDelete(tag.id, tag.name)}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 'var(--space-1)',
                            color: 'var(--color-error-600)',
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            fontSize: 'var(--font-size-sm)',
                          }}
                        >
                          <Trash2 size={16} />
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {pagination.pages > 1 && (
            <div style={{ display: 'flex', justifyContent: 'center', gap: 'var(--space-2)', marginTop: 'var(--space-6)' }}>
              {Array.from({ length: pagination.pages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  style={{
                    padding: 'var(--space-2) var(--space-4)',
                    backgroundColor: page === currentPage ? 'var(--color-primary-600)' : 'var(--color-neutral-200)',
                    color: page === currentPage ? 'white' : 'var(--color-neutral-900)',
                    border: 'none',
                    borderRadius: 'var(--radius-lg)',
                    cursor: 'pointer',
                    fontWeight: page === currentPage ? 'var(--font-weight-bold)' : 'normal',
                  }}
                >
                  {page}
                </button>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
