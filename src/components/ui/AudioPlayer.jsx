import React, { useEffect, useRef } from 'react';
import { useAppStore } from '../../store/useAppStore';

const TRACK_SRCS = {
  paris_barantai:     '/audio/paris_barantai.mp3',
  ampar_ampar_pisang: '/audio/ampar_ampar_pisang.mp3',
  rindu_rindu:        '/audio/rindu_rindu.mp3',
  ampat_si_ampat_lima: '/audio/ampat_si_ampat_lima.mp3',
};

export default function AudioPlayer() {
  const { isAudioMuted, selectedTrack } = useAppStore();
  const audioRef = useRef(null);

  // When track changes, swap src and restart
  useEffect(() => {
    if (audioRef.current) {
      const src = TRACK_SRCS[selectedTrack] || TRACK_SRCS.paris_barantai;
      if (audioRef.current.src !== window.location.origin + src) {
        audioRef.current.src = src;
        audioRef.current.load();
        if (!isAudioMuted) {
          audioRef.current.play().catch(() => {});
        }
      }
    }
  }, [selectedTrack]);

  // When muted state changes, play or pause
  useEffect(() => {
    if (!audioRef.current) return;
    if (!isAudioMuted) {
      audioRef.current.volume = 0.45;
      audioRef.current.play().catch(e => console.log('Autoplay blocked:', e));
    } else {
      audioRef.current.pause();
    }
  }, [isAudioMuted]);

  return (
    <audio
      ref={audioRef}
      src={TRACK_SRCS[selectedTrack] || TRACK_SRCS.paris_barantai}
      loop
      preload="auto"
      className="hidden"
    />
  );
}
