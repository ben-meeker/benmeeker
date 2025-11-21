# Project Structure

## 📁 Complete Directory Tree

```
benmeeker/
│
├── 📄 README.md                    # Main project documentation
├── 📄 GETTING_STARTED.md           # Quick start guide
├── 📄 COMPONENTS.md                # Component library docs
├── 📄 PROJECT_STRUCTURE.md         # This file
│
├── 📄 package.json                 # Dependencies and scripts
├── 📄 package-lock.json            # Locked dependency versions
│
├── 📄 tsconfig.json                # TypeScript configuration
├── 📄 tsconfig.app.json            # App-specific TS config
├── 📄 tsconfig.node.json           # Node-specific TS config
│
├── 📄 vite.config.ts               # Vite build configuration
├── 📄 eslint.config.js             # ESLint configuration
│
├── 📄 index.html                   # HTML entry point
│
├── 📁 public/                      # Static assets (served as-is)
│   └── vite.svg
│
├── 📁 node_modules/                # Dependencies (git-ignored)
│
└── 📁 src/                         # Source code
    │
    ├── 📄 main.tsx                 # Application entry point
    ├── 📄 App.tsx                  # Main app component with routing
    │
    ├── 📁 assets/                  # Images, fonts, etc.
    │   └── react.svg
    │
    ├── 📁 styles/                  # 🎨 Centralized Style Guide
    │   ├── 📄 theme.ts            # Design tokens (colors, spacing, etc.)
    │   ├── 📄 global.css          # Global styles & CSS variables
    │   └── 📄 README.md           # Style guide documentation
    │
    ├── 📁 components/              # 🧩 Reusable Components
    │   │
    │   ├── 📄 index.ts            # Component library exports
    │   │
    │   ├── 📁 Button/             # Button component
    │   │   ├── Button.tsx         # Component logic
    │   │   ├── Button.css         # Component styles
    │   │   └── index.ts           # Component exports
    │   │
    │   ├── 📁 Card/               # Card component
    │   │   ├── Card.tsx
    │   │   ├── Card.css
    │   │   └── index.ts
    │   │
    │   └── 📁 Layout/             # Layout components
    │       ├── Layout.tsx         # Main layout wrapper
    │       ├── Layout.css
    │       ├── Header.tsx         # Site header with nav
    │       ├── Header.css
    │       ├── Footer.tsx         # Site footer
    │       ├── Footer.css
    │       └── index.ts
    │
    └── 📁 pages/                   # 📄 Page Components
        │
        ├── 📁 Home/                # Home/Landing page
        │   ├── Home.tsx
        │   ├── Home.css
        │   └── index.ts
        │
        ├── 📁 Library/             # Library page
        │   ├── Library.tsx
        │   ├── Library.css
        │   └── index.ts
        │
        └── 📁 Projects/            # Projects/Portfolio page
            ├── Projects.tsx
            ├── Projects.css
            └── index.ts
```

## 🔑 Key Files Explained

### Configuration Files

| File | Purpose |
|------|---------|
| `package.json` | Project dependencies and npm scripts |
| `tsconfig.json` | TypeScript compiler configuration |
| `vite.config.ts` | Vite bundler configuration (includes path aliases) |
| `eslint.config.js` | ESLint linting rules |

### Core Application Files

| File | Purpose |
|------|---------|
| `index.html` | HTML entry point, includes root div |
| `src/main.tsx` | JavaScript entry point, renders React app |
| `src/App.tsx` | Main app component, sets up routing |

### Style System

| File | Purpose |
|------|---------|
| `src/styles/theme.ts` | Design tokens (colors, spacing, typography, etc.) |
| `src/styles/global.css` | Global styles and CSS variables |
| `src/styles/README.md` | Style guide documentation |

### Components

| Directory | Contains |
|-----------|----------|
| `src/components/Button/` | Reusable button component with variants |
| `src/components/Card/` | Reusable card container component |
| `src/components/Layout/` | Layout components (Header, Footer, Layout wrapper) |

### Pages

| Directory | Route | Description |
|-----------|-------|-------------|
| `src/pages/Home/` | `/` | Landing page with hero and about sections |
| `src/pages/Library/` | `/library` | Library/reading list page |
| `src/pages/Projects/` | `/projects` | Projects and achievements showcase |

## 🔄 Data Flow

```
index.html
    ↓
main.tsx (imports global.css)
    ↓
App.tsx (sets up Router and Routes)
    ↓
Layout (Header + main content + Footer)
    ↓
Page Components (Home, Library, Projects)
    ↓
Reusable Components (Button, Card, etc.)
    ↓
Style Guide (theme.ts + global.css)
```

## 🎨 Styling Architecture

```
theme.ts (TypeScript design tokens)
    ↓
global.css (CSS variables)
    ↓
Component CSS files (use CSS variables)
```

All components reference the centralized style guide for consistency.

## 🧩 Component Pattern

Each component follows this structure:

```
ComponentName/
├── ComponentName.tsx      # Component logic and JSX
├── ComponentName.css      # Component-specific styles
└── index.ts              # Clean exports
```

Benefits:
- **Encapsulation**: All component code in one place
- **Reusability**: Easy to import and use anywhere
- **Maintainability**: Clear structure for updates
- **Scalability**: Simple to add new components

## 📦 Import Aliases

The project uses `@/` as an alias for `src/`:

```typescript
// Instead of:
import { Button } from '../../components/Button';

// You can use:
import { Button } from '@/components';
```

Configured in `vite.config.ts` and `tsconfig.json`.

## 🚀 Build Process

### Development
```
npm run dev
    ↓
Vite dev server starts
    ↓
Hot module replacement (HMR) enabled
    ↓
http://localhost:5173
```

### Production
```
npm run build
    ↓
TypeScript compilation
    ↓
Vite builds optimized bundle
    ↓
Output to dist/ directory
    ↓
npm run preview (optional - preview build)
```

## 🎯 Adding New Features

### New Component
1. Create directory in `src/components/`
2. Add `.tsx`, `.css`, and `index.ts` files
3. Export from `src/components/index.ts`
4. Use in pages

### New Page
1. Create directory in `src/pages/`
2. Add page component files
3. Add route in `src/App.tsx`
4. Update navigation in `src/components/Layout/Header.tsx`

### New Style Token
1. Add to `src/styles/theme.ts`
2. Add CSS variable to `src/styles/global.css`
3. Use in components

## 📊 Dependencies

### Core
- **React 19** - UI library
- **React DOM 19** - React renderer
- **React Router 7** - Client-side routing

### Build Tools
- **Vite 7** - Fast build tool and dev server
- **TypeScript 5** - Type safety
- **@vitejs/plugin-react** - React support for Vite

### Development
- **ESLint** - Code linting
- **TypeScript ESLint** - TS-specific linting rules

## 🔐 Type Safety

The entire project is built with TypeScript for:
- Better developer experience with autocomplete
- Catch errors at compile time
- Self-documenting code with interfaces
- Easier refactoring

All components have proper TypeScript interfaces for their props.

## ♿ Accessibility Features

- Semantic HTML elements
- ARIA labels on interactive elements
- Keyboard navigation support
- Focus indicators
- Color contrast compliance
- Screen reader friendly

## 📱 Responsive Breakpoints

Defined in `src/styles/theme.ts`:

- **Mobile**: < 640px
- **Small**: 640px
- **Medium**: 768px
- **Large**: 1024px
- **Extra Large**: 1280px
- **2X Large**: 1536px

All components are responsive and mobile-first.

---

## 🎓 Learning Path

1. **Start Here**: Read `GETTING_STARTED.md`
2. **Style Guide**: Explore `src/styles/README.md`
3. **Components**: Review `COMPONENTS.md`
4. **Customize**: Edit pages and components
5. **Extend**: Add new features following the patterns

---

For more information, see:
- `README.md` - Project overview
- `GETTING_STARTED.md` - Quick start guide
- `COMPONENTS.md` - Component documentation
- `src/styles/README.md` - Style guide details

