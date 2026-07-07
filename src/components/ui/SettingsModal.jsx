import React from 'react';
import { useAppStore } from '../../store/useAppStore';
import { X, Volume2, VolumeX, Monitor, MonitorPlay } from 'lucide-react';

export default function SettingsModal() {
  const { isSettingsOpen, setSettingsOpen, isMusicPlaying, toggleMusic } = useAppStore();

  if (!isSettingsOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-950/80 backdrop-blur-md cursor-pointer transition-opacity duration-300"
        onClick={() => setSettingsOpen(false)}
      />

      {/* Settings Panel */}
      <div className="relative glass-card w-full max-w-md p-6 md:p-8 rounded-2xl animate-fade-in border border-amber-500/30">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-8 border-b border-white/10 pb-4">
          <h2 className="text-2xl md:text-3xl font-title font-bold text-amber-500 uppercase tracking-widest">
            Pengaturan
          </h2>
          <button 
            onClick={() => setSettingsOpen(false)}
            className="p-2 bg-slate-900 hover:bg-rose-500 text-slate-400 hover:text-white rounded-full transition-colors border border-white/10 hover:border-transparent"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="space-y-6">
          
          {/* Audio Setting */}
          <div className="flex items-center justify-between p-4 bg-slate-900/50 rounded-xl border border-white/5">
            <div className="flex items-center gap-4">
              <div className={`p-3 rounded-lg transition-colors ${isMusicPlaying ? 'bg-amber-500/20 text-amber-500' : 'bg-slate-800 text-slate-400'}`}>
                {isMusicPlaying ? <Volume2 className="w-6 h-6" /> : <VolumeX className="w-6 h-6" />}
              </div>
              <div>
                <h3 className="font-title font-bold text-lg text-slate-100 uppercase tracking-wide">Audio Musik</h3>
                <p className="text-xs font-game text-slate-400 tracking-wide">Musik Latar Tradisional</p>
              </div>
            </div>
            
            <button 
              onClick={toggleMusic}
              className={`px-4 py-2 font-game font-bold text-sm tracking-widest uppercase rounded-lg transition-all ${
                isMusicPlaying 
                  ? 'bg-amber-500 text-slate-950 shadow-[0_0_15px_rgba(245,158,11,0.4)]' 
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              {isMusicPlaying ? 'NYALA' : 'MATI'}
            </button>
          </div>

          {/* Graphics Quality */}
          <div className="flex items-center justify-between p-4 bg-slate-900/50 rounded-xl border border-white/5 opacity-70">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-cyan-500/20 text-cyan-500">
                <MonitorPlay className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-title font-bold text-lg text-slate-100 uppercase tracking-wide">Kualitas Visual</h3>
                <p className="text-xs font-game text-slate-400 tracking-wide">Otomatis Terdeteksi: TINGGI</p>
              </div>
            </div>
            
            <button 
              disabled
              className="px-4 py-2 font-game font-bold text-sm tracking-widest uppercase rounded-lg bg-cyan-600/20 text-cyan-500 cursor-not-allowed border border-cyan-500/30"
            >
              AUTO
            </button>
          </div>

        </div>

        {/* Footer */}
        <div className="mt-8 pt-4 border-t border-white/5 text-center">
          <p className="text-[10px] font-game text-slate-500 tracking-widest uppercase">
            Sasirangan Metaverse v1.0 • SDGs Creative Web
          </p>
        </div>

      </div>
    </div>
  );
}
