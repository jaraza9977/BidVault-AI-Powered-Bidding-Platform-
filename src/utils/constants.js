export const APP_NAME = 'AI Smart Bazaar';

// LocalStorage Keys
export const TOKEN_KEY = 'ai_bazaar_token';
export const USER_KEY = 'ai_bazaar_user';

export const ROUTES = {
  HOME: '/',
  CATEGORIES: '/categories',
  PRODUCTS: '/products',
  PRODUCT_DETAIL: '/products/:id',
  CART: '/cart',
  WISHLIST: '/wishlist',
  LOGIN: '/login',
  SIGNUP: '/signup',
  PROFILE: '/profile',
};

export const CATEGORIES = [
  {
    id: 'electronics',
    name: 'Electronics',
    slug: 'electronics',
    icon: '💻',
  },
  {
    id: 'jewelery',
    name: 'Jewelery',
    slug: 'jewelery',
    icon: '💎',
  },
  {
    id: "men's clothing",
    name: "Men's Clothing",
    slug: "men's clothing",
    icon: '👔',
  },
  {
    id: "women's clothing",
    name: "Women's Clothing",
    slug: "women's clothing",
    icon: '👗',
  },
];

export const FLASH_SALE_END_TIME = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours from now

export const SORT_OPTIONS = [
  { value: 'default', label: 'Default' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'name-asc', label: 'Name: A to Z' },
  { value: 'name-desc', label: 'Name: Z to A' },
];

export const PRICE_RANGES = [
  { min: 0, max: 50, label: 'Under $50' },
  { min: 50, max: 100, label: '$50 - $100' },
  { min: 100, max: 200, label: '$100 - $200' },
  { min: 200, max: 500, label: '$200 - $500' },
  { min: 500, max: Infinity, label: 'Over $500' },
];
