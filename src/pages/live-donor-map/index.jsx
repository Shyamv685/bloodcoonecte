import { useState, useMemo, useCallback } from 'react'
import { useData } from '../../contexts/DataContext'
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api'
import MapLegend from './components/MapLegend'
import SearchFilters from './components/SearchFilters'
import DonorStats from './components/DonorStats'
import QuickActions from './components/QuickActions'
import RecentActivity from './components/RecentActivity'
import EmergencyRequest from './components/EmergencyRequest'

const mapContainerStyle = {
  width: '100%',
  height: '100%',
  minHeight: '500px',
}

const defaultCenter = {
  lat: 40.7128,
  lng: -74.0060,
}

// const libraries = ['places', 'geometry']

export default function LiveDonorMap() {
  const { donors, bloodRequests, getStats } = useData()
  const stats = getStats()
  const [selectedBloodType, setSelectedBloodType] = useState('All Types')
  const [searchRadius, setSearchRadius] = useState('10')
  const [map, setMap] = useState(null)
  const [selectedDonor, setSelectedDonor] = useState(null)
  const [mapCenter, setMapCenter] = useState(defaultCenter)
  const [hoveredBloodType, setHoveredBloodType] = useState(null)
  const [mapError, setMapError] = useState(null)
  const [isMapLoaded, setIsMapLoaded] = useState(false)

  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || ''

  const filteredDonors = useMemo(() => {
    return donors.filter((donor) => {
      if (selectedBloodType !== 'All Types' && donor.bloodType !== selectedBloodType) {
        return false
      }
      return true
    })
  }, [donors, selectedBloodType])

  const bloodTypes = ['All Types', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']

  const handleUseCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const newCenter = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          }
          setMapCenter(newCenter)
          if (map) {
            map.panTo(newCenter)
            map.setZoom(15)
          }
        },
        (error) => {
          console.error('Error getting location:', error)
          alert('Unable to get your location. Please enable location services.')
        }
      )
    } else {
      alert('Geolocation is not supported by your browser.')
    }
  }

  const handleMapLoad = useCallback((mapInstance) => {
    setMap(mapInstance)
    setIsMapLoaded(true)
    setMapError(null)
  }, [])

  const handleMapError = useCallback(() => {
    setMapError('Failed to load Google Maps. Please check your API key and console for details.')
    setIsMapLoaded(false)
  }, [])

  const handleFullView = () => {
    window.open('/live-donor-map', '_blank')
  }

  // Check if API key is valid (not empty and not placeholder)
  const isValidApiKey = apiKey && apiKey !== '' && apiKey !== 'your_google_maps_api_key_here'

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 md:px-8 py-6 md:py-8">
        {/* Title */}
        <div className="mb-6">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2 flex items-center gap-2">
            <span className="text-red-600">📍</span> Live Donor Map
          </h1>
          <p className="text-gray-600">Real-time donor availability in your area</p>
        </div>

        {/* Stats Bar */}
        <DonorStats stats={stats} />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mt-6">
          {/* Left Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <SearchFilters
              selectedBloodType={selectedBloodType}
              searchRadius={searchRadius}
              onBloodTypeChange={setSelectedBloodType}
              onRadiusChange={setSearchRadius}
              onUseCurrentLocation={handleUseCurrentLocation}
              availableDonors={filteredDonors.length}
            />
            <MapLegend />
          </div>

          {/* Map Area */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-4 md:p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Live Donor Map</h2>
                <button
                  onClick={handleFullView}
                  onMouseEnter={(e) => e.currentTarget.classList.add('bg-gray-200', 'scale-105')}
                  onMouseLeave={(e) => e.currentTarget.classList.remove('bg-gray-200', 'scale-105')}
                  className="px-3 py-1 bg-gray-100 rounded text-sm hover:bg-gray-200 transition-all duration-200 transform hover:scale-105 active:scale-95"
                >
                  Full View
                </button>
              </div>

              {!isValidApiKey ? (
                <div className="bg-gray-100 rounded-lg h-96 flex items-center justify-center border-2 border-dashed border-gray-300">
                  <div className="text-center p-6">
                    <p className="text-4xl mb-4">🗺️</p>
                    <p className="text-gray-600 mb-2 font-medium">Google Maps API Key Required</p>
                    <p className="text-sm text-gray-500 mb-4">
                      Add your API key to the .env file as VITE_GOOGLE_MAPS_API_KEY
                    </p>
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-left max-w-md">
                      <p className="text-xs text-yellow-800 font-semibold mb-2">Setup Instructions:</p>
                      <ol className="text-xs text-yellow-700 space-y-1 list-decimal list-inside">
                        <li>Get API key from Google Cloud Console</li>
                        <li>Enable Maps JavaScript API</li>
                        <li>Add key to .env file</li>
                        <li>Restart dev server</li>
                      </ol>
                    </div>
                  </div>
                </div>
              ) : mapError ? (
                <div className="bg-red-50 border border-red-200 rounded-lg h-96 flex items-center justify-center">
                  <div className="text-center p-6">
                    <p className="text-red-600 text-2xl mb-4">⚠️</p>
                    <p className="text-red-800 font-semibold mb-2">Map Loading Error</p>
                    <p className="text-sm text-red-600 mb-4">{mapError}</p>
                    <button
                      onClick={() => {
                        setMapError(null)
                        window.location.reload()
                      }}
                      className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                    >
                      Retry
                    </button>
                  </div>
                </div>
              ) : (
                <LoadScript
                  googleMapsApiKey={apiKey}
                  loadingElement={<div className="h-96 bg-gray-100 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
                      <p className="text-gray-600">Loading Google Maps...</p>
                    </div>
                  </div>}
                  onError={handleMapError}
                >
                  <div className="relative" style={{ height: '500px', width: '100%' }}>
                    <GoogleMap
                      mapContainerStyle={mapContainerStyle}
                      center={mapCenter}
                      zoom={12}
                      onLoad={handleMapLoad}
                      onError={handleMapError}
                      options={{
                        disableDefaultUI: false,
                        zoomControl: true,
                        streetViewControl: false,
                        mapTypeControl: true,
                        fullscreenControl: true,
                      }}
                    >
                      {isMapLoaded && filteredDonors.slice(0, 10).map((donor, index) => {
                        const lat = mapCenter.lat + (Math.random() - 0.5) * 0.1
                        const lng = mapCenter.lng + (Math.random() - 0.5) * 0.1
                        return (
                          <Marker
                            key={donor.id}
                            position={{ lat, lng }}
                            icon={{
                              url: donor.available
                                ? 'http://maps.google.com/mapfiles/ms/icons/green-dot.png'
                                : 'http://maps.google.com/mapfiles/ms/icons/gray-dot.png',
                            }}
                            onClick={() => setSelectedDonor({ ...donor, position: { lat, lng } })}
                          />
                        )
                      })}

                      {selectedDonor && (
                        <InfoWindow
                          position={selectedDonor.position}
                          onCloseClick={() => setSelectedDonor(null)}
                        >
                          <div className="p-2">
                            <h3 className="font-semibold">{selectedDonor.name}</h3>
                            <p className="text-sm">Blood Type: {selectedDonor.bloodType}</p>
                            <p className="text-sm">Status: {selectedDonor.available ? 'Available' : 'Unavailable'}</p>
                            {selectedDonor.distance && (
                              <p className="text-sm">Distance: {selectedDonor.distance}</p>
                            )}
                            <button
                              onClick={() => {
                                alert(`Contacting ${selectedDonor.name}...`)
                                setSelectedDonor(null)
                              }}
                              className="mt-2 px-3 py-1 bg-red-600 text-white rounded text-xs hover:bg-red-700 transition-colors"
                            >
                              Contact
                            </button>
                          </div>
                        </InfoWindow>
                      )}
                    </GoogleMap>
                  </div>
                </LoadScript>
              )}

              {/* Blood Type Filters */}
              <div className="flex gap-2 mt-4 overflow-x-auto pb-2 scrollbar-hide">
                {bloodTypes.map((type) => (
                  <button
                    key={type}
                    onClick={() => setSelectedBloodType(type)}
                    onMouseEnter={() => setHoveredBloodType(type)}
                    onMouseLeave={() => setHoveredBloodType(null)}
                    className={`px-3 py-1 rounded text-sm whitespace-nowrap transition-all duration-200 ${
                      selectedBloodType === type
                        ? 'bg-red-600 text-white shadow-md scale-105'
                        : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-red-300'
                    } transform ${
                      hoveredBloodType === type && selectedBloodType !== type ? 'scale-105' : ''
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>

              {/* Blood Type Availability Bar */}
              <div className="mt-4 flex flex-wrap gap-3 items-center">
                {['O+', 'A+', 'B+', 'AB+', 'O-', 'A-'].map((type, index) => (
                  <div
                    key={type}
                    className="flex items-center gap-2 hover:bg-gray-50 px-2 py-1 rounded transition-colors duration-200 cursor-pointer"
                  >
                    <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></div>
                    <span className="text-sm text-gray-700">
                      {type} ({(Math.random() * 5 + 0.5).toFixed(1)} km)
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Emergency Request Section */}
            <EmergencyRequest />
          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <QuickActions />
            <RecentActivity requests={bloodRequests} donors={donors} />
          </div>
        </div>
      </div>
    </div>
  )
}
