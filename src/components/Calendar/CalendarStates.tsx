'use client';

import React from 'react';
import { Loader2 } from 'lucide-react';
import {
  loadingStyles,
  errorStyles,
  retryButtonStyles
} from './Calendar.styles';

interface LoadingStateProps {
  message?: string;
}

export function LoadingState({ message = 'Loading calendar...' }: LoadingStateProps) {
  return (
    <div style={loadingStyles}>
      <Loader2 size={32} className="animate-spin" />
      <span>{message}</span>
    </div>
  );
}

interface ErrorStateProps {
  message?: string;
  onRetry?: () => void;
}

export function ErrorState({ 
  message = 'Failed to load events. Please try again.', 
  onRetry 
}: ErrorStateProps) {
  return (
    <div style={errorStyles}>
      <p>{message}</p>
      {onRetry && (
        <button style={retryButtonStyles} onClick={onRetry}>
          Retry
        </button>
      )}
    </div>
  );
}