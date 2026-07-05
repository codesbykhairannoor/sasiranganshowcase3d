import React, { useEffect, useRef } from 'react';
import { useAppStore } from '../../store/useAppStore';

export default function AudioPlayer() {
  const { isAudioMuted, currentView } = useAppStore();
  const audioRef = useRef(null);

  useEffect(() => {
    // Attempt to play if unmuted
    if (audioRef.current) {
      if (!isAudioMuted) {
        audioRef.current.volume = 0.4; // Soft background volume
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
          playPromise.catch(e => console.log("Audio autoplay prevented", e));
        }
      } else {
        audioRef.current.pause();
      }
    }
  }, [isAudioMuted, currentView]);

  return (
    <audio 
      ref={audioRef} 
      src="/audio/paris_barantai.mp3" 
      loop 
      preload="auto" 
      className="hidden" 
    />
  );
}
