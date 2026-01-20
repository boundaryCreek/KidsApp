'use client';

import React, { useState } from 'react';
import { ArrowLeft, Save } from 'lucide-react';
import Link from 'next/link';
import {
  adminActionsStyles,
  adminButtonStyles,
  adminButtonSecondaryStyles,
  adminCardStyles,
  adminFormStyles,
} from '../AdminLayout/AdminLayout.styles';
import { FormSection, GridFields, TextAreaField, TextField } from '../AdminLayout/FormFields';
import { AgeGroupFormData } from '../../../types';

interface AgeGroupFormProps {
  ageGroup?: any;
  isEdit?: boolean;
}

export default function AgeGroupForm({ ageGroup, isEdit = false }: AgeGroupFormProps) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<AgeGroupFormData>({
    name: ageGroup?.name || '',
    minAge: ageGroup?.minAge?.toString() || '',
    maxAge: ageGroup?.maxAge?.toString() || '',
    description: ageGroup?.description || '',
  });

  const handleInputChange = (field: keyof AgeGroupFormData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const url = isEdit ? `/api/admin/age-groups/${ageGroup.id}` : '/api/admin/age-groups';
      const method = isEdit ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          minAge: formData.minAge === '' ? undefined : Number(formData.minAge),
          maxAge: formData.maxAge === '' ? undefined : Number(formData.maxAge),
          description: formData.description || null,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        alert(`Failed to ${isEdit ? 'update' : 'create'} age group: ${error.error}`);
        return;
      }

      window.location.href = '/admin/age-groups';
    } catch (err) {
      console.error('Error saving age group:', err);
      alert(`Failed to ${isEdit ? 'update' : 'create'} age group`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={adminCardStyles}>
      <form onSubmit={handleSubmit} style={adminFormStyles}>
        <FormSection title="Age Group Details">
          <TextField
            label="Name"
            value={formData.name}
            onChange={(value) => handleInputChange('name', value)}
            required
            disabled={loading}
          />
          <GridFields columns={2}>
            <TextField
              label="Min Age"
              type="number"
              value={formData.minAge}
              onChange={(value) => handleInputChange('minAge', value)}
              min={0}
              disabled={loading}
            />
            <TextField
              label="Max Age"
              type="number"
              value={formData.maxAge}
              onChange={(value) => handleInputChange('maxAge', value)}
              min={0}
              disabled={loading}
            />
          </GridFields>
          <TextAreaField
            label="Description"
            value={formData.description}
            onChange={(value) => handleInputChange('description', value)}
            placeholder="Optional description"
            rows={3}
            disabled={loading}
          />
        </FormSection>

        <div style={adminActionsStyles}>
          <Link href="/admin/age-groups" style={adminButtonSecondaryStyles}>
            <ArrowLeft size={18} />
            Cancel
          </Link>
          <button type="submit" style={adminButtonStyles} disabled={loading}>
            <Save size={18} />
            {loading ? 'Saving...' : (isEdit ? 'Update Age Group' : 'Create Age Group')}
          </button>
        </div>
      </form>
    </div>
  );
}
