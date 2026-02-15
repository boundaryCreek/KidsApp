import { CSSProperties } from 'react';

export const footerStyles: CSSProperties = {
  backgroundColor: 'var(--color-neutral-900)',
  color: 'var(--color-neutral-300)',
  padding: 'var(--space-12) var(--space-6) var(--space-6)',
  borderTop: `var(--border-width-1) solid var(--color-neutral-800)`,
  marginTop: 'auto'
};

export const footerContainerStyles: CSSProperties = {
  maxWidth: 'var(--container-7xl)',
  margin: '0 auto'
};

export const footerContentStyles: CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
  gap: 'var(--space-8)',
  marginBottom: 'var(--space-8)'
};

export const footerSectionStyles: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: 'var(--space-3)'
};

export const footerTitleStyles: CSSProperties = {
  fontSize: 'var(--font-size-lg)',
  fontWeight: 'var(--font-weight-bold)',
  color: 'var(--color-neutral-50)',
  margin: '0 0 var(--space-3) 0'
};

export const footerLinkStyles: CSSProperties = {
  color: 'var(--color-neutral-400)',
  textDecoration: 'none',
  fontSize: 'var(--font-size-base)',
  fontWeight: 'var(--font-weight-normal)',
  transition: 'var(--transition-colors)',
  cursor: 'pointer',
  lineHeight: 'var(--line-height-relaxed)'
};

export const footerBottomStyles: CSSProperties = {
  borderTop: `var(--border-width-1) solid var(--color-neutral-800)`,
  paddingTop: 'var(--space-4)',
  textAlign: 'center'
};

export const footerTextStyles: CSSProperties = {
  margin: 0,
  fontSize: 'var(--font-size-sm)',
  fontWeight: 'var(--font-weight-normal)',
  color: 'var(--color-neutral-500)'
};