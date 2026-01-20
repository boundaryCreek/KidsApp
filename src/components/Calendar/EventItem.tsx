'use client';

import React from 'react';
import { Event, Activity, Location, Category } from '../../types';
import {
  eventItemStyles,
  eventTimeStyles
} from './Calendar.styles';

interface ExtendedEvent extends Event {
  activity: Activity & {
    location: Location | null;
    categories: Category[];
    organization: any;
  };
}

interface EventItemProps {
  event: ExtendedEvent;
  onClick: (event: ExtendedEvent) => void;
}

export default function EventItem({ event, onClick }: EventItemProps) {
  const formatEventTime = (timeString: string | null) => {
    if (!timeString) return '';
    try {
      const [hours, minutes] = timeString.split(':');
      const date = new Date();
      date.setHours(parseInt(hours), parseInt(minutes));
      return date.toLocaleTimeString('en-US', { 
        hour: 'numeric', 
        minute: '2-digit',
        hour12: true 
      });
    } catch {
      return timeString;
    }
  };

  return (
    <div 
      style={eventItemStyles}
      onClick={() => onClick(event)}
      title={`${event.title || event.activity.title}${event.time ? ` at ${formatEventTime(event.time)}` : ''}`}
    >
      {event.time && (
        <div style={eventTimeStyles}>
          {formatEventTime(event.time)}
        </div>
      )}
      <div>
        {event.title || event.activity.title}
      </div>
    </div>
  );
}