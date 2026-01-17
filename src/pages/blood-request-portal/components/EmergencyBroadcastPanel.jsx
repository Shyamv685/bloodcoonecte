import { useState } from 'react'
import { useData } from '../../../contexts/DataContext'
import Button from '../../../components/ui/Button'

export default function EmergencyBroadcastPanel() {
  const { addEmergency, emergencies } = useData()
  const [isBroadcasting, setIsBroadcasting] = useState(false)

  const handleEmergencyBroadcast = async () => {
    if (!confirm('Are you sure you want to send an emergency broadcast to all nearby donors?')) {
      return
    }

    setIsBroadcasting(true)
    try {
      // In a real app, this would send notifications to all donors
      addEmergency({
        bloodType: 'URGENT',
        location: 'All Areas',
        urgency: 'Critical',
        message: 'Emergency blood request - All donors please respond',
      })
      
      alert('Emergency broadcast sent to all nearby donors!')
    } catch (error) {
      console.error('Error sending broadcast:', error)
      alert('Failed to send broadcast. Please try again.')
    } finally {
      setIsBroadcasting(false)
    }
  }

  return (
    <div className="bg-red-50 border border-red-200 rounded-lg shadow-md p-4 md:p-6">
      <h2 className="text-xl font-semibold mb-4 text-red-800">
        Emergency Broadcast
      </h2>
      <p className="text-sm text-gray-700 mb-4">
        Broadcast urgent blood requests to all nearby donors instantly.
      </p>
      <div className="mb-4">
        <p className="text-xs text-gray-600 mb-2">Active Emergencies: {emergencies.length}</p>
      </div>
      <Button 
        variant="danger" 
        className="w-full"
        onClick={handleEmergencyBroadcast}
        disabled={isBroadcasting}
      >
        {isBroadcasting ? 'Broadcasting...' : 'Send Emergency Alert'}
      </Button>
    </div>
  )
}
