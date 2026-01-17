export default function MapLegend() {
  const legendItems = [
    { icon: '📍', color: 'green', label: 'Available Donor', description: 'Ready to donate' },
    { icon: '📍', color: 'yellow', label: 'Busy Donor', description: 'Currently engaged' },
    { icon: '📍', color: 'gray', label: 'Unavailable', description: 'Not available now' },
    { icon: '✈️', color: 'red', label: 'Your Location', description: 'Current position' },
  ]

  return (
    <div className="bg-white rounded-lg shadow-md p-4 md:p-6">
      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <span className="text-blue-600">ℹ️</span> Map Legend
      </h3>
      <div className="space-y-3">
        {legendItems.map((item, index) => (
          <div key={index} className="flex items-start gap-3">
            <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
              item.color === 'green' ? 'bg-green-500' :
              item.color === 'yellow' ? 'bg-yellow-500' :
              item.color === 'gray' ? 'bg-gray-400' :
              'bg-red-500'
            }`}>
              <span className="text-white text-xs">{item.icon}</span>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">{item.label}</p>
              <p className="text-xs text-gray-600">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 pt-4 border-t border-gray-200">
        <div className="flex items-center gap-2 text-xs text-red-600">
          <span>⚡</span>
          <span>Real-time updates every 30 seconds</span>
        </div>
      </div>
    </div>
  )
}
