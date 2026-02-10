import { MapPin, Phone, Mail, Globe, Building2, Users } from 'lucide-react';
import { CSSProperties } from 'react';
import { City, Organization } from '../../types';

interface ContactInfoProps {
  address?: string | null;
  phone?: string | null;
  email?: string | null;
  website?: string | null;
  city?: City | null;
  organization?: Organization | null;
  variant?: 'grid' | 'column' | 'compact';
  showCity?: boolean;
  showOrganization?: boolean;
}

const gridStyles: CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
  gap: 'var(--space-4)',
};

const columnStyles: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: 'var(--space-3)',
};

const compactStyles: CSSProperties = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: 'var(--space-3)',
};

const itemGridStyles: CSSProperties = {
  display: 'flex',
  alignItems: 'flex-start',
  gap: 'var(--space-3)',
  padding: 'var(--space-4)',
  backgroundColor: 'var(--color-neutral-50)',
  borderRadius: 'var(--radius-lg)',
  textDecoration: 'none',
  color: 'var(--color-text)',
  border: '1px solid var(--color-border)',
  transition: 'var(--transition-colors)',
};

const itemColumnStyles: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: 'var(--space-2)',
  color: 'var(--color-neutral-700)',
  fontSize: 'var(--font-size-sm)',
  textDecoration: 'none',
};

const itemCompactStyles: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: 'var(--space-2)',
  padding: 'var(--space-2) var(--space-3)',
  backgroundColor: 'var(--color-neutral-50)',
  borderRadius: 'var(--radius-md)',
  textDecoration: 'none',
  color: 'var(--color-text)',
  fontSize: 'var(--font-size-sm)',
  border: '1px solid var(--color-border)',
  transition: 'var(--transition-colors)',
};

const labelStyles: CSSProperties = {
  fontSize: 'var(--font-size-xs)',
  fontWeight: 'var(--font-weight-semibold)',
  color: 'var(--color-neutral-500)',
  textTransform: 'uppercase',
  letterSpacing: 'var(--letter-spacing-wider)',
};

const valueStyles: CSSProperties = {
  fontSize: 'var(--font-size-sm)',
  fontWeight: 'var(--font-weight-medium)',
  color: 'var(--color-text)',
};

export default function ContactInfo({ 
  address, 
  phone, 
  email, 
  website, 
  city, 
  organization,
  variant = 'column',
  showCity = false,
  showOrganization = false,
}: ContactInfoProps) {
  const containerStyle = variant === 'grid' ? gridStyles : variant === 'compact' ? compactStyles : columnStyles;
  const itemStyle = variant === 'grid' ? itemGridStyles : variant === 'compact' ? itemCompactStyles : itemColumnStyles;

  const hasContact = address || phone || email || website;
  if (!hasContact && !showCity && !showOrganization) return null;

  return (
    <div style={containerStyle}>
      {address && (
        <a 
          href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${address}${city ? ', ' + city.name : ''}`)}`}
          target="_blank"
          rel="noopener noreferrer"
          style={itemStyle}
        >
          <MapPin size={variant === 'grid' ? 20 : 16} />
          {variant === 'grid' ? (
            <div>
              <div style={labelStyles}>Address</div>
              <div style={valueStyles}>{address}{city && `, ${city.name}`}</div>
            </div>
          ) : (
            <span>{address}</span>
          )}
        </a>
      )}

      {phone && (
        <a 
          href={`tel:${phone}`} 
          style={itemStyle}
        >
          <Phone size={variant === 'grid' ? 20 : 16} />
          {variant === 'grid' ? (
            <div>
              <div style={labelStyles}>Phone</div>
              <div style={valueStyles}>{phone}</div>
            </div>
          ) : (
            <span>{phone}</span>
          )}
        </a>
      )}

      {email && (
        <a 
          href={`mailto:${email}`} 
          style={itemStyle}
        >
          <Mail size={variant === 'grid' ? 20 : 16} />
          {variant === 'grid' ? (
            <div>
              <div style={labelStyles}>Email</div>
              <div style={valueStyles}>{email}</div>
            </div>
          ) : (
            <span>{email}</span>
          )}
        </a>
      )}

      {website && (
        <a 
          href={website} 
          target="_blank" 
          rel="noopener noreferrer"
          style={itemStyle}
        >
          <Globe size={variant === 'grid' ? 20 : 16} />
          {variant === 'grid' ? (
            <div>
              <div style={labelStyles}>Website</div>
              <div style={valueStyles}>Visit website</div>
            </div>
          ) : (
            <span>Website</span>
          )}
        </a>
      )}

      {showCity && city && (
        <div style={itemStyle}>
          <Building2 size={variant === 'grid' ? 20 : 16} />
          {variant === 'grid' ? (
            <div>
              <div style={labelStyles}>City</div>
              <div style={valueStyles}>{city.name}</div>
            </div>
          ) : (
            <span>{city.name}</span>
          )}
        </div>
      )}

      {showOrganization && organization && (
        <div style={itemStyle}>
          <Users size={variant === 'grid' ? 20 : 16} />
          {variant === 'grid' ? (
            <div>
              <div style={labelStyles}>Organization</div>
              <div style={valueStyles}>{organization.name}</div>
            </div>
          ) : (
            <span>{organization.name}</span>
          )}
        </div>
      )}
    </div>
  );
}