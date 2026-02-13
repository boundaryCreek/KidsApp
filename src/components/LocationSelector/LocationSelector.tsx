'use client';

import { useEffect, useRef, useState } from 'react';
import { MapPin, ChevronDown } from 'lucide-react';
import * as styles from './LocationSelector.styles';
import cssStyles from './LocationSelector.module.css';

interface LocationData {
  location: string;
  city: string | null;
  region: string;
  country: string;
  isMinnesota: boolean;
}

interface City {
  id: string;
  name: string;
  slug: string;
}

export default function LocationSelector() {
  const [location, setLocation] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [hasLoaded, setHasLoaded] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [cities, setCities] = useState<City[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const response = await fetch('/api/geolocation');
        if (response.ok) {
          const data: LocationData = await response.json();
          const saved = localStorage.getItem('selectedCity');
          const newLocation = saved || data.location;
          setLocation(newLocation);
          setHasLoaded(true);
        }
      } catch (error) {
        console.error('Failed to fetch location:', error);
        const saved = localStorage.getItem('selectedCity');
        if (saved) {
          setLocation(saved);
          setHasLoaded(true);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchLocation();
  }, []);

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await fetch('/api/cities');
        if (response.ok) {
          const data: City[] = await response.json();
          setCities(data);
        }
      } catch (error) {
        console.error('Failed to fetch cities:', error);
      }
    };

    fetchCities();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isDropdownOpen]);

  const handleSelectCity = (cityName: string) => {
    setHasLoaded(false);
    setLocation(cityName);
    localStorage.setItem('selectedCity', cityName);
    setIsDropdownOpen(false);
    // Trigger animation on next render
    setTimeout(() => setHasLoaded(true), 0);
  };

  return (
    <div ref={containerRef} style={styles.locationSelectorContainer}>
      <button
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        style={styles.locationSelectorBox}
      >
        <div style={styles.locationSelectorContent}>
          <MapPin size={16} style={styles.locationIcon} />
          <div 
            style={styles.locationName}
            className={hasLoaded ? cssStyles.locationSelectorBoxAnimated : ''}
          >
            {location}
          </div>
        </div>
        <ChevronDown size={14} style={styles.chevronIcon} />
      </button>

      {isDropdownOpen && (
        <div style={styles.dropdownMenu}>
          {cities.map((city) => (
            <button
              key={city.id}
              onClick={() => handleSelectCity(city.name)}
              style={{
                ...styles.dropdownItem,
                ...(location === city.name ? styles.dropdownItemActive : {}),
              }}
            >
              {city.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
