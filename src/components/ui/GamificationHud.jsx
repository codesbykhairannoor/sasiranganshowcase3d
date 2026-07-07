import React from 'react';
import { useAppStore } from '../../store/useAppStore';
import { MOTIFS_DATA } from '../../data/motifsData';
import { Award, ArrowLeft, Gamepad2, Eye, Rocket, Volume2, VolumeX } from 'lucide-react';

export default function GamificationHud() {
  const { currentView, discoveredMotifs, isAllDiscovered, openRewardModal, setView, povMode, togglePov, setMobileJump, isAudioMuted, toggleAudio } = useAppStore();

  if (currentView !== 'museum') return null;

  const totalMotifs = MOTIFS_DATA.length;
  const foundCount = discoveredMotifs.length;
  const is1stPerson = povMode === '1st';

  return (
    <div className="font-sans">
      {/* 1. MOBILE DEDICATED JUMP BUTTON */}
      <div className="fixed bottom-24 right-6 z-50 pointer-events-auto md:hidden animate-fade-in">
        <button
          onPointerDown={() => setMobileJump(true)}
          onPointerUp={() => setMobileJump(false)}
          onPointerLeave={() => setMobileJump(false)}
          className="w-16 h-16 rounded-full bg-gradient-to-tr from-cyan-500 to-blue-600 active:scale-90 text-white font-game font-black shadow-[0_0_25px_rgba(6,182,212,0.8)] border-2 border-white/40 flex flex-col items-center justify-center gap-0.5 cursor-pointer select-none transition-transform"
        >
          <Rocket className="w-6 h-6 animate-bounce" />
          <span className="text-[10px] tracking-wide capitalize">Lompat</span>
        </button>
      </div>

      {/* 2. MAIN BOTTOM HUD BAR */}
      <div className="fixed bottom-4 md:bottom-6 left-0 right-0 z-40 px-3 md:px-8 pointer-events-none flex flex-col md:flex-row items-center justify-between gap-3 animate-fade-in">
        
        {/* Left: Interactive RPG Controls Hint & POV Button */}
        <div className="flex items-center gap-2 md:gap-3 pointer-events-auto w-full md:w-auto justify-between md:justify-start">
          
          {/* POV Toggle Button (Hidden on Mobile) */}
          <button
            onClick={togglePov}
            className="hidden md:flex bg-slate-950/90 backdrop-blur-2xl px-4 py-3 rounded-2xl border border-cyan-500/50 hover:border-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.3)] items-center gap-2 text-xs font-game font-bold text-white transition-all hover:scale-105 active:scale-95 cursor-pointer group shrink-0 tracking-wide capitalize"
            title="Klik atau tekan tombol V / F5 di keyboard untuk ganti POV!"
          >
            <Eye className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition-transform" />
            <span>POV : <strong className="text-amber-400">{is1stPerson ? '1st (Mata)' : '3rd (Ikuti)'}</strong></span>
          </button>

          {/* Audio Toggle Button (Hidden on Mobile) */}
          <button
            onClick={toggleAudio}
            className="hidden md:flex bg-slate-950/90 backdrop-blur-2xl p-3 rounded-2xl border border-white/20 hover:border-amber-500/50 shadow-2xl items-center justify-center text-white transition-all hover:scale-105 active:scale-95 cursor-pointer shrink-0"
            title={isAudioMuted ? "Putar BGM Tradisional" : "Matikan BGM"}
          >
            {isAudioMuted ? (
              <VolumeX className="w-5 h-5 text-slate-500" />
            ) : (
              <Volume2 className="w-5 h-5 text-amber-400 animate-pulse" />
            )}
          </button>

          {/* Settings shortcut button */}
          <button
            onClick={() => useAppStore.getState().setSettingsOpen(true)}
            className="bg-slate-950/90 backdrop-blur-2xl px-4 py-3 rounded-2xl border border-white/20 hover:border-amber-500/50 shadow-2xl flex items-center justify-center gap-2 text-slate-300 hover:text-white transition-all hover:scale-105 active:scale-95 cursor-pointer shrink-0 text-xs font-game font-bold tracking-wide capitalize"
            title="Buka Pengaturan"
          >
            <span className="text-amber-400 font-black">P</span> = Pengaturan ⚙
          </button>
        </div>

        {/* Center/Right: Gamification Tracker & Action (Hidden on Mobile) */}
        <div className="hidden md:flex items-center justify-between md:justify-end gap-2.5 pointer-events-auto w-full md:w-auto font-game font-bold">
          
          {/* Progress Badge */}
          <div className="bg-slate-950/90 backdrop-blur-2xl px-4 md:px-6 py-3 rounded-2xl border border-white/20 shadow-2xl flex items-center gap-2 md:gap-3 flex-1 md:flex-initial justify-center">
            <div className="flex items-center gap-1.5 md:gap-2">
              {MOTIFS_DATA.map((motif) => {
                const isFound = discoveredMotifs.includes(motif.id);
                return (
                  <div
                    key={motif.id}
                    title={motif.title}
                    className={`w-3.5 h-3.5 md:w-4 md:h-4 rounded-full transition-all duration-500 ${
                      isFound 
                        ? 'bg-amber-400 scale-125 shadow-[0_0_15px_rgba(245,158,11,0.9)]' 
                        : 'bg-slate-800 border border-slate-600'
                    }`}
                  />
                );
              })}
            </div>
            
            <div className="h-4 w-px bg-white/20 mx-1" />

            <span className="text-xs font-black text-white whitespace-nowrap tracking-wide capitalize">
              <span className="text-amber-400">{foundCount}</span> / {totalMotifs} Ditemukan
            </span>
          </div>

          {/* Claim Reward Button */}
          {isAllDiscovered && (
            <button
              onClick={openRewardModal}
              className="px-5 py-3 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-600 to-yellow-600 hover:from-amber-400 hover:to-yellow-500 text-slate-950 font-black text-xs tracking-wide capitalize flex items-center gap-1.5 shadow-[0_0_30px_rgba(245,158,11,0.7)] animate-bounce cursor-pointer transition-all hover:scale-105 border border-amber-300 shrink-0"
            >
              <Award className="w-4 h-4 text-slate-950" />
              <span className="hidden sm:inline">Klaim Sertifikat !</span>
              <span className="sm:hidden">Klaim !</span>
            </button>
          )}

        </div>
      </div>
    </div>
  );
}
