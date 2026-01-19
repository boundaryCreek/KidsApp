import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import AdPlaceholder from '../AdPlaceholder/AdPlaceholder';
import { 
  baseLayoutStyles, 
  mainStyles, 
  contentWrapperWithRailStyles,
  contentWrapperSingleColumnStyles,
  mainContentStyles, 
  rightRailStyles 
} from './BaseLayout.styles';

interface BaseLayoutProps {
  children: React.ReactNode;
  rightRail?: React.ReactNode;
}

export default function BaseLayout({ children, rightRail }: BaseLayoutProps) {
 

  return (
    <div style={baseLayoutStyles}>
      <Header />
      <main style={mainStyles}>
        <div style={rightRail ? contentWrapperWithRailStyles : contentWrapperSingleColumnStyles}>
          <div style={mainContentStyles}>
            {children}
          </div>
          {rightRail && (
            <aside style={rightRailStyles}>
              {rightRail}
            </aside>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}