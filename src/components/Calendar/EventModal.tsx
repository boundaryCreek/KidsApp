'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Calendar as CalendarIcon, 
  Clock, 
  MapPin, 
  Tag,
  X
} from 'lucide-react';
import { Event, Activity, Location, Category } from '../../types';
import {
  modalOverlayStyles,
  modalContentStyles,
  modalHeaderStyles,
  modalTitleStyles,
  closeButtonStyles,
  modalBodyStyles,
  eventDetailsStyles,
  detailRowStyles,
  detailIconStyles,
  detailTextStyles
} from './Calendar.styles';

interface ExtendedEvent extends Event {
  activity: Activity & {
    location: Location | null;
    categories: Category[];
    organization: any;
  };
}

interface EventModalProps {
  event: ExtendedEvent | null;
  onClose: () => void;
}

export default function EventModal({ event, onClose }: EventModalProps) {
  if (!event) return null;

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
    <div style={modalOverlayStyles} onClick={onClose}>
      <div style={modalContentStyles} onClick={(e) => e.stopPropagation()}>
        <div style={modalHeaderStyles}>
          <h2 style={modalTitleStyles}>
            {event.title || event.activity.title}
          </h2>
          <button 
            onClick={onClose}
            style={closeButtonStyles}
          >
            <X size={24} />
          </button>
        </div>
        
        <div style={modalBodyStyles}>
          <div style={eventDetailsStyles}>
            <div style={detailRowStyles}>
              <CalendarIcon size={16} style={detailIconStyles} />
              <span style={detailTextStyles}>
                {new Date(event.date).toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </span>
            </div>
            
            {event.time && (
              <div style={detailRowStyles}>
                <Clock size={16} style={detailIconStyles} />
                <span style={detailTextStyles}>
                  {formatEventTime(event.time)}
                </span>
              </div>
            )}
            
            {event.activity.location && (
              <div style={detailRowStyles}>
                <MapPin size={16} style={detailIconStyles} />
                <span style={detailTextStyles}>
                  {event.activity.location.name}
                </span>
              </div>
            )}
            
            {event.activity.categories.length > 0 && (
              <div style={detailRowStyles}>
                <Tag size={16} style={detailIconStyles} />
                <span style={detailTextStyles}>
                  {event.activity.categories.map(cat => cat.name).join(', ')}
                </span>
              </div>
            )}
          </div>
          
          {event.description && (
            <div style={{marginBottom: 'var(--space-4)'}}>
              <h4 style={{color: 'var(--color-text)', marginBottom: 'var(--space-2)'}}>
                Event Description
              </h4>
              <p>{event.description}</p>
            </div>
          )}
          
          {event.notes && (
            <div style={{marginBottom: 'var(--space-4)'}}>
              <h4 style={{color: 'var(--color-text)', marginBottom: 'var(--space-2)'}}>
                Notes
              </h4>
              <p>{event.notes}</p>
            </div>
          )}
          
          <div>
            <h4 style={{color: 'var(--color-text)', marginBottom: 'var(--space-2)'}}>
              Activity Details
            </h4>
            <p>{event.activity.description}</p>
            <Link 
              href={`/a/${event.activity.slug}`}
              style={{
                color: 'var(--color-primary-600)',
                textDecoration: 'none',
                fontWeight: 'var(--font-weight-medium)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 'var(--space-2)',
                marginTop: 'var(--space-3)'
              }}
            >
              View Full Activity Details →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}