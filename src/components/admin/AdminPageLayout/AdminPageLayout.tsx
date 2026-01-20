import { ReactNode } from 'react';
import { CSSProperties } from 'react';
import Link from 'next/link';

interface AdminPageLayoutProps {
  title: string;
  createButtonText?: string;
  createButtonHref?: string;
  children: ReactNode;
  searchPlaceholder?: string;
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  resultsCount?: number;
  loading?: boolean;
  error?: string | null;
  emptyStateText?: string;
  emptyStateActionText?: string;
  emptyStateActionHref?: string;
}

const adminPageLayoutStyles: Record<string, CSSProperties> = {
  container: {
    padding: 'var(--space-6)',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 'var(--space-6)',
  },
  title: {
    fontSize: 'var(--font-size-2xl)',
    fontWeight: 'var(--font-weight-bold)',
    color: 'var(--color-neutral-900)',
    margin: 0,
  },
  createButton: {
    backgroundColor: 'var(--color-primary-600)',
    color: 'var(--color-neutral-50)',
    padding: 'var(--space-3) var(--space-6)',
    borderRadius: 'var(--radius-lg)',
    textDecoration: 'none',
    fontWeight: 'var(--font-weight-medium)',
    transition: 'var(--transition-colors)',
    border: 'none',
    cursor: 'pointer',
  },
  controls: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 'var(--space-6)',
    gap: 'var(--space-4)',
  },
  searchInput: {
    flex: 1,
    maxWidth: '400px',
    padding: 'var(--space-3)',
    border: '1px solid var(--color-neutral-300)',
    borderRadius: 'var(--radius-base)',
    fontSize: 'var(--font-size-base)',
  },
  resultsCount: {
    color: 'var(--color-neutral-600)',
    fontSize: 'var(--font-size-sm)',
  },
  loading: {
    textAlign: 'center',
    padding: 'var(--space-12)',
    color: 'var(--color-neutral-600)',
    fontSize: 'var(--font-size-lg)',
  },
  error: {
    textAlign: 'center',
    padding: 'var(--space-12)',
    color: 'var(--color-error-600)',
    fontSize: 'var(--font-size-lg)',
    backgroundColor: 'var(--color-error-50)',
    borderRadius: 'var(--radius-lg)',
    border: '1px solid var(--color-error-200)',
  },
  emptyState: {
    textAlign: 'center',
    padding: 'var(--space-12)',
    color: 'var(--color-neutral-600)',
  },
  emptyStateLink: {
    color: 'var(--color-primary-600)',
    textDecoration: 'none',
    fontWeight: 'var(--font-weight-medium)',
  },
};

export default function AdminPageLayout({
  title,
  createButtonText,
  createButtonHref,
  children,
  searchPlaceholder,
  searchValue,
  onSearchChange,
  resultsCount,
  loading,
  error,
  emptyStateText,
  emptyStateActionText,
  emptyStateActionHref,
}: AdminPageLayoutProps) {
  if (loading) {
    return (
      <div style={adminPageLayoutStyles.container}>
        <div style={adminPageLayoutStyles.loading}>Loading {title.toLowerCase()}...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={adminPageLayoutStyles.container}>
        <div style={adminPageLayoutStyles.error}>{error}</div>
      </div>
    );
  }

  const showEmptyState = emptyStateText && !children;

  return (
    <div style={adminPageLayoutStyles.container}>
      <div style={adminPageLayoutStyles.header}>
        <h1 style={adminPageLayoutStyles.title}>{title}</h1>
        {createButtonText && createButtonHref && (
          <Link href={createButtonHref} style={adminPageLayoutStyles.createButton}>
            {createButtonText}
          </Link>
        )}
      </div>

      {(searchPlaceholder || resultsCount !== undefined) && (
        <div style={adminPageLayoutStyles.controls}>
          {searchPlaceholder && onSearchChange && (
            <input
              type="text"
              placeholder={searchPlaceholder}
              value={searchValue || ''}
              onChange={(e) => onSearchChange(e.target.value)}
              style={adminPageLayoutStyles.searchInput}
            />
          )}
          {resultsCount !== undefined && (
            <div style={adminPageLayoutStyles.resultsCount}>
              {resultsCount} {title.toLowerCase()} found
            </div>
          )}
        </div>
      )}

      {showEmptyState ? (
        <div style={adminPageLayoutStyles.emptyState}>
          <p>{emptyStateText}</p>
          {emptyStateActionText && emptyStateActionHref && (
            <Link href={emptyStateActionHref} style={adminPageLayoutStyles.emptyStateLink}>
              {emptyStateActionText}
            </Link>
          )}
        </div>
      ) : (
        children
      )}
    </div>
  );
}