"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Save } from 'lucide-react';
import {
  adminActionsStyles,
  adminButtonSecondaryStyles,
  adminButtonStyles,
  adminCardStyles,
  adminFormStyles,
  adminInputStyles,
} from '../AdminLayout/AdminLayout.styles';
import { FormSection, TextField } from '../AdminLayout/FormFields';

interface Tag {
  id: string;
  name: string;
  slug: string;
  color: string | null;
  isActive: boolean;
}

interface TagFormData {
  name: string;
  slug: string;
  color: string;
  isActive: boolean;
}

interface TagFormProps {
  tag?: Tag;
  isEdit?: boolean;
}

export default function TagForm({ tag, isEdit = false }: TagFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState<TagFormData>({
    name: tag?.name || '',
    slug: tag?.slug || '',
    color: tag?.color || '#3B82F6',
    isActive: tag?.isActive !== false,
  });

  const handleInputChange = <K extends keyof TagFormData>(field: K, value: TagFormData[K]) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    // Auto-generate slug from name if creating new tag
    if (field === 'name' && !isEdit) {
      const slug = value
        .toString()
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, '')
        .replace(/[\s_-]+/g, '-')
        .replace(/^-+|-+$/g, '');
      
      setFormData((prev) => ({
        ...prev,
        slug,
      }));
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError('');

    try {
      const payload = {
        name: formData.name,
        slug: formData.slug,
        color: formData.color || null,
        isActive: formData.isActive,
      };

      const url = isEdit ? `/api/admin/tags/${tag?.id}` : '/api/admin/tags';
      const method = isEdit ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to save tag');
      }

      router.push('/admin/tags');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save tag');
      setLoading(false);
    }
  };

  return (
    <div style={adminFormStyles}>
      <div style={adminActionsStyles}>
        <Link href="/admin/tags" style={adminButtonSecondaryStyles}>
          <ArrowLeft size={18} />
          Back
        </Link>
      </div>

      <form onSubmit={handleSubmit} style={adminCardStyles}>
        {error && (
          <div style={{
            padding: 'var(--space-4)',
            backgroundColor: 'var(--color-error-100)',
            color: 'var(--color-error-700)',
            borderRadius: 'var(--radius-lg)',
            marginBottom: 'var(--space-6)',
          }}>
            {error}
          </div>
        )}

        <FormSection title="Tag Information">
          <TextField
            label="Name"
            value={formData.name}
            onChange={(value) => handleInputChange('name', value)}
            placeholder="e.g., Outdoor Activities"
            disabled={loading}
            required
          />
          
          <TextField
            label="Slug"
            value={formData.slug}
            onChange={(value) => handleInputChange('slug', value)}
            placeholder="e.g., outdoor-activities"
            disabled={loading}
          />

          <div>
            <label style={{ 
              display: 'block', 
              marginBottom: 'var(--space-2)',
              fontWeight: 'var(--font-weight-medium)',
            }}>
              Color
            </label>
            <input
              type="color"
              value={formData.color}
              onChange={(e) => handleInputChange('color', e.target.value)}
              disabled={loading}
              style={{
                ...adminInputStyles,
                width: '60px',
                height: '40px',
                padding: '2px',
                cursor: 'pointer',
              }}
            />
            <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-neutral-600)', marginTop: 'var(--space-1)' }}>
              Color for the tag badge
            </p>
          </div>

          <div>
            <label style={{ 
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--space-2)',
              cursor: 'pointer',
            }}>
              <input
                type="checkbox"
                checked={formData.isActive}
                onChange={(e) => handleInputChange('isActive', e.target.checked)}
                disabled={loading}
              />
              <span>Active</span>
            </label>
            <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-neutral-600)', marginTop: 'var(--space-1)' }}>
              Inactive tags won't appear in location forms
            </p>
          </div>
        </FormSection>

        <div style={adminActionsStyles}>
          <button
            type="submit"
            disabled={loading}
            style={{
              ...adminButtonStyles,
              opacity: loading ? 0.5 : 1,
              cursor: loading ? 'not-allowed' : 'pointer',
            }}
          >
            <Save size={18} />
            {loading ? 'Saving...' : `${isEdit ? 'Update' : 'Create'} Tag`}
          </button>
        </div>
      </form>
    </div>
  );
}
