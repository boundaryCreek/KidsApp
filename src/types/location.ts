import { Category, City, Organization } from './common';

export type LocationType = 'VENUE' | 'ORGANIZATION' | 'FACILITY' | 'OUTDOOR' | 'ONLINE';
export type ParkingType = 'FREE' | 'PAID' | 'STREET' | 'NONE';
export type AccessibilityFeature =
  | 'WHEELCHAIR_ACCESSIBLE'
  | 'STROLLER_FRIENDLY'
  | 'SENSORY_FRIENDLY'
  | 'ASL_INTERPRETER_AVAILABLE'
  | 'OTHER';

export interface LocationFormOptions {
  organizations: Array<Pick<Organization, 'id' | 'name' | 'slug'>>;
  cities: Array<Pick<City, 'id' | 'name' | 'slug'>>;
  categories: Array<Pick<Category, 'id' | 'name' | 'slug'>>;
  ageGroups: Array<{ id: string; name: string; minAge: number | null; maxAge: number | null }>;
}

export interface LocationFormData {
  name: string;
  slug: string;
  type: LocationType;
  description: string;
  address: string;
  latitude: string;
  longitude: string;
  phone: string;
  email: string;
  website: string;
  imageUrl: string;
  amenitiesInput: string;
  accessibility: AccessibilityFeature[];
  capacity: string;
  parking: ParkingType | '';
  publicTransport: string;
  operatingHours: string;
  timezone: string;
  socialMedia: string;
  organizationId: string;
  cityId: string;
  categoryIds: string[];
  ageGroupIds: string[];
  isActive: boolean;
}

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
  accessibility: AccessibilityFeature[];
  capacity: number | null;
  parking: ParkingType | null;
  publicTransport: string | null;
  operatingHours?: any;
  timezone?: string;
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
  ageGroups?: Array<{ id: string; name: string; slug: string }>;
  _count?: {
    activities: number;
    reviews?: number;
  };
}