import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

export default function QuickActions() {
  const navigate = useNavigate()
  const [hoveredIndex, setHoveredIndex] = useState(null)

  const actions = [
    {
      icon: '⚠️',
      title: 'Emergency Request',
      subtitle: 'Create Emergency Request',
      color: 'red',
      onClick: () => navigate('/blood-request-portal'),
    },
    {
      icon: '🔍',
      title: 'Find Donor',
      subtitle: 'Search for a donor',
      color: 'white',
      onClick: () => navigate('/live-donor-map'),
    },
  ]

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
      <div className="grid grid-cols-1 gap-4">
        {actions.map((action, index) => (
          <button
            key={index}
            onClick={action.onClick}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            className={`p-4 rounded-lg text-left transition-all duration-200 ${
              action.color === 'red'
                ? 'bg-red-600 text-white hover:bg-red-700 shadow-md hover:shadow-lg'
                : 'bg-white border border-gray-300 hover:bg-gray-50 hover:border-gray-400'
            } transform ${
              hoveredIndex === index ? 'scale-105 -translate-y-1' : 'scale-100'
            }`}
          >
            <div className="flex items-center gap-3">
              <span className={`text-2xl transition-transform duration-200 ${
                hoveredIndex === index ? 'scale-110' : ''
              }`}>{action.icon}</span>
              <div>
                <p className="font-semibold">{action.title}</p>
                <p className={`text-sm ${
                  action.color === 'red' ? 'text-red-100' : 'text-gray-600'
                }`}>
                  {action.subtitle}
                </p>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
