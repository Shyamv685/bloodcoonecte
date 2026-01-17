export default function HospitalInfoCard() {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
          <span className="text-3xl">🏥</span>
        </div>
        <div className="flex-1">
          <h2 className="text-xl font-bold text-gray-900 mb-1">City General Hospital</h2>
          <p className="text-gray-600">Emergency Department - Verified Institution</p>
        </div>
        <div className="flex gap-2">
          <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
            Verified
          </span>
          <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
            Priority Access
          </span>
        </div>
      </div>
    </div>
  )
}
