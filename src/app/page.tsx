import BaseLayout from '../components/BaseLayout/BaseLayout';
import { Sparkles, Calendar, Target, Palette, Microscope, Music, BookOpen, Trees } from 'lucide-react';
import {
  homeContainerStyles,
  heroSectionStyles,
  heroTitleStyles,
  heroSubtitleStyles,
  ctaButtonStyles,
  featuresGridStyles,
  featureCardStyles,
  featureEmojiStyles,
  featureTitleStyles,
  featureDescriptionStyles
} from './page.styles';

export default function Home() {
  return (
    <BaseLayout>
      <div style={homeContainerStyles}>
        <section style={heroSectionStyles}>
          <h1 style={heroTitleStyles}>
            <Sparkles size={48} style={{ display: 'inline-block', verticalAlign: 'text-bottom', marginRight: 'var(--space-3)' }} />
            Discover joyful, local experiences that keep your little ones moving, learning, and smiling.
          </h1>
          <p style={heroSubtitleStyles}>
            Browse curated activities by age, location, and cost—then jump into the calendar view for planning. Every listing includes venue information and helpful details.
          </p>
          <button style={ctaButtonStyles}>
            <Calendar size={20} style={{ display: 'inline-block', verticalAlign: 'text-bottom', marginRight: 'var(--space-2)' }} />
            Open the Calendar
          </button>
        </section>

        <section style={featuresGridStyles}>
          <div style={featureCardStyles}>
            <div style={featureEmojiStyles}>
              <Target size={64} color="var(--color-primary-600)" />
            </div>
            <h3 style={featureTitleStyles}>Sports</h3>
            <p style={featureDescriptionStyles}>
              Soccer, basketball, swimming, and more activities to keep kids active and healthy.
            </p>
          </div>

          <div style={featureCardStyles}>
            <div style={featureEmojiStyles}>
              <Palette size={64} color="var(--color-secondary-600)" />
            </div>
            <h3 style={featureTitleStyles}>Arts & Crafts</h3>
            <p style={featureDescriptionStyles}>
              Creative workshops, painting classes, and hands-on projects for artistic expression.
            </p>
          </div>

          <div style={featureCardStyles}>
            <div style={featureEmojiStyles}>
              <Microscope size={64} color="var(--color-accent-600)" />
            </div>
            <h3 style={featureTitleStyles}>STEM</h3>
            <p style={featureDescriptionStyles}>
              Science experiments, coding workshops, and engineering challenges for curious minds.
            </p>
          </div>

          <div style={featureCardStyles}>
            <div style={featureEmojiStyles}>
              <Music size={64} color="var(--color-primary-600)" />
            </div>
            <h3 style={featureTitleStyles}>Music</h3>
            <p style={featureDescriptionStyles}>
              Piano lessons, choir practice, and music appreciation classes for all skill levels.
            </p>
          </div>

          <div style={featureCardStyles}>
            <div style={featureEmojiStyles}>
              <BookOpen size={64} color="var(--color-secondary-600)" />
            </div>
            <h3 style={featureTitleStyles}>Reading</h3>
            <p style={featureDescriptionStyles}>
              Story time, book clubs, and reading adventures to foster a love of literature.
            </p>
          </div>

          <div style={featureCardStyles}>
            <div style={featureEmojiStyles}>
              <Trees size={64} color="var(--color-accent-600)" />
            </div>
            <h3 style={featureTitleStyles}>Outdoor</h3>
            <p style={featureDescriptionStyles}>
              Nature walks, playground time, and outdoor adventures in fresh air.
            </p>
          </div>
        </section>
      </div>
    </BaseLayout>
  );
}
