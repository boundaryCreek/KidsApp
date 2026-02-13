import type { CSSProperties } from 'react';

export const locationSelectorContainer: CSSProperties = {
  position: 'relative',
};

export const locationSelectorBox: CSSProperties = {
  background: 'rgba(255, 255, 255, 0.15)',
  border: '1px solid rgba(255, 255, 255, 0.3)',
  borderRadius: 'var(--radius-lg)',
  padding: 'var(--space-2) var(--space-4)',
  backdropFilter: 'blur(10px)',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  transition: 'all 0.2s ease',
  color: 'white',
  fontSize: 'inherit',
  fontFamily: 'inherit',
  width: '200px',
  position: 'relative',
};

export const locationSelectorContent: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: 'var(--space-2)',
  flex: 1,
  minWidth: 0,
  paddingRight: 'var(--space-4)',
};

export const locationIcon: CSSProperties = {
  color: '#ffffff',
  flexShrink: 0,
  minWidth: '16px',
  minHeight: '16px',
};

export const chevronIcon: CSSProperties = {
  color: '#ffffff',
  flexShrink: 0,
  position: 'absolute',
  right: 'var(--space-4)',
};

export const locationName: CSSProperties = {
  fontSize: 'var(--font-size-base)',
  fontWeight: 'var(--font-weight-semibold)',
  color: 'white',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
};

export const dropdownMenu: CSSProperties = {
  position: 'absolute',
  top: 'calc(100% + 8px)',
  right: 0,
  background: 'var(--color-surface)',
  border: '1px solid var(--color-neutral-200)',
  borderRadius: 'var(--radius-lg)',
  boxShadow: 'var(--shadow-lg)',
  zIndex: 1000,
  maxHeight: '300px',
  overflowY: 'auto',
  minWidth: '200px',
};

export const dropdownItem: CSSProperties = {
  width: '100%',
  padding: 'var(--space-3) var(--space-4)',
  border: 'none',
  background: 'transparent',
  color: 'var(--color-text)',
  textAlign: 'left',
  cursor: 'pointer',
  fontSize: 'var(--font-size-base)',
  transition: 'background-color 0.2s ease',
  fontFamily: 'inherit',
};

export const dropdownItemActive: CSSProperties = {
  background: 'var(--color-primary-100)',
  color: 'var(--color-primary-700)',
  fontWeight: 'var(--font-weight-semibold)',
};
