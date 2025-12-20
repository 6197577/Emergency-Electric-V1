import { cities, globalPhone } from '@/data/cities';
import Header from '@/components/Header';
import { notFound } from 'next/navigation';
import { Calendar, Phone } from 'lucide-react';

// 1. Tell Next.js which cities to build
export async function generateStaticParams() {
  return cities.map((city) => ({
    slug: city.slug,
  }));
}

// 2. SEO Title & Description Generator (The Fix)
export async function generateMetadata({ params }) {
  const { slug } = await params; // Await params for Next.js 15 compatibility
  const city = cities.find((c) => c.slug === slug);
  
  if (!city) return { title: 'City Not Found' };

  return {
    title: `Emergency Electrician in ${city.name}, ${city.state} | 24/7 Repair`,
    description: `Licensed emergency electrician in ${city.name}. Available 24/7 for power outages, burning smells, and urgent repairs. Call ${city.phone}.`,
    alternates: {
      canonical: `https://emergencyelectricrepair.com/locations/${city.slug}`,
    },
  };
}

// 3. The Page Content
export default async function CityPage({ params }) {
  const { slug } = await params; // Await params here too
  const city = cities.find((c) => c.slug === slug);

  if (!city) {
    notFound();
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "EmergencyService",
    "name": `Emergency Electrician ${city.name}`,
    "image": "https://emergencyelectricrepair.com/logo.png",
    "telephone": city.phone,
    "areaServed": {
      "@type": "City",
      "name": city.name,
      "address": {
        "@type": "PostalAddress",
        "addressRegion": city.state
      }
    },
    "openingHours": "Mo-Su 00:00-24:00",
    "priceRange": "$$"
  };

  return (
    <main className="bg-slate-50 min-h-screen pb-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Header localPhone={city.phone} />

      {/* Hero Section */}
      <div className="bg-slate-900 text-white pt-32 pb-16 px-4 text-center">
        <h1 className="text-3xl md:text-5xl font-black mb-4">
          Emergency Electrician in <span className="text-red-500">{city.name}, {city.state}</span>
        </h1>
        <p className="text-slate-300 text-lg mb-8 max-w-2xl mx-auto">
          Local licensed experts in {city.name} are ready to dispatch. 
        </p>
        
        <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
          <a 
            href={`tel:${city.phone}`}
            className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-8 rounded-lg text-xl transition w-full md:w-auto justify-center"
          >
            <Phone className="w-6 h-6" />
            Call {city.phone}
          </a>
          <a 
            href="#book-online"
            className="flex items-center gap-2 bg-white text-slate-900 hover:bg-slate-100 font-bold py-4 px-8 rounded-lg text-xl transition w-full md:w-auto justify-center"
          >
            <Calendar className="w-6 h-6" />
            Book Online
          </a>
        </div>
      </div>

      {/* Online Booking Section */}
      <section id="book-online" className="container mx-auto px-4 py-16">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-200">
          <div className="bg-slate-100 p-6 border-b border-slate-200 text-center">
            <h2 className="text-2xl font-bold text-slate-800">Schedule Service in {city.name}</h2>
            <p className="text-slate-600">Select a time that works for you. No phone call required.</p>
          </div>
          
          <div className="flex justify-center p-4 md:p-8 bg-white">
            <div className="w-full max-w-4xl relative" style={{ height: '600px' }}>
              <iframe 
                src="https://calendar.google.com/calendar/embed?src=c_1c63c21551704472585ed2730b77d70569fa4a6a891b636d4d455494c6e0d2f9%40group.calendar.google.com&ctz=America%2FNew_York" 
                style={{ border: 0, width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 }}
                frameBorder="0" 
                scrolling="no"
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      {/* Cross-Sell Section */}
      <section className="container mx-auto px-4 py-8">
        <div className="bg-blue-50 p-8 rounded-xl border border-blue-100 text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Need a Whole-Home Generator?</h2>
          <p className="text-slate-600 mb-6">
            Don't get caught in the dark in {city.name}. View our top rated backup power solutions.
          </p>
          <button className="text-blue-700 font-bold underline text-lg">See Recommended Generators &rarr;</button>
        </div>
      </section>
    </main>
  );
}

