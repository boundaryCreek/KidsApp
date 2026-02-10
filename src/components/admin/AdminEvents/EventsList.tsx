'use client';

import { useState, useEffect, CSSProperties } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Trash2, Edit2, Calendar, AlertCircle } from 'lucide-react';
import AdminLayout from '../AdminLayout/AdminLayout';
import {
  adminButtonStyles,
  adminInputStyles,
  adminPageHeaderStyles,
  adminPageTitleStyles,
} from '../AdminLayout/AdminLayout.styles';

interface Event {
  id: string;
  title: string;
  slug: string;
  date: string;
  time?: string;
  cancelled: boolean;
  activity: {
    id: string;
    title: string;
    slug: string;
  };
  _count: {
    reviews: number;
  };
}

interface ListState {
  events: Event[];
  total: number;
  pages: number;
  currentPage: number;
  loading: boolean;
  error: string | null;
  search: string;
  deleteConfirm: string | null;
}

const tableContainerStyles: CSSProperties = {
  width: '100%',
  backgroundColor: 'var(--color-background)',
  borderRadius: 'var(--radius-lg)',
  overflow: 'hidden',
  boxShadow: 'var(--shadow-sm)',
  marginBottom: 'var(--space-6)',
};

const tableHeaderStyles: CSSProperties = {
  display: 'flex',
  backgroundColor: 'var(--color-neutral-50)',
  padding: 'var(--space-3) var(--space-4)',
  borderBottom: '1px solid var(--color-border)',
  fontSize: 'var(--font-size-sm)',
  fontWeight: 'var(--font-weight-semibold)',
  color: 'var(--color-text)',
};

const tableRowStyles: CSSProperties = {
  display: 'flex',
  padding: 'var(--space-3) var(--space-4)',
  borderBottom: '1px solid var(--color-border)',
  alignItems: 'center',
  fontSize: 'var(--font-size-sm)',
  color: 'var(--color-text)',
};

const paginationStyles: CSSProperties = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: 'var(--space-4)',
  paddingTop: 'var(--space-4)',
};

const paginationButtonStyles: CSSProperties = {
  ...adminButtonStyles,
  fontSize: 'var(--font-size-sm)',
};

export default function EventsList() {
  const searchParams = useSearchParams();
  const filterActivityId = searchParams.get('activityId');
  
  const [state, setState] = useState<ListState>({
    events: [],
    total: 0,
    pages: 0,
    currentPage: 1,
    loading: true,
    error: null,
    search: '',
    deleteConfirm: null,
  });

  // Fetch events
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setState((prev) => ({ ...prev, loading: true, error: null }));
        const url = new URL('/api/admin/events', window.location.origin);
        url.searchParams.set('page', String(state.currentPage));
        url.searchParams.set('search', state.search);
        if (filterActivityId) {
          url.searchParams.set('activityId', filterActivityId);
        }
        
        const response = await fetch(url.toString());
        if (!response.ok) throw new Error('Failed to fetch events');
        const data = await response.json();
        setState((prev) => ({
          ...prev,
          events: data.data,
          total: data.total,
          pages: data.pages,
          loading: false,
        }));
      } catch (err) {
        setState((prev) => ({
          ...prev,
          error: err instanceof Error ? err.message : 'Failed to load events',
          loading: false,
        }));
      }
    };

    fetchEvents();
  }, [state.currentPage, state.search, filterActivityId]);

  const handleDelete = async (eventId: string) => {
    try {
      const response = await fetch(`/api/admin/events/${eventId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const data = await response.json();
        alert(data.error || 'Failed to delete event');
        return;
      }

      setState((prev) => ({
        ...prev,
        events: prev.events.filter((e) => e.id !== eventId),
        deleteConfirm: null,
      }));
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to delete event');
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <AdminLayout>
      <div style={adminPageHeaderStyles}>
        <h1 style={adminPageTitleStyles}>Events</h1>
      </div>

      <div style={{ display: 'flex', gap: 'var(--space-4)', marginBottom: 'var(--space-6)' }}>
        <input
          type="text"
          placeholder="Search events..."
          value={state.search}
          onChange={(e) =>
            setState((prev) => ({
              ...prev,
              search: e.target.value,
              currentPage: 1,
            }))
          }
          style={{
            ...adminInputStyles,
            flex: 1,
          }}
        />
        <Link href="/admin/events/new" style={adminButtonStyles}>
          + New Event
        </Link>
      </div>

      {filterActivityId && state.events.length > 0 && (
        <div
          style={{
            padding: 'var(--space-3)',
            backgroundColor: 'var(--color-info-100)',
            color: 'var(--color-info-700)',
            borderRadius: 'var(--radius-md)',
            marginBottom: 'var(--space-4)',
            fontSize: 'var(--font-size-sm)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <span>
            Showing events for <strong>{state.events[0].activity.title}</strong>
          </span>
          <Link 
            href="/admin/events"
            style={{
              color: 'var(--color-info-700)',
              textDecoration: 'underline',
              fontSize: 'var(--font-size-sm)',
            }}
          >
            Clear filter
          </Link>
        </div>
      )}

      {state.error && (
        <div
          style={{
            padding: 'var(--space-4)',
            backgroundColor: 'var(--color-error-100)',
            color: 'var(--color-error-700)',
            borderRadius: 'var(--radius-md)',
            marginBottom: 'var(--space-4)',
          }}
        >
          {state.error}
        </div>
      )}

      {state.loading ? (
        <div style={{ textAlign: 'center', padding: 'var(--space-8)' }}>
          Loading events...
        </div>
      ) : state.events.length === 0 ? (
        <div
          style={{
            textAlign: 'center',
            padding: 'var(--space-8)',
            color: 'var(--color-neutral-500)',
          }}
        >
          No events found
        </div>
      ) : (
        <>
          <div style={tableContainerStyles}>
            <div style={tableHeaderStyles}>
              <div style={{ flex: '0 0 30%' }}>Title</div>
              <div style={{ flex: '0 0 25%' }}>Activity</div>
              <div style={{ flex: '0 0 20%' }}>Date</div>
              <div style={{ flex: '0 0 12%' }}>Status</div>
              <div style={{ flex: '0 0 13%' }}>Actions</div>
            </div>
            {state.events.map((event) => (
              <div key={event.id} style={tableRowStyles}>
                <div style={{ flex: '0 0 30%', wordBreak: 'break-word' }}>
                  <strong>{event.title}</strong>
                </div>
                <div style={{ flex: '0 0 25%', wordBreak: 'break-word' }}>
                  {event.activity.title}
                </div>
                <div style={{ flex: '0 0 20%', display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                  <Calendar size={14} />
                  {formatDate(event.date)}
                </div>
                <div style={{ flex: '0 0 12%' }}>
                  {event.cancelled ? (
                    <span
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 'var(--space-1)',
                        padding: 'var(--space-1) var(--space-2)',
                        backgroundColor: 'var(--color-error-100)',
                        color: 'var(--color-error-700)',
                        borderRadius: 'var(--radius-sm)',
                        fontSize: 'var(--font-size-xs)',
                      }}
                    >
                      <AlertCircle size={12} />
                      Cancelled
                    </span>
                  ) : (
                    <span
                      style={{
                        padding: 'var(--space-1) var(--space-2)',
                        backgroundColor: 'var(--color-success-100)',
                        color: 'var(--color-success-700)',
                        borderRadius: 'var(--radius-sm)',
                        fontSize: 'var(--font-size-xs)',
                      }}
                    >
                      Active
                    </span>
                  )}
                </div>
                <div style={{ flex: '0 0 13%', display: 'flex', gap: 'var(--space-2)' }}>
                  <Link
                    href={`/admin/events/${event.id}/edit`}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      padding: 'var(--space-2)',
                      color: 'var(--color-primary-600)',
                      textDecoration: 'none',
                    }}
                    title="Edit"
                  >
                    <Edit2 size={16} />
                  </Link>
                  <button
                    onClick={() =>
                      setState((prev) => ({
                        ...prev,
                        deleteConfirm: state.deleteConfirm === event.id ? null : event.id,
                      }))
                    }
                    style={{
                      padding: 'var(--space-2)',
                      backgroundColor: 'transparent',
                      border: 'none',
                      color: 'var(--color-error-600)',
                      cursor: 'pointer',
                    }}
                    title="Delete"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
                {state.deleteConfirm === event.id && (
                  <div
                    style={{
                      position: 'absolute',
                      right: 'var(--space-4)',
                      backgroundColor: 'white',
                      border: '1px solid var(--color-error-300)',
                      borderRadius: 'var(--radius-md)',
                      padding: 'var(--space-3)',
                      zIndex: 10,
                      minWidth: '200px',
                    }}
                  >
                    <p style={{ margin: '0 0 var(--space-3) 0', fontSize: 'var(--font-size-sm)' }}>
                      Delete this event?
                    </p>
                    <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
                      <button
                        onClick={() => handleDelete(event.id)}
                        style={{
                          flex: 1,
                          padding: 'var(--space-2)',
                          backgroundColor: 'var(--color-error-600)',
                          color: 'white',
                          border: 'none',
                          borderRadius: 'var(--radius-md)',
                          cursor: 'pointer',
                          fontSize: 'var(--font-size-sm)',
                        }}
                      >
                        Delete
                      </button>
                      <button
                        onClick={() =>
                          setState((prev) => ({
                            ...prev,
                            deleteConfirm: null,
                          }))
                        }
                        style={{
                          flex: 1,
                          padding: 'var(--space-2)',
                          backgroundColor: 'var(--color-neutral-200)',
                          border: 'none',
                          borderRadius: 'var(--radius-md)',
                          cursor: 'pointer',
                          fontSize: 'var(--font-size-sm)',
                        }}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {state.pages > 1 && (
            <div style={paginationStyles}>
              <button
                onClick={() =>
                  setState((prev) => ({
                    ...prev,
                    currentPage: Math.max(1, prev.currentPage - 1),
                  }))
                }
                disabled={state.currentPage === 1}
                style={paginationButtonStyles}
              >
                Previous
              </button>
              <span style={{ fontSize: 'var(--font-size-sm)' }}>
                Page {state.currentPage} of {state.pages}
              </span>
              <button
                onClick={() =>
                  setState((prev) => ({
                    ...prev,
                    currentPage: Math.min(prev.pages, prev.currentPage + 1),
                  }))
                }
                disabled={state.currentPage === state.pages}
                style={paginationButtonStyles}
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </AdminLayout>
  );
}
