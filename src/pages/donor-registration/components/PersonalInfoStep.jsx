import Input from '../../../components/ui/Input'
import Select from '../../../components/ui/Select'

export default function PersonalInfoStep({ data, onChange }) {
  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
          <span className="text-2xl">👤</span>
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Personal Information</h2>
          <p className="text-gray-600">Help us identify you and ensure accurate matching with recipients.</p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              First Name *
            </label>
            <Input
              value={data.firstName || ''}
              onChange={(e) => onChange({ ...data, firstName: e.target.value })}
              required
              placeholder="Enter your first name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Last Name *
            </label>
            <Input
              value={data.lastName || ''}
              onChange={(e) => onChange({ ...data, lastName: e.target.value })}
              required
              placeholder="Enter your last name"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email Address *
          </label>
          <Input
            type="email"
            value={data.email || ''}
            onChange={(e) => onChange({ ...data, email: e.target.value })}
            required
            placeholder="your.email@example.com"
          />
          <p className="text-xs text-gray-500 mt-1">
            We'll use this for important notifications and account recovery.
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Phone Number *
          </label>
          <Input
            type="tel"
            value={data.phone || ''}
            onChange={(e) => onChange({ ...data, phone: e.target.value })}
            required
            placeholder="Enter your phone number"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Blood Type *
            </label>
            <Select
              value={data.bloodType || ''}
              onChange={(e) => onChange({ ...data, bloodType: e.target.value })}
              required
            >
              <option value="">Select blood type</option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
            </Select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Age *
            </label>
            <Input
              type="number"
              min="18"
              max="65"
              value={data.age || ''}
              onChange={(e) => onChange({ ...data, age: e.target.value })}
              required
              placeholder="18-65"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
