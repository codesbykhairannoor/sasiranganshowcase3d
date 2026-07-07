import React from 'react';
import { useAppStore } from '../../store/useAppStore';
import { X, BookOpen, Target, Globe, Users } from 'lucide-react';

export default function AboutModal() {
  const { isAboutOpen, setAboutOpen } = useAppStore();

  if (!isAboutOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-950/85 backdrop-blur-md"
        onClick={() => setAboutOpen(false)}
      />

      {/* Panel */}
      <div className="relative glass-card w-full max-w-lg p-6 md:p-8 rounded-2xl animate-fade-in border border-amber-500/20 overflow-y-auto max-h-[90vh]">

        {/* Header */}
        <div className="flex justify-between items-center mb-6 border-b border-white/10 pb-4">
          <h2 className="text-2xl md:text-3xl font-title font-bold text-amber-400 uppercase tracking-widest">
            Tentang Game
          </h2>
          <button
            onClick={() => setAboutOpen(false)}
            className="p-2 bg-slate-900 hover:bg-rose-500 text-slate-400 hover:text-white rounded-full transition-colors border border-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="space-y-5 text-slate-300 font-game">

          <div className="flex gap-4">
            <BookOpen className="w-6 h-6 text-amber-400 mt-0.5 shrink-0" />
            <div>
              <h3 className="font-bold text-slate-100 uppercase tracking-wide mb-1">Apa Itu Sasirangan Metaverse?</h3>
              <p className="text-sm leading-relaxed text-slate-400">
                Museum virtual 3D interaktif yang menampilkan kain tradisional Sasirangan dari Kalimantan Selatan. Jelajahi galeri, temukan motif, dan pelajari filosofi di balik setiap kain.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <Target className="w-6 h-6 text-cyan-400 mt-0.5 shrink-0" />
            <div>
              <h3 className="font-bold text-slate-100 uppercase tracking-wide mb-1">SDGs Target 11.4</h3>
              <p className="text-sm leading-relaxed text-slate-400">
                Mendukung upaya pelestarian warisan budaya dan alam dunia — membuktikan bahwa teknologi interaktif bisa menjadi medium pelestarian budaya lokal yang kuat.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <Globe className="w-6 h-6 text-emerald-400 mt-0.5 shrink-0" />
            <div>
              <h3 className="font-bold text-slate-100 uppercase tracking-wide mb-1">Cara Bermain</h3>
              <ul className="text-sm text-slate-400 space-y-1 list-none">
                <li>▸ <strong className="text-slate-300">WASD</strong> — Jalan &amp; Navigasi</li>
                <li>▸ <strong className="text-slate-300">SPASI</strong> — Lompat</li>
                <li>▸ <strong className="text-slate-300">E / Klik</strong> — Inspeksi Lukisan</li>
                <li>▸ <strong className="text-slate-300">V / F5</strong> — Ganti POV (1st/3rd)</li>
                <li>▸ <strong className="text-slate-300">P</strong> — Buka Pengaturan</li>
                <li>▸ <strong className="text-slate-300">ESC</strong> — Keluar Kamera Lock</li>
              </ul>
            </div>
          </div>

          <div className="flex gap-4">
            <Users className="w-6 h-6 text-amber-400 mt-0.5 shrink-0" />
            <div>
              <h3 className="font-bold text-slate-100 uppercase tracking-wide mb-1">SDG 11 Creative Web Competition</h3>
              <p className="text-sm leading-relaxed text-slate-400">
                Dibuat untuk SDG 11 Creative Web Competition. Teknologi: React, Three.js, R3F, Rapier Physics, Ecctrl.
              </p>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="mt-6 pt-4 border-t border-white/5 text-center">
          <p className="text-[10px] font-game text-slate-500 tracking-widest uppercase">
            Sasirangan Metaverse v1.0 • 100% Client-Side
          </p>
        </div>

      </div>
    </div>
  );
}
