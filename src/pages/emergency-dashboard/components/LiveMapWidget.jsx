export default function LiveMapWidget() {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4">Live Map</h2>
      <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300">
        <div className="text-center">
          <p className="text-gray-500 mb-2">🗺️</p>
          <p className="text-sm text-gray-600">Interactive map would be displayed here</p>
          <p className="text-xs text-gray-500 mt-1">
            Integration with Google Maps or Mapbox
          </p>
        </div>
      </div>
    </div>
  )
}
