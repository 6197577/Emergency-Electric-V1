'use client';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const containerStyle = { width: '100%', height: '100vh' };
const center = { lat: 38.3498, lng: -81.6326 }; // Default: Charleston, WV

export default function TrackPage({ params }) {
  // In a real build, fetch these coordinates from your API based on params.jobId
  const techLocation = { lat: 38.35, lng: -81.63 }; 
  
  return (
    <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_MAPS_API_KEY}>
      <div className="relative h-screen w-full">
        <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={13}>
          {/* Technician Marker */}
          <Marker position={techLocation} icon="http://maps.google.com/mapfiles/kml/shapes/truck.png" />
        </GoogleMap>
        
        {/* Overlay Card */}
        <div className="absolute bottom-10 left-4 right-4 bg-white p-6 rounded-xl shadow-2xl">
          <h2 className="text-xl font-bold">Dr. Anthony is In Route</h2>
          <p className="text-green-600 font-bold">ETA: 12 Minutes</p>
          <div className="mt-4 flex gap-2">
             <span className="bg-slate-100 px-3 py-1 rounded text-sm">WV Lic #235157333</span>
          </div>
        </div>
      </div>
    </LoadScript>
  );
}
