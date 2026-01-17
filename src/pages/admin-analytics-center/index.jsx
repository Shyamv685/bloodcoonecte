import { useData } from '../../contexts/DataContext'
import StatCard from './components/StatCard'
import UserManagementTable from './components/UserManagementTable'
import PerformanceChart from './components/PerformanceChart'
import SystemHealthMonitor from './components/SystemHealthMonitor'
import AlertsPanel from './components/AlertsPanel'
import VerificationQueue from './components/VerificationQueue'
import ComplianceAuditLog from './components/ComplianceAuditLog'

export default function AdminAnalyticsCenter() {
  const { getStats, bloodRequests, donors, emergencies } = useData()
  const stats = getStats()

  return (
    <div className="min-h-screen bg-gray-50 py-4 md:py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 md:mb-8">
          Admin Analytics Center
        </h1>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 mb-6 md:mb-8">
          <StatCard title="Total Users" value={stats.totalDonors.toString()} color="blue" />
          <StatCard title="Active Donors" value={stats.availableDonors.toString()} color="green" />
          <StatCard title="Pending Requests" value={stats.activeRequests.toString()} color="yellow" />
          <StatCard title="System Health" value="98%" color="green" />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 mb-6 md:mb-8">
          <PerformanceChart stats={stats} />
          <SystemHealthMonitor />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 mb-6 md:mb-8">
          <AlertsPanel emergencies={emergencies} />
          <VerificationQueue />
        </div>
        <div className="mb-6 md:mb-8">
          <UserManagementTable donors={donors} />
        </div>
        <ComplianceAuditLog requests={bloodRequests} />
      </div>
    </div>
  )
}
