import { motion } from 'framer-motion'
import { Sparkles, Scan, Ruler, CheckCircle } from 'lucide-react'
import Button from '../../components/ui/Button'

const AIFeatureBanner = () => {
  return (
    <section className="py-16 bg-gradient-to-br from-primary-500 to-primary-700 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-64 h-64 bg-white rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-white"
          >
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
              <Sparkles className="w-5 h-5" />
              <span className="text-sm font-medium">AI-Powered Technology</span>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Never Buy the Wrong Size Again
            </h2>
            <p className="text-lg text-white/90 mb-8">
              Our advanced AI analyzes your body measurements and recommends the perfect size for every clothing item. Say goodbye to returns and hello to the perfect fit.
            </p>

            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Scan className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Quick Body Scan</h3>
                  <p className="text-sm text-white/80">Upload a photo or enter measurements</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Ruler className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">AI Size Matching</h3>
                  <p className="text-sm text-white/80">Get personalized size recommendations</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Perfect Fit Guarantee</h3>
                  <p className="text-sm text-white/80">95% accuracy rate across all brands</p>
                </div>
              </div>
            </div>

            <Button size="lg" variant="secondary">
              Try AI Size Finder
            </Button>
          </motion.div>

          {/* Right Illustration */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="relative bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20">
              <img
                src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600&q=80"
                alt="AI Size Recommendation"
                className="rounded-2xl shadow-2xl"
              />
              
              {/* Floating Cards */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute -top-4 -right-4 bg-white rounded-xl shadow-lg p-4"
              >
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-600">Perfect Match</p>
                    <p className="text-sm font-bold text-slate-900">Size M</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                className="absolute -bottom-4 -left-4 bg-white rounded-xl shadow-lg p-4"
              >
                <div className="flex items-center gap-2">
                  <Sparkles className="w-8 h-8 text-primary-500" />
                  <div>
                    <p className="text-xs text-slate-600">AI Confidence</p>
                    <p className="text-sm font-bold text-slate-900">98%</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default AIFeatureBanner
