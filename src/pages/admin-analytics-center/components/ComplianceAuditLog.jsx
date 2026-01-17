export default function ComplianceAuditLog({ requests = [] }) {
  const logs = requests
    .slice(0, 10)
    .map(request => ({
      id: request.id,
      action: `Blood request created - ${request.bloodType}`,
      user: request.patientName || 'Anonymous',
      time: new Date(request.createdAt).toLocaleString(),
    }))

  if (logs.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-4 md:p-6">
        <h2 className="text-xl font-semibold mb-4">Compliance Audit Log</h2>
        <p className="text-gray-500 text-center py-4">No activity logs yet</p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-4 md:p-6">
      <h2 className="text-xl font-semibold mb-4">Compliance Audit Log</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Action
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                User
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Time
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {logs.map((log) => (
              <tr key={log.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 text-sm text-gray-900">{log.action}</td>
                <td className="px-4 py-3 text-sm text-gray-500">{log.user}</td>
                <td className="px-4 py-3 text-sm text-gray-500">{log.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
