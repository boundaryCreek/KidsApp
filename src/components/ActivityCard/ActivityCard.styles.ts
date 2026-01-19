import type { CSSProperties } from 'react';

export const activityCard: CSSProperties = {
  background: 'var(--color-surface)',
  borderRadius: 'var(--radius-xl)',
  padding: 'var(--space-6)',
  boxShadow: 'var(--shadow-md)',
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
  height: '100%',
};

export const activityCardHover: CSSProperties = {
  ...activityCard,
  transform: 'translateY(-4px)',
  boxShadow: 'var(--shadow-lg)',
  borderColor: 'var(--color-primary-300)',
};

export const activityHeader: CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  gap: 'var(--space-3)',
};

export const activityTitle: CSSProperties = {
  fontSize: 'var(--font-size-lg)',
  fontWeight: 'var(--font-weight-bold)',
  color: 'var(--color-neutral-900)',
  margin: '0 0 var(--space-2) 0',
  lineHeight: 'var(--line-height-tight)',
};

export const activityMeta: CSSProperties = {
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  gap: 'var(--space-2)',
  fontSize: 'var(--font-size-sm)',
  color: 'var(--color-neutral-600)',
  marginBottom: 'var(--space-3)',
};

export const ageGroupTag: CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: 'var(--space-1)',
  backgroundColor: 'var(--color-accent-100)',
  color: 'var(--color-accent-700)',
  padding: 'var(--space-1) var(--space-2)',
  borderRadius: 'var(--radius-base)',
  fontSize: 'var(--font-size-xs)',
  fontWeight: 'var(--font-weight-medium)',
};

export const costTag: CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: 'var(--space-1)',
  padding: 'var(--space-1) var(--space-2)',
  borderRadius: 'var(--radius-base)',
  fontSize: 'var(--font-size-xs)',
  fontWeight: 'var(--font-weight-semibold)',
};

export const costFree: CSSProperties = {
  ...costTag,
  backgroundColor: 'var(--color-success-100)',
  color: 'var(--color-success-700)',
};

export const costPaid: CSSProperties = {
  ...costTag,
  backgroundColor: 'var(--color-warning-100)',
  color: 'var(--color-warning-700)',
};

export const activityDescription: CSSProperties = {
  color: 'var(--color-neutral-700)',
  fontSize: 'var(--font-size-base)',
  lineHeight: 'var(--line-height-relaxed)',
  marginBottom: 'var(--space-3)',
  display: '-webkit-box',
  WebkitLineClamp: 3,
  WebkitBoxOrient: 'vertical' as const,
  overflow: 'hidden',
};

export const activityLocation: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: 'var(--space-2)',
  color: 'var(--color-neutral-600)',
  fontSize: 'var(--font-size-sm)',
  marginBottom: 'var(--space-3)',
};

export const organizerInfo: CSSProperties = {
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

export const activityStats: CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  paddingTop: 'var(--space-3)',
  borderTop: '1px solid var(--color-neutral-200)',
  marginTop: 'auto',
  fontSize: 'var(--font-size-sm)',
  color: 'var(--color-neutral-600)',
};

export const statItem: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: 'var(--space-1)',
};

export const featuredBadge: CSSProperties = {
  position: 'absolute' as const,
  top: 'var(--space-3)',
  right: 'var(--space-3)',
  backgroundColor: 'var(--color-primary-600)',
  color: 'var(--color-neutral-50)',
  padding: 'var(--space-1) var(--space-2)',
  borderRadius: 'var(--radius-base)',
  fontSize: 'var(--font-size-xs)',
  fontWeight: 'var(--font-weight-semibold)',
};

export const cardWithFeatured: CSSProperties = {
  ...activityCard,
  position: 'relative' as const,
};