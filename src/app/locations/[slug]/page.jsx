import { cities } from '@/data/cities';
import Header from '@/components/Header';
import AmandaChat from '@/components/AmandaChat';
import { notFound } from 'next/navigation';
import { Calendar, Phone, ShieldAlert } from 'lucide-react';

export async function generateStaticParams() { return cities.map((city) => ({ slug: city.slug })); }

export async function generateMetadata({ params }) {
  const { slug } = await params; // <--- AWAIT ADDED HERE
  const city = cities.find((c) => c.slug === slug);
  if (!city) return { title: 'Not Found' };
  return { title: `Electrician ${city.name} | 24/7 Dispatch`, description: `Licensed in ${city.name}. Call ${city.phone}.` };
}

export default async function CityPage({ params }) {
  const { slug } = await params; // <--- AWAIT ADDED HERE
  const city = cities.find((c) => c.slug === slug);
  if (!city) notFound();

  return (
    <main className="bg-slate-50 min-h-screen pb-24">
      <Header />
      <div className="bg-slate-900 text-white pt-32 pb-16 px-4 text-center">
        <div className="inline-flex items-center gap-2 bg-red-600/20 text-red-400 px-4 py-2 rounded-full mb-6 border border-red-600/50">
            <ShieldAlert className="w-5 h-5" /> <span className="uppercase text-sm">Urgent Dispatch</span>
        </div>
        <h1 className="text-3xl md:text-5xl font-black mb-4">Electrician in <span className="text-red-500">{city.name}</span></h1>
        <div className="flex justify-center gap-4 mt-8">
            <a href={`tel:${city.phone}`} className="bg-red-600 px-8 py-4 rounded font-bold flex items-center gap-2"><Phone/> Call Now</a>
            <a href="#book" className="bg-white text-black px-8 py-4 rounded font-bold flex items-center gap-2"><Calendar/> Book Online</a>
        </div>
      </div>
      <section className="py-12 px-4 max-w-4xl mx-auto">
        <AmandaChat location={city.name} />
      </section>
      <section id="book" className="h-[600px] container mx-auto px-4 py-8">
        {/* Replace with your specific Google Calendar Embed URL */}
        <iframe src="https://calendar.google.com/calendar/embed?src=en.usa%23holiday%40group.v.calendar.google.com" className="w-full h-full border-0"></iframe>
      </section>
    </main>
  );
}
