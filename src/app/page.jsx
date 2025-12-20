import Header from '@/components/Header';
import Link from 'next/link';
import { cities } from '@/data/cities';
import { Zap, AlertTriangle, Home, Flame } from 'lucide-react';

export default function Home() {
  const symptoms = [
    { title: "Burning Smell", icon: <Flame className="w-8 h-8 text-orange-500" />, desc: "Outlet or switch hot to touch?" },
    { title: "Power Outage", icon: <Zap className="w-8 h-8 text-yellow-500" />, desc: "Half the house lost power?" },
    { title: "Sparking", icon: <AlertTriangle className="w-8 h-8 text-red-500" />, desc: "Sparks from outlet or panel?" },
    { title: "Breaker Tripping", icon: <Home className="w-8 h-8 text-blue-500" />, desc: "Lights flickering or cutting out?" },
  ];

  return (
    <main className="pt-24 pb-24 md:pb-0 bg-slate-50 min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="container mx-auto px-4 text-center mb-12">
        <h1 className="text-4xl md:text-6xl font-black text-slate-900 mb-4 leading-tight">
          Electrical Emergency? <br />
          <span className="text-red-600">We respond in 60 mins.</span>
        </h1>
        <p className="text-lg text-slate-600 mb-8 max-w-2xl mx-auto">
          Do not touch sparking wires. Keep your family safe. Licensed electricians are standing by 24/7.
        </p>
        
        {/* Trust Badges */}
        <div className="flex justify-center gap-4 text-xs font-bold text-slate-500 uppercase tracking-widest mb-8">
          <span>✓ Licensed</span>
          <span>✓ Insured</span>
          <span>✓ Background Checked</span>
        </div>
      </section>

      {/* Symptom Silos */}
      <section className="container mx-auto px-4 mb-16">
        <h2 className="text-2xl font-bold text-slate-900 mb-6 text-center">What is your emergency?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {symptoms.map((symptom, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition cursor-pointer">
              <div className="mb-4">{symptom.icon}</div>
              <h3 className="text-xl font-bold text-slate-900 mb-1">{symptom.title}</h3>
              <p className="text-slate-600">{symptom.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* City Links (SEO Booster) */}
      <section className="container mx-auto px-4">
        <h3 className="text-xl font-bold text-slate-900 mb-4">Serving Major Metropolitan Areas</h3>
        <div className="flex flex-wrap gap-3">
          {cities.map((city) => (
            <Link 
              key={city.slug} 
              href={`/locations/${city.slug}`}
              className="px-4 py-2 bg-white border border-slate-200 rounded-full text-slate-700 hover:border-red-600 hover:text-red-600 transition"
            >
              Emergency Electrician {city.name}
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
