import { Category, City, Organization } from './common';

export type LocationType = 'VENUE' | 'ORGANIZATION' | 'FACILITY' | 'OUTDOOR' | 'ONLINE';

export interface Location {
  id: string;
  name: string;
  slug: string;
  type: LocationType;
  description: string;
  address?: string;
  latitude?: number;
  longitude?: number;
  phone?: string;
  email?: string;
  website?: string;
  imageUrl?: string;
  amenities?: string[];
  capacity?: number;
  parking?: string;
  publicTransport?: string;
  operatingHours?: any;
  hours?: any;
  timezone?: string;
  socialMedia?: any;
  rating?: number;
  reviewCount?: number;
  averageRating?: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  city?: City;
  organization?: Organization;
  categories: Category[];
  _count?: {
    activities: number;
  };
}