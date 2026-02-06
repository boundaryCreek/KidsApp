/**
 * Map Types
 * Type definitions for map location picker functionality
 */

import { LatLngExpression } from 'leaflet';

/**
 * Location data returned from the map picker
 */
export interface MapLocation {
  latitude: number;
  longitude: number;
  address?: string;
  city?: string;
  state?: string;
  country?: string;
  postalCode?: string;
  displayName?: string;
}

/**
 * Props for MapLocationPicker component
 */
export interface MapLocationPickerProps {
  initialLocation?: MapLocation;
  initialCenter?: LatLngExpression;
  initialZoom?: number;
  height?: string;
  onLocationSelect: (location: MapLocation) => void;
  searchEnabled?: boolean;
}

/**
 * Nominatim geocoding API response
 */
export interface NominatimResponse {
  place_id: number;
  licence: string;
  osm_type: string;
  osm_id: number;
  lat: string;
  lon: string;
  display_name: string;
  address: {
    house_number?: string;
    road?: string;
    neighbourhood?: string;
    suburb?: string;
    city?: string;
    county?: string;
    state?: string;
    postcode?: string;
    country?: string;
    country_code?: string;
  };
  boundingbox: [string, string, string, string];
}
