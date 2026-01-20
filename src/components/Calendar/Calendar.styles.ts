import { CSSProperties } from 'react';

// Main calendar container
export const calendarContainerStyles: CSSProperties = {
  display: 'grid',
  gridTemplateColumns: '190px 1fr',
  gap: 'var(--space-6)',
  padding: 'var(--space-6)',
  minHeight: 'calc(100vh - 140px)', // Account for header
  alignItems: 'start',
};

// Left sidebar for filters
export const filtersStyles: CSSProperties = {
  background: 'var(--color-surface)',
  borderRadius: 'var(--radius-lg)',
  padding: 'var(--space-4)',
  boxShadow: 'var(--shadow-sm)',
  position: 'sticky',
  top: 'var(--space-6)',
};

export const filterSectionStyles: CSSProperties = {
  marginBottom: 'var(--space-6)',
};

export const filterTitleStyles: CSSProperties = {
  fontSize: 'var(--font-size-lg)',
  fontWeight: 'var(--font-weight-semibold)',
  color: 'var(--color-text)',
  marginBottom: 'var(--space-3)',
};

export const filterLabelStyles: CSSProperties = {
  display: 'block',
  fontSize: 'var(--font-size-sm)',
  fontWeight: 'var(--font-weight-medium)',
  color: 'var(--color-text-secondary)',
  marginBottom: 'var(--space-2)',
};

export const filterInputStyles: CSSProperties = {
  width: '100%',
  padding: 'var(--space-2)',
  borderRadius: 'var(--radius-base)',
  border: '1px solid var(--color-border)',
  fontSize: 'var(--font-size-sm)',
  marginBottom: 'var(--space-3)',
};

export const filterSelectStyles: CSSProperties = {
  width: '100%',
  padding: 'var(--space-2)',
  borderRadius: 'var(--radius-base)',
  border: '1px solid var(--color-border)',
  fontSize: 'var(--font-size-sm)',
  backgroundColor: 'var(--color-background)',
  marginBottom: 'var(--space-3)',
};

export const clearFiltersButtonStyles: CSSProperties = {
  background: 'var(--color-neutral-200)',
  color: 'var(--color-neutral-700)',
  border: 'none',
  padding: 'var(--space-2) var(--space-3)',
  borderRadius: 'var(--radius-base)',
  fontSize: 'var(--font-size-sm)',
  cursor: 'pointer',
  transition: 'var(--transition-colors)',
  width: '100%',
};

// Calendar area
export const calendarAreaStyles: CSSProperties = {
  background: 'var(--color-surface)',
  borderRadius: 'var(--radius-lg)',
  padding: 'var(--space-6)',
  boxShadow: 'var(--shadow-sm)',
};

export const calendarHeaderStyles: CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: 'var(--space-6)',
};

export const calendarTitleStyles: CSSProperties = {
  fontSize: 'var(--font-size-2xl)',
  fontWeight: 'var(--font-weight-bold)',
  color: 'var(--color-text)',
};

export const calendarNavStyles: CSSProperties = {
  display: 'flex',
  gap: 'var(--space-2)',
};

export const navButtonStyles: CSSProperties = {
  background: 'var(--color-primary-600)',
  color: 'white',
  border: 'none',
  padding: 'var(--space-2) var(--space-3)',
  borderRadius: 'var(--radius-base)',
  cursor: 'pointer',
  fontSize: 'var(--font-size-sm)',
  transition: 'var(--transition-colors)',
};

// Calendar grid
export const calendarGridStyles: CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(7, 1fr)',
  gap: '1px',
  backgroundColor: 'var(--color-border)',
  borderRadius: 'var(--radius-base)',
  overflow: 'hidden',
};

export const dayHeaderStyles: CSSProperties = {
  padding: 'var(--space-3)',
  backgroundColor: 'var(--color-neutral-100)',
  textAlign: 'center',
  fontSize: 'var(--font-size-sm)',
  fontWeight: 'var(--font-weight-semibold)',
  color: 'var(--color-text-secondary)',
};

export const dayLabelStyles: CSSProperties = {
  fontSize: 'var(--font-size-sm)',
  fontWeight: 'var(--font-weight-medium)',
  color: 'var(--color-text-secondary)',
  marginBottom: 'var(--space-1)',
};

export const dayCellStyles: CSSProperties = {
  height: '120px',
  backgroundColor: 'var(--color-background)',
  padding: 'var(--space-2)',
  position: 'relative' as const,
  display: 'flex',
  flexDirection: 'column',
  overflow: 'hidden',
};

export const dayNumberStyles: CSSProperties = {
  fontSize: 'var(--font-size-sm)',
  fontWeight: 'var(--font-weight-medium)',
  color: 'var(--color-text)',
  marginBottom: 'var(--space-2)',
};

export const todayCellStyles: CSSProperties = {
  ...dayCellStyles,
  backgroundColor: 'var(--color-primary-50)',
  border: '2px solid var(--color-primary-200)',
};

export const otherMonthStyles: CSSProperties = {
  ...dayCellStyles,
  backgroundColor: 'var(--color-neutral-50)',
};

export const otherMonthNumberStyles: CSSProperties = {
  ...dayNumberStyles,
  color: 'var(--color-text-muted)',
};

// Events container within day cell
export const eventsContainerStyles: CSSProperties = {
  flex: 1,
  overflow: 'hidden',
  display: 'flex',
  flexDirection: 'column',
  gap: 'var(--space-1)',
};

// Event items in calendar
export const eventItemStyles: CSSProperties = {
  fontSize: 'var(--font-size-xs)',
  padding: 'var(--space-1)',
  borderRadius: 'var(--radius-sm)',
  backgroundColor: 'var(--color-primary-100)',
  color: 'var(--color-primary-800)',
  cursor: 'pointer',
  transition: 'var(--transition-colors)',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  flexShrink: 0,
  minHeight: '20px',
  display: 'flex',
  alignItems: 'center',
};

export const eventTimeStyles: CSSProperties = {
  fontSize: 'var(--font-size-xs)',
  fontWeight: 'var(--font-weight-medium)',
  opacity: 0.8,
};

// Event modal/details
export const modalOverlayStyles: CSSProperties = {
  position: 'fixed' as const,
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 1000,
};

export const modalContentStyles: CSSProperties = {
  backgroundColor: 'var(--color-surface)',
  borderRadius: 'var(--radius-lg)',
  padding: 'var(--space-6)',
  maxWidth: '600px',
  width: '90%',
  maxHeight: '80vh',
  overflow: 'auto',
  boxShadow: 'var(--shadow-xl)',
};

export const modalHeaderStyles: CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: 'var(--space-4)',
};

export const modalTitleStyles: CSSProperties = {
  fontSize: 'var(--font-size-xl)',
  fontWeight: 'var(--font-weight-bold)',
  color: 'var(--color-text)',
};

export const closeButtonStyles: CSSProperties = {
  background: 'none',
  border: 'none',
  fontSize: 'var(--font-size-lg)',
  cursor: 'pointer',
  color: 'var(--color-text-secondary)',
  padding: 'var(--space-2)',
};

export const modalBodyStyles: CSSProperties = {
  color: 'var(--color-text-secondary)',
  lineHeight: 'var(--line-height-relaxed)',
};

export const eventDetailsStyles: CSSProperties = {
  display: 'grid',
  gap: 'var(--space-3)',
  marginBottom: 'var(--space-4)',
};

export const detailRowStyles: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: 'var(--space-2)',
};

export const detailIconStyles: CSSProperties = {
  color: 'var(--color-primary-600)',
  flexShrink: 0,
};

export const detailTextStyles: CSSProperties = {
  fontSize: 'var(--font-size-sm)',
  color: 'var(--color-text-secondary)',
};

// Loading and error states
export const loadingStyles: CSSProperties = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '400px',
  color: 'var(--color-text-secondary)',
  fontSize: 'var(--font-size-lg)',
};

export const errorStyles: CSSProperties = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '400px',
  color: 'var(--color-error-600)',
  fontSize: 'var(--font-size-lg)',
  textAlign: 'center',
  flexDirection: 'column',
  gap: 'var(--space-4)',
};

export const retryButtonStyles: CSSProperties = {
  background: 'var(--color-primary-600)',
  color: 'white',
  border: 'none',
  padding: 'var(--space-3) var(--space-6)',
  borderRadius: 'var(--radius-base)',
  cursor: 'pointer',
  fontSize: 'var(--font-size-base)',
  transition: 'var(--transition-colors)',
};