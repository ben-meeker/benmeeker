# Ben Meeker - Personal Website

A modern, responsive personal website built with React, TypeScript, and Vite. This site serves as a portfolio, resume, and personal library.

## 🚀 Features

- **Modern Tech Stack**: Built with React 19, TypeScript, and Vite for fast development and optimal performance
- **Centralized Style Guide**: Comprehensive design system with consistent theming across all components
- **Light & Dark Mode**: Full theme switching support with system preference detection
- **Mobile-First Responsive Design**: Optimized for mobile devices first, then enhanced for tablets and desktops
- **Type-Safe**: Full TypeScript support for better development experience and fewer bugs
- **Component Library**: Reusable components following the style guide
- **Tested**: Vitest setup with example tests and coverage reporting
- **Three Main Sections**:
  - **Home**: Landing page with introduction and call-to-actions
  - **Library**: Curated collection of books and resources
  - **Projects**: Showcase of work and achievements

## 📁 Project Structure

```
benmeeker/
├── public/                 # Static assets
├── src/
│   ├── components/        # Reusable components
│   │   ├── Button/       # Button component
│   │   ├── Card/         # Card component
│   │   ├── Layout/       # Layout components (Header, Footer, Layout)
│   │   └── index.ts      # Component exports
│   ├── pages/            # Page components
│   │   ├── Home/         # Home page
│   │   ├── Library/      # Library page
│   │   └── Projects/     # Projects page
│   ├── styles/           # Centralized styles
│   │   ├── theme.ts      # Design tokens and theme configuration
│   │   ├── global.css    # Global styles and CSS variables
│   │   └── README.md     # Style guide documentation
│   ├── App.tsx           # Main app component with routing
│   └── main.tsx          # Application entry point
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

## 🎨 Style Guide

The project uses a centralized style guide located in `src/styles/`. All components reference these design tokens for consistency.

### Key Features:
- **Colors**: Primary, secondary, neutral, and semantic colors
- **Typography**: Font families, sizes, weights, and spacing
- **Spacing**: 4px-based spacing scale
- **Components**: Pre-styled, reusable components
- **Responsive**: Built-in breakpoints for all screen sizes
- **Accessibility**: WCAG 2.1 AA compliance

See `src/styles/README.md` for detailed documentation.

## 📱 Mobile-First Responsive Design

All styles are written mobile-first using `min-width` media queries:
- **Base styles**: Mobile phones (320px+)
- **768px+**: Tablets and larger
- **1024px+**: Desktops and larger

This ensures optimal performance on mobile devices and progressive enhancement for larger screens. See `MOBILE_FIRST.md` for detailed guidelines.

## 🌗 Light & Dark Mode

Full theme switching support with three modes:
- **Light Mode**: Clean, bright interface
- **Dark Mode**: Eye-friendly dark interface
- **System Mode**: Automatically follows OS preference (default)

The theme preference is persisted in localStorage and smoothly animated. See `DARK_MODE.md` for complete documentation on:
- Using the `useTheme()` hook
- Customizing colors for both modes
- Testing components with themes
- Best practices for theme-aware styling

## 🛠️ Tech Stack

- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **React Router** - Client-side routing
- **CSS3** - Styling with CSS Variables

## 📦 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/benmeeker/benmeeker.git
cd benmeeker
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and visit `http://localhost:5173`

## 🔨 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🏗️ Building for Production

```bash
npm run build
```

The built files will be in the `dist/` directory.

## 📝 Adding New Components

When creating new components, follow these guidelines:

1. Create a new directory in `src/components/`
2. Include the component file (`.tsx`), styles (`.css`), and index (`.ts`)
3. Reference the style guide from `src/styles/theme.ts`
4. Export the component from `src/components/index.ts`

Example structure:
```
src/components/NewComponent/
├── NewComponent.tsx
├── NewComponent.css
└── index.ts
```

## 🎯 Creating New Pages

1. Create a new directory in `src/pages/`
2. Follow the same structure as components
3. Add the route in `src/App.tsx`
4. Update navigation in `src/components/Layout/Header.tsx`

## 🔧 Configuration

### Path Aliases

The project uses `@/` as an alias for the `src/` directory:

```typescript
import { Button } from '@/components';
import { theme } from '@/styles/theme';
```

### TypeScript Configuration

TypeScript is configured with strict mode and path aliases. See `tsconfig.json` for details.

## 🤝 Contributing

This is a personal website, but suggestions and feedback are welcome!

## 📄 License

MIT License - feel free to use this as a template for your own website.

## 📧 Contact

- Email: contact@benmeeker.com
- GitHub: [@benmeeker](https://github.com/benmeeker)
- LinkedIn: [Ben Meeker](https://linkedin.com/in/benmeeker)

---

Built with ❤️ using React, TypeScript, and Vite
