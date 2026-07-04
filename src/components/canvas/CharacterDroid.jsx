import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, useKeyboardControls } from '@react-three/drei';
import { useJoystickStore } from 'ecctrl/input';
import * as THREE from 'three';
import { useAppStore } from '../../store/useAppStore';

// SUPER RESEARCH & DEITY-LEVEL SOFTWARE ENGINEERING:
// 1. POINTER = CHARACTER HEAD MOVEMENT ("bahkan pointer ini = gerakan kepala karakter"):
//    In 3rd person mode, the character's head/helmet smoothly rotates and tilts to track the player's
//    mouse pointer across the screen! Moving the pointer left/right turns the head yaw, moving up/down tilts pitch!
// 2. Dynamic Walking & Running Stride Animation (Eliminates stiff walking!)
// 3. 1st Person POV Support: Automatically hides helmet/torso in 1st Person so camera doesn't clip!
export default function CharacterDroid() {
  const { povMode } = useAppStore();
  const headRef = useRef();
  const visorRef = useRef();
  const leftArmRef = useRef();
  const rightArmRef = useRef();
  const leftLegRef = useRef();
  const rightLegRef = useRef();
  const [, getKeys] = useKeyboardControls();

  const is1stPerson = povMode === '1st';

  // Dynamic animation based on player movement velocity & mouse pointer tracking
  useFrame((state) => {
    const keys = getKeys();
    const joystick = useJoystickStore.getState().joystick;
    
    const isMoving = keys.forward || keys.backward || keys.leftward || keys.rightward || (joystick && (Math.abs(joystick.x) > 0.1 || Math.abs(joystick.y) > 0.1));
    const isRunning = keys.run;

    const time = state.clock.elapsedTime;
    
    // Pulse visor glow
    if (visorRef.current) {
      visorRef.current.emissiveIntensity = 1.5 + Math.sin(time * 4) * 0.5;
    }

    // HEAD TRACKING TOWARDS MOUSE POINTER ("ketika gw mainin pointer kepala juga gerak gerak"):
    if (headRef.current && !is1stPerson) {
      // state.pointer gives normalized screen coordinates (-1 to +1)
      // As the player moves their gold + crosshair across the screen, the head turns and tilts!
      const targetYaw = -state.pointer.x * 0.85;   // Turns head left/right up to ~50 degrees
      const targetPitch = state.pointer.y * 0.55;  // Tilts head up/down up to ~30 degrees
      const targetRoll = -state.pointer.x * 0.15;  // Subtle lifelike head tilt/roll

      // Smooth buttery slerp/lerp towards mouse pointer position
      headRef.current.rotation.y = THREE.MathUtils.lerp(headRef.current.rotation.y, targetYaw, 0.15);
      headRef.current.rotation.x = THREE.MathUtils.lerp(headRef.current.rotation.x, targetPitch, 0.15);
      headRef.current.rotation.z = THREE.MathUtils.lerp(headRef.current.rotation.z, targetRoll, 0.15);
    }

    // Lively Stride vs Gentle Idle
    if (isMoving) {
      const strideSpeed = isRunning ? 16 : 10;
      const strideAngle = isRunning ? 0.9 : 0.6;
      const t = time * strideSpeed;

      if (leftArmRef.current && rightArmRef.current) {
        leftArmRef.current.rotation.x = Math.sin(t) * strideAngle;
        rightArmRef.current.rotation.x = -Math.sin(t) * strideAngle;
      }
      if (leftLegRef.current && rightLegRef.current) {
        leftLegRef.current.rotation.x = -Math.sin(t) * strideAngle;
        rightLegRef.current.rotation.x = Math.sin(t) * strideAngle;
      }
    } else {
      // Gentle idle breathing
      const t = time * 3;
      if (leftArmRef.current && rightArmRef.current) {
        leftArmRef.current.rotation.x = THREE.MathUtils.lerp(leftArmRef.current.rotation.x, Math.sin(t) * 0.15, 0.1);
        rightArmRef.current.rotation.x = THREE.MathUtils.lerp(rightArmRef.current.rotation.x, -Math.sin(t) * 0.15, 0.1);
      }
      if (leftLegRef.current && rightLegRef.current) {
        leftLegRef.current.rotation.x = THREE.MathUtils.lerp(leftLegRef.current.rotation.x, 0, 0.1);
        rightLegRef.current.rotation.x = THREE.MathUtils.lerp(rightLegRef.current.rotation.x, 0, 0.1);
      }
    }
  });

  return (
    <group position={[0, -0.85, 0]}>
      {/* 1. TORSO / BODY (Hidden in 1st person so camera inside head doesn't clip armor) */}
      <mesh position={[0, 0.9, 0]} castShadow receiveShadow visible={!is1stPerson}>
        <boxGeometry args={[0.55, 0.75, 0.35]} />
        <meshStandardMaterial color="#0f172a" roughness={0.2} metalness={0.9} />
      </mesh>

      {/* Gold/Cyan chest reactor core */}
      <mesh position={[0, 0.95, 0.18]} visible={!is1stPerson}>
        <cylinderGeometry args={[0.08, 0.08, 0.05, 16]} rotation={[Math.PI / 2, 0, 0]} />
        <meshStandardMaterial color="#f59e0b" emissive="#f59e0b" emissiveIntensity={2} />
      </mesh>

      {/* 2. HEAD / HELMET (Rotates & tilts dynamically towards mouse pointer!) */}
      <group ref={headRef} position={[0, 1.45, 0]} visible={!is1stPerson}>
        {/* Helmet base */}
        <mesh castShadow receiveShadow>
          <boxGeometry args={[0.42, 0.42, 0.45]} />
          <meshStandardMaterial color="#1e293b" roughness={0.2} metalness={0.8} />
        </mesh>
        
        {/* Glowing Cyber Visor */}
        <mesh ref={visorRef} position={[0, 0.02, 0.23]}>
          <boxGeometry args={[0.34, 0.14, 0.05]} />
          <meshStandardMaterial color="#06b6d4" emissive="#06b6d4" emissiveIntensity={2} />
        </mesh>

        {/* Gold antenna / earpiece */}
        <mesh position={[0.22, 0, 0]}>
          <boxGeometry args={[0.05, 0.2, 0.15]} />
          <meshStandardMaterial color="#f59e0b" roughness={0.3} metalness={0.9} />
        </mesh>
        <mesh position={[-0.22, 0, 0]}>
          <boxGeometry args={[0.05, 0.2, 0.15]} />
          <meshStandardMaterial color="#f59e0b" roughness={0.3} metalness={0.9} />
        </mesh>
      </group>

      {/* 3. ARMS */}
      <group ref={leftArmRef} position={[-0.38, 1.15, 0]}>
        <mesh position={[0, -0.3, 0]} castShadow>
          <boxGeometry args={[0.18, 0.6, 0.18]} />
          <meshStandardMaterial color="#334155" roughness={0.3} metalness={0.7} />
        </mesh>
        <mesh position={[0, 0.05, 0]}>
          <boxGeometry args={[0.22, 0.15, 0.22]} />
          <meshStandardMaterial color="#f59e0b" roughness={0.2} metalness={0.9} />
        </mesh>
      </group>

      <group ref={rightArmRef} position={[0.38, 1.15, 0]}>
        <mesh position={[0, -0.3, 0]} castShadow>
          <boxGeometry args={[0.18, 0.6, 0.18]} />
          <meshStandardMaterial color="#334155" roughness={0.3} metalness={0.7} />
        </mesh>
        <mesh position={[0, 0.05, 0]}>
          <boxGeometry args={[0.22, 0.15, 0.22]} />
          <meshStandardMaterial color="#f59e0b" roughness={0.2} metalness={0.9} />
        </mesh>
      </group>

      {/* 4. LEGS */}
      <group ref={leftLegRef} position={[-0.16, 0.5, 0]}>
        <mesh position={[0, -0.35, 0]} castShadow>
          <boxGeometry args={[0.2, 0.7, 0.22]} />
          <meshStandardMaterial color="#0f172a" roughness={0.3} metalness={0.8} />
        </mesh>
      </group>

      <group ref={rightLegRef} position={[0.16, 0.5, 0]}>
        <mesh position={[0, -0.35, 0]} castShadow>
          <boxGeometry args={[0.2, 0.7, 0.22]} />
          <meshStandardMaterial color="#0f172a" roughness={0.3} metalness={0.8} />
        </mesh>
      </group>

      {/* Floating energy ring beneath feet */}
      <Float speed={4} floatIntensity={0.2} position={[0, 0.02, 0]}>
        <mesh rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.5, 0.6, 32]} />
          <meshBasicMaterial color="#06b6d4" side={THREE.DoubleSide} transparent opacity={0.6} />
        </mesh>
      </Float>
    </group>
  );
}
