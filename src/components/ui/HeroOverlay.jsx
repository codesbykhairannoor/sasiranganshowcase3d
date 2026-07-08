import React, { useState } from 'react';
import { useAppStore } from '../../store/useAppStore';
import { Sparkles, Play } from 'lucide-react';

export default function HeroOverlay() {
  const { currentView, setView, is3dLoaded, setSettingsOpen, setAboutOpen } = useAppStore();
  const [isTransitioning, setIsTransitioning] = useState(false);

  if (currentView !== 'hero' && !isTransitioning) return null;

  const handleStartGame = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setView('museum');
      setTimeout(() => setIsTransitioning(false), 1000);
    }, 600);
  };

  return (
    <>
      {/* ===== DARK OVERLAY BEHIND MENU (prevents 3D bleed-through) ===== */}
      <div className={`fixed inset-0 z-30 bg-slate-950/70 backdrop-blur-sm transition-opacity duration-500 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`} />

      {/* ===== CINEMATIC HERO MENU ===== */}
      <div
        className={`fixed inset-0 z-40 flex flex-col items-center justify-center pointer-events-none transition-opacity duration-500 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}
      >
        <div className="flex flex-col items-center text-center pointer-events-auto animate-fade-in select-none px-6">

          {/* ── Subtitle Tag ── */}
          <p className="text-[9px] sm:text-[10px] font-game font-semibold tracking-[0.4em] uppercase text-amber-500/80 mb-2 sm:mb-4">
            SDG 11 • Culture Verse • Target 11.4
          </p>

          {/* ── Main Title ── */}
          <h1 className="text-[1.6rem] sm:text-3xl md:text-4xl lg:text-7xl font-title font-bold tracking-wider text-slate-100 uppercase leading-[1.05] drop-shadow-[0_4px_32px_rgba(0,0,0,0.9)]">
            Sasirangan
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-400 to-yellow-500">
              Metaverse
            </span>
          </h1>

          {/* ── Divider ── */}
          <div className="flex items-center gap-3 sm:gap-5 mt-4 sm:mt-6 mb-4 sm:mb-6">
            <div className="h-px w-16 sm:w-24 bg-gradient-to-r from-transparent to-amber-500/60" />
            <Sparkles className="w-3.5 h-3.5 text-amber-500/60 animate-pulse" />
            <div className="h-px w-16 sm:w-24 bg-gradient-to-l from-transparent to-amber-500/60" />
          </div>

          {/* ── Menu Items ── */}
          <nav className="flex flex-col items-center gap-2 sm:gap-4">
            {/* MULAI EKSPLORASI */}
            <button
              onClick={handleStartGame}
              disabled={!is3dLoaded || isTransitioning}
              className="group flex items-center gap-2 sm:gap-3 font-title font-bold text-sm sm:text-lg md:text-xl lg:text-3xl tracking-[0.15em] uppercase transition-all duration-300 disabled:cursor-not-allowed"
            >
              <Play className="w-3 h-3 sm:w-5 sm:h-5 text-amber-400 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300" />
              <span className={`transition-colors duration-300 ${is3dLoaded ? 'text-white group-hover:text-amber-400' : 'text-slate-500'}`}>
                {is3dLoaded ? 'Mulai Eksplorasi' : 'Memuat...'}
              </span>
            </button>

            {/* PENGATURAN */}
            <button
              onClick={() => setSettingsOpen(true)}
              className="font-title font-bold text-xs sm:text-sm md:text-base lg:text-xl tracking-[0.15em] uppercase text-slate-400 hover:text-amber-300 transition-colors duration-300"
            >
              Pengaturan
            </button>

            {/* TENTANG PLATFORM */}
            <button
              onClick={() => setAboutOpen(true)}
              className="font-title font-bold text-xs sm:text-sm md:text-base lg:text-xl tracking-[0.15em] uppercase text-slate-400 hover:text-amber-300 transition-colors duration-300"
            >
              Tentang Platform
            </button>
          </nav>

        </div>
      </div>

      {/* ===== TRANSITION FADE ===== */}
      {isTransitioning && (
        <div className="fixed inset-0 z-50 bg-slate-950 flex flex-col items-center justify-center pointer-events-none">
          <Sparkles className="w-10 h-10 text-amber-400 animate-spin mb-4" style={{ animationDuration: '2s' }} />
          <p className="text-amber-500 font-game font-bold tracking-[0.3em] uppercase animate-pulse text-sm">
            Memasuki Metaverse...
          </p>
        </div>
      )}
    </>
  );
}
