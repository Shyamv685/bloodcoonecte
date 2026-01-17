import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

export default function QuickActions() {
  const navigate = useNavigate()
  const [hoveredIndex, setHoveredIndex] = useState(null)

  const actions = [
    {
      icon: '+',
      title: 'New Blood Request',
      subtitle: 'Submit urgent or scheduled blood requirement',
      color: 'blue',
      onClick: () => navigate('/blood-request-portal'),
    },
    {
      icon: '🛡️',
      title: 'Emergency Protocols',
      subtitle: 'Activate pre-configured emergency responses',
      color: 'red',
      onClick: () => navigate('/emergency-dashboard'),
    },
    {
      icon: '👥',
      title: 'View Donors',
      subtitle: 'Browse and contact matched donors',
      color: 'green',
      onClick: () => navigate('/live-donor-map'),
    },
  ]

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {actions.map((action, index) => (
          <button
            key={index}
            onClick={action.onClick}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            className={`p-6 rounded-lg text-left transition-all duration-200 min-h-[140px] ${
              action.color === 'red'
                ? 'bg-red-600 text-white hover:bg-red-700 shadow-md hover:shadow-lg'
                : action.color === 'blue'
                ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-md hover:shadow-lg'
                : action.color === 'green'
                ? 'bg-green-600 text-white hover:bg-green-700 shadow-md hover:shadow-lg'
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
                  action.color === 'red' ? 'text-red-100' :
                  action.color === 'blue' ? 'text-blue-100' :
                  action.color === 'green' ? 'text-green-100' :
                  'text-gray-600'
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
