import { Link } from 'react-router-dom'
import { useState } from 'react'

export default function SuccessModal({ isOpen, onClose }) {
  const [isClosing, setIsClosing] = useState(false)

  if (!isOpen) return null

  const handleClose = () => {
    setIsClosing(true)
    setTimeout(() => {
      onClose()
      setIsClosing(false)
    }, 300)
  }

  return (
    <div 
      className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 transition-opacity duration-300 ${
        isClosing ? 'opacity-0' : 'opacity-100'
      }`}
      onClick={handleClose}
    >
      <div 
        onClick={(e) => e.stopPropagation()}
        className={`bg-white rounded-lg shadow-xl p-6 md:p-8 max-w-md w-full mx-4 text-center transform transition-all duration-300 ${
          isClosing ? 'scale-95 opacity-0' : 'scale-100 opacity-100'
        }`}
      >
        <div className="text-6xl mb-4 animate-bounce">✅</div>
        <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-2">
          Registration Successful!
        </h2>
        <p className="text-gray-600 mb-6">
          Thank you for registering as a blood donor. Your information has been saved.
        </p>
        <div className="space-y-2">
          <Link to="/">
            <button
              onClick={handleClose}
              onMouseEnter={(e) => e.currentTarget.classList.add('bg-red-700', 'shadow-lg', 'scale-105')}
              onMouseLeave={(e) => e.currentTarget.classList.remove('bg-red-700', 'shadow-lg', 'scale-105')}
              className="w-full px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 active:bg-red-800 shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-105 active:scale-95 font-medium"
            >
              Go to Home
            </button>
          </Link>
          <button
            onClick={handleClose}
            onMouseEnter={(e) => e.currentTarget.classList.add('bg-gray-200', 'scale-105')}
            onMouseLeave={(e) => e.currentTarget.classList.remove('bg-gray-200', 'scale-105')}
            className="w-full px-6 py-3 bg-gray-100 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-200 active:bg-gray-300 transition-all duration-200 transform hover:scale-105 active:scale-95 font-medium"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}
