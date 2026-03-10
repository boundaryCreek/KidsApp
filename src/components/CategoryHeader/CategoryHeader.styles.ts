import { CSSProperties } from 'react';

export const categoryHeaderStyles: CSSProperties = {
  position: 'relative',
  marginBottom: 'var(--space-6)',
  padding: 'var(--space-8)',
  borderRadius: 'var(--radius-2xl)',
  background: 'linear-gradient(135deg, var(--color-primary-50) 0%, var(--color-secondary-50) 100%)',
  border: '1px solid var(--color-primary-100)',
  overflow: 'hidden',
};

export const categoryHeaderAccentBar: CSSProperties = {
  position: 'absolute',
  top: 0,
  left: 0,
  width: '4px',
  height: '100%',
  background: 'var(--gradient-primary)',
  borderRadius: 'var(--radius-2xl) 0 0 var(--radius-2xl)',
};

export const categoryLabelStyles: CSSProperties = {
  fontSize: 'var(--font-size-xs)',
  fontWeight: 'var(--font-weight-semibold)',
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
  color: 'var(--color-primary-500)',
  marginBottom: 'var(--space-2)',
};

export const categoryTitleStyles: CSSProperties = {
  fontSize: 'var(--font-size-4xl)',
  fontWeight: 'var(--font-weight-bold)',
  lineHeight: 'var(--line-height-tight)',
  color: 'var(--color-primary-800)',
  marginBottom: 'var(--space-3)',
};

export const categoryDescriptionStyles: CSSProperties = {
  fontSize: 'var(--font-size-base)',
  color: 'var(--color-neutral-600)',
  lineHeight: 'var(--line-height-relaxed)',
  maxWidth: '640px',
  margin: 0,
};
