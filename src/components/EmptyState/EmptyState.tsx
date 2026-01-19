import { ReactNode } from 'react';
import {
  emptyStateStyles,
  emptyStateIconStyles,
  emptyStateTitleStyles,
  emptyStateDescriptionStyles,
} from './EmptyState.styles';

interface EmptyStateProps {
  icon: ReactNode;
  title: string;
  description: string;
}

export default function EmptyState({ icon, title, description }: EmptyStateProps) {
  return (
    <div style={emptyStateStyles}>
      <div style={emptyStateIconStyles}>
        {icon}
      </div>
      <h3 style={emptyStateTitleStyles}>{title}</h3>
      <p style={emptyStateDescriptionStyles}>{description}</p>
    </div>
  );
}