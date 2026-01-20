import Link from 'next/link';
import { TreePine, Home, Calendar, Tag, MapPin } from 'lucide-react';
import { 
  headerStyles, 
  headerContainerStyles, 
  headerTitleStyles,
  taglineStyles, 
  navStyles, 
  homeLinkStyles, 
  calendarLinkStyles,
  categoriesLinkStyles,
  locationsLinkStyles
} from './Header.styles';

export default function Header() {
  return (
    <header style={headerStyles}>
      <div style={headerContainerStyles}>
        <div>
          <h1 style={headerTitleStyles}>
            <TreePine size={24} style={{ display: 'inline-block', verticalAlign: 'text-bottom', marginRight: 'var(--space-2)' }} />
            UpNorth Kids
          </h1>
          <p style={taglineStyles}>Big Fun, Up North.</p>
        </div>
        
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
                href="/categories" 
                style={categoriesLinkStyles}
              >
                <Tag size={18} style={{ display: 'inline-block', verticalAlign: 'text-bottom', marginRight: 'var(--space-2)' }} />
                Categories
              </Link>
            </li>
            <li>
              <Link 
                href="/locations" 
                style={locationsLinkStyles}
              >
                <MapPin size={18} style={{ display: 'inline-block', verticalAlign: 'text-bottom', marginRight: 'var(--space-2)' }} />
                Locations
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