import { cn } from '../../utils/cn'

export default function Button({
  children,
  className = '',
  variant = 'primary',
  size = 'md',
  disabled = false,
  onClick,
  type = 'button',
  ...props
}) {
  const variants = {
    primary: 'bg-red-600 hover:bg-red-700 active:bg-red-800 text-white shadow-md hover:shadow-lg',
    secondary: 'bg-white hover:bg-gray-50 active:bg-gray-100 text-gray-700 border border-gray-300',
    danger: 'bg-red-600 hover:bg-red-700 active:bg-red-800 text-white',
    success: 'bg-green-600 hover:bg-green-700 active:bg-green-800 text-white',
    ghost: 'bg-transparent hover:bg-gray-100 active:bg-gray-200 text-gray-700',
  }

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  }

  const disabledStyles = disabled
    ? 'opacity-50 cursor-not-allowed pointer-events-none'
    : 'transition-all duration-200 ease-in-out transform hover:scale-105 active:scale-95'

  return (
    <button
      type={type}
      className={cn(
        'rounded-lg font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500',
        variants[variant],
        sizes[size],
        disabledStyles,
        className
      )}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  )
}
