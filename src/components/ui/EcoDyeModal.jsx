import React from 'react';
import { useAppStore } from '../../store/useAppStore';
import { X, Leaf, ShieldAlert, Droplets, Target } from 'lucide-react';

export default function EcoDyeModal() {
  const { isEcoModalOpen, setEcoModalOpen } = useAppStore();

  if (!isEcoModalOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-950/85 backdrop-blur-md"
        onClick={() => setEcoModalOpen(false)}
      />

      {/* Modal Content */}
      <div className="relative glass-card w-full max-w-2xl p-4 md:p-8 rounded-2xl animate-fade-in border border-emerald-500/30 max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-4 md:mb-6 border-b border-emerald-500/20 pb-3 md:pb-4">
          <div className="flex items-center gap-2 md:gap-3">
            <Leaf className="w-6 h-6 md:w-8 md:h-8 text-emerald-400" />
            <h2 className="text-xl md:text-3xl font-title font-bold text-emerald-400 uppercase tracking-widest">
              Inovasi Pewarna
            </h2>
          </div>
          <button 
            onClick={() => setEcoModalOpen(false)}
            className="p-1.5 md:p-2 bg-slate-900 hover:bg-rose-500 text-slate-400 hover:text-white rounded-full transition-colors border border-white/10"
          >
            <X className="w-4 h-4 md:w-5 md:h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="space-y-4 md:space-y-6 text-slate-300 font-game leading-relaxed">
          
          <div className="bg-slate-900/50 p-4 md:p-5 rounded-xl border border-white/5">
            <h3 className="text-amber-400 text-xs md:text-base font-bold uppercase tracking-wide flex items-center gap-1.5 md:gap-2 mb-1.5 md:mb-2">
              <ShieldAlert className="w-4 h-4 md:w-5 md:h-5" /> Krisis Pewarna Sintetis
            </h3>
            <p className="text-[11px] md:text-sm">
              Selama bertahun-tahun, industri kain Sasirangan sangat bergantung pada pewarna kimia sintetis (seperti Naphthol dan Indigosol). Meskipun murah dan cerah, limbah cair dari proses ini sangat berbahaya dan sering mencemari sungai-sungai di Banjarmasin.
            </p>
          </div>

          <div className="bg-emerald-950/30 p-4 md:p-5 rounded-xl border border-emerald-500/20">
            <h3 className="text-emerald-400 text-xs md:text-base font-bold uppercase tracking-wide flex items-center gap-1.5 md:gap-2 mb-1.5 md:mb-2">
              <Droplets className="w-4 h-4 md:w-5 md:h-5" /> Kembali Ke Alam (Kearifan Lokal)
            </h3>
            <p className="text-[11px] md:text-sm mb-2 md:mb-3">
              Saat ini, pengrajin Sasirangan mulai kembali menggunakan bahan-bahan alam (seperti zaman dahulu) untuk menciptakan warna kain yang cantik tanpa merusak lingkungan. Bahan yang digunakan antara lain:
            </p>
            <ul className="grid grid-cols-2 gap-2 text-[10px] md:text-sm">
              <li className="flex items-center gap-1.5 md:gap-2"><div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-[#fbbf24]"></div> <strong>Kunyit</strong> (Kuning)</li>
              <li className="flex items-center gap-1.5 md:gap-2"><div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-[#92400e]"></div> <strong>Kulit Jengkol</strong> (Cokelat)</li>
              <li className="flex items-center gap-1.5 md:gap-2"><div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-[#ef4444]"></div> <strong>Secang</strong> (Merah/Pink)</li>
              <li className="flex items-center gap-1.5 md:gap-2"><div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-[#4ade80]"></div> <strong>Daun Mangga</strong> (Hijau)</li>
            </ul>
          </div>

          <div className="bg-cyan-950/30 p-4 md:p-5 rounded-xl border border-cyan-500/20">
            <h3 className="text-cyan-400 text-xs md:text-base font-bold uppercase tracking-wide flex items-center gap-1.5 md:gap-2 mb-1.5 md:mb-2">
              <Target className="w-4 h-4 md:w-5 md:h-5" /> Dukungan SDG 11.4 & SDG 12
            </h3>
            <p className="text-[11px] md:text-sm">
              Langkah inovatif ini sangat relevan dengan pencapaian <strong>SDGs</strong>:
              <br /><br />
              • <strong>SDG 11.4 (Culture):</strong> Melestarikan kain Sasirangan sebagai warisan budaya tak benda.
              <br />
              • <strong>SDG 12 (Responsible Production):</strong> Mengurangi pembuangan limbah beracun ke air dan mendorong industri fashion berkelanjutan.
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}
