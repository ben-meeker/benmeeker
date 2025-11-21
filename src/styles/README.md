# Style Guide

This directory contains the centralized style guide and design system for the website.

## Files

### `theme.ts`
Theme-agnostic design tokens (non-color values):
- **Typography**: Font families, sizes, weights, line heights
- **Spacing**: Based on 4px scale
- **Border Radius**: Consistent rounded corners
- **Shadows**: Elevation system
- **Transitions**: Animation durations and timing functions
- **Breakpoints**: Responsive design breakpoints
- **Z-index**: Layering system
- **Layout**: Container widths and padding

**Note**: Colors are NOT in theme.ts - they're defined as CSS variables in global.css

### `global.css`
**Single source of truth for all colors** with light and dark mode support:
- CSS color variables for both `[data-theme="light"]` and `[data-theme="dark"]`
- System preference support (`prefers-color-scheme`)
- Modern CSS reset
- Base typography styles
- Utility classes
- Accessibility-focused styles

## Usage

### For Colors - ALWAYS Use CSS Variables

```css
.my-component {
  /* Colors - these automatically switch between light/dark */
  background-color: var(--color-bg-primary);
  color: var(--color-text-primary);
  border-color: var(--color-border-primary);
}
```

### For Other Design Tokens - Use TypeScript OR CSS Variables

**Option 1: TypeScript** (for computed styles)
```typescript
import { theme } from '@/styles/theme';

const styles = {
  padding: theme.spacing[4],
  borderRadius: theme.borderRadius.lg,
  fontSize: theme.typography.fontSize.lg,
};
```

**Option 2: CSS Variables** (preferred in stylesheets)
```css
.my-component {
  padding: var(--spacing-4);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
  transition: all var(--transition-base) ease;
}
```

## Design Principles

1. **Consistency**: All components should use values from the theme
2. **Accessibility**: Maintain WCAG 2.1 AA standards minimum in both light and dark modes
3. **Responsiveness**: Mobile-first approach
4. **Performance**: Optimize animations and transitions
5. **Maintainability**: Single source of truth for all design tokens
6. **Theme-Aware**: All colors adapt automatically between light and dark modes

## Adding New Design Tokens

### Adding Colors
**ONLY edit `global.css`** - do NOT add to theme.ts:
1. Add CSS variable to both `[data-theme="light"]` and `[data-theme="dark"]` sections
2. Test in both light and dark modes
3. Verify WCAG contrast ratios in both modes
4. Document the usage

### Adding Non-Color Tokens (spacing, typography, etc.)
**Add to `theme.ts`**:
1. Add to the appropriate section (typography, spacing, etc.)
2. Optionally add corresponding CSS variable to `global.css`
3. Document the usage
4. Ensure consistency with existing values

### Architecture Note
**Colors = CSS Variables ONLY** (in global.css)  
**Everything else = TypeScript** (in theme.ts) with optional CSS variables

This prevents duplication and makes colors the single source of truth for theming.

## Dark Mode Support

For complete information on dark mode, see the main **`DARK_MODE.md`** guide in the project root.

### Quick Reference

```css
/* These variables automatically switch between light/dark */
.my-component {
  background-color: var(--color-bg-primary);
  color: var(--color-text-primary);
  border-color: var(--color-border-primary);
}
```

Always use CSS variables, never hard-code colors!

