export default function MetricsCards({ stats }) {
  const metrics = [
    {
      label: 'Active Requests',
      value: stats.activeRequests || 12,
      icon: '📄',
      color: 'blue',
    },
    {
      label: 'Donors Notified',
      value: (stats.activeRequests * 20) || 247,
      icon: '🔔',
      color: 'orange',
    },
    {
      label: 'Responses Received',
      value: Math.floor((stats.activeRequests * 20) * 0.36) || 89,
      icon: '💬',
      color: 'green',
    },
    {
      label: 'Avg Response Time',
      value: '8 min',
      icon: '🕐',
      color: 'purple',
    },
  ]

  const colorClasses = {
    blue: 'bg-blue-50 border-blue-200',
    orange: 'bg-orange-50 border-orange-200',
    green: 'bg-green-50 border-green-200',
    purple: 'bg-purple-50 border-purple-200',
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {metrics.map((metric, index) => (
        <div
          key={index}
          className={`bg-white rounded-lg shadow-md p-6 border ${colorClasses[metric.color]}`}
        >
          <div className="text-3xl mb-3">{metric.icon}</div>
          <div className="text-3xl font-bold text-gray-900 mb-1">{metric.value}</div>
          <div className="text-sm text-gray-600">{metric.label}</div>
        </div>
      ))}
    </div>
  )
}
