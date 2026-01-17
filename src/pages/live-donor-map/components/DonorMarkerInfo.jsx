import Button from '../../../components/ui/Button'

export default function DonorMarkerInfo({ donor, onClose }) {
  if (!donor) return null

  return (
    <div className="bg-white rounded-lg shadow-lg p-4 min-w-[250px]">
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="font-semibold text-gray-800">{donor.name}</h3>
          <p className="text-sm text-gray-600">Blood Type: {donor.bloodType}</p>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            ×
          </button>
        )}
      </div>
      <div className="space-y-2 text-sm text-gray-600">
        <p>Distance: {donor.distance}</p>
        <p>Status: {donor.available ? 'Available' : 'Unavailable'}</p>
        {donor.lastDonation && <p>Last Donation: {donor.lastDonation}</p>}
      </div>
      <div className="mt-4 flex gap-2">
        <Button variant="primary" className="flex-1 text-sm">
          Contact
        </Button>
        <Button variant="secondary" className="flex-1 text-sm">
          View Profile
        </Button>
      </div>
    </div>
  )
}
