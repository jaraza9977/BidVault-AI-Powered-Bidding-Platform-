# AI Smart Bazaar - Frontend

A modern, fully responsive multi-vendor AI-powered e-commerce platform targeting the Pakistani market.

## 🚀 Features

- **AI Size Recommendation** - Smart sizing for clothing items
- **Multi-Vendor Marketplace** - Buy and sell new and used products
- **Advanced Search & Filters** - Find exactly what you need
- **Dark Mode** - Eye-friendly interface
- **Responsive Design** - Works on all devices
- **PWA Ready** - Install as an app

## 🛠️ Tech Stack

- **React 18+** with Vite
- **React Router v6** for routing
- **Zustand** for state management
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **React Hook Form + Zod** for forms
- **Axios** for API calls
- **React Query** for server state
- **Lucide React** for icons

## 📦 Installation

1. Install Node.js (v18 or higher) from [nodejs.org](https://nodejs.org/)

2. Install dependencies:
```bash
npm install
```

3. Start development server:
```bash
npm run dev
```

4. Build for production:
```bash
npm run build
```

## 📁 Project Structure

```
src/
├── assets/           # Images, logos, illustrations
├── components/
│   ├── ui/          # Reusable UI components
│   ├── layout/      # Navbar, Footer, Sidebar
│   └── shared/      # ProductCard, CategoryCard, etc.
├── pages/
│   ├── Auth/        # Login, Signup
│   ├── Home/        # Home page
│   └── Categories/  # Categories pages
├── hooks/           # Custom React hooks
├── store/           # Zustand stores
├── services/        # API services
├── utils/           # Utilities and constants
└── routes/          # Route configuration

```

## 🎨 Brand Colors

- **Primary**: Deep Teal (#0D9488)
- **Accent**: Amber (#F59E0B)
- **Background Light**: #F8FAFC
- **Background Dark**: #0F172A

## 📄 Pages

### ✅ Completed Pages

1. **Signup** (`/signup`) - User registration with role selection
   - Split-screen layout with animated illustration
   - Real-time password strength indicator
   - Role selector (Buyer/Seller)
   - Profile picture upload
   - Google OAuth integration (UI)
   - Form validation with Zod

2. **Login** (`/login`) - User authentication
   - Glassmorphism card design
   - Remember me functionality
   - Forgot password modal with OTP flow
   - Rate limiting with cooldown timer
   - Google OAuth integration (UI)
   - Demo credentials display

3. **Home** (`/`) - Main landing page
   - Sticky navbar with scroll effects
   - Auto-playing hero carousel (3 slides)
   - AI Feature Spotlight banner
   - Category quick-access bar (horizontal scroll)
   - Flash Deals section with countdown timer
   - New Arrivals grid with infinite scroll
   - Trending Searches tag cloud
   - Why AI Smart Bazaar feature cards
   - Responsive footer

4. **Categories** (`/categories`) - Product browsing with advanced filters
   - Dynamic category hero banners
   - Collapsible filter sidebar (desktop) / drawer (mobile)
   - Multi-level category tree
   - Price range slider
   - Condition filters (New/Used/Refurbished)
   - Seller rating filter
   - Location filter (Pakistani cities)
   - Brand multi-select
   - Sort options (Relevance, Price, Newest, Popular)
   - Grid/List view toggle
   - Active filter chips with remove option
   - Empty state with illustrations
   - Breadcrumb navigation

## 🔐 Authentication

The app uses JWT tokens stored in Zustand + localStorage. Protected routes redirect unauthenticated users to login.

## 🌙 Dark Mode

Toggle dark mode from the navbar. Preference is persisted in localStorage.

## 📱 Responsive Design

Mobile-first approach with breakpoints:
- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

## 🚀 Deployment

Build the project and deploy the `dist` folder to any static hosting service:
- Vercel
- Netlify
- GitHub Pages
- Firebase Hosting

## 📝 License

MIT License - feel free to use this project for learning or commercial purposes.
