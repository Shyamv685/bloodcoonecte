import { useState, useMemo, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { useData } from '../../../contexts/DataContext'

const defaultCenter = [40.7128, -74.0060]

const bloodTypes = ['All Types', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']

// Helper: Haversine distance in km
const getDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // km
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a = 
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) * 
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)); 
  return R * c;
};

const formatDistance = (distKm) => {
  if (distKm < 1) {
    return `${Math.round(distKm * 1000)} meters`;
  }
  return `${distKm.toFixed(1)} km`;
};

// Auto-recentering component when mapCenter changes
function MapRecenter({ center }) {
  const map = useMap();
  useEffect(() => {
    map.flyTo(center, map.getZoom());
  }, [center, map]);
  return null;
}

export default function LiveDonorMapWidget() {
  const navigate = useNavigate()
  const { donors, emergencies } = useData()
  const [selectedBloodType, setSelectedBloodType] = useState('All Types')
  const [hoveredType, setHoveredType] = useState(null)
  const [selectedItem, setSelectedItem] = useState(null)
  
  // Use a fixed center for widget unless we want to geolocate
  const [mapCenter, setMapCenter] = useState(defaultCenter)
  const searchRadius = '50'; // Default large radius for widget

  const handleFullView = () => {
    navigate('/live-donor-map')
  }

  const handleUseCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const newCenter = [position.coords.latitude, position.coords.longitude]
          setMapCenter(newCenter)
          // Also reset filter to show all blood types when relocating
          setSelectedBloodType('All Types')
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

  const mapItems = useMemo(() => {
    const items = [];
    
    // Seeded pseudo-random for determining positions around center based on ID
    const seededRandom = (seed) => {
        let x = Math.sin(seed) * 10000;
        return x - Math.floor(x);
    };

    // Calculate donor locations
    donors.forEach(donor => {
      const seed = donor.id || Math.random();
      const maxDegreeOffset = 0.5; // up to ~55km away
      const latOffset = (seededRandom(seed) - 0.5) * maxDegreeOffset;
      const lngOffset = (seededRandom(seed + 1) - 0.5) * maxDegreeOffset;
      
      // If it's a dummy donor (IDs start around 1000-1100) or missing coordinates, center them around the user dynamically!
      const isDummy = donor.id >= 1000 && donor.id < 2000;
      const lat = (isDummy || !donor.latitude) ? (mapCenter[0] + latOffset) : donor.latitude;
      const lng = (isDummy || !donor.longitude) ? (mapCenter[1] + lngOffset) : donor.longitude;
      
      const distance = getDistance(mapCenter[0], mapCenter[1], lat, lng);

      if (selectedBloodType !== 'All Types' && donor.bloodType !== selectedBloodType) return;
      if (distance > parseFloat(searchRadius)) return;

      let status = 'Unavailable'
      if (donor.available) {
        status = (seededRandom(seed + 2) > 0.3) ? 'Available' : 'Busy'
      }

      items.push({ ...donor, lat, lng, distance, type: 'donor', status });
    });

    // Calculate emergency locations
    (emergencies || []).forEach((emergency, idx) => {
      const seed = emergency.id || (idx + 1000);
      const maxDegreeOffset = 0.2; 
      const latOffset = (seededRandom(seed) - 0.5) * maxDegreeOffset;
      const lngOffset = (seededRandom(seed + 1) - 0.5) * maxDegreeOffset;
      
      const isDummy = !emergency.latitude || (emergency.id >= 1000 && emergency.id < 2000);
      const lat = isDummy ? (mapCenter[0] + latOffset) : emergency.latitude;
      const lng = isDummy ? (mapCenter[1] + lngOffset) : emergency.longitude;
      
      const distance = getDistance(mapCenter[0], mapCenter[1], lat, lng);

      if (selectedBloodType !== 'All Types' && emergency.bloodType && emergency.bloodType !== selectedBloodType) return;
      if (distance > parseFloat(searchRadius)) return;

      items.push({ ...emergency, lat, lng, distance, type: 'emergency' });
    });

    return items;
  }, [donors, emergencies, mapCenter, searchRadius, selectedBloodType]);

  const createCustomIcon = (item) => {
    let bgColor, label, symbol, borderColor;
    
    if (item.type === 'emergency') {
      bgColor = 'bg-red-600';
      borderColor = 'border-red-800';
      symbol = '⚠';
      label = item.bloodType || 'EMG';
    } else if (item.status === 'Available') {
      bgColor = 'bg-green-500';
      borderColor = 'border-green-700';
      symbol = '🩸';
      label = item.bloodType;
    } else if (item.status === 'Busy') {
      bgColor = 'bg-yellow-500';
      borderColor = 'border-yellow-700';
      symbol = '⏳';
      label = item.bloodType;
    } else {
      bgColor = 'bg-gray-400';
      borderColor = 'border-gray-600';
      symbol = '✔';
      label = item.bloodType;
    }

    const html = `
      <div class="flex items-center justify-center relative w-12 h-12 group">
        <div class="absolute inset-0 ${bgColor} rounded-full opacity-50 ${item.type === 'emergency' ? 'animate-ping' : ''} shadow-lg"></div>
        <div class="relative w-10 h-10 ${bgColor} border-2 ${borderColor} rounded-full flex flex-col items-center justify-center shadow-md transform transition-transform group-hover:scale-110">
          <span class="text-[10px] font-bold text-white leading-none">${label}</span>
          <span class="text-[14px] leading-none mt-0.5">${symbol}</span>
        </div>
      </div>
    `;

    return L.divIcon({
      html,
      className: 'bg-transparent border-none',
      iconSize: [48, 48],
      iconAnchor: [24, 24],
      popupAnchor: [0, -24]
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 md:p-6">
      <div className="flex flex-wrap sm:flex-nowrap items-center justify-between mb-4 gap-3">
        <h2 className="text-xl font-semibold flex items-center gap-2 w-full sm:w-auto">
          <span className="text-red-600">📍</span> Live Donor Map
        </h2>
        <div className="flex gap-2 w-full sm:w-auto justify-end">
          <button
            onClick={handleUseCurrentLocation}
            className="flex-1 sm:flex-none justify-center px-3 py-1.5 bg-blue-50 text-blue-600 border border-blue-200 rounded-lg text-sm font-medium hover:bg-blue-100 hover:text-blue-700 transition-all duration-200 flex items-center gap-1 shadow-sm active:scale-95"
            title="Use current location"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="hidden sm:inline">Locate Me</span>
            <span className="inline sm:hidden">Locate</span>
          </button>
          <button
            onClick={handleFullView}
            className="flex-1 sm:flex-none justify-center px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-all duration-200 transform active:scale-95 flex items-center gap-1 shadow-sm"
            title="Open in full map view"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
            </svg>
            <span className="hidden sm:inline">Full Map</span>
            <span className="inline sm:hidden">Map</span>
          </button>
        </div>
      </div>

      <div className="rounded-lg overflow-hidden border border-gray-200 shadow-sm relative z-0">
        <MapContainer
          center={mapCenter}
          zoom={12}
          style={{ height: '400px', width: '100%' }}
          className="z-0"
        >
          <MapRecenter center={mapCenter} />
          <TileLayer
            url="https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}"
            attribution="&copy; Google Maps"
          />
          
          <Marker
            position={mapCenter}
            icon={L.divIcon({
              html: `<div class="w-4 h-4 bg-blue-500 rounded-full border-2 border-white shadow-md"></div>`,
              className: 'bg-transparent border-none',
              iconSize: [16, 16],
              iconAnchor: [8, 8]
            })}
          >
            <Popup>Your Center Location</Popup>
          </Marker>

          {mapItems.map((item) => (
            <Marker
              key={`${item.type}-${item.id}`}
              position={[item.lat, item.lng]}
              icon={createCustomIcon(item)}
              eventHandlers={{
                click: () => setSelectedItem(item),
              }}
            >
              {selectedItem && selectedItem.id === item.id && selectedItem.type === item.type && (
                <Popup>
                  <div className="p-2 min-w-[160px]">
                    <h3 className="font-semibold text-lg text-gray-900 border-b pb-1 mb-2">
                      {item.type === 'emergency' 
                        ? '🚨 Emergency Request' 
                        : `Verified Donor #${String(item.id || '0000').slice(-4)}`}
                    </h3>
                    <div className="space-y-1 my-2">
                      <p className="text-sm">
                        <span className="font-medium text-gray-700">Blood Group:</span>{' '}
                        <span className="font-bold text-red-600">{item.bloodType || 'Urgent'}</span>
                      </p>
                      
                      <p className="text-sm">
                        <span className="font-medium text-gray-700">Status:</span>{' '}
                        {item.type === 'emergency' ? (
                          <span className="font-bold text-red-700">Critical Emergency!</span>
                        ) : (
                          <span className={`font-medium ${
                            item.status === 'Available' ? 'text-green-600' :
                            item.status === 'Busy' ? 'text-yellow-600' :
                            'text-gray-500'
                          }`}>
                            {item.status === 'Available' ? 'Available Donor' :
                             item.status === 'Busy' ? 'Busy Donor' :
                             'Unavailable'}
                          </span>
                        )}
                      </p>
                      
                      <p className="text-sm text-gray-600">
                        <span className="font-medium text-gray-700">Distance:</span>{' '}
                        {formatDistance(item.distance)}
                      </p>

                      {item.type !== 'emergency' && (
                        <p className="text-[10px] text-gray-400 mt-2 italic leading-tight">
                          * Identity hidden for privacy.
                        </p>
                      )}
                    </div>

                    <button
                      onClick={() => {
                        alert(item.type === 'emergency' 
                          ? 'Responding to emergency request...' 
                          : `Initiating secure Blood Request to Donor #${String(item.id || '0000').slice(-4)}...`)
                        setSelectedItem(null)
                      }}
                      className={`w-full px-3 py-2 text-white rounded text-sm hover:bg-red-700 transition-colors mt-2 font-medium ${
                        item.type === 'emergency' ? 'bg-red-600' : 'bg-red-500'
                      }`}
                    >
                      {item.type === 'emergency' ? 'Respond Now' : 'Request Blood'}
                    </button>
                  </div>
                </Popup>
              )}
            </Marker>
          ))}
        </MapContainer>
      </div>

      <div className="flex gap-2 mt-4 overflow-x-auto pb-2 scrollbar-hide">
        {bloodTypes.map((type) => (
          <button
            key={type}
            onClick={() => setSelectedBloodType(type)}
            onMouseEnter={() => setHoveredType(type)}
            onMouseLeave={() => setHoveredType(null)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200 ${
              selectedBloodType === type
                ? 'bg-red-600 text-white shadow-md scale-105'
                : 'bg-white border-2 border-gray-200 text-gray-700 hover:bg-red-50 hover:border-red-300'
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
