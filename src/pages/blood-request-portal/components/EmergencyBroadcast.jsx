import { useData } from '../../../contexts/DataContext'
import { useState } from 'react'

export default function EmergencyBroadcast() {
  const { addEmergency } = useData()
  const [isHovered, setIsHovered] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleEmergencyBroadcast = async () => {
    if (!confirm('Are you sure you want to send an emergency broadcast to all compatible donors?')) {
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
        alert('Emergency broadcast sent to all nearby donors!')
        setIsLoading(false)
      }, 500)
    } catch (error) {
      console.error('Error sending broadcast:', error)
      alert('Failed to send broadcast. Please try again.')
      setIsLoading(false)
    }
  }

  return (
    <div 
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="bg-gradient-to-r from-red-600 to-orange-600 rounded-lg shadow-lg p-6 md:p-8 text-white transition-all duration-300 transform hover:shadow-xl"
    >
      <div className="flex items-start gap-4 mb-4">
        <div className={`w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center flex-shrink-0 transition-transform duration-300 ${
          isHovered ? 'scale-110 rotate-12' : ''
        }`}>
          <span className="text-2xl">⚠️</span>
        </div>
        <div>
          <h2 className="text-xl md:text-2xl font-bold mb-2">
            Critical Emergency? Use Emergency Broadcast
          </h2>
          <p className="text-red-50 text-sm md:text-base">
            For life-threatening situations, instantly notify all compatible donors within your selected radius.
          </p>
        </div>
      </div>
      <button
        onClick={handleEmergencyBroadcast}
        disabled={isLoading}
        onMouseEnter={(e) => e.currentTarget.classList.add('bg-green-700', 'shadow-lg', 'scale-105')}
        onMouseLeave={(e) => e.currentTarget.classList.remove('bg-green-700', 'shadow-lg', 'scale-105')}
        className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg flex items-center justify-center gap-2 transition-all duration-200 transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <span className={`transition-transform duration-200 ${isLoading ? 'animate-spin' : ''}`}>📡</span>
        <span>{isLoading ? 'Broadcasting...' : 'Show Emergency Broadcast'}</span>
      </button>
    </div>
  )
}
