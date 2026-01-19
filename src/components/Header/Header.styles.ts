import { CSSProperties } from 'react';

export const headerStyles: CSSProperties = {
  backgroundColor: 'var(--color-primary-600)',
  color: 'var(--color-neutral-50)',
  padding: 'var(--space-4) var(--space-6)',
  boxShadow: 'var(--shadow-sm)',
  borderBottom: `var(--border-width-1) solid var(--color-border)`
};

export const headerContainerStyles: CSSProperties = {
  maxWidth: 'var(--container-7xl)',
  margin: '0 auto',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center'
};

export const headerTitleStyles: CSSProperties = {
  fontSize: 'var(--font-size-xl)',
  fontWeight: 'var(--font-weight-semibold)',
  fontFamily: 'var(--font-sans)',
  margin: 0,
  color: 'var(--color-neutral-50)'
};

export const navStyles: CSSProperties = {
  display: 'flex',
  gap: 'var(--space-6)',
  listStyle: 'none',
  margin: 0,
  padding: 0
};

export const baseLinkStyles: CSSProperties = {
  color: 'var(--color-neutral-50)',
  textDecoration: 'none',
  fontWeight: 'var(--font-weight-medium)',
  fontSize: 'var(--font-size-base)',
  fontFamily: 'var(--font-sans)',
  padding: 'var(--space-2) var(--space-4)',
  borderRadius: 'var(--radius-base)',
  display: 'inline-block'
};

export const homeLinkStyles: CSSProperties = {
  ...baseLinkStyles,
  backgroundColor: 'var(--color-primary-500)'
};

export const calendarLinkStyles: CSSProperties = {
  ...baseLinkStyles,
  backgroundColor: 'var(--color-primary-500)'
};