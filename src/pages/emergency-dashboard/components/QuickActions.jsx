import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

export default function QuickActions() {
  const navigate = useNavigate()
  const [hoveredIndex, setHoveredIndex] = useState(null)

  const actions = [
    {
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
      ),
      title: 'New Blood Request',
      subtitle: 'Submit urgent or scheduled requirement',
      color: 'blue',
      onClick: () => navigate('/blood-request-portal'),
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      ),
      title: 'Emergency Protocols',
      subtitle: 'Activate emergency responses',
      color: 'red',
      onClick: () => navigate('/emergency-dashboard'),
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      title: 'View Donors',
      subtitle: 'Browse and contact donors',
      color: 'green',
      onClick: () => navigate('/live-donor-map'),
    },
  ]

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 h-full flex flex-col">
      <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
        <div className="p-2 bg-gray-50 rounded-lg">
          <svg className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>
        <h2 className="text-xl font-bold text-gray-800">Quick Actions</h2>
      </div>

      <div className="flex flex-col gap-4 flex-grow justify-center">
        {actions.map((action, index) => (
          <button
            key={index}
            onClick={action.onClick}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            className={`relative overflow-hidden w-full p-4 rounded-xl text-left transition-all duration-300 group ${
              action.color === 'red'
                ? 'bg-gradient-to-r from-red-600 to-red-500 text-white shadow-md hover:shadow-red-500/30'
                : action.color === 'blue'
                ? 'bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-md hover:shadow-blue-500/30'
                : action.color === 'green'
                ? 'bg-gradient-to-r from-emerald-600 to-emerald-500 text-white shadow-md hover:shadow-emerald-500/30'
                : 'bg-white border-2 border-gray-200'
            } transform hover:-translate-y-1`}
          >
            {/* Background decorative element */}
            <div className="absolute -right-4 -top-4 w-24 h-24 bg-white opacity-10 rounded-full transform scale-0 group-hover:scale-150 transition-transform duration-500 ease-out" />
            
            <div className="flex items-center gap-4 relative z-10">
              <div className={`p-3 rounded-xl transition-transform duration-300 ${
                action.color === 'red' ? 'bg-red-500/30 text-white' :
                action.color === 'blue' ? 'bg-blue-500/30 text-white' :
                action.color === 'green' ? 'bg-emerald-500/30 text-white' :
                'bg-gray-100 text-gray-600'
              } ${hoveredIndex === index ? 'rotate-12 scale-110' : 'rotate-0 scale-100'}`}>
                {action.icon}
              </div>
              
              <div className="flex-1">
                <p className="font-bold text-lg leading-tight mb-1">{action.title}</p>
                <p className={`text-sm leading-snug ${
                  action.color === 'red' ? 'text-red-100' :
                  action.color === 'blue' ? 'text-blue-100' :
                  action.color === 'green' ? 'text-emerald-100' :
                  'text-gray-600'
                }`}>
                  {action.subtitle}
                </p>
              </div>
              
              <div className={`opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 ${
                  action.color === 'red' ? 'text-red-100' :
                  action.color === 'blue' ? 'text-blue-100' :
                  action.color === 'green' ? 'text-emerald-100' :
                  'text-gray-400'
              }`}>
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
