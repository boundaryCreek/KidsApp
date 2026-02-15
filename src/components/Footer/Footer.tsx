import Link from 'next/link';
import { 
  footerStyles, 
  footerContainerStyles, 
  footerContentStyles,
  footerSectionStyles,
  footerTitleStyles,
  footerLinkStyles,
  footerBottomStyles,
  footerTextStyles 
} from './Footer.styles';

export default function Footer() {
  return (
    <footer style={footerStyles}>
      <style>
        {`
          .footer-link:hover {
            color: var(--color-primary-400) !important;
            text-decoration: underline;
          }
        `}
      </style>
      <div style={footerContainerStyles}>
        <div style={footerContentStyles}>
          {/* Main Navigation */}
          <div style={footerSectionStyles}>
            <h3 style={footerTitleStyles}>Explore</h3>
            <Link href="/" style={footerLinkStyles} className="footer-link">Home</Link>
            <Link href="/categories" style={footerLinkStyles} className="footer-link">Categories</Link>
            <Link href="/locations" style={footerLinkStyles} className="footer-link">Locations</Link>
            <Link href="/calendar" style={footerLinkStyles} className="footer-link">Events Calendar</Link>
          </div>

          {/* Popular Cities */}
          <div style={footerSectionStyles}>
            <h3 style={footerTitleStyles}>Popular Cities</h3>
            <Link href="/minneapolis" style={footerLinkStyles} className="footer-link">Minneapolis</Link>
            <Link href="/saint-paul" style={footerLinkStyles} className="footer-link">Saint Paul</Link>
            <Link href="/eagan" style={footerLinkStyles} className="footer-link">Eagan</Link>
            <Link href="/woodbury" style={footerLinkStyles} className="footer-link">Woodbury</Link>
          </div>

          {/* Categories */}
          <div style={footerSectionStyles}>
            <h3 style={footerTitleStyles}>Activities</h3>
            <Link href="/categories/sports" style={footerLinkStyles} className="footer-link">Sports</Link>
            <Link href="/categories/arts" style={footerLinkStyles} className="footer-link">Arts & Crafts</Link>
            <Link href="/categories/education" style={footerLinkStyles} className="footer-link">Education</Link>
            <Link href="/categories/outdoor" style={footerLinkStyles} className="footer-link">Outdoor Fun</Link>
          </div>

          {/* About */}
          <div style={footerSectionStyles}>
            <h3 style={footerTitleStyles}>Kids App</h3>
            <p style={{ ...footerLinkStyles, cursor: 'default', textDecoration: 'none' }}>
              Discover amazing activities and locations for kids in Minnesota.
            </p>
            <p style={{ ...footerLinkStyles, cursor: 'default', textDecoration: 'none', marginTop: 'var(--space-2)' }}>
              Making family fun easier to find.
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div style={footerBottomStyles}>
          <p style={footerTextStyles}>
            © 2026 Kids App. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}