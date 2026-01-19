import { ReactNode } from 'react';

interface SectionHeaderProps {
  icon: ReactNode;
  title: string;
  count?: number;
}

const sectionHeaderStyles = {
  sectionTitle: {
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--space-2)',
    fontSize: 'var(--font-size-xl)',
    fontWeight: 'var(--font-weight-bold)',
    color: 'var(--color-neutral-900)',
    marginBottom: 'var(--space-4)',
  },
};

export default function SectionHeader({ icon, title, count }: SectionHeaderProps) {
  return (
    <h2 style={sectionHeaderStyles.sectionTitle}>
      {icon}
      {title}{count !== undefined ? ` (${count})` : ''}
    </h2>
  );
}