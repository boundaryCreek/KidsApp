import { Organization } from './common';

export interface OrganizationWithCounts extends Organization {
  _count: {
    locations: number;
  };
}

export interface OrganizationListResponse {
  organizations: OrganizationWithCounts[];
  total: number;
  page: number;
  totalPages: number;
}

export interface OrganizationFormData {
  name: string;
  description: string;
  website: string;
  imageUrl: string;
}
