'use client';

import React, { useState, useEffect } from 'react';
import { Event, Activity, Location, Category } from '../../types';
import CalendarFilters from './CalendarFilters';
import CalendarGrid from './CalendarGrid';
import EventModal from './EventModal';
import {
  calendarContainerStyles,
  calendarAreaStyles
} from './Calendar.styles';

interface ExtendedEvent extends Event {
  activity: Activity & {
    location: Location | null;
    categories: Category[];
    organization: any;
  };
}

interface CalendarFiltersState {
  category: string;
  location: string;
  startDate: string;
  endDate: string;
}

interface CalendarClientProps {
  initialCategories: Category[];
  initialLocations: Location[];
}

export default function CalendarClient({ 
  initialCategories,
  initialLocations
}: CalendarClientProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState<ExtendedEvent[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<ExtendedEvent | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<CalendarFiltersState>({
    category: '',
    location: '',
    startDate: '',
    endDate: ''
  });

  // Get calendar display info for date range
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  
  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = new Date(year, month + 1, 0);
  const startDate = new Date(firstDayOfMonth);
  startDate.setDate(startDate.getDate() - firstDayOfMonth.getDay());
  
  const endDate = new Date(lastDayOfMonth);
  endDate.setDate(endDate.getDate() + (6 - lastDayOfMonth.getDay()));

  // Fetch events when date or filters change
  useEffect(() => {
    fetchEvents();
  }, [currentDate, filters]);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      
      // Set date range for current calendar view
      params.set('startDate', startDate.toISOString());
      params.set('endDate', endDate.toISOString());
      
      // Add filters
      if (filters.category) params.set('category', filters.category);
      if (filters.location) params.set('location', filters.location);
      if (filters.startDate) params.set('startDate', filters.startDate);
      if (filters.endDate) params.set('endDate', filters.endDate);

      const response = await fetch(`/api/events?${params}`);
      if (!response.ok) throw new Error('Failed to fetch events');
      
      const eventsData = await response.json();
      setEvents(eventsData);
      setError(null);
    } catch (err) {
      setError('Failed to load events. Please try again.');
      console.error('Error fetching events:', err);
    } finally {
      setLoading(false);
    }
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate);
    newDate.setMonth(month + (direction === 'next' ? 1 : -1));
    setCurrentDate(newDate);
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  const clearFilters = () => {
    setFilters({
      category: '',
      location: '',
      startDate: '',
      endDate: ''
    });
  };

  const handleFilterChange = (key: keyof CalendarFiltersState, value: string) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleEventClick = (event: ExtendedEvent) => {
    setSelectedEvent(event);
  };

  const closeModal = () => {
    setSelectedEvent(null);
  };

  return (
    <>
      <div style={calendarContainerStyles}>
        <CalendarFilters
          filters={filters}
          categories={initialCategories}
          locations={initialLocations}
          onFilterChange={handleFilterChange}
          onClearFilters={clearFilters}
        />

        <div style={calendarAreaStyles}>
          <CalendarGrid
            currentDate={currentDate}
            events={events}
            onNavigate={navigateMonth}
            onGoToToday={goToToday}
            onEventClick={handleEventClick}
          />
          {error && (
            <div style={{ padding: '1rem', color: 'var(--color-error-600)', textAlign: 'center' }}>
              {error}
            </div>
          )}
        </div>
      </div>

      <EventModal
        event={selectedEvent}
        onClose={closeModal}
      />
    </>
  );
}