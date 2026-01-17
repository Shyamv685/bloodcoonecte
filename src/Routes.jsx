import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import { DataProvider } from './contexts/DataContext'
import ErrorBoundary from './components/ErrorBoundary'
import ScrollToTop from './components/ScrollToTop'
import Header from './components/ui/Header'
import NotFound from './pages/NotFound'
import BloodRequestPortal from './pages/blood-request-portal'
import DonorRegistration from './pages/donor-registration'
import EmergencyDashboard from './pages/emergency-dashboard'
import CriticalAlerts from './pages/emergency-dashboard/critical-alerts'
import HospitalManagementCenter from './pages/hospital-management-center'
import LiveDonorMap from './pages/live-donor-map'
import AdminAnalyticsCenter from './pages/admin-analytics-center'
import Dashboard from './pages/dashboard'

function AppRoutes() {
  return (
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <ErrorBoundary>
        <AuthProvider>
          <DataProvider>
            <ScrollToTop />
            <div className="min-h-screen bg-gray-50">
              <Header />
              <main>
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/blood-request-portal" element={<BloodRequestPortal />} />
                <Route path="/donor-registration" element={<DonorRegistration />} />
                <Route path="/emergency-dashboard" element={<EmergencyDashboard />} />
                <Route path="/critical-alerts" element={<CriticalAlerts />} />
                <Route path="/hospital-management-center" element={<HospitalManagementCenter />} />
                  <Route path="/live-donor-map" element={<LiveDonorMap />} />
                  <Route path="/admin-analytics-center" element={<AdminAnalyticsCenter />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>
            </div>
          </DataProvider>
        </AuthProvider>
      </ErrorBoundary>
    </BrowserRouter>
  )
}

export default AppRoutes
