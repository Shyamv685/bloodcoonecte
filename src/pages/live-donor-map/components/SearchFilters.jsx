import { useState } from 'react'

export default function SearchFilters({
  selectedBloodType,
  searchRadius,
  onBloodTypeChange,
  onRadiusChange,
  onUseCurrentLocation,
  availableDonors,
}) {
  const [isRefreshing, setIsRefreshing] = useState(false)

  const handleRefresh = () => {
    setIsRefreshing(true)
    setTimeout(() => {
      setIsRefreshing(false)
      alert('Filters refreshed!')
    }, 500)
  }

  const handleUseLocation = () => {
    onUseCurrentLocation()
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-4 md:p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <span className="text-red-600">🔍</span> Search Filters
        </h3>
        <button
          onClick={handleRefresh}
          disabled={isRefreshing}
          onMouseEnter={(e) => e.currentTarget.classList.add('bg-gray-100', 'rotate-180')}
          onMouseLeave={(e) => {
            e.currentTarget.classList.remove('bg-gray-100')
            if (!isRefreshing) {
              e.currentTarget.classList.remove('rotate-180')
            }
          }}
          className={`p-2 hover:bg-gray-100 rounded transition-all duration-300 ${
            isRefreshing ? 'animate-spin' : ''
          }`}
        >
          <span className="text-lg">🔄</span>
        </button>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Blood Type
          </label>
          <select
            value={selectedBloodType}
            onChange={(e) => onBloodTypeChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 transition-all duration-200 hover:border-red-300"
          >
            <option value="All Types">All Blood Types</option>
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Search Radius
          </label>
          <select
            value={searchRadius}
            onChange={(e) => onRadiusChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 transition-all duration-200 hover:border-red-300"
          >
            <option value="5">5 km</option>
            <option value="10">10 km</option>
            <option value="20">20 km</option>
            <option value="50">50 km</option>
          </select>
        </div>

        <button
          onClick={handleUseLocation}
          onMouseEnter={(e) => {
            e.currentTarget.classList.add('bg-red-700', 'shadow-lg', 'scale-105')
          }}
          onMouseLeave={(e) => {
            e.currentTarget.classList.remove('bg-red-700', 'shadow-lg', 'scale-105')
          }}
          className="w-full px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 active:bg-red-800 shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2 transform hover:scale-105 active:scale-95 font-medium"
        >
          <span>📍</span>
          <span>Use Current Location</span>
        </button>

        <div className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
          <div className="flex items-center gap-2">
            <span className="text-xl">👥</span>
            <div>
              <div className="font-semibold text-gray-900">{availableDonors} Available Donors</div>
            </div>
          </div>
        </div>

        <div className="flex items-start gap-2 text-xs text-gray-600">
          <span>ℹ️</span>
          <p>Map shows real-time donor availability. Click on markers to view donor details and contact options.</p>
        </div>
      </div>
    </div>
  )
}
