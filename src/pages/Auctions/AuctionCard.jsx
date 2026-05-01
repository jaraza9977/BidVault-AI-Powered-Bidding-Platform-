import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Clock, Gavel, TrendingUp, Users } from 'lucide-react'
import { formatPrice } from '../../utils/formatters'
import { useCountdown } from '../../hooks/useCountdown'
import Badge from '../../components/ui/Badge'

const AuctionCard = ({ auction, onClick }) => {
  const [status, setStatus] = useState(auction.status)
  const remainingSeconds = useCountdown(auction.endTime)
  const timeUntilStart = Math.floor((auction.startTime - Date.now()) / 1000)

  useEffect(() => {
    if (auction.status === 'upcoming' && timeUntilStart <= 0) {
      setStatus('active')
    } else if (auction.status === 'active' && remainingSeconds <= 0) {
      setStatus('ended')
    }
  }, [remainingSeconds, timeUntilStart, auction.status])

  const formatTimeRemaining = (seconds) => {
    if (seconds <= 0) return 'Ended'
    
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60

    if (hours > 0) {
      return `${hours}h ${minutes}m ${secs}s`
    } else if (minutes > 0) {
      return `${minutes}m ${secs}s`
    } else {
      return `${secs}s`
    }
  }

  const formatTimeUntilStart = (seconds) => {
    if (seconds <= 0) return 'Starting now'
    
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)

    if (hours > 0) {
      return `Starts in ${hours}h ${minutes}m`
    } else {
      return `Starts in ${minutes}m`
    }
  }

  const getStatusBadge = () => {
    if (status === 'ended') {
      return <Badge variant="secondary">Ended</Badge>
    } else if (status === 'upcoming') {
      return <Badge className="bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400">Upcoming</Badge>
    } else if (remainingSeconds < 3600) {
      return <Badge className="bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 animate-pulse">Ending Soon</Badge>
    } else {
      return <Badge className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400">Live</Badge>
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      onClick={onClick}
      className="card cursor-pointer overflow-hidden group"
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={auction.image}
          alt={auction.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
        <div className="absolute top-3 right-3">
          {getStatusBadge()}
        </div>
        {status === 'ended' && (
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
            <div className="text-white text-center">
              <Gavel className="w-12 h-12 mx-auto mb-2" />
              <p className="font-bold text-lg">Auction Ended</p>
            </div>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Title */}
        <h3 className="font-bold text-lg text-slate-900 dark:text-slate-50 mb-2 line-clamp-2">
          {auction.title}
        </h3>

        {/* Seller & Condition */}
        <div className="flex items-center gap-2 mb-3">
          <span className="text-sm text-slate-600 dark:text-slate-400">{auction.seller}</span>
          <span className="text-slate-400">•</span>
          <Badge variant="secondary" className="text-xs">{auction.condition}</Badge>
        </div>

        {/* Price Info */}
        <div className="mb-3">
          <div className="flex items-baseline gap-2 mb-1">
            <span className="text-sm text-slate-600 dark:text-slate-400">Current Bid:</span>
            <span className="text-xl font-bold text-primary-600 dark:text-primary-400">
              {formatPrice(auction.currentBid)}
            </span>
          </div>
          <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
            <TrendingUp className="w-4 h-4" />
            <span>Starting: {formatPrice(auction.startingBid)}</span>
          </div>
        </div>

        {/* Stats */}
        <div className="flex items-center justify-between mb-3 pb-3 border-b border-slate-200 dark:border-slate-700">
          <div className="flex items-center gap-1 text-sm text-slate-600 dark:text-slate-400">
            <Users className="w-4 h-4" />
            <span>{auction.totalBids} bids</span>
          </div>
        </div>

        {/* Countdown */}
        {status === 'upcoming' ? (
          <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400">
            <Clock className="w-4 h-4" />
            <span className="text-sm font-medium">{formatTimeUntilStart(timeUntilStart)}</span>
          </div>
        ) : status === 'active' ? (
          <div className={`flex items-center gap-2 ${remainingSeconds < 3600 ? 'text-red-600 dark:text-red-400' : 'text-slate-600 dark:text-slate-400'}`}>
            <Clock className="w-4 h-4" />
            <span className="text-sm font-medium">
              {remainingSeconds < 3600 ? 'Ends in: ' : 'Time left: '}
              {formatTimeRemaining(remainingSeconds)}
            </span>
          </div>
        ) : (
          <div className="text-center py-2">
            <button className="text-sm text-primary-600 dark:text-primary-400 font-medium hover:underline">
              View Winner
            </button>
          </div>
        )}
      </div>
    </motion.div>
  )
}

export default AuctionCard
