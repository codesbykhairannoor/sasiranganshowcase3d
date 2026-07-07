import React from 'react';
import { useAppStore } from '../../store/useAppStore';
import { MOTIFS_DATA } from '../../data/motifsData';
import { Sparkles, Volume2, VolumeX, RotateCcw, Globe, Award, Home, Terminal } from 'lucide-react';

export default function Navbar() {
  const { 
    currentView, 
    setView, 
    resetProgress 
  } = useAppStore();

  if (currentView === 'hero') return null;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 py-3 md:px-8 md:py-4 pointer-events-none font-sans">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 pointer-events-auto">
        
        {/* Simple Back Button */}
        <div 
          onClick={() => setView('hero')}
          className="flex items-center gap-3 cursor-pointer group bg-slate-950/90 backdrop-blur-xl px-4 py-2.5 rounded-2xl border border-white/20 hover:border-amber-500/80 transition-all duration-300 shadow-2xl"
        >
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-amber-500 to-yellow-600 flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
            <Home className="w-4 h-4 text-slate-950 font-black" />
          </div>
          <p className="text-xs text-slate-200 font-game font-bold tracking-wide">
            Kembali Ke Menu Utama
          </p>
        </div>

        {/* Right Actions: Just Reset Progress */}
        <div className="flex items-center gap-2 font-game font-bold">
          <button
            onClick={resetProgress}
            title="Reset Eksplorasi (In-Memory RAM)"
            className="bg-slate-950/90 backdrop-blur-xl hover:bg-slate-900 p-2.5 rounded-xl text-slate-400 hover:text-rose-400 transition-all border border-white/20 shadow-2xl cursor-pointer hover:border-rose-500/50"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>

      </div>
    </header>
  );
}
