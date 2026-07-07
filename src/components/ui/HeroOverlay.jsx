import React, { useState } from 'react';
import { useAppStore } from '../../store/useAppStore';
import { Sparkles, Play, Shield, Compass, Cpu, Terminal } from 'lucide-react';

export default function HeroOverlay() {
  const { currentView, setView, is3dLoaded } = useAppStore();
  const [isTransitioning, setIsTransitioning] = useState(false);

  if (currentView !== 'hero' && !isTransitioning) return null;

  const handleStartGame = () => {
    setIsTransitioning(true);
    // Wait for fade to black before changing view
    setTimeout(() => {
      setView('museum');
      // Hide transition screen after a short delay to let the glitch pass
      setTimeout(() => setIsTransitioning(false), 1000);
    }, 600);
  };

  return (
    <>
      {/* 
        ========================================================================
        ELITE AAA CINEMATIC HOME SCREEN (LEFT-ALIGNED)
        No more centered box modal! Uses a beautiful dark gradient vignette.
        ========================================================================
      */}
      <div 
        className={`fixed inset-0 z-40 flex items-center p-6 md:p-16 pointer-events-none font-sans bg-gradient-to-r from-slate-950 via-slate-950/80 to-transparent transition-opacity duration-500 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}
      >
        <div className="max-w-3xl w-full space-y-8 pointer-events-auto animate-fade-in pl-4 md:pl-12">
        
        {/* Top Elite Badge */}
        <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-slate-900/50 border border-amber-500/30 backdrop-blur-md">
          <Sparkles className="w-4 h-4 text-amber-400 animate-pulse" />
          <span className="text-[10px] md:text-xs font-game font-bold tracking-widest uppercase text-amber-400">
            SDG 11 Creative Web Competition
          </span>
        </div>

        {/* Main Game Screen Title Typography */}
        <div className="space-y-4 relative z-10">
          <div className="flex items-center gap-2 text-xs font-game font-bold text-cyan-400 tracking-wide uppercase">
            <Terminal className="w-4 h-4" />
            <span>Interactive RPG Heritage Simulator</span>
          </div>

          <h1 className="text-6xl md:text-8xl font-title font-black tracking-tighter text-white uppercase leading-[0.9]">
            SASIRANGAN<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-600 drop-shadow-[0_0_15px_rgba(245,158,11,0.5)]">
              METAVERSE
            </span>
          </h1>
          <p className="text-sm md:text-lg font-game font-bold tracking-widest text-slate-300 uppercase pt-2 border-l-4 border-amber-500 pl-4">
            SDG 11 Target 11.4 • Culture Verse
          </p>
        </div>
          
        <p className="text-slate-400 text-sm md:text-base max-w-xl leading-relaxed relative z-10 font-medium">
          Jelajahi galeri pameran kain adat Kalimantan Selatan dalam format game 3D interaktif. Kontrol karakter lu, temukan rahasia filosofi motif leluhur, dan dukung ekosistem fashion berkelanjutan.
        </p>

        {/* START GAME RPG CTA BUTTON */}
        <div className="pt-6 flex flex-col gap-6 relative z-10 w-fit">
          <button
            onClick={handleStartGame}
            disabled={!is3dLoaded || isTransitioning}
            className={`px-12 py-5 rounded-sm font-game font-black text-xl tracking-widest uppercase flex items-center justify-center gap-4 transition-all duration-300 cursor-pointer skew-x-[-10deg] ${
              is3dLoaded
                ? 'bg-amber-500 text-slate-950 hover:bg-amber-400 hover:scale-105 active:scale-95 shadow-[0_0_40px_rgba(245,158,11,0.6)]'
                : 'bg-slate-800 text-slate-500 cursor-not-allowed'
            }`}
          >
            <div className="skew-x-[10deg] flex items-center gap-3">
              <Play className={`w-7 h-7 fill-current ${is3dLoaded ? 'animate-pulse' : ''}`} />
              <span>{is3dLoaded ? 'MULAI BERMAIN' : 'MEMUAT ASET...'}</span>
            </div>
          </button>

          {/* Tech Specs / Controls Info */}
          <div className="flex flex-col gap-3 text-xs font-game text-slate-400 font-bold uppercase w-fit">
            <span className="flex items-center gap-2"><Cpu className="w-4 h-4 text-cyan-500" /> WASD / Arrow Keys Untuk Jalan</span>
            <span className="flex items-center gap-2"><Compass className="w-4 h-4 text-amber-500" /> Spasi Untuk Lompat</span>
            <span className="flex items-center gap-2"><Shield className="w-4 h-4 text-emerald-500" /> 100% Client-Side Engine</span>
          </div>
        </div>

      </div>
      </div>

      {/* 
        ========================================================================
        TRANSITION FADE SCREEN (Hides the 3D Glitch / Shader Compilation)
        ========================================================================
      */}
      {isTransitioning && (
        <div className="fixed inset-0 z-50 bg-slate-950 flex flex-col items-center justify-center animate-fade-in pointer-events-none">
          <Sparkles className="w-12 h-12 text-amber-400 animate-spin mb-4" style={{ animationDuration: '3s' }} />
          <p className="text-amber-500 font-game font-bold tracking-widest uppercase animate-pulse">
            Memasuki Metaverse...
          </p>
        </div>
      )}
    </>
  );
}
