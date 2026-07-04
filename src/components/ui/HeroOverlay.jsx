import React from 'react';
import { useAppStore } from '../../store/useAppStore';
import { Sparkles, Play, Shield, Compass, Cpu, Terminal } from 'lucide-react';

export default function HeroOverlay() {
  const { currentView, setView, is3dLoaded } = useAppStore();

  if (currentView !== 'hero') return null;

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center p-6 pointer-events-none font-sans">
      {/* ELITE AAA GAME INTRO SCREEN OVER THE LIVE 3D EXHIBITION HALL */}
      <div className="max-w-2xl w-full text-center space-y-6 pointer-events-auto animate-fade-in">
        
        {/* Top Elite Badge (Title Case Formatting - No ALL CAPS!) */}
        <div className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full bg-slate-950/90 border border-amber-500/40 shadow-2xl backdrop-blur-2xl">
          <Sparkles className="w-4 h-4 text-amber-400 animate-pulse" />
          <span className="text-xs font-game font-bold tracking-wide capitalize text-amber-400">
            SDG 11 Creative Web Competition • Culture Verse
          </span>
        </div>

        {/* Main Game Screen Title Box */}
        <div className="space-y-6 p-8 md:p-12 rounded-3xl bg-slate-950/90 backdrop-blur-2xl border border-white/20 shadow-[0_0_60px_rgba(0,0,0,0.9)] relative overflow-hidden">
          
          {/* Subtle Gold Glow Accent */}
          <div className="absolute -top-32 -left-32 w-64 h-64 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-32 -right-32 w-64 h-64 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />

          <div className="space-y-3 relative z-10">
            <div className="flex items-center justify-center gap-2 text-xs font-game font-bold text-cyan-400 tracking-wide capitalize">
              <Terminal className="w-4 h-4" />
              <span>3D Interactive RPG Heritage Simulator</span>
            </div>

            <h1 className="text-4xl md:text-6xl font-title font-black tracking-tight text-white capitalize leading-none">
              Sasirangan<br />
              <span className="text-gold">
                Metaverse
              </span>
            </h1>
            <p className="text-xs md:text-sm font-game font-bold tracking-wide text-slate-300 capitalize pt-1">
              SDG 11 Target 11.4 • Melestarikan Warisan Budaya
            </p>
          </div>

          <p className="text-slate-200 text-sm md:text-base max-w-lg mx-auto leading-relaxed relative z-10 font-semibold">
            Jelajahi galeri pameran kain adat Kalimantan Selatan dalam format game 3D interaktif. Kontrol karakter lu, temukan rahasia filosofi motif leluhur, dan dukung ekosistem fashion berkelanjutan.
          </p>

          {/* START GAME RPG CTA BUTTON */}
          <div className="pt-4 flex flex-col items-center justify-center gap-4 relative z-10">
            <button
              onClick={() => setView('museum')}
              disabled={!is3dLoaded}
              className={`w-full sm:w-auto px-12 py-5 rounded-2xl font-game font-bold text-base md:text-lg tracking-wide capitalize flex items-center justify-center gap-3.5 shadow-2xl transition-all duration-300 cursor-pointer border ${
                is3dLoaded
                  ? 'bg-gradient-to-r from-amber-500 via-amber-600 to-yellow-600 hover:from-amber-400 hover:to-yellow-500 text-slate-950 border-amber-300 hover:scale-105 active:scale-95 shadow-[0_0_35px_rgba(245,158,11,0.5)]'
                  : 'bg-slate-800 text-slate-500 border-slate-700 cursor-not-allowed'
              }`}
            >
              <Play className="w-6 h-6 fill-current animate-bounce" />
              <span>{is3dLoaded ? '▶ Mulai Bermain (Enter RPG World)' : 'Memuat Aset 3D...'}</span>
            </button>

            {/* Tech Specs / Controls Info */}
            <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-game text-slate-300 font-bold capitalize pt-3 border-t border-white/10 w-full">
              <span className="flex items-center gap-1.5"><Cpu className="w-4 h-4 text-cyan-400" /> WASD / Arrow Keys Untuk Jalan</span>
              <span>•</span>
              <span className="flex items-center gap-1.5"><Compass className="w-4 h-4 text-amber-400" /> Spasi Untuk Lompat</span>
              <span>•</span>
              <span className="flex items-center gap-1.5"><Shield className="w-4 h-4 text-emerald-400" /> 100% RAM State</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
