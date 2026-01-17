import { useData } from '../../../contexts/DataContext'
import Button from '../../../components/ui/Button'

export default function DonorMatchTable({ donors = [] }) {
  const { updateDonor } = useData()

  const matches = donors
    .filter(donor => donor.available)
    .slice(0, 5)
    .map(donor => ({
      id: donor.id,
      name: donor.name,
      bloodType: donor.bloodType,
      distance: donor.distance || `${(Math.random() * 5 + 1).toFixed(1)} km`,
      lastDonation: donor.lastDonation || 'N/A',
      status: donor.available ? 'Available' : 'Unavailable',
    }))

  const handleContact = (donorId) => {
    alert(`Contacting donor ${donorId}...`)
  }

  if (matches.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-4 md:p-6">
        <h2 className="text-xl font-semibold mb-4">Donor Matches</h2>
        <p className="text-gray-500 text-center py-4">No available donors at the moment</p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-4 md:p-6">
      <h2 className="text-xl font-semibold mb-4">Donor Matches</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Name
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Blood Type
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Distance
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Status
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {matches.map((match) => (
              <tr key={match.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 text-sm text-gray-900">{match.name}</td>
                <td className="px-4 py-3 text-sm text-gray-500">{match.bloodType}</td>
                <td className="px-4 py-3 text-sm text-gray-500">{match.distance}</td>
                <td className="px-4 py-3 text-sm">
                  <span
                    className={`px-2 py-1 rounded text-xs ${
                      match.status === 'Available'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {match.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-sm">
                  <Button
                    variant="primary"
                    className="text-xs px-2 py-1"
                    onClick={() => handleContact(match.id)}
                  >
                    Contact
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
