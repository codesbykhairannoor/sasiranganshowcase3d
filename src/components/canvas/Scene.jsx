import React, { Suspense, useRef, useEffect, useState } from 'react';
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
  { name: 'interact', keys: ['KeyE', 'Enter'] },
];

// CLEAN WAWA SENSEI & FREE MOUSE POINTER ARCHITECTURE:
// 1. MANDATORY FOLLOWER TARGET IN useFrame:
//    As documented in Ecctrl README line 238, we MUST call cameraControlsRef.current.moveTo(...)
//    in useFrame to guarantee camera tracking when walking or refreshing!
// 2. FREE MOUSE POINTER ("mirip kayak mouse bro sebenarnya"):
//    Removed Pointer Lock and static center crosshair so the mouse cursor moves freely across the screen!
//    Moving the mouse smoothly rotates the camera without holding click, while allowing the player to
//    freely point and click on any painting or UI button!
// 3. KEYBOARD [E] & CLICK INTERACTION:
//    When standing near a painting or pointing at it, pressing E or Left Click inspects the artwork!
function RpgSceneController({ setNearbyMotif }) {
  const { cameraMode, activePortalId, povMode, togglePov, mobileJump, enterPortal, discoverMotif } = useAppStore();
  const ecctrlRef = useRef();
  const cameraControlsRef = useRef();
  const [, getKeys] = useKeyboardControls();
  const nearbyMotifRef = useRef(null);

  const is1stPerson = povMode === '1st';

  // Listen for 'V' or 'F5' keyboard shortcut to toggle 1st / 3rd Person POV!
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'v' || e.key === 'V' || e.key === 'F5') {
        e.preventDefault();
        togglePov();
      } else if ((e.key === 'e' || e.key === 'E' || e.key === 'Enter') && cameraMode === 'rpg') {
        if (nearbyMotifRef.current) {
          e.preventDefault();
          discoverMotif(nearbyMotifRef.current.id);
          enterPortal(nearbyMotifRef.current.id);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [togglePov, cameraMode, discoverMotif, enterPortal]);

  // FREE MOUSE POINTER CAMERA ROTATION (No holding click, pointer moves freely like a real mouse!):
  useEffect(() => {
    const handleMouseMove = (e) => {
      // In RPG mode, moving the mouse smoothly rotates the camera without locking the pointer!
      if (cameraControlsRef.current && cameraMode === 'rpg') {
        cameraControlsRef.current.rotate(-e.movementX * 0.003, -e.movementY * 0.003, false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [cameraMode]);

  // Handle camera transitions ONLY when entering portal inspection mode!
  useEffect(() => {
    if (!cameraControlsRef.current) return;

    if (cameraMode === 'portal' && activePortalId) {
      const motif = MOTIFS_DATA.find((m) => m.id === activePortalId);
      if (motif) {
        let camPos = new THREE.Vector3();
        let lookPos = new THREE.Vector3(motif.position[0], motif.position[1], motif.position[2]);
        
        if (motif.id === 'bayam-raja') {
          camPos.set(0, 5.0, -17.5);
        } else if (motif.id === 'gigi-haruan') {
          camPos.set(-3.3, 5.0, 6);
        } else if (motif.id === 'kambang-kacang') {
          camPos.set(3.3, 5.0, -6);
        } else {
          camPos.set(motif.position[0], motif.position[1], motif.position[2] + 4.5);
        }
        
        cameraControlsRef.current.setLookAt(camPos.x, camPos.y, camPos.z, lookPos.x, lookPos.y, lookPos.z, true);
      }
    }
  }, [cameraMode, activePortalId]);

  // In useFrame: Drive character movement, camera follow target, and proximity detection!
  useFrame(() => {
    if (!ecctrlRef.current) return;

    if (cameraMode === 'cinematic' || (cameraMode === 'portal' && activePortalId)) {
      ecctrlRef.current.setMovement({
        forward: false, backward: false, leftward: false, rightward: false, jump: false, run: false
      });
    } else if (cameraMode === 'rpg') {
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

      // DRIVE THE CAMERA FOLLOW TARGET EVERY FRAME (Required by EcctrlCameraControls docs line 238!)
      const target = ecctrlRef.current.currPos;
      if (cameraControlsRef.current && target && typeof target.x === 'number') {
        const eyeHeight = is1stPerson ? target.y + 1.45 : target.y + 1.2;
        cameraControlsRef.current.moveTo(target.x, eyeHeight, target.z, true);
      }

      // PROXIMITY DETECTION TO PAINTINGS (For Minecraft-style prompt & interaction)
      if (target && typeof target.z === 'number') {
        let found = null;
        if (target.z < -20 && Math.abs(target.x) < 6) {
          found = MOTIFS_DATA[0]; // Bayam Raja
        } else if (target.z > 0 && target.z < 12 && target.x < -3) {
          found = MOTIFS_DATA[1]; // Gigi Haruan
        } else if (target.z > -12 && target.z < 0 && target.x > 3) {
          found = MOTIFS_DATA[2]; // Kambang Kacang
        }
        
        if (nearbyMotifRef.current?.id !== found?.id) {
          nearbyMotifRef.current = found;
          setNearbyMotif(found);
        }
      }
    }
  });

  return (
    <>
      <Ecctrl
        ref={ecctrlRef}
        maxWalkVel={4}
        maxRunVel={8}
        jumpVel={6}
        position={[0, 2.0, 24]}
        capsuleRadius={0.4}
        capsuleHalfHeight={0.5}
        floatHeight={0.3}
      >
        <CharacterDroid />
      </Ecctrl>

      <EcctrlCameraControls
        ref={cameraControlsRef}
        makeDefault
        smoothTime={0.1}
        minDistance={is1stPerson ? 0.01 : 1.5}
        maxDistance={is1stPerson ? 0.01 : 12}
        maxPolarAngle={Math.PI / 2 - 0.05}
      />
    </>
  );
}

export default function Scene() {
  const { cameraMode, enterPortal, discoverMotif } = useAppStore();
  const [nearbyMotif, setNearbyMotif] = useState(null);

  return (
    <div className="w-full h-screen fixed inset-0 z-10 bg-[#06080f]">
      {/* MINECRAFT INTERACTIVE PROMPT WHEN NEAR A PAINTING */}
      {cameraMode === 'rpg' && nearbyMotif && (
        <div className="fixed bottom-32 left-1/2 -translate-x-1/2 z-50 pointer-events-auto animate-bounce">
          <button
            onClick={() => {
              discoverMotif(nearbyMotif.id);
              enterPortal(nearbyMotif.id);
            }}
            className="px-6 py-3 bg-slate-900/95 hover:bg-slate-800 text-amber-400 font-bold rounded-xl border-2 border-amber-500/80 shadow-[0_0_25px_rgba(245,158,11,0.5)] flex items-center gap-3 transition-all transform hover:scale-105 cursor-pointer backdrop-blur-md"
          >
            <span className="px-2.5 py-1 bg-amber-500 text-slate-950 rounded-lg text-sm font-black shadow-inner">E</span>
            <span className="text-base tracking-wide">KLIK / TEKAN E : Inspeksi {nearbyMotif.name}</span>
          </button>
        </div>
      )}

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
          <color attach="background" args={["#06080f"]} />
          <fog attach="fog" args={["#06080f", 28, 70]} />

          {/* 
              SUPER RESEARCH: LUXURY AAA MUSEUM LIGHTING ARCHITECTURE!
              Replaced flat/blending ambient light with moody, dramatic museum contrast.
              Physical ceiling lamps in MuseumGallery provide rich localized illumination!
          */}
          <ambientLight intensity={0.4} />
          <hemisphereLight intensity={0.4} color="#fffbeb" groundColor="#0f172a" />
          <directionalLight 
            position={[15, 35, 15]} 
            intensity={1.2} 
            color="#fffbeb"
            castShadow 
            shadow-mapSize={[2048, 2048]}
            shadow-bias={-0.0001}
          />
          <directionalLight position={[-15, 20, -15]} intensity={0.6} color="#38bdf8" />

          {/* BRIGHT STUDIO ENVIRONMENT REFLECTION */}
          <Environment preset="apartment" />

          {/* SOFT CONTACT SHADOWS ON POLISHED SLATE FLOOR */}
          <ContactShadows 
            position={[0, 0.01, 0]} 
            opacity={0.8} 
            scale={60} 
            blur={2.5} 
            far={6} 
            color="#06080f" 
          />

          {/* RAPIER PHYSICS ENGINE & GRAND GALLERY CORRIDOR */}
          <Suspense fallback={null}>
            <Physics gravity={[0, -9.81, 0]}>
              <MuseumGallery />
              <RpgSceneController setNearbyMotif={setNearbyMotif} />
            </Physics>
          </Suspense>
        </KeyboardControls>
      </Canvas>
    </div>
  );
}
