export default function PerformanceChart({ stats = {} }) {
  const data = [
    { label: 'Requests', value: stats.totalRequests || 0, color: 'bg-blue-500' },
    { label: 'Fulfilled', value: stats.fulfilledRequests || 0, color: 'bg-green-500' },
    { label: 'Pending', value: stats.activeRequests || 0, color: 'bg-yellow-500' },
  ]

  const maxValue = Math.max(...data.map(d => d.value), 1)

  return (
    <div className="bg-white rounded-lg shadow-md p-4 md:p-6">
      <h2 className="text-xl font-semibold mb-4">Performance Metrics</h2>
      <div className="space-y-4">
        {data.map((item, index) => (
          <div key={index}>
            <div className="flex justify-between mb-1">
              <span className="text-sm text-gray-600">{item.label}</span>
              <span className="text-sm font-medium text-gray-800">{item.value}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className={`${item.color} h-3 rounded-full transition-all duration-500`}
                style={{ width: `${(item.value / maxValue) * 100}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 pt-4 border-t border-gray-200">
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">Success Rate</span>
          <span className="text-2xl font-bold text-green-600">
            {stats.totalRequests > 0
              ? Math.round((stats.fulfilledRequests / stats.totalRequests) * 100)
              : 0}%
          </span>
        </div>
      </div>
    </div>
  )
}
