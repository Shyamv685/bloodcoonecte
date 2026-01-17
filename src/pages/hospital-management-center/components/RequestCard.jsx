import { useData } from '../../../contexts/DataContext'
import { useState } from 'react'

export default function RequestCard({ request }) {
  const { updateBloodRequest } = useData()
  const [isHovered, setIsHovered] = useState(false)

  const handleUpdate = () => {
    const newStatus = request.status === 'Pending' ? 'In Progress' : 'Fulfilled'
    updateBloodRequest(request.id, { status: newStatus })
    alert(`Request ${request.requestId} updated to ${newStatus}`)
  }

  const handleDetails = () => {
    const details = `
Request ID: ${request.requestId}
Blood Type: ${request.bloodType}
Quantity: ${request.quantity} units
Patient: ${request.patientName || 'Anonymous'}
Location: ${request.location}
Status: ${request.status}
Urgency: ${request.urgency || 'Normal'}
Donors Matched: ${request.donorsMatched || 0}
Time Elapsed: ${request.timeElapsed}
    `
    alert(details.trim())
  }

  const isCritical = request.urgency === 'critical' || request.urgency === 'Critical'
  const isMatched = request.donorsMatched > 0

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`bg-white rounded-lg shadow-md p-6 border border-gray-200 transition-all duration-300 ${
        isHovered ? 'shadow-xl border-red-300' : ''
      }`}
    >
      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
        {/* Left Section - Request Info */}
        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <h3 className="text-lg md:text-xl font-bold text-gray-900">
              Request #{request.requestId}
            </h3>
            {isCritical && (
              <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-xs font-semibold uppercase animate-pulse">
                Critical
              </span>
            )}
            {isMatched && (
              <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-semibold">
                matched
              </span>
            )}
          </div>

          <p className="text-gray-700 font-medium mb-4">
            {request.patientName ? `${request.patientName} - ` : 'Emergency Surgery - '}
            Patient ID: P-{String(request.id).slice(-5)}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            {/* Blood Type */}
            <div className="flex items-center gap-2">
              <span className="text-red-600 text-xl">🩸</span>
              <div>
                <p className="text-xs text-gray-500">Blood Type</p>
                <p className="text-sm font-semibold text-gray-900">{request.bloodType}</p>
              </div>
            </div>

            {/* Units Needed */}
            <div className="flex items-center gap-2">
              <span className="text-gray-600 text-xl">📦</span>
              <div>
                <p className="text-xs text-gray-500">Units Needed</p>
                <p className="text-sm font-semibold text-gray-900">{request.quantity}</p>
              </div>
            </div>

            {/* Donors Matched */}
            <div className="flex items-center gap-2">
              <span className="text-blue-600 text-xl">👥</span>
              <div>
                <p className="text-xs text-gray-500">Donors Matched</p>
                <p className="text-sm font-semibold text-gray-900">{request.donorsMatched || 0}</p>
              </div>
            </div>

            {/* Time Elapsed */}
            <div className="flex items-center gap-2">
              <span className="text-gray-600 text-xl">🕐</span>
              <div>
                <p className="text-xs text-gray-500">Time Elapsed</p>
                <p className="text-sm font-semibold text-gray-900">{request.timeElapsed || 'Just now'}</p>
              </div>
            </div>
          </div>

          {/* Notes */}
          <div className="mt-4 p-3 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-700">
              <span className="font-medium">Notes:</span> {request.location || 'Trauma case - Multiple injuries requiring immediate transfusion'}
            </p>
          </div>
        </div>

        {/* Right Section - Action Buttons */}
        <div className="flex flex-col gap-2 lg:min-w-[120px]">
          <button
            onClick={handleDetails}
            onMouseEnter={(e) => e.currentTarget.classList.add('bg-gray-100')}
            onMouseLeave={(e) => e.currentTarget.classList.remove('bg-gray-100')}
            className="flex items-center justify-center gap-2 w-full px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 hover:border-gray-400 transition-all duration-200 font-medium"
          >
            <span className="text-lg">👁️</span>
            <span>Details</span>
          </button>
          <button
            onClick={handleUpdate}
            onMouseEnter={(e) => e.currentTarget.classList.add('bg-red-700', 'shadow-lg')}
            onMouseLeave={(e) => e.currentTarget.classList.remove('bg-red-700', 'shadow-lg')}
            className="flex items-center justify-center gap-2 w-full px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 active:bg-red-800 shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-105 active:scale-95 font-medium"
          >
            <span className="text-lg">🔄</span>
            <span>Update</span>
          </button>
        </div>
      </div>
    </div>
  )
}
