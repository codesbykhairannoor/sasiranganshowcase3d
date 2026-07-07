import { create } from 'zustand';
import { MOTIFS_DATA } from '../data/motifsData';
import confetti from 'canvas-confetti';

// STRICT CONSTRAINT COMPLIANCE:
// Purely In-Memory Client-Side State Management using Zustand.
// NO localStorage, NO sessionStorage, NO database connection!

// Helper: Automatically re-engage Pointer Lock upon returning to 3D RPG mode!
const engagePointerLock = () => {
  try {
    if (!document.pointerLockElement && document.body && document.body.requestPointerLock) {
      document.body.requestPointerLock();
    }
  } catch (err) {
    console.log('Pointer lock auto-engage info:', err);
  }
};

export const useAppStore = create((set, get) => ({
  // Navigation & View State
  currentView: 'hero', // 'hero' | 'museum' | 'sdg-info' | 'reward' | 'portal-inspect'
  cameraMode: 'cinematic', // 'cinematic' (hero overview) | 'rpg' (character walk) | 'portal' (inspecting motif)
  
  // POV Toggle (1st Person vs 3rd Person like Minecraft!)
  povMode: '3rd', // '3rd' | '1st'
  mobileJump: false,
  
  // Portal & Motif Interaction State
  activePortalId: null,
  selectedMotif: null,
  nearbyMotifId: null, // Track when RPG character is close to an exhibit!
  
  // Gamification & Exploration Progress (In-Memory RAM only)
  discoveredMotifs: [],
  isAllDiscovered: false,
  showRewardModal: false,
  
  // Audio & Atmosphere State
  isAudioMuted: true,
  is3dLoaded: false,

  // Settings & About Modals
  isSettingsOpen: false,
  isAboutOpen: false,
  selectedTrack: 'paris_barantai',

  // Actions
  set3dLoaded: (loaded) => set({ is3dLoaded: loaded }),
  setNearbyMotif: (motifId) => set({ nearbyMotifId: motifId }),
  setSettingsOpen: (isOpen) => set({ isSettingsOpen: isOpen }),
  setAboutOpen: (isOpen) => set({ isAboutOpen: isOpen }),
  setSelectedTrack: (track) => set({ selectedTrack: track }),
  
  togglePov: () => set((state) => ({ povMode: state.povMode === '3rd' ? '1st' : '3rd' })),
  setPovMode: (mode) => set({ povMode: mode }),
  setMobileJump: (val) => set({ mobileJump: val }),

  setView: (view) => {
    if (view === 'museum') {
      set({ currentView: 'museum', cameraMode: 'rpg', activePortalId: null, selectedMotif: null });
      // Instantly lock pointer when clicking Mulai Bermain!
      setTimeout(() => { engagePointerLock(); }, 60);
    } else if (view === 'hero') {
      if (document.pointerLockElement) document.exitPointerLock();
      set({ currentView: 'hero', cameraMode: 'cinematic', activePortalId: null, selectedMotif: null });
    } else {
      if (document.pointerLockElement) document.exitPointerLock();
      set({ currentView: view });
    }
  },

  enterPortal: (motifId) => {
    if (document.pointerLockElement) document.exitPointerLock();
    const motif = MOTIFS_DATA.find((m) => m.id === motifId);
    if (!motif) return;

    const currentDiscovered = get().discoveredMotifs;
    const isNew = !currentDiscovered.includes(motifId);
    const newDiscovered = isNew ? [...currentDiscovered, motifId] : currentDiscovered;
    const allFound = newDiscovered.length >= MOTIFS_DATA.length;

    set({
      activePortalId: motifId,
      selectedMotif: motif,
      currentView: 'portal-inspect',
      cameraMode: 'portal',
      discoveredMotifs: newDiscovered,
      isAllDiscovered: allFound,
    });

    // Trigger celebration effect when all motifs are found for the first time!
    if (allFound && isNew) {
      setTimeout(() => {
        confetti({
          particleCount: 160,
          spread: 90,
          origin: { y: 0.6 },
          colors: ['#f59e0b', '#fbbf24', '#06b6d4', '#10b981']
        });
      }, 500);
    }
  },

  exitPortal: () => {
    set({
      activePortalId: null,
      selectedMotif: null,
      currentView: 'museum',
      cameraMode: 'rpg',
    });
    // Instantly re-engage Pointer Lock upon clicking Kembali Ke Galeri 3D!
    setTimeout(() => {
      engagePointerLock();
    }, 60);
  },

  openSdgModal: () => {
    if (document.pointerLockElement) document.exitPointerLock();
    set({ currentView: 'sdg-info' });
  },
  
  closeSdgModal: () => {
    set({ currentView: 'museum', cameraMode: 'rpg' });
    setTimeout(() => { engagePointerLock(); }, 60);
  },

  openRewardModal: () => {
    if (document.pointerLockElement) document.exitPointerLock();
    if (get().isAllDiscovered) {
      set({ showRewardModal: true });
      confetti({
        particleCount: 200,
        spread: 100,
        origin: { y: 0.5 },
        colors: ['#f59e0b', '#fbbf24', '#06b6d4', '#10b981']
      });
    }
  },

  closeRewardModal: () => {
    set({ showRewardModal: false, currentView: 'museum', cameraMode: 'rpg' });
    setTimeout(() => { engagePointerLock(); }, 60);
  },

  toggleAudio: () => set((state) => ({ isAudioMuted: !state.isAudioMuted })),

  resetProgress: () => {
    if (document.pointerLockElement) document.exitPointerLock();
    set({
      currentView: 'hero',
      cameraMode: 'cinematic',
      povMode: '3rd',
      mobileJump: false,
      activePortalId: null,
      selectedMotif: null,
      nearbyMotifId: null,
      discoveredMotifs: [],
      isAllDiscovered: false,
      showRewardModal: false,
    });
  }
}));
