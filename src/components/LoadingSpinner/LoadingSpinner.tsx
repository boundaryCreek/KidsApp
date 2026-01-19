'use client';

import { Loader } from 'lucide-react';
import { loadingContainerStyles, spinnerStyles } from './LoadingSpinner.styles';

interface LoadingSpinnerProps {
  message?: string;
  size?: number;
}

export default function LoadingSpinner({ message = 'Loading...', size = 48 }: LoadingSpinnerProps) {
  return (
    <div style={loadingContainerStyles}>
      <div style={spinnerStyles}>
        <Loader size={size} color="var(--color-primary-600)" />
      </div>
      <p>{message}</p>
    </div>
  );
}