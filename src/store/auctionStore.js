import { create } from 'zustand'

const useAuctionStore = create((set, get) => ({
  auctions: [],
  activeBids: {}, // { auctionId: [bids] }
  userBids: {}, // { auctionId: bidAmount }

  // Set auctions
  setAuctions: (auctions) => set({ auctions }),

  // Add a bid to an auction
  placeBid: (auctionId, bid) => {
    const { activeBids, auctions } = get()
    const currentBids = activeBids[auctionId] || []
    
    // Add new bid
    const newBids = [bid, ...currentBids]
    
    // Update auction current price
    const updatedAuctions = auctions.map((auction) =>
      auction.id === auctionId
        ? { ...auction, currentBid: bid.amount, totalBids: auction.totalBids + 1 }
        : auction
    )

    set({
      activeBids: { ...activeBids, [auctionId]: newBids },
      auctions: updatedAuctions,
      userBids: { ...get().userBids, [auctionId]: bid.amount },
    })
  },

  // Get bids for an auction
  getAuctionBids: (auctionId) => {
    return get().activeBids[auctionId] || []
  },

  // Get user's bid for an auction
  getUserBid: (auctionId) => {
    return get().userBids[auctionId]
  },

  // Check if user is highest bidder
  isHighestBidder: (auctionId, userId) => {
    const bids = get().activeBids[auctionId] || []
    if (bids.length === 0) return false
    return bids[0].userId === userId
  },

  // Mark auction as ended
  endAuction: (auctionId) => {
    const { auctions } = get()
    const updatedAuctions = auctions.map((auction) =>
      auction.id === auctionId ? { ...auction, status: 'ended' } : auction
    )
    set({ auctions: updatedAuctions })
  },

  // Get winner of an auction
  getWinner: (auctionId) => {
    const bids = get().activeBids[auctionId] || []
    return bids.length > 0 ? bids[0] : null
  },
}))

export { useAuctionStore }
