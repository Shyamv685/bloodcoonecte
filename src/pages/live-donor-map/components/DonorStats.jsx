import { useState } from 'react'

export default function DonorStats({ stats = {} }) {
  const [hoveredStat, setHoveredStat] = useState(null)

  const statsData = [
    { label: 'Available', value: stats.availableDonors || 6, icon: '👥' },
    { label: 'Busy', value: Math.floor((stats.totalDonors || 0) * 0.2) || 2, icon: '🕐' },
    { label: 'In Range', value: stats.totalDonors || 8, icon: '📍' },
    { label: 'Active Now', value: (stats.availableDonors || 0) + 3 || 9, icon: '💓' },
  ]

  return (
    <div className="bg-white rounded-lg shadow-md p-4 md:p-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap gap-6">
          {statsData.map((stat, index) => (
            <div
              key={index}
              onMouseEnter={() => setHoveredStat(index)}
              onMouseLeave={() => setHoveredStat(null)}
              className={`flex items-center gap-2 transition-all duration-200 ${
                hoveredStat === index ? 'scale-110' : ''
              }`}
            >
              <span className={`text-2xl transition-transform duration-200 ${
                hoveredStat === index ? 'scale-125 rotate-12' : ''
              }`}>{stat.icon}</span>
              <div>
                <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                <div className="text-xs text-gray-600">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm text-gray-600">
              Updated {new Date().toLocaleTimeString()}
            </span>
          </div>
          <button
            onClick={() => alert('Switching to list view...')}
            onMouseEnter={(e) => e.currentTarget.classList.add('bg-gray-200', 'scale-105')}
            onMouseLeave={(e) => e.currentTarget.classList.remove('bg-gray-200', 'scale-105')}
            className="px-4 py-2 bg-gray-100 rounded text-sm hover:bg-gray-200 transition-all duration-200 flex items-center gap-2 transform hover:scale-105 active:scale-95"
          >
            <span>📋</span>
            <span>List View</span>
          </button>
        </div>
      </div>
    </div>
  )
}
