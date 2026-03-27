import { useState, useMemo, useEffect } from 'react'
import { useData } from '../../contexts/DataContext'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import MapLegend from './components/MapLegend'
import SearchFilters from './components/SearchFilters'
import DonorStats from './components/DonorStats'
import QuickActions from './components/QuickActions'
import RecentActivity from './components/RecentActivity'
import EmergencyRequest from './components/EmergencyRequest'

const defaultCenter = [40.7128, -74.0060]

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

export default function LiveDonorMap() {
  const { donors, bloodRequests, emergencies, getStats } = useData()
  const stats = getStats()
  const [selectedBloodType, setSelectedBloodType] = useState('All Types')
  const [searchRadius, setSearchRadius] = useState('10')
  const [selectedItem, setSelectedItem] = useState(null)
  const [mapCenter, setMapCenter] = useState(defaultCenter)
  const [hoveredBloodType, setHoveredBloodType] = useState(null)

  const bloodTypes = ['All Types', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']

  const handleUseCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const newCenter = [position.coords.latitude, position.coords.longitude]
          setMapCenter(newCenter)
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

  const handleFullView = () => {
    window.open('/live-donor-map', '_blank')
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
      
      const lat = donor.latitude || (mapCenter[0] + latOffset);
      const lng = donor.longitude || (mapCenter[1] + lngOffset);
      const distance = getDistance(mapCenter[0], mapCenter[1], lat, lng);

      if (selectedBloodType !== 'All Types' && donor.bloodType !== selectedBloodType) return;
      if (distance > parseFloat(searchRadius)) return;

      items.push({ ...donor, lat, lng, distance, type: 'donor' });
    });

    // Calculate emergency locations
    (emergencies || []).forEach((emergency, idx) => {
      const seed = emergency.id || (idx + 1000);
      const maxDegreeOffset = 0.2; 
      const latOffset = (seededRandom(seed) - 0.5) * maxDegreeOffset;
      const lngOffset = (seededRandom(seed + 1) - 0.5) * maxDegreeOffset;
      
      const lat = emergency.latitude || (mapCenter[0] + latOffset);
      const lng = emergency.longitude || (mapCenter[1] + lngOffset);
      const distance = getDistance(mapCenter[0], mapCenter[1], lat, lng);

      // We might want to filter emergency types too if a bloodType is required
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
    } else if (item.available) {
      bgColor = 'bg-green-500';
      borderColor = 'border-green-700';
      symbol = '🩸';
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
              availableDonors={mapItems.filter(i => i.type === 'donor' && i.available).length}
            />
            <MapLegend />
          </div>

          {/* Map Area */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-4 md:p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Live Interactive Map</h2>
                <button
                  onClick={handleFullView}
                  onMouseEnter={(e) => e.currentTarget.classList.add('bg-gray-200', 'scale-105')}
                  onMouseLeave={(e) => e.currentTarget.classList.remove('bg-gray-200', 'scale-105')}
                  className="px-3 py-1 bg-gray-100 rounded text-sm hover:bg-gray-200 transition-all duration-200 transform hover:scale-105 active:scale-95"
                >
                  Full View
                </button>
              </div>

              <div className="rounded-lg overflow-hidden border border-gray-200 shadow-sm relative z-0 relative z-0">
                <MapContainer
                  center={mapCenter}
                  zoom={12}
                  style={{ height: '500px', width: '100%' }}
                  className="z-0"
                >
                  <MapRecenter center={mapCenter} />
                  <TileLayer
                    url="https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}"
                    attribution="&copy; Google Maps"
                  />
                  
                  {/* Current Location Marker */}
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
                          <div className="p-2 min-w-[150px]">
                            <h3 className="font-semibold text-lg">
                              {item.type === 'emergency' ? 'Emergency Request' : (item.name || item.patientName || 'Unknown')}
                            </h3>
                            <p className="text-sm font-medium text-red-600 my-1">
                              Blood Type: {item.bloodType || 'Urgent'}
                            </p>
                            
                            {item.type === 'emergency' ? (
                              <>
                                <p className="text-sm text-red-700 mb-1 font-bold">Status: Critical Emergency!</p>
                                {item.message && <p className="text-xs text-gray-700 mb-1 italic">"{item.message}"</p>}
                              </>
                            ) : (
                              <p className="text-sm text-gray-700 mb-1">
                                Status: {item.available ? 'Available' : 'Donated recently'}
                              </p>
                            )}
                            
                            <p className="text-sm text-gray-600 mb-2">
                              Distance: <span className="font-semibold">{formatDistance(item.distance)}</span>
                            </p>

                            <button
                              onClick={() => {
                                alert(item.type === 'emergency' ? 'Responding to emergency...' : `Contacting ${item.name || 'donor'}...`)
                                setSelectedItem(null)
                              }}
                              className="w-full px-3 py-1.5 bg-red-600 text-white rounded text-sm hover:bg-red-700 transition-colors mt-1 font-medium"
                            >
                              {item.type === 'emergency' ? 'Respond Now' : 'Contact'}
                            </button>
                          </div>
                        </Popup>
                      )}
                    </Marker>
                  ))}
                </MapContainer>
              </div>

              {/* Blood Type Filters */}
              <div className="flex gap-2 mt-4 overflow-x-auto pb-2 scrollbar-hide">
                {bloodTypes.map((type) => (
                  <button
                    key={type}
                    onClick={() => setSelectedBloodType(type)}
                    onMouseEnter={() => setHoveredBloodType(type)}
                    onMouseLeave={() => setHoveredBloodType(null)}
                    className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200 ${
                      selectedBloodType === type
                        ? 'bg-red-600 text-white shadow-md scale-105'
                        : 'bg-white border-2 border-gray-200 text-gray-700 hover:bg-red-50 hover:border-red-300'
                    } transform ${
                      hoveredBloodType === type && selectedBloodType !== type ? 'scale-105' : ''
                    }`}
                  >
                    {type}
                  </button>
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
