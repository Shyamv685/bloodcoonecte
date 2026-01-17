export default function MetricsCards({ stats }) {
  const metrics = [
    {
      label: 'Active Requests',
      value: stats.activeRequests || 12,
      trend: '+3',
      trendUp: true,
      icon: '📄',
      color: 'pink',
    },
    {
      label: 'Matched Donors',
      value: stats.availableDonors || 47,
      trend: '+8',
      trendUp: true,
      icon: '👥',
      color: 'green',
    },
    {
      label: 'Units Pending',
      value: (stats.activeRequests * 2) || 28,
      trend: '-5',
      trendUp: false,
      icon: '📦',
      color: 'yellow',
    },
    {
      label: 'Completed Today',
      value: stats.fulfilledRequests || 15,
      trend: '+2',
      trendUp: true,
      icon: '✓',
      color: 'green',
    },
  ]

  const colorClasses = {
    pink: 'bg-pink-50 border-pink-200',
    green: 'bg-green-50 border-green-200',
    yellow: 'bg-yellow-50 border-yellow-200',
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      {metrics.map((metric, index) => (
        <div
          key={index}
          className={`bg-white rounded-lg shadow-md p-6 border ${colorClasses[metric.color]}`}
        >
          <div className="text-3xl mb-3">{metric.icon}</div>
          <div className="text-3xl font-bold text-gray-900 mb-1">{metric.value}</div>
          <div className="text-sm text-gray-600 mb-2">{metric.label}</div>
          <div className="flex items-center gap-1">
            {metric.trendUp ? (
              <span className="text-green-600">↑</span>
            ) : (
              <span className="text-red-600">↓</span>
            )}
            <span className={`text-xs ${metric.trendUp ? 'text-green-600' : 'text-red-600'}`}>
              {metric.trend}
            </span>
          </div>
        </div>
      ))}
    </div>
  )
}
