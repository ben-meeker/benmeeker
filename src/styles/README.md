# Style Guide

This directory contains the centralized style guide and design system for the website.

## Files

### `theme.ts`
The main theme configuration file containing all design tokens:
- **Colors**: Primary, secondary, neutral, semantic colors
- **Typography**: Font families, sizes, weights, line heights
- **Spacing**: Based on 4px scale
- **Border Radius**: Consistent rounded corners
- **Shadows**: Elevation system
- **Transitions**: Animation durations and timing functions
- **Breakpoints**: Responsive design breakpoints
- **Z-index**: Layering system
- **Layout**: Container widths and padding

### `global.css`
Global CSS reset and base styles:
- CSS variables mapped from theme.ts
- Modern CSS reset
- Base typography styles
- Utility classes
- Accessibility-focused styles

## Usage

### In TypeScript/React Components

```typescript
import { theme } from '@/styles/theme';

// Using theme values directly
const styles = {
  color: theme.colors.primary.main,
  padding: theme.spacing[4],
  borderRadius: theme.borderRadius.lg,
};
```

### In CSS/CSS Modules

```css
.my-component {
  /* Use CSS variables */
  background-color: var(--color-primary-main);
  padding: var(--spacing-4);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
  transition: all var(--transition-base) ease;
}
```

## Design Principles

1. **Consistency**: All components should use values from the theme
2. **Accessibility**: Maintain WCAG 2.1 AA standards minimum
3. **Responsiveness**: Mobile-first approach
4. **Performance**: Optimize animations and transitions
5. **Maintainability**: Single source of truth for all design tokens

## Adding New Design Tokens

When adding new design tokens:
1. Add to `theme.ts`
2. Add corresponding CSS variables to `global.css`
3. Document the usage
4. Ensure consistency with existing values

