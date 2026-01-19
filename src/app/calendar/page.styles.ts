import { CSSProperties } from 'react';

export const calendarContainerStyles: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: 'var(--space-6)'
};

export const calendarHeaderStyles: CSSProperties = {
  textAlign: 'center',
  marginBottom: 'var(--space-8)',
  backgroundColor: 'var(--color-surface)',
  borderRadius: 'var(--radius-lg)',
  padding: 'var(--space-6)',
  border: `var(--border-width-1) solid var(--color-border)`
};

export const calendarIconStyles: CSSProperties = {
  fontSize: 'var(--font-size-6xl)',
  marginBottom: 'var(--space-3)'
};

export const calendarTitleStyles: CSSProperties = {
  fontSize: 'var(--font-size-2xl)',
  fontWeight: 'var(--font-weight-semibold)',
  color: 'var(--color-primary-600)',
  marginBottom: 'var(--space-2)'
};

export const calendarDescriptionStyles: CSSProperties = {
  fontSize: 'var(--font-size-base)',
  color: 'var(--color-muted)',
  margin: 0,
  fontWeight: 'var(--font-weight-normal)'
};

export const calendarPlaceholderStyles: CSSProperties = {
  backgroundColor: 'var(--color-surface-secondary)',
  border: `var(--border-width-1) solid var(--color-border)`,
  borderRadius: 'var(--radius-lg)',
  padding: 'var(--space-12)',
  textAlign: 'center',
  color: 'var(--color-foreground)'
};

export const placeholderIconStyles: CSSProperties = {
  fontSize: 'var(--font-size-5xl)',
  marginBottom: 'var(--space-4)',
  display: 'inline-block'
};

export const placeholderTitleStyles: CSSProperties = {
  fontSize: 'var(--font-size-xl)',
  fontWeight: 'var(--font-weight-semibold)',
  margin: 0,
  marginBottom: 'var(--space-3)',
  color: 'var(--color-primary-600)'
};

export const placeholderTextStyles: CSSProperties = {
  fontSize: 'var(--font-size-base)',
  marginTop: 'var(--space-2)',
  margin: 0,
  fontWeight: 'var(--font-weight-normal)',
  color: 'var(--color-muted)'
};

export const previewButtonsContainerStyles: CSSProperties = {
  marginTop: 'var(--space-8)',
  display: 'flex',
  justifyContent: 'center',
  gap: 'var(--space-4)'
};

export const basePreviewButtonStyles: CSSProperties = {
  padding: 'var(--space-2) var(--space-4)',
  borderRadius: 'var(--radius-md)',
  fontSize: 'var(--font-size-sm)',
  fontWeight: 'var(--font-weight-medium)',
  cursor: 'pointer',
  border: 'none',
  color: 'var(--color-neutral-50)'
};

export const eventsButtonStyles: CSSProperties = {
  ...basePreviewButtonStyles,
  backgroundColor: 'var(--color-primary-600)'
};

export const tasksButtonStyles: CSSProperties = {
  ...basePreviewButtonStyles,
  backgroundColor: 'var(--color-secondary-600)'
};

export const activitiesButtonStyles: CSSProperties = {
  ...basePreviewButtonStyles,
  backgroundColor: 'var(--color-accent-600)'
};