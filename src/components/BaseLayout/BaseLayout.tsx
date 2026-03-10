import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import AdPlaceholder from '../AdPlaceholder/AdPlaceholder';
import {
  baseLayoutStyles,
  mainStyles,
  contentWrapperWithRailStyles,
  contentWrapperSingleColumnStyles,
  mainContentStyles,
  rightRailStyles,
  topAdSlotStyles,
  topAdSlotInnerStyles,
} from './BaseLayout.styles';

interface BaseLayoutProps {
  children: React.ReactNode;
  rightRail?: React.ReactNode;
}

export default function BaseLayout({ children, rightRail }: BaseLayoutProps) {
  const responsiveStyles = `
    @media (max-width: 1024px) {
      .base-layout__content {
        grid-template-columns: 1fr !important;
      }

      .base-layout__rail {
        width: 100% !important;
      }
    }
  `;

  return (
    <div style={baseLayoutStyles}>
      <style>{responsiveStyles}</style>
      <Header />
      <div style={topAdSlotStyles}>
        <div style={topAdSlotInnerStyles}>
          <AdPlaceholder size="banner" label="Advertisement" />
        </div>
      </div>
      <main style={mainStyles}>
        <div
          className="base-layout__content"
          style={rightRail ? contentWrapperWithRailStyles : contentWrapperSingleColumnStyles}
        >
          <div style={mainContentStyles}>
            {children}
          </div>
          {rightRail && (
            <aside className="base-layout__rail" style={rightRailStyles}>
              {rightRail}
            </aside>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}