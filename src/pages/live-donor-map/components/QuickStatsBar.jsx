export default function QuickStatsBar({ stats = {} }) {
  const displayStats = [
    { label: 'Total Donors', value: stats.totalDonors || 0, color: 'blue' },
    { label: 'Available Now', value: stats.availableDonors || 0, color: 'green' },
    { label: 'Urgent Requests', value: stats.activeEmergencies || 0, color: 'red' },
  ]

  const colorClasses = {
    blue: 'bg-blue-50 text-blue-600',
    green: 'bg-green-50 text-green-600',
    red: 'bg-red-50 text-red-600',
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h3 className="font-semibold text-gray-800 mb-3">Quick Stats</h3>
      <div className="grid grid-cols-3 gap-2 md:gap-4">
        {displayStats.map((stat, index) => (
          <div key={index} className={`${colorClasses[stat.color]} p-2 md:p-3 rounded text-center`}>
            <p className="text-lg md:text-2xl font-bold">{stat.value}</p>
            <p className="text-xs mt-1">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
