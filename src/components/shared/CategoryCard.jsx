import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import Card from '../ui/Card'

const CategoryCard = ({ category, index }) => {
  const navigate = useNavigate()

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
    >
      <Card
        hover
        onClick={() => navigate(`/categories?category=${category.slug}`)}
        className="p-6 text-center cursor-pointer"
      >
        <div className="text-4xl mb-3">{category.icon}</div>
        <h3 className="font-semibold text-slate-900 dark:text-slate-50">
          {category.name}
        </h3>
      </Card>
    </motion.div>
  )
}

export default CategoryCard
