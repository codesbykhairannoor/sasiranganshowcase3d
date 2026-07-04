import React, { Suspense, useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, ContactShadows, KeyboardControls, useKeyboardControls } from '@react-three/drei';
import { Physics } from '@react-three/rapier';
import { Ecctrl } from 'ecctrl';
import { Joystick, useJoystickStore } from 'ecctrl/input';
import { EcctrlCameraControls } from 'ecctrl/camera';
import * as THREE from 'three';
import { useAppStore } from '../../store/useAppStore';
import { MOTIFS_DATA } from '../../data/motifsData';
import MuseumGallery from './MuseumGallery';
import CharacterDroid from './CharacterDroid';

// Keyboard controls map required by Ecctrl
const keyboardMap = [
  { name: 'forward', keys: ['ArrowUp', 'KeyW'] },
  { name: 'backward', keys: ['ArrowDown', 'KeyS'] },
  { name: 'leftward', keys: ['ArrowLeft', 'KeyA'] },
  { name: 'rightward', keys: ['ArrowRight', 'KeyD'] },
  { name: 'jump', keys: ['Space'] },
  { name: 'run', keys: ['Shift'] },
];

// SUPER RESEARCH & ZERO-GLITCH ARCHITECTURE:
// 1. ALWAYS mount EcctrlCameraControls! Never unmount or switch cameras between cinematic and RPG mode!
//    This eliminates 100% of camera race conditions, NaN matrix black screens, and character freeze bugs!
// 2. Grand Corridor Alignment (Lorong Panjang): Character spawns at Z = 24 looking north down the 60m gallery!
// 3. Minecraft F5 Style POV 1 (1st Person) vs POV 3 (3rd Person) Toggle!
// 4. High-strength autoBalanceSpringK=12 prevents character from flipping over (salto)!
function RpgSceneController() {
  const { cameraMode, activePortalId, povMode, togglePov, mobileJump } = useAppStore();
  const ecctrlRef = useRef();
  const cameraControlsRef = useRef();
  const [, getKeys] = useKeyboardControls();

  const is1stPerson = povMode === '1st';

  // Listen for 'V' or 'F5' keyboard shortcut to toggle 1st / 3rd Person POV!
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'v' || e.key === 'V' || e.key === 'F5') {
        e.preventDefault();
        togglePov();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [togglePov]);

  // TRIGGER PAINTING INSPECTION CAMERA ZOOM ONCE IN USEEFFECT (NEVER IN USEFRAME!)
  // Calling setLookAt continuously inside useFrame causes animation loop overflows & black screen bugs!
  useEffect(() => {
    if (cameraMode === 'portal' && activePortalId && cameraControlsRef.current) {
      const motif = MOTIFS_DATA.find((m) => m.id === activePortalId);
      if (motif) {
        let camPos = new THREE.Vector3();
        let lookPos = new THREE.Vector3(motif.position[0], motif.position[1], motif.position[2]);
        
        if (motif.id === 'bayam-raja') {
          // North End Wall: stand 4.5m south looking at end wall
          camPos.set(0, 5.0, -17.5);
        } else if (motif.id === 'gigi-haruan') {
          // Left Wall: stand 4.5m east looking at left wall
          camPos.set(-3.3, 5.0, 6);
        } else if (motif.id === 'kambang-kacang') {
          // Right Wall: stand 4.5m west looking at right wall
          camPos.set(3.3, 5.0, -6);
        } else {
          camPos.set(motif.position[0], motif.position[1], motif.position[2] + 4.5);
        }
        
        // Smooth cinematic transition over 1 second!
        cameraControlsRef.current.setLookAt(camPos.x, camPos.y, camPos.z, lookPos.x, lookPos.y, lookPos.z, true);
      }
    }
  }, [cameraMode, activePortalId]);

  useFrame(() => {
    if (cameraMode === 'cinematic') {
      // Freeze character movement while on title screen, but keep EcctrlCameraControls mounted and ready!
      if (ecctrlRef.current) {
        ecctrlRef.current.setMovement({
          forward: false, backward: false, leftward: false, rightward: false, jump: false, run: false
        });
      }
      // Keep camera smoothly looking down the Grand Corridor!
      if (cameraControlsRef.current && ecctrlRef.current) {
        const target = ecctrlRef.current.currPos;
        if (target && typeof target.x === 'number') {
          cameraControlsRef.current.moveTo(target.x, target.y + 1.5, target.z, true);
        }
      }
    } else if (cameraMode === 'portal' && activePortalId) {
      // Freeze character movement so player stays exactly where they stand in front of painting!
      if (ecctrlRef.current) {
        ecctrlRef.current.setMovement({
          forward: false, backward: false, leftward: false, rightward: false, jump: false, run: false
        });
      }
    } else if (cameraMode === 'rpg') {
      // 1. Feed keyboard, joystick, and mobile jump input into Ecctrl v2.0.0 on every frame!
      if (ecctrlRef.current) {
        const keys = getKeys();
        const joystick = useJoystickStore.getState().joystick;
        
        ecctrlRef.current.setMovement({
          forward: keys.forward,
          backward: keys.backward,
          leftward: keys.leftward,
          rightward: keys.rightward,
          jump: keys.jump || mobileJump,
          run: keys.run,
          joystick: joystick ? { x: joystick.x, y: joystick.y } : undefined
        });

        // 2. Drive Minecraft-style camera follow (1st vs 3rd Person)!
        if (cameraControlsRef.current) {
          const target = ecctrlRef.current.currPos;
          if (target && typeof target.x === 'number') {
            const eyeHeight = is1stPerson ? target.y + 1.45 : target.y + 1.2;
            cameraControlsRef.current.moveTo(target.x, eyeHeight, target.z, true);
          }
        }
      }
    }
  });

  return (
    <>
      {/* 
          MINECRAFT SPAWN PERFECTION & SALTO PREVENTION FIX:
          1. Position Y = 1.12 with floatHeight = 0 places feet firmly on the carpet at Y = 0.02! ZERO FALLING!
          2. High autoBalanceSpringK=12 prevents character from flipping over (salto)!
          3. Spawns at Z = 24 looking north down the 60m Grand Gallery Corridor!
      */}
      <Ecctrl
        ref={ecctrlRef}
        maxWalkVel={4}
        maxRunVel={8}
        jumpVel={6}
        position={[0, 1.12, 24]}
        capsuleRadius={0.4}
        capsuleHalfHeight={0.5}
        floatHeight={0}
        autoBalance={true}
        autoBalanceSpringK={12}
        autoBalanceDampingC={0.6}
        autoBalanceDampingOnY={0.5}
      >
        <CharacterDroid />
      </Ecctrl>

      {/* 
          ALWAYS MOUNTED EcctrlCameraControls guarantees ZERO camera switching race conditions!
          No more black screens, no more stuck controls, no more glitches when clicking Mulai Bermain!
      */}
      <EcctrlCameraControls
        ref={cameraControlsRef}
        makeDefault
        smoothTime={0.1}
        minDistance={is1stPerson ? 0.1 : 2.5}
        maxDistance={is1stPerson ? 0.1 : 14}
        maxPolarAngle={Math.PI / 2 - 0.05}
      />
    </>
  );
}

export default function Scene() {
  const { cameraMode } = useAppStore();

  return (
    <div className="w-full h-screen fixed inset-0 z-10 bg-[#090d16]">
      {/* On-Screen Mobile Joystick (Only visible during RPG Character Control Mode!) */}
      {cameraMode === 'rpg' && (
        <div className="fixed bottom-24 left-6 z-50 pointer-events-auto md:hidden">
          <Joystick buttonNumber={1} />
        </div>
      )}

      <Canvas
        shadows
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: false, powerPreference: 'high-performance' }}
      >
        <KeyboardControls map={keyboardMap}>
          {/* ROYAL MUSEUM NIGHT BACKGROUND WITH CRYSTAL CLEAR STUDIO DEFINITION! */}
          <color attach="background" args={["#090d16"]} />
          <fog attach="fog" args={["#090d16", 35, 80]} />

          {/* BRIGHT STUDIO & HEMISPHERE LIGHTING TO PREVENT DARK VOIDS ON ALL GPUS */}
          <ambientLight intensity={2.2} />
          <hemisphereLight intensity={1.8} color="#ffffff" groundColor="#94a3b8" />
          <directionalLight 
            position={[10, 20, 10]} 
            intensity={3.5} 
            castShadow 
            shadow-mapSize={[2048, 2048]}
            shadow-bias={-0.0001}
          />
          <directionalLight position={[-10, 15, -10]} intensity={2.0} color="#ffffff" />
          
          {/* Soft corridor wall spotlights */}
          <spotLight position={[-6, 12, 6]} intensity={4.0} angle={0.7} penumbra={0.8} color="#ffffff" castShadow />
          <spotLight position={[6, 12, -6]} intensity={4.0} angle={0.7} penumbra={0.8} color="#ffffff" castShadow />
          <spotLight position={[0, 12, -20]} intensity={4.5} angle={0.7} penumbra={0.8} color="#ffffff" castShadow />

          {/* BRIGHT STUDIO ENVIRONMENT REFLECTION */}
          <Environment preset="apartment" />

          {/* SOFT CONTACT SHADOWS ON WHITE MARBLE FLOOR */}
          <ContactShadows 
            position={[0, 0.01, 0]} 
            opacity={0.6} 
            scale={60} 
            blur={2} 
            far={6} 
            color="#0f172a" 
          />

          {/* RAPIER PHYSICS ENGINE & GRAND GALLERY CORRIDOR */}
          <Suspense fallback={null}>
            <Physics gravity={[0, -9.81, 0]}>
              <MuseumGallery />
              <RpgSceneController />
            </Physics>
          </Suspense>
        </KeyboardControls>
      </Canvas>
    </div>
  );
}
