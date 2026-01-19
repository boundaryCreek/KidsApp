import { CSSProperties } from 'react';

export const emptyStateStyles: CSSProperties = {
  textAlign: 'center' as const,
  padding: 'var(--space-12)',
  color: 'var(--color-neutral-500)',
};

export const emptyStateIconStyles: CSSProperties = {
  marginBottom: 'var(--space-4)',
  opacity: 0.5,
};

export const emptyStateTitleStyles: CSSProperties = {
  fontSize: 'var(--font-size-xl)',
  fontWeight: 'var(--font-weight-semibold)',
  color: 'var(--color-neutral-700)',
  marginBottom: 'var(--space-2)',
};

export const emptyStateDescriptionStyles: CSSProperties = {
  fontSize: 'var(--font-size-base)',
  color: 'var(--color-neutral-500)',
};