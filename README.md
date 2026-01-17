# BloodConnect - Blood Donation Management System

A comprehensive, responsive web application for managing blood donations, requests, and donor coordination.

## Features

- ✅ **Multi-step Donor Registration** with progress indicator
- ✅ **Blood Request Portal** with form validation
- ✅ **Emergency Dashboard** with real-time KPIs and tabs
- ✅ **Live Donor Map** with Google Maps integration
- ✅ **Hospital Management Center** with metrics and request tracking
- ✅ **Critical Alerts System** for emergency situations
- ✅ **Fully Responsive Design** - works on mobile, tablet, and desktop
- ✅ **Dynamic State Management** with localStorage persistence
- ✅ **Real-time Statistics** and analytics

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Google Maps API Key (Optional but Recommended)

To enable the full Google Maps functionality:

1. Get a Google Maps API key from [Google Cloud Console](https://console.cloud.google.com/)
2. Enable the following APIs:
   - Maps JavaScript API
   - Geocoding API
   - Places API (optional)

3. Create a `.env` file in the root directory:

```env
VITE_GOOGLE_MAPS_API_KEY=your_api_key_here
```

**Note:** The application will work without the API key, but the map will show a placeholder message.

### 3. Supabase (Optional)

If you want to use Supabase for authentication and database:

1. Create a Supabase project at [supabase.com](https://supabase.com)
2. Add to `.env`:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

**Note:** The application works without Supabase - it uses localStorage for data persistence.

### 4. Run Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### 5. Build for Production

```bash
npm run build
```

## Pages

- `/` - Blood Request Portal (Home)
- `/blood-request-portal` - Submit blood requests
- `/donor-registration` - Multi-step donor registration
- `/emergency-dashboard` - Emergency monitoring dashboard
- `/critical-alerts` - Critical alerts and notifications
- `/hospital-management-center` - Hospital management dashboard
- `/live-donor-map` - Interactive donor map with Google Maps
- `/admin-analytics-center` - Admin analytics and management

## Technology Stack

- **React 18** - UI framework
- **Vite** - Build tool
- **React Router** - Routing
- **Tailwind CSS** - Styling
- **Google Maps API** - Map integration
- **LocalStorage** - Data persistence

## Features Implemented

### Responsive Design
- Mobile-first approach
- Breakpoints: Mobile (<640px), Tablet (640-1024px), Desktop (>1024px)
- Touch-friendly interfaces
- Adaptive layouts

### Dynamic Functionality
- Real-time data updates
- Form validation
- State management with Context API
- LocalStorage persistence
- Interactive components
- Loading states
- Error handling

### Google Maps Integration
- Interactive map display
- Donor markers
- Location filtering
- Search radius
- Current location detection
- Info windows for donor details

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT
