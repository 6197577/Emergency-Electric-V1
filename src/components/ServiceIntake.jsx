'use client';
import { useState } from 'react';
import { MapPin, ArrowRight } from 'lucide-react';

export default function ServiceIntake({ onLocationSet }) {
  const [input, setInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.length >= 5) {
      // Pass the zip code/city up to the parent component
      onLocationSet(input);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white p-6 rounded-xl shadow-lg border border-gray-200">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Electric Doctor's</h2>
        <p className="text-gray-500">Enter your Zip Code to connect with a local expert.</p>
      </div>

      <form onSubmit={handleSubmit} className="relative">
        <MapPin className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
        <input 
          type="text"
          placeholder="e.g. 25301 or Miami"
          className="w-full pl-10 pr-12 py-3 border rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent outline-none transition-all"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button 
          type="submit"
          className="absolute right-2 top-2 bg-yellow-400 hover:bg-yellow-500 text-black p-1.5 rounded-md transition-colors"
        >
          <ArrowRight className="w-5 h-5" />
        </button>
      </form>
    </div>
  );
}
