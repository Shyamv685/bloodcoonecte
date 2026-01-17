import { useData } from '../../../contexts/DataContext'

export default function QuickStatsPanel() {
  const { getStats } = useData()
  const stats = getStats()

  return (
    <div className="bg-white rounded-lg shadow-md p-4 md:p-6">
      <h2 className="text-xl font-semibold mb-4">Quick Stats</h2>
      <div className="space-y-4">
        <div className="p-3 bg-red-50 rounded-lg">
          <p className="text-sm text-gray-600 mb-1">Active Requests</p>
          <p className="text-2xl md:text-3xl font-bold text-red-600">{stats.activeRequests}</p>
        </div>
        <div className="p-3 bg-green-50 rounded-lg">
          <p className="text-sm text-gray-600 mb-1">Available Donors</p>
          <p className="text-2xl md:text-3xl font-bold text-green-600">{stats.availableDonors}</p>
        </div>
        <div className="p-3 bg-blue-50 rounded-lg">
          <p className="text-sm text-gray-600 mb-1">Today's Requests</p>
          <p className="text-2xl md:text-3xl font-bold text-blue-600">{stats.totalRequests}</p>
        </div>
        <div className="p-3 bg-yellow-50 rounded-lg">
          <p className="text-sm text-gray-600 mb-1">Fulfilled</p>
          <p className="text-2xl md:text-3xl font-bold text-yellow-600">{stats.fulfilledRequests}</p>
        </div>
      </div>
    </div>
  )
}
