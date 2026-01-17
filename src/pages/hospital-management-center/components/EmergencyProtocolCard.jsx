export default function EmergencyProtocolCard() {
  const protocols = [
    { step: 1, title: 'Assess Urgency', description: 'Determine the criticality level' },
    { step: 2, title: 'Notify Donors', description: 'Send alerts to matching donors' },
    { step: 3, title: 'Coordinate Transport', description: 'Arrange for blood collection' },
    { step: 4, title: 'Verify Match', description: 'Confirm blood type compatibility' },
  ]

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4">Emergency Protocol</h2>
      <div className="space-y-4">
        {protocols.map((protocol) => (
          <div key={protocol.step} className="flex items-start">
            <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-semibold text-sm">
              {protocol.step}
            </div>
            <div className="ml-4">
              <h3 className="font-medium text-gray-800">{protocol.title}</h3>
              <p className="text-sm text-gray-600">{protocol.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
