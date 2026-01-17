export default function AlertsPanel({ emergencies = [] }) {
  const alerts = emergencies
    .filter(e => e.urgency === 'Critical' || e.urgency === 'Urgent')
    .slice(0, 5)
    .map(emergency => ({
      id: emergency.id,
      message: `Urgent ${emergency.bloodType} request at ${emergency.location}`,
      severity: emergency.urgency === 'Critical' ? 'high' : 'medium',
      time: new Date(emergency.createdAt).toLocaleString(),
    }))

  if (alerts.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-4 md:p-6">
        <h2 className="text-xl font-semibold mb-4">System Alerts</h2>
        <p className="text-gray-500 text-center py-4">No active alerts</p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-4 md:p-6">
      <h2 className="text-xl font-semibold mb-4">System Alerts</h2>
      <div className="space-y-3 max-h-64 overflow-y-auto">
        {alerts.map((alert) => (
          <div
            key={alert.id}
            className={`border-l-4 p-3 rounded ${
              alert.severity === 'high'
                ? 'border-red-500 bg-red-50'
                : 'border-yellow-500 bg-yellow-50'
            }`}
          >
            <p className="text-sm font-medium">{alert.message}</p>
            <p className="text-xs text-gray-500 mt-1">{alert.time}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
