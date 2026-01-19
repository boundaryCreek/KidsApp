import type { CSSProperties } from 'react';

export const pageContainer: CSSProperties = {
  minHeight: '100vh',
  background: 'linear-gradient(135deg, var(--color-primary-50) 0%, var(--color-secondary-50) 50%, var(--color-accent-50) 100%)',
  padding: 'var(--space-8) var(--space-4)',
};

export const container: CSSProperties = {
  maxWidth: 'var(--container-7xl)',
  margin: '0 auto',
  padding: '0 var(--space-4)',
};

export const headerSection: CSSProperties = {
  textAlign: 'center',
  marginBottom: 'var(--space-12)',
};

export const title: CSSProperties = {
  fontSize: 'var(--font-size-4xl)',
  fontWeight: 'var(--font-weight-bold)',
  color: 'var(--color-neutral-900)',
  marginBottom: 'var(--space-4)',
  textShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
};

export const subtitle: CSSProperties = {
  fontSize: 'var(--font-size-lg)',
  color: 'var(--color-neutral-700)',
  maxWidth: '600px',
  margin: '0 auto',
  lineHeight: 'var(--line-height-relaxed)',
};

export const locationsGrid: CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
  gap: 'var(--space-6)',
  marginTop: 'var(--space-8)',
};

export const locationsGridResponsive = {
  base: {
    ...locationsGrid,
    gridTemplateColumns: '1fr',
  },
  md: {
    ...locationsGrid,
    gridTemplateColumns: 'repeat(2, 1fr)',
  },
  lg: {
    ...locationsGrid,
    gridTemplateColumns: 'repeat(3, 1fr)',
  },
  xl: {
    ...locationsGrid,
    gridTemplateColumns: 'repeat(4, 1fr)',
  },
};

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
};

export const locationHeader: CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  marginBottom: 'var(--space-3)',
};

export const locationInfo: CSSProperties = {
  flex: 1,
};

export const locationName: CSSProperties = {
  fontSize: 'var(--font-size-xl)',
  fontWeight: 'var(--font-weight-bold)',
  color: 'var(--color-neutral-900)',
  margin: '0 0 var(--space-2) 0',
};

export const locationMeta: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: 'var(--space-3)',
  fontSize: 'var(--font-size-sm)',
  color: 'var(--color-neutral-600)',
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
  marginBottom: 'var(--space-4)',
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

export const loadingSpinner: CSSProperties = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '400px',
  fontSize: 'var(--font-size-lg)',
  color: 'var(--color-neutral-600)',
};

export const errorMessage: CSSProperties = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '400px',
  fontSize: 'var(--font-size-lg)',
  color: 'var(--color-error-600)',
  textAlign: 'center',
};