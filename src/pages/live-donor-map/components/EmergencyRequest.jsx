import { useData } from '../../../contexts/DataContext'
import { useState } from 'react'

export default function EmergencyRequest() {
  const { addEmergency } = useData()
  const [isHovered, setIsHovered] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleEmergencyRequest = async () => {
    if (!confirm('Send emergency notifications to all available donors in your area?')) {
      return
    }

    setIsLoading(true)
    try {
      addEmergency({
        bloodType: 'URGENT',
        location: 'All Areas',
        urgency: 'Critical',
        message: 'Emergency blood request - All donors please respond',
      })
      
      setTimeout(() => {
        alert('Emergency request sent to all available donors!')
        setIsLoading(false)
      }, 500)
    } catch (error) {
      console.error('Error sending emergency request:', error)
      alert('Failed to send request. Please try again.')
      setIsLoading(false)
    }
  }

  return (
    <div 
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="bg-white rounded-lg shadow-md p-4 md:p-6 transition-all duration-300 hover:shadow-lg"
    >
      <div className="flex items-center gap-4">
        <div className={`w-12 h-12 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0 transition-transform duration-300 ${
          isHovered ? 'scale-110 rotate-12' : ''
        }`}>
          <span className="text-2xl">⚠️</span>
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900 mb-1">Emergency Blood Request</h3>
          <p className="text-sm text-gray-600">
            Need blood urgently? Click here to send emergency notifications to all available donors in your area.
          </p>
        </div>
        <button
          onClick={handleEmergencyRequest}
          disabled={isLoading}
          onMouseEnter={(e) => {
            if (!isLoading) {
              e.currentTarget.classList.add('bg-red-700', 'shadow-lg', 'scale-105')
            }
          }}
          onMouseLeave={(e) => {
            e.currentTarget.classList.remove('bg-red-700', 'shadow-lg', 'scale-105')
          }}
          className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 active:bg-red-800 shadow-md hover:shadow-lg transition-all duration-200 flex items-center gap-2 whitespace-nowrap transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
        >
          <span className={`transition-transform duration-200 ${isLoading ? 'animate-spin' : ''}`}>🚨</span>
          <span>{isLoading ? 'Sending...' : 'Emergency Request'}</span>
        </button>
      </div>
    </div>
  )
}
