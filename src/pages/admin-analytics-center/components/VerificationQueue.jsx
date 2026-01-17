import { useData } from '../../../contexts/DataContext'
import { useState } from 'react'

export default function VerificationQueue() {
  const { donors, updateDonor } = useData()
  const [processingId, setProcessingId] = useState(null)

  const queue = donors
    .filter(donor => !donor.verified)
    .slice(0, 5)
    .map(donor => ({
      id: donor.id,
      name: donor.name,
      type: 'Donor',
      submitted: new Date(donor.registeredAt).toLocaleDateString(),
    }))

  const handleApprove = async (id) => {
    setProcessingId(id)
    setTimeout(() => {
      updateDonor(id, { verified: true })
      setProcessingId(null)
      alert('Donor approved successfully!')
    }, 500)
  }

  const handleReview = (id) => {
    const donor = donors.find(d => d.id === id)
    alert(`Reviewing ${donor?.name || 'donor'}...`)
  }

  if (queue.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-4 md:p-6">
        <h2 className="text-xl font-semibold mb-4">Verification Queue</h2>
        <p className="text-gray-500 text-center py-4">No items in verification queue</p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-4 md:p-6">
      <h2 className="text-xl font-semibold mb-4">Verification Queue</h2>
      <div className="space-y-3">
        {queue.map((item) => (
          <div
            key={item.id}
            className="border border-gray-200 rounded-lg p-3 hover:bg-gray-50 transition-all duration-200"
          >
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium">{item.name}</p>
                <p className="text-sm text-gray-600">{item.type} • {item.submitted}</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleApprove(item.id)}
                  disabled={processingId === item.id}
                  onMouseEnter={(e) => {
                    if (processingId !== item.id) {
                      e.currentTarget.classList.add('bg-green-700', 'scale-105')
                    }
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.classList.remove('bg-green-700', 'scale-105')
                  }}
                  className="text-sm px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 active:bg-green-800 transition-all duration-200 transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                >
                  {processingId === item.id ? 'Processing...' : 'Approve'}
                </button>
                <button
                  onClick={() => handleReview(item.id)}
                  onMouseEnter={(e) => e.currentTarget.classList.add('bg-gray-300', 'scale-105')}
                  onMouseLeave={(e) => e.currentTarget.classList.remove('bg-gray-300', 'scale-105')}
                  className="text-sm px-3 py-1 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 active:bg-gray-400 transition-all duration-200 transform hover:scale-105 active:scale-95 font-medium"
                >
                  Review
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
