import { useState } from 'react'
import { Search, Mic, X } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { CATEGORIES } from '../../utils/constants'

const SearchBar = ({ className }) => {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('all')
  const navigate = useNavigate()

  const handleSearch = (e) => {
    e.preventDefault()
    if (query.trim()) {
      navigate(`/categories?search=${encodeURIComponent(query)}&category=${category}`)
    }
  }

  const handleVoiceSearch = () => {
    // Voice search functionality (would require Web Speech API)
    alert('Voice search feature coming soon!')
  }

  return (
    <form onSubmit={handleSearch} className={className}>
      <div className="flex items-center gap-2 bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
        {/* Category Dropdown */}
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="px-4 py-3 bg-transparent border-r border-slate-200 dark:border-slate-700 text-sm font-medium text-slate-700 dark:text-slate-300 focus:outline-none cursor-pointer"
        >
          <option value="all">All</option>
          {CATEGORIES.map((cat) => (
            <option key={cat.id} value={cat.slug}>
              {cat.name}
            </option>
          ))}
        </select>

        {/* Search Input */}
        <div className="flex-1 flex items-center gap-2 px-4">
          <Search className="w-5 h-5 text-slate-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for products..."
            className="flex-1 py-3 bg-transparent text-slate-900 dark:text-slate-50 placeholder:text-slate-400 focus:outline-none"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              className="p-1 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-full transition-colors"
            >
              <X className="w-4 h-4 text-slate-400" />
            </button>
          )}
        </div>

        {/* Voice Search Button */}
        <button
          type="button"
          onClick={handleVoiceSearch}
          className="p-3 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
          title="Voice search"
        >
          <Mic className="w-5 h-5 text-slate-600 dark:text-slate-400" />
        </button>

        {/* Search Button */}
        <button
          type="submit"
          className="px-6 py-3 bg-primary-500 hover:bg-primary-600 text-white font-medium transition-colors"
        >
          Search
        </button>
      </div>
    </form>
  )
}

export default SearchBar
