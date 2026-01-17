import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'

export default function QuickActionCard({ action }) {
  const navigate = useNavigate()
  const [isHovered, setIsHovered] = useState(false)

  const colorClasses = {
    red: 'bg-red-50 border-red-200 hover:bg-red-100 hover:border-red-400 hover:shadow-lg',
    green: 'bg-green-50 border-green-200 hover:bg-green-100 hover:border-green-400 hover:shadow-lg',
    orange: 'bg-orange-50 border-orange-200 hover:bg-orange-100 hover:border-orange-400 hover:shadow-lg',
  }

  const iconColors = {
    red: 'text-red-600',
    green: 'text-green-600',
    orange: 'text-orange-600',
  }

  const handleClick = () => {
    navigate(action.action)
  }

  return (
    <div
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`bg-white rounded-lg shadow-md p-6 border-2 ${colorClasses[action.color]} transition-all duration-300 cursor-pointer h-full transform ${
        isHovered ? 'scale-105 -translate-y-1' : 'scale-100'
      }`}
    >
      <div className={`text-4xl mb-4 transition-transform duration-300 ${
        isHovered ? 'scale-110 rotate-3' : ''
      } ${iconColors[action.color]}`}>
        {action.icon}
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">
        {action.title}
      </h3>
      <p className="text-gray-600 text-sm">
        {action.description}
      </p>
    </div>
  )
}
