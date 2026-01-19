import { ReactNode } from 'react';

interface StatItem {
  icon: ReactNode;
  value: number;
  label: string;
}

interface StatsGridProps {
  stats: StatItem[];
}

const statsGridStyles = {
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
    gap: 'var(--space-4)',
    marginTop: 'var(--space-4)',
  },
  statItem: {
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    padding: 'var(--space-4)',
    backgroundColor: 'var(--color-neutral-50)',
    borderRadius: 'var(--radius-lg)',
    border: '1px solid var(--color-neutral-200)',
    textAlign: 'center' as const,
  },
  statNumber: {
    fontSize: 'var(--font-size-2xl)',
    fontWeight: 'var(--font-weight-bold)',
    color: 'var(--color-neutral-900)',
    marginTop: 'var(--space-2)',
  },
  statLabel: {
    fontSize: 'var(--font-size-sm)',
    color: 'var(--color-neutral-600)',
    marginTop: 'var(--space-1)',
  },
};

export default function StatsGrid({ stats }: StatsGridProps) {
  return (
    <div style={statsGridStyles.statsGrid}>
      {stats.map((stat, index) => (
        <div key={index} style={statsGridStyles.statItem}>
          {stat.icon}
          <div style={statsGridStyles.statNumber}>{stat.value}</div>
          <div style={statsGridStyles.statLabel}>{stat.label}</div>
        </div>
      ))}
    </div>
  );
}