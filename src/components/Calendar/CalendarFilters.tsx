'use client';

import React from 'react';
import { Filter } from 'lucide-react';
import { Category, Location } from '../../types';
import {
  filtersStyles,
  filterSectionStyles,
  filterTitleStyles,
  filterLabelStyles,
  filterSelectStyles,
  filterInputStyles,
  clearFiltersButtonStyles
} from './Calendar.styles';

interface CalendarFilters {
  category: string;
  location: string;
  startDate: string;
  endDate: string;
}

interface CalendarFiltersProps {
  filters: CalendarFilters;
  categories: Category[];
  locations: Location[];
  onFilterChange: (key: keyof CalendarFilters, value: string) => void;
  onClearFilters: () => void;
}

export default function CalendarFilters({
  filters,
  categories,
  locations,
  onFilterChange,
  onClearFilters
}: CalendarFiltersProps) {
  return (
    <div style={filtersStyles}>
      <div style={filterSectionStyles}>
        <div style={{...filterTitleStyles, display: 'flex', alignItems: 'center', gap: 'var(--space-2)'}}>
          <Filter size={20} />
          Filters
        </div>
      </div>

      <div style={filterSectionStyles}>
        <label style={filterLabelStyles}>Category</label>
        <select 
          value={filters.category}
          onChange={(e) => onFilterChange('category', e.target.value)}
          style={filterSelectStyles}
        >
          <option value="">All Categories</option>
          {categories.map(category => (
            <option key={category.id} value={category.slug}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      <div style={filterSectionStyles}>
        <label style={filterLabelStyles}>Location</label>
        <select 
          value={filters.location}
          onChange={(e) => onFilterChange('location', e.target.value)}
          style={filterSelectStyles}
        >
          <option value="">All Locations</option>
          {locations.map(location => (
            <option key={location.id} value={location.slug}>
              {location.name}
            </option>
          ))}
        </select>
      </div>

      <div style={filterSectionStyles}>
        <label style={filterLabelStyles}>From Date</label>
        <input 
          type="date"
          value={filters.startDate}
          onChange={(e) => onFilterChange('startDate', e.target.value)}
          style={filterInputStyles}
        />
      </div>

      <div style={filterSectionStyles}>
        <label style={filterLabelStyles}>To Date</label>
        <input 
          type="date"
          value={filters.endDate}
          onChange={(e) => onFilterChange('endDate', e.target.value)}
          style={filterInputStyles}
        />
      </div>

      <button onClick={onClearFilters} style={clearFiltersButtonStyles}>
        Clear Filters
      </button>
    </div>
  );
}