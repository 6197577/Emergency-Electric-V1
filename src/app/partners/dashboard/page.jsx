'use client';
import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import { supabase } from '@/lib/db';
import { Camera } from 'lucide-react';

export default function PartnerDashboard() {
  const [email, setEmail] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
      supabase.auth.getSession().then(({ data: { session } }) => {
          if (session) { setIsLoggedIn(true); fetchOrders(session.user.email); }
      });
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    const { error } = await supabase.auth.signInWithOtp({ email });
    if (error) alert(error.message); else alert("Check your email for the login link!");
  };

  const fetchOrders = async (email) => {
      const { data: partner } = await supabase.from('partners').select('partner_id').eq('email', email).single();
      if (partner) {
          const { data } = await supabase.from('work_orders').select('*').eq('partner_id', partner.partner_id);
          setOrders(data || []);
      }
  };

  if (!isLoggedIn) return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <form onSubmit={handleLogin} className="bg-white p-8 rounded shadow"><input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" className="border p-2 w-full mb-4"/><button className="bg-black text-white w-full p-2">Send Magic Link</button></form>
      </div>
  );

  return (
      <div className="min-h-screen bg-gray-50">
          <Header />
          <div className="container mx-auto p-4">
              <h1 className="text-3xl font-bold mb-6">Work Orders</h1>
              {orders.map(o => (
                  <div key={o.order_id} className="bg-white p-4 mb-4 rounded shadow">
                      <h2 className="font-bold">{o.service_address}</h2>
                      <span className="text-green-600">${o.payout_amount}</span>
                  </div>
              ))}
          </div>
      </div>
  );
}
