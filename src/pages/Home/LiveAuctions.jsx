import { useRef, useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { Gavel, ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react'
import { auctionService } from '../../services/auctionService'
import { useAuctionStore } from '../../store/auctionStore'
import AuctionCard from '../Auctions/AuctionCard'
import AuctionDetailModal from '../Auctions/AuctionDetailModal'
import Button from '../../components/ui/Button'

const LiveAuctions = () => {
  const scrollRef = useRef(null)
  const navigate = useNavigate()
  const [selectedAuction, setSelectedAuction] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  const { auctions, setAuctions } = useAuctionStore()

  useEffect(() => {
    loadAuctions()
  }, [])

  const loadAuctions = async () => {
    try {
      setIsLoading(true)
      const response = await auctionService.getAuctions()
      // Only show active and upcoming auctions on home page
      const activeAuctions = response.data.filter(
        (a) => a.status === 'active' || a.status === 'upcoming'
      )
      setAuctions(response.data)
    } catch (error) {
      console.error('Failed to load auctions:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 400
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      })
    }
  }

  const handleAuctionClick = (auction) => {
    setSelectedAuction(auction)
    setIsModalOpen(true)
  }

  // Show only active and upcoming auctions
  const displayAuctions = auctions.filter(
    (a) => a.status === 'active' || a.status === 'upcoming'
  ).slice(0, 6)

  if (displayAuctions.length === 0 && !isLoading) {
    return null // Don't show section if no auctions
  }

  return (
    <section className="py-12 bg-white dark:bg-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-accent-500 to-accent-600 rounded-2xl flex items-center justify-center">
              <Gavel className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-slate-50">
                Live Auctions
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Bid now and win exclusive deals
              </p>
            </div>
          </div>

          <Button
            onClick={() => navigate('/auctions')}
            variant="secondary"
            className="hidden md:flex items-center gap-2"
          >
            View All
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>

        {/* Auctions Carousel */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-96 bg-slate-100 dark:bg-slate-700 rounded-2xl animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="relative group">
            {/* Scroll Left Button */}
            <button
              onClick={() => scroll('left')}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white dark:bg-slate-800 shadow-lg rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity -ml-6"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-6 h-6 text-slate-600 dark:text-slate-400" />
            </button>

            {/* Auctions */}
            <div
              ref={scrollRef}
              className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth pb-4"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {displayAuctions.map((auction, index) => (
                <motion.div
                  key={auction.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex-shrink-0 w-[320px]"
                >
                  <AuctionCard
                    auction={auction}
                    onClick={() => handleAuctionClick(auction)}
                  />
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
        )}

        {/* Mobile View All Button */}
        <div className="md:hidden mt-6 text-center">
          <Button
            onClick={() => navigate('/auctions')}
            variant="secondary"
            className="w-full"
          >
            View All Auctions
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>

      {/* Auction Detail Modal */}
      <AuctionDetailModal
        auction={selectedAuction}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </section>
  )
}

export default LiveAuctions
