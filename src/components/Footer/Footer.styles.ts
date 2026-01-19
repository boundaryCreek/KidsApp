import { CSSProperties } from 'react';

export const footerStyles: CSSProperties = {
  backgroundColor: 'var(--color-surface-secondary)',
  color: 'var(--color-muted)',
  padding: 'var(--space-6) var(--space-6)',
  borderTop: `var(--border-width-1) solid var(--color-border)`,
  marginTop: 'auto'
};

export const footerContainerStyles: CSSProperties = {
  maxWidth: 'var(--container-7xl)',
  margin: '0 auto',
  textAlign: 'center'
};

export const footerTextStyles: CSSProperties = {
  margin: 0,
  fontSize: 'var(--font-size-sm)',
  fontWeight: 'var(--font-weight-normal)'
};