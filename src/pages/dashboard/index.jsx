import React, { useState } from 'react'
import { useData } from '../../contexts/DataContext'

export default function Dashboard() {
  const { bloodRequests, updateBloodRequest } = useData()

  const recentRequests = bloodRequests
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 10)
    .map((req, index) => ({
      ...req,
      requestId: `REQ-2026-${String(index + 1).padStart(3, '0')}`,
      donorsMatched: Math.floor(Math.random() * 10) + 1,
      timeElapsed: getTimeElapsed(req.createdAt),
    }))

  function getTimeElapsed(createdAt) {
    if (!createdAt) return 'Just now'
    const now = new Date()
    const created = new Date(createdAt)
    const diffMs = now - created
    const diffMins = Math.floor(diffMs / 60000)

    if (diffMins < 1) return 'Just now'
    if (diffMins < 60) return `${diffMins} mins`
    const diffHours = Math.floor(diffMins / 60)
    if (diffHours < 24) return `${diffHours} hours`
    const diffDays = Math.floor(diffHours / 24)
    return `${diffDays} days`
  }

  const handleUpdate = (request) => {
    const newStatus = request.status === 'Pending' ? 'In Progress' : 'Fulfilled'
    updateBloodRequest(request.id, { status: newStatus })
    alert(`Request ${request.requestId} updated to ${newStatus}`)
  }

  const handleDetails = (request) => {
    const details = `
Request ID: ${request.requestId}
Blood Type: ${request.bloodType}
Quantity: ${request.quantity} units
Patient: ${request.patientName || 'Anonymous'}
Location: ${request.location}
Status: ${request.status}
Urgency: ${request.urgency || 'Normal'}
Donors Matched: ${request.donorsMatched || 0}
Time Elapsed: ${request.timeElapsed}
    `
    alert(details.trim())
  }
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
          <div className="space-y-4">
            {recentRequests.length > 0 ? (
              recentRequests.map((request) => (
                <div key={request.id} className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                    {/* Left Section */}
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-3 mb-4">
                        <h3 className="text-lg md:text-xl font-bold text-gray-900">
                          Request #{request.requestId}
                        </h3>
                        {request.urgency === 'critical' || request.urgency === 'Critical' ? (
                          <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-xs font-semibold uppercase animate-pulse">
                            Critical
                          </span>
                        ) : null}
                        {request.donorsMatched > 0 ? (
                          <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-semibold">
                            matched
                          </span>
                        ) : null}
                      </div>

                      <p className="text-gray-700 font-medium mb-4">
                        {request.patientName ? `${request.patientName} - ` : 'Emergency Surgery - '}
                        Patient ID: P-{String(request.id).slice(-5)}
                      </p>

                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                        {/* Blood Type */}
                        <div className="flex items-center gap-2">
                          <span className="text-red-600 text-xl">🩸</span>
                          <div>
                            <p className="text-xs text-gray-500">Blood Type</p>
                            <p className="text-sm font-semibold text-gray-900">{request.bloodType}</p>
                          </div>
                        </div>

                        {/* Units Needed */}
                        <div className="flex items-center gap-2">
                          <span className="text-gray-600 text-xl">📦</span>
                          <div>
                            <p className="text-xs text-gray-500">Units Needed</p>
                            <p className="text-sm font-semibold text-gray-900">{request.quantity}</p>
                          </div>
                        </div>

                        {/* Donors Matched */}
                        <div className="flex items-center gap-2">
                          <span className="text-blue-600 text-xl">👥</span>
                          <div>
                            <p className="text-xs text-gray-500">Donors Matched</p>
                            <p className="text-sm font-semibold text-gray-900">{request.donorsMatched || 0}</p>
                          </div>
                        </div>

                        {/* Time Elapsed */}
                        <div className="flex items-center gap-2">
                          <span className="text-gray-600 text-xl">🕐</span>
                          <div>
                            <p className="text-xs text-gray-500">Time Elapsed</p>
                            <p className="text-sm font-semibold text-gray-900">{request.timeElapsed || 'Just now'}</p>
                          </div>
                        </div>
                      </div>

                      {/* Notes */}
                      <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                        <p className="text-sm text-gray-700">
                          <span className="font-medium">Notes:</span> {request.location || 'Trauma case - Multiple injuries requiring immediate transfusion'}
                        </p>
                      </div>
                    </div>

                    {/* Right Section - Action Buttons */}
                    <div className="flex flex-col gap-2 lg:min-w-[120px]">
                      <button
                        onClick={() => handleDetails(request)}
                        className="flex items-center justify-center gap-2 w-full px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 hover:border-gray-400 transition-all duration-200 font-medium"
                      >
                        <span className="text-lg">👁️</span>
                        <span>Details</span>
                      </button>
                      <button
                        onClick={() => handleUpdate(request)}
                        className="flex items-center justify-center gap-2 w-full px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 active:bg-red-800 shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-105 active:scale-95 font-medium"
                      >
                        <span className="text-lg">🔄</span>
                        <span>Update</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="bg-white rounded-lg shadow-md p-8 text-center">
                <p className="text-gray-500 text-lg">No recent requests</p>
                <p className="text-gray-400 text-sm mt-2">Create a new blood request to get started</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
