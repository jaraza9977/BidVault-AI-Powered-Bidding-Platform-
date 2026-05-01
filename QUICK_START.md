# 🚀 Quick Start Guide - AI Smart Bazaar

## Prerequisites

Before you begin, make sure you have the following installed:

1. **Node.js** (v18 or higher)
   - Download from: https://nodejs.org/
   - Verify installation: `node --version`

2. **npm** (comes with Node.js)
   - Verify installation: `npm --version`

## Installation Steps

### 1. Install Dependencies

Open your terminal in the project directory and run:

```bash
npm install
```

This will install all required packages including:
- React 18
- React Router v6
- Zustand (state management)
- Tailwind CSS
- Framer Motion
- React Hook Form + Zod
- Axios
- React Query
- And more...

### 2. Start Development Server

```bash
npm run dev
```

The app will start at `http://localhost:5173` (or another port if 5173 is busy).

### 3. Open in Browser

Navigate to the URL shown in your terminal (usually `http://localhost:5173`).

## 🎯 What to Test

### 1. Authentication Flow

#### Signup Page (`/signup`)
- Navigate to: `http://localhost:5173/signup`
- Fill in the form:
  - Full Name: Your Name
  - Email: test@example.com
  - Phone: +923001234567
  - Password: Test@123
  - Confirm Password: Test@123
  - Select role: Buyer or Seller
  - Accept terms
- Click "Create Account"
- You'll be redirected to login

#### Login Page (`/login`)
- Navigate to: `http://localhost:5173/login`
- Use demo credentials:
  - Email: test@example.com
  - Password: Test@123
- Click "Login"
- You'll be redirected to Home page

**Note**: The authentication is currently using mock data. In production, this will connect to a real backend API.

### 2. Home Page (`/`)

After logging in, you'll see:

1. **Hero Carousel**
   - Auto-plays through 3 slides
   - Hover to pause
   - Click arrows to navigate

2. **AI Feature Banner**
   - Animated floating cards
   - "Try AI Size Finder" button

3. **Category Bar**
   - Horizontal scroll through 8 categories
   - Click any category to filter products

4. **Flash Deals**
   - Live countdown timer
   - Horizontal scroll through products
   - Discount badges

5. **New Arrivals**
   - Responsive grid layout
   - "Load More" button

6. **Trending Searches**
   - Click any tag to search

7. **Why AI Smart Bazaar**
   - 4 feature cards with icons

### 3. Categories Page (`/categories`)

Navigate to: `http://localhost:5173/categories`

**Desktop View:**
- Filter sidebar on the left
- Product grid on the right
- Sort dropdown
- Grid/List view toggle

**Mobile View:**
- Click "Filters" button to open drawer
- Swipe or click X to close

**Try These Filters:**
1. Select a category (e.g., "Electronics")
2. Adjust price range
3. Select condition (New/Used)
4. Choose seller rating
5. Select location
6. Pick brands
7. Change sort order

**Active Filters:**
- See active filters as chips below toolbar
- Click X on any chip to remove that filter
- Click "Reset Filters" to clear all

### 4. Dark Mode

- Click the moon/sun icon in the navbar
- Theme preference is saved in localStorage
- Works across all pages

### 5. Responsive Design

Test on different screen sizes:
- Desktop (> 1024px)
- Tablet (640px - 1024px)
- Mobile (< 640px)

**Mobile Features:**
- Hamburger menu in navbar
- Filter drawer in categories
- Touch-friendly buttons
- Horizontal scroll for products

## 🎨 UI Components Showcase

### Navbar Features
- Logo with brand identity
- Search bar (desktop: centered, mobile: below)
- Wishlist icon with badge
- Cart icon with badge
- Notifications bell
- User avatar dropdown
- Dark mode toggle
- Mobile menu

### Product Cards
- Product image
- Title and price
- Seller name
- Condition badge (New/Used)
- Rating stars
- AI Size badge (for clothing)
- Add to cart button
- Wishlist heart icon

## 🔧 Development Tips

### Hot Module Replacement (HMR)
- Changes to code will automatically reload in the browser
- No need to manually refresh

### Tailwind CSS
- All styling uses Tailwind utility classes
- Custom colors defined in `tailwind.config.js`
- Dark mode uses `dark:` prefix

### State Management
- Auth state: `useAuthStore`
- Cart state: `useCartStore`
- Wishlist state: `useWishlistStore`
- Theme state: `useThemeStore`

### Mock Data
- Products: Defined in component files
- Categories: Hardcoded in CategoryBar
- Auth: Mock service in `src/services/authService.js`

## 🐛 Troubleshooting

### Port Already in Use
If port 5173 is busy:
```bash
# Vite will automatically try the next available port
# Check terminal output for the actual URL
```

### Dependencies Not Installing
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and package-lock.json
rm -rf node_modules package-lock.json

# Reinstall
npm install
```

### Dark Mode Not Working
- Check if localStorage is enabled in your browser
- Clear browser cache and reload

### Images Not Loading
- The project uses Unsplash URLs for demo images
- Make sure you have an internet connection

## 📦 Build for Production

When ready to deploy:

```bash
# Create production build
npm run build

# Preview production build locally
npm run preview
```

The build output will be in the `dist` folder.

## 🚀 Deployment

You can deploy the `dist` folder to:

1. **Vercel** (Recommended)
   ```bash
   npm install -g vercel
   vercel
   ```

2. **Netlify**
   - Drag and drop `dist` folder to Netlify

3. **GitHub Pages**
   - Push `dist` folder to `gh-pages` branch

4. **Firebase Hosting**
   ```bash
   npm install -g firebase-tools
   firebase init
   firebase deploy
   ```

## 📝 Next Steps

1. **Connect to Backend API**
   - Update `src/services/api.js` with your API base URL
   - Replace mock data with real API calls

2. **Add More Pages**
   - Product Detail Page
   - Cart Page
   - Checkout Page
   - User Profile

3. **Implement Real Features**
   - Payment gateway integration
   - Real-time notifications
   - Chat with sellers
   - Order tracking

## 💡 Tips for Development

1. **Use React DevTools**
   - Install React DevTools browser extension
   - Inspect component state and props

2. **Use Tailwind CSS IntelliSense**
   - Install VS Code extension for autocomplete

3. **Check Console for Errors**
   - Open browser DevTools (F12)
   - Check Console tab for any errors

4. **Test on Real Devices**
   - Use your phone to test mobile experience
   - Access via local network: `http://YOUR_IP:5173`

## 🎉 You're All Set!

The AI Smart Bazaar frontend is now running. Explore the features, test the UI, and start building your e-commerce platform!

For questions or issues, check:
- `README.md` - Project overview
- `PROJECT_STATUS.md` - Detailed feature list
- Component files - Inline comments and documentation

---

**Happy Coding! 🚀**
