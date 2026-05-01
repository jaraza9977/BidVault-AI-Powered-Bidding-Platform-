import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Gavel, Filter, TrendingUp } from 'lucide-react'
import Navbar from '../../components/layout/Navbar'
import AuctionCard from './AuctionCard'
import AuctionDetailModal from './AuctionDetailModal'
import { useAuctionStore } from '../../store/auctionStore'
import { auctionService } from '../../services/auctionService'
import LoadingSpinner from '../../components/shared/LoadingSpinner'
import Badge from '../../components/ui/Badge'

const Auctions = () => {
  const [selectedAuction, setSelectedAuction] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [filter, setFilter] = useState('all') // all, active, upcoming, ended

  const { auctions, setAuctions } = useAuctionStore()

  useEffect(() => {
    loadAuctions()
  }, [])

  const loadAuctions = async () => {
    try {
      setIsLoading(true)
      const response = await auctionService.getAuctions()
      setAuctions(response.data)
    } catch (error) {
      console.error('Failed to load auctions:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleAuctionClick = (auction) => {
    setSelectedAuction(auction)
    setIsModalOpen(true)
  }

  const filteredAuctions = auctions.filter((auction) => {
    if (filter === 'all') return true
    
    const now = Date.now()
    if (filter === 'active') {
      return auction.startTime <= now && auction.endTime > now
    } else if (filter === 'upcoming') {
      return auction.startTime > now
    } else if (filter === 'ended') {
      return auction.endTime <= now
    }
    return true
  })

  const activeCount = auctions.filter(a => a.startTime <= Date.now() && a.endTime > Date.now()).length
  const upcomingCount = auctions.filter(a => a.startTime > Date.now()).length
  const endedCount = auctions.filter(a => a.endTime <= Date.now()).length

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <Navbar />

      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-primary-600 to-primary-800 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center text-white"
            >
              <div className="w-16 h-16 bg-white/20 backdrop-blur-lg rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Gavel className="w-8 h-8" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Live Auctions</h1>
              <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto">
                Bid on exclusive items and win amazing deals. Real-time bidding with live countdown timers.
              </p>
            </motion.div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Filters */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-50 mb-1">
                Browse Auctions
              </h2>
              <p className="text-slate-600 dark:text-slate-400">
                {filteredAuctions.length} auction{filteredAuctions.length !== 1 ? 's' : ''} available
              </p>
            </div>

            {/* Filter Buttons */}
            <div className="flex items-center gap-2 flex-wrap">
              <button
                onClick={() => setFilter('all')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  filter === 'all'
                    ? 'bg-primary-500 text-white'
                    : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-600'
                }`}
              >
                All ({auctions.length})
              </button>
              <button
                onClick={() => setFilter('active')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  filter === 'active'
                    ? 'bg-green-500 text-white'
                    : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-600'
                }`}
              >
                Live ({activeCount})
              </button>
              <button
                onClick={() => setFilter('upcoming')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  filter === 'upcoming'
                    ? 'bg-blue-500 text-white'
                    : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-600'
                }`}
              >
                Upcoming ({upcomingCount})
              </button>
              <button
                onClick={() => setFilter('ended')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  filter === 'ended'
                    ? 'bg-slate-500 text-white'
                    : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-600'
                }`}
              >
                Ended ({endedCount})
              </button>
            </div>
          </div>

          {/* Auctions Grid */}
          {isLoading ? (
            <div className="flex items-center justify-center py-20">
              <LoadingSpinner />
            </div>
          ) : filteredAuctions.length === 0 ? (
            <div className="text-center py-20">
              <Gavel className="w-16 h-16 mx-auto mb-4 text-slate-400" />
              <h3 className="text-xl font-bold text-slate-900 dark:text-slate-50 mb-2">
                No auctions found
              </h3>
              <p className="text-slate-600 dark:text-slate-400">
                Try changing your filter or check back later for new auctions.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredAuctions.map((auction, index) => (
                <motion.div
                  key={auction.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <AuctionCard
                    auction={auction}
                    onClick={() => handleAuctionClick(auction)}
                  />
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </motion.main>

      {/* Auction Detail Modal */}
      <AuctionDetailModal
        auction={selectedAuction}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  )
}

export default Auctions
