# 📁 AI Smart Bazaar - Complete File Structure

```
ai-smart-bazaar/
│
├── 📄 index.html                      # Main HTML entry point
├── 📄 package.json                    # Dependencies and scripts
├── 📄 vite.config.js                  # Vite configuration
├── 📄 tailwind.config.js              # Tailwind CSS configuration
├── 📄 postcss.config.js               # PostCSS configuration
├── 📄 .eslintrc.cjs                   # ESLint configuration
├── 📄 .gitignore                      # Git ignore rules
│
├── 📄 README.md                       # Project overview
├── 📄 PROJECT_STATUS.md               # Detailed feature checklist
├── 📄 QUICK_START.md                  # Quick start guide
├── 📄 COMPLETION_SUMMARY.md           # Completion summary
├── 📄 FILE_STRUCTURE.md               # This file
│
├── 📁 .vscode/                        # VS Code settings
│
└── 📁 src/                            # Source code
    │
    ├── 📄 main.jsx                    # App entry point with providers
    ├── 📄 App.jsx                     # Root component
    ├── 📄 index.css                   # Global styles and Tailwind
    │
    ├── 📁 assets/                     # Static assets (images, logos)
    │
    ├── 📁 components/                 # React components
    │   │
    │   ├── 📁 ui/                     # Reusable UI components
    │   │   ├── 📄 Badge.jsx           # Badge component (variants)
    │   │   ├── 📄 Button.jsx          # Button component (loading, variants)
    │   │   ├── 📄 Card.jsx            # Card component (hover effects)
    │   │   ├── 📄 Input.jsx           # Input component (label, error)
    │   │   ├── 📄 Modal.jsx           # Modal component (backdrop, animations)
    │   │   └── 📄 Skeleton.jsx        # Skeleton loader (shimmer)
    │   │
    │   ├── 📁 layout/                 # Layout components
    │   │   ├── 📄 Navbar.jsx          # Navigation bar (sticky, responsive)
    │   │   └── 📄 Footer.jsx          # Footer (links, social)
    │   │
    │   └── 📁 shared/                 # Shared components
    │       ├── 📄 CategoryCard.jsx    # Category card (icon, hover)
    │       ├── 📄 LoadingSpinner.jsx  # Loading spinner (full screen option)
    │       ├── 📄 ProductCard.jsx     # Product card (comprehensive)
    │       └── 📄 SearchBar.jsx       # Search bar (filters, voice)
    │
    ├── 📁 pages/                      # Page components
    │   │
    │   ├── 📁 Auth/                   # Authentication pages
    │   │   ├── 📄 Login.jsx           # Login page (glassmorphism)
    │   │   └── 📄 Signup.jsx          # Signup page (split-screen)
    │   │
    │   ├── 📁 Home/                   # Home page sections
    │   │   ├── 📄 Home.jsx            # Home page container
    │   │   ├── 📄 HeroSection.jsx     # Hero carousel (3 slides)
    │   │   ├── 📄 AIFeatureBanner.jsx # AI feature spotlight
    │   │   ├── 📄 CategoryBar.jsx     # Category quick access
    │   │   ├── 📄 FlashDeals.jsx      # Flash deals with countdown
    │   │   ├── 📄 NewArrivals.jsx     # New arrivals grid
    │   │   ├── 📄 TrendingSearches.jsx# Trending searches tags
    │   │   └── 📄 WhyAIBazaar.jsx     # Why choose us section
    │   │
    │   └── 📁 Categories/             # Categories page sections
    │       ├── 📄 Categories.jsx      # Categories page container
    │       ├── 📄 CategoryHero.jsx    # Category hero banner
    │       ├── 📄 Breadcrumb.jsx      # Breadcrumb navigation
    │       ├── 📄 FilterSidebar.jsx   # Filter sidebar/drawer
    │       └── 📄 ProductGrid.jsx     # Product grid with toolbar
    │
    ├── 📁 hooks/                      # Custom React hooks
    │   ├── 📄 useCountdown.js         # Countdown timer hook
    │   └── 📄 useDebounce.js          # Debounce hook
    │
    ├── 📁 store/                      # Zustand state stores
    │   ├── 📄 authStore.js            # Authentication state
    │   ├── 📄 cartStore.js            # Shopping cart state
    │   ├── 📄 wishlistStore.js        # Wishlist state
    │   └── 📄 themeStore.js           # Theme (dark mode) state
    │
    ├── 📁 services/                   # API services
    │   ├── 📄 api.js                  # Axios instance with interceptors
    │   ├── 📄 authService.js          # Authentication API calls
    │   └── 📄 productService.js       # Product API calls
    │
    ├── 📁 utils/                      # Utility functions
    │   ├── 📄 cn.js                   # Class name utility (clsx + tailwind-merge)
    │   ├── 📄 constants.js            # App constants
    │   ├── 📄 formatters.js           # Formatting utilities (price, date, etc.)
    │   └── 📄 validators.js           # Zod validation schemas
    │
    └── 📁 routes/                     # Routing configuration
        └── 📄 AppRoutes.jsx           # Route definitions (protected, public)
```

## 📊 File Count by Category

### Pages (4 main pages)
- **Auth**: 2 files (Login, Signup)
- **Home**: 7 files (Home + 6 sections)
- **Categories**: 5 files (Categories + 4 sections)

### Components (20 components)
- **UI**: 6 files (Badge, Button, Card, Input, Modal, Skeleton)
- **Layout**: 2 files (Navbar, Footer)
- **Shared**: 4 files (CategoryCard, LoadingSpinner, ProductCard, SearchBar)

### State & Logic (15 files)
- **Hooks**: 2 files (useCountdown, useDebounce)
- **Store**: 4 files (auth, cart, wishlist, theme)
- **Services**: 3 files (api, authService, productService)
- **Utils**: 4 files (cn, constants, formatters, validators)
- **Routes**: 1 file (AppRoutes)

### Configuration (7 files)
- **Build**: vite.config.js, package.json
- **Styling**: tailwind.config.js, postcss.config.js, index.css
- **Linting**: .eslintrc.cjs
- **Entry**: index.html, main.jsx, App.jsx

### Documentation (5 files)
- README.md
- PROJECT_STATUS.md
- QUICK_START.md
- COMPLETION_SUMMARY.md
- FILE_STRUCTURE.md

## 📈 Total Files: 50+

---

## 🎯 Key File Descriptions

### Entry Points
- **index.html**: HTML template with root div
- **main.jsx**: React root with providers (Router, Query, Toast)
- **App.jsx**: Root component with auth initialization

### Core Pages
- **Login.jsx**: Authentication with rate limiting, forgot password
- **Signup.jsx**: Registration with role selection, password strength
- **Home.jsx**: Landing page with 7 sections
- **Categories.jsx**: Product browsing with filters

### State Management
- **authStore.js**: User auth, login attempts, cooldown
- **cartStore.js**: Cart items, add/remove, count
- **wishlistStore.js**: Wishlist items, toggle
- **themeStore.js**: Dark mode toggle, persistence

### Services
- **api.js**: Axios instance, interceptors, error handling
- **authService.js**: Login, signup, forgot password, OAuth
- **productService.js**: Get products, search, filter

### Utilities
- **formatters.js**: Price (PKR), date, phone, initials
- **validators.js**: Zod schemas for forms
- **constants.js**: App-wide constants
- **cn.js**: Tailwind class merging

### Styling
- **index.css**: Global styles, Tailwind layers, custom classes
- **tailwind.config.js**: Theme, colors, shadows, fonts

---

## 🔍 File Relationships

```
main.jsx
  └── App.jsx
      └── AppRoutes.jsx
          ├── PublicRoute
          │   ├── Login.jsx
          │   └── Signup.jsx
          └── ProtectedRoute
              ├── Home.jsx
              │   ├── Navbar.jsx
              │   ├── HeroSection.jsx
              │   ├── AIFeatureBanner.jsx
              │   ├── CategoryBar.jsx
              │   ├── FlashDeals.jsx
              │   ├── NewArrivals.jsx
              │   ├── TrendingSearches.jsx
              │   ├── WhyAIBazaar.jsx
              │   └── Footer.jsx
              └── Categories.jsx
                  ├── Navbar.jsx
                  ├── CategoryHero.jsx
                  ├── Breadcrumb.jsx
                  ├── FilterSidebar.jsx
                  ├── ProductGrid.jsx
                  └── Footer.jsx
```

---

## 🎨 Component Dependencies

### UI Components (Used Everywhere)
- Button → Used in all forms, CTAs
- Input → Used in Login, Signup, Filters
- Card → Used in ProductCard, CategoryCard
- Badge → Used in ProductCard, Filters
- Modal → Used in Login (forgot password)
- Skeleton → Used in ProductGrid loading

### Shared Components
- ProductCard → Used in FlashDeals, NewArrivals, ProductGrid
- CategoryCard → Used in CategoryBar
- SearchBar → Used in Navbar
- LoadingSpinner → Used in AppRoutes, async operations

### Layout Components
- Navbar → Used in Home, Categories
- Footer → Used in Home, Categories

---

## 📦 Dependencies Flow

```
package.json
  ├── React 18 (core)
  ├── React Router v6 (routing)
  ├── Zustand (state)
  ├── Tailwind CSS (styling)
  ├── Framer Motion (animations)
  ├── React Hook Form (forms)
  ├── Zod (validation)
  ├── Axios (HTTP)
  ├── React Query (data fetching)
  ├── Lucide React (icons)
  └── React Hot Toast (notifications)
```

---

## 🚀 Build Output

```
dist/
  ├── index.html
  ├── assets/
  │   ├── index-[hash].js
  │   ├── index-[hash].css
  │   └── [images]
  └── [other static files]
```

---

This structure follows React best practices with:
- ✅ Clear separation of concerns
- ✅ Reusable components
- ✅ Centralized state management
- ✅ Service layer for API calls
- ✅ Utility functions for common tasks
- ✅ Lazy loading for performance
- ✅ Modular and maintainable code

---

*Last Updated: Project Completion*
