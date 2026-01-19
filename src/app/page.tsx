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
import AdPlaceholder from '@/components/AdPlaceholder/AdPlaceholder';

export default function Home() {

   const defaultRightRail = (
      <>
        <AdPlaceholder size="medium" label="Sponsored Content" />
        <AdPlaceholder size="small" label="Local Business" />
        <AdPlaceholder size="large" label="Family Activities" />
      </>
    );
  return (
    <BaseLayout rightRail={defaultRightRail}>
      <div style={homeContainerStyles}>
        <section style={heroSectionStyles}>
          <h1 style={heroTitleStyles}>
            <Sparkles size={48} style={{ display: 'inline-block', verticalAlign: 'text-bottom', marginRight: 'var(--space-3)' }} />
            Discover Minnesota's Best Kids Activities
          </h1>
          <p style={heroSubtitleStyles}>
            From the Twin Cities to Duluth, find amazing experiences for your little ones throughout the Land of 10,000 Lakes. Discover local adventures by age, location, and season.
          </p>
          <button style={ctaButtonStyles}>
            <Calendar size={20} style={{ display: 'inline-block', verticalAlign: 'text-bottom', marginRight: 'var(--space-2)' }} />
            Explore Activities
          </button>
        </section>

        <section style={featuresGridStyles}>
          <div style={featureCardStyles}>
            <div style={featureEmojiStyles}>
              <Target size={64} color="var(--color-primary-600)" />
            </div>
            <h3 style={featureTitleStyles}>Sports & Recreation</h3>
            <p style={featureDescriptionStyles}>
              Hockey, skiing, soccer, and swimming across Minnesota's best facilities and outdoor spaces.
            </p>
          </div>

          <div style={featureCardStyles}>
            <div style={featureEmojiStyles}>
              <Palette size={64} color="var(--color-secondary-600)" />
            </div>
            <h3 style={featureTitleStyles}>Arts & Culture</h3>
            <p style={featureDescriptionStyles}>
              Creative workshops at local museums, art centers, and community venues throughout Minnesota.
            </p>
          </div>

          <div style={featureCardStyles}>
            <div style={featureEmojiStyles}>
              <Microscope size={64} color="var(--color-accent-600)" />
            </div>
            <h3 style={featureTitleStyles}>STEM & Discovery</h3>
            <p style={featureDescriptionStyles}>
              Science museums, nature centers, and tech workshops from the Twin Cities to Duluth.
            </p>
          </div>

          <div style={featureCardStyles}>
            <div style={featureEmojiStyles}>
              <Music size={64} color="var(--color-primary-600)" />
            </div>
            <h3 style={featureTitleStyles}>Music & Performance</h3>
            <p style={featureDescriptionStyles}>
              Theater, music lessons, and performance opportunities at Minnesota's cultural venues.
            </p>
          </div>

          <div style={featureCardStyles}>
            <div style={featureEmojiStyles}>
              <BookOpen size={64} color="var(--color-secondary-600)" />
            </div>
            <h3 style={featureTitleStyles}>Learning & Education</h3>
            <p style={featureDescriptionStyles}>
              Libraries, educational programs, and learning centers across the Land of 10,000 Lakes.
            </p>
          </div>

          <div style={featureCardStyles}>
            <div style={featureEmojiStyles}>
              <Trees size={64} color="var(--color-accent-600)" />
            </div>
            <h3 style={featureTitleStyles}>Outdoor Adventures</h3>
            <p style={featureDescriptionStyles}>
              State parks, nature programs, and outdoor activities celebrating Minnesota's natural beauty.
            </p>
          </div>
        </section>
      </div>
    </BaseLayout>
  );
}
