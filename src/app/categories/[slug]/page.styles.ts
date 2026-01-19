import { CSSProperties } from 'react'

export const categoryDetailsContainerStyles: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: 'var(--space-8)',
  maxWidth: 'var(--container-7xl)',
  margin: '0 auto'
}

export const backLinkStyles: CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: 'var(--space-2)',
  color: 'var(--color-primary-600)',
  textDecoration: 'none',
  fontSize: 'var(--font-size-base)',
  fontWeight: 'var(--font-weight-medium)',
  padding: 'var(--space-2) var(--space-4)',
  borderRadius: 'var(--radius-lg)',
  border: `var(--border-width-1) solid var(--color-border)`,
  backgroundColor: 'var(--color-surface)',
  transition: 'var(--transition-colors)',
  alignSelf: 'flex-start'
}

export const categoryHeaderStyles: CSSProperties = {
  textAlign: 'center',
  backgroundColor: 'var(--color-surface)',
  borderRadius: 'var(--radius-xl)',
  padding: 'var(--space-8)',
  border: `var(--border-width-1) solid var(--color-border)`,
  boxShadow: 'var(--shadow-md)'
}

export const categoryIconStyles: CSSProperties = {
  marginBottom: 'var(--space-4)'
}

export const categoryTitleStyles: CSSProperties = {
  fontSize: 'var(--font-size-4xl)',
  fontWeight: 'var(--font-weight-bold)',
  marginBottom: 'var(--space-4)',
  margin: '0 0 var(--space-4) 0'
}

export const categoryDescriptionStyles: CSSProperties = {
  fontSize: 'var(--font-size-lg)',
  color: 'var(--color-muted)',
  lineHeight: 'var(--line-height-relaxed)',
  marginBottom: 'var(--space-6)',
  margin: '0 0 var(--space-6) 0',
  maxWidth: '42rem',
  marginLeft: 'auto',
  marginRight: 'auto'
}

export const categoryStatsStyles: CSSProperties = {
  display: 'flex',
  justifyContent: 'center',
  gap: 'var(--space-8)',
  marginTop: 'var(--space-6)'
}

export const statItemStyles: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: 'var(--space-2)',
  fontSize: 'var(--font-size-lg)',
  fontWeight: 'var(--font-weight-medium)',
  color: 'var(--color-foreground)'
}

export const sectionStyles: CSSProperties = {
  marginTop: 'var(--space-8)'
}

export const sectionTitleStyles: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: 'var(--space-3)',
  fontSize: 'var(--font-size-2xl)',
  fontWeight: 'var(--font-weight-semibold)',
  color: 'var(--color-primary-600)',
  marginBottom: 'var(--space-6)',
  margin: '0 0 var(--space-6) 0'
}

export const gridStyles: CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
  gap: 'var(--space-6)'
}

export const cardStyles: CSSProperties = {
  backgroundColor: 'var(--color-surface)',
  borderRadius: 'var(--radius-lg)',
  border: `var(--border-width-1) solid var(--color-border)`,
  padding: 'var(--space-6)',
  boxShadow: 'var(--shadow-sm)',
  transition: 'var(--transition-all)',
  cursor: 'pointer'
}

export const cardHeaderStyles: CSSProperties = {
  marginBottom: 'var(--space-4)'
}

export const cardTitleStyles: CSSProperties = {
  fontSize: 'var(--font-size-lg)',
  fontWeight: 'var(--font-weight-semibold)',
  color: 'var(--color-foreground)',
  marginBottom: 'var(--space-2)',
  margin: '0 0 var(--space-2) 0'
}

export const cardMetaStyles: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: 'var(--space-2)',
  fontSize: 'var(--font-size-sm)',
  color: 'var(--color-muted)',
  marginBottom: 'var(--space-3)'
}

export const cardDescriptionStyles: CSSProperties = {
  fontSize: 'var(--font-size-base)',
  color: 'var(--color-muted)',
  lineHeight: 'var(--line-height-relaxed)',
  marginBottom: 'var(--space-4)',
  margin: '0 0 var(--space-4) 0'
}

export const locationCardStyles: CSSProperties = {
  borderLeft: `var(--border-width-4) solid var(--color-secondary-500)`
}

export const activityCardStyles: CSSProperties = {
  borderLeft: `var(--border-width-4) solid var(--color-accent-500)`
}

export const loadingContainerStyles: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '400px',
  gap: 'var(--space-4)',
  fontSize: 'var(--font-size-lg)',
  color: 'var(--color-muted)'
}

export const errorContainerStyles: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '400px',
  gap: 'var(--space-4)',
  textAlign: 'center'
}