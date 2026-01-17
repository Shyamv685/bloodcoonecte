export default function RequestStatusCard({ request }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-semibold">Request #{request.id}</h3>
        <span
          className={`px-2 py-1 rounded text-xs ${
            request.status === 'Fulfilled'
              ? 'bg-green-100 text-green-800'
              : request.status === 'Pending'
              ? 'bg-yellow-100 text-yellow-800'
              : 'bg-red-100 text-red-800'
          }`}
        >
          {request.status}
        </span>
      </div>
      <p className="text-sm text-gray-600">Blood Type: {request.bloodType}</p>
      <p className="text-sm text-gray-600">Date: {request.date}</p>
    </div>
  )
}
