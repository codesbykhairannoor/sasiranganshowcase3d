import React, { useState } from 'react';
import { useAppStore } from '../../store/useAppStore';
import { X, Volume2, VolumeX, MonitorPlay, Music } from 'lucide-react';

const TRACKS = [
  { id: 'paris_barantai',    label: 'Paris Barantai',    src: '/audio/paris_barantai.mp3' },
  { id: 'ampar_ampar_pisang', label: 'Ampar-Ampar Pisang', src: '/audio/ampar_ampar_pisang.mp3' },
  { id: 'rindu_rindu',        label: 'Rindu Rindu',        src: '/audio/rindu_rindu.mp3' },
  { id: 'ampat_si_ampat_lima', label: 'Ampat Si Ampat Lima', src: '/audio/ampat_si_ampat_lima.mp3' },
];

export default function SettingsModal() {
  const { isSettingsOpen, setSettingsOpen, isAudioMuted, toggleAudio, selectedTrack, setSelectedTrack } = useAppStore();
  const [localTrack, setLocalTrack] = useState(selectedTrack || 'paris_barantai');

  if (!isSettingsOpen) return null;

  const handleTrackChange = (trackId) => {
    setLocalTrack(trackId);
    if (setSelectedTrack) setSelectedTrack(trackId);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-950/80 backdrop-blur-md cursor-pointer"
        onClick={() => setSettingsOpen(false)}
      />

      {/* Settings Panel */}
      <div className="relative glass-card w-full max-w-md max-h-[85vh] overflow-y-auto p-5 sm:p-6 md:p-8 rounded-2xl animate-fade-in border border-amber-500/30 scrollbar-thin scrollbar-thumb-slate-800">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-6 border-b border-white/10 pb-4">
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
        <div className="space-y-4">

          {/* Controls Info */}
          <div className="p-4 bg-slate-900/50 rounded-xl border border-white/5 space-y-3">
            <h3 className="font-title font-bold text-base text-slate-100 uppercase tracking-wide border-b border-white/10 pb-2">Kontrol Game</h3>
            <div className="grid grid-cols-2 gap-2 text-xs font-game text-slate-300">
              <p><strong className="text-amber-400">WASD</strong> : Jalan</p>
              <p><strong className="text-amber-400">SPASI</strong> : Lompat</p>
              <p><strong className="text-cyan-400">E / KLIK</strong> : Inspeksi</p>
              <p><strong className="text-emerald-400">V / F5</strong> : Ganti POV</p>
            </div>
          </div>
          
          {/* Audio Toggle */}
          <div className="flex items-center justify-between p-4 bg-slate-900/50 rounded-xl border border-white/5">
            <div className="flex items-center gap-4">
              <div className={`p-3 rounded-lg transition-colors ${!isAudioMuted ? 'bg-amber-500/20 text-amber-500' : 'bg-slate-800 text-slate-400'}`}>
                {!isAudioMuted ? <Volume2 className="w-6 h-6" /> : <VolumeX className="w-6 h-6" />}
              </div>
              <div>
                <h3 className="font-title font-bold text-lg text-slate-100 uppercase tracking-wide">Audio Musik</h3>
                <p className="text-xs font-game text-slate-400 tracking-wide">Musik Tradisional Banjar</p>
              </div>
            </div>
            
            <button 
              onClick={toggleAudio}
              className={`px-4 py-2 font-game font-bold text-sm tracking-widest uppercase rounded-lg transition-all ${
                !isAudioMuted 
                  ? 'bg-amber-500 text-slate-950 shadow-[0_0_15px_rgba(245,158,11,0.4)]' 
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              {!isAudioMuted ? 'NYALA' : 'MATI'}
            </button>
          </div>

          {/* Track Selector */}
          <div className="p-4 bg-slate-900/50 rounded-xl border border-white/5 space-y-3">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-amber-500/20 text-amber-400">
                <Music className="w-5 h-5" />
              </div>
              <h3 className="font-title font-bold text-base text-slate-100 uppercase tracking-wide">Pilih Lagu</h3>
            </div>
            <div className="grid grid-cols-1 gap-2">
              {TRACKS.map((track) => (
                <button
                  key={track.id}
                  onClick={() => handleTrackChange(track.id)}
                  className={`text-left px-4 py-2.5 rounded-lg font-game text-sm font-bold tracking-wide transition-all ${
                    localTrack === track.id
                      ? 'bg-amber-500/20 text-amber-400 border border-amber-500/50'
                      : 'text-slate-400 border border-white/5 hover:border-white/20 hover:text-slate-200 bg-slate-900/50'
                  }`}
                >
                  {localTrack === track.id && <span className="mr-2">▶</span>}
                  {track.label}
                </button>
              ))}
            </div>
          </div>

          {/* Graphics Quality */}
          <div className="flex items-center justify-between p-4 bg-slate-900/50 rounded-xl border border-white/5 opacity-60">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-cyan-500/20 text-cyan-500">
                <MonitorPlay className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-title font-bold text-lg text-slate-100 uppercase tracking-wide">Kualitas Visual</h3>
                <p className="text-xs font-game text-slate-400 tracking-wide">Auto: Tinggi</p>
              </div>
            </div>
            <button disabled className="px-4 py-2 font-game font-bold text-sm tracking-widest uppercase rounded-lg bg-cyan-600/20 text-cyan-500 cursor-not-allowed border border-cyan-500/30">
              AUTO
            </button>
          </div>

        </div>

        {/* Footer */}
        <div className="mt-6 pt-4 border-t border-white/5 text-center">
          <p className="text-[10px] font-game text-slate-500 tracking-widest uppercase">
            Sasirangan Metaverse v1.0 • SDGs Creative Web
          </p>
        </div>

      </div>
    </div>
  );
}
