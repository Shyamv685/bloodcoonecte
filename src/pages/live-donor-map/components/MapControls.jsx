import Button from '../../../components/ui/Button'

export default function MapControls({ onFilterChange, filters = {} }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4">
      <h3 className="font-semibold text-gray-800 mb-3">Map Controls</h3>
      <div className="space-y-3">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Filter by Blood Type
          </label>
          <select
            value={filters.bloodType || ''}
            onChange={(e) => onFilterChange?.({ ...filters, bloodType: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Blood Types</option>
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Filter by Availability
          </label>
          <select
            value={filters.availability || ''}
            onChange={(e) => onFilterChange?.({ ...filters, availability: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All</option>
            <option value="available">Available Only</option>
            <option value="unavailable">Unavailable</option>
          </select>
        </div>
        <Button
          variant="secondary"
          onClick={() => onFilterChange?.({})}
          className="w-full"
        >
          Clear Filters
        </Button>
      </div>
    </div>
  )
}
