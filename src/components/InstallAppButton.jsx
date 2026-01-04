'use client';
import { useEffect, useState } from 'react';
import { Download } from 'lucide-react';

export default function InstallAppButton() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);

  useEffect(() => {
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    });
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') setDeferredPrompt(null);
  };

  if (!deferredPrompt) return null; // Don't show if already installed

  return (
    <button 
      onClick={handleInstall}
      className="fixed bottom-4 right-4 bg-blue-600 text-white px-4 py-3 rounded-full shadow-xl flex items-center gap-2 font-bold z-50 animate-bounce"
    >
      <Download size={20} /> Install Dispatch App
    </button>
  );
}
