import Input from '../../../components/ui/Input'

export default function LocationStep({ data, onChange }) {
  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
          <span className="text-2xl">📍</span>
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Location</h2>
          <p className="text-gray-600">Help us find nearby blood requests.</p>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Address *
          </label>
          <Input
            value={data.address || ''}
            onChange={(e) => onChange({ ...data, address: e.target.value })}
            required
            placeholder="Enter your street address"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              City *
            </label>
            <Input
              value={data.city || ''}
              onChange={(e) => onChange({ ...data, city: e.target.value })}
              required
              placeholder="City"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              State *
            </label>
            <Input
              value={data.state || ''}
              onChange={(e) => onChange({ ...data, state: e.target.value })}
              required
              placeholder="State"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              ZIP Code *
            </label>
            <Input
              value={data.zipCode || ''}
              onChange={(e) => onChange({ ...data, zipCode: e.target.value })}
              required
              placeholder="ZIP Code"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
