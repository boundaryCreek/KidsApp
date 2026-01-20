import { ReactNode } from 'react';
import { CSSProperties } from 'react';
import Link from 'next/link';

interface AdminFormLayoutProps {
  title: string;
  backButtonText: string;
  backButtonHref: string;
  error?: string | null;
  children: ReactNode;
}

const adminFormLayoutStyles: Record<string, CSSProperties> = {
  container: {
    padding: 'var(--space-6)',
    maxWidth: '800px',
  },
  header: {
    marginBottom: 'var(--space-8)',
  },
  backButton: {
    color: 'var(--color-primary-600)',
    textDecoration: 'none',
    fontSize: 'var(--font-size-sm)',
    fontWeight: 'var(--font-weight-medium)',
    display: 'inline-flex',
    alignItems: 'center',
    gap: 'var(--space-2)',
    marginBottom: 'var(--space-4)',
    transition: 'var(--transition-colors)',
  },
  title: {
    fontSize: 'var(--font-size-2xl)',
    fontWeight: 'var(--font-weight-bold)',
    color: 'var(--color-neutral-900)',
    margin: 0,
  },
  error: {
    backgroundColor: 'var(--color-error-50)',
    color: 'var(--color-error-700)',
    padding: 'var(--space-4)',
    borderRadius: 'var(--radius-lg)',
    border: '1px solid var(--color-error-200)',
    marginBottom: 'var(--space-6)',
  },
};

export default function AdminFormLayout({
  title,
  backButtonText,
  backButtonHref,
  error,
  children,
}: AdminFormLayoutProps) {
  return (
    <div style={adminFormLayoutStyles.container}>
      <div style={adminFormLayoutStyles.header}>
        <Link href={backButtonHref} style={adminFormLayoutStyles.backButton}>
          ← {backButtonText}
        </Link>
        <h1 style={adminFormLayoutStyles.title}>{title}</h1>
      </div>

      {error && (
        <div style={adminFormLayoutStyles.error}>
          {error}
        </div>
      )}

      {children}
    </div>
  );
}