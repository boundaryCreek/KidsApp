'use client';

import React, { CSSProperties } from 'react';
import { adminCardStyles } from './AdminLayout.styles';

interface FormBuilderProps {
  onSubmit: (e: React.FormEvent) => Promise<void>;
  loading: boolean;
  error?: string;
  children: React.ReactNode;
  submitButtonText?: string;
  submitButtonDisabled?: boolean;
}

export function FormBuilder({
  onSubmit,
  loading,
  error,
  children,
  submitButtonText = 'Save',
  submitButtonDisabled = false,
}: FormBuilderProps) {
  const buttonStyles: CSSProperties = {
    padding: 'var(--space-3) var(--space-6)',
    backgroundColor: submitButtonDisabled ? 'var(--color-neutral-300)' : 'var(--color-primary-600)',
    color: 'var(--color-neutral-50)',
    border: 'none',
    borderRadius: 'var(--radius-lg)',
    fontSize: 'var(--font-size-base)',
    fontWeight: 'var(--font-weight-medium)',
    cursor: submitButtonDisabled ? 'not-allowed' : 'pointer',
    transition: 'var(--transition-colors)',
    opacity: loading ? 0.6 : 1,
  };

  return (
    <form
      onSubmit={onSubmit}
      style={{
        ...adminCardStyles,
        maxWidth: '800px',
        margin: 'var(--space-8) auto',
      }}
    >
      {error && (
        <div
          style={{
            backgroundColor: 'var(--color-error-50)',
            color: 'var(--color-error-700)',
            padding: 'var(--space-4)',
            borderRadius: 'var(--radius-lg)',
            marginBottom: 'var(--space-6)',
            border: '1px solid var(--color-error-200)',
          }}
        >
          {error}
        </div>
      )}

      {children}

      <button
        type="submit"
        disabled={submitButtonDisabled || loading}
        style={buttonStyles}
      >
        {loading ? 'Saving...' : submitButtonText}
      </button>
    </form>
  );
}
