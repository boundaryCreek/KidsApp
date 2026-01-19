import { CSSProperties } from 'react';

export const backLinkStyles: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: 'var(--space-2)',
  color: 'var(--color-primary-600)',
  textDecoration: 'none',
  fontSize: 'var(--font-size-sm)',
  fontWeight: 'var(--font-weight-medium)',
  marginBottom: 'var(--space-8)',
  transition: 'var(--transition-colors)',
};

export const sectionStyles: CSSProperties = {
  marginBottom: 'var(--space-12)',
};

export const gridStyles: CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
  gap: 'var(--space-6)',
};