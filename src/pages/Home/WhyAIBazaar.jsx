import { motion } from 'framer-motion'
import { ShoppingBag, Sparkles, Shield, TrendingUp } from 'lucide-react'

const features = [
  {
    icon: ShoppingBag,
    title: 'Unified Marketplace',
    description: 'Buy and sell new and used products all in one place. No need for multiple apps.',
    color: 'from-blue-500 to-blue-600',
  },
  {
    icon: Sparkles,
    title: 'AI Size Fit',
    description: 'Get perfect size recommendations powered by advanced AI technology.',
    color: 'from-purple-500 to-purple-600',
  },
  {
    icon: Shield,
    title: 'Secure Payments',
    description: 'Shop with confidence. All transactions are encrypted and buyer-protected.',
    color: 'from-green-500 to-green-600',
  },
  {
    icon: TrendingUp,
    title: 'Sell Used Items',
    description: 'Turn your unused items into cash. List for free and reach thousands of buyers.',
    color: 'from-orange-500 to-orange-600',
  },
]

const WhyAIBazaar = () => {
  return (
    <section className="py-16 bg-white dark:bg-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-slate-50 mb-4"
          >
            Why Choose AI Smart Bazaar?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto"
          >
            Pakistan's first AI-powered marketplace that makes shopping smarter and selling easier
          </motion.p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group"
              >
                <div className="relative bg-slate-50 dark:bg-slate-900 rounded-2xl p-6 h-full border border-slate-200 dark:border-slate-700 hover:border-primary-300 dark:hover:border-primary-700 transition-all hover:shadow-lg">
                  {/* Icon */}
                  <div className={`w-14 h-14 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <Icon className="w-7 h-7 text-white" />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-slate-900 dark:text-slate-50 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400">
                    {feature.description}
                  </p>

                  {/* Decorative Element */}
                  <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-primary-500/10 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default WhyAIBazaar
