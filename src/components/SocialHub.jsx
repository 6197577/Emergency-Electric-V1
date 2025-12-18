import { YouTubeEmbed } from '@next/third-parties/google';
import { Facebook, Linkedin, Video, Globe, MessageSquare } from 'lucide-react';

export default function SocialHub() {
  return (
    <section className="bg-slate-50 py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-black text-center mb-8">The Doctor's Network</h2>
        
        {/* 3 Commercial Slots */}
        <div className="grid md:grid-cols-3 gap-4 mb-10">
          <YouTubeEmbed videoid="VIDEO_ID_1" params="controls=0" />
          <YouTubeEmbed videoid="VIDEO_ID_2" params="controls=0" />
          <YouTubeEmbed videoid="VIDEO_ID_3" params="controls=0" />
        </div>

        {/* Omni-Channel Links */}
        <div className="flex justify-center gap-8 text-slate-700">
           <a href="https://tiktok.com/@electricdoctors" className="flex flex-col items-center gap-2 hover:text-red-600">
             <Video size={32} /> <span className="text-xs font-bold">TikTok</span>
           </a>
           <a href="https://linkedin.com/in/anthonytotten" className="flex flex-col items-center gap-2 hover:text-blue-600">
             <Linkedin size={32} /> <span className="text-xs font-bold">LinkedIn</span>
           </a>
           <a href="https://discord.gg/electricdoctors" className="flex flex-col items-center gap-2 hover:text-indigo-600">
             <MessageSquare size={32} /> <span className="text-xs font-bold">Discord</span>
           </a>
        </div>
      </div>
    </section>
  );
}
