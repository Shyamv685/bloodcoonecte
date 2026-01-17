export default function RecentActivityFeed({ activities = [] }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 md:p-6">
      <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
      <div className="space-y-4 max-h-96 overflow-y-auto">
        {activities.map((activity, index) => (
          <div key={index} className="flex items-start gap-3">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
              activity.color === 'blue' ? 'bg-blue-100' :
              activity.color === 'red' ? 'bg-red-100' :
              activity.color === 'yellow' ? 'bg-yellow-100' :
              'bg-green-100'
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
