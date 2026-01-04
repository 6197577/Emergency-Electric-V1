'use client';
import { Send, Bot, Camera } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

export default function AmandaChat({ location }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);

  useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setSelectedImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input && !selectedImage) return;
    const userMsg = { id: Date.now(), role: 'user', content: input, experimental_attachments: selectedImage ? [{ url: selectedImage }] : undefined };
    setMessages(prev => [...prev, userMsg]);
    setInput(''); setSelectedImage(null); setLoading(true);

    try {
        const res = await fetch('/api/chat', { method: 'POST', body: JSON.stringify({ messages: [...messages, userMsg], location, siteId: 'main' }) });
        const data = await res.text();
        setMessages(prev => [...prev, { id: Date.now() + 1, role: 'assistant', content: data }]);
    } catch (error) { console.error(error); } finally { setLoading(false); }
  };

  return (
    <div className="flex flex-col h-[500px] bg-white rounded-xl border border-gray-200 shadow-xl overflow-hidden">
      <div className="p-4 flex items-center justify-between bg-slate-900">
        <span className="text-white font-semibold flex gap-2 items-center"><Bot /> Amanda</span>
        <span className="text-xs text-gray-400">{location || 'National'}</span>
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 && <p className="text-center text-gray-500 mt-10">Describe your issue or upload a photo.</p>}
        {messages.map(m => (
          <div key={m.id} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
             <div className={`p-3 rounded-lg text-sm max-w-[80%] ${m.role === 'user' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-800'}`}>
                <p>{m.content}</p>
                {m.experimental_attachments?.map((att, i) => <img key={i} src={att.url} className="mt-2 rounded-md h-20" />)}
                {m.content.includes("https://checkout.stripe.com") && <a href={m.content.match(/https:\/\/checkout\.stripe\.com[^\s]+/)[0]} target="_blank" className="block mt-2 bg-green-600 text-white p-2 text-center rounded font-bold">Secure Slot & Pay</a>}
             </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <form onSubmit={handleSubmit} className="p-4 border-t flex gap-2">
        <input type="file" className="hidden" ref={fileInputRef} onChange={handleFileChange} />
        <button type="button" onClick={() => fileInputRef.current?.click()}><Camera className="text-gray-500" /></button>
        <input className="flex-1 border rounded p-2" value={input} onChange={(e) => setInput(e.target.value)} placeholder="Type here..." />
        <button type="submit" disabled={loading}><Send className="text-blue-600" /></button>
      </form>
    </div>
  );
}

