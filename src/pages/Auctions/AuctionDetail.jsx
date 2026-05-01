import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Clock, Gavel, TrendingUp, Users, Trophy, AlertCircle, Share2 } from 'lucide-react'
import { formatPrice, formatRelativeTime } from '../../utils/formatters'
import { useCountdown } from '../../hooks/useCountdown'
import { useAuctionStore } from '../../store/auctionStore'
import { useAuthStore } from '../../store/authStore'
import { auctionService } from '../../services/auctionService'
import Navbar from '../../components/layout/Navbar'
import Button from '../../components/ui/Button'
import Input from '../../components/ui/Input'
import Badge from '../../components/ui/Badge'
import LoadingSpinner from '../../components/shared/LoadingSpinner'
import toast from 'react-hot-toast'

const AuctionDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [auction, setAuction] = useState(null)
  const [bidAmount, setBidAmount] = useState('')
  const [isPlacingBid, setIsPlacingBid] = useState(false)
  const [bidHistory, setBidHistory] = useState([])
  const [isLoadingHistory, setIsLoadingHistory] = useState(true)
  const [isLoading, setIsLoading] = useState(true)
  const [status, setStatus] = useState('active')

  const { placeBid, getUserBid, isHighestBidder, getWinner } = useAuctionStore()
  const user = useAuthStore((state) => state.user)
  const remainingSeconds = useCountdown(auction?.endTime || 0)

  useEffect(() => {
    loadAuction()
    loadBidHistory()
  }, [id])

  useEffect(() => {
    if (auction && remainingSeconds <= 0 && status === 'active') {
      setStatus('ended')
    }
  }, [remainingSeconds, auction, status])

  useEffect(() => {
    if (auction) {
      // Set suggested bid amount
      const minBid = auction.currentBid + 1000
      setBidAmount(minBid.toString())
    }
  }, [auction])

  const loadAuction = async () => {
    try {
      setIsLoading(true)
      const response = await auctionService.getAuctionById(id)
      setAuction(response.data)
      setStatus(response.data.status)
    } catch (error) {
      console.error('Failed to load auction:', error)
      toast.error('Failed to load auction')
      navigate('/auctions')
    } finally {
      setIsLoading(false)
    }
  }

  const loadBidHistory = async () => {
    try {
      setIsLoadingHistory(true)
      const response = await auctionService.getBidHistory(id)
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
      const response = await auctionService.placeBid(parseInt(id), amount)
      const newBid = response.data

      // Update auction current bid
      setAuction({ ...auction, currentBid: amount, totalBids: auction.totalBids + 1 })

      // Update store
      placeBid(parseInt(id), newBid)

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
  const userBid = getUserBid(parseInt(id))
  const isUserHighestBidder = user && isHighestBidder(parseInt(id), user.id)

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
        <Navbar />
        <LoadingSpinner fullScreen />
      </div>
    )
  }

  if (!auction) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-50 mb-4">
            Auction not found
          </h2>
          <Button onClick={() => navigate('/auctions')}>
            Back to Auctions
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <button
          onClick={() => navigate('/auctions')}
          className="flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-primary-500 dark:hover:text-primary-400 mb-6 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Auctions</span>
        </button>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Image & Info */}
          <div className="lg:col-span-2">
            {/* Image */}
            <div className="relative rounded-2xl overflow-hidden mb-6 bg-white dark:bg-slate-800 p-4">
              <img
                src={auction.image}
                alt={auction.title}
                className="w-full h-96 object-cover rounded-xl"
              />
              {status === 'ended' && winner && (
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-6">
                  <div className="text-white">
                    <div className="flex items-center gap-2 mb-2">
                      <Trophy className="w-6 h-6 text-yellow-400" />
                      <span className="font-bold text-lg">Winner</span>
                    </div>
                    <p className="text-2xl font-bold">{winner.userName}</p>
                    <p className="text-lg">Winning Bid: {formatPrice(winner.amount)}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Title & Description */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 mb-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-50 mb-2">
                    {auction.title}
                  </h1>
                  <p className="text-slate-600 dark:text-slate-400 text-lg">
                    {auction.description}
                  </p>
                </div>
                <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors">
                  <Share2 className="w-5 h-5 text-slate-600 dark:text-slate-400" />
                </button>
              </div>

              {/* Seller & Condition */}
              <div className="flex items-center gap-6 pt-4 border-t border-slate-200 dark:border-slate-700">
                <div>
                  <p className="text-sm text-slate-500 dark:text-slate-400">Seller</p>
                  <p className="font-semibold text-slate-900 dark:text-slate-50">{auction.seller}</p>
                </div>
                <div className="h-8 w-px bg-slate-300 dark:bg-slate-600" />
                <div>
                  <p className="text-sm text-slate-500 dark:text-slate-400">Condition</p>
                  <Badge variant="secondary">{auction.condition}</Badge>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white dark:bg-slate-800 rounded-2xl p-6">
                <div className="flex items-center gap-3 text-slate-600 dark:text-slate-400 mb-2">
                  <Users className="w-5 h-5" />
                  <span className="text-sm font-medium">Total Bids</span>
                </div>
                <p className="text-3xl font-bold text-slate-900 dark:text-slate-50">{auction.totalBids}</p>
              </div>
              <div className="bg-white dark:bg-slate-800 rounded-2xl p-6">
                <div className="flex items-center gap-3 text-slate-600 dark:text-slate-400 mb-2">
                  <Clock className="w-5 h-5" />
                  <span className="text-sm font-medium">Time Left</span>
                </div>
                <p className={`text-3xl font-bold ${remainingSeconds < 3600 ? 'text-red-600 dark:text-red-400' : 'text-slate-900 dark:text-slate-50'}`}>
                  {formatTimeRemaining(remainingSeconds)}
                </p>
              </div>
            </div>
          </div>

          {/* Right Column - Bidding */}
          <div className="lg:col-span-1">
            {/* Price Card */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 mb-6 sticky top-24">
              <div className="mb-6">
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">Current Bid</p>
                <p className="text-4xl font-bold text-primary-600 dark:text-primary-400">
                  {formatPrice(auction.currentBid)}
                </p>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                  Starting: {formatPrice(auction.startingBid)}
                </p>
              </div>

              {/* Bidding Section */}
              {status === 'active' ? (
                <div className="space-y-4">
                  {isUserHighestBidder && (
                    <div className="bg-green-100 dark:bg-green-900/30 border border-green-300 dark:border-green-700 rounded-xl p-4 flex items-start gap-3">
                      <Trophy className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-semibold text-green-800 dark:text-green-300">
                          You're the highest bidder!
                        </p>
                        <p className="text-xs text-green-700 dark:text-green-400">
                          Your bid: {formatPrice(userBid)}
                        </p>
                      </div>
                    </div>
                  )}

                  <Input
                    type="number"
                    label="Your Bid Amount (PKR)"
                    value={bidAmount}
                    onChange={(e) => setBidAmount(e.target.value)}
                    placeholder="Enter amount"
                    min={auction.currentBid + 1}
                  />
                  
                  <div className="flex items-start gap-2 text-xs text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-900 rounded-lg p-3">
                    <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                    <p>Minimum bid: {formatPrice(auction.currentBid + 1000)}</p>
                  </div>

                  <Button
                    onClick={handlePlaceBid}
                    loading={isPlacingBid}
                    className="w-full"
                    size="lg"
                    disabled={remainingSeconds <= 0}
                  >
                    <Gavel className="w-5 h-5 mr-2" />
                    Place Bid
                  </Button>
                </div>
              ) : status === 'ended' ? (
                <div className="text-center py-6">
                  <div className="w-16 h-16 bg-slate-100 dark:bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Gavel className="w-8 h-8 text-slate-400" />
                  </div>
                  <p className="text-lg font-semibold text-slate-900 dark:text-slate-50 mb-2">
                    Auction Ended
                  </p>
                  {winner && (
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      Winner: {winner.userName}
                    </p>
                  )}
                </div>
              ) : (
                <div className="text-center py-6">
                  <p className="text-lg font-semibold text-slate-900 dark:text-slate-50">
                    Auction Starting Soon
                  </p>
                </div>
              )}
            </div>

            {/* Bid History */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-6">
              <h3 className="font-bold text-slate-900 dark:text-slate-50 mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Bid History ({bidHistory.length})
              </h3>

              {isLoadingHistory ? (
                <div className="space-y-2">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="h-16 bg-slate-100 dark:bg-slate-700 rounded-lg animate-pulse" />
                  ))}
                </div>
              ) : bidHistory.length === 0 ? (
                <div className="text-center py-8 text-slate-500 dark:text-slate-400">
                  <Gavel className="w-12 h-12 mx-auto mb-2 opacity-50" />
                  <p className="text-sm">No bids yet. Be the first to bid!</p>
                </div>
              ) : (
                <div className="space-y-2 max-h-96 overflow-y-auto">
                  {bidHistory.map((bid, index) => (
                    <motion.div
                      key={bid.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className={`p-4 rounded-xl border ${
                        index === 0
                          ? 'bg-primary-50 dark:bg-primary-900/20 border-primary-300 dark:border-primary-700'
                          : 'bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-700'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-slate-900 dark:text-slate-50">
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
    </div>
  )
}

export default AuctionDetail
