import { CategoryDetails } from '../../types';
import {
  categoryHeaderStyles,
  categoryHeaderAccentBar,
  categoryLabelStyles,
  categoryTitleStyles,
  categoryDescriptionStyles,
} from './CategoryHeader.styles';

interface CategoryHeaderProps {
  category: CategoryDetails;
}

export default function CategoryHeader({ category }: CategoryHeaderProps) {
  return (
    <div style={categoryHeaderStyles}>
      <div style={categoryHeaderAccentBar} />
      <h1 style={categoryTitleStyles}>{category.name}</h1>
      {category.description && (
        <p style={categoryDescriptionStyles}>{category.description}</p>
      )}
    </div>
  );
}
