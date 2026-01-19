import { MapPin, Activity } from 'lucide-react';
import { CategoryDetails } from '../../types';
import {
  categoryHeaderStyles,
  categoryIconStyles,
  categoryTitleStyles,
  categoryDescriptionStyles,
  categoryStatsStyles,
  statItemStyles,
} from './CategoryHeader.styles';

interface CategoryHeaderProps {
  category: CategoryDetails;
}

export default function CategoryHeader({ category }: CategoryHeaderProps) {
  return (
    <div style={categoryHeaderStyles}>
      <div style={categoryIconStyles}>
        <span style={{ fontSize: 'var(--font-size-6xl)', color: category.color }}>
          {category.icon}
        </span>
      </div>
      <h1 style={{
        ...categoryTitleStyles,
        color: category.color
      }}>
        {category.name}
      </h1>
      {category.description && (
        <p style={categoryDescriptionStyles}>
          {category.description}
        </p>
      )}
      
      <div style={categoryStatsStyles}>
        <div style={statItemStyles}>
          <MapPin size={20} color="var(--color-neutral-500)" />
          <span>{category._count.locations} Locations</span>
        </div>
        <div style={statItemStyles}>
          <Activity size={20} color="var(--color-neutral-500)" />
          <span>{category._count.activities} Activities</span>
        </div>
      </div>
    </div>
  );
}