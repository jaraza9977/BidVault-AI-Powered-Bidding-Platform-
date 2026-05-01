import { motion } from 'framer-motion'
import { Heart, ShoppingCart, MapPin, Sparkles } from 'lucide-react'
import { useWishlistStore } from '../../store/wishlistStore'
import { useCartStore } from '../../store/cartStore'
import { formatPrice, calculateDiscount } from '../../utils/formatters'
import Badge from '../ui/Badge'
import Card from '../ui/Card'
import { cn } from '../../utils/cn'

const ProductCard = ({ product }) => {
  const isInWishlist = useWishlistStore((state) => state.isInWishlist(product.id))
  const toggleWishlist = useWishlistStore((state) => state.toggleItem)
  const addToCart = useCartStore((state) => state.addItem)

  const discount = calculateDiscount(product.originalPrice, product.price)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card hover className="group overflow-hidden">
        {/* Image Container */}
        <div className="relative aspect-square overflow-hidden bg-slate-100 dark:bg-slate-800">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          />
          
          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {discount > 0 && (
              <Badge variant="discount">-{discount}%</Badge>
            )}
            <Badge variant={product.condition === 'new' ? 'new' : 'used'}>
              {product.condition}
            </Badge>
            {product.isAiSizeAvailable && (
              <Badge variant="primary" className="flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                AI Size
              </Badge>
            )}
          </div>

          {/* Wishlist Button */}
          <button
            onClick={(e) => {
              e.stopPropagation()
              toggleWishlist(product)
            }}
            className={cn(
              'absolute top-3 right-3 p-2 rounded-full backdrop-blur-sm transition-all duration-200',
              isInWishlist
                ? 'bg-red-500 text-white'
                : 'bg-white/80 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-800'
            )}
          >
            <Heart
              className={cn('w-5 h-5', isInWishlist && 'fill-current')}
            />
          </button>
        </div>

        {/* Content */}
        <div className="p-4">
          {/* Title */}
          <h3 className="font-medium text-slate-900 dark:text-slate-50 mb-1 line-clamp-2 group-hover:text-primary-500 transition-colors">
            {product.title}
          </h3>

          {/* Seller Info */}
          <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400 mb-3">
            <span>{product.seller.name}</span>
            <span>•</span>
            <div className="flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              <span>{product.seller.city}</span>
            </div>
          </div>

          {/* Price */}
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xl font-bold text-primary-500">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice > product.price && (
              <span className="text-sm text-slate-500 dark:text-slate-400 line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={(e) => {
              e.stopPropagation()
              addToCart(product)
            }}
            className="w-full btn-primary flex items-center justify-center gap-2"
          >
            <ShoppingCart className="w-4 h-4" />
            Add to Cart
          </button>
        </div>
      </Card>
    </motion.div>
  )
}

export default ProductCard
