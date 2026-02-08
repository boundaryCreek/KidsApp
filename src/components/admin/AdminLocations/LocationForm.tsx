"use client";

import React, { useEffect, useMemo, useState } from 'react';
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
import {
  CheckboxField,
  FormSection,
  GridFields,
  MultiSelectList,
  SelectField,
  TextAreaField,
  TextField,
} from '../AdminLayout/FormFields';
import OperatingHoursInput from './OperatingHoursInput';
import SocialMediaInput from './SocialMediaInput';
import {
  AccessibilityFeature,
  CostRange,
  Location,
  LocationFormData,
  LocationFormOptions,
  LocationType,
  MapLocation,
  ParkingType,
} from '../../../types';

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

const costRangeOptions: Array<{ id: CostRange; name: string }> = [
  { id: 'FREE', name: 'Free' },
  { id: 'BUDGET', name: '$ ($1-10)' },
  { id: 'MODERATE', name: '$$ ($20-30)' },
  { id: 'EXPENSIVE', name: '$$$ ($30+)' },
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
  ageGroups: [],
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
    summary: location?.summary || '',
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
    costRange: (location?.costRange as CostRange) || '',
    publicTransport: location?.publicTransport || '',
    operatingHours: location?.operatingHours ? JSON.stringify(location.operatingHours) : '',
    timezone: location?.timezone || 'America/Chicago',
    socialMedia: location?.socialMedia ? JSON.stringify(location.socialMedia) : '',
    organizationId: location?.organization?.id || '',
    cityId: location?.city?.id || '',
    categoryIds: location?.categories?.map((category) => category.id) || [],
    ageGroupIds: location?.ageGroups?.map((ageGroup) => ageGroup.id) || [],
    tagIds: location?.tags?.map((tag) => tag.id) || [],
    isActive: location?.isActive ?? true,
  });

  const organizationOptions = useMemo(() => options.organizations || [], [options.organizations]);
  const cityOptions = useMemo(() => options.cities || [], [options.cities]);
  const categoryOptions = useMemo(() => options.categories || [], [options.categories]);
  const ageGroupOptions = useMemo(() => options.ageGroups || [], [options.ageGroups]);
  const tagOptions = useMemo(() => options.tags || [], [options.tags]);

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const response = await fetch('/api/admin/options');
        const data = await response.json();
        setOptions({
          organizations: data.organizations || [],
          cities: data.cities || [],
          categories: data.categories || [],
          ageGroups: data.ageGroups || [],
          tags: data.tags || [],
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

  const handleLocationSelect = (location: MapLocation) => {
    setFormData((prev) => ({
      ...prev,
      latitude: location.latitude.toFixed(6),
      longitude: location.longitude.toFixed(6),
      address: location.address || location.displayName || prev.address,
    }));

    // Try to match the city from the map location to an existing city in the dropdown
    if (location.city && cityOptions.length > 0) {
      const matchingCity = cityOptions.find(
        (city) => city.name.toLowerCase() === location.city?.toLowerCase()
      );
      if (matchingCity) {
        setFormData((prev) => ({
          ...prev,
          cityId: matchingCity.id,
        }));
      }
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
      summary: formData.summary || null,
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
      costRange: formData.costRange || null,
      publicTransport: formData.publicTransport || null,
      operatingHours: parseJsonField(formData.operatingHours),
      timezone: formData.timezone || 'America/Chicago',
      socialMedia: parseJsonField(formData.socialMedia),
      organizationId: formData.organizationId,
      cityId: formData.cityId || null,
      categoryIds: formData.categoryIds,
      ageGroupIds: formData.ageGroupIds,
      tagIds: formData.tagIds,
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
          <TextAreaField
            label="Summary (Short description for previews)"
            value={formData.summary}
            onChange={(value) => handleInputChange('summary', value)}
            placeholder="Brief 1-2 sentence summary of this location"
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
            <SelectField
              label="Cost Range"
              options={costRangeOptions}
              value={formData.costRange || ''}
              onChange={(value) => handleInputChange('costRange', value as CostRange)}
              placeholder="Select cost range"
              disabled={loading}
            />
          </GridFields>
          <TextField
            label="Public Transport"
            value={formData.publicTransport}
            onChange={(value) => handleInputChange('publicTransport', value)}
            placeholder="Nearest station or bus routes"
            disabled={loading}
          />
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
          <MultiSelectList
            label="Age Groups"
            options={ageGroupOptions}
            value={formData.ageGroupIds}
            onChange={(value) => handleInputChange('ageGroupIds', value)}
            helperText="Select suitable age groups for this location"
            disabled={loading}
          />
          <MultiSelectList
            label="Tags"
            options={tagOptions}
            value={formData.tagIds}
            onChange={(value) => handleInputChange('tagIds', value)}
            helperText="Select tags to help users discover this location"
            disabled={loading}
          />
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
          <div style={{ marginBottom: 'var(--space-6)' }}>
            <label
              style={{
                display: 'block',
                fontSize: 'var(--font-size-sm)',
                fontWeight: 'var(--font-weight-medium)',
                marginBottom: 'var(--space-3)',
                color: 'var(--color-neutral-700)',
              }}
            >
              Operating Hours
            </label>
            <OperatingHoursInput
              value={formData.operatingHours}
              onChange={(value) => handleInputChange('operatingHours', value)}
              disabled={loading}
            />
          </div>
          <SelectField
            label="Timezone"
            options={[
              { id: 'America/New_York', name: 'Eastern Time (ET)' },
              { id: 'America/Chicago', name: 'Central Time (CT)' },
              { id: 'America/Denver', name: 'Mountain Time (MT)' },
              { id: 'America/Phoenix', name: 'Mountain Time - Arizona (MT)' },
              { id: 'America/Los_Angeles', name: 'Pacific Time (PT)' },
              { id: 'America/Anchorage', name: 'Alaska Time (AKT)' },
              { id: 'Pacific/Honolulu', name: 'Hawaii Time (HT)' },
            ]}
            value={formData.timezone}
            onChange={(value) => handleInputChange('timezone', value)}
            disabled={loading}
          />
          <div style={{ marginBottom: 'var(--space-6)' }}>
            <label
              style={{
                display: 'block',
                fontSize: 'var(--font-size-sm)',
                fontWeight: 'var(--font-weight-medium)',
                marginBottom: 'var(--space-3)',
                color: 'var(--color-neutral-700)',
              }}
            >
              Social Media Links
            </label>
            <SocialMediaInput
              value={formData.socialMedia}
              onChange={(value) => handleInputChange('socialMedia', value)}
              disabled={loading}
            />
          </div>
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
