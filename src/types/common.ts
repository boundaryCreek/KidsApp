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
  description?: string;
  latitude?: number;
  longitude?: number;
}

export interface Organization {
  id: string;
  name: string;
  slug: string;
  description?: string;
  website?: string;
  email?: string;
  phone?: string;
}

export interface AgeGroup {
  id: string;
  name: string;
  minAge: number;
  maxAge: number;
}

export interface User {
  id: string;
  name: string | null;
  email: string;
}

export interface Review {
  id: string;
  content: string;
  rating: number;
  isActive: boolean;
  createdAt: Date;
  user: Pick<User, 'name' | 'email'>;
}

export interface Event {
  id: string;
  activityId: string;
  slug: string;
  date: Date;
  time?: string;
  title?: string;
  description?: string;
  cancelled: boolean;
  notes?: string;
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