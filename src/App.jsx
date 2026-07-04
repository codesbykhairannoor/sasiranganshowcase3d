import React from 'react';
import Navbar from './components/ui/Navbar';
import LoadingScreen from './components/ui/LoadingScreen';
import HeroOverlay from './components/ui/HeroOverlay';
import SdgModal from './components/ui/SdgModal';
import MotifDetailModal from './components/ui/MotifDetailModal';
import GamificationHud from './components/ui/GamificationHud';
import RewardModal from './components/ui/RewardModal';
import Scene from './components/canvas/Scene';

export default function App() {
  return (
    <div className="relative w-full h-screen overflow-hidden select-none bg-slate-950 font-sans">
      {/* 1. UI Overlay Layer (Drei useProgress & HTML Overlays) */}
      <LoadingScreen />
      <Navbar />
      <HeroOverlay />
      <SdgModal />
      <MotifDetailModal />
      <GamificationHud />
      <RewardModal />

      {/* 2. WebGL 3D Canvas Layer */}
      <Scene />
    </div>
  );
}
