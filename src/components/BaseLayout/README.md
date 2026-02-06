# BaseLayout Component

A responsive, grid-based layout component for creating flexible page structures with customizable breakpoints and column configurations.

## Features

- **Responsive Grid System**: 4, 8, 12, or 16 column grids at different breakpoints
- **Flexible Column Positioning**: Full control over where content appears at each breakpoint
- **Mobile-First Design**: Stack vertically on mobile, expand to multi-column on larger screens
- **Sticky Sidebar**: Side content becomes sticky on tablet and larger screens
- **TypeScript Support**: Full type safety with interfaces for grid configuration

## Basic Usage

### Simple Layout with Sidebar

```tsx
import BaseLayout from '../components/BaseLayout/BaseLayout';

export default function Page() {
  return (
    <BaseLayout sideContent={<YourSidebar />}>
      <h1>Main Content</h1>
      <p>Your content here...</p>
    </BaseLayout>
  );
}
```

**Default behavior:**
- **Mobile** (< 768px): 4-column grid, content takes all 4 columns (full width)
- **Tablet** (768px - 1023px): 8-column grid, main content columns 1-7, sidebar column 7-9
- **Desktop** (≥ 1024px): 16-column grid, main content columns 1-13, sidebar columns 13-17

## Advanced Configuration

### Custom Grid Configuration

Pass a `gridConfig` prop to customize the layout at different breakpoints:

```tsx
<BaseLayout 
  sideContent={<YourSidebar />}
  gridConfig={{
    sm: {
      columns: 4,
      mainStart: 1,
      mainEnd: 5,              // Full width on mobile
    },
    md: {
      columns: 8,
      mainStart: 1,
      mainEnd: 6,              // Wider main content
      sideStart: 6,
      sideEnd: 9,              // Narrower sidebar
    },
    lg: {
      columns: 16,
      mainStart: 1,
      mainEnd: 11,             // Even wider on desktop
      sideStart: 11,
      sideEnd: 17,
    },
  }}
>
  <h1>Main Content</h1>
</BaseLayout>
```

### Configuration Object Types

```tsx
interface GridConfig {
  columns: 4 | 8 | 12 | 16;    // Total number of columns
  mainStart?: number;           // Column where main content starts (1-based)
  mainEnd?: number;             // Column where main content ends
  sideStart?: number;           // Column where sidebar starts
  sideEnd?: number;             // Column where sidebar ends
}

interface BreakpointConfig {
  sm?: GridConfig;   // 640px and up
  md?: GridConfig;   // 768px and up
  lg?: GridConfig;   // 1024px and up
  xl?: GridConfig;   // 1280px and up
}
```

## Layout Examples

### Example 1: Wide Main, Narrow Sidebar

Perfect for blog posts with a small sidebar.

```tsx
<BaseLayout 
  sideContent={<Widgets />}
  gridConfig={{
    md: {
      columns: 8,
      mainStart: 1,
      mainEnd: 7,    // 6 columns
      sideStart: 7,
      sideEnd: 9,    // 2 columns
    },
    lg: {
      columns: 16,
      mainStart: 1,
      mainEnd: 13,   // 12 columns
      sideStart: 13,
      sideEnd: 17,   // 4 columns
    },
  }}
>
  Blog content
</BaseLayout>
```

### Example 2: Balanced Layout

Main content and sidebar take up equal space.

```tsx
<BaseLayout 
  sideContent={<Sidebar />}
  gridConfig={{
    md: {
      columns: 8,
      mainStart: 1,
      mainEnd: 5,    // 4 columns
      sideStart: 5,
      sideEnd: 9,    // 4 columns
    },
    lg: {
      columns: 16,
      mainStart: 1,
      mainEnd: 9,    // 8 columns
      sideStart: 9,
      sideEnd: 17,   // 8 columns
    },
  }}
>
  Main content
</BaseLayout>
```

### Example 3: Mobile Sidebar, Desktop Layout

Sidebar only appears on tablet/desktop.

```tsx
<BaseLayout 
  sideContent={<SidePanel />}
  gridConfig={{
    sm: {
      columns: 4,
      mainStart: 1,
      mainEnd: 5,    // Full width on mobile
      // No sidebar config = sidebar not displayed
    },
    md: {
      columns: 8,
      mainStart: 1,
      mainEnd: 7,
      sideStart: 7,
      sideEnd: 9,    // Sidebar appears on tablet
    },
    lg: {
      columns: 16,
      mainStart: 1,
      mainEnd: 13,
      sideStart: 13,
      sideEnd: 17,
    },
  }}
>
  Content
</BaseLayout>
```

## Grid Calculation Tips

When planning your grid layout, remember:
- **Columns are 1-based** (not 0-based)
- **The end column is exclusive** (like array slicing)
  - `mainStart: 1, mainEnd: 5` = 4 columns wide
  - `mainStart: 1, mainEnd: 13` = 12 columns wide

### Column Width Cheat Sheet

For common layouts:

| Breakpoint | Total Cols | Full Width | 2/3 Width | 1/2 Width | 1/3 Width |
|-----------|-----------|-----------|----------|----------|----------|
| sm        | 4         | 1-5       | 1-4      | 1-3      | 1-2      |
| md        | 8         | 1-9       | 1-6      | 1-5      | 1-4      |
| lg        | 16        | 1-17      | 1-12     | 1-9      | 1-6      |

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `React.ReactNode` | - | Main content to display |
| `sideContent` | `React.ReactNode` | - | Optional sidebar/side panel content |
| `gridConfig` | `BreakpointConfig` | See defaults | Custom grid configuration for breakpoints |

## Responsive Behavior

The layout uses CSS Grid with CSS variables for dynamic column positioning:

```css
.base-layout--grid {
  display: grid;
  grid-template-columns: repeat(var(--grid-columns, 4), 1fr);
  gap: var(--space-6);
}

.base-layout--main {
  grid-column: var(--main-start) / var(--main-end);
}

.base-layout--side {
  grid-column: var(--side-start, auto) / var(--side-end, auto);
}
```

CSS variables are updated at each media query breakpoint automatically based on your configuration.

## Styling Notes

- Uses design system spacing variables (`--space-*`)
- Gap increases from `var(--space-6)` to `var(--space-8)` at tablet breakpoint
- Padding adjusts responsively on the main content wrapper
- Side content becomes sticky at tablet size for better UX

## Accessibility

The component includes:
- Semantic HTML (`<main>`, `<aside>`)
- Proper heading structure
- Sufficient spacing for touch targets
- Responsive text sizing
- Color contrast maintained across themes

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- CSS Grid support required
- CSS Variables support required
- ES6+ JavaScript

## Examples in the App

Look for real-world usage:
- [src/app/locations/[slug]/page.tsx](../../app/locations/[slug]/page.tsx) - Location detail page with sidebar
- More examples coming as pages are converted
