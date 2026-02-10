'use client';

import { useState, useEffect, CSSProperties } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Save } from 'lucide-react';
import AdminLayout from '../AdminLayout/AdminLayout';
import {
  TextField,
  TextAreaField,
  CheckboxField,
  SelectField,
  FormSection,
} from '../AdminLayout/FormFields';
import {
  adminButtonStyles,
  adminButtonSecondaryStyles,
  adminFormStyles,
  adminActionsStyles,
  adminPageHeaderStyles,
  adminPageTitleStyles,
} from '../AdminLayout/AdminLayout.styles';

interface EventFormProps {
  eventId?: string;
  onSuccess?: () => void;
}

interface Activity {
  id: string;
  title: string;
  slug: string;
}

interface FormData {
  activityId: string;
  date: string;
  time: string;
  cancelled: boolean;
  notes: string;
  repeatPattern: 'none' | 'daily' | 'weekdays' | 'weekly' | 'biweekly' | 'monthly';
  repeatEnd?: string;
  repeatOccurrences?: number;
}

export default function EventForm({ eventId, onSuccess }: EventFormProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const preselectedActivityId = searchParams.get('activityId');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [formData, setFormData] = useState<FormData>({
    activityId: preselectedActivityId || '',
    date: '',
    time: '',
    cancelled: false,
    notes: '',
    repeatPattern: 'none',
    repeatEnd: undefined,
    repeatOccurrences: undefined,
  });

  // Fetch activities
  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await fetch('/api/activities?limit=1000');
        if (response.ok) {
          const activities = await response.json();
          setActivities(Array.isArray(activities) ? activities : []);
        }
      } catch (err) {
        console.error('Error fetching activities:', err);
      }
    };

    fetchActivities();
  }, []);

  // Fetch event data if editing
  useEffect(() => {
    if (!eventId) return;

    const fetchEvent = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/admin/events/${eventId}`);
        if (!response.ok) throw new Error('Failed to fetch event');
        const event = await response.json();
        
        setFormData({
          activityId: event.activityId,
          date: event.date ? new Date(event.date).toISOString().split('T')[0] : '',
          time: event.time || '',
          cancelled: event.cancelled || false,
          notes: event.notes || '',
          repeatPattern: 'none',
          repeatEnd: undefined,
          repeatOccurrences: undefined,
        });
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load event');
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [eventId]);

  const activityOptions = activities.map((activity) => ({
    id: activity.id,
    name: activity.title,
  }));

  const handleInputChange = (field: keyof FormData, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!formData.activityId) {
      setError('Activity is required');
      return;
    }

    if (!formData.date) {
      setError('Date is required');
      return;
    }

    try {
      setLoading(true);
      const activity = activities.find(a => a.id === formData.activityId);
      // For recurring events, don't include the date in the title
      const title = activity ? (
        formData.repeatPattern === 'none' 
          ? `${activity.title} - ${new Date(formData.date).toLocaleDateString()}`
          : activity.title
      ) : 'Event';
      
      const eventData = {
        ...formData,
        title,
      };

      const url = eventId ? `/api/admin/events/${eventId}` : '/api/admin/events';
      const method = eventId ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(eventData),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || `Failed to ${eventId ? 'update' : 'create'} event`);
      }

      if (onSuccess) {
        onSuccess();
      } else {
        router.push('/admin/events');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout>
      <div style={adminPageHeaderStyles}>
        <h1 style={adminPageTitleStyles}>
          {eventId ? 'Edit Event' : 'Create Event'}
        </h1>
      </div>

      <form onSubmit={handleSubmit} style={adminFormStyles}>
        {error && (
          <div
            style={{
              padding: 'var(--space-4)',
              backgroundColor: 'var(--color-error-100)',
              color: 'var(--color-error-700)',
              borderRadius: 'var(--radius-md)',
              marginBottom: 'var(--space-4)',
            }}
          >
            {error}
          </div>
        )}

        <div style={{ marginBottom: 'var(--space-6)' }}>
          <h2 style={{ fontSize: 'var(--font-size-lg)', fontWeight: 'var(--font-weight-semibold)', marginBottom: 'var(--space-4)', paddingBottom: 'var(--space-3)', borderBottom: '1px solid var(--color-border)' }}>Event Details</h2>
          <SelectField
            label="Activity"
            options={activityOptions}
            value={formData.activityId}
            onChange={(value) => handleInputChange('activityId', value)}
            required
            disabled={loading}
          />
        </div>

        <div style={{ marginBottom: 'var(--space-6)' }}>
          <h2 style={{ fontSize: 'var(--font-size-lg)', fontWeight: 'var(--font-weight-semibold)', marginBottom: 'var(--space-4)', paddingBottom: 'var(--space-3)', borderBottom: '1px solid var(--color-border)' }}>Date & Time</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
            <TextField
              label="Date"
              type="date"
              value={formData.date}
              onChange={(value) => handleInputChange('date', value)}
              required
              disabled={loading}
            />
            <TextField
              label="Time"
              type="time"
              value={formData.time}
              onChange={(value) => handleInputChange('time', value)}
              disabled={loading}
            />
          </div>
        </div>

        <div style={{ marginBottom: 'var(--space-6)' }}>
          <h2 style={{ fontSize: 'var(--font-size-lg)', fontWeight: 'var(--font-weight-semibold)', marginBottom: 'var(--space-4)', paddingBottom: 'var(--space-3)', borderBottom: '1px solid var(--color-border)' }}>Recurrence</h2>
          <SelectField
            label="Repeat"
            options={[
              { id: 'none', name: 'None' },
              { id: 'daily', name: 'Daily' },
              { id: 'weekdays', name: 'Weekdays (Mon-Fri)' },
              { id: 'weekly', name: 'Weekly' },
              { id: 'biweekly', name: 'Bi-weekly' },
              { id: 'monthly', name: 'Monthly' },
            ]}
            value={formData.repeatPattern}
            onChange={(value) => handleInputChange('repeatPattern', value)}
            disabled={loading}
          />
          {formData.repeatPattern !== 'none' && (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)', marginTop: 'var(--space-4)' }}>
              <TextField
                label="Repeat Until (optional)"
                type="date"
                value={formData.repeatEnd || ''}
                onChange={(value) => handleInputChange('repeatEnd', value || undefined)}
                disabled={loading}
              />
              <TextField
                label="Number of Occurrences (optional)"
                type="number"
                value={formData.repeatOccurrences ? String(formData.repeatOccurrences) : ''}
                onChange={(value) => handleInputChange('repeatOccurrences', value ? parseInt(value) : undefined)}
                placeholder="e.g., 12"
                min="1"
                disabled={loading}
              />
            </div>
          )}
        </div>

        <div style={{ marginBottom: 'var(--space-6)' }}>
          <h2 style={{ fontSize: 'var(--font-size-lg)', fontWeight: 'var(--font-weight-semibold)', marginBottom: 'var(--space-4)', paddingBottom: 'var(--space-3)', borderBottom: '1px solid var(--color-border)' }}>Status</h2>
          <CheckboxField
            label="Cancelled"
            checked={formData.cancelled}
            onChange={(value) => handleInputChange('cancelled', value)}
            disabled={loading}
          />
          <TextAreaField
            label="Notes"
            value={formData.notes}
            onChange={(value) => handleInputChange('notes', value)}
            placeholder="Internal notes (not visible to users)"
            disabled={loading}
          />
        </div>

        <div style={adminActionsStyles}>
          <Link href="/admin/events" style={adminButtonSecondaryStyles}>
            <ArrowLeft size={16} />
            Cancel
          </Link>
          <button
            type="submit"
            disabled={loading}
            style={{
              ...adminButtonStyles,
              opacity: loading ? 0.6 : 1,
              cursor: loading ? 'not-allowed' : 'pointer',
            }}
          >
            <Save size={16} />
            {loading ? 'Saving...' : eventId ? 'Update Event' : 'Create Event'}
          </button>
        </div>
      </form>
    </AdminLayout>
  );
}
