'use client';

import React from 'react';
import CalendarHeader from './CalendarHeader';
import CalendarDay from './CalendarDay';
import { Event, Activity, Location, Category } from '../../types';
import {
  calendarGridStyles,
  dayHeaderStyles
} from './Calendar.styles';

interface ExtendedEvent extends Event {
  activity: Activity & {
    location: Location | null;
    categories: Category[];
    organization: any;
  };
}

interface CalendarGridProps {
  currentDate: Date;
  events: ExtendedEvent[];
  onNavigate: (direction: 'prev' | 'next') => void;
  onGoToToday: () => void;
  onEventClick: (event: ExtendedEvent) => void;
}

export default function CalendarGrid({
  currentDate,
  events,
  onNavigate,
  onGoToToday,
  onEventClick
}: CalendarGridProps) {
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  
  // Get first day of the month and calculate calendar grid
  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = new Date(year, month + 1, 0);
  const startDate = new Date(firstDayOfMonth);
  startDate.setDate(startDate.getDate() - firstDayOfMonth.getDay());
  
  const endDate = new Date(lastDayOfMonth);
  endDate.setDate(endDate.getDate() + (6 - lastDayOfMonth.getDay()));

  const generateCalendarDays = () => {
    const days = [];
    const current = new Date(startDate);
    
    while (current <= endDate) {
      days.push(new Date(current));
      current.setDate(current.getDate() + 1);
    }
    
    return days;
  };

  const getEventsForDate = (date: Date) => {
    return events.filter(event => {
      const eventDate = new Date(event.date);
      return eventDate.toDateString() === date.toDateString();
    });
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const isCurrentMonth = (date: Date) => {
    return date.getMonth() === month;
  };

  return (
    <>
      <CalendarHeader
        currentDate={currentDate}
        onNavigate={onNavigate}
        onGoToToday={onGoToToday}
      />

      <div style={calendarGridStyles}>
        {/* Day Headers */}
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} style={dayHeaderStyles}>
            {day}
          </div>
        ))}
        
        {/* Calendar Days */}
        {generateCalendarDays().map((date, index) => {
          const dayEvents = getEventsForDate(date);
          
          return (
            <CalendarDay
              key={index}
              date={date}
              events={dayEvents}
              isToday={isToday(date)}
              isCurrentMonth={isCurrentMonth(date)}
              onEventClick={onEventClick}
            />
          );
        })}
      </div>
    </>
  );
}