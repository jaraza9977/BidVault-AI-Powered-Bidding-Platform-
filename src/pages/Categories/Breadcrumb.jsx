import { Link } from 'react-router-dom'
import { ChevronRight, Home } from 'lucide-react'

const categoryNames = {
  electronics: 'Electronics',
  clothing: 'Clothing',
  books: 'Books',
  furniture: 'Furniture',
  mobiles: 'Mobile Phones',
  watches: 'Watches',
  sports: 'Sports',
  beauty: 'Beauty',
}

const Breadcrumb = ({ category }) => {
  return (
    <nav className="flex items-center gap-2 text-sm mb-6" aria-label="Breadcrumb">
      <Link
        to="/"
        className="flex items-center gap-1 text-slate-600 dark:text-slate-400 hover:text-primary-500 dark:hover:text-primary-400 transition-colors"
      >
        <Home className="w-4 h-4" />
        <span>Home</span>
      </Link>

      <ChevronRight className="w-4 h-4 text-slate-400" />

      <Link
        to="/categories"
        className="text-slate-600 dark:text-slate-400 hover:text-primary-500 dark:hover:text-primary-400 transition-colors"
      >
        Categories
      </Link>

      {category && (
        <>
          <ChevronRight className="w-4 h-4 text-slate-400" />
          <span className="text-slate-900 dark:text-slate-50 font-medium">
            {categoryNames[category] || category}
          </span>
        </>
      )}
    </nav>
  )
}

export default Breadcrumb
