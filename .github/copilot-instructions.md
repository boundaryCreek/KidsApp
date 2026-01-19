<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

## Kids App - Next.js Project

### Design System Guidelines
When writing CSS or styling components in this project, use the comprehensive design system variables defined in `src/app/globals.css`:

**Colors**: Use `--color-primary-*`, `--color-secondary-*`, `--color-accent-*`, `--color-neutral-*`, `--color-success-*`, `--color-warning-*`, `--color-error-*`, `--color-info-*` instead of hardcoded colors.

**Typography**: Use `--font-size-*`, `--font-weight-*`, `--line-height-*`, `--letter-spacing-*` variables.

**Spacing**: Use `--space-*` variables for margins, padding, and gaps instead of arbitrary values.

**Border Radius**: Use `--radius-*` variables (sm, base, md, lg, xl, 2xl, 3xl, full).

**Shadows**: Use `--shadow-*` variables (sm, base, md, lg, xl, 2xl, inner).

**Transitions**: Use `--transition-*` and `--ease-*` variables for animations.

**Container Widths**: Use `--container-*` variables for max-widths.

**Examples**:
```css
.button {
  background-color: var(--color-primary-600);
  color: var(--color-neutral-50);
  padding: var(--space-3) var(--space-6);
  border-radius: var(--radius-lg);
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-medium);
  box-shadow: var(--shadow-sm);
  transition: var(--transition-colors);
}
```

Use utility classes when available: `.text-primary`, `.bg-surface`, `.shadow-lg`, etc.

### Architecture Guidelines

#### Type Definitions
All TypeScript interfaces and types must be defined in the `src/types/` folder for centralized type management:
- **Common types** (`Category`, `City`, `Organization`, etc.) go in `src/types/common.ts`
- **Domain-specific types** in separate files like `src/types/activity.ts`, `src/types/location.ts`
- **Export all types** from `src/types/index.ts` for easy importing
- **Never define types inline** in components or pages - always import from the types folder
- **Include utility functions** with types when applicable (e.g., `formatActivityCost`)

Example import pattern:
```typescript
import { Activity, Location, Category } from '../../../types';
import { formatActivityCost } from '../../../types/activity';
```

#### Component Structure
Each React component must follow this folder structure pattern:
```
src/components/ComponentName/
├── ComponentName.tsx          # Main React component
├── ComponentName.styles.ts    # Styled elements and CSS-in-JS styles
└── index.ts                   # Optional: re-export for cleaner imports
```

**Rules:**
- **Separate concerns**: Component logic in `.tsx`, styles in `.styles.ts`
- **Use TypeScript**: All components must be fully typed with proper interfaces
- **CSS-in-JS**: Use the design system variables in styled elements
- **Client components**: Add `'use client'` directive when using React hooks
- **Consistent naming**: PascalCase for component names, matching folder names

**Style file pattern:**
```typescript
import { CSSProperties } from 'react';

export const componentStyles: CSSProperties = {
  padding: 'var(--space-4)',
  backgroundColor: 'var(--color-neutral-50)',
  borderRadius: 'var(--radius-lg)',
};
```

#### CSS Layout Guidelines
**Prefer CSS Grid** for layout structure over flexbox when appropriate:
- **Grid for 2D layouts**: Use CSS Grid for complex layouts with both rows and columns
- **Responsive design**: Utilize `grid-template-columns` with `minmax()` and `fr` units
- **Layout patterns**: Cards, content areas, sidebar layouts, form grids
- **Design system spacing**: Use `--space-*` variables for grid gaps

**Grid examples:**
```typescript
// Card grid layout
export const cardGridStyles: CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
  gap: 'var(--space-6)',
};

// Main content with sidebar
export const contentLayoutStyles: CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'minmax(0, 1fr) 320px',
  gap: 'var(--space-8)',
  alignItems: 'start',
};
```

**When to use Grid vs Flexbox:**
- **CSS Grid**: Page layouts, card grids, complex 2D arrangements
- **Flexbox**: Navigation bars, button groups, single-direction alignment

### Project Setup Status
- [x] Verify that the copilot-instructions.md file in the .github directory is created.
- [x] Clarify Project Requirements - Next.js with TypeScript and Tailwind CSS
- [x] Scaffold the Project - Created Next.js app successfully
- [x] Design System - Comprehensive CSS variables added to globals.css
- [ ] Install Required Extensions - No extensions needed for Next.js
- [x] Compile the Project - Dependencies installed successfully
- [ ] Create and Run Task
- [ ] Launch the Project
- [ ] Ensure Documentation is Complete