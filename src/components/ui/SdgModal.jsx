import React from 'react';
import { useAppStore } from '../../store/useAppStore';
import { SDG_INFO } from '../../data/motifsData';
import { Globe, X, ShieldCheck, Sparkles, CheckCircle2 } from 'lucide-react';

export default function SdgModal() {
  const { currentView, closeSdgModal } = useAppStore();

  if (currentView !== 'sdg-info') return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-black/85 backdrop-blur-md animate-fade-in font-sans">
      <div className="max-w-3xl w-full glass-panel p-6 md:p-10 rounded-3xl border border-white/20 shadow-2xl relative overflow-hidden max-h-[90vh] overflow-y-auto">
        
        {/* Background Glow */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-rose-600/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-emerald-600/15 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={closeSdgModal}
          className="absolute top-6 right-6 p-2 rounded-full bg-slate-900/80 hover:bg-rose-500/20 text-slate-400 hover:text-white transition-all border border-white/10 cursor-pointer"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="space-y-6 relative z-10">
          
          {/* Header (Title Case Formatting - No ALL CAPS!) */}
          <div className="space-y-2 font-game">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold tracking-wide capitalize">
              <Globe className="w-3.5 h-3.5" />
              <span>SDGs Creative Web Competition</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-title font-black text-white capitalize tracking-wide">
              {SDG_INFO.title}
            </h2>
            <h3 className="text-sm md:text-base font-bold text-rose-400 tracking-wide capitalize">
              {SDG_INFO.subTheme}
            </h3>
          </div>

          {/* Description */}
          <div className="p-5 rounded-2xl bg-slate-900/80 border border-white/15 text-slate-200 text-sm md:text-base leading-relaxed font-semibold">
            {SDG_INFO.description}
          </div>

          {/* Target Highlight */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-rose-950/40 via-purple-950/40 to-slate-900/60 border border-rose-500/30 flex items-start gap-4 font-semibold">
            <div className="p-3 rounded-xl bg-rose-500/20 text-rose-400 shrink-0 mt-1">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-game font-extrabold text-white capitalize tracking-wide">
                {SDG_INFO.target}
              </h4>
              <p className="text-xs text-slate-300 mt-1">
                Kain Sasirangan bukan sekadar pakaian adat, melainkan rekam jejak peradaban suku Banjar yang sarat dengan doa, filosofi pengobatan tradisional, dan keharmonisan dengan alam raya.
              </p>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-2 font-game">
            {SDG_INFO.stats.map((stat, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-slate-900/80 border border-white/10 text-center space-y-1">
                <span className="text-xl md:text-2xl font-black bg-gradient-to-r from-amber-400 to-rose-400 bg-clip-text text-transparent">
                  {stat.value}
                </span>
                <p className="text-[11px] text-slate-400 font-bold leading-tight capitalize tracking-wide">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>

          {/* Why 3D & No-DB Static Web? */}
          <div className="space-y-3 pt-2">
            <h4 className="text-xs font-game font-bold text-slate-300 capitalize tracking-wide flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" /> Keunggulan Inovasi Proyek Ini
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs text-slate-300 font-semibold">
              <div className="p-3.5 rounded-xl bg-slate-900/60 border border-white/10 flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong className="text-white">Gamified Scrollytelling:</strong> Menarik generasi muda melalui eksplorasi aktif interaktif, bukan sekadar membaca teks statis.</span>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-900/60 border border-white/10 flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong className="text-white">Eco-Friendly Tech:</strong> 100% Web Statis dengan In-Memory RAM. Ringan, hemat energi server, dan ramah lingkungan.</span>
              </div>
            </div>
          </div>

          {/* Footer Action */}
          <div className="pt-4 flex justify-end font-game font-bold">
            <button
              onClick={closeSdgModal}
              className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-rose-600 to-purple-600 hover:from-rose-500 hover:to-purple-500 text-white font-bold text-xs capitalize tracking-wide shadow-lg shadow-rose-600/30 transition-all cursor-pointer"
            >
              Kembali Ke Galeri 3D
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
