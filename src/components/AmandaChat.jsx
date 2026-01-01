'use client';
import { useChat } from 'ai/react';
import { Send, Bot, User } from 'lucide-react';
import { useEffect, useRef } from 'react';

export default function AmandaChat({ location }) {
  // Pass the 'location' in the body of every request
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    api: '/api/chat',
    body: { location }, 
  });

  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex flex-col h-[600px] bg-gray-50 rounded-xl border border-gray-200 shadow-xl overflow-hidden">
      {/* Header */}
      <div className="bg-gray-900 p-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-white font-semibold">Dispatcher Amanda</span>
        </div>
        <span className="text-xs text-gray-400 uppercase tracking-wider">
          {location ? `Region: ${location}` : 'National Mode'}
        </span>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 && (
          <div className="text-center text-gray-500 mt-10">
            <p>Hello! I see you are in <strong>{location}</strong>.</p>
            <p>How can I help with your electrical needs today?</p>
          </div>
        )}
        
        {messages.map(m => (
          <div key={m.id} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`flex max-w-[80%] ${m.role === 'user' ? 'flex-row-reverse' : 'flex-row'} items-start gap-2`}>
              <div className={`p-2 rounded-full ${m.role === 'user' ? 'bg-blue-100' : 'bg-yellow-100'}`}>
                {m.role === 'user' ? <User size={16} /> : <Bot size={16} />}
              </div>
              <div className={`p-3 rounded-lg text-sm ${
                m.role === 'user' 
                  ? 'bg-blue-600 text-white rounded-tr-none' 
                  : 'bg-white text-gray-800 border border-gray-200 rounded-tl-none shadow-sm'
              }`}>
                {m.content}
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <form onSubmit={handleSubmit} className="p-4 bg-white border-t border-gray-200 flex gap-2">
        <input
          className="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
          value={input}
          onChange={handleInputChange}
          placeholder="Describe your electrical issue..."
        />
        <button type="submit" className="bg-yellow-400 hover:bg-yellow-500 text-black px-4 py-2 rounded-md font-medium transition-colors flex items-center gap-2">
          Send <Send size={16} />
        </button>
      </form>
    </div>
  );
}
