import { CSSProperties } from 'react';

export const headerStyles: CSSProperties = {
  backgroundColor: 'var(--color-primary-600)',
  color: 'var(--color-neutral-50)',
  padding: 'var(--space-4) var(--space-6)',
  boxShadow: 'var(--shadow-sm)',
  borderBottom: `var(--border-width-1) solid var(--color-border)`,
  position: 'relative'
};

export const headerContainerStyles: CSSProperties = {
  maxWidth: 'var(--container-7xl)',
  margin: '0 auto',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: 'var(--space-4)',
  position: 'relative'
};

export const headerCenterStyles: CSSProperties = {
  flex: 1,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minWidth: 0
};

export const logoLinkStyles: CSSProperties = {
  textDecoration: 'none',
  color: 'inherit',
  display: 'flex',
  alignItems: 'center'
};

export const logoStyles: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '2px'
};

export const headerTitleStyles: CSSProperties = {
  fontSize: 'clamp(var(--font-size-lg), 3vw, var(--font-size-xl))',
  fontWeight: 'var(--font-weight-semibold)',
  fontFamily: 'var(--font-sans)',
  margin: 0,
  color: 'var(--color-neutral-50)',
  whiteSpace: 'nowrap'
};

export const taglineStyles: CSSProperties = {
  fontSize: 'clamp(var(--font-size-xs), 2vw, var(--font-size-sm))',
  fontWeight: 'var(--font-weight-medium)',
  color: 'var(--color-primary-200)',
  margin: '0',
  fontStyle: 'italic'
};

export const navMobileToggleStyles: CSSProperties = {
  display: 'none'
};

export const navMobileToggleLabelStyles: CSSProperties = {
  cursor: 'pointer',
  fontSize: 'var(--font-size-xl)',
  color: 'var(--color-neutral-50)',
  marginLeft: 'auto',
  display: 'none'
};

export const navStyles: CSSProperties = {
  display: 'flex',
  gap: 'var(--space-4)',
  listStyle: 'none',
  margin: 0,
  padding: 0
};

export const navMobileStyles: CSSProperties = {
  position: 'absolute',
  top: '100%',
  left: 0,
  right: 0,
  backgroundColor: 'var(--color-primary-700)',
  display: 'flex',
  boxShadow: 'var(--shadow-md)',
  zIndex: 10
};

export const baseLinkStyles: CSSProperties = {
  color: 'var(--color-neutral-50)',
  textDecoration: 'none',
  fontWeight: 'var(--font-weight-medium)',
  fontSize: 'var(--font-size-base)',
  fontFamily: 'var(--font-sans)',
  padding: 'var(--space-2) var(--space-4)',
  borderRadius: 'var(--radius-base)',
  display: 'inline-flex',
  alignItems: 'center',
  transition: 'var(--transition-colors)',
  whiteSpace: 'nowrap'
};

export const categoriesLinkStyles: CSSProperties = {
  ...baseLinkStyles,
  backgroundColor: 'var(--color-primary-500)'
};

export const locationsLinkStyles: CSSProperties = {
  ...baseLinkStyles,
  backgroundColor: 'var(--color-primary-500)'
};

export const calendarLinkStyles: CSSProperties = {
  ...baseLinkStyles,
  backgroundColor: 'var(--color-primary-500)'
};

// Mobile responsive adjustments
export const mobileMediaQuery = `
  @media (max-width: 768px) {
    header {
      padding: var(--space-3) var(--space-4);
    }
    
    nav ul li a {
      padding: var(--space-2) var(--space-3);
      font-size: var(--font-size-sm);
    }
    
    nav ul li a svg {
      width: 16px;
      height: 16px;
    }
    
    #nav-toggle:checked + label + nav {
      display: flex;
    }
  }

  @media (max-width: 640px) {
    nav {
      display: none;
    }
    
    #nav-toggle + label {
      display: block;
    }
  }
`;