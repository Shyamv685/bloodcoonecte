import { cn } from '../../utils/cn'

export default function Select({ className = '', children, ...props }) {
  return (
    <select
      className={cn(
        'w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500',
        className
      )}
      {...props}
    >
      {children}
    </select>
  )
}
