import { cn } from '../../utils/cn'

const Card = ({ children, className, hover = false, ...props }) => {
  return (
    <div
      className={cn(
        'card',
        hover && 'hover:scale-[1.02] cursor-pointer',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

export default Card
