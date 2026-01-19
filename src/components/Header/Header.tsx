import Link from 'next/link';
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
          Kids App
        </h1>
        
        <nav>
          <ul style={navStyles}>
            <li>
              <Link 
                href="/" 
                style={homeLinkStyles}
              >
                Home
              </Link>
            </li>
            <li>
              <Link 
                href="/calendar" 
                style={calendarLinkStyles}
              >
                Calendar
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}