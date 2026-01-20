import { CSSProperties } from 'react';

export const adminLayoutStyles: CSSProperties = {
  display: 'grid',
  gridTemplateColumns: '280px 1fr',
  gridTemplateRows: '60px 1fr',
  gridTemplateAreas: '"sidebar header" "sidebar main"',
  minHeight: '100vh',
  backgroundColor: 'var(--color-neutral-50)',
};

export const adminSidebarStyles: CSSProperties = {
  gridArea: 'sidebar',
  backgroundColor: 'var(--color-neutral-900)',
  color: 'var(--color-neutral-50)',
  padding: 'var(--space-6)',
  boxShadow: 'var(--shadow-lg)',
  zIndex: 10,
};

export const adminHeaderStyles: CSSProperties = {
  gridArea: 'header',
  backgroundColor: 'var(--color-background)',
  borderBottom: '1px solid var(--color-border)',
  padding: '0 var(--space-6)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  boxShadow: 'var(--shadow-sm)',
};

export const adminMainStyles: CSSProperties = {
  gridArea: 'main',
  padding: 'var(--space-6)',
  overflow: 'auto',
};

export const adminTitleStyles: CSSProperties = {
  fontSize: 'var(--font-size-xl)',
  fontWeight: 'var(--font-weight-bold)',
  color: 'var(--color-neutral-50)',
  margin: 0,
  marginBottom: 'var(--space-6)',
};

export const adminNavStyles: CSSProperties = {
  listStyle: 'none',
  padding: 0,
  margin: 0,
};

export const adminNavItemStyles: CSSProperties = {
  marginBottom: 'var(--space-2)',
};

export const adminNavLinkStyles: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  padding: 'var(--space-3)',
  color: 'var(--color-neutral-300)',
  textDecoration: 'none',
  borderRadius: 'var(--radius-md)',
  fontSize: 'var(--font-size-sm)',
  fontWeight: 'var(--font-weight-medium)',
  transition: 'var(--transition-colors)',
};

export const adminNavLinkActiveStyles: CSSProperties = {
  ...adminNavLinkStyles,
  backgroundColor: 'var(--color-primary-600)',
  color: 'var(--color-neutral-50)',
};

export const adminNavIconStyles: CSSProperties = {
  marginRight: 'var(--space-3)',
  flexShrink: 0,
};

export const adminPageHeaderStyles: CSSProperties = {
  marginBottom: 'var(--space-6)',
};

export const adminPageTitleStyles: CSSProperties = {
  fontSize: 'var(--font-size-2xl)',
  fontWeight: 'var(--font-weight-bold)',
  color: 'var(--color-text)',
  margin: 0,
  marginBottom: 'var(--space-2)',
};

export const adminPageDescriptionStyles: CSSProperties = {
  fontSize: 'var(--font-size-lg)',
  color: 'var(--color-text-secondary)',
  margin: 0,
};

export const adminCardStyles: CSSProperties = {
  backgroundColor: 'var(--color-background)',
  borderRadius: 'var(--radius-lg)',
  padding: 'var(--space-6)',
  boxShadow: 'var(--shadow-sm)',
  border: '1px solid var(--color-border)',
};

export const adminButtonStyles: CSSProperties = {
  backgroundColor: 'var(--color-primary-600)',
  color: 'var(--color-neutral-50)',
  border: 'none',
  borderRadius: 'var(--radius-md)',
  padding: 'var(--space-3) var(--space-4)',
  fontSize: 'var(--font-size-sm)',
  fontWeight: 'var(--font-weight-medium)',
  cursor: 'pointer',
  transition: 'var(--transition-colors)',
  display: 'inline-flex',
  alignItems: 'center',
  gap: 'var(--space-2)',
};

export const adminButtonSecondaryStyles: CSSProperties = {
  ...adminButtonStyles,
  backgroundColor: 'var(--color-neutral-200)',
  color: 'var(--color-text)',
};

export const adminButtonDangerStyles: CSSProperties = {
  ...adminButtonStyles,
  backgroundColor: 'var(--color-error-600)',
};

export const adminTableStyles: CSSProperties = {
  width: '100%',
  borderCollapse: 'collapse',
  backgroundColor: 'var(--color-background)',
  borderRadius: 'var(--radius-lg)',
  overflow: 'hidden',
  boxShadow: 'var(--shadow-sm)',
};

export const adminTableHeaderStyles: CSSProperties = {
  backgroundColor: 'var(--color-neutral-50)',
  padding: 'var(--space-3) var(--space-4)',
  textAlign: 'left',
  fontSize: 'var(--font-size-sm)',
  fontWeight: 'var(--font-weight-semibold)',
  color: 'var(--color-text)',
  borderBottom: '1px solid var(--color-border)',
};

export const adminTableCellStyles: CSSProperties = {
  padding: 'var(--space-3) var(--space-4)',
  borderBottom: '1px solid var(--color-border)',
  fontSize: 'var(--font-size-sm)',
  color: 'var(--color-text)',
};

export const adminFormStyles: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: 'var(--space-4)',
};

export const adminInputGroupStyles: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: 'var(--space-1)',
};

export const adminLabelStyles: CSSProperties = {
  fontSize: 'var(--font-size-sm)',
  fontWeight: 'var(--font-weight-medium)',
  color: 'var(--color-text)',
};

export const adminInputStyles: CSSProperties = {
  padding: 'var(--space-2) var(--space-3)',
  border: '1px solid var(--color-border)',
  borderRadius: 'var(--radius-md)',
  fontSize: 'var(--font-size-sm)',
  backgroundColor: 'var(--color-background)',
  color: 'var(--color-text)',
};

export const adminTextareaStyles: CSSProperties = {
  ...adminInputStyles,
  minHeight: '100px',
  resize: 'vertical',
};

export const adminSelectStyles: CSSProperties = {
  ...adminInputStyles,
};

export const adminCheckboxStyles: CSSProperties = {
  marginRight: 'var(--space-2)',
};

export const adminActionsStyles: CSSProperties = {
  display: 'flex',
  gap: 'var(--space-3)',
  justifyContent: 'flex-end',
  marginTop: 'var(--space-6)',
  paddingTop: 'var(--space-6)',
  borderTop: '1px solid var(--color-border)',
};