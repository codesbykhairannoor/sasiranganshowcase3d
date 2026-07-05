import React, { useState, useEffect } from 'react';
import { Smartphone } from 'lucide-react';

export default function MobileLandscapeOverlay() {
  const [isPortrait, setIsPortrait] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkOrientation = () => {
      // Very robust mobile check
      const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || (window.innerWidth <= 768);
      setIsMobile(isMobileDevice);
      
      // If height > width on a mobile device, we assume it's portrait
      if (window.innerHeight > window.innerWidth) {
        setIsPortrait(true);
      } else {
        setIsPortrait(false);
      }
    };

    // Check immediately
    checkOrientation();

    // Add event listeners for resize and orientation change
    window.addEventListener('resize', checkOrientation);
    window.addEventListener('orientationchange', checkOrientation);

    return () => {
      window.removeEventListener('resize', checkOrientation);
      window.removeEventListener('orientationchange', checkOrientation);
    };
  }, []);

  // Only show the blocking overlay if on mobile and in portrait mode
  if (!isMobile || !isPortrait) return null;

  return (
    <div className="fixed inset-0 z-[9999] bg-slate-950 flex flex-col items-center justify-center p-8 text-center text-white select-none">
      <div className="relative mb-8">
        <Smartphone className="w-24 h-24 text-amber-400 animate-pulse transition-transform duration-1000 -rotate-90" />
      </div>
      <h2 className="text-2xl font-title font-black text-white mb-4 capitalize">
        Mode Landscape Diperlukan
      </h2>
      <p className="text-slate-300 font-game text-xs max-w-sm mx-auto leading-relaxed border border-white/10 p-5 bg-white/5 rounded-2xl">
        Demi performa 60 FPS dan kontrol Analog 3D yang maksimal, silakan <strong className="text-amber-400">Putar HP Anda</strong> ke posisi mendatar (Landscape).
      </p>
    </div>
  );
}
