import { useState } from 'react'
import { useData } from '../../contexts/DataContext'
import KPICard from './components/KPICard'
import DashboardTabs from './components/DashboardTabs'
import LiveDonorMapWidget from './components/LiveDonorMapWidget'
import QuickActions from './components/QuickActions'

export default function EmergencyDashboard() {
  const { getStats, bloodRequests, donors, emergencies } = useData()
  const stats = getStats()
  const [activeTab, setActiveTab] = useState('overview')

  const kpis = [
    {
      title: 'ACTIVE DONORS',
      value: stats.totalDonors.toLocaleString(),
      trend: '+12.5% vs last week',
      trendUp: true,
      icon: '👥',
      color: 'green',
    },
    {
      title: 'ACTIVE REQUESTS',
      value: stats.activeRequests.toString(),
      trend: '-8.3% vs yesterday',
      trendUp: false,
      icon: '⚠️',
      color: 'red',
    },
    {
      title: 'SUCCESSFUL MATCHES',
      value: stats.fulfilledRequests.toString(),
      trend: '+18.2% this month',
      trendUp: true,
      icon: '✓',
      color: 'blue',
    },
    {
      title: 'LIVES SAVED',
      value: (stats.fulfilledRequests * 3).toLocaleString(),
      trend: '+25.7% all time',
      trendUp: true,
      icon: '❤️',
      color: 'orange',
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 md:px-8 py-6 md:py-8">
        {/* Title and Subtitle */}
        <div className="mb-6">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Emergency Dashboard
          </h1>
          <p className="text-gray-600">
            Real-time monitoring and emergency response coordination
          </p>
        </div>

        {/* System Status */}
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6 flex items-center gap-3">
          <span className="text-green-600 text-xl">✓</span>
          <div className="flex-1">
            <span className="text-green-800 font-medium">System Status: All services operational</span>
            <span className="text-green-600 mx-2">•</span>
            <span className="text-green-600">
              Last updated: {new Date().toLocaleTimeString()}
            </span>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6">
          {kpis.map((kpi, index) => (
            <KPICard key={index} kpi={kpi} />
          ))}
        </div>

        {/* Tabs */}
        <DashboardTabs activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
            <div className="lg:col-span-2">
              <LiveDonorMapWidget />
            </div>
            <div>
              <QuickActions />
            </div>
          </div>
        )}

        {activeTab === 'alerts' && (
          <div className="mt-6">
            <h2 className="text-2xl font-bold mb-4">Emergency Alerts</h2>
            <div className="space-y-4">
              {emergencies.length > 0 ? (
                emergencies.map((emergency) => (
                  <div key={emergency.id} className="bg-white rounded-lg shadow-md p-6 border-l-4 border-red-500">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-semibold text-red-800">
                          {emergency.bloodType} - {emergency.urgency}
                        </h3>
                        <p className="text-gray-600 mt-1">{emergency.location}</p>
                        <p className="text-sm text-gray-500 mt-1">{emergency.time}</p>
                      </div>
                      <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-xs font-medium">
                        {emergency.urgency}
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="bg-white rounded-lg shadow-md p-8 text-center text-gray-500">
                  No emergency alerts at this time
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'requests' && (
          <div className="mt-6">
            <h2 className="text-2xl font-bold mb-4">Active Requests</h2>
            <div className="space-y-4">
              {bloodRequests.filter(r => r.status === 'Pending').map((request) => (
                <div key={request.id} className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-semibold">{request.bloodType}</h3>
                      <p className="text-gray-600">{request.location}</p>
                    </div>
                    <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded text-xs">
                      {request.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'donors' && (
          <div className="mt-6">
            <h2 className="text-2xl font-bold mb-4">Available Donors</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {donors.filter(d => d.available).map((donor) => (
                <div key={donor.id} className="bg-white rounded-lg shadow-md p-4">
                  <h3 className="font-semibold">{donor.name}</h3>
                  <p className="text-sm text-gray-600">Blood Type: {donor.bloodType}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
