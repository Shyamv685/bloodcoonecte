import { useData } from '../../../contexts/DataContext'
import Button from '../../../components/ui/Button'

export default function NearbyDonorsList() {
  const { donors } = useData()

  const availableDonors = donors
    .filter(donor => donor.available)
    .slice(0, 5)

  if (availableDonors.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-4 md:p-6">
        <h2 className="text-xl font-semibold mb-4">Nearby Donors</h2>
        <p className="text-gray-500 text-sm">No available donors at the moment.</p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-4 md:p-6">
      <h2 className="text-xl font-semibold mb-4">Nearby Donors</h2>
      <div className="space-y-3 max-h-64 overflow-y-auto">
        {availableDonors.map((donor) => (
          <div
            key={donor.id}
            className="border border-gray-200 rounded-lg p-3 hover:bg-gray-50 transition-colors"
          >
            <div className="flex justify-between items-start mb-2">
              <div>
                <p className="font-medium text-gray-800">{donor.name}</p>
                <p className="text-sm text-gray-600">Blood Type: {donor.bloodType}</p>
                {donor.distance && (
                  <p className="text-xs text-gray-500 mt-1">Distance: {donor.distance}</p>
                )}
              </div>
              <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs">
                Available
              </span>
            </div>
            <button
              onClick={() => alert(`Contacting ${donor.name}...`)}
              onMouseEnter={(e) => e.currentTarget.classList.add('bg-gray-200', 'scale-105')}
              onMouseLeave={(e) => e.currentTarget.classList.remove('bg-gray-200', 'scale-105')}
              className="w-full px-3 py-2 bg-gray-100 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-200 active:bg-gray-300 transition-all duration-200 text-sm mt-2 transform hover:scale-105 active:scale-95 font-medium"
            >
              Contact Donor
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
