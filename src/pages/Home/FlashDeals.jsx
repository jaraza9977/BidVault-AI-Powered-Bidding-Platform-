import { useRef } from 'react'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, Zap } from 'lucide-react'
import { useCountdown } from '../../hooks/useCountdown'
import ProductCard from '../../components/shared/ProductCard'

// Mock flash deals data
const flashDeals = [
  {
    id: 1,
    title: 'iPhone 14 Pro Max',
    price: 289999,
    originalPrice: 349999,
    discount: 17,
    image: 'https://images.unsplash.com/photo-1678652197831-2d180705cd2c?w=400&q=80',
    seller: 'TechHub',
    condition: 'New',
    rating: 4.8,
    reviews: 234,
  },
  {
    id: 2,
    title: 'Nike Air Max 270',
    price: 12999,
    originalPrice: 18999,
    discount: 32,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80',
    seller: 'SportsZone',
    condition: 'New',
    rating: 4.6,
    reviews: 156,
    hasAISize: true,
  },
  {
    id: 3,
    title: 'Samsung 55" 4K Smart TV',
    price: 89999,
    originalPrice: 119999,
    discount: 25,
    image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400&q=80',
    seller: 'ElectroMart',
    condition: 'New',
    rating: 4.7,
    reviews: 89,
  },
  {
    id: 4,
    title: 'Sony WH-1000XM5 Headphones',
    price: 45999,
    originalPrice: 59999,
    discount: 23,
    image: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=400&q=80',
    seller: 'AudioPro',
    condition: 'New',
    rating: 4.9,
    reviews: 312,
  },
  {
    id: 5,
    title: 'Levi\'s Denim Jacket',
    price: 5999,
    originalPrice: 8999,
    discount: 33,
    image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&q=80',
    seller: 'FashionHub',
    condition: 'New',
    rating: 4.5,
    reviews: 78,
    hasAISize: true,
  },
]

const FlashDeals = () => {
  const scrollRef = useRef(null)
  
  // Countdown to 6 hours from now
  const endTime = Date.now() + 6 * 60 * 60 * 1000
  const remainingSeconds = useCountdown(endTime)
  
  const hours = Math.floor(remainingSeconds / 3600)
  const minutes = Math.floor((remainingSeconds % 3600) / 60)
  const seconds = remainingSeconds % 60

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 400
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      })
    }
  }

  return (
    <section className="py-12 bg-slate-50 dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-accent-500 to-accent-600 rounded-2xl flex items-center justify-center">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-slate-50">
                Flash Deals
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Limited time offers - grab them before they're gone!
              </p>
            </div>
          </div>

          {/* Countdown Timer */}
          <div className="hidden md:flex items-center gap-2">
            <span className="text-sm text-slate-600 dark:text-slate-400">Ends in:</span>
            <div className="flex gap-2">
              <div className="bg-accent-500 text-white px-3 py-2 rounded-lg min-w-[3rem] text-center">
                <div className="text-xl font-bold">{String(hours).padStart(2, '0')}</div>
                <div className="text-xs">Hours</div>
              </div>
              <div className="bg-accent-500 text-white px-3 py-2 rounded-lg min-w-[3rem] text-center">
                <div className="text-xl font-bold">{String(minutes).padStart(2, '0')}</div>
                <div className="text-xs">Mins</div>
              </div>
              <div className="bg-accent-500 text-white px-3 py-2 rounded-lg min-w-[3rem] text-center">
                <div className="text-xl font-bold">{String(seconds).padStart(2, '0')}</div>
                <div className="text-xs">Secs</div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Countdown */}
        <div className="md:hidden mb-6 flex items-center justify-center gap-2">
          <span className="text-sm text-slate-600 dark:text-slate-400">Ends in:</span>
          <div className="flex gap-2">
            <div className="bg-accent-500 text-white px-2 py-1 rounded text-center min-w-[2.5rem]">
              <div className="text-lg font-bold">{String(hours).padStart(2, '0')}</div>
              <div className="text-xs">Hrs</div>
            </div>
            <div className="bg-accent-500 text-white px-2 py-1 rounded text-center min-w-[2.5rem]">
              <div className="text-lg font-bold">{String(minutes).padStart(2, '0')}</div>
              <div className="text-xs">Min</div>
            </div>
            <div className="bg-accent-500 text-white px-2 py-1 rounded text-center min-w-[2.5rem]">
              <div className="text-lg font-bold">{String(seconds).padStart(2, '0')}</div>
              <div className="text-xs">Sec</div>
            </div>
          </div>
        </div>

        {/* Products Carousel */}
        <div className="relative group">
          {/* Scroll Left Button */}
          <button
            onClick={() => scroll('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white dark:bg-slate-800 shadow-lg rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity -ml-6"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-6 h-6 text-slate-600 dark:text-slate-400" />
          </button>

          {/* Products */}
          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth pb-4"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {flashDeals.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex-shrink-0 w-[280px]"
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>

          {/* Scroll Right Button */}
          <button
            onClick={() => scroll('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white dark:bg-slate-800 shadow-lg rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity -mr-6"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-6 h-6 text-slate-600 dark:text-slate-400" />
          </button>
        </div>
      </div>
    </section>
  )
}

export default FlashDeals
