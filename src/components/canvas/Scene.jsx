import React, { Suspense, useRef, useEffect, useState, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Environment, ContactShadows, KeyboardControls, useKeyboardControls } from '@react-three/drei';
import { Physics } from '@react-three/rapier';
import { Ecctrl } from 'ecctrl';
import { Joystick, VirtualButton, useJoystickStore } from 'ecctrl/input';
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

const isTouchDevice = typeof window !== 'undefined' ? ('ontouchstart' in window || navigator.maxTouchPoints > 0) : false;

// AUTHENTIC MINECRAFT POINTER LOCK & STUCK CENTER CROSSHAIR ARCHITECTURE:
// 1. CENTER STUCK CROSSHAIR (+) ("memang harus ttp stuck aja ditengah"):
//    A fixed gaming + crosshair is rendered in the exact center of the screen!
// 2. POINTER LOCK ON CLICK ("ketika kita mainin mouse pointer nya ttp ngikut dalam keadaan stuck versis kayak minecraft"):
//    Clicking on the game window engages Pointer Lock, trapping the invisible pointer in the center!
//    Moving your physical mouse smoothly rotates the camera AND turns the character's head!
// 3. PRESS ESC TO UNLOCK ("kalau mau keluar harus pencet ESC bro"):
//    Pressing ESC releases Pointer Lock so you get your normal system mouse cursor to click UI buttons!
//    While unlocked (ESC pressed), moving the mouse will NOT spin the camera, keeping the angle perfect!
// 4. INSTANT RE-LOCK & GENEROUS CENTER AIMING ("gak perlu klik dua kali, posisi pas ketengah"):
//    Returning from inspection modal auto re-locks pointer immediately!
//    Proximity detection covers the entire corridor width so you can stand comfortably centered!
// 5. CLOSE IMMERSIVE POV & WALL CLIPPING PROTECTION ("pov deket kaya tadi & gak tembus tembok/glitch"):
//    Camera maxDistance locked to 3.5m for a close, intimate AAA RPG feel!
//    Camera coordinates strictly clamped inside gallery walls so it never clips into the outside void!
function RpgSceneController({ setNearbyMotif }) {
  const { cameraMode, activePortalId, povMode, togglePov, mobileJump, enterPortal } = useAppStore();
  const ecctrlRef = useRef();
  const cameraControlsRef = useRef();
  const [, getKeys] = useKeyboardControls();
  const nearbyMotifRef = useRef(null);
  const { camera } = useThree();

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
          if (nearbyMotifRef.current.id === 'sdg12-alchemist') {
            useAppStore.getState().setEcoModalOpen(true);
          } else {
            enterPortal(nearbyMotifRef.current.id);
          }
        }
      } else if (e.key === 'p' || e.key === 'P') {
        e.preventDefault();
        const appStore = useAppStore.getState();
        appStore.setSettingsOpen(!appStore.isSettingsOpen);
        if (document.pointerLockElement) {
          document.exitPointerLock();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [togglePov, cameraMode, enterPortal]);

  // INSTANTLY DOLLY CAMERA WHEN SWITCHING POV MODE (1st Person vs 3rd Person):
  // Required because changing React minDistance/maxDistance props alone does not animate existing camera position!
  useEffect(() => {
    if (!cameraControlsRef.current) return;
    if (povMode === '1st') {
      // Dolly camera right into the character's eye socket and allow full vertical looking ("mendongkak keatas")!
      cameraControlsRef.current.minDistance = 0.01;
      cameraControlsRef.current.maxDistance = 0.01;
      cameraControlsRef.current.minPolarAngle = 0.15;
      cameraControlsRef.current.maxPolarAngle = Math.PI - 0.15;
      cameraControlsRef.current.dollyTo(0.01, true);
    } else if (povMode === '3rd') {
      // Dolly camera back out to over-the-shoulder 3rd person and allow full vertical looking!
      cameraControlsRef.current.minDistance = 1.0;
      cameraControlsRef.current.maxDistance = 2.0;
      cameraControlsRef.current.minPolarAngle = 0.15;
      cameraControlsRef.current.maxPolarAngle = Math.PI - 0.15;
      cameraControlsRef.current.dollyTo(2.0, true);
    }
  }, [povMode]);

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

  // MINECRAFT MOBILE TOUCH SWIPE LOOK & HEAD TRACKING:
  useEffect(() => {
    let lastTouchX = 0;
    let lastTouchY = 0;

    const handleTouchStart = (e) => {
      // Find the touch on the right half of the screen
      for (let i = 0; i < e.touches.length; i++) {
        if (e.touches[i].clientX > window.innerWidth / 2) {
          lastTouchX = e.touches[i].clientX;
          lastTouchY = e.touches[i].clientY;
          break;
        }
      }
    };

    const handleTouchMove = (e) => {
      if (cameraControlsRef.current && cameraMode === 'rpg' && isTouchDevice) {
        let lookTouch = null;
        for (let i = 0; i < e.touches.length; i++) {
          if (e.touches[i].clientX > window.innerWidth / 2) {
            lookTouch = e.touches[i];
            break;
          }
        }
        
        if (!lookTouch) return;

        const movementX = lookTouch.clientX - lastTouchX;
        const movementY = lookTouch.clientY - lastTouchY;
        
        cameraControlsRef.current.rotate(-movementX * 0.005, -movementY * 0.005, false);

        if (!window.__mouseLook) window.__mouseLook = { x: 0, y: 0 };
        window.__mouseLook.x = THREE.MathUtils.clamp(window.__mouseLook.x + movementX * 0.005, -1, 1);
        window.__mouseLook.y = THREE.MathUtils.clamp(window.__mouseLook.y - movementY * 0.005, -1, 1);

        lastTouchX = lookTouch.clientX;
        lastTouchY = lookTouch.clientY;
      }
    };

    if (isTouchDevice) {
      window.addEventListener('touchstart', handleTouchStart);
      window.addEventListener('touchmove', handleTouchMove, { passive: false });
    }

    return () => {
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, [cameraMode]);

  // Window-level pointer handler — ONLY fires inspection logic when pointer is LOCKED
  // This runs independently of Three.js mesh clicks so they never conflict!
  useEffect(() => {
    const handleWindowPointerDown = (e) => {
      if (e.button !== 0) return;
      // Only handle crosshair-click inspection when pointer is locked AND in rpg mode
      if (cameraMode !== 'rpg' || !document.pointerLockElement) return;
      if (nearbyMotifRef.current) {
        if (nearbyMotifRef.current.id === 'sdg12-alchemist') {
          useAppStore.getState().setEcoModalOpen(true);
        } else {
          enterPortal(nearbyMotifRef.current.id);
        }
      }
    };
    window.addEventListener('pointerdown', handleWindowPointerDown);
    return () => window.removeEventListener('pointerdown', handleWindowPointerDown);
  }, [cameraMode, enterPortal]);

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
    } else if (cameraMode === 'rpg') {
      if (povMode === '1st') {
        cameraControlsRef.current.minDistance = 0.01;
        cameraControlsRef.current.maxDistance = 0.01;
        cameraControlsRef.current.dollyTo(0.01, true);
      } else {
        cameraControlsRef.current.minDistance = 1.0;
        cameraControlsRef.current.maxDistance = 2.0;
        cameraControlsRef.current.dollyTo(2.0, true);
      }
    }
  }, [cameraMode, activePortalId, povMode]);

  // In useFrame: Drive character movement, camera follow target, and proximity detection!
  useFrame(() => {
    if (!ecctrlRef.current) return;

    if (cameraMode === 'cinematic' || (cameraMode === 'portal' && activePortalId)) {
      ecctrlRef.current.setMovement({
        forward: false, backward: false, leftward: false, rightward: false, jump: false, run: false
      });
    } else if (cameraMode === 'rpg') {
      const keys = getKeys();
      const joysticks = useJoystickStore.getState().joysticks;
      const joystick = joysticks ? joysticks['default'] : null;
      
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

      // PREVENT CAMERA FROM CLIPPING INTO WALLS OR OUTSIDE VOID ("keliatan bagian luarnya & glitch"):
      // Gallery interior walls are at X = -8 to +8, Z = -29 to +29.
      // We strictly clamp camera coordinates inside the room so it NEVER clips through walls!
      if (!is1stPerson && camera) {
        camera.position.x = THREE.MathUtils.clamp(camera.position.x, -7.2, 7.2);
        camera.position.z = THREE.MathUtils.clamp(camera.position.z, -27.5, 27.5);
        if (camera.position.y < 0.4) camera.position.y = 0.4;
      }

      // TIGHT PROXIMITY DETECTION — checks real 3D distance to each painting's position
      if (target && typeof target.z === 'number') {
        const px = target.x;
        const pz = target.z;
        const RADIUS = 4.5; // units before E button shows

        // Painting positions (x, z): Bayam Raja (0, -27.5), Gigi Haruan (-7.5, 6),
        // Kambang Kacang (7.5, -6), Kain Sarigading (-7.5, -16), Naga Balimbur (7.5, -18)
        // SDG 12 EcoDye (0, 0), Monolith Babad (0, 16)
        const paintings = [
          { motif: MOTIFS_DATA[0], px: 0,    pz: -27.5 },
          { motif: MOTIFS_DATA[1], px: -7.5, pz: -6    },
          { motif: MOTIFS_DATA[2], px: 7.5,  pz: -6    },
          { motif: MOTIFS_DATA[3], px: -7.5, pz: -16   },
          { motif: MOTIFS_DATA[4], px: 7.5,  pz: -18   },
          { motif: MOTIFS_DATA[5], px: 0,    pz: 8     }  // EcoDyeStation (Moved away from benches)
        ];

        let found = null;
        for (const p of paintings) {
          const dx = px - p.px;
          const dz = pz - p.pz;
          if (Math.sqrt(dx * dx + dz * dz) < RADIUS) {
            found = p.motif;
            break;
          }
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

      {/* 
          SUPER CLOSE IMMERSIVE OVER-THE-SHOULDER POV & FULL VERTICAL LOOKING ("mendongkak keatas"):
          minDistance=1.0, maxDistance=2.0 keeps the 3rd person camera right over the shoulders like God of War / RE4!
          minPolarAngle=0.15, maxPolarAngle=Math.PI-0.15 allows looking straight up at chandeliers and down at floor!
      */}
      <EcctrlCameraControls
        ref={cameraControlsRef}
        makeDefault
        enabled={cameraMode !== 'cinematic'}
        smoothTime={0.1}
        minDistance={cameraMode === 'portal' ? 2.0 : (is1stPerson ? 0.01 : 1.0)}
        maxDistance={cameraMode === 'portal' ? 12.0 : (is1stPerson ? 0.01 : 2.0)}
        minPolarAngle={0.15}
        maxPolarAngle={Math.PI - 0.15}
      />
    </>
  );
}

export default function Scene() {
  const { cameraMode, enterPortal } = useAppStore();
  const [nearbyMotif, setNearbyMotif] = useState(null);

  const [isPointerLocked, setIsPointerLocked] = useState(false);

  // Track pointer lock state
  useEffect(() => {
    const onLockChange = () => setIsPointerLocked(!!document.pointerLockElement);
    document.addEventListener('pointerlockchange', onLockChange);
    return () => document.removeEventListener('pointerlockchange', onLockChange);
  }, []);

  const requestLock = () => {
    if (isTouchDevice) return;
    if (!document.pointerLockElement) document.body.requestPointerLock();
  };

  return (
    <div 
      className="w-full h-screen fixed inset-0 z-10 bg-[#06080f]"
    >
      {/* Toast Prompt to click to lock pointer when not locked */}
      {cameraMode === 'rpg' && !isPointerLocked && !isTouchDevice && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-40 pointer-events-none animate-pulse">
          <div className="bg-amber-500/90 text-slate-950 px-6 py-2 rounded-full font-game font-bold text-sm shadow-[0_0_15px_rgba(245,158,11,0.5)]">
            Klik di mana saja untuk mengunci kursor & bermain
          </div>
        </div>
      )}

      {/* AUTHENTIC MINECRAFT CENTER STUCK CROSSHAIR (+) */}
      {cameraMode === 'rpg' && (
        <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-40 pointer-events-none select-none flex items-center justify-center">
          <div className="relative flex items-center justify-center">
            {/* Horizontal Bar */}
            <div className="w-7 h-0.5 bg-amber-400 shadow-[0_0_8px_rgba(0,0,0,0.9)] rounded-full" />
            {/* Vertical Bar */}
            <div className="h-7 w-0.5 bg-amber-400 shadow-[0_0_8px_rgba(0,0,0,0.9)] rounded-full absolute" />
            {/* Center Aim Dot */}
            <div className="w-2 h-2 bg-white rounded-full absolute shadow-[0_0_6px_rgba(245,158,11,1)] animate-pulse" />
          </div>
        </div>
      )}

      {/* MINECRAFT INTERACTIVE PROMPT WHEN NEAR A PAINTING (Title Case Formatting) */}
      {cameraMode === 'rpg' && nearbyMotif && (
        <div className="fixed bottom-44 sm:bottom-32 left-1/2 -translate-x-1/2 z-50 pointer-events-auto animate-bounce w-max max-w-[90vw]">
          <button
            onClick={(e) => {
              e.stopPropagation();
              enterPortal(nearbyMotif.id);
            }}
            className="px-3 py-2 sm:px-6 sm:py-3 bg-slate-900/95 hover:bg-slate-800 text-amber-400 font-bold rounded-lg sm:rounded-xl border-2 border-amber-500/80 shadow-[0_0_15px_rgba(245,158,11,0.5)] sm:shadow-[0_0_25px_rgba(245,158,11,0.5)] flex items-center gap-2 sm:gap-3 transition-all transform hover:scale-105 cursor-pointer backdrop-blur-md"
          >
            <span className="px-2 py-0.5 sm:px-2.5 sm:py-1 bg-amber-500 text-slate-950 rounded md:rounded-lg text-xs sm:text-sm font-black shadow-inner">E</span>
            <span className="text-[11px] sm:text-base tracking-wide whitespace-normal text-left leading-tight">Klik/Tekan E : Inspeksi {nearbyMotif.title}</span>
          </button>
        </div>
      )}

      {/* On-Screen Mobile Joystick & Jump Button (Only visible during RPG Character Control Mode!) */}
      {cameraMode === 'rpg' && (
        <div className="block lg:hidden fixed inset-0 pointer-events-none z-50">
          {/* Movement Joystick (Bottom Left) */}
          <Joystick 
            joystickMaxRadius={30}
            joystickWrapperStyle={{ bottom: '40px', left: '40px', pointerEvents: 'auto', width: '120px', height: '120px' }}
            joystickBaseStyle={{ width: '80px', height: '80px', background: 'rgba(15, 23, 42, 0.6)', border: '2px solid rgba(251, 191, 36, 0.8)' }}
            joystickKnobStyle={{ width: '45px', height: '45px', background: 'rgba(251, 191, 36, 0.9)', boxShadow: '0 0 15px rgba(251, 191, 36, 0.5)' }}
          />
          
          {/* Jump Button (Bottom Right) */}
          <VirtualButton 
            id="jump"
            buttonWrapperStyle={{ bottom: '40px', right: '40px', pointerEvents: 'auto', width: '70px', height: '70px' }}
            buttonCapStyle={{ width: '55px', height: '55px', background: 'rgba(15, 23, 42, 0.6)', border: '2px solid rgba(6, 182, 212, 0.8)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 15px rgba(6, 182, 212, 0.3)' }}
          >
            <span className="text-cyan-400 font-game font-black text-[10px] uppercase tracking-wider pointer-events-none select-none">LOMPAT</span>
          </VirtualButton>
        </div>
      )}

      <Canvas
        shadows={!isTouchDevice}
        dpr={isTouchDevice ? 1 : 1.5}
        gl={{ antialias: true, alpha: false, powerPreference: 'high-performance' }}
        onPointerMissed={requestLock}
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
          <ambientLight intensity={isTouchDevice ? 1.0 : 0.4} />
          <hemisphereLight intensity={isTouchDevice ? 1.0 : 0.4} color="#fffbeb" groundColor="#0f172a" />
          <directionalLight 
            position={[15, 35, 15]} 
            intensity={isTouchDevice ? 1.8 : 1.2} 
            color="#fffbeb"
            castShadow={!isTouchDevice} 
            shadow-mapSize={isTouchDevice ? [512, 512] : [2048, 2048]}
            shadow-bias={-0.0001}
          />
          <directionalLight position={[-15, 20, -15]} intensity={0.6} color="#38bdf8" />

          {/* BRIGHT STUDIO ENVIRONMENT REFLECTION (Disabled on mobile/touch to boost performance!) */}
          {!isTouchDevice && <Environment preset="apartment" />}

          {/* SOFT CONTACT SHADOWS ON POLISHED SLATE FLOOR */}
          <ContactShadows 
            position={[0, 0.01, 0]} 
            opacity={0.8} 
            scale={60} 
            blur={2.5} 
            far={6} 
            color="#06080f" 
            frames={1} // MASSIVE PERFORMANCE BOOST: Only render once on load!
            resolution={isTouchDevice ? 512 : 1024}
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
