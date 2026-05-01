import { useState } from 'react'
import { motion } from 'framer-motion'
import Navbar from '../../components/layout/Navbar'
import HeroSection from './HeroSection'
import AIFeatureBanner from './AIFeatureBanner'
import CategoryBar from './CategoryBar'
import LiveAuctions from './LiveAuctions'
import FlashDeals from './FlashDeals'
import NewArrivals from './NewArrivals'
import TrendingSearches from './TrendingSearches'
import WhyAIBazaar from './WhyAIBazaar'

const Home = () => {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <Navbar />
      
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {/* Hero Section */}
        <HeroSection />

        {/* AI Feature Spotlight */}
        <AIFeatureBanner />

        {/* Category Quick Access */}
        <CategoryBar />

        {/* Live Auctions */}
        <LiveAuctions />

        {/* Flash Deals */}
        <FlashDeals />

        {/* New Arrivals */}
        <NewArrivals />

        {/* Trending Searches */}
        <TrendingSearches />

        {/* Why AI Smart Bazaar */}
        <WhyAIBazaar />
      </motion.main>
    </div>
  )
}

export default Home
