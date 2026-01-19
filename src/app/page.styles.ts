import { CSSProperties } from 'react';

export const homeContainerStyles: CSSProperties = {
  maxWidth: 'var(--container-7xl)',
  margin: '0 auto',
  padding: 'var(--space-6)',
  display: 'flex',
  flexDirection: 'column',
  gap: 'var(--space-16)'
};

export const heroSectionStyles: CSSProperties = {
  textAlign: 'center',
  padding: 'var(--space-12) var(--space-6)',
  backgroundColor: 'var(--color-primary-50)',
  borderRadius: 'var(--radius-2xl)',
  border: `var(--border-width-1) solid var(--color-primary-200)`
};

export const heroTitleStyles: CSSProperties = {
  fontSize: 'var(--font-size-4xl)',
  fontWeight: 'var(--font-weight-bold)',
  fontFamily: 'var(--font-sans)',
  color: 'var(--color-primary-800)',
  marginBottom: 'var(--space-6)',
  lineHeight: 'var(--line-height-tight)'
};

export const heroSubtitleStyles: CSSProperties = {
  fontSize: 'var(--font-size-lg)',
  fontFamily: 'var(--font-sans)',
  color: 'var(--color-primary-700)',
  marginBottom: 'var(--space-8)',
  maxWidth: '42rem',
  margin: '0 auto var(--space-8) auto',
  lineHeight: 'var(--line-height-relaxed)'
};

export const ctaButtonStyles: CSSProperties = {
  backgroundColor: 'var(--color-secondary-500)',
  color: 'var(--color-neutral-50)',
  border: 'none',
  padding: 'var(--space-4) var(--space-8)',
  fontSize: 'var(--font-size-lg)',
  fontWeight: 'var(--font-weight-semibold)',
  fontFamily: 'var(--font-sans)',
  borderRadius: 'var(--radius-xl)',
  cursor: 'pointer',
  boxShadow: 'var(--shadow-lg)',
  transition: 'var(--transition-all)'
};

export const featuresGridStyles: CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
  gap: 'var(--space-6)',
  marginTop: 'var(--space-16)'
};

export const featureCardStyles: CSSProperties = {
  backgroundColor: 'var(--color-surface)',
  padding: 'var(--space-8)',
  borderRadius: 'var(--radius-xl)',
  border: `var(--border-width-1) solid var(--color-border)`,
  boxShadow: 'var(--shadow-md)',
  textAlign: 'center',
  transition: 'var(--transition-all)'
};

export const featureEmojiStyles: CSSProperties = {
  fontSize: 'var(--font-size-6xl)',
  marginBottom: 'var(--space-4)',
  display: 'block'
};

export const featureTitleStyles: CSSProperties = {
  fontSize: 'var(--font-size-xl)',
  fontWeight: 'var(--font-weight-semibold)',
  fontFamily: 'var(--font-sans)',
  color: 'var(--color-primary-700)',
  marginBottom: 'var(--space-3)',
  margin: '0 0 var(--space-3) 0'
};

export const featureDescriptionStyles: CSSProperties = {
  fontSize: 'var(--font-size-base)',
  fontFamily: 'var(--font-sans)',
  color: 'var(--color-muted)',
  lineHeight: 'var(--line-height-relaxed)',
  margin: 0
};