import { CSSProperties } from 'react';

export const baseLayoutStyles: CSSProperties = {
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: 'var(--background)',
  color: 'var(--foreground)'
};

export const mainStyles: CSSProperties = {
  flex: 1,
  padding: 'var(--space-8) 0',
  width: '100%'
};

export const contentWrapperStyles: CSSProperties = {
  display: 'grid',
  gap: 'var(--space-8)',
  alignItems: 'start',
  maxWidth: 'var(--container-5xl)',
  margin: '0 auto',
  width: '100%',
  padding: '0 var(--space-6)'
};

export const contentWrapperWithRailStyles: CSSProperties = {
  ...contentWrapperStyles,
  gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 260px)',
};

export const contentWrapperSingleColumnStyles: CSSProperties = {
  ...contentWrapperStyles,
  gridTemplateColumns: '1fr',
};

export const mainContentStyles: CSSProperties = {
  minWidth: 0 // Prevent grid blowout
};

export const rightRailStyles: CSSProperties = {
 // position: 'sticky',
  top: 'var(--space-6)',
 // maxHeight: 'calc(100vh - var(--space-12))',
 // overflowY: 'auto' as const,
  fontSize: 'var(--font-size-sm)',
  width: '100%',
  maxWidth: '260px'
};