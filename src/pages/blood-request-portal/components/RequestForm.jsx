import { useState } from 'react'
import { useData } from '../../../contexts/DataContext'
import Button from '../../../components/ui/Button'
import Input from '../../../components/ui/Input'
import Select from '../../../components/ui/Select'
import Checkbox from '../../../components/ui/Checkbox'

export default function RequestForm() {
  const { addBloodRequest, addEmergency } = useData()
  const [formData, setFormData] = useState({
    patientName: '',
    bloodType: '',
    unitsRequired: '',
    urgencyLevel: '',
    hospitalName: '',
    contactNumber: '',
    emailAddress: '',
    additionalNotes: '',
    consent: false,
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const request = addBloodRequest({
        patientName: formData.patientName,
        bloodType: formData.bloodType,
        quantity: parseInt(formData.unitsRequired),
        urgency: formData.urgencyLevel.toLowerCase(),
        location: formData.hospitalName,
        contact: formData.contactNumber,
        email: formData.emailAddress,
        notes: formData.additionalNotes,
      })

      if (formData.urgencyLevel === 'Urgent' || formData.urgencyLevel === 'Critical') {
        addEmergency({
          bloodType: formData.bloodType,
          location: formData.hospitalName,
          urgency: formData.urgencyLevel,
          quantity: formData.unitsRequired,
        })
      }

      setShowSuccess(true)
      setFormData({
        patientName: '',
        bloodType: '',
        unitsRequired: '',
        urgencyLevel: '',
        hospitalName: '',
        contactNumber: '',
        emailAddress: '',
        additionalNotes: '',
        consent: false,
      })

      setTimeout(() => setShowSuccess(false), 5000)
    } catch (error) {
      console.error('Error submitting request:', error)
      alert('Failed to submit request. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleClear = () => {
    setFormData({
      patientName: '',
      bloodType: '',
      unitsRequired: '',
      urgencyLevel: '',
      hospitalName: '',
      contactNumber: '',
      emailAddress: '',
      additionalNotes: '',
      consent: false,
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
      <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
        Blood Request Form
      </h2>
      <p className="text-gray-600 mb-6">
        Fill in the details below to submit your blood request. All fields marked with * are required.
      </p>

      {showSuccess && (
        <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
          ✓ Blood request submitted successfully!
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Patient Information Section */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <span className="text-xl">👤</span>
            <h3 className="text-lg font-semibold text-gray-900">Patient Information</h3>
          </div>
          <div className="space-y-4 pl-8">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Patient Name *
              </label>
              <Input
                value={formData.patientName}
                onChange={(e) => setFormData({ ...formData, patientName: e.target.value })}
                required
                placeholder="Enter patient's full name"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Blood Type Required *
                </label>
                <Select
                  value={formData.bloodType}
                  onChange={(e) => setFormData({ ...formData, bloodType: e.target.value })}
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
                  Units Required *
                </label>
                <Input
                  type="number"
                  min="1"
                  value={formData.unitsRequired}
                  onChange={(e) => setFormData({ ...formData, unitsRequired: e.target.value })}
                  required
                  placeholder="Number of units"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Urgency Level *
              </label>
              <Select
                value={formData.urgencyLevel}
                onChange={(e) => setFormData({ ...formData, urgencyLevel: e.target.value })}
                required
              >
                <option value="">Select urgency level</option>
                <option value="Normal">Normal</option>
                <option value="Urgent">Urgent</option>
                <option value="Critical">Critical</option>
              </Select>
            </div>
          </div>
        </div>

        {/* Hospital & Contact Details Section */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <span className="text-xl">🏥</span>
            <h3 className="text-lg font-semibold text-gray-900">Hospital & Contact Details</h3>
          </div>
          <div className="space-y-4 pl-8">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Hospital Name *
              </label>
              <Input
                value={formData.hospitalName}
                onChange={(e) => setFormData({ ...formData, hospitalName: e.target.value })}
                required
                placeholder="Enter hospital or medical facility name"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Contact Number *
                </label>
                <Input
                  type="tel"
                  value={formData.contactNumber}
                  onChange={(e) => setFormData({ ...formData, contactNumber: e.target.value })}
                  required
                  placeholder="Enter contact number"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address *
                </label>
                <Input
                  type="email"
                  value={formData.emailAddress}
                  onChange={(e) => setFormData({ ...formData, emailAddress: e.target.value })}
                  required
                  placeholder="Enter email address"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Additional Notes */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Additional Notes (Optional)
          </label>
          <textarea
            value={formData.additionalNotes}
            onChange={(e) => setFormData({ ...formData, additionalNotes: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            rows="4"
            placeholder="Any additional information that might help donors..."
          />
        </div>

        {/* Consent */}
        <div className="flex items-start">
          <Checkbox
            checked={formData.consent}
            onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
            className="mt-1"
            required
          />
          <label className="ml-2 text-sm text-gray-700">
            I consent to share this information with potential donors *
            <p className="text-xs text-gray-500 mt-1">
              Your contact details will be shared with verified donors who match your requirements
            </p>
          </label>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            type="submit"
            disabled={isSubmitting}
            onMouseEnter={(e) => {
              if (!isSubmitting) {
                e.currentTarget.classList.add('bg-red-700', 'shadow-lg', 'scale-105')
              }
            }}
            onMouseLeave={(e) => {
              e.currentTarget.classList.remove('bg-red-700', 'shadow-lg', 'scale-105')
            }}
            className="flex-1 bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-semibold py-3 px-6 rounded-lg flex items-center justify-center gap-2 transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            <span>Submit Blood Request</span>
            <span className={`transition-transform duration-200 ${isSubmitting ? 'animate-pulse' : ''}`}>✈️</span>
          </button>
          <button
            type="button"
            onClick={handleClear}
            onMouseEnter={(e) => e.currentTarget.classList.add('bg-gray-100', 'border-gray-400', 'scale-105')}
            onMouseLeave={(e) => e.currentTarget.classList.remove('bg-gray-100', 'border-gray-400', 'scale-105')}
            className="flex-1 bg-white border border-gray-300 text-gray-700 font-medium py-3 px-6 rounded-lg hover:bg-gray-50 active:bg-gray-100 transition-all duration-200 transform hover:scale-105 active:scale-95"
          >
            Clear Form
          </button>
        </div>
      </form>

      {/* Need Help Section */}
      <div className="mt-8 bg-white rounded-lg shadow-md p-6 border border-gray-200">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-blue-600 text-2xl">❓</span>
          <h3 className="text-lg font-semibold text-gray-900">Need Help?</h3>
        </div>
        <p className="text-gray-600 mb-4">
          Our support team is available 24/7 to assist with emergency blood requests and donor coordination.
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={() => window.open('tel:+1234567890')}
            onMouseEnter={(e) => e.currentTarget.classList.add('bg-blue-700', 'shadow-lg', 'scale-105')}
            onMouseLeave={(e) => e.currentTarget.classList.remove('bg-blue-700', 'shadow-lg', 'scale-105')}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 active:bg-blue-800 shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2 transform hover:scale-105 active:scale-95 font-medium"
          >
            <span>📞</span>
            <span>Call Emergency Hotline</span>
          </button>
          <button
            onClick={() => alert('Live chat support will open in a new window.')}
            onMouseEnter={(e) => e.currentTarget.classList.add('bg-gray-200', 'border-gray-300', 'scale-105')}
            onMouseLeave={(e) => e.currentTarget.classList.remove('bg-gray-200', 'border-gray-300', 'scale-105')}
            className="px-4 py-2 bg-gray-100 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-200 active:bg-gray-300 transition-all duration-200 flex items-center justify-center gap-2 transform hover:scale-105 active:scale-95 font-medium"
          >
            <span>💬</span>
            <span>Live Chat Support</span>
          </button>
        </div>
      </div>
    </div>
  )
}
