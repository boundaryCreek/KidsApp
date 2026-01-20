import { CSSProperties } from 'react';

export const dashboardGridStyles: CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
  gap: 'var(--space-6)',
  marginBottom: 'var(--space-8)',
};

export const dashboardCardStyles: CSSProperties = {
  backgroundColor: 'var(--color-background)',
  borderRadius: 'var(--radius-lg)',
  padding: 'var(--space-6)',
  boxShadow: 'var(--shadow-sm)',
  border: '1px solid var(--color-border)',
  display: 'flex',
  alignItems: 'center',
  gap: 'var(--space-4)',
};

export const dashboardIconStyles: CSSProperties = {
  width: '48px',
  height: '48px',
  borderRadius: 'var(--radius-lg)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
};

export const dashboardContentStyles: CSSProperties = {
  flex: 1,
};

export const dashboardNumberStyles: CSSProperties = {
  fontSize: 'var(--font-size-2xl)',
  fontWeight: 'var(--font-weight-bold)',
  color: 'var(--color-text)',
  margin: 0,
  lineHeight: 1,
};

export const dashboardLabelStyles: CSSProperties = {
  fontSize: 'var(--font-size-sm)',
  color: 'var(--color-text-secondary)',
  margin: 0,
  marginTop: 'var(--space-1)',
};

export const dashboardSectionStyles: CSSProperties = {
  marginTop: 'var(--space-8)',
};

export const dashboardSectionTitleStyles: CSSProperties = {
  fontSize: 'var(--font-size-xl)',
  fontWeight: 'var(--font-weight-semibold)',
  color: 'var(--color-text)',
  margin: 0,
  marginBottom: 'var(--space-4)',
};

export const quickActionsGridStyles: CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
  gap: 'var(--space-4)',
};

export const quickActionCardStyles: CSSProperties = {
  backgroundColor: 'var(--color-background)',
  borderRadius: 'var(--radius-lg)',
  padding: 'var(--space-4)',
  boxShadow: 'var(--shadow-sm)',
  border: '1px solid var(--color-border)',
  textDecoration: 'none',
  color: 'inherit',
  transition: 'var(--transition-colors)',
  display: 'block',
};

export const quickActionHeaderStyles: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: 'var(--space-3)',
  marginBottom: 'var(--space-2)',
};

export const quickActionIconStyles: CSSProperties = {
  width: '32px',
  height: '32px',
  borderRadius: 'var(--radius-md)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: 'var(--color-primary-100)',
  color: 'var(--color-primary-600)',
};

export const quickActionTitleStyles: CSSProperties = {
  fontSize: 'var(--font-size-base)',
  fontWeight: 'var(--font-weight-semibold)',
  color: 'var(--color-text)',
  margin: 0,
};

export const quickActionDescriptionStyles: CSSProperties = {
  fontSize: 'var(--font-size-sm)',
  color: 'var(--color-text-secondary)',
  margin: 0,
};