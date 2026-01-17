import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useData } from '../../contexts/DataContext'
import QuickActionCard from './components/QuickActionCard'
import RequestCard from './components/RequestCard'
import HospitalInfoCard from './components/HospitalInfoCard'
import MetricsCards from './components/MetricsCards'
import NavigationTabs from './components/NavigationTabs'

export default function HospitalManagementCenter() {
  const navigate = useNavigate()
  const { bloodRequests, getStats } = useData()
  const stats = getStats()
  const [activeTab, setActiveTab] = useState('overview')
  const [showNotifications, setShowNotifications] = useState(false)

  const quickActions = [
    {
      id: 1,
      icon: '➕',
      title: 'New Blood Request',
      description: 'Submit urgent or scheduled blood requirement',
      color: 'red',
      action: '/blood-request-portal'
    },
    {
      id: 2,
      icon: '🛡️',
      title: 'Emergency Protocols',
      description: 'Activate pre-configured emergency responses',
      color: 'green',
      action: '/emergency-dashboard'
    },
    {
      id: 3,
      icon: '👥',
      title: 'View Donors',
      description: 'Browse and contact matched donors',
      color: 'orange',
      action: '/live-donor-map'
    }
  ]

  const recentRequests = bloodRequests
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 10)
    .map((req, index) => ({
      ...req,
      requestId: `REQ-2026-${String(index + 1).padStart(3, '0')}`,
      donorsMatched: Math.floor(Math.random() * 10) + 1,
      timeElapsed: getTimeElapsed(req.createdAt),
    }))

  function getTimeElapsed(createdAt) {
    if (!createdAt) return 'Just now'
    const now = new Date()
    const created = new Date(createdAt)
    const diffMs = now - created
    const diffMins = Math.floor(diffMs / 60000)
    
    if (diffMins < 1) return 'Just now'
    if (diffMins < 60) return `${diffMins} mins`
    const diffHours = Math.floor(diffMins / 60)
    if (diffHours < 24) return `${diffHours} hours`
    const diffDays = Math.floor(diffHours / 24)
    return `${diffDays} days`
  }

  const handleNewRequest = () => {
    navigate('/blood-request-portal')
  }

  const handleNotifications = () => {
    setShowNotifications(!showNotifications)
    navigate('/critical-alerts')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 md:px-8 py-6 md:py-8">
        {/* Title and Subtitle */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2 flex-wrap gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
                Hospital Management Center
              </h1>
              <p className="text-gray-600 mt-1">
                Institutional dashboard for emergency blood supply coordination
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={handleNotifications}
                className="relative px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-all duration-200 flex items-center gap-2 transform hover:scale-105 active:scale-95"
              >
                <span>🔔</span>
                <span className="hidden md:inline">Notifications</span>
                <span className="absolute top-0 right-0 w-2 h-2 bg-red-600 rounded-full animate-pulse"></span>
              </button>
              <button
                onClick={handleNewRequest}
                onMouseEnter={(e) => e.currentTarget.classList.add('bg-red-700', 'shadow-lg', 'scale-105')}
                onMouseLeave={(e) => e.currentTarget.classList.remove('bg-red-700', 'shadow-lg', 'scale-105')}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 active:bg-red-800 shadow-md hover:shadow-lg transition-all duration-200 flex items-center gap-2 transform hover:scale-105 active:scale-95 font-medium"
              >
                <span>➕</span>
                <span className="hidden md:inline">New Request</span>
              </button>
            </div>
          </div>
        </div>

        {/* Hospital Info Card */}
        <HospitalInfoCard />

        {/* Metrics Cards */}
        <MetricsCards stats={stats} />

        {/* Navigation Tabs */}
        <NavigationTabs activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <>
            {/* Quick Actions Section */}
            <div className="mb-8 mt-6">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                Quick Actions
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                {quickActions.map((action) => (
                  <QuickActionCard key={action.id} action={action} />
                ))}
              </div>
            </div>

            {/* Recent Requests Section */}
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                Recent Requests
              </h2>
              <div className="space-y-4">
                {recentRequests.length > 0 ? (
                  recentRequests.map((request) => (
                    <RequestCard key={request.id} request={request} />
                  ))
                ) : (
                  <div className="bg-white rounded-lg shadow-md p-8 text-center">
                    <p className="text-gray-500 text-lg">No recent requests</p>
                    <p className="text-gray-400 text-sm mt-2">Create a new blood request to get started</p>
                  </div>
                )}
              </div>
            </div>
          </>
        )}

        {activeTab === 'requests' && (
          <div className="mt-6">
            <h2 className="text-2xl font-bold mb-4">Active Requests</h2>
            <div className="space-y-4">
              {recentRequests.filter(r => r.status === 'Pending').map((request) => (
                <RequestCard key={request.id} request={request} />
              ))}
            </div>
          </div>
        )}

        {activeTab === 'donors' && (
          <div className="mt-6">
            <h2 className="text-2xl font-bold mb-4">Matched Donors</h2>
            <div className="bg-white rounded-lg shadow-md p-6">
              <p className="text-gray-500 text-center">Donor matching feature coming soon</p>
            </div>
          </div>
        )}

        {activeTab === 'protocols' && (
          <div className="mt-6">
            <h2 className="text-2xl font-bold mb-4">Emergency Protocols</h2>
            <div className="bg-white rounded-lg shadow-md p-6">
              <p className="text-gray-500 text-center">Emergency protocols feature coming soon</p>
            </div>
          </div>
        )}

        {activeTab === 'activity' && (
          <div className="mt-6">
            <h2 className="text-2xl font-bold mb-4">Recent Activity</h2>
            <div className="bg-white rounded-lg shadow-md p-6">
              <p className="text-gray-500 text-center">Activity feed feature coming soon</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
