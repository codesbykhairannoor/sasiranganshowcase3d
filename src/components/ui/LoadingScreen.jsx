import React, { useEffect } from 'react';
import { useProgress } from '@react-three/drei';
import { useAppStore } from '../../store/useAppStore';
import { Sparkles } from 'lucide-react';

export default function LoadingScreen() {
  const { progress, active } = useProgress();
  const set3dLoaded = useAppStore((state) => state.set3dLoaded);

  useEffect(() => {
    if (progress === 100 || !active) {
      set3dLoaded(true);
    }
  }, [progress, active, set3dLoaded]);

  if (!active && progress === 100) return null;

  return (
    <div className="fixed inset-0 z-50 bg-[#06080f] flex flex-col items-center justify-center p-6 overflow-hidden">
      
      {/* Minimalist Spinner */}
      <div className="relative flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-slate-800 border-t-amber-400 rounded-full animate-spin" />
        <Sparkles className="w-6 h-6 text-amber-400 absolute animate-pulse" />
      </div>

      {/* Progress Text */}
      <div className="mt-8 flex flex-col items-center gap-2">
        <h2 className="text-xl font-game font-bold tracking-widest text-slate-100 uppercase">
          Sasirangan<span className="text-amber-500">.</span>Verse
        </h2>
        <div className="flex items-center gap-3">
          <p className="text-xs text-slate-400 uppercase tracking-widest font-semibold">
            Memuat Dunia 3D
          </p>
          <span className="text-sm font-black text-amber-400">{Math.round(progress)}%</span>
        </div>
      </div>

      {/* Loading Bar */}
      <div className="w-64 h-1.5 bg-slate-900 rounded-full overflow-hidden mt-4 border border-white/5">
        <div 
          className="h-full bg-amber-400 rounded-full transition-all duration-300 ease-out shadow-[0_0_10px_rgba(245,158,11,0.5)]"
          style={{ width: `${progress}%` }}
        />
      </div>

    </div>
  );
}
