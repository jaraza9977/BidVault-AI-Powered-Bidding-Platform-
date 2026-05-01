import { motion } from 'framer-motion'
import { TrendingUp, Search } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const trendingSearches = [
  'iPhone 14',
  'Nike Shoes',
  'Gaming Laptop',
  'Wireless Earbuds',
  'Smart Watch',
  'Winter Jacket',
  'PlayStation 5',
  'Camera',
  'Furniture',
  'Books',
  'Gym Equipment',
  'Makeup',
]

const TrendingSearches = () => {
  const navigate = useNavigate()

  const handleSearchClick = (query) => {
    navigate(`/categories?search=${encodeURIComponent(query)}`)
  }

  return (
    <section className="py-12 bg-slate-50 dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-12 bg-gradient-to-br from-accent-500 to-accent-600 rounded-2xl flex items-center justify-center">
            <TrendingUp className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-slate-50">
              Trending Searches
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              What others are looking for
            </p>
          </div>
        </div>

        {/* Tag Cloud */}
        <div className="flex flex-wrap gap-3">
          {trendingSearches.map((search, index) => (
            <motion.button
              key={search}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              onClick={() => handleSearchClick(search)}
              className="group flex items-center gap-2 px-4 py-2.5 bg-white dark:bg-slate-800 hover:bg-primary-50 dark:hover:bg-primary-900/20 border border-slate-200 dark:border-slate-700 hover:border-primary-300 dark:hover:border-primary-700 rounded-full transition-all shadow-sm hover:shadow-md"
            >
              <Search className="w-4 h-4 text-slate-400 group-hover:text-primary-500 transition-colors" />
              <span className="text-sm font-medium text-slate-700 dark:text-slate-300 group-hover:text-primary-600 dark:group-hover:text-primary-400">
                {search}
              </span>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  )
}

export default TrendingSearches
