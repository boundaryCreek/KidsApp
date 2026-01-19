import type { CSSProperties } from 'react';

export const locationCard: CSSProperties = {
  background: 'var(--color-surface)',
  borderRadius: 'var(--radius-xl)',
  padding: 'var(--space-6)',
  boxShadow: 'var(--shadow-lg)',
  transition: 'all 0.3s ease',
  borderWidth: '1px',
  borderStyle: 'solid',
  borderColor: 'var(--color-neutral-200)',
  cursor: 'pointer',
  display: 'flex',
  flexDirection: 'column',
  gap: 'var(--space-4)',
  textDecoration: 'none',
  color: 'inherit',
};

export const locationCardHover: CSSProperties = {
  ...locationCard,
  transform: 'translateY(-4px)',
  boxShadow: 'var(--shadow-2xl)',
  borderColor: 'var(--color-primary-300)',
};

export const locationHeader: CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  marginBottom: 'var(--space-2)',
};

export const locationInfo: CSSProperties = {
  flex: 1,
};

export const locationName: CSSProperties = {
  fontSize: 'var(--font-size-xl)',
  fontWeight: 'var(--font-weight-bold)',
  color: 'var(--color-neutral-900)',
  margin: '0 0 var(--space-2) 0',
  lineHeight: 'var(--line-height-tight)',
};

export const locationMeta: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: 'var(--space-3)',
  fontSize: 'var(--font-size-sm)',
  color: 'var(--color-neutral-600)',
  marginBottom: 'var(--space-3)',
};

export const locationTypeTag: CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: 'var(--space-1)',
  backgroundColor: 'var(--color-primary-100)',
  color: 'var(--color-primary-700)',
  padding: 'var(--space-1) var(--space-2)',
  borderRadius: 'var(--radius-base)',
  fontSize: 'var(--font-size-xs)',
  fontWeight: 'var(--font-weight-medium)',
  textTransform: 'capitalize' as const,
};

export const locationDescription: CSSProperties = {
  color: 'var(--color-neutral-700)',
  fontSize: 'var(--font-size-base)',
  lineHeight: 'var(--line-height-relaxed)',
  marginBottom: 'var(--space-3)',
  display: '-webkit-box',
  WebkitLineClamp: 3,
  WebkitBoxOrient: 'vertical' as const,
  overflow: 'hidden',
};

export const locationAddress: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: 'var(--space-2)',
  color: 'var(--color-neutral-600)',
  fontSize: 'var(--font-size-sm)',
  marginBottom: 'var(--space-3)',
};

export const categoriesList: CSSProperties = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: 'var(--space-2)',
  marginBottom: 'var(--space-4)',
};

export const categoryTag: CSSProperties = {
  backgroundColor: 'var(--color-secondary-100)',
  color: 'var(--color-secondary-800)',
  padding: 'var(--space-1) var(--space-2)',
  borderRadius: 'var(--radius-base)',
  fontSize: 'var(--font-size-xs)',
  fontWeight: 'var(--font-weight-medium)',
};

export const locationStats: CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  paddingTop: 'var(--space-3)',
  borderTop: '1px solid var(--color-neutral-200)',
  marginTop: 'auto',
};

export const statItem: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: 'var(--space-2)',
  color: 'var(--color-neutral-600)',
  fontSize: 'var(--font-size-sm)',
};

export const rating: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: 'var(--space-1)',
  color: 'var(--color-accent-600)',
  fontSize: 'var(--font-size-sm)',
  fontWeight: 'var(--font-weight-medium)',
};