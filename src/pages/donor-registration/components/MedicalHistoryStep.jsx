import Checkbox from '../../../components/ui/Checkbox'
import Input from '../../../components/ui/Input'

export default function MedicalHistoryStep({ data, onChange }) {
  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
          <span className="text-2xl">🏥</span>
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Medical History</h2>
          <p className="text-gray-600">Please provide your medical history information.</p>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Last Donation Date
          </label>
          <Input
            type="date"
            value={data.lastDonation || ''}
            onChange={(e) => onChange({ ...data, lastDonation: e.target.value })}
          />
        </div>

        <div className="space-y-3">
          <p className="text-sm font-medium text-gray-700">Medical Conditions</p>
          <div className="space-y-2">
            <label className="flex items-center">
              <Checkbox
                checked={data.noMedicalConditions || false}
                onChange={(e) => onChange({ ...data, noMedicalConditions: e.target.checked })}
              />
              <span className="ml-2 text-sm text-gray-700">
                I confirm I have no medical conditions that prevent donation
              </span>
            </label>
            <label className="flex items-center">
              <Checkbox
                checked={data.notPregnant || false}
                onChange={(e) => onChange({ ...data, notPregnant: e.target.checked })}
              />
              <span className="ml-2 text-sm text-gray-700">
                Not pregnant or breastfeeding (if applicable)
              </span>
            </label>
            <label className="flex items-center">
              <Checkbox
                checked={data.noRecentSurgery || false}
                onChange={(e) => onChange({ ...data, noRecentSurgery: e.target.checked })}
              />
              <span className="ml-2 text-sm text-gray-700">
                No recent surgery in the last 6 months
              </span>
            </label>
          </div>
        </div>
      </div>
    </div>
  )
}
