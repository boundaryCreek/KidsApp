import { Category } from './common';

export interface CategoryWithCounts extends Category {
  _count: {
    activities: number;
    locations: number;
  };
}

export interface CategoryListResponse {
  categories: CategoryWithCounts[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

export interface CategoryFormData {
  name: string;
  slug: string;
  description: string;
  icon: string;
  color: string;
}
