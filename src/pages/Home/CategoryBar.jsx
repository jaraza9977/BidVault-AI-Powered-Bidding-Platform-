import { useRef } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { 
  Smartphone, 
  Shirt, 
  Book, 
  Sofa, 
  Laptop, 
  Watch,
  Dumbbell,
  Sparkles,
  ChevronRight
} from 'lucide-react'

const categories = [
  { id: 'electronics', name: 'Electronics', icon: Laptop, color: 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400' },
  { id: 'clothing', name: 'Clothing', icon: Shirt, color: 'bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400' },
  { id: 'books', name: 'Books', icon: Book, color: 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400' },
  { id: 'furniture', name: 'Furniture', icon: Sofa, color: 'bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400' },
  { id: 'mobiles', name: 'Mobile Phones', icon: Smartphone, color: 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400' },
  { id: 'watches', name: 'Watches', icon: Watch, color: 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400' },
  { id: 'sports', name: 'Sports', icon: Dumbbell, color: 'bg-teal-100 text-teal-600 dark:bg-teal-900/30 dark:text-teal-400' },
  { id: 'beauty', name: 'Beauty', icon: Sparkles, color: 'bg-pink-100 text-pink-600 dark:bg-pink-900/30 dark:text-pink-400' },
]

const CategoryBar = () => {
  const scrollRef = useRef(null)
  const navigate = useNavigate()

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 300
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      })
    }
  }

  const handleCategoryClick = (categoryId) => {
    navigate(`/categories?category=${categoryId}`)
  }

  return (
    <section className="py-8 bg-white dark:bg-slate-800 border-y border-slate-200 dark:border-slate-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-50">
            Shop by Category
          </h2>
          <button
            onClick={() => navigate('/categories')}
            className="text-primary-500 hover:text-primary-600 font-medium flex items-center gap-1 text-sm"
          >
            View All
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="relative group">
          {/* Scroll Left Button */}
          <button
            onClick={() => scroll('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white dark:bg-slate-800 shadow-lg rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
            aria-label="Scroll left"
          >
            <ChevronRight className="w-5 h-5 rotate-180 text-slate-600 dark:text-slate-400" />
          </button>

          {/* Categories */}
          <div
            ref={scrollRef}
            className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {categories.map((category, index) => {
              const Icon = category.icon
              return (
                <motion.button
                  key={category.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => handleCategoryClick(category.id)}
                  className="flex-shrink-0 group/item"
                >
                  <div className="flex flex-col items-center gap-3 p-4 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors min-w-[120px]">
                    <div className={`w-16 h-16 ${category.color} rounded-2xl flex items-center justify-center group-hover/item:scale-110 transition-transform`}>
                      <Icon className="w-8 h-8" />
                    </div>
                    <span className="text-sm font-medium text-slate-700 dark:text-slate-300 text-center">
                      {category.name}
                    </span>
                  </div>
                </motion.button>
              )
            })}
          </div>

          {/* Scroll Right Button */}
          <button
            onClick={() => scroll('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white dark:bg-slate-800 shadow-lg rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-5 h-5 text-slate-600 dark:text-slate-400" />
          </button>
        </div>
      </div>
    </section>
  )
}

export default CategoryBar
