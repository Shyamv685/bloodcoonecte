import { useData } from '../../../contexts/DataContext'
import { useState } from 'react'

export default function RequestTracker() {
  const { bloodRequests, updateBloodRequest } = useData()
  const [processingId, setProcessingId] = useState(null)

  const handleStatusChange = async (id, newStatus) => {
    setProcessingId(id)
    setTimeout(() => {
      updateBloodRequest(id, { status: newStatus })
      setProcessingId(null)
      alert(`Request ${id} marked as ${newStatus}`)
    }, 300)
  }

  const recentRequests = bloodRequests
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 5)

  if (recentRequests.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-4 md:p-6">
        <h2 className="text-xl font-semibold mb-4">Request Tracker</h2>
        <p className="text-gray-500 text-center py-8">No requests yet. Submit a request to track it here.</p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-4 md:p-6">
      <h2 className="text-xl font-semibold mb-4">Request Tracker</h2>
      <div className="space-y-3">
        {recentRequests.map((request) => (
          <div
            key={request.id}
            className="border border-gray-200 rounded-lg p-3 md:p-4 hover:shadow-md transition-all duration-200 hover:border-red-300"
          >
            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-3">
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <p className="font-medium text-gray-800">
                    {request.patientName || 'Anonymous'}
                  </p>
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs font-medium">
                    {request.bloodType}
                  </span>
                </div>
                <div className="text-sm text-gray-600 space-y-1">
                  <p>Quantity: {request.quantity} units</p>
                  <p>Location: {request.location}</p>
                  <p className="text-xs text-gray-500">
                    {new Date(request.createdAt).toLocaleString()}
                  </p>
                </div>
              </div>
              <div className="flex flex-col md:flex-row gap-2 items-start md:items-center">
                <span
                  className={`px-3 py-1 rounded text-sm font-medium ${
                    request.status === 'Fulfilled'
                      ? 'bg-green-100 text-green-800'
                      : request.status === 'In Progress'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-red-100 text-red-800'
                  }`}
                >
                  {request.status}
                </span>
                {request.status === 'Pending' && (
                  <button
                    onClick={() => handleStatusChange(request.id, 'Fulfilled')}
                    disabled={processingId === request.id}
                    onMouseEnter={(e) => {
                      if (processingId !== request.id) {
                        e.currentTarget.classList.add('bg-green-700', 'scale-105')
                      }
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.classList.remove('bg-green-700', 'scale-105')
                    }}
                    className="text-sm px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 active:bg-green-800 transition-all duration-200 transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                  >
                    {processingId === request.id ? 'Processing...' : 'Mark Fulfilled'}
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
