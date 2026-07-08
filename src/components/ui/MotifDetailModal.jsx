import React from 'react';
import { useAppStore } from '../../store/useAppStore';
import { ArrowLeft, Sparkles, Shield, CheckCircle, Info, ShoppingCart } from 'lucide-react';

export default function MotifDetailModal() {
  const { currentView, selectedMotif, exitPortal } = useAppStore();

  if (currentView !== 'portal-inspect' || !selectedMotif) return null;

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center md:justify-end p-2 md:p-8 pointer-events-none animate-fade-in font-sans">
      <div className="max-w-[95vw] md:max-w-xl w-full glass-panel p-4 md:p-8 rounded-2xl md:rounded-3xl border border-white/20 shadow-2xl space-y-4 md:space-y-6 pointer-events-auto backdrop-blur-2xl relative overflow-hidden max-h-[85vh] overflow-y-auto">
        
        {/* Glow Accent */}
        <div 
          className="absolute -top-32 -right-32 w-64 h-64 rounded-full blur-3xl pointer-events-none opacity-40"
          style={{ backgroundColor: selectedMotif.color }}
        />

        {/* Top Navigation */}
        <div className="flex items-center justify-between pb-3 border-b border-white/10 font-game font-bold">
          <button
            onClick={exitPortal}
            className="flex items-center gap-1 md:gap-2 px-2.5 md:px-3.5 py-1.5 md:py-2 rounded-lg md:rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white transition-all text-[10px] md:text-xs border border-white/10 group cursor-pointer tracking-wide"
          >
            <ArrowLeft className="w-3 h-3 md:w-4 md:h-4 group-hover:-translate-x-1 transition-transform" />
            <span>Kembali</span>
          </button>

          <span className="text-[9px] md:text-[11px] px-2.5 py-1 rounded-full bg-white/10 text-slate-300 tracking-wide font-medium">
            3D Room • Inspeksi
          </span>
        </div>

        {/* Title & Badge (Title Case Formatting - No ALL CAPS!) */}
        <div className="space-y-1.5 md:space-y-2">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[9px] md:text-xs font-game font-bold tracking-wide" style={{ backgroundColor: `${selectedMotif.color}25`, color: selectedMotif.color, border: `1px solid ${selectedMotif.color}50` }}>
            <Sparkles className="w-3 h-3 md:w-3.5 md:h-3.5" />
            <span>Warisan Budaya</span>
          </div>
          
          <h2 className="text-base sm:text-xl md:text-3xl font-title font-black tracking-tight text-white capitalize leading-none sm:leading-tight">
            {selectedMotif.title}
          </h2>
          <h3 className="text-[10px] md:text-sm font-game font-bold text-slate-300 italic tracking-wide">
            "{selectedMotif.subtitle}"
          </h3>
        </div>

        {/* Philosophy */}
        <div className="space-y-1.5 md:space-y-2">
          <h4 className="text-[10px] md:text-xs font-game font-bold tracking-wide text-amber-400 flex items-center gap-1.5">
            <Info className="w-3 h-3 md:w-3.5 md:h-3.5" /> Filosofi & Makna Leluhur
          </h4>
          <p className="text-slate-200 text-[11px] md:text-base leading-relaxed p-3 md:p-4 rounded-xl md:rounded-2xl bg-slate-900/80 border border-white/15 font-semibold">
            {selectedMotif.philosophy}
          </p>
        </div>

        {/* SDG Impact */}
        <div className="space-y-1.5 md:space-y-2">
          <h4 className="text-[10px] md:text-xs font-game font-bold tracking-wide text-emerald-400 flex items-center gap-1.5">
            <Shield className="w-3 h-3 md:w-3.5 md:h-3.5" /> Kontribusi SDG 11
          </h4>
          <div className="p-3 md:p-4 rounded-xl md:rounded-2xl bg-emerald-950/40 border border-emerald-500/40 text-emerald-200 text-[10px] md:text-sm leading-relaxed font-semibold">
            {selectedMotif.sdgImpact}
          </div>
        </div>

        {/* Key Facts */}
        <div className="space-y-1.5 md:space-y-2">
          <h4 className="text-[10px] md:text-xs font-game font-bold tracking-wide text-slate-400">
            Fakta Menarik :
          </h4>
          <div className="space-y-1.5 md:space-y-2">
            {selectedMotif.facts.map((fact, idx) => (
              <div key={idx} className="flex items-start gap-2 text-[10px] md:text-sm text-slate-300 p-2 md:p-3 rounded-lg md:rounded-xl bg-slate-900/60 font-semibold border border-white/5">
                <CheckCircle className="w-3 h-3 md:w-4 md:h-4 text-rose-400 shrink-0 mt-0.5" />
                <span>{fact}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-2 flex flex-col md:flex-row gap-2 md:gap-3">
          <button
            onClick={() => window.alert('Mengalihkan ke Marketplace UMKM Banjarmasin...\n\n(Ini adalah Simulasi Solusi Aksi Nyata SDG 8 & 9)')}
            className="flex-1 py-3 md:py-4 rounded-xl md:rounded-2xl font-game font-bold text-[10px] md:text-sm text-slate-900 shadow-lg transition-all hover:scale-102 active:scale-98 flex items-center justify-center gap-2 cursor-pointer tracking-wide bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400"
            style={{ boxShadow: `0 0 20px rgba(251, 191, 36, 0.4)` }}
          >
            <ShoppingCart className="w-3 h-3 md:w-4 md:h-4" />
            <span>Beli Produk</span>
          </button>

          <button
            onClick={exitPortal}
            className="flex-1 py-3 md:py-4 rounded-xl md:rounded-2xl font-game font-bold text-[10px] md:text-sm text-white shadow-lg transition-all hover:scale-102 active:scale-98 flex items-center justify-center gap-2 cursor-pointer tracking-wide"
            style={{ backgroundColor: selectedMotif.color, boxShadow: `0 0 20px ${selectedMotif.color}40` }}
          >
            <span>Tutup Modal</span>
            <ArrowLeft className="w-3 h-3 md:w-4 md:h-4 rotate-180" />
          </button>
        </div>

      </div>
    </div>
  );
}
