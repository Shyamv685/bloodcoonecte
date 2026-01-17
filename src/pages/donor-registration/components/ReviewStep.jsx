export default function ReviewStep({ data }) {
  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
          <span className="text-2xl">✓</span>
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Review Your Information</h2>
          <p className="text-gray-600">Please review all information before submitting.</p>
        </div>
      </div>

      <div className="bg-gray-50 rounded-lg p-6 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm font-medium text-gray-700">Full Name</p>
            <p className="text-gray-900">{data.firstName} {data.lastName}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-700">Email</p>
            <p className="text-gray-900">{data.email}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-700">Phone</p>
            <p className="text-gray-900">{data.phone}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-700">Blood Type</p>
            <p className="text-gray-900">{data.bloodType}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-700">Age</p>
            <p className="text-gray-900">{data.age}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-700">Address</p>
            <p className="text-gray-900">
              {data.address}, {data.city}, {data.state} {data.zipCode}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
