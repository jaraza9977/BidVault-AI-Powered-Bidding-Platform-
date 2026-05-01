import { useState } from 'react'
import { motion } from 'framer-motion'
import { TrendingUp } from 'lucide-react'
import ProductCard from '../../components/shared/ProductCard'
import Button from '../../components/ui/Button'

// Mock new arrivals data
const newArrivals = [
  {
    id: 11,
    title: 'MacBook Pro M3 14"',
    price: 349999,
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&q=80',
    seller: 'AppleStore',
    condition: 'New',
    rating: 4.9,
    reviews: 145,
  },
  {
    id: 12,
    title: 'Adidas Ultraboost 23',
    price: 15999,
    image: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=400&q=80',
    seller: 'SportsWorld',
    condition: 'New',
    rating: 4.7,
    reviews: 89,
    hasAISize: true,
  },
  {
    id: 13,
    title: 'Canon EOS R6 Camera',
    price: 279999,
    image: 'https://images.unsplash.com/photo-1606980707986-e660e4904d9f?w=400&q=80',
    seller: 'PhotoPro',
    condition: 'New',
    rating: 4.8,
    reviews: 67,
  },
  {
    id: 14,
    title: 'Zara Leather Jacket',
    price: 8999,
    image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&q=80',
    seller: 'FashionHub',
    condition: 'New',
    rating: 4.6,
    reviews: 123,
    hasAISize: true,
  },
  {
    id: 15,
    title: 'PlayStation 5 Console',
    price: 119999,
    image: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=400&q=80',
    seller: 'GameZone',
    condition: 'New',
    rating: 4.9,
    reviews: 234,
  },
  {
    id: 16,
    title: 'Samsung Galaxy Watch 6',
    price: 42999,
    image: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=400&q=80',
    seller: 'TechMart',
    condition: 'New',
    rating: 4.5,
    reviews: 98,
  },
  {
    id: 17,
    title: 'H&M Cotton T-Shirt',
    price: 1299,
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&q=80',
    seller: 'FashionStore',
    condition: 'New',
    rating: 4.4,
    reviews: 156,
    hasAISize: true,
  },
  {
    id: 18,
    title: 'Bose QuietComfort Earbuds',
    price: 24999,
    image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400&q=80',
    seller: 'AudioWorld',
    condition: 'New',
    rating: 4.7,
    reviews: 187,
  },
]

const NewArrivals = () => {
  const [visibleCount, setVisibleCount] = useState(8)
  const [isLoading, setIsLoading] = useState(false)

  const loadMore = () => {
    setIsLoading(true)
    // Simulate loading
    setTimeout(() => {
      setVisibleCount((prev) => prev + 8)
      setIsLoading(false)
    }, 500)
  }

  return (
    <section className="py-12 bg-white dark:bg-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center">
            <TrendingUp className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-slate-50">
              New Arrivals
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Fresh products added daily
            </p>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {newArrivals.slice(0, visibleCount).map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>

        {/* Load More Button */}
        {visibleCount < newArrivals.length && (
          <div className="flex justify-center">
            <Button
              onClick={loadMore}
              loading={isLoading}
              variant="secondary"
              size="lg"
            >
              Load More Products
            </Button>
          </div>
        )}
      </div>
    </section>
  )
}

export default NewArrivals
