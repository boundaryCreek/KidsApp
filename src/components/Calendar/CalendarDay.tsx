'use client';

import React from 'react';
import { Event, Activity, Location, Category } from '../../types';
import EventItem from './EventItem';
import {
  dayCellStyles,
  dayNumberStyles,
  todayCellStyles,
  otherMonthStyles,
  otherMonthNumberStyles,
  eventsContainerStyles
} from './Calendar.styles';

interface ExtendedEvent extends Event {
  activity: Activity & {
    location: Location | null;
    categories: Category[];
    organization: any;
  };
}

interface CalendarDayProps {
  date: Date;
  events: ExtendedEvent[];
  isToday: boolean;
  isCurrentMonth: boolean;
  onEventClick: (event: ExtendedEvent) => void;
}

export default function CalendarDay({
  date,
  events,
  isToday,
  isCurrentMonth,
  onEventClick
}: CalendarDayProps) {
  const cellStyle = isToday 
    ? todayCellStyles 
    : isCurrentMonth 
      ? dayCellStyles 
      : otherMonthStyles;
      
  const numberStyle = isCurrentMonth 
    ? dayNumberStyles 
    : otherMonthNumberStyles;

  return (
    <div style={cellStyle}>
      <div style={numberStyle}>
        {date.getDate()}
      </div>
      <div style={eventsContainerStyles}>
        {events.slice(0, 4).map((event) => (
          <EventItem
            key={event.id}
            event={event}
            onClick={onEventClick}
          />
        ))}
        {events.length > 4 && (
          <div style={{
            fontSize: 'var(--font-size-xs)',
            padding: 'var(--space-1)',
            borderRadius: 'var(--radius-sm)',
            backgroundColor: 'var(--color-neutral-200)',
            color: 'var(--color-neutral-700)',
            fontWeight: 'var(--font-weight-medium)',
            textAlign: 'center',
            flexShrink: 0,
            cursor: 'pointer',
            minHeight: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            +{events.length - 4} more
          </div>
        )}
      </div>
    </div>
  );
}