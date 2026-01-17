import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { useState } from 'react'
import Logo from '../Logo'

export default function Header() {
  const auth = useAuth()
  const user = auth?.user || null
  const signOut = auth?.signOut || (async () => {})
  const location = useLocation()
  const navigate = useNavigate()
  const [showAlerts, setShowAlerts] = useState(false)

  const currentPath = location.pathname

  const handleProfileClick = () => {
    if (user) {
      // In a real app, this would navigate to profile or show dropdown
      alert('Profile clicked!')
    } else {
      navigate('/donor-registration')
    }
  }

  const handleAlertsClick = () => {
    setShowAlerts(!showAlerts)
    navigate('/critical-alerts')
  }

  const navLinks = [
    { path: '/emergency-dashboard', label: 'Emergency Dashboard' },
    { path: '/donor-registration', label: 'Become a Donor' },
    { path: '/blood-request-portal', label: 'Request Blood' },
    { path: '/live-donor-map', label: 'Live Map' },
    { path: '/hospital-management-center', label: 'Hospital Center' },
  ]

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 md:px-8 py-4">
        <div className="flex justify-between items-center">
          <Link to="/">
            <Logo />
          </Link>
          
          <nav className="hidden md:flex gap-1 items-center">
            {navLinks.map((link) => {
              const isActive = currentPath === link.path || 
                (link.path === '/hospital-management-center' && currentPath.startsWith('/hospital'))
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-red-600 text-white shadow-md'
                      : 'text-gray-700 hover:bg-red-50 hover:text-red-600'
                  }`}
                >
                  {link.label}
                </Link>
              )
            })}
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={handleAlertsClick}
              className="relative p-2 text-gray-700 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200 group"
            >
              <span className="text-xl">🔔</span>
              <span className="absolute top-0 right-0 w-2 h-2 bg-red-600 rounded-full animate-pulse"></span>
              <span className="hidden md:inline ml-2 group-hover:font-medium">Alerts</span>
            </button>
            
            <button
              onClick={handleProfileClick}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center gap-2 ${
                user
                  ? 'bg-red-600 text-white hover:bg-red-700 shadow-md hover:shadow-lg'
                  : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-red-300'
              }`}
            >
              <span className="text-lg">👤</span>
              <span className="hidden md:inline">Profile</span>
            </button>
          </div>
        </div>

        {/* Mobile navigation */}
        <nav className="md:hidden mt-4 flex flex-wrap gap-2">
          {navLinks.map((link) => {
            const isActive = currentPath === link.path
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm px-3 py-2 rounded transition-all duration-200 ${
                  isActive
                    ? 'bg-red-600 text-white'
                    : 'text-gray-700 hover:bg-red-50 hover:text-red-600'
                }`}
              >
                {link.label}
              </Link>
            )
          })}
        </nav>
      </div>
    </header>
  )
}
