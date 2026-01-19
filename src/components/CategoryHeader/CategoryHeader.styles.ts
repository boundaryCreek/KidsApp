import { CSSProperties } from 'react';

export const categoryHeaderStyles: CSSProperties = {
  textAlign: 'center' as const,
  marginBottom: 'var(--space-12)',
  padding: 'var(--space-8)',
  backgroundColor: 'var(--color-neutral-50)',
  borderRadius: 'var(--radius-2xl)',
  border: '1px solid var(--color-neutral-200)',
};

export const categoryIconStyles: CSSProperties = {
  marginBottom: 'var(--space-4)',
};

export const categoryTitleStyles: CSSProperties = {
  fontSize: 'var(--font-size-4xl)',
  fontWeight: 'var(--font-weight-bold)',
  marginBottom: 'var(--space-4)',
  lineHeight: 'var(--line-height-tight)',
};

export const categoryDescriptionStyles: CSSProperties = {
  fontSize: 'var(--font-size-lg)',
  color: 'var(--color-neutral-600)',
  marginBottom: 'var(--space-6)',
  maxWidth: '600px',
  margin: '0 auto var(--space-6) auto',
};

export const categoryStatsStyles: CSSProperties = {
  display: 'flex',
  gap: 'var(--space-6)',
  justifyContent: 'center',
  flexWrap: 'wrap' as const,
};

export const statItemStyles: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: 'var(--space-2)',
  fontSize: 'var(--font-size-base)',
  fontWeight: 'var(--font-weight-medium)',
  color: 'var(--color-neutral-700)',
};