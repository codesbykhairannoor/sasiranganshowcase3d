import React from 'react';
import { useAppStore } from '../../store/useAppStore';
import { MOTIFS_DATA } from '../../data/motifsData';
import { Sparkles, Volume2, VolumeX, RotateCcw, Globe, Award, Home, Terminal } from 'lucide-react';

export default function Navbar() {
  const { currentView, setView } = useAppStore();

  if (currentView === 'hero') return null;

  return (
    <header className="fixed top-0 left-0 z-50 pointer-events-none font-sans w-full">
      {/* Simple Back Button, flush left, no container */}
      <button 
        onClick={() => setView('hero')}
        className="pointer-events-auto absolute top-4 left-4 flex items-center gap-2 cursor-pointer group transition-all duration-300"
      >
        <div className="w-8 h-8 flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
          <Home className="w-5 h-5 text-amber-500 drop-shadow-[0_0_8px_rgba(245,158,11,0.8)]" />
        </div>
        <span className="text-xs text-slate-100 font-game font-black tracking-widest uppercase drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] group-hover:text-amber-400 transition-colors">
          Kembali Ke Menu Utama
        </span>
      </button>
    </header>
  );
}
