# Component Library Documentation

This document provides detailed information about all available components in the application.

## 🎨 Design Principles

All components in this library follow these principles:
- **Consistency**: Use design tokens from the style guide
- **Accessibility**: WCAG 2.1 AA compliant
- **Reusability**: Generic and composable
- **Type Safety**: Full TypeScript support
- **Responsive**: Mobile-first approach

## 📦 Available Components

### Button

A versatile button component with multiple variants and sizes.

#### Usage

```tsx
import { Button } from '@/components';

<Button variant="primary" size="md">
  Click Me
</Button>
```

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| variant | 'primary' \| 'secondary' \| 'outline' \| 'ghost' | 'primary' | Button style variant |
| size | 'sm' \| 'md' \| 'lg' | 'md' | Button size |
| fullWidth | boolean | false | Makes button full width |
| disabled | boolean | false | Disables the button |
| children | ReactNode | required | Button content |

#### Variants

- **primary**: Solid primary color background
- **secondary**: Solid secondary color background
- **outline**: Transparent with border
- **ghost**: Transparent, no border

#### Examples

```tsx
// Primary button
<Button variant="primary">Submit</Button>

// Large outlined button
<Button variant="outline" size="lg">Learn More</Button>

// Small disabled button
<Button size="sm" disabled>Unavailable</Button>

// Full width button
<Button fullWidth>Sign Up</Button>
```

---

### Card

A flexible card container for displaying content.

#### Usage

```tsx
import { Card } from '@/components';

<Card variant="elevated" padding="lg">
  <h3>Card Title</h3>
  <p>Card content goes here</p>
</Card>
```

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| variant | 'default' \| 'elevated' \| 'outlined' | 'default' | Card style variant |
| padding | 'sm' \| 'md' \| 'lg' | 'md' | Internal padding size |
| className | string | '' | Additional CSS classes |
| children | ReactNode | required | Card content |

#### Variants

- **default**: Basic card with subtle border
- **elevated**: Card with shadow and hover effect
- **outlined**: Card with prominent border, no background

#### Examples

```tsx
// Elevated card with large padding
<Card variant="elevated" padding="lg">
  <h2>Project Title</h2>
  <p>Project description...</p>
</Card>

// Outlined card
<Card variant="outlined" padding="sm">
  <span>Tag</span>
</Card>
```

---

## 🏗️ Layout Components

### Layout

The main layout wrapper that includes header, footer, and main content area.

#### Usage

```tsx
import { Layout } from '@/components/Layout';

<Layout>
  <YourPageContent />
</Layout>
```

---

### Header

Sticky header with navigation.

#### Features
- Sticky positioning
- Active link highlighting
- Responsive design
- Logo/brand link
- Navigation menu

#### Customization

Edit `src/components/Layout/Header.tsx` to modify:
- Logo text
- Navigation items
- Styling

---

### Footer

Site footer with links and copyright information.

#### Features
- Social media links
- Contact information
- Copyright notice
- Responsive layout

#### Customization

Edit `src/components/Layout/Footer.tsx` to modify:
- Social links
- Contact information
- Footer content

---

## 🎯 Creating New Components

### Component Structure

```
src/components/NewComponent/
├── NewComponent.tsx      # Component logic
├── NewComponent.css      # Component styles
└── index.ts             # Exports
```

### Template

**NewComponent.tsx**
```tsx
import React from 'react';
import './NewComponent.css';

export interface NewComponentProps {
  // Define props
}

export const NewComponent: React.FC<NewComponentProps> = (props) => {
  return (
    <div className="new-component">
      {/* Component JSX */}
    </div>
  );
};
```

**NewComponent.css**
```css
/* Use CSS variables from the style guide */
.new-component {
  padding: var(--spacing-4);
  color: var(--color-text-primary);
  /* More styles... */
}
```

**index.ts**
```ts
export { NewComponent } from './NewComponent';
export type { NewComponentProps } from './NewComponent';
```

### Best Practices

1. **Use the Style Guide**: Always reference CSS variables and theme values
   ```css
   /* Good */
   color: var(--color-primary-main);
   
   /* Bad */
   color: #2563eb;
   ```

2. **Type Everything**: Full TypeScript types for all props
   ```tsx
   interface ButtonProps {
     variant?: 'primary' | 'secondary';
     onClick?: () => void;
   }
   ```

3. **Compose Components**: Build complex components from simpler ones
   ```tsx
   <Card>
     <h3>Title</h3>
     <Button>Action</Button>
   </Card>
   ```

4. **Accessibility**: Include ARIA attributes and semantic HTML
   ```tsx
   <button aria-label="Close modal" onClick={onClose}>
     ×
   </button>
   ```

5. **Responsive Design**: Use media queries from breakpoints
   ```css
   @media (max-width: 768px) {
     /* Mobile styles */
   }
   ```

---

## 🔄 Component Lifecycle

### Development Checklist

- [ ] Create component files
- [ ] Define TypeScript interfaces
- [ ] Implement component logic
- [ ] Add CSS styles using design tokens
- [ ] Export from index.ts
- [ ] Update src/components/index.ts
- [ ] Add to this documentation
- [ ] Test responsiveness
- [ ] Verify accessibility
- [ ] Check for linting errors

---

## 📚 Additional Resources

- **Style Guide**: `src/styles/README.md`
- **Theme Configuration**: `src/styles/theme.ts`
- **Global Styles**: `src/styles/global.css`
- **React Documentation**: [react.dev](https://react.dev)
- **TypeScript Handbook**: [typescriptlang.org](https://www.typescriptlang.org)

