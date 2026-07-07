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
        className={`fixed inset-0 z-40 flex flex-col items-center justify-center p-6 md:p-16 pointer-events-none font-sans transition-opacity duration-500 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}
      >
        <div className="max-w-4xl w-full flex flex-col items-center text-center space-y-8 pointer-events-auto animate-fade-in mt-12 md:mt-24">
        
        {/* Top Elite Badge */}
        <div className="inline-flex items-center gap-3 px-1 border-b border-amber-500/30 pb-2 mb-4">
          <Sparkles className="w-4 h-4 text-amber-500 animate-pulse" />
          <span className="text-[10px] md:text-xs font-game font-semibold tracking-[0.3em] uppercase text-amber-500/90">
            SDG 11 Creative Web Competition
          </span>
        </div>

        {/* Main Game Screen Title Typography */}
        <div className="space-y-4 relative z-10 flex flex-col items-center">
          <div className="flex items-center gap-2 text-xs md:text-sm font-game font-medium text-slate-300 tracking-[0.2em] uppercase bg-slate-950/50 px-4 py-1.5 rounded-full border border-white/5 backdrop-blur-sm">
            <Terminal className="w-4 h-4 text-cyan-500" />
            <span>Interactive RPG Heritage Simulator</span>
          </div>

          <h1 className="text-5xl md:text-8xl font-title font-medium tracking-wide text-slate-100 uppercase leading-[1.1] drop-shadow-[0_0_30px_rgba(0,0,0,0.8)]">
            Sasirangan
            <br />
            <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-600 drop-shadow-[0_0_20px_rgba(245,158,11,0.5)]">
              Metaverse
            </span>
          </h1>
          
          <div className="pt-2 flex items-center gap-4">
            <div className="h-[1px] w-8 md:w-16 bg-gradient-to-r from-transparent to-amber-500/80"></div>
            <p className="text-xs md:text-sm font-game font-medium tracking-[0.3em] text-slate-300 uppercase drop-shadow-md">
              Culture Verse • Target 11.4
            </p>
            <div className="h-[1px] w-8 md:w-16 bg-gradient-to-l from-transparent to-amber-500/80"></div>
          </div>
        </div>
          
        <p className="text-slate-300 text-xs md:text-base max-w-2xl leading-relaxed relative z-10 font-game font-light tracking-wide mt-6 drop-shadow-md bg-slate-950/40 p-4 rounded-xl backdrop-blur-sm border border-white/5">
          Jelajahi galeri pameran kain adat Kalimantan Selatan dalam format game 3D interaktif. Kontrol karakter lu, temukan rahasia filosofi motif leluhur, dan dukung ekosistem fashion berkelanjutan.
        </p>

        {/* START GAME RPG CTA MENU (CENTERED ELEGANT) */}
        <div className="pt-8 flex flex-col items-center gap-5 relative z-10 w-full max-w-md mx-auto">
          <button
            onClick={handleStartGame}
            disabled={!is3dLoaded || isTransitioning}
            className="group relative flex items-center justify-center gap-4 text-center font-title font-bold text-2xl md:text-3xl tracking-[0.2em] uppercase transition-all duration-500 hover:scale-105 disabled:hover:scale-100"
          >
            {is3dLoaded ? (
              <>
                <Play className="w-5 h-5 text-amber-500 opacity-0 group-hover:opacity-100 transform translate-x-4 group-hover:-translate-x-0 transition-all duration-500" />
                <span className="text-slate-100 group-hover:text-amber-400 transition-colors duration-300 drop-shadow-[0_0_15px_rgba(245,158,11,0.5)]">
                  Mulai Bermain
                </span>
                <Play className="w-5 h-5 text-amber-500 opacity-0 group-hover:opacity-100 transform -translate-x-4 group-hover:translate-x-0 transition-all duration-500 rotate-180" />
              </>
            ) : (
              <span className="text-slate-500 cursor-not-allowed">
                Memuat Aset...
              </span>
            )}
          </button>

          {/* Settings Button */}
          <button 
            onClick={() => useAppStore.getState().setSettingsOpen(true)}
            className="group relative text-center font-title font-bold text-lg md:text-xl tracking-[0.2em] uppercase text-slate-400 hover:text-amber-300 transition-all duration-300"
          >
            Pengaturan
          </button>
          
          <button className="group relative text-center font-title font-bold text-lg md:text-xl tracking-[0.2em] uppercase text-slate-400 hover:text-amber-300 transition-all duration-300">
            Tentang Game
          </button>

          {/* Tech Specs / Controls Info (Minimalist Centered) */}
          <div className="flex flex-wrap justify-center items-center gap-4 text-[10px] md:text-xs font-game text-slate-400 font-medium tracking-wider uppercase w-full pt-6 border-t border-white/5 mt-4">
            <span className="flex items-center gap-2"><Cpu className="w-3 h-3 text-slate-500" /> WASD / Arrows = Jalan</span>
            <span className="flex items-center gap-2"><Compass className="w-3 h-3 text-slate-500" /> Spasi = Lompat</span>
            <span className="flex items-center gap-2"><Shield className="w-3 h-3 text-emerald-500/70" /> 100% Client-Side</span>
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
