import { CSSProperties } from 'react';

interface AdminPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const paginationStyles: Record<string, CSSProperties> = {
  pagination: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 'var(--space-4)',
    marginTop: 'var(--space-8)',
  },
  paginationButton: {
    backgroundColor: 'var(--color-neutral-100)',
    color: 'var(--color-neutral-700)',
    padding: 'var(--space-2) var(--space-4)',
    borderRadius: 'var(--radius-base)',
    border: '1px solid var(--color-neutral-300)',
    cursor: 'pointer',
    fontSize: 'var(--font-size-sm)',
    fontWeight: 'var(--font-weight-medium)',
    transition: 'var(--transition-colors)',
  },
  paginationInfo: {
    color: 'var(--color-neutral-600)',
    fontSize: 'var(--font-size-sm)',
  },
};

export default function AdminPagination({ 
  currentPage, 
  totalPages, 
  onPageChange 
}: AdminPaginationProps) {
  if (totalPages <= 1) {
    return null;
  }

  return (
    <div style={paginationStyles.pagination}>
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        style={{
          ...paginationStyles.paginationButton,
          opacity: currentPage === 1 ? 0.5 : 1,
          cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
        }}
      >
        Previous
      </button>
      <span style={paginationStyles.paginationInfo}>
        Page {currentPage} of {totalPages}
      </span>
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        style={{
          ...paginationStyles.paginationButton,
          opacity: currentPage === totalPages ? 0.5 : 1,
          cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
        }}
      >
        Next
      </button>
    </div>
  );
}