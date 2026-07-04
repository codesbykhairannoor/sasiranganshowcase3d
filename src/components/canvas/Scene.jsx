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

// CLEAN WAWA SENSEI & MINECRAFT POINTER LOCK ARCHITECTURE:
// 1. MANDATORY FOLLOWER TARGET IN useFrame:
//    As documented in Ecctrl README line 238 ("EcctrlCameraControls does not automatically follow a character
//    by itself; you still drive the follow target from your controller ref"), we MUST call
//    cameraControlsRef.current.moveTo(target.x, eyeHeight, target.z, true) in useFrame! This guarantees
//    the camera 1000% follows the character when walking or refreshing!
// 2. AUTHENTIC MINECRAFT POINTER LOCK (NO HOLDING CLICK REQUIRED):
//    When in RPG mode, clicking the canvas locks the mouse pointer (cursor disappears like Minecraft).
//    Moving the physical mouse fires mousemove events that directly call cameraControlsRef.current.rotate(...),
//    letting the player look around effortlessly without holding down any mouse button!
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

  // MINECRAFT POINTER LOCK MOUSE LOOK (No holding click required!):
  useEffect(() => {
    const handleMouseMove = (e) => {
      // When mouse pointer is locked in RPG mode, mouse movement rotates camera smoothly!
      if (document.pointerLockElement && cameraControlsRef.current && cameraMode === 'rpg') {
        cameraControlsRef.current.rotate(-e.movementX * 0.003, -e.movementY * 0.003, false);
      }
    };

    const handleClick = () => {
      // When in RPG mode and clicking the game canvas, lock the pointer like Minecraft!
      if (cameraMode === 'rpg' && !document.pointerLockElement && typeof document.body.requestPointerLock === 'function') {
        document.body.requestPointerLock();
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('click', handleClick);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('click', handleClick);
    };
  }, [cameraMode]);

  // Automatically unlock mouse pointer when leaving RPG mode (e.g. opening modal or returning to menu)
  useEffect(() => {
    if (cameraMode !== 'rpg' && document.pointerLockElement && typeof document.exitPointerLock === 'function') {
      document.exitPointerLock();
    }
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

  // In useFrame: Drive character movement AND camera follow target!
  useFrame(() => {
    if (!ecctrlRef.current) return;

    if (cameraMode === 'cinematic' || (cameraMode === 'portal' && activePortalId)) {
      // Freeze character movement while on title screen or inspecting painting
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
      if (cameraControlsRef.current) {
        const target = ecctrlRef.current.currPos;
        if (target && typeof target.x === 'number') {
          // In 1st person, camera is inside visor (Y + 1.45). In 3rd person, orbit target is chest (Y + 1.2)
          const eyeHeight = is1stPerson ? target.y + 1.45 : target.y + 1.2;
          cameraControlsRef.current.moveTo(target.x, eyeHeight, target.z, true);
        }
      }
    }
  });

  return (
    <>
      {/* 
          CLEAN WAWA SENSEI / ECCTRL ARCHITECTURE:
          1. Default floatHeight=0.3 prevents capsule from scraping floor and bouncing/jumping!
          2. Position Y=2.0 drops character cleanly onto carpet at Z=24.
      */}
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
          EcctrlCameraControls follows the target driven in useFrame!
          minDistance/maxDistance handle 1st vs 3rd Person POV cleanly!
      */}
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
