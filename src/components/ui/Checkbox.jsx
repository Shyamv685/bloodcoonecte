import { cn } from '../../utils/cn'

export default function Checkbox({ className = '', ...props }) {
  return (
    <input
      type="checkbox"
      className={cn('w-4 h-4 text-blue-600 rounded focus:ring-blue-500', className)}
      {...props}
    />
  )
}
