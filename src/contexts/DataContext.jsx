import React, { createContext, useContext, useState, useEffect } from 'react'

const DataContext = createContext({})

export const useData = () => {
  const context = useContext(DataContext)
  if (!context) {
    throw new Error('useData must be used within a DataProvider')
  }
  return context
}

export const DataProvider = ({ children }) => {
  const [bloodRequests, setBloodRequests] = useState([])
  const [donors, setDonors] = useState([])
  const [hospitals, setHospitals] = useState([])
  const [emergencies, setEmergencies] = useState([])
  const [loading, setLoading] = useState(false)

  // Load initial data from localStorage
  useEffect(() => {
    const savedRequests = localStorage.getItem('bloodRequests')
    const savedDonors = localStorage.getItem('donors')
    const savedHospitals = localStorage.getItem('hospitals')
    const savedEmergencies = localStorage.getItem('emergencies')

    if (savedRequests) setBloodRequests(JSON.parse(savedRequests))
    if (savedDonors) setDonors(JSON.parse(savedDonors))
    if (savedHospitals) setHospitals(JSON.parse(savedHospitals))
    if (savedEmergencies) setEmergencies(JSON.parse(savedEmergencies))
  }, [])

  // Save to localStorage whenever data changes
  useEffect(() => {
    localStorage.setItem('bloodRequests', JSON.stringify(bloodRequests))
  }, [bloodRequests])

  useEffect(() => {
    localStorage.setItem('donors', JSON.stringify(donors))
  }, [donors])

  useEffect(() => {
    localStorage.setItem('hospitals', JSON.stringify(hospitals))
  }, [hospitals])

  useEffect(() => {
    localStorage.setItem('emergencies', JSON.stringify(emergencies))
  }, [emergencies])

  const addBloodRequest = (request) => {
    const newRequest = {
      ...request,
      id: Date.now(),
      status: 'Pending',
      createdAt: new Date().toISOString(),
    }
    setBloodRequests([...bloodRequests, newRequest])
    return newRequest
  }

  const updateBloodRequest = (id, updates) => {
    setBloodRequests(bloodRequests.map(req => 
      req.id === id ? { ...req, ...updates } : req
    ))
  }

  const addDonor = (donor) => {
    const newDonor = {
      ...donor,
      id: Date.now(),
      available: true,
      registeredAt: new Date().toISOString(),
    }
    setDonors([...donors, newDonor])
    return newDonor
  }

  const updateDonor = (id, updates) => {
    setDonors(donors.map(donor => 
      donor.id === id ? { ...donor, ...updates } : donor
    ))
  }

  const addEmergency = (emergency) => {
    const newEmergency = {
      ...emergency,
      id: Date.now(),
      time: new Date().toLocaleString(),
      createdAt: new Date().toISOString(),
    }
    setEmergencies([...emergencies, newEmergency])
    return newEmergency
  }

  const getStats = () => {
    return {
      totalRequests: bloodRequests.length,
      activeRequests: bloodRequests.filter(r => r.status === 'Pending').length,
      fulfilledRequests: bloodRequests.filter(r => r.status === 'Fulfilled').length,
      totalDonors: donors.length,
      availableDonors: donors.filter(d => d.available).length,
      totalEmergencies: emergencies.length,
      activeEmergencies: emergencies.filter(e => e.urgency === 'Critical').length,
    }
  }

  const value = {
    bloodRequests,
    donors,
    hospitals,
    emergencies,
    loading,
    setLoading,
    addBloodRequest,
    updateBloodRequest,
    addDonor,
    updateDonor,
    addEmergency,
    getStats,
  }

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>
}
