export default function ProgressIndicator({ currentStep, totalSteps }) {
  const steps = [
    { number: 1, label: 'Personal Info' },
    { number: 2, label: 'Medical History' },
    { number: 3, label: 'Location' },
    { number: 4, label: 'Verification' },
    { number: 5, label: 'Review' },
  ]

  return (
    <div className="max-w-4xl mx-auto mb-8">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <div key={step.number} className="flex items-center flex-1">
            <div className="flex flex-col items-center flex-1">
              <div
                className={`w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center font-bold text-lg md:text-xl border-2 transition-all duration-300 ${
                  step.number <= currentStep
                    ? 'bg-red-600 text-white border-red-600 shadow-md scale-110'
                    : 'bg-white text-gray-400 border-gray-300 hover:border-gray-400'
                }`}
              >
                {step.number}
              </div>
              <span
                className={`mt-2 text-xs md:text-sm font-medium transition-colors duration-200 ${
                  step.number <= currentStep ? 'text-red-600' : 'text-gray-400'
                }`}
              >
                {step.label}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div
                className={`h-1 flex-1 mx-2 md:mx-4 transition-all duration-300 ${
                  step.number < currentStep ? 'bg-red-600' : 'bg-gray-300'
                }`}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
