import React, { useEffect, useState } from 'react';
import { useProgress } from '@react-three/drei';
import { useAppStore } from '../../store/useAppStore';
import { Sparkles, ShieldCheck, Cpu, Layers } from 'lucide-react';

export default function LoadingScreen() {
  const { progress, active } = useProgress();
  const set3dLoaded = useAppStore((state) => state.set3dLoaded);
  const [tipsIdx, setTipsIdx] = useState(0);

  const tips = [
    "💡 Tip: Gunakan mouse / jari untuk memutar dan menggeser kamera 3D secara bebas.",
    "🏆 Gamifikasi: Temukan 3 motif rahasia di galeri untuk membuka Sertifikat Duta Budaya!",
    "🌱 SDG 11.4: Melestarikan warisan budaya Sasirangan melalui inovasi teknologi tanpa limbah tekstil.",
    "⚡ Performa: 100% Web Statis murni tanpa database maupun LocalStorage. Cepat & Ringan!"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setTipsIdx((prev) => (prev + 1) % tips.length);
    }, 3500);
    return () => clearInterval(interval);
  }, [tips.length]);

  useEffect(() => {
    if (progress === 100 || !active) {
      set3dLoaded(true);
    }
  }, [progress, active, set3dLoaded]);

  if (!active && progress === 100) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950 flex flex-col items-center justify-center p-6 bg-grid-pattern overflow-hidden">
      
      {/* Background Ambient Glow */}
      <div className="absolute w-96 h-96 rounded-full bg-rose-600/15 blur-[120px] pointer-events-none animate-pulse-glow" />
      <div className="absolute w-96 h-96 rounded-full bg-purple-600/15 blur-[120px] pointer-events-none translate-x-48 translate-y-48 animate-pulse-glow" />

      <div className="relative z-10 max-w-md w-full text-center space-y-8 glass-panel p-8 rounded-3xl border border-white/10 shadow-2xl">
        
        {/* Animated Icon */}
        <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-tr from-rose-500 via-purple-600 to-amber-400 p-0.5 shadow-xl shadow-rose-500/20 animate-float">
          <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
            <Sparkles className="w-10 h-10 text-rose-400 animate-spin" style={{ animationDuration: '8s' }} />
          </div>
        </div>

        {/* Title */}
        <div className="space-y-2">
          <h2 className="text-2xl font-black tracking-wider text-white">
            SASIRANGAN<span className="text-rose-500">.</span>VERSE
          </h2>
          <p className="text-xs text-slate-400 uppercase tracking-widest font-semibold">
            3D Virtual Museum & Culture Verse
          </p>
        </div>

        {/* Progress Bar */}
        <div className="space-y-3">
          <div className="flex justify-between text-xs font-mono font-bold text-slate-300 px-1">
            <span>MEMUAT DUNIA 3D...</span>
            <span className="text-amber-400">{Math.round(progress)}%</span>
          </div>
          <div className="w-full h-3 bg-slate-900 rounded-full overflow-hidden p-0.5 border border-white/10">
            <div 
              className="h-full bg-gradient-to-r from-rose-500 via-purple-500 to-amber-400 rounded-full transition-all duration-300 ease-out shadow-[0_0_12px_rgba(244,63,94,0.8)]"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Lore & Tip Carousel */}
        <div className="h-14 flex items-center justify-center px-2 py-3 rounded-xl bg-slate-900/60 border border-white/5 text-xs text-slate-300 font-medium transition-all duration-500">
          <p className="animate-fade-in">{tips[tipsIdx]}</p>
        </div>

        {/* Tech Specs Badges */}
        <div className="flex items-center justify-center gap-4 pt-2 border-t border-white/10 text-[10px] text-slate-400 font-mono">
          <span className="flex items-center gap-1"><Cpu className="w-3 h-3 text-emerald-400" /> WebGL R3F</span>
          <span className="flex items-center gap-1"><Layers className="w-3 h-3 text-purple-400" /> Drei Portal</span>
          <span className="flex items-center gap-1"><ShieldCheck className="w-3 h-3 text-rose-400" /> Zero DB/Storage</span>
        </div>

      </div>
    </div>
  );
}
