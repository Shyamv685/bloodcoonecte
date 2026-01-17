import { useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api'

const mapContainerStyle = {
  width: '100%',
  height: '400px',
}

const center = {
  lat: 40.7128,
  lng: -74.0060,
}

const bloodTypes = ['All Types', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']

export default function LiveDonorMapWidget() {
  const navigate = useNavigate()
  const [selectedBloodType, setSelectedBloodType] = useState('All Types')
  const [map, setMap] = useState(null)
  const [hoveredType, setHoveredType] = useState(null)
  const [mapError, setMapError] = useState(null)

  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || ''

  const handleFullView = () => {
    navigate('/live-donor-map')
  }

  const handleMapLoad = useCallback((mapInstance) => {
    setMap(mapInstance)
    setMapError(null)
  }, [])

  const handleMapError = useCallback(() => {
    setMapError('Failed to load Google Maps')
  }, [])

  const isValidApiKey = apiKey && apiKey !== '' && apiKey !== 'your_google_maps_api_key_here'

  if (!isValidApiKey) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <span className="text-red-600">📍</span> Live Donor Map
          </h2>
          <button
            onClick={handleFullView}
            onMouseEnter={(e) => e.currentTarget.classList.add('bg-gray-200', 'scale-105')}
            onMouseLeave={(e) => e.currentTarget.classList.remove('bg-gray-200', 'scale-105')}
            className="px-3 py-1 bg-gray-100 rounded text-sm hover:bg-gray-200 transition-all duration-200 transform hover:scale-105 active:scale-95"
          >
            Full View
          </button>
        </div>
        <div className="bg-gray-100 rounded-lg h-64 flex items-center justify-center border-2 border-dashed border-gray-300">
          <div className="text-center">
            <p className="text-gray-600 mb-2">🗺️</p>
            <p className="text-sm text-gray-600">Interactive map would be displayed here</p>
            <p className="text-xs text-gray-500 mt-1">
              Add VITE_GOOGLE_MAPS_API_KEY to .env file
            </p>
          </div>
        </div>
        <div className="flex gap-2 mt-4 overflow-x-auto pb-2 scrollbar-hide">
          {bloodTypes.map((type) => (
            <button
              key={type}
              onClick={() => setSelectedBloodType(type)}
              onMouseEnter={() => setHoveredType(type)}
              onMouseLeave={() => setHoveredType(null)}
              className={`px-3 py-1 rounded text-sm whitespace-nowrap transition-all duration-200 ${
                selectedBloodType === type
                  ? 'bg-red-600 text-white shadow-md scale-105'
                  : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-red-300'
              } transform ${
                hoveredType === type && selectedBloodType !== type ? 'scale-105' : ''
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <span className="text-red-600">📍</span> Live Donor Map
        </h2>
        <button
          onClick={handleFullView}
          onMouseEnter={(e) => e.currentTarget.classList.add('bg-gray-200', 'scale-105')}
          onMouseLeave={(e) => e.currentTarget.classList.remove('bg-gray-200', 'scale-105')}
          className="px-3 py-1 bg-gray-100 rounded text-sm hover:bg-gray-200 transition-all duration-200 transform hover:scale-105 active:scale-95"
        >
          Full View
        </button>
      </div>

      {mapError ? (
        <div className="bg-red-50 border border-red-200 rounded-lg h-64 flex items-center justify-center">
          <div className="text-center">
            <p className="text-red-600 mb-2">⚠️</p>
            <p className="text-sm text-red-800">{mapError}</p>
          </div>
        </div>
      ) : (
        <LoadScript
          googleMapsApiKey={apiKey}
          loadingElement={<div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-red-600 mx-auto mb-2"></div>
              <p className="text-xs text-gray-600">Loading map...</p>
            </div>
          </div>}
          onError={handleMapError}
        >
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            center={center}
            zoom={12}
            onLoad={handleMapLoad}
            onError={handleMapError}
            options={{
              disableDefaultUI: false,
              zoomControl: true,
              streetViewControl: false,
              mapTypeControl: true,
            }}
          >
            <Marker position={center} />
          </GoogleMap>
        </LoadScript>
      )}

      <div className="flex gap-2 mt-4 overflow-x-auto pb-2 scrollbar-hide">
        {bloodTypes.map((type) => (
          <button
            key={type}
            onClick={() => setSelectedBloodType(type)}
            onMouseEnter={() => setHoveredType(type)}
            onMouseLeave={() => setHoveredType(null)}
            className={`px-3 py-1 rounded text-sm whitespace-nowrap transition-all duration-200 ${
              selectedBloodType === type
                ? 'bg-red-600 text-white shadow-md scale-105'
                : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-red-300'
            } transform ${
              hoveredType === type && selectedBloodType !== type ? 'scale-105' : ''
            }`}
          >
            {type}
          </button>
        ))}
      </div>
    </div>
  )
}
