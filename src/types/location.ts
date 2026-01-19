import { Category, City, Organization } from './common';

export type LocationType = 'VENUE' | 'ORGANIZATION' | 'FACILITY' | 'OUTDOOR' | 'ONLINE';
export type ParkingType = 'FREE' | 'PAID' | 'STREET' | 'NONE';

export interface Location {
  id: string;
  name: string;
  slug: string;
  type: LocationType;
  description: string;
  address: string | null;
  latitude: number | null;
  longitude: number | null;
  phone: string | null;
  email: string | null;
  website: string | null;
  imageUrl: string | null;
  amenities: string[];
  capacity: number | null;
  parking: ParkingType | null;
  publicTransport: string | null;
  operatingHours?: any;
  socialMedia?: any;
  rating: number | null;
  reviewCount: number | null;
  averageRating: number | null;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  city: City | null;
  organization: Organization;
  categories: Category[];
  _count?: {
    activities: number;
    reviews?: number;
  };
}