import Link from 'next/link';
import { Phone } from 'lucide-react';
import { globalPhone } from '@/data/cities';

export default function Header({ localPhone }) {
  const displayPhone = localPhone || globalPhone;

  return (
    <header className="fixed top-0 w-full z-50 bg-white shadow-md">
      {/* Top Warning Bar */}
      <div className="bg-red-600 text-white text-center text-xs py-1 font-bold uppercase tracking-wider animate-pulse">
        24/7 Emergency Response Available
      </div>

      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo Area */}
        <Link href="/" className="font-black text-xl md:text-2xl text-slate-900 tracking-tighter">
          EMERGENCY<span className="text-red-600">ELECTRIC</span>
        </Link>

        {/* Desktop Number (Hidden on mobile) */}
        <div className="hidden md:flex flex-col items-end">
          <span className="text-xs text-slate-500 font-semibold">Speak to a licensed electrician</span>
          <a href={`tel:${displayPhone}`} className="text-2xl font-bold text-slate-900 hover:text-red-600 transition">
            {displayPhone}
          </a>
        </div>
      </div>

      {/* Mobile Sticky Button - The "Panic" Button */}
      <div className="md:hidden fixed bottom-0 left-0 w-full bg-white border-t border-slate-200 p-4 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
        <a 
          href={`tel:${displayPhone}`}
          className="flex items-center justify-center gap-2 w-full bg-red-600 text-white font-bold text-xl py-4 rounded-lg shadow-lg active:bg-red-700 transition"
        >
          <Phone className="w-6 h-6" />
          CALL NOW FOR HELP
        </a>
      </div>
    </header>
  );
}
