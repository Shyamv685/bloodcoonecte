export default function EmergencyAlert({ emergency }) {
  return (
    <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg mb-4">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-semibold text-red-800">
            {emergency.bloodType} - {emergency.urgency}
          </h3>
          <p className="text-sm text-red-700 mt-1">{emergency.location}</p>
          <p className="text-xs text-red-600 mt-1">{emergency.time}</p>
        </div>
        <span className="px-3 py-1 bg-red-200 text-red-800 rounded-full text-xs font-medium">
          {emergency.urgency}
        </span>
      </div>
    </div>
  )
}
