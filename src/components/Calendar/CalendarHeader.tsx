'use client';

import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import {
  calendarHeaderStyles,
  calendarTitleStyles,
  calendarNavStyles,
  navButtonStyles
} from './Calendar.styles';

interface CalendarHeaderProps {
  currentDate: Date;
  onNavigate: (direction: 'prev' | 'next') => void;
  onGoToToday: () => void;
}

export default function CalendarHeader({
  currentDate,
  onNavigate,
  onGoToToday
}: CalendarHeaderProps) {
  const monthName = new Intl.DateTimeFormat('en-US', { month: 'long' }).format(currentDate);
  const year = currentDate.getFullYear();

  return (
    <div style={calendarHeaderStyles}>
      <h1 style={calendarTitleStyles}>{monthName} {year}</h1>
      <div style={calendarNavStyles}>
        <button onClick={() => onNavigate('prev')} style={navButtonStyles}>
          <ChevronLeft size={16} />
        </button>
        <button onClick={onGoToToday} style={navButtonStyles}>
          Today
        </button>
        <button onClick={() => onNavigate('next')} style={navButtonStyles}>
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}