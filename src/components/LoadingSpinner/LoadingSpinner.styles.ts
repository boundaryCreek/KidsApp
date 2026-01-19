import { CSSProperties } from 'react';

export const loadingContainerStyles: CSSProperties = {
  display: 'flex',
  flexDirection: 'column' as const,
  alignItems: 'center',
  justifyContent: 'center',
  padding: 'var(--space-12)',
  gap: 'var(--space-4)',
  color: 'var(--color-neutral-600)',
};

export const spinnerStyles: CSSProperties = {
  animation: 'spin 1s linear infinite',
};