import { CSSProperties } from 'react';

export const mapContainerStyles: CSSProperties = {
  position: 'relative',
  width: '100%',
  borderRadius: 'var(--radius-lg)',
  overflow: 'hidden',
  border: '1px solid var(--color-neutral-300)',
  boxShadow: 'var(--shadow-sm)',
};

export const searchBoxStyles: CSSProperties = {
  position: 'absolute',
  top: 'var(--space-4)',
  left: 'var(--space-4)',
  right: 'var(--space-4)',
  zIndex: 1000,
  display: 'flex',
  gap: 'var(--space-2)',
};

export const searchInputStyles: CSSProperties = {
  flex: 1,
  padding: 'var(--space-3)',
  fontSize: 'var(--font-size-sm)',
  border: '1px solid var(--color-neutral-300)',
  borderRadius: 'var(--radius-md)',
  backgroundColor: 'var(--color-neutral-50)',
  boxShadow: 'var(--shadow-md)',
};

export const searchButtonStyles: CSSProperties = {
  padding: 'var(--space-3)',
  backgroundColor: 'var(--color-primary-600)',
  color: 'var(--color-neutral-50)',
  border: 'none',
  borderRadius: 'var(--radius-md)',
  cursor: 'pointer',
  fontSize: 'var(--font-size-sm)',
  fontWeight: 'var(--font-weight-medium)',
  boxShadow: 'var(--shadow-md)',
  display: 'flex',
  alignItems: 'center',
  gap: 'var(--space-2)',
  transition: 'var(--transition-colors)',
};

export const infoBoxStyles: CSSProperties = {
  position: 'absolute',
  bottom: 'var(--space-4)',
  left: 'var(--space-4)',
  right: 'var(--space-4)',
  zIndex: 1000,
  padding: 'var(--space-4)',
  backgroundColor: 'var(--color-neutral-50)',
  borderRadius: 'var(--radius-md)',
  boxShadow: 'var(--shadow-lg)',
  fontSize: 'var(--font-size-sm)',
};

export const infoTitleStyles: CSSProperties = {
  fontSize: 'var(--font-size-sm)',
  fontWeight: 'var(--font-weight-semibold)',
  marginBottom: 'var(--space-2)',
  color: 'var(--color-neutral-900)',
};

export const infoTextStyles: CSSProperties = {
  color: 'var(--color-neutral-600)',
  marginBottom: 'var(--space-1)',
};

export const coordinatesStyles: CSSProperties = {
  display: 'flex',
  gap: 'var(--space-4)',
  marginTop: 'var(--space-2)',
  fontFamily: 'monospace',
  fontSize: 'var(--font-size-xs)',
  color: 'var(--color-neutral-500)',
};

export const loadingOverlayStyles: CSSProperties = {
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(255, 255, 255, 0.8)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 2000,
};
