# Getting Started Guide

Welcome to your personal website project! This guide will help you understand the project structure and how to customize it.

## 🎯 Quick Start

### Running the Development Server

```bash
npm run dev
```

Visit `http://localhost:5173` to see your site.

### Building for Production

```bash
npm run build
npm run preview  # Preview the production build
```

## 📂 Project Overview

### Key Directories

- **`src/styles/`**: Your centralized style guide
  - `theme.ts` - All design tokens (colors, spacing, typography)
  - `global.css` - Global styles and CSS variables
  
- **`src/components/`**: Reusable components
  - Each component has its own folder with `.tsx`, `.css`, and `index.ts`
  - All follow the style guide
  
- **`src/pages/`**: Page components
  - `Home/` - Landing page
  - `Library/` - Your library/reading list
  - `Projects/` - Portfolio and achievements

- **`src/components/Layout/`**: Layout components
  - `Header.tsx` - Navigation header
  - `Footer.tsx` - Site footer
  - `Layout.tsx` - Main layout wrapper

## 🎨 Customizing Your Site

### 1. Update Personal Information

**Header (Navigation)**
Edit `src/components/Layout/Header.tsx`:
```tsx
<span className="header__logo-text">Your Name</span>
```

**Footer**
Edit `src/components/Layout/Footer.tsx`:
- Update social media links
- Change email address
- Modify copyright text

### 2. Customize the Home Page

Edit `src/pages/Home/Home.tsx`:
- Change the hero title and subtitle
- Modify the about cards
- Update call-to-action buttons
- Add your own content

### 3. Add Your Projects

Edit `src/pages/Projects/Projects.tsx`:
```tsx
const projects = [
  {
    id: 1,
    title: 'Your Project Name',
    description: 'Project description...',
    tags: ['React', 'TypeScript', 'etc'],
    link: 'https://yourproject.com',
    github: 'https://github.com/you/project',
  },
  // Add more projects...
];
```

### 4. Build Your Library

Edit `src/pages/Library/Library.tsx`:
```tsx
const libraryItems = [
  {
    id: 1,
    title: 'Book Title',
    author: 'Author Name',
    category: 'Technology',
    description: 'Why this book matters...',
  },
  // Add more items...
];
```

### 5. Customize Colors and Styling

**Option A: Edit Theme File**
Edit `src/styles/theme.ts` to change:
- Colors
- Font families
- Spacing
- Border radius
- Shadows

**Option B: Edit CSS Variables**
Edit `src/styles/global.css` to modify CSS variables directly.

### 6. Add New Pages

1. Create a new directory in `src/pages/`:
   ```
   src/pages/NewPage/
   ├── NewPage.tsx
   ├── NewPage.css
   └── index.ts
   ```

2. Add the route in `src/App.tsx`:
   ```tsx
   import { NewPage } from './pages/NewPage';
   
   <Route path="/new-page" element={<NewPage />} />
   ```

3. Add navigation link in `src/components/Layout/Header.tsx`:
   ```tsx
   const navItems = [
     // ...existing items
     { path: '/new-page', label: 'New Page' },
   ];
   ```

## 🎯 Style Guide Usage

### Using Design Tokens in Components

**In TypeScript/TSX:**
```tsx
import { theme } from '@/styles/theme';

const style = {
  color: theme.colors.primary.main,
  padding: theme.spacing[4],
};
```

**In CSS:**
```css
.my-element {
  color: var(--color-primary-main);
  padding: var(--spacing-4);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
}
```

### Common CSS Variables

**Colors:**
- `--color-primary-main`
- `--color-secondary-main`
- `--color-text-primary`
- `--color-bg-primary`

**Spacing:**
- `--spacing-1` through `--spacing-64`

**Typography:**
- `--font-primary`
- `--font-mono`

See `src/styles/global.css` for all available variables.

## 🧩 Available Components

### Button
```tsx
<Button variant="primary" size="md">Click Me</Button>
```
Variants: `primary`, `secondary`, `outline`, `ghost`
Sizes: `sm`, `md`, `lg`

### Card
```tsx
<Card variant="elevated" padding="lg">
  Content here
</Card>
```
Variants: `default`, `elevated`, `outlined`
Padding: `sm`, `md`, `lg`

For detailed component documentation, see `COMPONENTS.md`.

## 📱 Responsive Design

All components are responsive by default. Breakpoints:
- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

Test your site at different screen sizes!

## ♿ Accessibility

The site is built with accessibility in mind:
- Semantic HTML
- ARIA labels where needed
- Keyboard navigation
- Focus indicators
- Color contrast compliance

## 🚀 Deployment

### Netlify / Vercel

1. Push your code to GitHub
2. Connect your repository to Netlify/Vercel
3. Set build command: `npm run build`
4. Set publish directory: `dist`
5. Deploy!

### GitHub Pages

```bash
npm run build
# Deploy the dist/ folder to GitHub Pages
```

## 📝 Next Steps

### Content to Add
- [ ] Update personal information in Header and Footer
- [ ] Add your real projects to the Projects page
- [ ] Populate the Library with your favorite resources
- [ ] Customize the Home page content
- [ ] Add your own images/photos
- [ ] Update meta tags in `index.html` for SEO
- [ ] Add a favicon

### Optional Enhancements
- [ ] Add a blog section
- [ ] Integrate analytics (Google Analytics, Plausible)
- [ ] Add contact form
- [ ] Add dark mode toggle
- [ ] Add animations and transitions
- [ ] Add more components (Modal, Tabs, etc.)
- [ ] Connect to a CMS for content management

## 🆘 Troubleshooting

### Port Already in Use
```bash
# Kill the process on port 5173
lsof -ti:5173 | xargs kill
```

### Linting Errors
```bash
npm run lint
```

### Type Errors
```bash
# Check TypeScript compilation
npx tsc --noEmit
```

### Clear Cache and Reinstall
```bash
rm -rf node_modules package-lock.json
npm install
```

## 📚 Resources

- **React**: [react.dev](https://react.dev)
- **TypeScript**: [typescriptlang.org](https://www.typescriptlang.org)
- **Vite**: [vitejs.dev](https://vitejs.dev)
- **React Router**: [reactrouter.com](https://reactrouter.com)

## 💡 Tips

1. **Use CSS Variables**: They make styling consistent and easy to update
2. **Follow the Component Pattern**: Keep components small and focused
3. **Test Responsiveness**: Always check mobile, tablet, and desktop views
4. **Keep Accessibility in Mind**: Use semantic HTML and ARIA labels
5. **Document Your Changes**: Update this guide as you add features

---

Happy coding! 🚀

