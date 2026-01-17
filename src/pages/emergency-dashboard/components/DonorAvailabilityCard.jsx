export default function DonorAvailabilityCard({ donor }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <div className="flex justify-between items-center">
        <div>
          <p className="font-medium text-gray-800">{donor.name}</p>
          <p className="text-sm text-gray-600">Blood Type: {donor.bloodType}</p>
          <p className="text-xs text-gray-500 mt-1">Distance: {donor.distance}</p>
        </div>
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium ${
            donor.available
              ? 'bg-green-100 text-green-800'
              : 'bg-gray-100 text-gray-800'
          }`}
        >
          {donor.available ? 'Available' : 'Unavailable'}
        </span>
      </div>
    </div>
  )
}
