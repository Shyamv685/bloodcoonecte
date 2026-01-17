export default function KPICard({ kpi }) {
  const colorClasses = {
    green: 'bg-green-50 border-green-200',
    red: 'bg-red-50 border-red-200',
    blue: 'bg-blue-50 border-blue-200',
    orange: 'bg-orange-50 border-orange-200',
  }

  const iconColors = {
    green: 'text-green-600',
    red: 'text-red-600',
    blue: 'text-blue-600',
    orange: 'text-orange-600',
  }

  return (
    <div className={`bg-white rounded-lg shadow-md p-6 border ${colorClasses[kpi.color]}`}>
      <div className="flex items-center justify-between mb-4">
        <div className={`text-3xl ${iconColors[kpi.color]}`}>
          {kpi.icon}
        </div>
      </div>
      <div className="mb-2">
        <p className="text-xs font-medium text-gray-600 uppercase mb-1">
          {kpi.title}
        </p>
        <p className="text-3xl font-bold text-gray-900">{kpi.value}</p>
      </div>
      <div className="flex items-center gap-1">
        {kpi.trendUp ? (
          <span className="text-green-600">↑</span>
        ) : (
          <span className="text-red-600">↓</span>
        )}
        <span className={`text-xs ${kpi.trendUp ? 'text-green-600' : 'text-red-600'}`}>
          {kpi.trend}
        </span>
      </div>
    </div>
  )
}
