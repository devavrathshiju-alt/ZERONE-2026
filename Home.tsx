
import React from 'react';
import { ChevronRight, ArrowRight, Zap, Globe, Cpu, Network, Rocket, ShieldAlert } from 'lucide-react';

interface HomeProps {
  onStart: () => void;
  onAdminAccess: () => void;
}

const Home: React.FC<HomeProps> = ({ onStart, onAdminAccess }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[75vh] relative text-center">
      {/* Background Decorative Elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-4xl pointer-events-none -z-10">
        <div className="absolute top-0 left-0 w-64 h-64 bg-purple-600/20 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-600/10 blur-[150px] rounded-full animate-pulse delay-700" />
      </div>

      <div className="flex flex-col items-center relative">
        <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-purple-600/10 border border-purple-500/20 text-purple-400 text-xs font-mono tracking-[0.4em] uppercase mb-8 animate-in fade-in slide-in-from-top-4 duration-1000">
          <Rocket className="w-3 h-3" /> Mission Initialization
        </div>
        
        <h1 
          className="hero-glitch text-7xl md:text-9xl font-syncopate font-black tracking-tighter leading-[0.8] mb-6" 
          data-text="ZERONE"
        >
          ZERONE
        </h1>
        
        <div className="flex items-center gap-4 mb-8">
          <div className="h-[2px] w-12 bg-gradient-to-r from-transparent to-purple-500" />
          <p className="text-2xl md:text-3xl font-syncopate font-light tracking-[0.2em] text-white/40">
            2026 <span className="text-white/20 px-2">|</span> HUB
          </p>
          <div className="h-[2px] w-12 bg-gradient-to-l from-transparent to-purple-500" />
        </div>

        <p className="max-w-2xl text-lg md:text-2xl text-gray-400 font-light mb-16 px-4 leading-relaxed tracking-wide">
          <span className="text-white font-medium italic">"Let's start from zero."</span> <br />
          Experience the ultimate fusion of logic, marketing, and innovation in a tech-driven multiverse.
        </p>

        <div className="flex flex-col sm:flex-row gap-8 items-center justify-center">
          <button 
            onClick={onStart}
            className="group relative px-12 py-5 bg-white text-black font-syncopate font-black text-sm tracking-widest overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-[0_0_40px_rgba(255,255,255,0.2)]"
          >
            <div className="absolute inset-0 bg-purple-600 -translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
            <span className="relative flex items-center gap-3 group-hover:text-white transition-colors">
              INITIALIZE HUB <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
            </span>
          </button>

          <button 
            onClick={onAdminAccess}
            className="px-12 py-5 font-syncopate font-black text-sm tracking-widest text-white/60 border border-white/10 hover:border-purple-500/50 hover:bg-purple-600/5 hover:text-white transition-all flex items-center gap-2"
          >
            <ShieldAlert className="w-4 h-4" /> ADMIN_PORTAL
          </button>
        </div>
      </div>

      {/* Track Icons */}
      <div className="mt-32 w-full max-w-4xl grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 px-6">
        {[
          { icon: Cpu, label: "HARDWARE_OPS", color: "text-purple-400" },
          { icon: Zap, label: "LOGIC_CIRCUITS", color: "text-blue-400" },
          { icon: Network, label: "CORE_NETWORKING", color: "text-emerald-400" },
          { icon: Globe, label: "MARKET_SYNC", color: "text-amber-400" }
        ].map((item, idx) => (
          <div key={idx} className="flex flex-col items-center gap-4 group cursor-default">
            <div className="p-4 rounded-2xl glass group-hover:glow-purple transition-all duration-500">
              <item.icon className={`w-6 h-6 ${item.color}`} />
            </div>
            <span className="text-[10px] font-mono tracking-[0.3em] uppercase opacity-30 group-hover:opacity-100 transition-opacity">
              {item.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
