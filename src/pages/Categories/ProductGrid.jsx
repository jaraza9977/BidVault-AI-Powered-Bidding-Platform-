import { useState } from 'react'
import { motion } from 'framer-motion'
import { Grid3x3, List, SlidersHorizontal, X } from 'lucide-react'
import ProductCard from '../../components/shared/ProductCard'
import Button from '../../components/ui/Button'
import Badge from '../../components/ui/Badge'
import Skeleton from '../../components/ui/Skeleton'

// Mock products data
const allProducts = [
  {
    id: 21,
    title: 'iPhone 14 Pro',
    price: 269999,
    image: 'https://images.unsplash.com/photo-1678652197831-2d180705cd2c?w=400&q=80',
    seller: 'TechHub',
    condition: 'New',
    rating: 4.8,
    reviews: 234,
    location: 'Karachi',
  },
  {
    id: 22,
    title: 'Nike Air Jordan',
    price: 16999,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80',
    seller: 'SportsZone',
    condition: 'New',
    rating: 4.6,
    reviews: 156,
    hasAISize: true,
    location: 'Lahore',
  },
  {
    id: 23,
    title: 'MacBook Air M2',
    price: 229999,
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&q=80',
    seller: 'AppleStore',
    condition: 'New',
    rating: 4.9,
    reviews: 312,
    location: 'Islamabad',
  },
  {
    id: 24,
    title: 'Sony WH-1000XM5',
    price: 45999,
    image: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=400&q=80',
    seller: 'AudioPro',
    condition: 'New',
    rating: 4.7,
    reviews: 89,
    location: 'Karachi',
  },
  {
    id: 25,
    title: 'Zara Denim Jacket',
    price: 6999,
    image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&q=80',
    seller: 'FashionHub',
    condition: 'Used',
    rating: 4.5,
    reviews: 78,
    hasAISize: true,
    location: 'Lahore',
  },
  {
    id: 26,
    title: 'Samsung Galaxy S23',
    price: 189999,
    image: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=400&q=80',
    seller: 'MobileMart',
    condition: 'New',
    rating: 4.6,
    reviews: 145,
    location: 'Rawalpindi',
  },
  {
    id: 27,
    title: 'Adidas Ultraboost',
    price: 14999,
    image: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=400&q=80',
    seller: 'SportsWorld',
    condition: 'New',
    rating: 4.7,
    reviews: 201,
    hasAISize: true,
    location: 'Faisalabad',
  },
  {
    id: 28,
    title: 'Canon EOS R6',
    price: 279999,
    image: 'https://images.unsplash.com/photo-1606980707986-e660e4904d9f?w=400&q=80',
    seller: 'PhotoPro',
    condition: 'New',
    rating: 4.8,
    reviews: 67,
    location: 'Karachi',
  },
]

const sortOptions = [
  { value: 'relevance', label: 'Relevance' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
  { value: 'newest', label: 'Newest First' },
  { value: 'popular', label: 'Most Popular' },
]

const ProductGrid = ({ filters, onFilterChange, onToggleSidebar }) => {
  const [viewMode, setViewMode] = useState('grid') // 'grid' | 'list'
  const [isLoading, setIsLoading] = useState(false)

  // Filter products based on filters
  const filteredProducts = allProducts.filter((product) => {
    // Price filter
    if (
      product.price < filters.priceRange[0] ||
      product.price > filters.priceRange[1]
    ) {
      return false
    }

    // Condition filter
    if (
      filters.condition.length > 0 &&
      !filters.condition.includes(product.condition)
    ) {
      return false
    }

    // Rating filter
    if (filters.rating > 0 && product.rating < filters.rating) {
      return false
    }

    // Location filter
    if (filters.location && product.location !== filters.location) {
      return false
    }

    return true
  })

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (filters.sortBy) {
      case 'price-low':
        return a.price - b.price
      case 'price-high':
        return b.price - a.price
      case 'newest':
        return b.id - a.id
      case 'popular':
        return b.reviews - a.reviews
      default:
        return 0
    }
  })

  const handleRemoveFilter = (key, value) => {
    if (key === 'condition' || key === 'brands') {
      onFilterChange(
        key,
        filters[key].filter((item) => item !== value)
      )
    } else if (key === 'rating' || key === 'location') {
      onFilterChange(key, key === 'rating' ? 0 : '')
    }
  }

  const activeFilters = [
    ...filters.condition.map((c) => ({ key: 'condition', value: c, label: c })),
    ...filters.brands.map((b) => ({ key: 'brands', value: b, label: b })),
    ...(filters.rating > 0
      ? [{ key: 'rating', value: filters.rating, label: `${filters.rating}+ Stars` }]
      : []),
    ...(filters.location
      ? [{ key: 'location', value: filters.location, label: filters.location }]
      : []),
  ]

  return (
    <div className="flex-1">
      {/* Toolbar */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl p-4 mb-6 shadow-soft border border-slate-200 dark:border-slate-700">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          {/* Left Side */}
          <div className="flex items-center gap-4">
            {/* Mobile Filter Button */}
            <button
              onClick={onToggleSidebar}
              className="lg:hidden flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-700 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
            >
              <SlidersHorizontal className="w-5 h-5" />
              <span className="text-sm font-medium">Filters</span>
            </button>

            {/* Results Count */}
            <p className="text-sm text-slate-600 dark:text-slate-400">
              <span className="font-semibold text-slate-900 dark:text-slate-50">
                {sortedProducts.length}
              </span>{' '}
              products found
            </p>
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-4">
            {/* Sort Dropdown */}
            <select
              value={filters.sortBy}
              onChange={(e) => onFilterChange('sortBy', e.target.value)}
              className="px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-sm text-slate-900 dark:text-slate-50"
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>

            {/* View Toggle */}
            <div className="hidden sm:flex items-center gap-2 bg-slate-100 dark:bg-slate-700 rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded transition-colors ${
                  viewMode === 'grid'
                    ? 'bg-white dark:bg-slate-800 shadow-sm'
                    : 'hover:bg-slate-200 dark:hover:bg-slate-600'
                }`}
                aria-label="Grid view"
              >
                <Grid3x3 className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded transition-colors ${
                  viewMode === 'list'
                    ? 'bg-white dark:bg-slate-800 shadow-sm'
                    : 'hover:bg-slate-200 dark:hover:bg-slate-600'
                }`}
                aria-label="List view"
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Active Filters */}
        {activeFilters.length > 0 && (
          <div className="flex flex-wrap items-center gap-2 mt-4 pt-4 border-t border-slate-200 dark:border-slate-700">
            <span className="text-sm text-slate-600 dark:text-slate-400">
              Active filters:
            </span>
            {activeFilters.map((filter, index) => (
              <Badge
                key={`${filter.key}-${filter.value}-${index}`}
                variant="secondary"
                className="flex items-center gap-1"
              >
                {filter.label}
                <button
                  onClick={() => handleRemoveFilter(filter.key, filter.value)}
                  className="hover:text-red-500"
                >
                  <X className="w-3 h-3" />
                </button>
              </Badge>
            ))}
          </div>
        )}
      </div>

      {/* Products */}
      {isLoading ? (
        <div
          className={
            viewMode === 'grid'
              ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'
              : 'space-y-4'
          }
        >
          {[...Array(6)].map((_, i) => (
            <Skeleton key={i} className="h-96 rounded-2xl" />
          ))}
        </div>
      ) : sortedProducts.length === 0 ? (
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-12 text-center shadow-soft border border-slate-200 dark:border-slate-700">
          <div className="w-24 h-24 bg-slate-100 dark:bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-4">
            <Grid3x3 className="w-12 h-12 text-slate-400" />
          </div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-slate-50 mb-2">
            No products found
          </h3>
          <p className="text-slate-600 dark:text-slate-400 mb-6">
            Try adjusting your filters or search criteria
          </p>
          <Button onClick={() => onFilterChange('sortBy', 'relevance')}>
            Clear All Filters
          </Button>
        </div>
      ) : (
        <div
          className={
            viewMode === 'grid'
              ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'
              : 'space-y-4'
          }
        >
          {sortedProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <ProductCard product={product} viewMode={viewMode} />
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}

export default ProductGrid
