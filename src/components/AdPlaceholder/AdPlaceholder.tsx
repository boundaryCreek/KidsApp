'use client';

interface AdPlaceholderProps {
  size?: 'small' | 'medium' | 'large';
  label?: string;
}

const adPlaceholderStyles = {
  small: {
    width: '100%',
    height: '120px',
    backgroundColor: 'var(--color-neutral-100)',
    border: '2px dashed var(--color-neutral-300)',
    borderRadius: 'var(--radius-md)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 'var(--font-size-xs)',
    color: 'var(--color-neutral-500)',
    textAlign: 'center' as const,
    fontWeight: 'var(--font-weight-medium)',
    marginBottom: 'var(--space-4)',
  },
  medium: {
    width: '100%',
    height: '200px',
    backgroundColor: 'var(--color-neutral-100)',
    border: '2px dashed var(--color-neutral-300)',
    borderRadius: 'var(--radius-md)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 'var(--font-size-sm)',
    color: 'var(--color-neutral-500)',
    textAlign: 'center' as const,
    fontWeight: 'var(--font-weight-medium)',
    marginBottom: 'var(--space-4)',
  },
  large: {
    width: '100%',
    height: '280px',
    backgroundColor: 'var(--color-neutral-100)',
    border: '2px dashed var(--color-neutral-300)',
    borderRadius: 'var(--radius-md)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 'var(--font-size-base)',
    color: 'var(--color-neutral-500)',
    textAlign: 'center' as const,
    fontWeight: 'var(--font-weight-medium)',
    marginBottom: 'var(--space-4)',
  }
};

export default function AdPlaceholder({ size = 'medium', label = 'Advertisement' }: AdPlaceholderProps) {
  return (
    <div style={adPlaceholderStyles[size]}>
      <div>
        <div>{label}</div>
        <div style={{ fontSize: 'var(--font-size-xs)', marginTop: 'var(--space-1)', opacity: 0.7 }}>
          {size === 'small' && '320x120'}
          {size === 'medium' && '320x200'}
          {size === 'large' && '320x280'}
        </div>
      </div>
    </div>
  );
}