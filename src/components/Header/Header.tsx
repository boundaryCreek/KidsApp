import Link from 'next/link';
import { Sparkles, Home, Calendar } from 'lucide-react';
import { 
  headerStyles, 
  headerContainerStyles, 
  headerTitleStyles, 
  navStyles, 
  homeLinkStyles, 
  calendarLinkStyles 
} from './Header.styles';

export default function Header() {
  return (
    <header style={headerStyles}>
      <div style={headerContainerStyles}>
        <h1 style={headerTitleStyles}>
          <Sparkles size={24} style={{ display: 'inline-block', verticalAlign: 'text-bottom', marginRight: 'var(--space-2)' }} />
          Kids Calendar
        </h1>
        
        <nav>
          <ul style={navStyles}>
            <li>
              <Link 
                href="/" 
                style={homeLinkStyles}
              >
                <Home size={18} style={{ display: 'inline-block', verticalAlign: 'text-bottom', marginRight: 'var(--space-2)' }} />
                Home
              </Link>
            </li>
            <li>
              <Link 
                href="/calendar" 
                style={calendarLinkStyles}
              >
                <Calendar size={18} style={{ display: 'inline-block', verticalAlign: 'text-bottom', marginRight: 'var(--space-2)' }} />
                Calendar
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}