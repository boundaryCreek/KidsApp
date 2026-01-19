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
  padding: 'var(--space-8) var(--space-6)',
  maxWidth: 'var(--container-7xl)',
  margin: '0 auto',
  width: '100%'
};