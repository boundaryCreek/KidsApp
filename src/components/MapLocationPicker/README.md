# MapLocationPicker Component

A generic, reusable map location picker component using **OpenStreetMap** (completely free, no API key required).

## Features

- 🗺️ **Free Map Service**: Uses OpenStreetMap tiles (no API key needed)
- 📍 **Click to Select**: Click anywhere on the map to select a location
- 🔍 **Address Search**: Search for locations by address
- 🌍 **Reverse Geocoding**: Automatically gets address from coordinates
- 📮 **Complete Address Data**: Returns full address, city, state, postal code, and coordinates
- 🎨 **Design System**: Uses project CSS variables for consistent styling
- 📱 **Responsive**: Adjustable height and fully responsive

## Installation

Already installed! The following packages were added:
```bash
npm install leaflet react-leaflet @types/leaflet
```

## Usage

### Basic Example

```typescript
import MapLocationPicker from '@/components/MapLocationPicker';
import { MapLocation } from '@/types/map';

function MyComponent() {
  const handleLocationSelect = (location: MapLocation) => {
    console.log('Selected location:', location);
    // location contains: latitude, longitude, address, city, state, country, postalCode, displayName
  };

  return (
    <MapLocationPicker
      onLocationSelect={handleLocationSelect}
      height="500px"
      searchEnabled={true}
    />
  );
}
```

### With Initial Location

```typescript
import MapLocationPicker from '@/components/MapLocationPicker';
import { MapLocation } from '@/types/map';

function MyComponent() {
  const initialLocation: MapLocation = {
    latitude: 45.5017,
    longitude: -73.5673,
    city: 'Montreal',
    state: 'Quebec',
    country: 'Canada',
  };

  const handleLocationSelect = (location: MapLocation) => {
    console.log('Selected location:', location);
  };

  return (
    <MapLocationPicker
      initialLocation={initialLocation}
      onLocationSelect={handleLocationSelect}
      height="600px"
    />
  );
}
```

### In a Form

```typescript
'use client';

import { useState } from 'react';
import MapLocationPicker from '@/components/MapLocationPicker';
import { MapLocation } from '@/types/map';

export default function LocationForm() {
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    latitude: '',
    longitude: '',
    city: '',
  });

  const handleLocationSelect = (location: MapLocation) => {
    setFormData({
      ...formData,
      address: location.address || location.displayName || '',
      latitude: location.latitude.toString(),
      longitude: location.longitude.toString(),
      city: location.city || '',
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Submit form data
    console.log('Form data:', formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Location Name</label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
      </div>

      <div>
        <label>Select Location on Map</label>
        <MapLocationPicker
          onLocationSelect={handleLocationSelect}
          height="400px"
          searchEnabled={true}
        />
      </div>

      <div>
        <label>Address</label>
        <input type="text" value={formData.address} readOnly />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
        <div>
          <label>Latitude</label>
          <input type="text" value={formData.latitude} readOnly />
        </div>
        <div>
          <label>Longitude</label>
          <input type="text" value={formData.longitude} readOnly />
        </div>
      </div>

      <button type="submit">Save Location</button>
    </form>
  );
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `onLocationSelect` | `(location: MapLocation) => void` | **Required** | Callback when a location is selected |
| `initialLocation` | `MapLocation` | `undefined` | Initial location to display |
| `initialCenter` | `[number, number]` | `[45.5017, -73.5673]` | Initial map center (Montreal) |
| `initialZoom` | `number` | `13` | Initial zoom level |
| `height` | `string` | `'500px'` | Height of the map container |
| `searchEnabled` | `boolean` | `true` | Enable/disable address search |

## MapLocation Type

```typescript
interface MapLocation {
  latitude: number;           // Latitude coordinate
  longitude: number;          // Longitude coordinate
  address?: string;           // Street address
  city?: string;             // City name
  state?: string;            // State/Province
  country?: string;          // Country name
  postalCode?: string;       // Postal/ZIP code
  displayName?: string;      // Full formatted address
}
```

## Setup Required

### 1. Add Marker Icons

Download these files to `public/leaflet/`:
- `marker-icon.png` - [Download from Leaflet repo](https://github.com/Leaflet/Leaflet/tree/main/dist/images)
- `marker-icon-2x.png` - [Download from Leaflet repo](https://github.com/Leaflet/Leaflet/tree/main/dist/images)
- `marker-shadow.png` - [Download from Leaflet repo](https://github.com/Leaflet/Leaflet/tree/main/dist/images)

Or run:
```bash
# Create the directory if it doesn't exist
mkdir -p public/leaflet

# Download the marker images (curl or wget)
curl -o public/leaflet/marker-icon.png https://raw.githubusercontent.com/Leaflet/Leaflet/main/dist/images/marker-icon.png
curl -o public/leaflet/marker-icon-2x.png https://raw.githubusercontent.com/Leaflet/Leaflet/main/dist/images/marker-icon-2x.png
curl -o public/leaflet/marker-shadow.png https://raw.githubusercontent.com/Leaflet/Leaflet/main/dist/images/marker-shadow.png
```

### 2. Client Component

This component uses React hooks and browser APIs, so it must be used in client components (marked with `'use client'`).

## Geocoding Service

The component uses **Nominatim** (OpenStreetMap's free geocoding service):
- **No API key required**
- **Free to use** with fair usage policy
- Please add a proper User-Agent header (already configured as 'KidsApp/1.0')
- Rate limit: 1 request per second
- [Usage Policy](https://operations.osmfoundation.org/policies/nominatim/)

## Styling

The component uses the project's design system variables from `globals.css`. All colors, spacing, shadows, and borders are defined using CSS custom properties for consistency.

## Browser Compatibility

Requires a modern browser with support for:
- ES6+
- Fetch API
- CSS Grid
- CSS Custom Properties

Works in all modern browsers (Chrome, Firefox, Safari, Edge).
