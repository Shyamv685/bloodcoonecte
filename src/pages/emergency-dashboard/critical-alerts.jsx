import { useData } from '../../contexts/DataContext'
import AlertCard from './components/AlertCard'
import RecentActivityFeed from './components/RecentActivityFeed'

export default function CriticalAlerts() {
  const { emergencies, bloodRequests, donors } = useData()

  const criticalAlerts = emergencies
    .filter(e => e.urgency === 'Critical' || e.urgency === 'Urgent')
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .map((emergency, index) => ({
      ...emergency,
      type: emergency.urgency === 'Critical' ? 'critical' : 'urgent',
      color: emergency.urgency === 'Critical' ? 'red' : 'orange',
      postedTime: `${index * 10 + 5}m ago`,
    }))

  const activities = [
    {
      icon: '🩸',
      color: 'blue',
      message: 'request for O- blood type',
      time: '8 minutes ago',
    },
    {
      icon: '⚠️',
      color: 'red',
      message: 'New blood request created by Memorial Medical Center',
      time: '15 minutes ago',
    },
    {
      icon: '➕',
      color: 'yellow',
      message: 'Sarah Johnson registered as new donor with AB+ blood type',
      time: '23 minutes ago',
    },
    {
      icon: '❤️',
      color: 'green',
      message: 'David Chen scheduled donation appointment for next week',
      time: '35 minutes ago',
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 md:px-8 py-6 md:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Critical Alerts */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Critical Alerts</h1>
              <a href="#" className="text-red-600 hover:underline">View All</a>
            </div>

            <div className="space-y-4">
              {criticalAlerts.length > 0 ? (
                criticalAlerts.map((alert) => (
                  <AlertCard key={alert.id} alert={alert} />
                ))
              ) : (
                <div className="bg-white rounded-lg shadow-md p-8 text-center">
                  <p className="text-gray-500">No critical alerts at this time</p>
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Recent Activity */}
          <div>
            <RecentActivityFeed activities={activities} />
          </div>
        </div>
      </div>
    </div>
  )
}
