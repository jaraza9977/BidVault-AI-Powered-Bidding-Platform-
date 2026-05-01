import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Clock, Gavel, TrendingUp, Users, Trophy, AlertCircle } from 'lucide-react'
import { formatPrice, formatRelativeTime } from '../../utils/formatters'
import { useCountdown } from '../../hooks/useCountdown'
import { useAuctionStore } from '../../store/auctionStore'
import { useAuthStore } from '../../store/authStore'
import { auctionService } from '../../services/auctionService'
import Button from '../../components/ui/Button'
import Input from '../../components/ui/Input'
import Badge from '../../components/ui/Badge'
import toast from 'react-hot-toast'

const AuctionDetailModal = ({ auction, isOpen, onClose }) => {
  const [bidAmount, setBidAmount] = useState('')
  const [isPlacingBid, setIsPlacingBid] = useState(false)
  const [bidHistory, setBidHistory] = useState([])
  const [isLoadingHistory, setIsLoadingHistory] = useState(true)
  const [status, setStatus] = useState(auction?.status || 'active')

  const { placeBid, getAuctionBids, getUserBid, isHighestBidder, getWinner } = useAuctionStore()
  const user = useAuthStore((state) => state.user)
  const remainingSeconds = useCountdown(auction?.endTime || 0)

  useEffect(() => {
    if (isOpen && auction) {
      loadBidHistory()
      // Set suggested bid amount
      const minBid = auction.currentBid + 1000
      setBidAmount(minBid.toString())
    }
  }, [isOpen, auction])

  useEffect(() => {
    if (auction && remainingSeconds <= 0 && status === 'active') {
      setStatus('ended')
    }
  }, [remainingSeconds, auction, status])

  const loadBidHistory = async () => {
    try {
      setIsLoadingHistory(true)
      const response = await auctionService.getBidHistory(auction.id)
      setBidHistory(response.data)
    } catch (error) {
      console.error('Failed to load bid history:', error)
    } finally {
      setIsLoadingHistory(false)
    }
  }

  const handlePlaceBid = async () => {
    const amount = parseInt(bidAmount)

    if (!amount || amount <= 0) {
      toast.error('Please enter a valid bid amount')
      return
    }

    if (amount <= auction.currentBid) {
      toast.error(`Bid must be higher than ${formatPrice(auction.currentBid)}`)
      return
    }

    setIsPlacingBid(true)
    try {
      const response = await auctionService.placeBid(auction.id, amount)
      const newBid = response.data

      // Update store
      placeBid(auction.id, newBid)

      // Update local bid history
      setBidHistory([newBid, ...bidHistory])

      toast.success('Bid placed successfully!')
      
      // Set next suggested bid
      const nextMinBid = amount + 1000
      setBidAmount(nextMinBid.toString())
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to place bid')
    } finally {
      setIsPlacingBid(false)
    }
  }

  const formatTimeRemaining = (seconds) => {
    if (seconds <= 0) return 'Auction Ended'
    
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60

    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`
  }

  const winner = status === 'ended' ? (bidHistory.length > 0 ? bidHistory[0] : null) : null
  const userBid = getUserBid(auction?.id)
  const isUserHighestBidder = user && isHighestBidder(auction?.id, user.id)

  if (!auction) return null

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 z-50 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[95vw] max-w-4xl max-h-[90vh] bg-white dark:bg-slate-800 rounded-2xl shadow-2xl z-50 overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-slate-200 dark:border-slate-700">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-50">
                Auction Details
              </h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6">
              <div className="grid md:grid-cols-2 gap-6">
                {/* Left Column - Image & Info */}
                <div>
                  {/* Image */}
                  <div className="relative rounded-xl overflow-hidden mb-4">
                    <img
                      src={auction.image}
                      alt={auction.title}
                      className="w-full h-64 object-cover"
                    />
                    {status === 'ended' && winner && (
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-4">
                        <div className="text-white">
                          <div className="flex items-center gap-2 mb-1">
                            <Trophy className="w-5 h-5 text-yellow-400" />
                            <span className="font-bold">Winner</span>
                          </div>
                          <p className="text-lg font-bold">{winner.userName}</p>
                          <p className="text-sm">Winning Bid: {formatPrice(winner.amount)}</p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-xl font-bold text-slate-900 dark:text-slate-50 mb-2">
                    {auction.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 mb-4">
                    {auction.description}
                  </p>

                  {/* Seller & Condition */}
                  <div className="flex items-center gap-3 mb-4">
                    <div>
                      <p className="text-sm text-slate-500 dark:text-slate-400">Seller</p>
                      <p className="font-medium text-slate-900 dark:text-slate-50">{auction.seller}</p>
                    </div>
                    <div className="h-8 w-px bg-slate-300 dark:bg-slate-600" />
                    <div>
                      <p className="text-sm text-slate-500 dark:text-slate-400">Condition</p>
                      <Badge variant="secondary">{auction.condition}</Badge>
                    </div>
                  </div>

                  {/* Price Info */}
                  <div className="bg-slate-50 dark:bg-slate-900 rounded-xl p-4 mb-4">
                    <div className="flex items-baseline justify-between mb-2">
                      <span className="text-sm text-slate-600 dark:text-slate-400">Current Bid</span>
                      <span className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                        {formatPrice(auction.currentBid)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-500 dark:text-slate-400">Starting Bid</span>
                      <span className="text-slate-700 dark:text-slate-300">{formatPrice(auction.startingBid)}</span>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-slate-50 dark:bg-slate-900 rounded-xl p-4">
                      <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400 mb-1">
                        <Users className="w-4 h-4" />
                        <span className="text-sm">Total Bids</span>
                      </div>
                      <p className="text-2xl font-bold text-slate-900 dark:text-slate-50">{auction.totalBids}</p>
                    </div>
                    <div className="bg-slate-50 dark:bg-slate-900 rounded-xl p-4">
                      <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400 mb-1">
                        <Clock className="w-4 h-4" />
                        <span className="text-sm">Time Left</span>
                      </div>
                      <p className={`text-2xl font-bold ${remainingSeconds < 3600 ? 'text-red-600 dark:text-red-400' : 'text-slate-900 dark:text-slate-50'}`}>
                        {formatTimeRemaining(remainingSeconds)}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Right Column - Bidding & History */}
                <div>
                  {/* Bidding Section */}
                  {status === 'active' && (
                    <div className="bg-primary-50 dark:bg-primary-900/20 rounded-xl p-4 mb-6">
                      <h4 className="font-bold text-slate-900 dark:text-slate-50 mb-3 flex items-center gap-2">
                        <Gavel className="w-5 h-5" />
                        Place Your Bid
                      </h4>

                      {isUserHighestBidder && (
                        <div className="bg-green-100 dark:bg-green-900/30 border border-green-300 dark:border-green-700 rounded-lg p-3 mb-3 flex items-start gap-2">
                          <Trophy className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="text-sm font-medium text-green-800 dark:text-green-300">
                              You're the highest bidder!
                            </p>
                            <p className="text-xs text-green-700 dark:text-green-400">
                              Your bid: {formatPrice(userBid)}
                            </p>
                          </div>
                        </div>
                      )}

                      <div className="space-y-3">
                        <Input
                          type="number"
                          label="Your Bid Amount (PKR)"
                          value={bidAmount}
                          onChange={(e) => setBidAmount(e.target.value)}
                          placeholder="Enter amount"
                          min={auction.currentBid + 1}
                        />
                        <div className="flex items-start gap-2 text-xs text-slate-600 dark:text-slate-400">
                          <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                          <p>Minimum bid: {formatPrice(auction.currentBid + 1000)}</p>
                        </div>
                        <Button
                          onClick={handlePlaceBid}
                          loading={isPlacingBid}
                          className="w-full"
                          disabled={remainingSeconds <= 0}
                        >
                          Place Bid
                        </Button>
                      </div>
                    </div>
                  )}

                  {/* Bid History */}
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-slate-50 mb-3 flex items-center gap-2">
                      <TrendingUp className="w-5 h-5" />
                      Bid History ({bidHistory.length})
                    </h4>

                    {isLoadingHistory ? (
                      <div className="space-y-2">
                        {[...Array(3)].map((_, i) => (
                          <div key={i} className="h-16 bg-slate-100 dark:bg-slate-700 rounded-lg animate-pulse" />
                        ))}
                      </div>
                    ) : bidHistory.length === 0 ? (
                      <div className="text-center py-8 text-slate-500 dark:text-slate-400">
                        <Gavel className="w-12 h-12 mx-auto mb-2 opacity-50" />
                        <p>No bids yet. Be the first to bid!</p>
                      </div>
                    ) : (
                      <div className="space-y-2 max-h-96 overflow-y-auto">
                        {bidHistory.map((bid, index) => (
                          <motion.div
                            key={bid.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.05 }}
                            className={`p-3 rounded-lg border ${
                              index === 0
                                ? 'bg-primary-50 dark:bg-primary-900/20 border-primary-300 dark:border-primary-700'
                                : 'bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-700'
                            }`}
                          >
                            <div className="flex items-center justify-between mb-1">
                              <div className="flex items-center gap-2">
                                <span className="font-medium text-slate-900 dark:text-slate-50">
                                  {bid.userName}
                                </span>
                                {index === 0 && (
                                  <Trophy className="w-4 h-4 text-yellow-500" />
                                )}
                              </div>
                              <span className="font-bold text-primary-600 dark:text-primary-400">
                                {formatPrice(bid.amount)}
                              </span>
                            </div>
                            <p className="text-xs text-slate-500 dark:text-slate-400">
                              {formatRelativeTime(bid.timestamp)}
                            </p>
                          </motion.div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default AuctionDetailModal
