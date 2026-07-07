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
        <div className="inline-flex items-center gap-3 px-1 border-b border-amber-500/30 pb-2 mb-4">
          <Sparkles className="w-4 h-4 text-amber-500 animate-pulse" />
          <span className="text-[10px] md:text-xs font-game font-semibold tracking-[0.3em] uppercase text-amber-500/90">
            SDG 11 Creative Web Competition
          </span>
        </div>

        {/* Main Game Screen Title Typography */}
        <div className="space-y-2 relative z-10">
          <div className="flex items-center gap-2 text-xs font-game font-medium text-slate-400 tracking-[0.2em] uppercase ml-1">
            <Terminal className="w-4 h-4 text-cyan-500/70" />
            <span>Interactive RPG Heritage Simulator</span>
          </div>

          <h1 className="text-6xl md:text-8xl font-title font-medium tracking-normal text-slate-100 uppercase leading-[1.1] drop-shadow-2xl">
            Sasirangan
            <br />
            <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-600 drop-shadow-[0_0_20px_rgba(245,158,11,0.3)]">
              Metaverse
            </span>
          </h1>
          
          <div className="pt-4 flex items-center gap-3">
            <div className="h-[1px] w-12 bg-amber-500/50"></div>
            <p className="text-sm font-game font-medium tracking-[0.2em] text-slate-300 uppercase">
              Culture Verse • Target 11.4
            </p>
          </div>
        </div>
          
        <p className="text-slate-400/90 text-sm md:text-base max-w-lg leading-relaxed relative z-10 font-game font-light tracking-wide mt-6">
          Jelajahi galeri pameran kain adat Kalimantan Selatan dalam format game 3D interaktif. Kontrol karakter lu, temukan rahasia filosofi motif leluhur, dan dukung ekosistem fashion berkelanjutan.
        </p>

        {/* START GAME RPG CTA MENU (VERTICAL ELEGANT) */}
        <div className="pt-10 flex flex-col gap-4 relative z-10 w-fit">
          <button
            onClick={handleStartGame}
            disabled={!is3dLoaded || isTransitioning}
            className="group relative flex items-center gap-4 text-left font-title font-bold text-2xl md:text-3xl tracking-widest uppercase transition-all duration-500 hover:pl-4 disabled:hover:pl-0"
          >
            {is3dLoaded ? (
              <>
                <span className="text-slate-100 group-hover:text-amber-400 transition-colors duration-300 drop-shadow-md">
                  Mulai Bermain
                </span>
                <Play className="w-5 h-5 text-amber-500 opacity-0 group-hover:opacity-100 transform -translate-x-4 group-hover:translate-x-0 transition-all duration-500" />
              </>
            ) : (
              <span className="text-slate-600 cursor-not-allowed">
                Memuat Aset...
              </span>
            )}
          </button>

          {/* Dummy Menu Items for AAA Feel */}
          <button className="group relative flex items-center text-left font-title font-bold text-xl md:text-2xl tracking-widest uppercase text-slate-500 hover:text-slate-300 transition-all duration-300">
            Pengaturan
          </button>
          <button className="group relative flex items-center text-left font-title font-bold text-xl md:text-2xl tracking-widest uppercase text-slate-500 hover:text-slate-300 transition-all duration-300">
            Tentang Game
          </button>

          {/* Tech Specs / Controls Info (Minimalist) */}
          <div className="flex flex-col gap-2.5 text-[10px] md:text-xs font-game text-slate-500/80 font-medium tracking-wider uppercase w-fit pt-8">
            <span className="flex items-center gap-3"><Cpu className="w-3.5 h-3.5 text-slate-600" /> WASD / Arrow Keys Untuk Jalan</span>
            <span className="flex items-center gap-3"><Compass className="w-3.5 h-3.5 text-slate-600" /> Spasi Untuk Lompat</span>
            <span className="flex items-center gap-3"><Shield className="w-3.5 h-3.5 text-slate-600" /> 100% Client-Side Engine</span>
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
