'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Save } from 'lucide-react';
import Link from 'next/link';
import {
  adminCardStyles,
  adminFormStyles,
  adminActionsStyles,
  adminButtonStyles,
  adminButtonSecondaryStyles,
} from '../AdminLayout/AdminLayout.styles';
import {
  TextField,
  TextAreaField,
  SelectField,
  MultiSelectList,
  CheckboxField,
  FormSection,
  GridFields,
} from '../AdminLayout/FormFields';
import { FormBuilder } from '../AdminLayout/FormBuilder';

interface FormData {
  title: string;
  slug: string;
  description: string;
  organizer: string;
  time: string;
  costMin: string;
  costMax: string;
  costDisplay: string;
  isFree: boolean;
  imageUrl: string;
  featured: boolean;
  isActive: boolean;
  ageGroupId: string;
  locationId: string;
  categoryIds: string[];
}

interface Options {
  locations: Array<{ id: string; name: string; slug: string }>;
  ageGroups: Array<{ id: string; name: string; minAge: number | null; maxAge: number | null }>;
  categories: Array<{ id: string; name: string; slug: string; icon: string | null; color: string | null }>;
}

interface ActivityFormProps {
  activity?: any;
  isEdit?: boolean;
}

export default function ActivityForm({ activity, isEdit = false }: ActivityFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [loadingOptions, setLoadingOptions] = useState(true);
  const [options, setOptions] = useState<Options>({
    locations: [],
    ageGroups: [],
    categories: [],
  });
  
  const [formData, setFormData] = useState<FormData>({
    title: activity?.title || '',
    slug: activity?.slug || '',
    description: activity?.description || '',
    organizer: activity?.organizer || '',
    time: activity?.time || '',
    costMin: activity?.costMin?.toString() || '',
    costMax: activity?.costMax?.toString() || '',
    costDisplay: activity?.costDisplay || '',
    isFree: activity?.isFree || false,
    imageUrl: activity?.imageUrl || '',
    featured: activity?.featured || false,
    isActive: activity?.isActive !== undefined ? activity.isActive : true,
    ageGroupId: activity?.ageGroup?.id || '',
    locationId: activity?.location?.id || '',
    categoryIds: activity?.categories?.map((c: any) => c.id) || [],
  });

  // Fetch options on component mount
  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const response = await fetch('/api/admin/options');
        const data = await response.json();
        setOptions(data);
      } catch (error) {
        console.error('Error fetching options:', error);
      } finally {
        setLoadingOptions(false);
      }
    };

    fetchOptions();
  }, []);

  // Generate slug from title
  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  };

  const handleInputChange = (field: keyof FormData, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));

    // Auto-generate slug when title changes (only for new activities)
    if (field === 'title' && !isEdit) {
      setFormData(prev => ({
        ...prev,
        slug: generateSlug(value),
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const url = isEdit ? `/api/admin/activities/${activity.id}` : '/api/admin/activities';
      const method = isEdit ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        router.push('/admin/activities');
      } else {
        const error = await response.json();
        alert(`Failed to ${isEdit ? 'update' : 'create'} activity: ${error.error}`);
      }
    } catch (error) {
      console.error(`Error ${isEdit ? 'updating' : 'creating'} activity:`, error);
      alert(`Failed to ${isEdit ? 'update' : 'create'} activity`);
    } finally {
      setLoading(false);
    }
  };

  if (loadingOptions) {
    return (
      <div style={adminCardStyles}>
        <div style={{
          textAlign: 'center',
          padding: 'var(--space-8)',
          color: 'var(--color-text-secondary)',
        }}>
          Loading form options...
        </div>
      </div>
    );
  }

  return (
    <div style={adminCardStyles}>
      <form onSubmit={handleSubmit} style={adminFormStyles}>
        <FormSection title="Basic Information">
          <TextField
            label="Title"
            value={formData.title}
            onChange={(value) => handleInputChange('title', value)}
            required
            disabled={loading}
          />
          <TextField
            label="Slug"
            value={formData.slug}
            onChange={(value) => handleInputChange('slug', value)}
            required
            disabled={loading}
          />
          <TextAreaField
            label="Description"
            value={formData.description}
            onChange={(value) => handleInputChange('description', value)}
            required
            disabled={loading}
          />
          <TextField
            label="Organizer"
            value={formData.organizer}
            onChange={(value) => handleInputChange('organizer', value)}
            required
            disabled={loading}
          />
          <TextField
            label="Time"
            value={formData.time}
            onChange={(value) => handleInputChange('time', value)}
            placeholder="e.g., Weekdays 9:00 AM - 5:00 PM"
            disabled={loading}
          />
        </FormSection>

        <FormSection title="Relationships">
          <SelectField
            label="Age Group"
            options={options.ageGroups}
            value={formData.ageGroupId}
            onChange={(value) => handleInputChange('ageGroupId', value)}
            required
            disabled={loading}
          />
          <SelectField
            label="Location"
            options={options.locations}
            value={formData.locationId}
            onChange={(value) => handleInputChange('locationId', value)}
            placeholder="Select a location (optional)"
            disabled={loading}
          />
          <MultiSelectList
            label="Categories"
            options={options.categories}
            value={formData.categoryIds}
            onChange={(value) => handleInputChange('categoryIds', value)}
            helperText="Select one or more categories"
            disabled={loading}
          />
        </FormSection>

        <FormSection title="Pricing">
          <GridFields columns={3}>
            <TextField
              label="Min Cost"
              type="number"
              value={formData.costMin}
              onChange={(value) => handleInputChange('costMin', value)}
              step="0.01"
              min="0"
              disabled={loading || formData.isFree}
            />
            <TextField
              label="Max Cost"
              type="number"
              value={formData.costMax}
              onChange={(value) => handleInputChange('costMax', value)}
              step="0.01"
              min="0"
              disabled={loading || formData.isFree}
            />
            <TextField
              label="Cost Display"
              value={formData.costDisplay}
              onChange={(value) => handleInputChange('costDisplay', value)}
              placeholder="e.g., $10-$20 per child"
              disabled={loading || formData.isFree}
            />
          </GridFields>
          <CheckboxField
            label="Free Activity"
            checked={formData.isFree}
            onChange={(value) => handleInputChange('isFree', value)}
            disabled={loading}
          />
        </FormSection>

        <FormSection title="Media & Settings">
          <TextField
            label="Image URL"
            type="url"
            value={formData.imageUrl}
            onChange={(value) => handleInputChange('imageUrl', value)}
            placeholder="https://example.com/image.jpg"
            disabled={loading}
          />
          <CheckboxField
            label="Featured Activity"
            checked={formData.featured}
            onChange={(value) => handleInputChange('featured', value)}
            disabled={loading}
          />
          {isEdit && (
            <CheckboxField
              label="Active"
              checked={formData.isActive}
              onChange={(value) => handleInputChange('isActive', value)}
              disabled={loading}
            />
          )}
        </FormSection>

        {/* Actions */}
        <div style={adminActionsStyles}>
          <Link href="/admin/activities" style={adminButtonSecondaryStyles}>
            <ArrowLeft size={18} />
            Cancel
          </Link>
          
          <button
            type="submit"
            style={adminButtonStyles}
            disabled={loading}
          >
            <Save size={18} />
            {loading ? 'Saving...' : (isEdit ? 'Update Activity' : 'Create Activity')}
          </button>
        </div>
      </form>
    </div>
  );
}