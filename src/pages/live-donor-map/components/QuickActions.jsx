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
    { 
      icon: '🔄', 
      title: 'Update Status', 
      subtitle: 'Change availability', 
      color: 'white',
      onClick: () => alert('Update donor status feature coming soon!'),
    },
    { 
      icon: '🕐', 
      title: 'View History', 
      subtitle: 'Check past requests', 
      color: 'white',
      onClick: () => navigate('/hospital-management-center'),
    },
  ]

  return (
    <div className="bg-white rounded-lg shadow-md p-4 md:p-6">
      <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
      <div className="grid grid-cols-2 gap-3">
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
            <div className={`text-2xl mb-2 transition-transform duration-200 ${
              hoveredIndex === index ? 'scale-110 rotate-3' : ''
            }`}>{action.icon}</div>
            <p className="font-semibold text-sm">{action.title}</p>
            <p className={`text-xs ${action.color === 'red' ? 'text-red-100' : 'text-gray-600'}`}>
              {action.subtitle}
            </p>
          </button>
        ))}
      </div>
    </div>
  )
}
