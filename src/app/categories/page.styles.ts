import { CSSProperties } from 'react'

export const categoriesContainerStyles: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: 'var(--space-8)'
}

export const categoriesHeaderStyles: CSSProperties = {
  textAlign: 'center',
  marginBottom: 'var(--space-8)',
  backgroundColor: 'var(--color-surface)',
  borderRadius: 'var(--radius-xl)',
  padding: 'var(--space-8)',
  border: `var(--border-width-1) solid var(--color-border)`
}

export const categoriesIconStyles: CSSProperties = {
  marginBottom: 'var(--space-4)'
}

export const categoriesTitleStyles: CSSProperties = {
  fontSize: 'var(--font-size-3xl)',
  fontWeight: 'var(--font-weight-bold)',
  color: 'var(--color-primary-600)',
  marginBottom: 'var(--space-3)',
  margin: '0 0 var(--space-3) 0'
}

export const categoriesDescriptionStyles: CSSProperties = {
  fontSize: 'var(--font-size-lg)',
  color: 'var(--color-muted)',
  margin: 0,
  fontWeight: 'var(--font-weight-normal)',
  maxWidth: '42rem',
  marginLeft: 'auto',
  marginRight: 'auto'
}

export const categoriesGridStyles: CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
  gap: 'var(--space-6)'
}

export const categoryCardStyles: CSSProperties = {
  backgroundColor: 'var(--color-surface)',
  padding: 'var(--space-6)',
  borderRadius: 'var(--radius-xl)',
  border: `var(--border-width-2) solid var(--color-border)`,
  boxShadow: 'var(--shadow-md)',
  textAlign: 'center',
  transition: 'var(--transition-all)',
  cursor: 'pointer',
  position: 'relative',
  overflow: 'hidden'
}

export const categoryCardHoverStyles: CSSProperties = {
  transform: 'translateY(-4px)',
  boxShadow: 'var(--shadow-lg)'
}

export const categoryIconStyles: CSSProperties = {
  marginBottom: 'var(--space-4)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '80px'
}

export const categoryNameStyles: CSSProperties = {
  fontSize: 'var(--font-size-xl)',
  fontWeight: 'var(--font-weight-semibold)',
  marginBottom: 'var(--space-3)',
  margin: '0 0 var(--space-3) 0'
}

export const categoryDescriptionStyles: CSSProperties = {
  fontSize: 'var(--font-size-base)',
  color: 'var(--color-muted)',
  lineHeight: 'var(--line-height-relaxed)',
  marginBottom: 'var(--space-4)',
  margin: '0 0 var(--space-4) 0'
}

export const categoryStatsStyles: CSSProperties = {
  display: 'flex',
  justifyContent: 'space-around',
  alignItems: 'center',
  marginTop: 'var(--space-4)',
  paddingTop: 'var(--space-4)',
  borderTop: `var(--border-width-1) solid var(--color-border-secondary)`
}

export const categoryStatsItemStyles: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: 'var(--space-2)',
  fontSize: 'var(--font-size-sm)',
  color: 'var(--color-muted)',
  fontWeight: 'var(--font-weight-medium)'
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

export const errorMessageStyles: CSSProperties = {
  fontSize: 'var(--font-size-lg)',
  color: 'var(--color-error-600)',
  margin: 0
}