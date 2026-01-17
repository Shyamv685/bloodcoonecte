import Button from '../../../components/ui/Button'

export default function ActiveRequestCard({ request }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-red-500">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">
            Blood Type: {request.bloodType}
          </h3>
          <p className="text-sm text-gray-600 mt-1">{request.location}</p>
        </div>
        <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-xs font-medium">
          {request.urgency}
        </span>
      </div>
      <div className="flex gap-2">
        <Button variant="primary" className="flex-1">
          Respond
        </Button>
        <Button variant="secondary" className="flex-1">
          View Details
        </Button>
      </div>
    </div>
  )
}
