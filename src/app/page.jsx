'use client';
import { useState } from 'react';
import ServiceIntake from '@/components/ServiceIntake';
import AmandaChat from '@/components/AmandaChat';

export default function Home() {
  const [userLocation, setUserLocation] = useState(null);

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex flex-col">
      {/* Hero Section */}
      <div className="w-full bg-gray-900 text-white py-12 px-4 text-center">
        <h1 className="text-4xl font-bold mb-2 text-yellow-400">Electric Doctor's</h1>
        <p className="text-gray-300">Enterprise Grade Electrical Solutions</p>
      </div>

      {/* Dynamic Content Area */}
      <div className="flex-1 flex items-center justify-center p-4">
        {!userLocation ? (
          // State 1: Ask for Location
          <div className="w-full max-w-md">
            <ServiceIntake onLocationSet={(loc) => setUserLocation(loc)} />
          </div>
        ) : (
          // State 2: Active Chat with Location Context
          <div className="w-full max-w-2xl">
            <div className="mb-4">
              <button 
                onClick={() => setUserLocation(null)}
                className="text-sm text-gray-500 hover:text-gray-800 underline"
              >
                ← Change Location
              </button>
            </div>
            <AmandaChat location={userLocation} />
          </div>
        )}
      </div>
    </main>
  );
}
