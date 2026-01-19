import { footerStyles, footerContainerStyles, footerTextStyles } from './Footer.styles';

export default function Footer() {
  return (
    <footer style={footerStyles}>
      <div style={footerContainerStyles}>
        <p style={footerTextStyles}>
          © 2026 Kids App. All rights reserved.
        </p>
      </div>
    </footer>
  );
}