import { AgeGroup } from './common';

export interface AgeGroupWithCount extends AgeGroup {
  _count: {
    activities: number;
  };
}

export interface AgeGroupsResponse {
  ageGroups: AgeGroupWithCount[];
  total: number;
  page: number;
  totalPages: number;
}

export interface AgeGroupFormData {
  name: string;
  minAge: string;
  maxAge: string;
  description: string;
}
