"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import * as LucideIcons from 'lucide-react';
import { ArrowLeft, Save, Upload, X } from 'lucide-react';
import {
  adminActionsStyles,
  adminButtonSecondaryStyles,
  adminButtonStyles,
  adminCardStyles,
  adminFormStyles,
  adminInputStyles,
} from '../AdminLayout/AdminLayout.styles';
import { FormSection, GridFields, TextAreaField, TextField } from '../AdminLayout/FormFields';

// Popular icons for categories
const CATEGORY_ICONS = [
  'Palette', 'Music', 'Dumbbell', 'Book', 'Camera', 'Sparkles',
  'Rocket', 'Heart', 'Star', 'Zap', 'Trophy', 'Target',
  'Compass', 'Bike', 'Waves', 'Mountain', 'Sun', 'Moon',
  'Cloud', 'Leaf', 'Flower', 'TreePine', 'Flame', 'Snowflake',
  'Coffee', 'Pizza', 'IceCream', 'Cake', 'Apple', 'Carrot',
  'Gamepad2', 'Puzzle', 'Dice1', 'PartyPopper', 'Gift', 'Balloon',
  'Ticket', 'Theater', 'Film', 'Tv', 'Radio', 'Headphones',
  'Mic', 'Guitar', 'Piano', 'Drum', 'Paintbrush', 'PenTool',
  'Scissors', 'Wrench', 'Hammer', 'Lightbulb', 'Beaker', 'Microscope',
  'Globe', 'Map', 'Navigation', 'Plane', 'Ship', 'Train',
  'Car', 'Bus', 'Truck', 'Baby', 'Users', 'UserPlus',
  'Smile', 'Laugh', 'Frown', 'Meh', 'ThumbsUp', 'ThumbsDown',
  'CheckCircle', 'XCircle', 'AlertCircle', 'Info', 'HelpCircle', 'Settings',
] as const;

interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  icon: string;
  color: string;
}

interface CategoryFormData {
  name: string;
  slug: string;
  description: string;
  icon: string;
  color: string;
}

interface CategoryFormProps {
  category?: Category;
  isEdit?: boolean;
}

export default function CategoryForm({ category, isEdit = false }: CategoryFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const [formData, setFormData] = useState<CategoryFormData>({
    name: category?.name || '',
    slug: category?.slug || '',
    description: category?.description || '',
    icon: category?.icon || 'Palette',
    color: category?.color || '#3B82F6',
  });

  const handleInputChange = <K extends keyof CategoryFormData>(field: K, value: CategoryFormData[K]) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    // Auto-generate slug from name if creating new category
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

  const handleSVGUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.includes('svg') && !file.name.endsWith('.svg')) {
      setUploadError('Only SVG files are allowed');
      return;
    }

    // Validate file size (max 500KB)
    if (file.size > 500000) {
      setUploadError('File size must be less than 500KB');
      return;
    }

    setUploading(true);
    setUploadError(null);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('file', file);

      const response = await fetch('/api/admin/upload-icon', {
        method: 'POST',
        body: formDataToSend,
      });

      if (response.ok) {
        const data = await response.json();
        handleInputChange('icon', data.path);
        setUploadError(null);
      } else {
        const error = await response.json();
        setUploadError(error.error || 'Failed to upload SVG');
      }
    } catch (error) {
      console.error('Error uploading SVG:', error);
      setUploadError('Failed to upload SVG file');
    } finally {
      setUploading(false);
    }
  };

  const clearUploadedIcon = () => {
    handleInputChange('icon', 'Palette');
    setUploadError(null);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);

    const payload = {
      name: formData.name,
      slug: formData.slug,
      description: formData.description || null,
      icon: formData.icon,
      color: formData.color,
    };

    try {
      const url = isEdit && category ? `/api/admin/categories/${category.id}` : '/api/admin/categories';
      const method = isEdit ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        router.push('/admin/categories');
      } else {
        const error = await response.json();
        alert(`Failed to ${isEdit ? 'update' : 'create'} category: ${error.error || 'Unknown error'}`);
      }
    } catch (error) {
      console.error(`Error ${isEdit ? 'updating' : 'creating'} category:`, error);
      alert(`Failed to ${isEdit ? 'update' : 'create'} category`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={adminCardStyles}>
      <form onSubmit={handleSubmit} style={adminFormStyles}>
        <FormSection title="Basic Information">
          <TextField
            label="Name"
            value={formData.name}
            onChange={(value) => handleInputChange('name', value)}
            required
            disabled={loading}
            placeholder="e.g., Indoor Activities"
          />
          <TextField
            label="Slug"
            value={formData.slug}
            onChange={(value) => handleInputChange('slug', value)}
            required
            disabled={loading}
            placeholder="e.g., indoor-activities"
          />
          <TextAreaField
            label="Description"
            value={formData.description}
            onChange={(value) => handleInputChange('description', value)}
            placeholder="Brief description of the category"
            disabled={loading}
            rows={3}
          />
        </FormSection>

        <FormSection title="Display Settings">
          <GridFields columns={2}>
            <div>
              <label
                style={{
                  display: 'block',
                  fontSize: 'var(--font-size-sm)',
                  fontWeight: 'var(--font-weight-medium)',
                  marginBottom: 'var(--space-2)',
                  color: 'var(--color-neutral-700)',
                }}
              >
                Icon <span style={{ color: 'var(--color-error-600)' }}>*</span>
              </label>
              
              {/* SVG Upload Section */}
              <div style={{ marginBottom: 'var(--space-4)' }}>
                <label
                  htmlFor="svg-upload"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 'var(--space-2)',
                    padding: 'var(--space-3) var(--space-4)',
                    border: '2px dashed var(--color-neutral-300)',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: 'var(--color-neutral-50)',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    opacity: uploading ? 0.6 : 1,
                  }}
                  onMouseEnter={(e) => {
                    if (!uploading) e.currentTarget.style.backgroundColor = 'var(--color-primary-50)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'var(--color-neutral-50)';
                  }}
                >
                  <Upload size={16} />
                  <span style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-neutral-700)' }}>
                    {uploading ? 'Uploading...' : 'Upload SVG Icon'}
                  </span>
                </label>
                <input
                  id="svg-upload"
                  type="file"
                  accept=".svg"
                  onChange={handleSVGUpload}
                  disabled={uploading || loading}
                  style={{ display: 'none' }}
                />
                {uploadError && (
                  <div
                    style={{
                      marginTop: 'var(--space-2)',
                      padding: 'var(--space-2) var(--space-3)',
                      backgroundColor: 'var(--color-error-50)',
                      color: 'var(--color-error-700)',
                      borderRadius: 'var(--radius-md)',
                      fontSize: 'var(--font-size-sm)',
                    }}
                  >
                    {uploadError}
                  </div>
                )}
              </div>

              {/* Or fallback to predefined icons */}
              <div style={{ marginBottom: 'var(--space-2)' }}>
                <div
                  style={{
                    fontSize: 'var(--font-size-xs)',
                    color: 'var(--color-neutral-600)',
                    marginBottom: 'var(--space-2)',
                  }}
                >
                  Or choose a predefined icon:
                </div>
                <select
                  value={formData.icon.startsWith('/') ? 'custom' : formData.icon}
                  onChange={(e) => {
                    if (e.target.value !== 'custom') {
                      handleInputChange('icon', e.target.value);
                    }
                  }}
                  disabled={loading || uploading}
                  style={{
                    ...adminInputStyles,
                    width: '100%',
                  }}
                >
                  {formData.icon.startsWith('/') && (
                    <option value="custom">Custom SVG (Uploaded)</option>
                  )}
                  <option value="">Select an icon</option>
                  {CATEGORY_ICONS.map((iconName) => (
                    <option key={iconName} value={iconName}>
                      {iconName}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div>
              <label
                style={{
                  display: 'block',
                  fontSize: 'var(--font-size-sm)',
                  fontWeight: 'var(--font-weight-medium)',
                  marginBottom: 'var(--space-2)',
                  color: 'var(--color-neutral-700)',
                }}
              >
                Color
              </label>
              <div style={{ display: 'flex', gap: 'var(--space-2)', alignItems: 'center' }}>
                <input
                  type="color"
                  value={formData.color}
                  onChange={(e) => handleInputChange('color', e.target.value)}
                  disabled={loading}
                  style={{
                    width: '60px',
                    height: '40px',
                    border: '1px solid var(--color-neutral-300)',
                    borderRadius: 'var(--radius-md)',
                    cursor: 'pointer',
                  }}
                />
                <input
                  type="text"
                  value={formData.color}
                  onChange={(e) => handleInputChange('color', e.target.value)}
                  disabled={loading}
                  placeholder="#3B82F6"
                  style={{
                    flex: 1,
                    padding: 'var(--space-2) var(--space-3)',
                    border: '1px solid var(--color-neutral-300)',
                    borderRadius: 'var(--radius-md)',
                    fontSize: 'var(--font-size-base)',
                  }}
                />
              </div>
              <div
                style={{
                  fontSize: 'var(--font-size-xs)',
                  color: 'var(--color-text-secondary)',
                  marginTop: 'var(--space-1)',
                }}
              >
                Hex color code for category theme
              </div>
            </div>
          </GridFields>
          
          {/* Preview */}
          <div>
            <label
              style={{
                display: 'block',
                fontSize: 'var(--font-size-sm)',
                fontWeight: 'var(--font-weight-medium)',
                marginBottom: 'var(--space-2)',
                color: 'var(--color-neutral-700)',
              }}
            >
              Preview
            </label>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 'var(--space-2)',
                padding: 'var(--space-3) var(--space-4)',
                backgroundColor: formData.color,
                borderRadius: 'var(--radius-lg)',
                color: 'white',
                fontSize: 'var(--font-size-base)',
                fontWeight: 'var(--font-weight-medium)',
              }}
            >
              {formData.icon.startsWith('/') ? (
                <>
                  <img
                    src={formData.icon}
                    alt="Icon"
                    style={{
                      width: '24px',
                      height: '24px',
                      filter: 'brightness(0) invert(1)',
                    }}
                  />
                  <span>{formData.name || 'Category Name'}</span>
                  <button
                    type="button"
                    onClick={clearUploadedIcon}
                    style={{
                      background: 'rgba(255,255,255,0.2)',
                      border: 'none',
                      borderRadius: 'var(--radius-sm)',
                      padding: 'var(--space-1)',
                      cursor: 'pointer',
                      color: 'white',
                      display: 'flex',
                      alignItems: 'center',
                      marginLeft: 'var(--space-2)',
                    }}
                  >
                    <X size={16} />
                  </button>
                </>
              ) : (
                <>
                  <span style={{ fontSize: 'var(--font-size-xl)' }}>{formData.icon}</span>
                  <span>{formData.name || 'Category Name'}</span>
                </>
              )}
            </div>
          </div>
        </FormSection>

        <div style={adminActionsStyles}>
          <Link href="/admin/categories" style={adminButtonSecondaryStyles}>
            <ArrowLeft size={18} />
            Cancel
          </Link>
          <button type="submit" style={adminButtonStyles} disabled={loading}>
            <Save size={18} />
            {loading ? 'Saving...' : isEdit ? 'Update Category' : 'Create Category'}
          </button>
        </div>
      </form>
    </div>
  );
}
