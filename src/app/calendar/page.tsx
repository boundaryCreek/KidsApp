import BaseLayout from '../../components/BaseLayout/BaseLayout';
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

export default function Calendar() {
  return (
    <BaseLayout>
      <div style={calendarContainerStyles}>
        <div style={calendarHeaderStyles}>
          <div style={calendarIconStyles}>
            📅
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
            🗓️
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