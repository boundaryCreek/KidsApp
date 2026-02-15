import Link from 'next/link';
import BaseLayout from '../../components/BaseLayout/BaseLayout';

export default function CityNotFound() {
  return (
    <BaseLayout>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '60vh',
        textAlign: 'center',
        padding: 'var(--space-8)',
      }}>
        <h1 style={{
          fontSize: 'var(--font-size-5xl)',
          fontWeight: 'var(--font-weight-bold)',
          color: 'var(--color-neutral-900)',
          marginBottom: 'var(--space-4)',
        }}>
          City Not Found
        </h1>
        <p style={{
          fontSize: 'var(--font-size-xl)',
          color: 'var(--color-neutral-600)',
          marginBottom: 'var(--space-8)',
          maxWidth: '600px',
        }}>
          We couldn't find the city you're looking for. It may not exist in our database yet.
        </p>
        <div style={{ display: 'flex', gap: 'var(--space-4)' }}>
          <Link
            href="/locations"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              padding: 'var(--space-3) var(--space-6)',
              backgroundColor: 'var(--color-primary-600)',
              color: 'var(--color-neutral-50)',
              borderRadius: 'var(--radius-lg)',
              textDecoration: 'none',
              fontSize: 'var(--font-size-base)',
              fontWeight: 'var(--font-weight-medium)',
              boxShadow: 'var(--shadow-md)',
              transition: 'var(--transition-all)',
            }}
          >
            Browse All Locations
          </Link>
          <Link
            href="/"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              padding: 'var(--space-3) var(--space-6)',
              backgroundColor: 'var(--color-neutral-200)',
              color: 'var(--color-neutral-900)',
              borderRadius: 'var(--radius-lg)',
              textDecoration: 'none',
              fontSize: 'var(--font-size-base)',
              fontWeight: 'var(--font-weight-medium)',
              boxShadow: 'var(--shadow-sm)',
              transition: 'var(--transition-all)',
            }}
          >
            Go Home
          </Link>
        </div>
      </div>
    </BaseLayout>
  );
}
