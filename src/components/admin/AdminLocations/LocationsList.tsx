'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Plus, Search, Edit2, Trash2, Eye, MapPin, Building2 } from 'lucide-react';
import {
  adminCardStyles,
  adminButtonStyles,
  adminInputStyles,
  adminTableStyles,
  adminTableHeaderStyles,
  adminTableCellStyles,
} from '../AdminLayout/AdminLayout.styles';

interface Location {
  id: string;
  name: string;
  slug: string;
  type: string;
  address: string | null;
  capacity: number | null;
  isActive: boolean;
  createdAt: string;
  organization: {
    id: string;
    name: string;
    slug: string;
  };
  city?: {
    id: string;
    name: string;
    slug: string;
  };
  categories: Array<{
    id: string;
    name: string;
    slug: string;
  }>;
  _count: {
    activities: number;
    reviews: number;
  };
}

interface LocationsResponse {
  locations: Location[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

const locationTypeLabels: Record<string, string> = {
  VENUE: 'Venue',
  ORGANIZATION: 'Organization',
  FACILITY: 'Facility',
  OUTDOOR: 'Outdoor',
  ONLINE: 'Online',
};

export default function LocationsList() {
  const [locations, setLocations] = useState<Location[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    pages: 1,
  });

  const fetchLocations = async (page = 1, searchTerm = '') => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        page: page.toString(),
        limit: '10',
        ...(searchTerm && { search: searchTerm }),
      });

      const response = await fetch(`/api/admin/locations?${params}`);
      const data: LocationsResponse = await response.json();
      
      setLocations(data.locations);
      setPagination(data.pagination);
    } catch (error) {
      console.error('Error fetching locations:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLocations(currentPage, search);
  }, [currentPage]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1);
    fetchLocations(1, search);
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete "${name}"?`)) {
      return;
    }

    try {
      const response = await fetch(`/api/admin/locations/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        fetchLocations(currentPage, search);
      } else {
        alert('Failed to delete location');
      }
    } catch (error) {
      console.error('Error deleting location:', error);
      alert('Failed to delete location');
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
              placeholder="Search locations..."
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
        
        <Link href="/admin/locations/new" style={adminButtonStyles}>
          <Plus size={18} />
          Add Location
        </Link>
      </div>

      {/* Locations table */}
      {loading ? (
        <div style={{
          textAlign: 'center',
          padding: 'var(--space-8)',
          color: 'var(--color-text-secondary)',
        }}>
          Loading locations...
        </div>
      ) : (
        <>
          <table style={adminTableStyles}>
            <thead>
              <tr>
                <th style={adminTableHeaderStyles}>Name</th>
                <th style={adminTableHeaderStyles}>Type</th>
                <th style={adminTableHeaderStyles}>Organization</th>
                <th style={adminTableHeaderStyles}>City</th>
                <th style={adminTableHeaderStyles}>Categories</th>
                <th style={adminTableHeaderStyles}>Capacity</th>
                <th style={adminTableHeaderStyles}>Status</th>
                <th style={adminTableHeaderStyles}>Stats</th>
                <th style={adminTableHeaderStyles}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {locations.map((location) => (
                <tr key={location.id}>
                  <td style={adminTableCellStyles}>
                    <div>
                      <div style={{ fontWeight: 'var(--font-weight-medium)' }}>
                        {location.name}
                      </div>
                      <div style={{
                        fontSize: 'var(--font-size-xs)',
                        color: 'var(--color-text-secondary)',
                        marginTop: 'var(--space-1)',
                      }}>
                        /{location.slug}
                      </div>
                      {location.address && (
                        <div style={{
                          fontSize: 'var(--font-size-xs)',
                          color: 'var(--color-text-secondary)',
                          marginTop: 'var(--space-1)',
                        }}>
                          <MapPin size={10} style={{ display: 'inline', marginRight: 'var(--space-1)' }} />
                          {location.address}
                        </div>
                      )}
                    </div>
                  </td>
                  <td style={adminTableCellStyles}>
                    <span style={{
                      backgroundColor: 'var(--color-neutral-100)',
                      padding: 'var(--space-1) var(--space-2)',
                      borderRadius: 'var(--radius-sm)',
                      fontSize: 'var(--font-size-xs)',
                      color: 'var(--color-text-secondary)',
                    }}>
                      {locationTypeLabels[location.type] || location.type}
                    </span>
                  </td>
                  <td style={adminTableCellStyles}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-1)' }}>
                      <Building2 size={12} />
                      {location.organization.name}
                    </div>
                  </td>
                  <td style={adminTableCellStyles}>
                    {location.city?.name || 'No city'}
                  </td>
                  <td style={adminTableCellStyles}>
                    <div style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: 'var(--space-1)',
                    }}>
                      {location.categories.map(cat => (
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
                    {location.capacity ? `${location.capacity} people` : 'No limit'}
                  </td>
                  <td style={adminTableCellStyles}>
                    {!location.isActive && (
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
                  </td>
                  <td style={adminTableCellStyles}>
                    <div style={{
                      fontSize: 'var(--font-size-xs)',
                      color: 'var(--color-text-secondary)',
                    }}>
                      {location._count.activities} activities<br />
                      {location._count.reviews} reviews
                    </div>
                  </td>
                  <td style={adminTableCellStyles}>
                    <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
                      <Link
                        href={`/locations/${location.slug}`}
                        style={{
                          ...adminButtonStyles,
                          padding: 'var(--space-1)',
                          backgroundColor: 'var(--color-info-600)',
                        }}
                        title="View location"
                      >
                        <Eye size={14} />
                      </Link>
                      <Link
                        href={`/admin/locations/${location.id}/edit`}
                        style={{
                          ...adminButtonStyles,
                          padding: 'var(--space-1)',
                          backgroundColor: 'var(--color-warning-600)',
                        }}
                        title="Edit location"
                      >
                        <Edit2 size={14} />
                      </Link>
                      <button
                        onClick={() => handleDelete(location.id, location.name)}
                        style={{
                          ...adminButtonStyles,
                          padding: 'var(--space-1)',
                          backgroundColor: 'var(--color-error-600)',
                        }}
                        title="Delete location"
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