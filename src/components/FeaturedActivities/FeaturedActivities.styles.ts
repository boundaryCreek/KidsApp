import { CSSProperties } from 'react';

export const carouselContainerStyles: CSSProperties = {
  backgroundColor: 'var(--color-surface)',
  borderRadius: 'var(--radius-lg)',
  padding: 'var(--space-4)',
  boxShadow: 'var(--shadow-sm)',
  marginBottom: 'var(--space-4)',
};

export const carouselHeaderStyles: CSSProperties = {
  marginBottom: 'var(--space-4)',
};

export const carouselTitleStyles: CSSProperties = {
  fontSize: 'var(--font-size-lg)',
  fontWeight: 'var(--font-weight-semibold)',
  color: 'var(--color-text)',
  margin: 0,
};

export const carouselWrapperStyles: CSSProperties = {
  position: 'relative',
  width: '100%',
  height: '160px', // Show 1 activity
  overflow: 'hidden',
};

export const carouselTrackStyles: CSSProperties = {
  display: 'flex',
  transition: 'transform 0.3s ease-in-out',
  height: '100%',
};

export const carouselSlideStyles: CSSProperties = {
  flex: '0 0 100%',
  width: '100%',
};

export const activityCardStyles: CSSProperties = {
  display: 'flex',
  backgroundColor: 'var(--color-background)',
  borderRadius: 'var(--radius-base)',
  overflow: 'hidden',
  boxShadow: 'var(--shadow-sm)',
  transition: 'var(--transition-colors)',
  cursor: 'pointer',
  height: '140px',
};

export const activityImageStyles: CSSProperties = {
  width: '80px',
  height: '100%',
  flexShrink: 0,
};

export const activityContentStyles: CSSProperties = {
  padding: 'var(--space-3)',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  flex: 1,
  minWidth: 0, // Allow text truncation
};

export const activityTitleStyles: CSSProperties = {
  fontSize: 'var(--font-size-sm)',
  fontWeight: 'var(--font-weight-semibold)',
  color: 'var(--color-text)',
  margin: 0,
  marginBottom: 'var(--space-1)',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  display: '-webkit-box',
  WebkitLineClamp: 2,
  WebkitBoxOrient: 'vertical',
  lineHeight: '1.3',
};

export const activityLocationStyles: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: 'var(--space-1)',
  fontSize: 'var(--font-size-xs)',
  color: 'var(--color-text-secondary)',
  marginBottom: 'var(--space-2)',
};

export const activityMetaStyles: CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginTop: 'auto',
};

export const activityPriceStyles: CSSProperties = {
  fontSize: 'var(--font-size-xs)',
  fontWeight: 'var(--font-weight-medium)',
  color: 'var(--color-primary-600)',
};

export const carouselNavStyles: CSSProperties = {
  position: 'absolute',
  top: '50%',
  right: 'var(--space-2)',
  transform: 'translateY(-50%)',
  display: 'flex',
  flexDirection: 'row',
  gap: 'var(--space-1)',
};

export const navButtonStyles: CSSProperties = {
  width: '24px',
  height: '24px',
  borderRadius: '50%',
  border: '1px solid var(--color-border)',
  backgroundColor: 'var(--color-background)',
  color: 'var(--color-text)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  transition: 'var(--transition-colors)',
};

export const dotsContainerStyles: CSSProperties = {
  position: 'absolute',
  bottom: 'var(--space-2)',
  left: '50%',
  transform: 'translateX(-50%)',
  display: 'flex',
  gap: 'var(--space-1)',
};

export const dotStyles: CSSProperties = {
  width: '6px',
  height: '6px',
  borderRadius: '50%',
  border: 'none',
  backgroundColor: 'var(--color-neutral-300)',
  cursor: 'pointer',
  transition: 'var(--transition-colors)',
};

export const dotActiveStyles: CSSProperties = {
  ...dotStyles,
  backgroundColor: 'var(--color-primary-600)',
};