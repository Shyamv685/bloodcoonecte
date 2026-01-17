export default function DonorListPanel({ donors = [] }) {
  const defaultDonors = [
    { id: 1, name: 'John Doe', bloodType: 'O+', distance: '2.5 km', available: true },
    { id: 2, name: 'Jane Smith', bloodType: 'A+', distance: '3.1 km', available: true },
    { id: 3, name: 'Mike Johnson', bloodType: 'B+', distance: '4.2 km', available: false },
  ]

  const displayDonors = donors.length > 0 ? donors : defaultDonors

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h3 className="font-semibold text-gray-800 mb-4">Nearby Donors</h3>
      <div className="space-y-3 max-h-96 overflow-y-auto">
        {displayDonors.map((donor) => (
          <div
            key={donor.id}
            className="border border-gray-200 rounded p-3 hover:bg-gray-50 cursor-pointer"
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="font-medium text-gray-800">{donor.name}</p>
                <p className="text-sm text-gray-600">Blood Type: {donor.bloodType}</p>
                <p className="text-xs text-gray-500 mt-1">Distance: {donor.distance}</p>
              </div>
              <span
                className={`px-2 py-1 rounded text-xs ${
                  donor.available
                    ? 'bg-green-100 text-green-800'
                    : 'bg-gray-100 text-gray-800'
                }`}
              >
                {donor.available ? 'Available' : 'Unavailable'}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
