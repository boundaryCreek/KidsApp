export interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string;
  color: string;
}

export interface City {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  latitude: number | null;
  longitude: number | null;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Organization {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  website: string | null;
  imageUrl: string | null;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface AgeGroup {
  id: string;
  name: string;
  slug: string;
  minAge: number | null;
  maxAge: number | null;
  description: string | null;
  sortOrder: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface User {
  id: string;
  name: string | null;
  email: string;
}

export interface Review {
  id: string;
  rating: number;
  title: string | null;
  comment: string | null;
  helpfulCount: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  user: Pick<User, 'name' | 'email'>;
  locationId: string | null;
  activityId: string | null;
  eventId: string | null;
}

export interface Event {
  id: string;
  activityId: string;
  slug: string;
  date: Date;
  time: string | null;
  title: string | null;
  description: string | null;
  cancelled: boolean;
  notes: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface BreadcrumbItem {
  href: string;
  label: string;
}

export interface BreadcrumbProps {
  items: BreadcrumbItem[];
  currentPage: string;
}

export interface CategoryDetails {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  icon: string;
  color: string;
  locations: any[]; // Will be properly typed with Location interface
  activities: any[]; // Will be properly typed with Activity interface
  _count: {
    locations: number;
    activities: number;
  };
}