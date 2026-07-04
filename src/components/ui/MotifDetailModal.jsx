import React from 'react';
import { useAppStore } from '../../store/useAppStore';
import { ArrowLeft, Sparkles, Shield, CheckCircle, Info } from 'lucide-react';

export default function MotifDetailModal() {
  const { currentView, selectedMotif, exitPortal } = useAppStore();

  if (currentView !== 'portal-inspect' || !selectedMotif) return null;

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center md:justify-end p-3 md:p-8 pointer-events-none animate-fade-in font-sans">
      <div className="max-w-md md:max-w-xl w-full glass-panel p-5 md:p-8 rounded-3xl border border-white/20 shadow-2xl space-y-5 md:space-y-6 pointer-events-auto backdrop-blur-2xl relative overflow-hidden max-h-[85vh] overflow-y-auto">
        
        {/* Glow Accent */}
        <div 
          className="absolute -top-32 -right-32 w-64 h-64 rounded-full blur-3xl pointer-events-none opacity-40"
          style={{ backgroundColor: selectedMotif.color }}
        />

        {/* Top Navigation */}
        <div className="flex items-center justify-between pb-3 border-b border-white/10 font-game font-bold">
          <button
            onClick={exitPortal}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white transition-all text-xs border border-white/10 group cursor-pointer uppercase tracking-wider"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>Kembali ke Galeri 3D</span>
          </button>

          <span className="text-[10px] md:text-[11px] uppercase px-3 py-1 rounded-full bg-white/10 text-slate-300 tracking-wider">
            3D Room View • Inspeksi
          </span>
        </div>

        {/* Title & Badge */}
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-game font-bold tracking-wider uppercase" style={{ backgroundColor: `${selectedMotif.color}25`, color: selectedMotif.color, border: `1px solid ${selectedMotif.color}50` }}>
            <Sparkles className="w-3.5 h-3.5" />
            <span>Motif Terverifikasi • Warisan Budaya</span>
          </div>
          
          <h2 className="text-2xl md:text-3xl font-title font-black tracking-tight text-white uppercase">
            {selectedMotif.title}
          </h2>
          <h3 className="text-xs md:text-sm font-game font-bold text-slate-300 italic tracking-wide">
            "{selectedMotif.subtitle}"
          </h3>
        </div>

        {/* Philosophy */}
        <div className="space-y-2">
          <h4 className="text-xs font-game font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
            <Info className="w-3.5 h-3.5" /> Filosofi & Makna Leluhur
          </h4>
          <p className="text-slate-200 text-sm md:text-base leading-relaxed p-4 rounded-2xl bg-slate-900/80 border border-white/15 font-semibold">
            {selectedMotif.philosophy}
          </p>
        </div>

        {/* SDG Impact */}
        <div className="space-y-2">
          <h4 className="text-xs font-game font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
            <Shield className="w-3.5 h-3.5" /> Kontribusi SDG 11 (Culture Verse)
          </h4>
          <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/40 text-emerald-200 text-xs md:text-sm leading-relaxed font-semibold">
            {selectedMotif.sdgImpact}
          </div>
        </div>

        {/* Key Facts */}
        <div className="space-y-2">
          <h4 className="text-xs font-game font-bold uppercase tracking-wider text-slate-400">
            Fakta Menarik Kain Sasirangan:
          </h4>
          <div className="space-y-2">
            {selectedMotif.facts.map((fact, idx) => (
              <div key={idx} className="flex items-start gap-2.5 text-xs md:text-sm text-slate-300 p-3 rounded-xl bg-slate-900/60 font-semibold border border-white/5">
                <CheckCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                <span>{fact}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-2">
          <button
            onClick={exitPortal}
            className="w-full py-4 rounded-2xl font-game font-bold text-xs md:text-sm text-white shadow-lg transition-all hover:scale-102 active:scale-98 flex items-center justify-center gap-2 cursor-pointer uppercase tracking-wider"
            style={{ backgroundColor: selectedMotif.color, boxShadow: `0 0 20px ${selectedMotif.color}50` }}
          >
            <span>Selesai Eksplorasi & Kembali ke Karpet Merah</span>
            <ArrowLeft className="w-4 h-4 rotate-180" />
          </button>
        </div>

      </div>
    </div>
  );
}
