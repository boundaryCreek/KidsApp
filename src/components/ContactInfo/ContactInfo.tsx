import { MapPin, Phone, Mail, Globe, Building2, Users } from 'lucide-react';
import { City, Organization } from '../../types';

interface ContactInfoProps {
  address: string | null;
  phone: string | null;
  email: string | null;
  website: string | null;
  city: City | null;
  organization: Organization;
}

const contactInfoStyles = {
  locationInfo: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: 'var(--space-3)',
  },
  locationItem: {
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--space-2)',
    color: 'var(--color-neutral-700)',
    fontSize: 'var(--font-size-sm)',
  },
  locationText: {
    color: 'inherit',
  },
};

export default function ContactInfo({ address, phone, email, website, city, organization }: ContactInfoProps) {
  return (
    <div style={contactInfoStyles.locationInfo}>
      {address && (
        <div style={contactInfoStyles.locationItem}>
          <MapPin size={16} />
          <span style={contactInfoStyles.locationText}>{address}</span>
        </div>
      )}

      {phone && (
        <a 
          href={`tel:${phone}`} 
          style={{ ...contactInfoStyles.locationItem, textDecoration: 'none' }}
        >
          <Phone size={16} />
          <span style={contactInfoStyles.locationText}>{phone}</span>
        </a>
      )}

      {email && (
        <a 
          href={`mailto:${email}`} 
          style={{ ...contactInfoStyles.locationItem, textDecoration: 'none' }}
        >
          <Mail size={16} />
          <span style={contactInfoStyles.locationText}>{email}</span>
        </a>
      )}

      {website && (
        <a 
          href={website} 
          target="_blank" 
          rel="noopener noreferrer"
          style={{ ...contactInfoStyles.locationItem, textDecoration: 'none' }}
        >
          <Globe size={16} />
          <span style={contactInfoStyles.locationText}>Visit Website</span>
        </a>
      )}

      {city && (
        <div style={contactInfoStyles.locationItem}>
          <Building2 size={16} />
          <span style={contactInfoStyles.locationText}>{city.name}</span>
        </div>
      )}

      {organization && (
        <div style={contactInfoStyles.locationItem}>
          <Users size={16} />
          <span style={contactInfoStyles.locationText}>{organization.name}</span>
        </div>
      )}
    </div>
  );
}