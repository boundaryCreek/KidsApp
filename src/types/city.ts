import { City } from './common';

export interface CityWithCounts extends City {
  _count: {
    locations: number;
  };
}

export interface CityListResponse {
  cities: CityWithCounts[];
  total: number;
  page: number;
  totalPages: number;
}

export interface CityFormData {
  name: string;
  description: string;
  latitude: string;
  longitude: string;
}
