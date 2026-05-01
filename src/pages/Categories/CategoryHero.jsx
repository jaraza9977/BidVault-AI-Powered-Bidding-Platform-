import { motion } from 'framer-motion'
import { Package } from 'lucide-react'

const categoryInfo = {
  electronics: {
    name: 'Electronics',
    description: 'Latest gadgets and tech products',
    image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=1200&q=80',
    count: '12,450',
  },
  clothing: {
    name: 'Clothing',
    description: 'Fashion for every style',
    image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=1200&q=80',
    count: '8,320',
  },
  books: {
    name: 'Books',
    description: 'Knowledge at your fingertips',
    image: 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=1200&q=80',
    count: '5,670',
  },
  furniture: {
    name: 'Furniture',
    description: 'Transform your living space',
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1200&q=80',
    count: '3,240',
  },
  mobiles: {
    name: 'Mobile Phones',
    description: 'Stay connected with the latest phones',
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=1200&q=80',
    count: '6,890',
  },
  watches: {
    name: 'Watches',
    description: 'Timeless elegance',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=1200&q=80',
    count: '2,150',
  },
  sports: {
    name: 'Sports',
    description: 'Gear up for your fitness journey',
    image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=1200&q=80',
    count: '4,560',
  },
  beauty: {
    name: 'Beauty',
    description: 'Look and feel your best',
    image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=1200&q=80',
    count: '3,780',
  },
}

const CategoryHero = ({ filters }) => {
  const category = categoryInfo[filters.category]

  if (!category && !filters.search) {
    return (
      <div className="bg-gradient-to-r from-primary-600 to-primary-800 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center text-white"
          >
            <Package className="w-16 h-16 mx-auto mb-4" />
            <h1 className="text-4xl font-bold mb-2">All Categories</h1>
            <p className="text-lg text-white/90">Browse thousands of products</p>
          </motion.div>
        </div>
      </div>
    )
  }

  if (filters.search) {
    return (
      <div className="bg-gradient-to-r from-primary-600 to-primary-800 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center text-white"
          >
            <h1 className="text-4xl font-bold mb-2">
              Search Results for "{filters.search}"
            </h1>
            <p className="text-lg text-white/90">
              Showing products matching your search
            </p>
          </motion.div>
        </div>
      </div>
    )
  }

  return (
    <div className="relative h-64 overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${category.image})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-primary-900/90 to-primary-800/80" />
      </div>

      {/* Content */}
      <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-white"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-2">
            {category.name}
          </h1>
          <p className="text-lg md:text-xl text-white/90 mb-4">
            {category.description}
          </p>
          <div className="flex items-center gap-2 text-white/80">
            <Package className="w-5 h-5" />
            <span className="text-sm font-medium">
              {category.count} products available
            </span>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default CategoryHero
