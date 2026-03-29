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

        <div className="mt-6 border-t pt-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Upload Medical Report (Optional)
          </label>
          <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg hover:border-red-400 hover:bg-red-50 transition-colors bg-white">
            <div className="space-y-1 text-center">
              <span className="text-3xl text-gray-400 mb-2 block">📄</span>
              <div className="flex text-sm text-gray-600 justify-center">
                <label
                  htmlFor="report-upload"
                  className="relative cursor-pointer rounded-md font-medium text-red-600 hover:text-red-700 focus-within:outline-none"
                >
                  <span>Click to upload</span>
                  <input
                    id="report-upload"
                    name="report-upload"
                    type="file"
                    className="sr-only"
                    accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (file) {
                        onChange({ ...data, medicalReport: file.name });
                      }
                    }}
                  />
                </label>
                <p className="pl-1">or select file</p>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Supported formats: PDF, DOC
              </p>
              {data.medicalReport && (
                <div className="mt-3 px-3 py-2 bg-green-50 rounded-md inline-flex items-center gap-2 border border-green-200">
                  <span className="text-green-600">✓</span>
                  <span className="text-sm font-medium text-green-800 break-all text-left">
                    {data.medicalReport}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
