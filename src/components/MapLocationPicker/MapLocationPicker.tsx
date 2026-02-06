'use client';

import React, { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import { Map as LeafletMap, Icon, LatLngExpression } from 'leaflet';
import { MapPin, Search } from 'lucide-react';
import { MapLocationPickerProps, MapLocation, NominatimResponse } from '../../types/map';
import {
  mapContainerStyles,
  searchBoxStyles,
  searchInputStyles,
  searchButtonStyles,
  infoBoxStyles,
  infoTitleStyles,
  infoTextStyles,
  coordinatesStyles,
  loadingOverlayStyles,
} from './MapLocationPicker.styles';

// Import Leaflet CSS
import 'leaflet/dist/leaflet.css';

// Fix for default marker icon in Next.js
if (typeof window !== 'undefined') {
  delete (Icon.Default.prototype as any)._getIconUrl;
  Icon.Default.mergeOptions({
    iconRetinaUrl: '/leaflet/marker-icon-2x.png',
    iconUrl: '/leaflet/marker-icon.png',
    shadowUrl: '/leaflet/marker-shadow.png',
  });
}

/**
 * Component to handle map click events
 */
function MapClickHandler({ onClick }: { onClick: (lat: number, lng: number) => void }) {
  useMapEvents({
    click: (e) => {
      onClick(e.latlng.lat, e.latlng.lng);
    },
  });
  return null;
}

/**
 * Generic map location picker component
 * Uses OpenStreetMap (free, no API key needed) and Nominatim for geocoding
 */
export default function MapLocationPicker({
  initialLocation,
  initialCenter = [45.5017, -73.5673], // Default: Montreal
  initialZoom = 13,
  height = '500px',
  onLocationSelect,
  searchEnabled = true,
}: MapLocationPickerProps) {
  const [position, setPosition] = useState<[number, number] | null>(
    initialLocation ? [initialLocation.latitude, initialLocation.longitude] : null
  );
  const [center, setCenter] = useState<LatLngExpression>(
    initialLocation ? [initialLocation.latitude, initialLocation.longitude] : initialCenter
  );
  const [locationData, setLocationData] = useState<MapLocation | null>(initialLocation || null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const mapRef = useRef<LeafletMap | null>(null);

  /**
   * Reverse geocode coordinates to get address information
   */
  const reverseGeocode = async (lat: number, lng: number) => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&addressdetails=1`,
        {
          headers: {
            'User-Agent': 'KidsApp/1.0',
          },
        }
      );

      if (!response.ok) throw new Error('Geocoding failed');

      const data: NominatimResponse = await response.json();

      const location: MapLocation = {
        latitude: parseFloat(data.lat),
        longitude: parseFloat(data.lon),
        displayName: data.display_name,
        address: data.address.road
          ? `${data.address.house_number || ''} ${data.address.road}`.trim()
          : undefined,
        city:
          data.address.city ||
          data.address.suburb ||
          data.address.neighbourhood ||
          data.address.county ||
          undefined,
        state: data.address.state,
        country: data.address.country,
        postalCode: data.address.postcode,
      };

      setLocationData(location);
      onLocationSelect(location);
    } catch (error) {
      console.error('Error reverse geocoding:', error);
      // Still set basic location data even if geocoding fails
      const basicLocation: MapLocation = {
        latitude: lat,
        longitude: lng,
      };
      setLocationData(basicLocation);
      onLocationSelect(basicLocation);
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Search for a location by address
   */
  const searchLocation = async () => {
    if (!searchQuery.trim()) return;

    setIsLoading(true);
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          searchQuery
        )}&addressdetails=1&limit=1`,
        {
          headers: {
            'User-Agent': 'KidsApp/1.0',
          },
        }
      );

      if (!response.ok) throw new Error('Search failed');

      const data: NominatimResponse[] = await response.json();

      if (data.length > 0) {
        const result = data[0];
        const lat = parseFloat(result.lat);
        const lng = parseFloat(result.lon);

        setPosition([lat, lng]);
        setCenter([lat, lng]);

        // Fly to the location
        if (mapRef.current) {
          mapRef.current.flyTo([lat, lng], 15, {
            duration: 1.5,
          });
        }

        // Update location data
        await reverseGeocode(lat, lng);
      } else {
        alert('Location not found. Please try a different search term.');
      }
    } catch (error) {
      console.error('Error searching location:', error);
      alert('Error searching location. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Handle map click
   */
  const handleMapClick = async (lat: number, lng: number) => {
    setPosition([lat, lng]);
    await reverseGeocode(lat, lng);
  };

  /**
   * Handle search input key press
   */
  const handleSearchKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      searchLocation();
    }
  };

  return (
    <div style={{ ...mapContainerStyles, height }}>
      {searchEnabled && (
        <div style={searchBoxStyles}>
          <input
            type="text"
            placeholder="Search for an address..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={handleSearchKeyPress}
            style={searchInputStyles}
          />
          <button onClick={searchLocation} style={searchButtonStyles} disabled={isLoading}>
            <Search size={16} />
            Search
          </button>
        </div>
      )}

      <MapContainer
        center={center}
        zoom={initialZoom}
        style={{ width: '100%', height: '100%' }}
        ref={mapRef}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <MapClickHandler onClick={handleMapClick} />

        {position && <Marker position={position} />}
      </MapContainer>

      {locationData && (
        <div style={infoBoxStyles}>
          <div style={infoTitleStyles}>
            <MapPin size={16} style={{ display: 'inline', marginRight: 'var(--space-2)' }} />
            Selected Location
          </div>
          {locationData.displayName && <div style={infoTextStyles}>{locationData.displayName}</div>}
          {locationData.address && <div style={infoTextStyles}>{locationData.address}</div>}
          {(locationData.city || locationData.state || locationData.postalCode) && (
            <div style={infoTextStyles}>
              {[locationData.city, locationData.state, locationData.postalCode]
                .filter(Boolean)
                .join(', ')}
            </div>
          )}
          <div style={coordinatesStyles}>
            <span>Lat: {locationData.latitude.toFixed(6)}</span>
            <span>Lng: {locationData.longitude.toFixed(6)}</span>
          </div>
        </div>
      )}

      {isLoading && (
        <div style={loadingOverlayStyles}>
          <div>Loading...</div>
        </div>
      )}
    </div>
  );
}
