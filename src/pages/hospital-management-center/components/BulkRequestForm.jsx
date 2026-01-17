import { useState } from 'react'
import { useData } from '../../../contexts/DataContext'
import Button from '../../../components/ui/Button'
import Input from '../../../components/ui/Input'
import Select from '../../../components/ui/Select'

export default function BulkRequestForm() {
  const { addBloodRequest, addEmergency } = useData()
  const [formData, setFormData] = useState({
    bloodType: '',
    quantity: '',
    urgency: 'normal',
    hospital: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      for (let i = 0; i < parseInt(formData.quantity); i++) {
        addBloodRequest({
          bloodType: formData.bloodType,
          quantity: 1,
          urgency: formData.urgency,
          location: formData.hospital,
          patientName: `Bulk Request ${i + 1}`,
          contact: 'Hospital Contact',
        })
      }

      if (formData.urgency === 'urgent' || formData.urgency === 'critical') {
        addEmergency({
          bloodType: formData.bloodType,
          location: formData.hospital,
          urgency: formData.urgency.charAt(0).toUpperCase() + formData.urgency.slice(1),
          quantity: formData.quantity,
        })
      }

      setShowSuccess(true)
      setFormData({
        bloodType: '',
        quantity: '',
        urgency: 'normal',
        hospital: '',
      })

      setTimeout(() => setShowSuccess(false), 3000)
    } catch (error) {
      console.error('Error submitting bulk request:', error)
      alert('Failed to submit request. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-4 md:p-6">
      <h2 className="text-xl font-semibold mb-4">Bulk Request Form</h2>
      {showSuccess && (
        <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
          ✓ Bulk request submitted successfully!
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Blood Type *
          </label>
          <Select
            value={formData.bloodType}
            onChange={(e) => setFormData({ ...formData, bloodType: e.target.value })}
            required
          >
            <option value="">Select Blood Type</option>
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
            Quantity (units) *
          </label>
          <Input
            type="number"
            min="1"
            value={formData.quantity}
            onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
            required
            placeholder="Enter quantity"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Urgency Level
          </label>
          <Select
            value={formData.urgency}
            onChange={(e) => setFormData({ ...formData, urgency: e.target.value })}
          >
            <option value="normal">Normal</option>
            <option value="urgent">Urgent</option>
            <option value="critical">Critical</option>
          </Select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Hospital/Department *
          </label>
          <Input
            value={formData.hospital}
            onChange={(e) => setFormData({ ...formData, hospital: e.target.value })}
            required
            placeholder="Enter hospital name"
          />
        </div>
        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Submit Bulk Request'}
        </Button>
      </form>
    </div>
  )
}
