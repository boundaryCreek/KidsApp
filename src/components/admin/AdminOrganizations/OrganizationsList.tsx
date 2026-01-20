"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Edit2, Plus, Search, Trash2, Globe } from 'lucide-react';
import {
  adminButtonStyles,
  adminCardStyles,
  adminInputStyles,
  adminTableCellStyles,
  adminTableHeaderStyles,
  adminTableStyles,
} from '../AdminLayout/AdminLayout.styles';
import { OrganizationListResponse, OrganizationWithCounts } from '../../../types';

interface PaginationState {
  page: number;
  limit: number;
  total: number;
  pages: number;
}

export default function OrganizationsList() {
  const [organizations, setOrganizations] = useState<OrganizationWithCounts[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState<PaginationState>({
    page: 1,
    limit: 10,
    total: 0,
    pages: 1,
  });

  const fetchOrganizations = async (page = 1, searchTerm = '') => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        page: page.toString(),
        limit: '10',
        ...(searchTerm && { search: searchTerm }),
      });

      const response = await fetch(`/api/admin/organizations?${params}`);
      const data: OrganizationListResponse = await response.json();

      setOrganizations(data.organizations);
      setPagination({
        page: data.page,
        limit: 10,
        total: data.total,
        pages: data.totalPages,
      });
    } catch (error) {
      console.error('Error fetching organizations:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrganizations(currentPage, search);
  }, [currentPage]);

  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault();
    setCurrentPage(1);
    fetchOrganizations(1, search);
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete "${name}"?`)) {
      return;
    }

    try {
      const response = await fetch(`/api/admin/organizations/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        fetchOrganizations(currentPage, search);
      } else {
        const error = await response.json();
        alert(error.error || 'Failed to delete organization');
      }
    } catch (error) {
      console.error('Error deleting organization:', error);
      alert('Failed to delete organization');
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
              placeholder="Search organizations..."
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

        <Link href="/admin/organizations/new" style={adminButtonStyles}>
          <Plus size={18} />
          Add Organization
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
          Loading organizations...
        </div>
      ) : (
        <>
          <table style={adminTableStyles}>
            <thead>
              <tr>
                <th style={adminTableHeaderStyles}>Name</th>
                <th style={adminTableHeaderStyles}>Website</th>
                <th style={adminTableHeaderStyles}>Status</th>
                <th style={adminTableHeaderStyles}>Stats</th>
                <th style={adminTableHeaderStyles}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {organizations.map((organization) => (
                <tr key={organization.id}>
                  <td style={adminTableCellStyles}>
                    <div>
                      <div style={{ fontWeight: 'var(--font-weight-medium)' }}>
                        {organization.name}
                      </div>
                      <div
                        style={{
                          fontSize: 'var(--font-size-xs)',
                          color: 'var(--color-text-secondary)',
                          marginTop: 'var(--space-1)',
                        }}
                      >
                        /{organization.slug}
                      </div>
                    </div>
                  </td>
                  <td style={adminTableCellStyles}>
                    {organization.website ? (
                      <a
                        href={organization.website}
                        target="_blank"
                        rel="noreferrer"
                        style={{
                          color: 'var(--color-primary-700)',
                          textDecoration: 'none',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: 'var(--space-2)',
                        }}
                      >
                        <Globe size={14} />
                        Visit site
                      </a>
                    ) : (
                      <span style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--font-size-sm)' }}>
                        —
                      </span>
                    )}
                  </td>
                  <td style={adminTableCellStyles}>
                    {!organization.isActive && (
                      <span
                        style={{
                          backgroundColor: 'var(--color-error-100)',
                          color: 'var(--color-error-700)',
                          padding: 'var(--space-1) var(--space-2)',
                          borderRadius: 'var(--radius-sm)',
                          fontSize: 'var(--font-size-xs)',
                        }}
                      >
                        Inactive
                      </span>
                    )}
                  </td>
                  <td style={adminTableCellStyles}>
                    <div
                      style={{
                        fontSize: 'var(--font-size-xs)',
                        color: 'var(--color-text-secondary)',
                      }}
                    >
                      {organization._count.locations} locations
                    </div>
                  </td>
                  <td style={adminTableCellStyles}>
                    <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
                      <Link
                        href={`/admin/organizations/${organization.id}/edit`}
                        style={{
                          ...adminButtonStyles,
                          padding: 'var(--space-1)',
                          backgroundColor: 'var(--color-warning-600)',
                        }}
                        title="Edit organization"
                      >
                        <Edit2 size={14} />
                      </Link>
                      <button
                        onClick={() => handleDelete(organization.id, organization.name)}
                        style={{
                          ...adminButtonStyles,
                          padding: 'var(--space-1)',
                          backgroundColor: 'var(--color-error-600)',
                        }}
                        title="Delete organization"
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
