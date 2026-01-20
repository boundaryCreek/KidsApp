'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Plus, Search, Edit2, Trash2, Eye } from 'lucide-react';
import {
  adminCardStyles,
  adminButtonStyles,
  adminInputStyles,
  adminTableStyles,
  adminTableHeaderStyles,
  adminTableCellStyles,
} from '../AdminLayout/AdminLayout.styles';

interface Activity {
  id: string;
  title: string;
  slug: string;
  organizer: string;
  isFree: boolean;
  featured: boolean;
  isActive: boolean;
  createdAt: string;
  location?: {
    id: string;
    name: string;
    slug: string;
  };
  ageGroup: {
    id: string;
    name: string;
    minAge: number | null;
    maxAge: number | null;
  };
  categories: Array<{
    id: string;
    name: string;
    slug: string;
  }>;
  _count: {
    favorites: number;
    reviews: number;
  };
}

interface ActivitiesResponse {
  activities: Activity[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

export default function ActivitiesList() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    pages: 1,
  });

  const fetchActivities = async (page = 1, searchTerm = '') => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        page: page.toString(),
        limit: '10',
        ...(searchTerm && { search: searchTerm }),
      });

      const response = await fetch(`/api/admin/activities?${params}`);
      const data: ActivitiesResponse = await response.json();
      
      setActivities(data.activities);
      setPagination(data.pagination);
    } catch (error) {
      console.error('Error fetching activities:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchActivities(currentPage, search);
  }, [currentPage]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1);
    fetchActivities(1, search);
  };

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete "${title}"?`)) {
      return;
    }

    try {
      const response = await fetch(`/api/admin/activities/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        fetchActivities(currentPage, search);
      } else {
        alert('Failed to delete activity');
      }
    } catch (error) {
      console.error('Error deleting activity:', error);
      alert('Failed to delete activity');
    }
  };

  return (
    <div style={adminCardStyles}>
      {/* Header with search and add button */}
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
              placeholder="Search activities..."
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
        
        <Link href="/admin/activities/new" style={adminButtonStyles}>
          <Plus size={18} />
          Add Activity
        </Link>
      </div>

      {/* Activities table */}
      {loading ? (
        <div style={{
          textAlign: 'center',
          padding: 'var(--space-8)',
          color: 'var(--color-text-secondary)',
        }}>
          Loading activities...
        </div>
      ) : (
        <>
          <table style={adminTableStyles}>
            <thead>
              <tr>
                <th style={adminTableHeaderStyles}>Title</th>
                <th style={adminTableHeaderStyles}>Organizer</th>
                <th style={adminTableHeaderStyles}>Location</th>
                <th style={adminTableHeaderStyles}>Age Group</th>
                <th style={adminTableHeaderStyles}>Categories</th>
                <th style={adminTableHeaderStyles}>Status</th>
                <th style={adminTableHeaderStyles}>Stats</th>
                <th style={adminTableHeaderStyles}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {activities.map((activity) => (
                <tr key={activity.id}>
                  <td style={adminTableCellStyles}>
                    <div>
                      <div style={{ fontWeight: 'var(--font-weight-medium)' }}>
                        {activity.title}
                      </div>
                      <div style={{
                        fontSize: 'var(--font-size-xs)',
                        color: 'var(--color-text-secondary)',
                        marginTop: 'var(--space-1)',
                      }}>
                        /{activity.slug}
                      </div>
                    </div>
                  </td>
                  <td style={adminTableCellStyles}>{activity.organizer}</td>
                  <td style={adminTableCellStyles}>
                    {activity.location?.name || 'No location'}
                  </td>
                  <td style={adminTableCellStyles}>
                    {activity.ageGroup.name}
                  </td>
                  <td style={adminTableCellStyles}>
                    <div style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: 'var(--space-1)',
                    }}>
                      {activity.categories.map(cat => (
                        <span
                          key={cat.id}
                          style={{
                            backgroundColor: 'var(--color-neutral-100)',
                            padding: 'var(--space-1) var(--space-2)',
                            borderRadius: 'var(--radius-sm)',
                            fontSize: 'var(--font-size-xs)',
                            color: 'var(--color-text-secondary)',
                          }}
                        >
                          {cat.name}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td style={adminTableCellStyles}>
                    <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
                      {activity.featured && (
                        <span style={{
                          backgroundColor: 'var(--color-warning-100)',
                          color: 'var(--color-warning-700)',
                          padding: 'var(--space-1) var(--space-2)',
                          borderRadius: 'var(--radius-sm)',
                          fontSize: 'var(--font-size-xs)',
                        }}>
                          Featured
                        </span>
                      )}
                      {activity.isFree && (
                        <span style={{
                          backgroundColor: 'var(--color-success-100)',
                          color: 'var(--color-success-700)',
                          padding: 'var(--space-1) var(--space-2)',
                          borderRadius: 'var(--radius-sm)',
                          fontSize: 'var(--font-size-xs)',
                        }}>
                          Free
                        </span>
                      )}
                      {!activity.isActive && (
                        <span style={{
                          backgroundColor: 'var(--color-error-100)',
                          color: 'var(--color-error-700)',
                          padding: 'var(--space-1) var(--space-2)',
                          borderRadius: 'var(--radius-sm)',
                          fontSize: 'var(--font-size-xs)',
                        }}>
                          Inactive
                        </span>
                      )}
                    </div>
                  </td>
                  <td style={adminTableCellStyles}>
                    <div style={{
                      fontSize: 'var(--font-size-xs)',
                      color: 'var(--color-text-secondary)',
                    }}>
                      {activity._count.favorites} favorites<br />
                      {activity._count.reviews} reviews
                    </div>
                  </td>
                  <td style={adminTableCellStyles}>
                    <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
                      <Link
                        href={`/a/${activity.slug}`}
                        style={{
                          ...adminButtonStyles,
                          padding: 'var(--space-1)',
                          backgroundColor: 'var(--color-info-600)',
                        }}
                        title="View activity"
                      >
                        <Eye size={14} />
                      </Link>
                      <Link
                        href={`/admin/activities/${activity.id}/edit`}
                        style={{
                          ...adminButtonStyles,
                          padding: 'var(--space-1)',
                          backgroundColor: 'var(--color-warning-600)',
                        }}
                        title="Edit activity"
                      >
                        <Edit2 size={14} />
                      </Link>
                      <button
                        onClick={() => handleDelete(activity.id, activity.title)}
                        style={{
                          ...adminButtonStyles,
                          padding: 'var(--space-1)',
                          backgroundColor: 'var(--color-error-600)',
                        }}
                        title="Delete activity"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination */}
          {pagination.pages > 1 && (
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: 'var(--space-2)',
              marginTop: 'var(--space-6)',
            }}>
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage <= 1}
                style={{
                  ...adminButtonStyles,
                  backgroundColor: currentPage <= 1 ? 'var(--color-neutral-200)' : 'var(--color-primary-600)',
                  cursor: currentPage <= 1 ? 'not-allowed' : 'pointer',
                }}
              >
                Previous
              </button>
              
              <span style={{
                fontSize: 'var(--font-size-sm)',
                color: 'var(--color-text-secondary)',
              }}>
                Page {currentPage} of {pagination.pages}
              </span>
              
              <button
                onClick={() => setCurrentPage(Math.min(pagination.pages, currentPage + 1))}
                disabled={currentPage >= pagination.pages}
                style={{
                  ...adminButtonStyles,
                  backgroundColor: currentPage >= pagination.pages ? 'var(--color-neutral-200)' : 'var(--color-primary-600)',
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