import { useData } from '../../../contexts/DataContext'
import { useState } from 'react'

export default function AlertCard({ alert }) {
  const { updateBloodRequest } = useData()
  const [isResponding, setIsResponding] = useState(false)

  const handleRespond = async () => {
    setIsResponding(true)
    setTimeout(() => {
      alert('Thank you for responding! A coordinator will contact you shortly.')
      setIsResponding(false)
    }, 1000)
  }

  const handleShare = () => {
    const shareData = {
      title: `Emergency Blood Request - ${alert.bloodType}`,
      text: `Emergency situation: ${alert.location}. Blood type needed: ${alert.bloodType}`,
      url: window.location.href,
    }

    if (navigator.share) {
      navigator.share(shareData).catch((err) => {
        console.error('Error sharing:', err)
        fallbackShare()
      })
    } else {
      fallbackShare()
    }
  }

  const fallbackShare = () => {
    const text = `Emergency Blood Request - ${alert.bloodType}\nLocation: ${alert.location}`
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text)
      alert('Alert details copied to clipboard!')
    } else {
      alert(`Share this: ${text}`)
    }
  }

  return (
    <div className={`bg-white rounded-lg shadow-md p-6 border-l-4 transition-all duration-300 hover:shadow-xl ${
      alert.color === 'red' ? 'border-red-500' : 'border-orange-500'
    }`}>
      <div className="flex items-start gap-4">
        <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 transition-transform duration-300 hover:scale-110 ${
          alert.color === 'red' ? 'bg-red-100' : 'bg-orange-100'
        }`}>
          <span className="text-2xl">⚠️</span>
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-semibold text-gray-900">
              {alert.urgency === 'Critical' ? 'Critical Blood Shortage' : 'Urgent Request'} - {alert.bloodType}
            </h3>
            <span className="text-xs text-gray-500">{alert.postedTime}</span>
          </div>
          <p className="text-gray-700 mb-4">
            {alert.location === 'All Areas' 
              ? 'Emergency situation requiring immediate blood transfusion. Multiple units needed for ongoing treatment and stabilization.'
              : `Emergency situation at ${alert.location}. Patient requires immediate transfusion for major surgery scheduled in 2 hours.`}
          </p>
          <div className="flex flex-wrap gap-4 mb-4 text-sm">
            <div>
              <span className="font-medium text-gray-700">Blood Type:</span>
              <span className="ml-2 text-gray-900">{alert.bloodType}</span>
            </div>
            <div>
              <span className="font-medium text-gray-700">Location:</span>
              <span className="ml-2 text-gray-900">{alert.location}</span>
            </div>
            <div>
              <span className="font-medium text-gray-700">Doctor:</span>
              <span className="ml-2 text-gray-900">Dr. {alert.urgency === 'Critical' ? 'Sarah Mitchell' : 'James Rodriguez'}</span>
            </div>
          </div>
          <div className="flex gap-3">
            <button
              onClick={handleRespond}
              disabled={isResponding}
              onMouseEnter={(e) => {
                if (!isResponding) {
                  e.currentTarget.classList.add('bg-red-700', 'shadow-lg', 'scale-105')
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.classList.remove('bg-red-700', 'shadow-lg', 'scale-105')
              }}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 active:bg-red-800 shadow-md hover:shadow-lg transition-all duration-200 flex items-center gap-2 transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
            >
              <span>❤️</span>
              <span>{isResponding ? 'Responding...' : 'Respond Now'}</span>
            </button>
            <button
              onClick={handleShare}
              onMouseEnter={(e) => {
                e.currentTarget.classList.add('bg-gray-100', 'border-gray-400', 'scale-105')
              }}
              onMouseLeave={(e) => {
                e.currentTarget.classList.remove('bg-gray-100', 'border-gray-400', 'scale-105')
              }}
              className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 active:bg-gray-100 transition-all duration-200 flex items-center gap-2 transform hover:scale-105 active:scale-95 font-medium"
            >
              <span>📤</span>
              <span>Share Alert</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
