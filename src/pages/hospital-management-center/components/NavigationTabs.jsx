import { useState } from 'react'

export default function NavigationTabs({ activeTab, setActiveTab }) {
  const tabs = [
    { id: 'overview', label: 'Overview', icon: '▦' },
    { id: 'requests', label: 'Active Requests', icon: '📄' },
    { id: 'donors', label: 'Matched Donors', icon: '👥' },
    { id: 'protocols', label: 'Emergency Protocols', icon: '🛡️' },
    { id: 'activity', label: 'Recent Activity', icon: '💓' },
  ]

  return (
    <div className="flex gap-2 overflow-x-auto pb-2 mb-6 scrollbar-hide">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          onMouseEnter={(e) => {
            if (activeTab !== tab.id) {
              e.currentTarget.classList.add('bg-gray-50')
            }
          }}
          onMouseLeave={(e) => {
            if (activeTab !== tab.id) {
              e.currentTarget.classList.remove('bg-gray-50')
            }
          }}
          className={`px-4 py-3 rounded-lg font-medium transition-all duration-200 whitespace-nowrap flex items-center gap-2 ${
            activeTab === tab.id
              ? 'bg-red-600 text-white shadow-md transform scale-105'
              : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200 hover:border-gray-300'
          }`}
        >
          <span>{tab.icon}</span>
          <span>{tab.label}</span>
        </button>
      ))}
    </div>
  )
}
