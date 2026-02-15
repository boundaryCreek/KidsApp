import type { CSSProperties } from 'react';

export const filterContainer: CSSProperties = {
  background: 'var(--color-surface)',
  borderRadius: 'var(--radius-xl)',
  padding: 'var(--space-6)',
  marginBottom: 'var(--space-8)',
  boxShadow: 'var(--shadow-md)',
  border: '1px solid var(--color-neutral-200)',
};

export const filterHeader: CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: 'var(--space-4)',
};

export const filterTitle: CSSProperties = {
  fontSize: 'var(--font-size-lg)',
  fontWeight: 'var(--font-weight-semibold)',
  color: 'var(--color-neutral-900)',
  margin: 0,
};

export const clearButton: CSSProperties = {
  padding: 'var(--space-2) var(--space-4)',
  backgroundColor: 'var(--color-error-600)',
  color: 'var(--color-neutral-50)',
  border: 'none',
  borderRadius: 'var(--radius-lg)',
  fontSize: 'var(--font-size-sm)',
  fontWeight: 'var(--font-weight-medium)',
  cursor: 'pointer',
  transition: 'var(--transition-colors)',
};

export const categoriesGrid: CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
  gap: 'var(--space-3)',
  marginBottom: 'var(--space-4)',
};

export const categoryButton: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: 'var(--space-2)',
  padding: 'var(--space-4)',
  backgroundColor: 'var(--color-surface)',
  border: '2px solid var(--color-neutral-300)',
  borderRadius: 'var(--radius-lg)',
  cursor: 'pointer',
  transition: 'var(--transition-all)',
  fontSize: 'var(--font-size-sm)',
  fontWeight: 'var(--font-weight-medium)',
  color: 'var(--color-neutral-700)',
};

export const categoryButtonActive: CSSProperties = {
  ...categoryButton,
  backgroundColor: 'var(--color-primary-100)',
  borderColor: 'var(--color-primary-600)',
  color: 'var(--color-primary-900)',
  boxShadow: 'var(--shadow-sm)',
};

export const categoryIcon: CSSProperties = {
  fontSize: 'var(--font-size-2xl)',
  lineHeight: 1,
};

export const categoryName: CSSProperties = {
  textAlign: 'center',
  wordBreak: 'break-word',
};

export const expandButton: CSSProperties = {
  width: '100%',
  padding: 'var(--space-3)',
  backgroundColor: 'var(--color-neutral-100)',
  border: '1px solid var(--color-neutral-300)',
  borderRadius: 'var(--radius-lg)',
  fontSize: 'var(--font-size-sm)',
  fontWeight: 'var(--font-weight-medium)',
  color: 'var(--color-neutral-700)',
  cursor: 'pointer',
  transition: 'var(--transition-colors)',
};
