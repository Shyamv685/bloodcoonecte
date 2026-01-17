export default function RecentActivity({ requests = [], donors = [] }) {
  const activities = [
    {
      icon: '💓',
      message: 'Michael Rodriguez completed donation at City General Hospital',
      time: '2 minutes ago',
      color: 'green',
    },
    {
      icon: '👥',
      message: `3 donors matched with emergency request for O- blood type`,
      time: '8 minutes ago',
      color: 'blue',
    },
    {
      icon: '📄',
      message: 'New blood request created by Memorial Medical Center',
      time: '15 minutes ago',
      color: 'red',
    },
  ]

  return (
    <div className="bg-white rounded-lg shadow-md p-4 md:p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Recent Activity</h2>
        <a href="#" className="text-red-600 text-sm hover:underline">View All</a>
      </div>
      <div className="space-y-3 max-h-64 overflow-y-auto">
        {activities.map((activity, index) => (
          <div key={index} className="flex items-start gap-3">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
              activity.color === 'green' ? 'bg-green-100' :
              activity.color === 'blue' ? 'bg-blue-100' :
              'bg-red-100'
            }`}>
              <span className="text-lg">{activity.icon}</span>
            </div>
            <div className="flex-1">
              <p className="text-sm text-gray-800">{activity.message}</p>
              <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
