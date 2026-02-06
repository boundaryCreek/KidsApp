import BaseLayout from '@/components/BaseLayout/BaseLayout';
import FeaturedActivities from '@/components/FeaturedActivities/FeaturedActivities';
import AdPlaceholder from '@/components/AdPlaceholder/AdPlaceholder';

export default function Home() {
  return (
    <BaseLayout
      rightRail={(
        <div style={{ display: 'grid', gap: 'var(--space-6)', width: '100%', maxWidth: '100%' }}>
          <FeaturedActivities />
          <section style={{
            backgroundColor: 'var(--color-surface)',
            borderRadius: 'var(--radius-xl)',
            padding: 'var(--space-6)',
            border: '1px solid var(--color-neutral-200)',
            boxShadow: 'var(--shadow-sm)'
          }}>
            <h3 style={{
              fontSize: 'var(--font-size-lg)',
              fontWeight: 'var(--font-weight-semibold)',
              marginBottom: 'var(--space-3)'
            }}>
              Quick parent tips
            </h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: 'var(--space-3)' }}>
              <li>✅ Double-check the age range.</li>
              <li>✅ Bring snacks and a water bottle.</li>
              <li>✅ Save one indoor option as a backup.</li>
            </ul>
          </section>
          <AdPlaceholder size="medium" label="Sponsored Content" />
        </div>
      )}
    >
      <div style={{ display: 'grid', gap: 'var(--space-8)' }}>
        <section style={{
          backgroundColor: 'var(--color-surface)',
          borderRadius: 'var(--radius-2xl)',
          padding: 'var(--space-8)',
          border: '1px solid var(--color-primary-200)'
        }}>
          <p style={{
            fontSize: 'var(--font-size-sm)',
            color: 'var(--color-primary-700)',
            fontWeight: 'var(--font-weight-medium)',
            marginBottom: 'var(--space-2)'
          }}>
            Made by a parent who gets it
          </p>
          <h1 style={{
            fontSize: 'var(--font-size-4xl)',
            fontWeight: 'var(--font-weight-bold)',
            color: 'var(--color-primary-800)',
            lineHeight: 'var(--line-height-tight)',
            marginBottom: 'var(--space-4)'
          }}>
            Things to do with kids (without the overwhelm)
          </h1>
          <p style={{
            fontSize: 'var(--font-size-lg)',
            color: 'var(--color-primary-700)',
            lineHeight: 'var(--line-height-relaxed)',
            maxWidth: '42rem'
          }}>
            I built this to plan faster: age-appropriate ideas, close to home, and easy on the budget.
          </p>
          <div style={{ display: 'flex', gap: 'var(--space-4)', flexWrap: 'wrap', marginTop: 'var(--space-6)' }}>
            <button style={{
              backgroundColor: 'var(--color-secondary-500)',
              color: 'var(--color-neutral-50)',
              border: 'none',
              padding: 'var(--space-3) var(--space-6)',
              borderRadius: 'var(--radius-lg)',
              fontWeight: 'var(--font-weight-semibold)',
              cursor: 'pointer'
            }}>
              Find something for today
            </button>
            <button style={{
              backgroundColor: 'transparent',
              color: 'var(--color-primary-700)',
              border: '1px solid var(--color-primary-300)',
              padding: 'var(--space-3) var(--space-6)',
              borderRadius: 'var(--radius-lg)',
              fontWeight: 'var(--font-weight-semibold)',
              cursor: 'pointer'
            }}>
              See what’s coming up
            </button>
          </div>
        </section>

        <section style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: 'var(--space-4)'
        }}>
          {[
            { title: 'Ages 0-3', desc: 'Sensory play, storytime, and parent meetups.' },
            { title: 'Ages 4-7', desc: 'Parks, beginner sports, and craft classes.' },
            { title: 'Ages 8-12', desc: 'STEM labs, climbing, and art workshops.' },
            { title: 'Teens', desc: 'Leadership programs, clubs, and performances.' }
          ].map((item) => (
            <div
              key={item.title}
              style={{
                backgroundColor: 'var(--color-surface)',
                borderRadius: 'var(--radius-xl)',
                padding: 'var(--space-5)',
                border: '1px solid var(--color-neutral-200)',
                boxShadow: 'var(--shadow-sm)'
              }}
            >
              <h3 style={{ marginBottom: 'var(--space-2)', fontSize: 'var(--font-size-lg)' }}>
                {item.title}
              </h3>
              <p style={{ color: 'var(--color-neutral-700)', fontSize: 'var(--font-size-sm)' }}>
                {item.desc}
              </p>
            </div>
          ))}
        </section>

        <section style={{
          backgroundColor: 'var(--color-surface)',
          borderRadius: 'var(--radius-xl)',
          padding: 'var(--space-6)',
          border: '1px solid var(--color-neutral-200)',
          boxShadow: 'var(--shadow-sm)'
        }}>
          <h2 style={{ fontSize: 'var(--font-size-2xl)', marginBottom: 'var(--space-4)' }}>
            Weekend picks other parents love
          </h2>
          <div style={{ display: 'grid', gap: 'var(--space-3)' }}>
            <div>🎉 Free community events you can pop into</div>
            <div>🎟️ Indoor options for cold or rainy days</div>
            <div>🌲 Easy outdoor adventures with short drives</div>
          </div>
        </section>

        <AdPlaceholder size="banner" label="Featured Sponsor" />
      </div>
    </BaseLayout>
  );
}
