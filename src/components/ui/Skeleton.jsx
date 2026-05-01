import { cn } from '../../utils/cn'

const Skeleton = ({ className, ...props }) => {
  return (
    <div
      className={cn('skeleton rounded-lg', className)}
      {...props}
    />
  )
}

export const ProductCardSkeleton = () => {
  return (
    <div className="card p-4">
      <Skeleton className="w-full aspect-square mb-4" />
      <Skeleton className="h-4 w-3/4 mb-2" />
      <Skeleton className="h-4 w-1/2 mb-3" />
      <div className="flex items-center justify-between">
        <Skeleton className="h-6 w-20" />
        <Skeleton className="h-8 w-8 rounded-full" />
      </div>
    </div>
  )
}

export default Skeleton
