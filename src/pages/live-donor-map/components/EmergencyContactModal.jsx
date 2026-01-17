import { useState } from 'react'
import Button from '../../../components/ui/Button'
import Input from '../../../components/ui/Input'

export default function EmergencyContactModal({ isOpen, onClose, donor }) {
  const [message, setMessage] = useState('')

  if (!isOpen) return null

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Emergency contact:', { donor, message })
    alert('Emergency contact sent!')
    setMessage('')
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl p-6 max-w-md w-full mx-4">
        <h2 className="text-xl font-semibold mb-4">Emergency Contact</h2>
        {donor && (
          <div className="mb-4">
            <p className="text-sm text-gray-600">Contacting: {donor.name}</p>
            <p className="text-sm text-gray-600">Blood Type: {donor.bloodType}</p>
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Message
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="4"
              required
            />
          </div>
          <div className="flex gap-2">
            <Button type="submit" variant="danger" className="flex-1">
              Send Emergency Alert
            </Button>
            <Button type="button" variant="secondary" onClick={onClose} className="flex-1">
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
