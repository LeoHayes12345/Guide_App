import React from 'react';
import { Badge } from '@/components/ui/badge';

const Hero: React.FC = () => {
  return (
    <div className="relative min-h-[70vh] flex items-center justify-center text-white overflow-hidden">
      {/* Blue/Navy gradient background */}
      <div 
        className="absolute inset-0 bg-gradient-to-br from-slate-700 via-slate-800 to-slate-900"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}
      />
      
      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        <div className="mb-6">
          <Badge variant="secondary" className="mb-6 bg-blue-500/20 text-blue-100 border-blue-400/30 backdrop-blur-sm px-4 py-2 text-sm modern-text">
            Welcome to Tropoja
          </Badge>
        </div>
        
        <h1 className="hero-title text-5xl md:text-7xl lg:text-8xl mb-6 leading-[0.9] tracking-tight">
          Discover
          <span className="block bg-gradient-to-r from-blue-300 via-blue-400 to-blue-500 bg-clip-text text-transparent">
            Tropoja
          </span>
        </h1>
        
        <p className="hero-subtitle text-lg md:text-xl lg:text-2xl mb-8 text-slate-100 max-w-3xl mx-auto leading-relaxed">
          Experience the pristine beauty of the Albanian Alps, traditional mountain villages, and breathtaking hiking trails in Northern Albania's hidden gem.
        </p>
        
        <div className="space-y-3 text-slate-100">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 max-w-4xl mx-auto">
            <span className="bg-blue-500/15 px-2 py-3 rounded-lg backdrop-blur-sm text-center text-xs sm:text-sm leading-tight">
              The Town - Bajram Curri
            </span>
            <span className="bg-blue-500/15 px-2 py-3 rounded-lg backdrop-blur-sm text-center text-xs sm:text-sm leading-tight">
              The Valley - Valbona Valley National Park
            </span>
            <span className="bg-blue-500/15 px-2 py-3 rounded-lg backdrop-blur-sm text-center text-xs sm:text-sm leading-tight">
              The Albanian Alps - 'Bjeshket e Namuna' National Park
            </span>
            <span className="bg-blue-500/15 px-2 py-3 rounded-lg backdrop-blur-sm text-center text-xs sm:text-sm leading-tight">
              The Peaks : Maja Jezerces, Maja Hekurave, Maja Shkelzenit
            </span>
            <span className="bg-blue-500/15 px-2 py-3 rounded-lg backdrop-blur-sm text-center text-xs sm:text-sm leading-tight">
              The Rivers - Valbona, Gashi, Tropoje & Curraj Rivers
            </span>
            <span className="bg-blue-500/15 px-2 py-3 rounded-lg backdrop-blur-sm text-center text-xs sm:text-sm leading-tight sm:col-span-2 lg:col-span-1">
              The Lake: Fierze - Koman & Shala River
            </span>
            <span className="bg-blue-500/15 px-2 py-3 rounded-lg backdrop-blur-sm text-center text-xs sm:text-sm leading-tight">
              The Nature Parks - Geghysen, Nikaj - Mertur, Padesh, Dragobi, Çerem
            </span>
          </div>
        </div>
      </div>
      
      {/* Blue bottom overlay */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-800/40 via-slate-800/20 to-transparent"></div>
    </div>
  );
};

export default Hero;