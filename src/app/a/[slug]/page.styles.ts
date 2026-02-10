import type { CSSProperties } from 'react';

export const pageContainer: CSSProperties = {
  minHeight: '100vh',
  backgroundColor: 'var(--color-background)',
  padding: 'var(--space-8) 0',
};

export const container: CSSProperties = {
  maxWidth: 'var(--container-6xl)',
  margin: '0 auto',
  padding: '0 var(--space-4)',
};

export const breadcrumb: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: 'var(--space-2)',
  marginBottom: 'var(--space-6)',
  fontSize: 'var(--font-size-sm)',
  color: 'var(--color-neutral-600)',
};

export const breadcrumbLink: CSSProperties = {
  color: 'var(--color-primary-600)',
  textDecoration: 'none',
  transition: 'color 0.2s ease',
};

export const activityHeader: CSSProperties = {
  background: 'var(--color-surface)',
  borderRadius: 'var(--radius-xl)',
  padding: 'var(--space-8)',
  marginBottom: 'var(--space-8)',
  boxShadow: 'var(--shadow-lg)',
  borderWidth: '1px',
  borderStyle: 'solid',
  borderColor: 'var(--color-neutral-200)',
};

export const activityTitle: CSSProperties = {
  fontSize: 'var(--font-size-4xl)',
  fontWeight: 'var(--font-weight-bold)',
  color: 'var(--color-neutral-900)',
  marginBottom: 'var(--space-4)',
  lineHeight: 'var(--line-height-tight)',
};

export const activityMeta: CSSProperties = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: 'var(--space-4)',
  marginBottom: 'var(--space-6)',
  alignItems: 'center',
};

export const ageGroupTag: CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: 'var(--space-2)',
  backgroundColor: 'var(--color-accent-100)',
  color: 'var(--color-accent-700)',
  padding: 'var(--space-2) var(--space-4)',
  borderRadius: 'var(--radius-full)',
  fontSize: 'var(--font-size-sm)',
  fontWeight: 'var(--font-weight-medium)',
};

export const costTag: CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: 'var(--space-2)',
  padding: 'var(--space-2) var(--space-4)',
  borderRadius: 'var(--radius-full)',
  fontSize: 'var(--font-size-sm)',
  fontWeight: 'var(--font-weight-semibold)',
};

export const costFree: CSSProperties = {
  ...costTag,
  backgroundColor: 'var(--color-success-100)',
  color: 'var(--color-success-700)',
};

export const costPaid: CSSProperties = {
  ...costTag,
  backgroundColor: 'var(--color-warning-100)',
  color: 'var(--color-warning-700)',
};

export const featuredBadge: CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: 'var(--space-2)',
  backgroundColor: 'var(--color-primary-600)',
  color: 'var(--color-neutral-50)',
  padding: 'var(--space-2) var(--space-4)',
  borderRadius: 'var(--radius-full)',
  fontSize: 'var(--font-size-sm)',
  fontWeight: 'var(--font-weight-semibold)',
};

export const activityDescription: CSSProperties = {
  fontSize: 'var(--font-size-lg)',
  lineHeight: 'var(--line-height-relaxed)',
  color: 'var(--color-neutral-700)',
  marginBottom: 'var(--space-6)',
};

export const detailsGrid: CSSProperties = {
  display: 'grid',
  gridTemplateColumns: '2fr 1fr',
  gap: 'var(--space-8)',
  marginBottom: 'var(--space-8)',
};

export const detailsSection: CSSProperties = {
  background: 'var(--color-surface)',
  borderRadius: 'var(--radius-xl)',
  padding: 'var(--space-6)',
  boxShadow: 'var(--shadow-md)',
  borderWidth: '1px',
  borderStyle: 'solid',
  borderColor: 'var(--color-neutral-200)',
};

export const sectionTitle: CSSProperties = {
  fontSize: 'var(--font-size-xl)',
  fontWeight: 'var(--font-weight-bold)',
  color: 'var(--color-neutral-900)',
  marginBottom: 'var(--space-4)',
  display: 'flex',
  alignItems: 'center',
  gap: 'var(--space-2)',
};

export const locationInfo: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: 'var(--space-3)',
};

export const locationItem: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: 'var(--space-3)',
  padding: 'var(--space-2)',
  borderRadius: 'var(--radius-base)',
  transition: 'background-color 0.2s ease',
};

export const locationText: CSSProperties = {
  color: 'var(--color-neutral-700)',
  fontSize: 'var(--font-size-base)',
};

export const categoriesList: CSSProperties = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: 'var(--space-2)',
  marginTop: 'var(--space-4)',
};

export const categoryTag: CSSProperties = {
  backgroundColor: 'var(--color-secondary-100)',
  color: 'var(--color-secondary-800)',
  padding: 'var(--space-2) var(--space-3)',
  borderRadius: 'var(--radius-full)',
  fontSize: 'var(--font-size-sm)',
  fontWeight: 'var(--font-weight-medium)',
};

export const organizerSection: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: 'var(--space-3)',
  padding: 'var(--space-4)',
  backgroundColor: 'var(--color-neutral-50)',
  borderRadius: 'var(--radius-lg)',
  marginBottom: 'var(--space-6)',
};

export const statsGrid: CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(2, 1fr)',
  gap: 'var(--space-4)',
  marginTop: 'var(--space-6)',
};

export const statItem: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: 'var(--space-4)',
  backgroundColor: 'var(--color-neutral-50)',
  borderRadius: 'var(--radius-lg)',
  textAlign: 'center',
};

export const statNumber: CSSProperties = {
  fontSize: 'var(--font-size-2xl)',
  fontWeight: 'var(--font-weight-bold)',
  color: 'var(--color-primary-600)',
  marginBottom: 'var(--space-1)',
};

export const statLabel: CSSProperties = {
  fontSize: 'var(--font-size-sm)',
  color: 'var(--color-neutral-600)',
};

export const loadingSpinner: CSSProperties = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '50vh',
  fontSize: 'var(--font-size-lg)',
  color: 'var(--color-neutral-600)',
};

export const errorMessage: CSSProperties = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '50vh',
  fontSize: 'var(--font-size-lg)',
  color: 'var(--color-error-600)',
  textAlign: 'center',
  flexDirection: 'column',
  gap: 'var(--space-4)',
};

// Events styles
export const eventsContainer: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: 'var(--space-4)',
};

export const eventCard: CSSProperties = {
  display: 'flex',
  backgroundColor: 'var(--color-surface)',
  borderRadius: 'var(--radius-lg)',
  border: '1px solid var(--color-neutral-200)',
  padding: 'var(--space-4)',
  boxShadow: 'var(--shadow-sm)',
  transition: 'var(--transition-colors)',
};

export const eventDate: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: 'var(--color-primary-600)',
  color: 'var(--color-neutral-50)',
  borderRadius: 'var(--radius-md)',
  padding: 'var(--space-3)',
  minWidth: '60px',
  marginRight: 'var(--space-4)',
};

export const eventDay: CSSProperties = {
  fontSize: 'var(--font-size-xl)',
  fontWeight: 'var(--font-weight-bold)',
  lineHeight: '1',
};

export const eventMonth: CSSProperties = {
  fontSize: 'var(--font-size-xs)',
  fontWeight: 'var(--font-weight-medium)',
  textTransform: 'uppercase',
  letterSpacing: 'var(--letter-spacing-wide)',
};

export const eventDetails: CSSProperties = {
  flex: 1,
};

export const eventTitle: CSSProperties = {
  fontSize: 'var(--font-size-lg)',
  fontWeight: 'var(--font-weight-semibold)',
  color: 'var(--color-neutral-900)',
  marginBottom: 'var(--space-2)',
};

export const eventMeta: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: 'var(--space-4)',
  marginBottom: 'var(--space-3)',
};

export const eventTime: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: 'var(--space-1)',
  fontSize: 'var(--font-size-sm)',
  color: 'var(--color-neutral-600)',
};

export const eventDescription: CSSProperties = {
  fontSize: 'var(--font-size-sm)',
  color: 'var(--color-neutral-700)',
  lineHeight: 'var(--line-height-relaxed)',
  marginBottom: 'var(--space-2)',
};

export const eventNotes: CSSProperties = {
  fontSize: 'var(--font-size-xs)',
  color: 'var(--color-neutral-500)',
  fontStyle: 'italic',
  backgroundColor: 'var(--color-neutral-50)',
  padding: 'var(--space-2)',
  borderRadius: 'var(--radius-sm)',
  border: '1px solid var(--color-neutral-200)',
};