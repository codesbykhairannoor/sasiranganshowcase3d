import React from 'react';
import { useAppStore } from '../../store/useAppStore';
import { Award, Sparkles, CheckCircle2, RotateCcw, ShieldCheck } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function RewardModal() {
  const { showRewardModal, closeRewardModal, resetProgress } = useAppStore();

  if (!showRewardModal) return null;

  const handleCelebrateAgain = () => {
    confetti({
      particleCount: 150,
      spread: 100,
      origin: { y: 0.5 },
      colors: ['#f43f5e', '#facc15', '#38bdf8', '#a855f7']
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-black/85 backdrop-blur-md animate-fade-in font-sans">
      <div className="max-w-2xl w-full glass-panel p-8 md:p-12 rounded-3xl border-2 border-amber-500/50 shadow-[0_0_50px_rgba(245,158,11,0.25)] relative overflow-hidden text-center space-y-6">
        
        {/* Glowing Background */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-tr from-amber-500/20 via-rose-500/20 to-purple-500/20 rounded-full blur-3xl pointer-events-none animate-pulse-glow" />

        {/* Top Trophy Icon */}
        <div 
          onClick={handleCelebrateAgain}
          className="w-24 h-24 mx-auto rounded-full bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 p-1 shadow-2xl shadow-amber-500/40 cursor-pointer hover:scale-110 transition-transform duration-300"
          title="Klik untuk selebrasi confetti!"
        >
          <div className="w-full h-full bg-slate-950 rounded-full flex items-center justify-center">
            <Award className="w-12 h-12 text-amber-400 animate-bounce" />
          </div>
        </div>

        {/* Certificate Title (Title Case Formatting - No ALL CAPS!) */}
        <div className="space-y-2 relative z-10 font-game">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-bold tracking-wide capitalize font-game">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Pencapaian Gamifikasi Selesai 100%</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-title font-black text-white tracking-wide capitalize">
            Sertifikat Duta Budaya
          </h2>
          <p className="text-xs md:text-sm text-rose-400 font-bold tracking-wide capitalize">
            Sasirangan Culture Verse • SDG Target 11.4
          </p>
        </div>

        {/* Certificate Body */}
        <div className="p-6 rounded-2xl bg-slate-900/80 border border-white/10 text-slate-200 text-sm md:text-base leading-relaxed relative z-10 space-y-3 font-semibold">
          <p>
            Dengan ini menyatakan bahwa Anda telah berhasil mengeksplorasi seluruh karya agung dan filosofi <strong>5 Motif Klasik Kain Sasirangan</strong> di Galeri Istana Gedung Putih.
          </p>
          <div className="pt-2 flex items-center justify-center gap-6 text-xs text-slate-300 font-game font-bold tracking-wide capitalize">
            <span className="flex items-center gap-1"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> State: 100% RAM</span>
            <span className="flex items-center gap-1"><ShieldCheck className="w-4 h-4 text-amber-400" /> SDG 11 Terverifikasi</span>
          </div>
        </div>

        {/* Actions */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3 relative z-10 font-game font-bold">
          <button
            onClick={closeRewardModal}
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-amber-500 to-rose-500 hover:from-amber-400 hover:to-rose-400 text-white font-black text-sm shadow-lg shadow-amber-500/30 transition-all cursor-pointer tracking-wide capitalize"
          >
            Lanjutkan Eksplorasi 3D
          </button>

          <button
            onClick={resetProgress}
            className="w-full sm:w-auto px-6 py-4 rounded-2xl glass-panel hover:bg-slate-800 text-slate-300 hover:text-white font-bold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer tracking-wide capitalize"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Reset Eksplorasi</span>
          </button>
        </div>

        <p className="text-[11px] text-slate-400 font-game tracking-wide capitalize">
          *Sistem Berjalan Murni Tanpa LocalStorage / Database Sesuai Aturan Hukum Mutlak.
        </p>

      </div>
    </div>
  );
}
