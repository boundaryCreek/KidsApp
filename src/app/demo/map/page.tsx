'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { MapLocation } from '../../../types/map';

// Dynamically import MapLocationPicker with no SSR
const MapLocationPicker = dynamic(() => import('../../../components/MapLocationPicker'), {
  ssr: false,
  loading: () => (
    <div
      style={{
        height: '500px',
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

export default function MapDemoPage() {
  const [selectedLocation, setSelectedLocation] = useState<MapLocation | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    latitude: '',
    longitude: '',
    city: '',
    state: '',
    postalCode: '',
  });

  const handleLocationSelect = (location: MapLocation) => {
    setSelectedLocation(location);
    setFormData({
      name: formData.name,
      address: location.address || location.displayName || '',
      latitude: location.latitude.toFixed(6),
      longitude: location.longitude.toFixed(6),
      city: location.city || '',
      state: location.state || '',
      postalCode: location.postalCode || '',
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('Location saved! Check console for details.');
  };

  return (
    <div
      style={{
        maxWidth: 'var(--container-lg)',
        margin: '0 auto',
        padding: 'var(--space-8)',
      }}
    >
      <h1
        style={{
          fontSize: 'var(--font-size-3xl)',
          fontWeight: 'var(--font-weight-bold)',
          marginBottom: 'var(--space-2)',
          color: 'var(--color-neutral-900)',
        }}
      >
        Map Location Picker Demo
      </h1>
      <p
        style={{
          fontSize: 'var(--font-size-lg)',
          color: 'var(--color-neutral-600)',
          marginBottom: 'var(--space-8)',
        }}
      >
        Click anywhere on the map or search for an address to select a location.
      </p>

      <form onSubmit={handleSubmit}>
        {/* Map Section */}
        <div style={{ marginBottom: 'var(--space-8)' }}>
          <h2
            style={{
              fontSize: 'var(--font-size-xl)',
              fontWeight: 'var(--font-weight-semibold)',
              marginBottom: 'var(--space-4)',
              color: 'var(--color-neutral-900)',
            }}
          >
            Select Location
          </h2>
          <MapLocationPicker
            onLocationSelect={handleLocationSelect}
            height="500px"
            searchEnabled={true}
          />
        </div>

        {/* Form Fields */}
        {selectedLocation && (
          <div
            style={{
              padding: 'var(--space-6)',
              backgroundColor: 'var(--color-neutral-50)',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--color-neutral-300)',
              marginBottom: 'var(--space-6)',
            }}
          >
            <h2
              style={{
                fontSize: 'var(--font-size-xl)',
                fontWeight: 'var(--font-weight-semibold)',
                marginBottom: 'var(--space-4)',
                color: 'var(--color-neutral-900)',
              }}
            >
              Location Details
            </h2>

            <div
              style={{
                display: 'grid',
                gap: 'var(--space-4)',
              }}
            >
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
                  Location Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Enter a name for this location"
                  style={{
                    width: '100%',
                    padding: 'var(--space-3)',
                    fontSize: 'var(--font-size-base)',
                    border: '1px solid var(--color-neutral-300)',
                    borderRadius: 'var(--radius-md)',
                  }}
                />
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
                  Full Address
                </label>
                <input
                  type="text"
                  value={formData.address}
                  readOnly
                  style={{
                    width: '100%',
                    padding: 'var(--space-3)',
                    fontSize: 'var(--font-size-base)',
                    border: '1px solid var(--color-neutral-300)',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: 'var(--color-neutral-100)',
                  }}
                />
              </div>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                  gap: 'var(--space-4)',
                }}
              >
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
                    City
                  </label>
                  <input
                    type="text"
                    value={formData.city}
                    readOnly
                    style={{
                      width: '100%',
                      padding: 'var(--space-3)',
                      fontSize: 'var(--font-size-base)',
                      border: '1px solid var(--color-neutral-300)',
                      borderRadius: 'var(--radius-md)',
                      backgroundColor: 'var(--color-neutral-100)',
                    }}
                  />
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
                    State/Province
                  </label>
                  <input
                    type="text"
                    value={formData.state}
                    readOnly
                    style={{
                      width: '100%',
                      padding: 'var(--space-3)',
                      fontSize: 'var(--font-size-base)',
                      border: '1px solid var(--color-neutral-300)',
                      borderRadius: 'var(--radius-md)',
                      backgroundColor: 'var(--color-neutral-100)',
                    }}
                  />
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
                    Postal Code
                  </label>
                  <input
                    type="text"
                    value={formData.postalCode}
                    readOnly
                    style={{
                      width: '100%',
                      padding: 'var(--space-3)',
                      fontSize: 'var(--font-size-base)',
                      border: '1px solid var(--color-neutral-300)',
                      borderRadius: 'var(--radius-md)',
                      backgroundColor: 'var(--color-neutral-100)',
                    }}
                  />
                </div>
              </div>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: 'var(--space-4)',
                }}
              >
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
                    Latitude
                  </label>
                  <input
                    type="text"
                    value={formData.latitude}
                    readOnly
                    style={{
                      width: '100%',
                      padding: 'var(--space-3)',
                      fontSize: 'var(--font-size-base)',
                      fontFamily: 'monospace',
                      border: '1px solid var(--color-neutral-300)',
                      borderRadius: 'var(--radius-md)',
                      backgroundColor: 'var(--color-neutral-100)',
                    }}
                  />
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
                    Longitude
                  </label>
                  <input
                    type="text"
                    value={formData.longitude}
                    readOnly
                    style={{
                      width: '100%',
                      padding: 'var(--space-3)',
                      fontSize: 'var(--font-size-base)',
                      fontFamily: 'monospace',
                      border: '1px solid var(--color-neutral-300)',
                      borderRadius: 'var(--radius-md)',
                      backgroundColor: 'var(--color-neutral-100)',
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Submit Button */}
        {selectedLocation && (
          <button
            type="submit"
            style={{
              padding: 'var(--space-4) var(--space-8)',
              fontSize: 'var(--font-size-base)',
              fontWeight: 'var(--font-weight-semibold)',
              color: 'var(--color-neutral-50)',
              backgroundColor: 'var(--color-primary-600)',
              border: 'none',
              borderRadius: 'var(--radius-lg)',
              cursor: 'pointer',
              boxShadow: 'var(--shadow-md)',
              transition: 'var(--transition-colors)',
            }}
          >
            Save Location
          </button>
        )}
      </form>
    </div>
  );
}
