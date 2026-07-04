import React from 'react';
import { useAppStore } from '../../store/useAppStore';
import { MOTIFS_DATA } from '../../data/motifsData';
import { Sparkles, Volume2, VolumeX, RotateCcw, Globe, Award, Home, Terminal } from 'lucide-react';

export default function Navbar() {
  const { 
    currentView, 
    setView, 
    discoveredMotifs, 
    isAllDiscovered, 
    openRewardModal, 
    openSdgModal, 
    isAudioMuted, 
    toggleAudio, 
    resetProgress 
  } = useAppStore();

  const totalMotifs = MOTIFS_DATA.length;
  const foundCount = discoveredMotifs.length;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 py-3 md:px-8 md:py-4 pointer-events-none font-sans">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 pointer-events-auto">
        
        {/* Brand & Title (Click to return to menu) */}
        <div 
          onClick={() => setView('hero')}
          className="flex items-center gap-3 cursor-pointer group bg-slate-950/90 backdrop-blur-xl px-4 py-2.5 rounded-2xl border border-white/20 hover:border-amber-500/80 transition-all duration-300 shadow-2xl"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-500 to-yellow-600 flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
            {currentView === 'hero' ? <Sparkles className="w-4 h-4 text-slate-950 animate-pulse" /> : <Home className="w-4 h-4 text-slate-950 font-black" />}
          </div>
          <div>
            <h1 className="font-title font-black text-xs md:text-sm tracking-wider text-white flex items-center gap-1.5">
              <span>SASIRANGAN</span>
              <span className="text-gold font-game">.VERSE</span>
            </h1>
            <p className="text-[11px] text-slate-300 font-game font-semibold tracking-tight">
              {currentView === 'hero' ? 'SDG 11 • Culture Verse' : '← Kembali ke Menu Utama'}
            </p>
          </div>
        </div>

        {/* Center Elite Game HUD Tracker (Only show when exploring or inspecting) */}
        {currentView !== 'hero' && (
          <div className="hidden md:flex items-center gap-4 bg-slate-950/90 backdrop-blur-xl px-6 py-2.5 rounded-full border border-white/20 shadow-2xl animate-fade-in font-game font-bold text-xs">
            <div className="flex items-center gap-2.5">
              <Terminal className="w-4 h-4 text-cyan-400" />
              <span className="text-slate-200 uppercase tracking-wider">Motif Discovered:</span>
              <div className="flex items-center gap-2">
                {MOTIFS_DATA.map((motif) => {
                  const isFound = discoveredMotifs.includes(motif.id);
                  return (
                    <span
                      key={motif.id}
                      title={motif.title}
                      className={`w-3.5 h-3.5 rounded-full transition-all duration-500 ${
                        isFound 
                          ? 'bg-amber-400 scale-125 shadow-[0_0_12px_rgba(245,158,11,0.9)]' 
                          : 'bg-slate-800 border border-slate-600'
                      }`}
                    />
                  );
                })}
              </div>
              <span className="text-xs font-black ml-1 text-gold">
                [{foundCount} / {totalMotifs}]
              </span>
            </div>

            {isAllDiscovered && (
              <button
                onClick={openRewardModal}
                className="flex items-center gap-1.5 bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-400 hover:to-yellow-500 text-slate-950 text-xs font-black px-4 py-1.5 rounded-full shadow-[0_0_20px_rgba(245,158,11,0.6)] animate-bounce transition-all cursor-pointer font-game uppercase tracking-wider"
              >
                <Award className="w-4 h-4" />
                <span>Klaim Sertifikat!</span>
              </button>
            )}
          </div>
        )}

        {/* Right Actions */}
        <div className="flex items-center gap-2 md:gap-3 font-game font-bold">
          {/* SDG Info Button */}
          <button
            onClick={openSdgModal}
            className="bg-slate-950/90 backdrop-blur-xl hover:bg-slate-900 text-slate-200 px-3.5 py-2.5 md:px-4 md:py-2.5 rounded-xl flex items-center gap-2 text-xs md:text-sm transition-all border border-white/20 shadow-2xl group cursor-pointer hover:border-cyan-500/50"
          >
            <Globe className="w-4 h-4 text-cyan-400 group-hover:rotate-45 transition-transform duration-500" />
            <span className="hidden sm:inline">SDG 11 Info</span>
          </button>

          {/* Audio Toggle */}
          <button
            onClick={toggleAudio}
            title={isAudioMuted ? "Aktifkan Suara Ambient" : "Matikan Suara"}
            className="bg-slate-950/90 backdrop-blur-xl hover:bg-slate-900 p-2.5 rounded-xl text-slate-300 transition-all border border-white/20 shadow-2xl cursor-pointer hover:border-amber-500/50"
          >
            {isAudioMuted ? <VolumeX className="w-4 h-4 text-slate-500" /> : <Volume2 className="w-4 h-4 text-amber-400 animate-pulse" />}
          </button>

          {/* Reset Progress Button */}
          <button
            onClick={resetProgress}
            title="Reset Eksplorasi (In-Memory RAM)"
            className="bg-slate-950/90 backdrop-blur-xl hover:bg-slate-900 p-2.5 rounded-xl text-slate-400 hover:text-amber-400 transition-all border border-white/20 shadow-2xl cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>

      </div>
    </header>
  );
}
