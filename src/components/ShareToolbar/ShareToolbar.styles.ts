import { CSSProperties } from 'react';

export const shareToolbar: CSSProperties = {
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
};

export const shareButton: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: 'var(--space-2)',
  padding: 'var(--space-2) var(--space-4)',
  backgroundColor: 'var(--color-primary-600)',
  border: 'none',
  borderRadius: 'var(--radius-md)',
  fontSize: 'var(--font-size-sm)',
  fontWeight: 'var(--font-weight-medium)',
  color: 'white',
  cursor: 'pointer',
  transition: 'var(--transition-colors)',
};

export const shareButtonText: CSSProperties = {
  display: 'inline',
};

export const shareMenu: CSSProperties = {
  position: 'absolute',
  top: '100%',
  left: '50%',
  transform: 'translateX(-50%)',
  marginTop: 'var(--space-2)',
  backgroundColor: 'var(--color-surface)',
  border: '1px solid var(--color-neutral-200)',
  borderRadius: 'var(--radius-lg)',
  boxShadow: 'var(--shadow-xl)',
  padding: 'var(--space-2)',
  zIndex: 1000,
  minWidth: '200px',
};

export const shareMenuItem: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: 'var(--space-3)',
  width: '100%',
  padding: 'var(--space-3) var(--space-4)',
  backgroundColor: 'transparent',
  border: 'none',
  borderRadius: 'var(--radius-md)',
  fontSize: 'var(--font-size-sm)',
  fontWeight: 'var(--font-weight-medium)',
  color: 'var(--color-neutral-700)',
  cursor: 'pointer',
  transition: 'var(--transition-colors)',
  textAlign: 'left',
};
