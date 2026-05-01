import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import Navbar from '../../components/layout/Navbar'
import CategoryHero from './CategoryHero'
import FilterSidebar from './FilterSidebar'
import ProductGrid from './ProductGrid'
import Breadcrumb from './Breadcrumb'

const Categories = () => {
  const [searchParams] = useSearchParams()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [filters, setFilters] = useState({
    category: searchParams.get('category') || '',
    search: searchParams.get('search') || '',
    priceRange: [0, 500000],
    condition: [],
    sortBy: 'relevance',
    rating: 0,
    location: '',
    brands: [],
  })

  useEffect(() => {
    setFilters((prev) => ({
      ...prev,
      category: searchParams.get('category') || '',
      search: searchParams.get('search') || '',
    }))
  }, [searchParams])

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }))
  }

  const handleResetFilters = () => {
    setFilters({
      category: searchParams.get('category') || '',
      search: searchParams.get('search') || '',
      priceRange: [0, 500000],
      condition: [],
      sortBy: 'relevance',
      rating: 0,
      location: '',
      brands: [],
    })
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <Navbar />

      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {/* Category Hero */}
        <CategoryHero filters={filters} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Breadcrumb */}
          <Breadcrumb category={filters.category} />

          <div className="flex gap-8">
            {/* Filter Sidebar */}
            <FilterSidebar
              filters={filters}
              onFilterChange={handleFilterChange}
              onReset={handleResetFilters}
              isOpen={isSidebarOpen}
              onClose={() => setIsSidebarOpen(false)}
            />

            {/* Product Grid */}
            <ProductGrid
              filters={filters}
              onFilterChange={handleFilterChange}
              onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
            />
          </div>
        </div>
      </motion.main>
    </div>
  )
}

export default Categories
