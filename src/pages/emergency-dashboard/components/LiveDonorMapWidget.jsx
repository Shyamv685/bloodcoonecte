import { useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { MapContainer, TileLayer, Marker } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'

const center = [40.7128, -74.0060]

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

      <MapContainer
        center={center}
        zoom={12}
        style={{ height: '400px', width: '100%' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={center} />
      </MapContainer>

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
