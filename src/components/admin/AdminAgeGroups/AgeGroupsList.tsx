'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Edit2, Plus, Search, Trash2 } from 'lucide-react';
import {
  adminCardStyles,
  adminButtonStyles,
  adminInputStyles,
  adminTableStyles,
  adminTableHeaderStyles,
  adminTableCellStyles,
} from '../AdminLayout/AdminLayout.styles';
import AdminPagination from '../AdminPagination/AdminPagination';
import { AgeGroupsResponse, AgeGroupWithCount } from '../../../types';

export default function AgeGroupsList() {
  const [ageGroups, setAgeGroups] = useState<AgeGroupWithCount[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState({
    page: 1,
    totalPages: 1,
    total: 0,
  });

  const fetchAgeGroups = async (page = 1, searchTerm = '') => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        page: page.toString(),
        limit: '10',
        ...(searchTerm && { search: searchTerm }),
      });

      const response = await fetch(`/api/admin/age-groups?${params}`);
      const data: AgeGroupsResponse = await response.json();

      setAgeGroups(data.ageGroups);
      setPagination({
        page: data.page,
        totalPages: data.totalPages,
        total: data.total,
      });
    } catch (error) {
      console.error('Error fetching age groups:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAgeGroups(currentPage, search);
  }, [currentPage]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1);
    fetchAgeGroups(1, search);
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete "${name}"?`)) {
      return;
    }

    try {
      const response = await fetch(`/api/admin/age-groups/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        fetchAgeGroups(currentPage, search);
      } else {
        const error = await response.json();
        alert(error.error || 'Failed to delete age group');
      }
    } catch (error) {
      console.error('Error deleting age group:', error);
      alert('Failed to delete age group');
    }
  };

  return (
    <div style={adminCardStyles}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 'var(--space-6)',
        gap: 'var(--space-4)',
      }}>
        <form onSubmit={handleSearch} style={{ flex: 1, maxWidth: '400px' }}>
          <div style={{ position: 'relative' }}>
            <input
              type="text"
              placeholder="Search age groups..."
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

        <Link href="/admin/age-groups/new" style={adminButtonStyles}>
          <Plus size={18} />
          Add Age Group
        </Link>
      </div>

      {loading ? (
        <div style={{
          textAlign: 'center',
          padding: 'var(--space-8)',
          color: 'var(--color-text-secondary)',
        }}>
          Loading age groups...
        </div>
      ) : (
        <>
          <table style={adminTableStyles}>
            <thead>
              <tr>
                <th style={adminTableHeaderStyles}>Name</th>
                <th style={adminTableHeaderStyles}>Age Range</th>
                <th style={adminTableHeaderStyles}>Description</th>
                <th style={adminTableHeaderStyles}>Status</th>
                <th style={adminTableHeaderStyles}>Activities</th>
                <th style={adminTableHeaderStyles}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {ageGroups.map((ageGroup) => (
                <tr key={ageGroup.id}>
                  <td style={adminTableCellStyles}>
                    <div style={{ fontWeight: 'var(--font-weight-medium)' }}>{ageGroup.name}</div>
                    <div style={{
                      fontSize: 'var(--font-size-xs)',
                      color: 'var(--color-text-secondary)',
                      marginTop: 'var(--space-1)',
                    }}>
                      /{ageGroup.slug}
                    </div>
                  </td>
                  <td style={adminTableCellStyles}>
                    {ageGroup.minAge ?? 'Any'} - {ageGroup.maxAge ?? 'Any'}
                  </td>
                  <td style={adminTableCellStyles}>
                    {ageGroup.description || '—'}
                  </td>
                  <td style={adminTableCellStyles}>
                    <span style={{
                      padding: 'var(--space-1) var(--space-3)',
                      borderRadius: 'var(--radius-full)',
                      fontSize: 'var(--font-size-xs)',
                      backgroundColor: ageGroup.isActive ? 'var(--color-success-50)' : 'var(--color-neutral-100)',
                      color: ageGroup.isActive ? 'var(--color-success-700)' : 'var(--color-neutral-600)',
                    }}>
                      {ageGroup.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td style={adminTableCellStyles}>
                    {ageGroup._count?.activities ?? 0}
                  </td>
                  <td style={adminTableCellStyles}>
                    <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
                      <Link
                        href={`/admin/age-groups/${ageGroup.id}/edit`}
                        style={{
                          padding: 'var(--space-2)',
                          borderRadius: 'var(--radius-base)',
                          backgroundColor: 'var(--color-neutral-100)',
                          color: 'var(--color-neutral-700)',
                          display: 'inline-flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <Edit2 size={16} />
                      </Link>
                      <button
                        onClick={() => handleDelete(ageGroup.id, ageGroup.name)}
                        style={{
                          padding: 'var(--space-2)',
                          borderRadius: 'var(--radius-base)',
                          backgroundColor: 'var(--color-error-50)',
                          color: 'var(--color-error-700)',
                          border: 'none',
                          cursor: 'pointer',
                          display: 'inline-flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <AdminPagination
            currentPage={pagination.page}
            totalPages={pagination.totalPages}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </>
      )}
    </div>
  );
}
