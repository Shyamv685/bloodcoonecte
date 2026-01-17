import React from 'react'

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 md:px-8 py-6 md:py-8">
        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                  <span className="text-red-600 text-2xl">➕</span>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">New Blood Request</h3>
                  <p className="text-gray-600 text-sm">Submit urgent or scheduled blood requirement</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-green-600 text-2xl">🛡️</span>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">Emergency Protocols</h3>
                  <p className="text-gray-600 text-sm">Activate pre-configured emergency responses</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 text-2xl">👥</span>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">View Donors</h3>
                  <p className="text-gray-600 text-sm">Browse and contact matched donors</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Requests */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Recent Requests</h2>
          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
              {/* Left Section */}
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-4">
                  <h3 className="text-lg font-bold text-gray-900">Request #REQ-2026-001</h3>
                  <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-xs font-semibold uppercase animate-pulse">CRITICAL</span>
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-semibold">matched</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                  <div className="flex items-center gap-2">
                    <span className="text-red-600 text-xl">🩸</span>
                    <div>
                      <p className="text-xs text-gray-500">Blood Type</p>
                      <p className="text-sm font-semibold text-gray-900">O+</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-600 text-xl">📦</span>
                    <div>
                      <p className="text-xs text-gray-500">Units Needed</p>
                      <p className="text-sm font-semibold text-gray-900">4</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-blue-600 text-xl">👥</span>
                    <div>
                      <p className="text-xs text-gray-500">Donors Matched</p>
                      <p className="text-sm font-semibold text-gray-900">3</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-600 text-xl">🕐</span>
                    <div>
                      <p className="text-xs text-gray-500">Time Elapsed</p>
                      <p className="text-sm font-semibold text-gray-900">2 hours</p>
                    </div>
                  </div>
                </div>
                <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-700">
                    <span className="font-medium">Notes:</span> Emergency surgery - Multiple injuries requiring immediate transfusion
                  </p>
                </div>
              </div>

              {/* Right Section - Action Buttons */}
              <div className="flex flex-col gap-2 lg:min-w-[120px]">
                <button className="flex items-center justify-center gap-2 w-full px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-all duration-200 font-medium">
                  <span className="text-lg">👁️</span>
                  <span>Details</span>
                </button>
                <button className="flex items-center justify-center gap-2 w-full px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all duration-200 font-medium">
                  <span className="text-lg">🔄</span>
                  <span>Update</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
