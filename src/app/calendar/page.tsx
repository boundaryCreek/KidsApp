import BaseLayout from '../../components/BaseLayout/BaseLayout';
import { Calendar, CalendarDays } from 'lucide-react';
import {
  calendarContainerStyles,
  calendarHeaderStyles,
  calendarIconStyles,
  calendarTitleStyles,
  calendarDescriptionStyles,
  calendarPlaceholderStyles,
  placeholderIconStyles,
  placeholderTitleStyles,
  placeholderTextStyles,
  previewButtonsContainerStyles,
  eventsButtonStyles,
  tasksButtonStyles,
  activitiesButtonStyles
} from './page.styles';

export default function CalendarPage() {
  return (
    <BaseLayout>
      <div style={calendarContainerStyles}>
        <div style={calendarHeaderStyles}>
          <div style={calendarIconStyles}>
            <Calendar size={64} color="var(--color-primary-600)" />
          </div>
          <h1 style={calendarTitleStyles}>
            Calendar
          </h1>
          <p style={calendarDescriptionStyles}>
            Keep track of activities and events.
          </p>
        </div>
        
        {/* Placeholder for calendar content */}
        <div style={calendarPlaceholderStyles}>
          <div style={placeholderIconStyles}>
            <CalendarDays size={80} color="var(--color-muted)" />
          </div>
          <p style={placeholderTitleStyles}>
            Calendar will be here
          </p>
          <p style={placeholderTextStyles}>
            Coming soon with scheduling features.
          </p>
          <div style={previewButtonsContainerStyles}>
            <button style={eventsButtonStyles}>
              Events
            </button>
            <button style={tasksButtonStyles}>
              Tasks
            </button>
            <button style={activitiesButtonStyles}>
              Activities
            </button>
          </div>
        </div>
      </div>
    </BaseLayout>
  );
}