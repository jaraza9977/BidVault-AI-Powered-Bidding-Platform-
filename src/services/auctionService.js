import api from './api'

// Mock data for development
const mockAuctions = [
  {
    id: 1,
    title: 'iPhone 15 Pro Max - 256GB',
    description: 'Brand new, sealed iPhone 15 Pro Max in Titanium Blue',
    image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=600&q=80',
    startingBid: 250000,
    currentBid: 275000,
    startTime: Date.now() - 2 * 60 * 60 * 1000, // Started 2 hours ago
    endTime: Date.now() + 4 * 60 * 60 * 1000, // Ends in 4 hours
    status: 'active',
    totalBids: 12,
    seller: 'TechHub Official',
    condition: 'New',
  },
  {
    id: 2,
    title: 'MacBook Pro M3 14" - 512GB',
    description: 'Latest MacBook Pro with M3 chip, Space Gray',
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&q=80',
    startingBid: 350000,
    currentBid: 385000,
    startTime: Date.now() - 1 * 60 * 60 * 1000, // Started 1 hour ago
    endTime: Date.now() + 6 * 60 * 60 * 1000, // Ends in 6 hours
    status: 'active',
    totalBids: 8,
    seller: 'AppleStore',
    condition: 'New',
  },
  {
    id: 3,
    title: 'Sony PlayStation 5 - Disc Edition',
    description: 'PS5 with 2 controllers and 3 games included',
    image: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=600&q=80',
    startingBid: 100000,
    currentBid: 125000,
    startTime: Date.now() - 30 * 60 * 1000, // Started 30 mins ago
    endTime: Date.now() + 2 * 60 * 60 * 1000, // Ends in 2 hours
    status: 'active',
    totalBids: 15,
    seller: 'GameZone',
    condition: 'Like New',
  },
  {
    id: 4,
    title: 'Canon EOS R6 Mark II Camera',
    description: 'Professional mirrorless camera with 24-105mm lens',
    image: 'https://images.unsplash.com/photo-1606980707986-e660e4904d9f?w=600&q=80',
    startingBid: 450000,
    currentBid: 450000,
    startTime: Date.now() + 1 * 60 * 60 * 1000, // Starts in 1 hour
    endTime: Date.now() + 25 * 60 * 60 * 1000, // Ends in 25 hours
    status: 'upcoming',
    totalBids: 0,
    seller: 'PhotoPro',
    condition: 'New',
  },
  {
    id: 5,
    title: 'Samsung 65" QLED 4K TV',
    description: 'Premium QLED TV with Quantum HDR',
    image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=600&q=80',
    startingBid: 180000,
    currentBid: 195000,
    startTime: Date.now() - 5 * 60 * 60 * 1000, // Started 5 hours ago
    endTime: Date.now() + 1 * 60 * 60 * 1000, // Ends in 1 hour
    status: 'active',
    totalBids: 20,
    seller: 'ElectroMart',
    condition: 'New',
  },
]

const mockBidHistory = {
  1: [
    { id: 101, userId: 'user1', userName: 'Ahmed Khan', amount: 275000, timestamp: Date.now() - 5 * 60 * 1000 },
    { id: 102, userId: 'user2', userName: 'Sara Ali', amount: 270000, timestamp: Date.now() - 15 * 60 * 1000 },
    { id: 103, userId: 'user3', userName: 'Hassan Raza', amount: 265000, timestamp: Date.now() - 30 * 60 * 1000 },
    { id: 104, userId: 'user1', userName: 'Ahmed Khan', amount: 260000, timestamp: Date.now() - 45 * 60 * 1000 },
    { id: 105, userId: 'user4', userName: 'Fatima Sheikh', amount: 255000, timestamp: Date.now() - 60 * 60 * 1000 },
  ],
  2: [
    { id: 201, userId: 'user2', userName: 'Sara Ali', amount: 385000, timestamp: Date.now() - 10 * 60 * 1000 },
    { id: 202, userId: 'user5', userName: 'Ali Haider', amount: 380000, timestamp: Date.now() - 20 * 60 * 1000 },
    { id: 203, userId: 'user2', userName: 'Sara Ali', amount: 375000, timestamp: Date.now() - 35 * 60 * 1000 },
  ],
  3: [
    { id: 301, userId: 'user3', userName: 'Hassan Raza', amount: 125000, timestamp: Date.now() - 2 * 60 * 1000 },
    { id: 302, userId: 'user6', userName: 'Zainab Ahmed', amount: 120000, timestamp: Date.now() - 8 * 60 * 1000 },
    { id: 303, userId: 'user3', userName: 'Hassan Raza', amount: 115000, timestamp: Date.now() - 15 * 60 * 1000 },
  ],
  5: [
    { id: 501, userId: 'user4', userName: 'Fatima Sheikh', amount: 195000, timestamp: Date.now() - 3 * 60 * 1000 },
    { id: 502, userId: 'user7', userName: 'Usman Malik', amount: 190000, timestamp: Date.now() - 12 * 60 * 1000 },
    { id: 503, userId: 'user4', userName: 'Fatima Sheikh', amount: 185000, timestamp: Date.now() - 25 * 60 * 1000 },
  ],
}

export const auctionService = {
  // Get all auctions
  getAuctions: async () => {
    try {
      // In production, replace with: const response = await api.get('/auctions')
      // return response.data
      
      // Mock response
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({ data: mockAuctions })
        }, 500)
      })
    } catch (error) {
      throw error
    }
  },

  // Get auction by ID
  getAuctionById: async (id) => {
    try {
      // In production: const response = await api.get(`/auctions/${id}`)
      
      return new Promise((resolve) => {
        setTimeout(() => {
          const auction = mockAuctions.find((a) => a.id === parseInt(id))
          resolve({ data: auction })
        }, 300)
      })
    } catch (error) {
      throw error
    }
  },

  // Get bid history for an auction
  getBidHistory: async (auctionId) => {
    try {
      // In production: const response = await api.get(`/auctions/${auctionId}/bids`)
      
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({ data: mockBidHistory[auctionId] || [] })
        }, 300)
      })
    } catch (error) {
      throw error
    }
  },

  // Place a bid
  placeBid: async (auctionId, amount) => {
    try {
      // In production: const response = await api.post(`/auctions/${auctionId}/bid`, { amount })
      
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          const auction = mockAuctions.find((a) => a.id === auctionId)
          
          if (!auction) {
            reject({ response: { data: { message: 'Auction not found' } } })
            return
          }

          if (auction.status !== 'active') {
            reject({ response: { data: { message: 'Auction is not active' } } })
            return
          }

          if (amount <= auction.currentBid) {
            reject({ response: { data: { message: `Bid must be higher than current bid of ${auction.currentBid}` } } })
            return
          }

          const newBid = {
            id: Date.now(),
            userId: 'currentUser',
            userName: 'You',
            amount,
            timestamp: Date.now(),
          }

          resolve({ data: newBid })
        }, 500)
      })
    } catch (error) {
      throw error
    }
  },
}
