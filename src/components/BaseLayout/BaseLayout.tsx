import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import { baseLayoutStyles, mainStyles } from './BaseLayout.styles';

interface BaseLayoutProps {
  children: React.ReactNode;
}

export default function BaseLayout({ children }: BaseLayoutProps) {
  return (
    <div style={baseLayoutStyles}>
      <Header />
      <main style={mainStyles}>
        {children}
      </main>
      <Footer />
    </div>
  );
}