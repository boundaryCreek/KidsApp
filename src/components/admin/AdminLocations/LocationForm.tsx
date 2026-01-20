"use client";

import React, { useEffect, useMemo, useState } from 'react';
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
import {
  CheckboxField,
  FormSection,
  GridFields,
  MultiSelectList,
  SelectField,
  TextAreaField,
  TextField,
} from '../AdminLayout/FormFields';
import {
  AccessibilityFeature,
  Location,
  LocationFormData,
  LocationFormOptions,
  LocationType,
  ParkingType,
} from '../../../types';

interface LocationFormProps {
  location?: Location;
  isEdit?: boolean;
}

const locationTypeOptions: Array<{ id: LocationType; name: string }> = [
  { id: 'VENUE', name: 'Venue' },
  { id: 'ORGANIZATION', name: 'Organization' },
  { id: 'FACILITY', name: 'Facility' },
  { id: 'OUTDOOR', name: 'Outdoor' },
  { id: 'ONLINE', name: 'Online' },
];

const parkingOptions: Array<{ id: ParkingType; name: string }> = [
  { id: 'FREE', name: 'Free' },
  { id: 'PAID', name: 'Paid' },
  { id: 'STREET', name: 'Street' },
  { id: 'NONE', name: 'None' },
];

const accessibilityOptions: Array<{ id: AccessibilityFeature; name: string }> = [
  { id: 'WHEELCHAIR_ACCESSIBLE', name: 'Wheelchair accessible' },
  { id: 'STROLLER_FRIENDLY', name: 'Stroller friendly' },
  { id: 'SENSORY_FRIENDLY', name: 'Sensory friendly' },
  { id: 'ASL_INTERPRETER_AVAILABLE', name: 'ASL interpreter available' },
  { id: 'OTHER', name: 'Other' },
];

const initialOptions: LocationFormOptions = {
  organizations: [],
  cities: [],
  categories: [],
};

const generateSlug = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

const normalizeAmenities = (value: string) =>
  value
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);

const parseJsonField = (value: string) => {
  if (!value.trim()) return null;
  try {
    return JSON.parse(value);
  } catch (error) {
    console.warn('Unable to parse JSON field, storing raw value', error);
    return value;
  }
};

export default function LocationForm({ location, isEdit = false }: LocationFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [loadingOptions, setLoadingOptions] = useState(true);
  const [options, setOptions] = useState<LocationFormOptions>(initialOptions);

  const [formData, setFormData] = useState<LocationFormData>({
    name: location?.name || '',
    slug: location?.slug || '',
    type: location?.type || 'VENUE',
    description: location?.description || '',
    address: location?.address || '',
    latitude: location?.latitude !== null && location?.latitude !== undefined ? location.latitude.toString() : '',
    longitude: location?.longitude !== null && location?.longitude !== undefined ? location.longitude.toString() : '',
    phone: location?.phone || '',
    email: location?.email || '',
    website: location?.website || '',
    imageUrl: location?.imageUrl || '',
    amenitiesInput: location?.amenities?.join(', ') || '',
    accessibility: (location?.accessibility as AccessibilityFeature[]) || [],
    capacity: location?.capacity !== null && location?.capacity !== undefined ? location.capacity.toString() : '',
    parking: (location?.parking as ParkingType) || '',
    publicTransport: location?.publicTransport || '',
    operatingHours: location?.operatingHours ? JSON.stringify(location.operatingHours) : '',
    socialMedia: location?.socialMedia ? JSON.stringify(location.socialMedia) : '',
    organizationId: location?.organization?.id || '',
    cityId: location?.city?.id || '',
    categoryIds: location?.categories?.map((category) => category.id) || [],
    isActive: location?.isActive ?? true,
  });

  const organizationOptions = useMemo(() => options.organizations, [options.organizations]);
  const cityOptions = useMemo(() => options.cities, [options.cities]);
  const categoryOptions = useMemo(() => options.categories, [options.categories]);

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const response = await fetch('/api/admin/options');
        const data = await response.json();
        setOptions({
          organizations: data.organizations || [],
          cities: data.cities || [],
          categories: data.categories || [],
        });
      } catch (error) {
        console.error('Error fetching location form options:', error);
      } finally {
        setLoadingOptions(false);
      }
    };

    fetchOptions();
  }, []);

  const handleInputChange = <K extends keyof LocationFormData>(field: K, value: LocationFormData[K]) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    if (field === 'name' && !isEdit) {
      setFormData((prev) => ({
        ...prev,
        slug: generateSlug(String(value)),
      }));
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);

    const payload = {
      name: formData.name,
      slug: formData.slug,
      type: formData.type,
      description: formData.description,
      address: formData.address || null,
      latitude: formData.latitude ? parseFloat(formData.latitude) : null,
      longitude: formData.longitude ? parseFloat(formData.longitude) : null,
      phone: formData.phone || null,
      email: formData.email || null,
      website: formData.website || null,
      imageUrl: formData.imageUrl || null,
      amenities: normalizeAmenities(formData.amenitiesInput),
      capacity: formData.capacity ? parseInt(formData.capacity, 10) : null,
      accessibility: formData.accessibility,
      parking: formData.parking || null,
      publicTransport: formData.publicTransport || null,
      operatingHours: parseJsonField(formData.operatingHours),
      socialMedia: parseJsonField(formData.socialMedia),
      organizationId: formData.organizationId,
      cityId: formData.cityId || null,
      categoryIds: formData.categoryIds,
      ...(isEdit ? { isActive: formData.isActive } : {}),
    };

    try {
      const url = isEdit && location ? `/api/admin/locations/${location.id}` : '/api/admin/locations';
      const method = isEdit ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        router.push('/admin/locations');
      } else {
        const error = await response.json();
        alert(`Failed to ${isEdit ? 'update' : 'create'} location: ${error.error || 'Unknown error'}`);
      }
    } catch (error) {
      console.error(`Error ${isEdit ? 'updating' : 'creating'} location:`, error);
      alert(`Failed to ${isEdit ? 'update' : 'create'} location`);
    } finally {
      setLoading(false);
    }
  };

  if (loadingOptions) {
    return (
      <div style={adminCardStyles}>
        <div
          style={{
            textAlign: 'center',
            padding: 'var(--space-8)',
            color: 'var(--color-text-secondary)',
          }}
        >
          Loading form options...
        </div>
      </div>
    );
  }

  return (
    <div style={adminCardStyles}>
      <form onSubmit={handleSubmit} style={adminFormStyles}>
        <FormSection title="Basic Information">
          <GridFields>
            <TextField
              label="Name"
              value={formData.name}
              onChange={(value) => handleInputChange('name', value)}
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
          </GridFields>
          <GridFields>
            <SelectField
              label="Type"
              options={locationTypeOptions}
              value={formData.type}
              onChange={(value) => handleInputChange('type', value as LocationType)}
              required
              disabled={loading}
            />
          </GridFields>
          <TextAreaField
            label="Description"
            value={formData.description}
            onChange={(value) => handleInputChange('description', value)}
            required
            disabled={loading}
          />
        </FormSection>

        <FormSection title="Location Details">
          <TextField
            label="Address"
            value={formData.address}
            onChange={(value) => handleInputChange('address', value)}
            placeholder="123 Main St, Suite 100"
            disabled={loading}
          />
          <GridFields columns={3}>
            <SelectField
              label="City"
              options={cityOptions}
              value={formData.cityId}
              onChange={(value) => handleInputChange('cityId', value)}
              placeholder="Select a city (optional)"
              disabled={loading}
            />
            <TextField
              label="Latitude"
              value={formData.latitude}
              onChange={(value) => handleInputChange('latitude', value)}
              type="number"
              step="0.000001"
              disabled={loading}
            />
            <TextField
              label="Longitude"
              value={formData.longitude}
              onChange={(value) => handleInputChange('longitude', value)}
              type="number"
              step="0.000001"
              disabled={loading}
            />
          </GridFields>
          <GridFields columns={3}>
            <TextField
              label="Capacity"
              value={formData.capacity}
              onChange={(value) => handleInputChange('capacity', value)}
              type="number"
              min="0"
              disabled={loading}
            />
            <SelectField
              label="Parking"
              options={parkingOptions}
              value={formData.parking || ''}
              onChange={(value) => handleInputChange('parking', value as ParkingType)}
              placeholder="Select parking"
              disabled={loading}
            />
            <TextField
              label="Public Transport"
              value={formData.publicTransport}
              onChange={(value) => handleInputChange('publicTransport', value)}
              placeholder="Nearest station or bus routes"
              disabled={loading}
            />
          </GridFields>
        </FormSection>

        <FormSection title="Contact & Media">
          <GridFields columns={3}>
            <TextField
              label="Phone"
              value={formData.phone}
              onChange={(value) => handleInputChange('phone', value)}
              disabled={loading}
            />
            <TextField
              label="Email"
              value={formData.email}
              onChange={(value) => handleInputChange('email', value)}
              type="email"
              disabled={loading}
            />
            <TextField
              label="Website"
              value={formData.website}
              onChange={(value) => handleInputChange('website', value)}
              type="url"
              disabled={loading}
            />
          </GridFields>
          <TextField
            label="Image URL"
            value={formData.imageUrl}
            onChange={(value) => handleInputChange('imageUrl', value)}
            type="url"
            placeholder="https://example.com/location.jpg"
            disabled={loading}
          />
        </FormSection>

        <FormSection title="Classification">
          <GridFields columns={2}>
            <SelectField
              label="Organization"
              options={organizationOptions}
              value={formData.organizationId}
              onChange={(value) => handleInputChange('organizationId', value)}
              required
              disabled={loading}
            />
            <MultiSelectList
              label="Categories"
              options={categoryOptions}
              value={formData.categoryIds}
              onChange={(value) => handleInputChange('categoryIds', value)}
              helperText="Select one or more categories"
              disabled={loading}
            />
          </GridFields>
        </FormSection>

        <FormSection title="Amenities & Accessibility">
          <TextAreaField
            label="Amenities"
            value={formData.amenitiesInput}
            onChange={(value) => handleInputChange('amenitiesInput', value)}
            placeholder="List amenities separated by commas (e.g., Playground, Wi-Fi, Restrooms)"
            disabled={loading}
            rows={3}
          />
          <MultiSelectList
            label="Accessibility"
            options={accessibilityOptions}
            value={formData.accessibility}
            onChange={(value) => handleInputChange('accessibility', value as AccessibilityFeature[])}
            helperText="Select all accessibility features that apply"
            disabled={loading}
          />
        </FormSection>

        <FormSection title="Advanced">
          <GridFields columns={2}>
            <TextAreaField
              label="Operating Hours (JSON)"
              value={formData.operatingHours}
              onChange={(value) => handleInputChange('operatingHours', value)}
              placeholder='{"monday": "9:00-17:00"}'
              disabled={loading}
            />
            <TextAreaField
              label="Social Media (JSON)"
              value={formData.socialMedia}
              onChange={(value) => handleInputChange('socialMedia', value)}
              placeholder='{"instagram": "@example"}'
              disabled={loading}
            />
          </GridFields>
          {isEdit && (
            <CheckboxField
              label="Active"
              checked={formData.isActive}
              onChange={(value) => handleInputChange('isActive', value)}
              disabled={loading}
            />
          )}
        </FormSection>

        <div style={adminActionsStyles}>
          <Link href="/admin/locations" style={adminButtonSecondaryStyles}>
            <ArrowLeft size={18} />
            Cancel
          </Link>
          <button type="submit" style={adminButtonStyles} disabled={loading}>
            <Save size={18} />
            {loading ? 'Saving...' : isEdit ? 'Update Location' : 'Create Location'}
          </button>
        </div>
      </form>
    </div>
  );
}
