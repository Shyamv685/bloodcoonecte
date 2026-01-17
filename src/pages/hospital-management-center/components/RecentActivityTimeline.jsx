export default function RecentActivityTimeline({ requests = [] }) {
  const activities = requests
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 5)
    .map((request, index) => ({
      id: request.id,
      action: request.status === 'Fulfilled' 
        ? 'Blood request fulfilled' 
        : 'New blood request created',
      time: new Date(request.createdAt).toLocaleString(),
      type: request.status === 'Fulfilled' ? 'success' : 'info',
    }))

  if (activities.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-4 md:p-6">
        <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
        <p className="text-gray-500 text-center py-4">No recent activity</p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-4 md:p-6">
      <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
      <div className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-start">
            <div
              className={`flex-shrink-0 w-2 h-2 rounded-full mt-2 ${
                activity.type === 'success'
                  ? 'bg-green-500'
                  : activity.type === 'warning'
                  ? 'bg-yellow-500'
                  : 'bg-blue-500'
              }`}
            ></div>
            <div className="ml-4 flex-1">
              <p className="text-sm text-gray-800">{activity.action}</p>
              <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
