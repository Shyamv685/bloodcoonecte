import { useData } from '../../../contexts/DataContext'
import Button from '../../../components/ui/Button'

export default function ActiveRequestCard({ request }) {
  const { updateBloodRequest } = useData()

  const handleAssignDonor = () => {
    updateBloodRequest(request.id, { status: 'In Progress' })
    alert('Donor assignment initiated')
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-4 border-l-4 border-blue-500 hover:shadow-lg transition-shadow">
      <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-3 gap-2">
        <div className="flex-1">
          <h3 className="font-semibold text-gray-800">{request.bloodType}</h3>
          <p className="text-sm text-gray-600">{request.patientName || 'Anonymous'}</p>
          <p className="text-xs text-gray-500 mt-1">
            Requested: {new Date(request.createdAt).toLocaleString()}
          </p>
          <p className="text-xs text-gray-500">Location: {request.location}</p>
        </div>
        <span className={`px-2 py-1 rounded text-xs self-start ${
          request.urgency === 'critical' || request.urgency === 'urgent'
            ? 'bg-red-100 text-red-800' 
            : 'bg-yellow-100 text-yellow-800'
        }`}>
          {request.urgency || request.status}
        </span>
      </div>
      <div className="flex flex-col sm:flex-row gap-2">
        <Button variant="primary" className="text-sm px-3 py-1 flex-1" onClick={handleAssignDonor}>
          Assign Donor
        </Button>
        <Button variant="secondary" className="text-sm px-3 py-1 flex-1">
          View Details
        </Button>
      </div>
    </div>
  )
}
