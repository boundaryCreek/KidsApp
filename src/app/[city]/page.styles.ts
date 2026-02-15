import type { CSSProperties } from 'react';

export const pageContainer: CSSProperties = {
  minHeight: '100vh',
  padding: 'var(--space-8) var(--space-4)',
  background: 'linear-gradient(to bottom, var(--color-neutral-50), var(--color-surface))',
};

export const container: CSSProperties = {
  maxWidth: 'var(--container-7xl)',
  margin: '0 auto',
  padding: '0 var(--space-4)',
};

export const breadcrumb: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: 'var(--space-2)',
  marginBottom: 'var(--space-6)',
  fontSize: 'var(--font-size-sm)',
};

export const breadcrumbLink: CSSProperties = {
  color: 'var(--color-primary-600)',
  textDecoration: 'none',
  transition: 'var(--transition-colors)',
};

export const breadcrumbSeparator: CSSProperties = {
  color: 'var(--color-neutral-400)',
};

export const breadcrumbCurrent: CSSProperties = {
  color: 'var(--color-neutral-700)',
  fontWeight: 'var(--font-weight-medium)',
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
  maxWidth: '700px',
  margin: '0 auto var(--space-8) auto',
  lineHeight: 'var(--line-height-relaxed)',
};

export const statsBar: CSSProperties = {
  display: 'flex',
  justifyContent: 'center',
  gap: 'var(--space-8)',
  marginTop: 'var(--space-8)',
  padding: 'var(--space-6)',
  background: 'var(--color-surface)',
  borderRadius: 'var(--radius-2xl)',
  boxShadow: 'var(--shadow-md)',
  border: '1px solid var(--color-neutral-200)',
};

export const statItem: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: 'var(--space-2)',
};

export const statValue: CSSProperties = {
  fontSize: 'var(--font-size-3xl)',
  fontWeight: 'var(--font-weight-bold)',
  color: 'var(--color-primary-600)',
};

export const statLabel: CSSProperties = {
  fontSize: 'var(--font-size-sm)',
  color: 'var(--color-neutral-600)',
  textTransform: 'uppercase' as const,
  letterSpacing: 'var(--letter-spacing-wide)',
  fontWeight: 'var(--font-weight-medium)',
};

export const locationsGrid: CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
  gap: 'var(--space-6)',
  marginTop: 'var(--space-8)',
};

export const emptyState: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '400px',
  textAlign: 'center',
  padding: 'var(--space-12)',
  background: 'var(--color-surface)',
  borderRadius: 'var(--radius-2xl)',
  border: '2px dashed var(--color-neutral-300)',
};

export const emptyStateText: CSSProperties = {
  fontSize: 'var(--font-size-xl)',
  color: 'var(--color-neutral-600)',
  marginBottom: 'var(--space-6)',
  fontWeight: 'var(--font-weight-medium)',
};

export const emptyStateLink: CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: 'var(--space-2)',
  padding: 'var(--space-3) var(--space-6)',
  backgroundColor: 'var(--color-primary-600)',
  color: 'var(--color-neutral-50)',
  borderRadius: 'var(--radius-lg)',
  textDecoration: 'none',
  fontSize: 'var(--font-size-base)',
  fontWeight: 'var(--font-weight-medium)',
  boxShadow: 'var(--shadow-md)',
  transition: 'var(--transition-all)',
};
