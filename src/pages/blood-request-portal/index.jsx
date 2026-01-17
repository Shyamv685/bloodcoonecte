import { useData } from '../../contexts/DataContext'
import RequestForm from './components/RequestForm'
import MetricsCards from './components/MetricsCards'
import EmergencyBroadcast from './components/EmergencyBroadcast'

export default function BloodRequestPortal() {
  const { getStats } = useData()
  const stats = getStats()

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 md:px-8 py-6 md:py-8">
        {/* Banner */}
        <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-6 text-center">
          <div className="flex items-center justify-center gap-2">
            <span className="text-red-600">❤️</span>
            <span className="text-red-800 font-medium">Emergency Blood Request System</span>
          </div>
        </div>

        {/* Title */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            Request Blood Donation
          </h1>
          <p className="text-gray-600 text-lg">
            Connect with nearby compatible donors instantly. Our intelligent matching system broadcasts your request to verified donors in real-time.
          </p>
        </div>

        {/* Metrics Cards */}
        <MetricsCards stats={stats} />

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
          <div className="lg:col-span-2">
            <RequestForm />
          </div>
          <div>
            <EmergencyBroadcast />
          </div>
        </div>
      </div>
    </div>
  )
}
