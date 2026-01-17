import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useData } from '../../contexts/DataContext'
import ProgressIndicator from './components/ProgressIndicator'
import PersonalInfoStep from './components/PersonalInfoStep'
import MedicalHistoryStep from './components/MedicalHistoryStep'
import LocationStep from './components/LocationStep'
import VerificationStep from './components/VerificationStep'
import ReviewStep from './components/ReviewStep'
import SuccessModal from './components/SuccessModal'

export default function DonorRegistration() {
  const navigate = useNavigate()
  const { addDonor, getStats } = useData()
  const stats = getStats()
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    bloodType: '',
    age: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    medicalHistory: {},
    lastDonation: '',
  })
  const [showSuccess, setShowSuccess] = useState(false)

  const totalSteps = 5

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = async () => {
    try {
      addDonor({
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        phone: formData.phone,
        bloodType: formData.bloodType,
        age: parseInt(formData.age),
        address: `${formData.address}, ${formData.city}, ${formData.state} ${formData.zipCode}`,
        city: formData.city,
        state: formData.state,
        zipCode: formData.zipCode,
        lastDonation: formData.lastDonation,
        available: true,
        distance: `${(Math.random() * 5 + 1).toFixed(1)} km`,
      })
      setShowSuccess(true)
    } catch (error) {
      console.error('Error registering donor:', error)
      alert('Failed to register. Please try again.')
    }
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <PersonalInfoStep data={formData} onChange={setFormData} />
      case 2:
        return <MedicalHistoryStep data={formData} onChange={setFormData} />
      case 3:
        return <LocationStep data={formData} onChange={setFormData} />
      case 4:
        return <VerificationStep />
      case 5:
        return <ReviewStep data={formData} />
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 md:px-8 py-6 md:py-12">
        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="text-red-600 text-2xl">❤️</span>
            <span className="text-lg text-gray-700">Join Our Life-Saving Community</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Become a Blood Donor
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Complete your registration to start saving lives. Your generosity creates miracles.
          </p>
        </div>

        {/* Statistics Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="text-red-600 text-4xl mb-3">👥</div>
            <div className="text-3xl md:text-4xl font-bold text-red-600 mb-2">
              {stats.totalDonors.toLocaleString()}
            </div>
            <div className="text-gray-600">Active Donors</div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="text-green-600 text-4xl mb-3">❤️</div>
            <div className="text-3xl md:text-4xl font-bold text-green-600 mb-2">
              {(stats.totalDonors * 2.67).toLocaleString()}
            </div>
            <div className="text-gray-600">Lives Saved</div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="text-orange-600 text-4xl mb-3">🕐</div>
            <div className="text-3xl md:text-4xl font-bold text-orange-600 mb-2">8 min</div>
            <div className="text-gray-600">Avg Response</div>
          </div>
        </div>

        {/* Progress Indicator */}
        <ProgressIndicator currentStep={currentStep} totalSteps={totalSteps} />

        {/* Form Card */}
        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg border-2 border-yellow-400 p-6 md:p-8">
          {renderStep()}
          
          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
            <button
              onClick={handlePrevious}
              disabled={currentStep === 1}
              onMouseEnter={(e) => {
                if (currentStep > 1) {
                  e.currentTarget.classList.add('bg-gray-300', 'shadow-md', 'scale-105')
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.classList.remove('bg-gray-300', 'shadow-md', 'scale-105')
              }}
              className={`px-6 py-2 rounded font-medium transition-all duration-200 ${
                currentStep === 1
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed opacity-50'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300 active:bg-gray-400 transform hover:scale-105 active:scale-95'
              }`}
            >
              Previous
            </button>
            {currentStep < totalSteps ? (
              <button
                onClick={handleNext}
                onMouseEnter={(e) => e.currentTarget.classList.add('bg-red-700', 'shadow-lg', 'scale-105')}
                onMouseLeave={(e) => e.currentTarget.classList.remove('bg-red-700', 'shadow-lg', 'scale-105')}
                className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 active:bg-red-800 shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-105 active:scale-95 font-medium"
              >
                Next →
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                onMouseEnter={(e) => e.currentTarget.classList.add('bg-red-700', 'shadow-lg', 'scale-105')}
                onMouseLeave={(e) => e.currentTarget.classList.remove('bg-red-700', 'shadow-lg', 'scale-105')}
                className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 active:bg-red-800 shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-105 active:scale-95 font-medium"
              >
                ✓ Submit Registration
              </button>
            )}
          </div>
        </div>
      </div>

      <SuccessModal
        isOpen={showSuccess}
        onClose={() => {
          setShowSuccess(false)
          navigate('/')
        }}
      />
    </div>
  )
}
