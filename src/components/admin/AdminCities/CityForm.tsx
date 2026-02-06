"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import { ArrowLeft, Save } from 'lucide-react';
import {
  adminActionsStyles,
  adminButtonSecondaryStyles,
  adminButtonStyles,
  adminCardStyles,
  adminFormStyles,
} from '../AdminLayout/AdminLayout.styles';
import { FormSection, GridFields, TextAreaField, TextField } from '../AdminLayout/FormFields';
import { City, CityFormData, MapLocation } from '../../../types';

// Dynamically import MapLocationPicker with no SSR
const MapLocationPicker = dynamic(() => import('../../MapLocationPicker'), {
  ssr: false,
  loading: () => (
    <div
      style={{
        height: '400px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'var(--color-neutral-100)',
        borderRadius: 'var(--radius-lg)',
      }}
    >
      Loading map...
    </div>
  ),
});

interface CityFormProps {
  city?: City;
  isEdit?: boolean;
}

export default function CityForm({ city, isEdit = false }: CityFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState<CityFormData>({
    name: city?.name || '',
    description: city?.description || '',
    latitude: city?.latitude !== null && city?.latitude !== undefined ? city.latitude.toString() : '',
    longitude: city?.longitude !== null && city?.longitude !== undefined ? city.longitude.toString() : '',
  });

  const handleInputChange = <K extends keyof CityFormData>(field: K, value: CityFormData[K]) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleLocationSelect = (location: MapLocation) => {
    setFormData((prev) => ({
      ...prev,
      latitude: location.latitude.toFixed(6),
      longitude: location.longitude.toFixed(6),
    }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);

    const payload = {
      name: formData.name,
      description: formData.description || null,
      latitude: formData.latitude ? parseFloat(formData.latitude) : null,
      longitude: formData.longitude ? parseFloat(formData.longitude) : null,
    };

    try {
      const url = isEdit && city ? `/api/admin/cities/${city.id}` : '/api/admin/cities';
      const method = isEdit ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        router.push('/admin/cities');
      } else {
        const error = await response.json();
        alert(`Failed to ${isEdit ? 'update' : 'create'} city: ${error.error || 'Unknown error'}`);
      }
    } catch (error) {
      console.error(`Error ${isEdit ? 'updating' : 'creating'} city:`, error);
      alert(`Failed to ${isEdit ? 'update' : 'create'} city`);
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
            placeholder="Brief description of the city"
            disabled={loading}
            rows={3}
          />
        </FormSection>

        <FormSection title="Location">
          <div style={{ marginBottom: 'var(--space-4)' }}>
            <label
              style={{
                display: 'block',
                fontSize: 'var(--font-size-sm)',
                fontWeight: 'var(--font-weight-medium)',
                marginBottom: 'var(--space-2)',
                color: 'var(--color-neutral-700)',
              }}
            >
              Select Location on Map
            </label>
            <MapLocationPicker
              initialLocation={
                formData.latitude && formData.longitude
                  ? {
                      latitude: parseFloat(formData.latitude),
                      longitude: parseFloat(formData.longitude),
                    }
                  : undefined
              }
              onLocationSelect={handleLocationSelect}
              height="400px"
              searchEnabled={true}
            />
          </div>
          <GridFields columns={2}>
            <TextField
              label="Latitude"
              value={formData.latitude}
              onChange={(value) => handleInputChange('latitude', value)}
              type="number"
              step="0.000001"
              placeholder="e.g., 45.5017"
              disabled={loading}
            />
            <TextField
              label="Longitude"
              value={formData.longitude}
              onChange={(value) => handleInputChange('longitude', value)}
              type="number"
              step="0.000001"
              placeholder="e.g., -73.5673"
              disabled={loading}
            />
          </GridFields>
        </FormSection>

        <div style={adminActionsStyles}>
          <Link href="/admin/cities" style={adminButtonSecondaryStyles}>
            <ArrowLeft size={18} />
            Cancel
          </Link>
          <button type="submit" style={adminButtonStyles} disabled={loading}>
            <Save size={18} />
            {loading ? 'Saving...' : isEdit ? 'Update City' : 'Create City'}
          </button>
        </div>
      </form>
    </div>
  );
}
