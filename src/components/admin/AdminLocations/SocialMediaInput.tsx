'use client';

import React, { useEffect, useState } from 'react';
import { Facebook, Instagram, Twitter, Youtube, Linkedin, Globe } from 'lucide-react';
import { adminInputStyles } from '../AdminLayout/AdminLayout.styles';

interface SocialMediaData {
  facebook?: string;
  instagram?: string;
  twitter?: string;
  youtube?: string;
  linkedin?: string;
  website?: string;
  [key: string]: string | undefined;
}

interface SocialMediaInputProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

const PLATFORMS = [
  { id: 'facebook', label: 'Facebook', icon: Facebook, placeholder: 'username or page URL' },
  { id: 'instagram', label: 'Instagram', icon: Instagram, placeholder: '@username' },
  { id: 'twitter', label: 'Twitter/X', icon: Twitter, placeholder: '@username' },
  { id: 'youtube', label: 'YouTube', icon: Youtube, placeholder: 'channel URL' },
  { id: 'linkedin', label: 'LinkedIn', icon: Linkedin, placeholder: 'company or profile URL' },
  { id: 'website', label: 'Other Website', icon: Globe, placeholder: 'website URL' },
] as const;

export default function SocialMediaInput({ value, onChange, disabled = false }: SocialMediaInputProps) {
  const [socialData, setSocialData] = useState<SocialMediaData>({});

  useEffect(() => {
    if (value && value.trim()) {
      try {
        const parsed = JSON.parse(value);
        setSocialData(parsed || {});
      } catch (error) {
        console.warn('Invalid JSON in social media field', error);
        setSocialData({});
      }
    } else {
      setSocialData({});
    }
  }, [value]);

  const handleChange = (platform: string, newValue: string) => {
    const updated = {
      ...socialData,
      [platform]: newValue || undefined,
    };

    // Remove empty values
    Object.keys(updated).forEach((key) => {
      if (!updated[key]) {
        delete updated[key];
      }
    });

    setSocialData(updated);
    
    // Convert back to JSON string
    const jsonString = Object.keys(updated).length > 0 ? JSON.stringify(updated) : '';
    onChange(jsonString);
  };

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: 'var(--space-4)',
      }}
    >
      {PLATFORMS.map((platform) => {
        const Icon = platform.icon;
        return (
          <div key={platform.id}>
            <label
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--space-2)',
                fontSize: 'var(--font-size-sm)',
                fontWeight: 'var(--font-weight-medium)',
                marginBottom: 'var(--space-2)',
                color: 'var(--color-neutral-700)',
              }}
            >
              <Icon size={16} />
              {platform.label}
            </label>
            <input
              type="text"
              value={socialData[platform.id] || ''}
              onChange={(e) => handleChange(platform.id, e.target.value)}
              placeholder={platform.placeholder}
              disabled={disabled}
              style={adminInputStyles}
            />
          </div>
        );
      })}
    </div>
  );
}
