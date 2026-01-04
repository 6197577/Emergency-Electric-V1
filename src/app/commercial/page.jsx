'use client';
import { useState } from 'react';
import Header from '@/components/Header';
import { Send, Bot, Factory } from 'lucide-react';

export default function CommercialPage() {
  const [messages, setMessages] = useState([{ id: 1, role: 'assistant', content: "I am Agent Grey. Tell me about your facility." }]);
  const [input, setInput] = useState('');
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const userMsg = { id: Date.now(), role: 'user', content: input };
    setMessages(prev => [...prev, userMsg]); setInput('');
    const res = await fetch('/api/consultant', { method: 'POST', body: JSON.stringify({ messages: [...messages, userMsg] }) });
    setMessages(prev => [...prev, { id: Date.now() + 1, role: 'assistant', content: await res.text() }]);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      <div className="bg-slate-900 text-white py-16 px-4">
        <div className="container mx-auto max-w-6xl flex flex-col md:flex-row gap-12 items-center">
            <div className="flex-1">
                <h1 className="text-4xl font-black mb-6">Predictive Maintenance</h1>
                <p className="text-xl text-slate-400">We don't fix failures. We predict them.</p>
            </div>
            <div className="w-full max-w-md bg-white text-slate-900 rounded-xl shadow-2xl h-[600px] flex flex-col">
                <div className="flex-1 overflow-y-auto p-6 space-y-4">
                    {messages.map(m => <div key={m.id} className={m.role === 'user' ? 'text-right' : 'text-left'}><span className="inline-block p-2 rounded bg-gray-100">{m.content}</span></div>)}
                </div>
                <form onSubmit={handleSubmit} className="p-4 border-t flex"><input className="flex-1 border p-2" value={input} onChange={e=>setInput(e.target.value)} /><button className="bg-blue-900 text-white p-2">Send</button></form>
            </div>
        </div>
      </div>
    </div>
  );
}
