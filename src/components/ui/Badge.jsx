import { cn } from '../../utils/cn'

const Badge = ({ children, variant = 'default', className }) => {
  const variants = {
    default: 'badge bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300',
    new: 'badge-new',
    used: 'badge-used',
    discount: 'badge-discount',
    primary: 'badge bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400',
    success: 'badge bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400',
    warning: 'badge bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400',
    danger: 'badge bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400',
  }

  return (
    <span className={cn(variants[variant], className)}>
      {children}
    </span>
  )
}

export default Badge
