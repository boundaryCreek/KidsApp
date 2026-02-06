import { CSSProperties } from 'react';

export const breadcrumbStyles: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: 'var(--space-2)',
  fontSize: 'var(--font-size-sm)',
  color: 'var(--color-neutral-600)',
};

export const breadcrumbItemStyles: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: 'var(--space-2)',
};

export const breadcrumbLinkStyles: CSSProperties = {
  color: 'var(--color-primary-600)',
  textDecoration: 'none',
  transition: 'var(--transition-colors)',
};

export const currentPageStyles: CSSProperties = {
  fontWeight: 'var(--font-weight-medium)',
  color: 'var(--color-neutral-900)',
};