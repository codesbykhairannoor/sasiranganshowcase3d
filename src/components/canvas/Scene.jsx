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

// AUTHENTIC MINECRAFT POINTER LOCK & STUCK CENTER CROSSHAIR ARCHITECTURE:
// 1. CENTER STUCK CROSSHAIR (+) ("memang harus ttp stuck aja ditengah"):
//    A fixed gaming + crosshair is rendered in the exact center of the screen!
// 2. POINTER LOCK ON CLICK ("ketika kita mainin mouse pointer nya ttp ngikut dalam keadaan stuck versis kayak minecraft"):
//    Clicking on the game window engages Pointer Lock, trapping the invisible pointer in the center!
//    Moving your physical mouse smoothly rotates the camera AND turns the character's head!
// 3. PRESS ESC TO UNLOCK ("kalau mau keluar harus pencet ESC bro"):
//    Pressing ESC releases Pointer Lock so you get your normal system mouse cursor to click UI buttons!
//    While unlocked (ESC pressed), moving the mouse will NOT spin the camera, keeping the angle perfect!
function RpgSceneController({ setNearbyMotif }) {
  const { cameraMode, activePortalId, povMode, togglePov, mobileJump, enterPortal } = useAppStore();
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
          enterPortal(nearbyMotifRef.current.id);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [togglePov, cameraMode, enterPortal]);

  // MINECRAFT POINTER LOCK CAMERA ROTATION & HEAD TRACKING FEED:
  useEffect(() => {
    const handleMouseMove = (e) => {
      // ONLY rotate camera and track head when Pointer Lock is ACTIVE ("kalau mau keluar harus pencet ESC bro")!
      // This prevents the camera from spinning away when using the mouse cursor after pressing ESC!
      if (cameraControlsRef.current && cameraMode === 'rpg' && document.pointerLockElement) {
        cameraControlsRef.current.rotate(-e.movementX * 0.003, -e.movementY * 0.003, false);

        // Feed mouse movement into window.__mouseLook for character head tracking!
        if (!window.__mouseLook) window.__mouseLook = { x: 0, y: 0 };
        window.__mouseLook.x = THREE.MathUtils.clamp(window.__mouseLook.x + e.movementX * 0.005, -1, 1);
        window.__mouseLook.y = THREE.MathUtils.clamp(window.__mouseLook.y - e.movementY * 0.005, -1, 1);
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
        } else if (motif.id === 'kain-sarigading') {
          camPos.set(-3.3, 5.0, -16);
        } else if (motif.id === 'naga-balimbur') {
          camPos.set(3.3, 5.0, -18);
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

      // PROXIMITY DETECTION TO ALL 5 SHOWCASE PAINTINGS
      if (target && typeof target.z === 'number') {
        let found = null;
        if (target.z < -22 && Math.abs(target.x) < 6) {
          found = MOTIFS_DATA[0]; // Bayam Raja
        } else if (target.z > 0 && target.z < 12 && target.x < -3) {
          found = MOTIFS_DATA[1]; // Gigi Haruan
        } else if (target.z > -10 && target.z < 0 && target.x > 3) {
          found = MOTIFS_DATA[2]; // Kambang Kacang
        } else if (target.z < -10 && target.z > -22 && target.x < -3) {
          found = MOTIFS_DATA[3]; // Kain Sarigading
        } else if (target.z < -12 && target.z > -24 && target.x > 3) {
          found = MOTIFS_DATA[4]; // Naga Balimbur
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
  const { cameraMode, enterPortal } = useAppStore();
  const [nearbyMotif, setNearbyMotif] = useState(null);

  // MINECRAFT POINTER LOCK ON CLICK:
  const handleSceneClick = (e) => {
    if (cameraMode === 'rpg') {
      if (!document.pointerLockElement) {
        document.body.requestPointerLock();
      } else if (e.button === 0 && nearbyMotif) {
        // Aiming center + crosshair at painting and left-clicking!
        enterPortal(nearbyMotif.id);
      }
    }
  };

  return (
    <div 
      onClick={handleSceneClick}
      className="w-full h-screen fixed inset-0 z-10 bg-[#06080f] cursor-pointer"
    >
      {/* AUTHENTIC MINECRAFT CENTER STUCK CROSSHAIR (+) ("memang harus ttp stuck aja ditengah") */}
      {cameraMode === 'rpg' && (
        <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-40 pointer-events-none select-none flex items-center justify-center">
          <div className="relative flex items-center justify-center">
            {/* Horizontal Bar */}
            <div className="w-6 h-0.5 bg-amber-400 shadow-[0_0_8px_rgba(0,0,0,0.9)] rounded-full" />
            {/* Vertical Bar */}
            <div className="h-6 w-0.5 bg-amber-400 shadow-[0_0_8px_rgba(0,0,0,0.9)] rounded-full absolute" />
            {/* Center Aim Dot */}
            <div className="w-1.5 h-1.5 bg-white rounded-full absolute shadow-[0_0_5px_rgba(245,158,11,1)] animate-pulse" />
          </div>
        </div>
      )}

      {/* MINECRAFT INTERACTIVE PROMPT WHEN NEAR A PAINTING (Title Case Formatting) */}
      {cameraMode === 'rpg' && nearbyMotif && (
        <div className="fixed bottom-32 left-1/2 -translate-x-1/2 z-50 pointer-events-auto animate-bounce">
          <button
            onClick={(e) => {
              e.stopPropagation();
              enterPortal(nearbyMotif.id);
            }}
            className="px-6 py-3 bg-slate-900/95 hover:bg-slate-800 text-amber-400 font-bold rounded-xl border-2 border-amber-500/80 shadow-[0_0_25px_rgba(245,158,11,0.5)] flex items-center gap-3 transition-all transform hover:scale-105 cursor-pointer backdrop-blur-md"
          >
            <span className="px-2.5 py-1 bg-amber-500 text-slate-950 rounded-lg text-sm font-black shadow-inner">E</span>
            <span className="text-base tracking-wide">Klik / Tekan E : Inspeksi {nearbyMotif.title}</span>
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

          {/* BRIGHT STUDIO ENVIRONMENT REFLECTION ("pakai env kayak tadi pas mau keluar") */}
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
