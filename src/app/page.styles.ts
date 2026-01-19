import { CSSProperties } from 'react';

export const homeContainerStyles: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '60vh',
  textAlign: 'center',
  backgroundColor: 'var(--color-surface)',
  borderRadius: 'var(--radius-lg)',
  padding: 'var(--space-12)',
  border: `var(--border-width-1) solid var(--color-border)`,
  margin: 'var(--space-8) 0'
};

export const homeIconStyles: CSSProperties = {
  fontSize: 'var(--font-size-6xl)',
  marginBottom: 'var(--space-4)'
};

export const homeTitleStyles: CSSProperties = {
  fontSize: 'var(--font-size-3xl)',
  fontWeight: 'var(--font-weight-semibold)',
  color: 'var(--color-primary-600)',
  marginBottom: 'var(--space-4)'
};

export const homeDescriptionStyles: CSSProperties = {
  fontSize: 'var(--font-size-lg)',
  color: 'var(--color-muted)',
  maxWidth: 'var(--container-md)',
  lineHeight: 'var(--line-height-relaxed)',
  fontWeight: 'var(--font-weight-normal)'
};

export const homeButtonContainerStyles: CSSProperties = {
  display: 'flex',
  gap: 'var(--space-4)',
  marginTop: 'var(--space-8)'
};

export const baseButtonStyles: CSSProperties = {
  color: 'var(--color-neutral-50)',
  padding: 'var(--space-3) var(--space-6)',
  borderRadius: 'var(--radius-md)',
  fontSize: 'var(--font-size-base)',
  fontWeight: 'var(--font-weight-medium)',
  cursor: 'pointer',
  border: 'none',
  backgroundColor: 'var(--color-primary-600)'
};

export const createButtonStyles: CSSProperties = {
  ...baseButtonStyles,
  backgroundColor: 'var(--color-primary-600)'
};

export const playButtonStyles: CSSProperties = {
  ...baseButtonStyles,
  backgroundColor: 'var(--color-secondary-600)'
};

export const learnButtonStyles: CSSProperties = {
  ...baseButtonStyles,
  backgroundColor: 'var(--color-accent-600)'
};