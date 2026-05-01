import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronDown, ChevronUp, Star } from 'lucide-react'
import Button from '../../components/ui/Button'
import Badge from '../../components/ui/Badge'

const categories = [
  { id: 'electronics', name: 'Electronics', subcategories: ['Laptops', 'Phones', 'Cameras', 'Audio'] },
  { id: 'clothing', name: 'Clothing', subcategories: ['Men', 'Women', 'Kids', 'Accessories'] },
  { id: 'books', name: 'Books', subcategories: ['Fiction', 'Non-Fiction', 'Educational', 'Comics'] },
  { id: 'furniture', name: 'Furniture', subcategories: ['Living Room', 'Bedroom', 'Office', 'Outdoor'] },
  { id: 'mobiles', name: 'Mobile Phones', subcategories: ['Android', 'iPhone', 'Accessories'] },
  { id: 'watches', name: 'Watches', subcategories: ['Smart Watches', 'Analog', 'Digital'] },
  { id: 'sports', name: 'Sports', subcategories: ['Gym', 'Outdoor', 'Team Sports', 'Yoga'] },
  { id: 'beauty', name: 'Beauty', subcategories: ['Makeup', 'Skincare', 'Haircare', 'Fragrance'] },
]

const conditions = ['New', 'Used', 'Refurbished']

const brands = [
  'Apple', 'Samsung', 'Nike', 'Adidas', 'Sony', 'LG', 'HP', 'Dell',
  'Canon', 'Nikon', 'Zara', 'H&M', 'Levi\'s', 'Puma'
]

const cities = [
  'Karachi', 'Lahore', 'Islamabad', 'Rawalpindi', 'Faisalabad',
  'Multan', 'Peshawar', 'Quetta', 'Sialkot', 'Gujranwala'
]

const FilterSidebar = ({ filters, onFilterChange, onReset, isOpen, onClose }) => {
  const [expandedSections, setExpandedSections] = useState({
    categories: true,
    price: true,
    condition: true,
    rating: true,
    location: false,
    brands: false,
  })

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }))
  }

  const handleConditionToggle = (condition) => {
    const newConditions = filters.condition.includes(condition)
      ? filters.condition.filter((c) => c !== condition)
      : [...filters.condition, condition]
    onFilterChange('condition', newConditions)
  }

  const handleBrandToggle = (brand) => {
    const newBrands = filters.brands.includes(brand)
      ? filters.brands.filter((b) => b !== brand)
      : [...filters.brands, brand]
    onFilterChange('brands', newBrands)
  }

  const activeFiltersCount = 
    filters.condition.length +
    filters.brands.length +
    (filters.rating > 0 ? 1 : 0) +
    (filters.location ? 1 : 0)

  const sidebarContent = (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-slate-900 dark:text-slate-50">
            Filters
          </h2>
          {activeFiltersCount > 0 && (
            <Badge variant="primary" className="mt-1">
              {activeFiltersCount} active
            </Badge>
          )}
        </div>
        <button
          onClick={onClose}
          className="lg:hidden text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Categories */}
      <div className="border-b border-slate-200 dark:border-slate-700 pb-6">
        <button
          onClick={() => toggleSection('categories')}
          className="flex items-center justify-between w-full mb-4"
        >
          <h3 className="font-semibold text-slate-900 dark:text-slate-50">
            Categories
          </h3>
          {expandedSections.categories ? (
            <ChevronUp className="w-5 h-5 text-slate-400" />
          ) : (
            <ChevronDown className="w-5 h-5 text-slate-400" />
          )}
        </button>
        <AnimatePresence>
          {expandedSections.categories && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="space-y-2 overflow-hidden"
            >
              {categories.map((cat) => (
                <div key={cat.id}>
                  <button
                    onClick={() => onFilterChange('category', cat.id)}
                    className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                      filters.category === cat.id
                        ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 font-medium'
                        : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    {cat.name}
                  </button>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Price Range */}
      <div className="border-b border-slate-200 dark:border-slate-700 pb-6">
        <button
          onClick={() => toggleSection('price')}
          className="flex items-center justify-between w-full mb-4"
        >
          <h3 className="font-semibold text-slate-900 dark:text-slate-50">
            Price Range
          </h3>
          {expandedSections.price ? (
            <ChevronUp className="w-5 h-5 text-slate-400" />
          ) : (
            <ChevronDown className="w-5 h-5 text-slate-400" />
          )}
        </button>
        <AnimatePresence>
          {expandedSections.price && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="space-y-4 overflow-hidden"
            >
              <div className="flex items-center gap-3">
                <input
                  type="number"
                  placeholder="Min"
                  value={filters.priceRange[0]}
                  onChange={(e) =>
                    onFilterChange('priceRange', [
                      parseInt(e.target.value) || 0,
                      filters.priceRange[1],
                    ])
                  }
                  className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-50"
                />
                <span className="text-slate-400">-</span>
                <input
                  type="number"
                  placeholder="Max"
                  value={filters.priceRange[1]}
                  onChange={(e) =>
                    onFilterChange('priceRange', [
                      filters.priceRange[0],
                      parseInt(e.target.value) || 500000,
                    ])
                  }
                  className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-50"
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Condition */}
      <div className="border-b border-slate-200 dark:border-slate-700 pb-6">
        <button
          onClick={() => toggleSection('condition')}
          className="flex items-center justify-between w-full mb-4"
        >
          <h3 className="font-semibold text-slate-900 dark:text-slate-50">
            Condition
          </h3>
          {expandedSections.condition ? (
            <ChevronUp className="w-5 h-5 text-slate-400" />
          ) : (
            <ChevronDown className="w-5 h-5 text-slate-400" />
          )}
        </button>
        <AnimatePresence>
          {expandedSections.condition && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="space-y-2 overflow-hidden"
            >
              {conditions.map((condition) => (
                <label
                  key={condition}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={filters.condition.includes(condition)}
                    onChange={() => handleConditionToggle(condition)}
                    className="w-4 h-4 text-primary-500 border-slate-300 rounded focus:ring-primary-500"
                  />
                  <span className="text-sm text-slate-600 dark:text-slate-400">
                    {condition}
                  </span>
                </label>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Rating */}
      <div className="border-b border-slate-200 dark:border-slate-700 pb-6">
        <button
          onClick={() => toggleSection('rating')}
          className="flex items-center justify-between w-full mb-4"
        >
          <h3 className="font-semibold text-slate-900 dark:text-slate-50">
            Seller Rating
          </h3>
          {expandedSections.rating ? (
            <ChevronUp className="w-5 h-5 text-slate-400" />
          ) : (
            <ChevronDown className="w-5 h-5 text-slate-400" />
          )}
        </button>
        <AnimatePresence>
          {expandedSections.rating && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="space-y-2 overflow-hidden"
            >
              {[4, 3, 2, 1].map((rating) => (
                <button
                  key={rating}
                  onClick={() => onFilterChange('rating', rating)}
                  className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                    filters.rating === rating
                      ? 'bg-primary-50 dark:bg-primary-900/20'
                      : 'hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < rating
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'text-slate-300 dark:text-slate-600'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-slate-600 dark:text-slate-400">
                    & up
                  </span>
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Location */}
      <div className="border-b border-slate-200 dark:border-slate-700 pb-6">
        <button
          onClick={() => toggleSection('location')}
          className="flex items-center justify-between w-full mb-4"
        >
          <h3 className="font-semibold text-slate-900 dark:text-slate-50">
            Location
          </h3>
          {expandedSections.location ? (
            <ChevronUp className="w-5 h-5 text-slate-400" />
          ) : (
            <ChevronDown className="w-5 h-5 text-slate-400" />
          )}
        </button>
        <AnimatePresence>
          {expandedSections.location && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <select
                value={filters.location}
                onChange={(e) => onFilterChange('location', e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-50"
              >
                <option value="">All Cities</option>
                {cities.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Brands */}
      <div className="pb-6">
        <button
          onClick={() => toggleSection('brands')}
          className="flex items-center justify-between w-full mb-4"
        >
          <h3 className="font-semibold text-slate-900 dark:text-slate-50">
            Brands
          </h3>
          {expandedSections.brands ? (
            <ChevronUp className="w-5 h-5 text-slate-400" />
          ) : (
            <ChevronDown className="w-5 h-5 text-slate-400" />
          )}
        </button>
        <AnimatePresence>
          {expandedSections.brands && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="space-y-2 overflow-hidden max-h-64 overflow-y-auto"
            >
              {brands.map((brand) => (
                <label
                  key={brand}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={filters.brands.includes(brand)}
                    onChange={() => handleBrandToggle(brand)}
                    className="w-4 h-4 text-primary-500 border-slate-300 rounded focus:ring-primary-500"
                  />
                  <span className="text-sm text-slate-600 dark:text-slate-400">
                    {brand}
                  </span>
                </label>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Action Buttons */}
      <div className="space-y-3 pt-4 border-t border-slate-200 dark:border-slate-700">
        <Button onClick={onReset} variant="secondary" className="w-full">
          Reset Filters
        </Button>
        <Button onClick={onClose} className="w-full lg:hidden">
          Apply Filters
        </Button>
      </div>
    </div>
  )

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:block w-80 flex-shrink-0">
        <div className="sticky top-24 bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-soft border border-slate-200 dark:border-slate-700">
          {sidebarContent}
        </div>
      </aside>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              className="lg:hidden fixed inset-0 bg-black/50 z-40"
            />

            {/* Drawer */}
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'tween' }}
              className="lg:hidden fixed left-0 top-0 bottom-0 w-80 bg-white dark:bg-slate-800 z-50 overflow-y-auto p-6"
            >
              {sidebarContent}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

export default FilterSidebar
