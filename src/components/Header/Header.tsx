'use client';

import Link from 'next/link';
import { TreePine, Calendar, Tag, MapPin } from 'lucide-react';
import { useState } from 'react';
import { 
  headerStyles, 
  headerContainerStyles, 
  logoStyles,
  logoLinkStyles,
  headerTitleStyles,
  taglineStyles, 
  navStyles,
  navMobileToggleStyles,
  navMobileToggleLabelStyles,
  navMobileStyles,
  calendarLinkStyles,
  categoriesLinkStyles,
  locationsLinkStyles
} from './Header.styles';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header style={headerStyles}>
      <div style={headerContainerStyles}>
        <Link href="/" style={logoLinkStyles}>
          <div style={logoStyles}>
            <h1 style={headerTitleStyles}>
              <TreePine size={24} style={{ display: 'inline-block', verticalAlign: 'text-bottom', marginRight: 'var(--space-2)' }} />
              UpNorth Kids
            </h1>
            <p style={taglineStyles}>Big Fun, Up North.</p>
          </div>
        </Link>
        
        <input 
          type="checkbox" 
          id="nav-toggle" 
          checked={mobileMenuOpen}
          onChange={(e) => setMobileMenuOpen(e.target.checked)}
          style={{ position: 'absolute', opacity: 0, width: 0, height: 0 }}
        />
        <label htmlFor="nav-toggle" style={navMobileToggleLabelStyles}>
          ☰
        </label>
        
        <nav style={navStyles}>
          <ul style={{ display: 'flex', flexDirection: 'row', gap: 'var(--space-4)', listStyle: 'none', margin: 0, padding: 0 }}>
            <li>
              <Link 
                href="/categories" 
                style={categoriesLinkStyles}
                onClick={() => setMobileMenuOpen(false)}
              >
                <Tag size={18} style={{ display: 'inline-block', verticalAlign: 'text-bottom', marginRight: 'var(--space-2)' }} />
                Categories
              </Link>
            </li>
            <li>
              <Link 
                href="/locations" 
                style={locationsLinkStyles}
                onClick={() => setMobileMenuOpen(false)}
              >
                <MapPin size={18} style={{ display: 'inline-block', verticalAlign: 'text-bottom', marginRight: 'var(--space-2)' }} />
                Locations
              </Link>
            </li>
            <li>
              <Link 
                href="/calendar" 
                style={calendarLinkStyles}
                onClick={() => setMobileMenuOpen(false)}
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