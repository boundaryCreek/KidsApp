import { Location } from './location';
import { Category, AgeGroup, Review, Event } from './common';

export interface Activity {
  id: string;
  title: string;
  slug: string;
  description: string;
  organizer: string;
  costMin?: number;
  costMax?: number;
  costDisplay?: string;
  isFree: boolean;
  featured: boolean;
  imageUrl?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  location: Location;
  ageGroup?: AgeGroup;
  categories: Category[];
  reviews?: Review[];
  events?: Event[];
  _count: {
    favorites: number;
    reviews: number;
  };
}

// Utility type for activity details page
export type ActivityDetails = Activity;

// Utility function for formatting activity cost
export const formatActivityCost = (activity: Activity): string => {
  if (activity.isFree) return 'Free';
  if (activity.costDisplay) return activity.costDisplay;
  if (activity.costMin && activity.costMax) {
    return `$${activity.costMin} - $${activity.costMax}`;
  }
  if (activity.costMin) return `From $${activity.costMin}`;
  return 'Contact for pricing';
};