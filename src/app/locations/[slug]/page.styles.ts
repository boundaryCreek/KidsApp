import type { CSSProperties } from 'react';

export const container: CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'minmax(0, 1fr) 320px',
  gap: 'var(--space-6)',
  alignItems: 'start',
};

export const pageContainer: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: 'var(--space-8)',
};

export const breadcrumb: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: 'var(--space-2)',
  marginBottom: 0,
  fontSize: 'var(--font-size-sm)',
  color: 'var(--color-neutral-600)',
};

export const breadcrumbLink: CSSProperties = {
  color: 'var(--color-primary-600)',
  textDecoration: 'none',
  transition: 'color 0.2s ease',
};

export const locationHeader: CSSProperties = {
  background: 'var(--color-surface)',
  borderRadius: 'var(--radius-xl)',
  padding: 'var(--space-8)',
  boxShadow: 'var(--shadow-lg)',
  borderWidth: '1px',
  borderStyle: 'solid',
  borderColor: 'var(--color-neutral-200)',
};

export const locationTitle: CSSProperties = {
  fontSize: 'var(--font-size-4xl)',
  fontWeight: 'var(--font-weight-bold)',
  color: 'var(--color-neutral-900)',

  lineHeight: 'var(--line-height-tight)',
};

export const locationMeta: CSSProperties = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: 'var(--space-4)',
  marginBottom: 'var(--space-6)',
  alignItems: 'center',
};

export const typeTag: CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: 'var(--space-2)',
  backgroundColor: 'var(--color-primary-100)',
  color: 'var(--color-primary-700)',
  padding: 'var(--space-2) var(--space-4)',
  borderRadius: 'var(--radius-full)',
  fontSize: 'var(--font-size-sm)',
  fontWeight: 'var(--font-weight-medium)',
};

export const rating: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: 'var(--space-2)',
  color: 'var(--color-accent-600)',
  fontSize: 'var(--font-size-base)',
  fontWeight: 'var(--font-weight-medium)',
};

export const locationDescription: CSSProperties = {
  fontSize: 'var(--font-size-lg)',
  lineHeight: 'var(--line-height-relaxed)',
  color: 'var(--color-neutral-700)',
  marginBottom: 'var(--space-6)',
  whiteSpace: 'pre-wrap',
};

export const detailsGrid: CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
  gap: 'var(--space-6)',
 
};

export const detailsSection: CSSProperties = {
  background: 'var(--color-surface)',
  borderRadius: 'var(--radius-xl)',
  padding: 'var(--space-6)',
  boxShadow: 'var(--shadow-md)',
  borderWidth: '1px',
  borderStyle: 'solid',
  borderColor: 'var(--color-neutral-200)',
};

export const sectionTitle: CSSProperties = {
  fontSize: 'var(--font-size-xl)',
  fontWeight: 'var(--font-weight-bold)',
  color: 'var(--color-neutral-900)',
  marginBottom: 'var(--space-4)',
  display: 'flex',
  alignItems: 'center',
  gap: 'var(--space-2)',
};

export const contactInfo: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: 'var(--space-2)',
};

export const contactItem: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: 'var(--space-2)',
  padding: 'var(--space-1)',
  borderRadius: 'var(--radius-base)',
  transition: 'background-color 0.2s ease',
};

export const contactText: CSSProperties = {
  color: 'var(--color-neutral-700)',
  fontSize: 'var(--font-size-base)',
};

export const categoriesList: CSSProperties = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: 'var(--space-2)',
  marginTop: 'var(--space-1)',
};

export const categoryTag: CSSProperties = {
  backgroundColor: 'var(--color-secondary-100)',
  color: 'var(--color-secondary-800)',
  padding: 'var(--space-2) var(--space-3)',
  borderRadius: 'var(--radius-full)',
  fontSize: 'var(--font-size-sm)',
  fontWeight: 'var(--font-weight-medium)',
};

export const activitiesGrid: CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
  gap: 'var(--space-4)',
  marginTop: 'var(--space-6)',
};

export const activityCard: CSSProperties = {
  background: 'var(--color-surface)',
  borderRadius: 'var(--radius-lg)',
  padding: 'var(--space-4)',
  boxShadow: 'var(--shadow-sm)',
  borderWidth: '1px',
  borderStyle: 'solid',
  borderColor: 'var(--color-neutral-200)',
  transition: 'all 0.2s ease',
  cursor: 'pointer',
};

export const activityTitle: CSSProperties = {
  fontSize: 'var(--font-size-lg)',
  fontWeight: 'var(--font-weight-semibold)',
  color: 'var(--color-neutral-900)',
  marginBottom: 'var(--space-2)',
};

export const activityDescription: CSSProperties = {
  fontSize: 'var(--font-size-sm)',
  color: 'var(--color-neutral-600)',
  marginBottom: 'var(--space-3)',
  display: '-webkit-box',
  WebkitLineClamp: 2,
  WebkitBoxOrient: 'vertical' as const,
  overflow: 'hidden',
};

export const activityMeta: CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  fontSize: 'var(--font-size-xs)',
  color: 'var(--color-neutral-500)',
};

export const loadingSpinner: CSSProperties = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '50vh',
  fontSize: 'var(--font-size-lg)',
  color: 'var(--color-neutral-600)',
};

export const errorMessage: CSSProperties = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '50vh',
  fontSize: 'var(--font-size-lg)',
  color: 'var(--color-error-600)',
  textAlign: 'center',
  flexDirection: 'column',
  gap: 'var(--space-4)',
};