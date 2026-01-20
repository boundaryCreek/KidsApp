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
} from '../AdminLayout/AdminLayout.styles';
import { FormSection, TextAreaField, TextField } from '../AdminLayout/FormFields';
import { Organization, OrganizationFormData } from '../../../types';

interface OrganizationFormProps {
  organization?: Organization;
  isEdit?: boolean;
}

export default function OrganizationForm({ organization, isEdit = false }: OrganizationFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState<OrganizationFormData>({
    name: organization?.name || '',
    description: organization?.description || '',
    website: organization?.website || '',
    imageUrl: organization?.imageUrl || '',
  });

  const handleInputChange = <K extends keyof OrganizationFormData>(field: K, value: OrganizationFormData[K]) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);

    const payload = {
      name: formData.name,
      description: formData.description || null,
      website: formData.website || null,
      imageUrl: formData.imageUrl || null,
    };

    try {
      const url = isEdit && organization ? `/api/admin/organizations/${organization.id}` : '/api/admin/organizations';
      const method = isEdit ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        router.push('/admin/organizations');
      } else {
        const error = await response.json();
        alert(`Failed to ${isEdit ? 'update' : 'create'} organization: ${error.error || 'Unknown error'}`);
      }
    } catch (error) {
      console.error(`Error ${isEdit ? 'updating' : 'creating'} organization:`, error);
      alert(`Failed to ${isEdit ? 'update' : 'create'} organization`);
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
          />
          <TextAreaField
            label="Description"
            value={formData.description}
            onChange={(value) => handleInputChange('description', value)}
            placeholder="Brief description of the organization"
            disabled={loading}
            rows={4}
          />
        </FormSection>

        <FormSection title="Contact">
          <TextField
            label="Website"
            value={formData.website}
            onChange={(value) => handleInputChange('website', value)}
            type="url"
            placeholder="https://example.org"
            disabled={loading}
          />
        </FormSection>

        <FormSection title="Media">
          <TextField
            label="Image URL"
            value={formData.imageUrl}
            onChange={(value) => handleInputChange('imageUrl', value)}
            type="url"
            placeholder="https://example.org/logo.png"
            disabled={loading}
          />
        </FormSection>

        <div style={adminActionsStyles}>
          <Link href="/admin/organizations" style={adminButtonSecondaryStyles}>
            <ArrowLeft size={18} />
            Cancel
          </Link>
          <button type="submit" style={adminButtonStyles} disabled={loading}>
            <Save size={18} />
            {loading ? 'Saving...' : isEdit ? 'Update Organization' : 'Create Organization'}
          </button>
        </div>
      </form>
    </div>
  );
}
