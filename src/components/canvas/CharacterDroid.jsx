import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, useKeyboardControls } from '@react-three/drei';
import { useJoystickStore } from 'ecctrl/input';
import * as THREE from 'three';
import { useAppStore } from '../../store/useAppStore';

// SUPER QA & DEITY-LEVEL SOFTWARE ENGINEERING:
// 1. Dynamic Walking & Running Stride Animation (Eliminates stiff walking!)
// 2. 1st Person POV Support: Automatically hides helmet/torso in 1st Person so camera doesn't clip!
export default function CharacterDroid() {
  const { povMode } = useAppStore();
  const visorRef = useRef();
  const leftArmRef = useRef();
  const rightArmRef = useRef();
  const leftLegRef = useRef();
  const rightLegRef = useRef();
  const [, getKeys] = useKeyboardControls();

  const is1stPerson = povMode === '1st';

  // Dynamic animation based on player movement velocity
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

      {/* 2. HEAD / HELMET (Hidden in 1st person!) */}
      <group position={[0, 1.45, 0]} visible={!is1stPerson}>
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

      {/* 3. ARMS (Can stay visible in 1st person or hide! Let's keep visible so you see arms when looking down!) */}
      {/* Left Arm */}
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

      {/* Right Arm */}
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
      {/* Left Leg */}
      <group ref={leftLegRef} position={[-0.16, 0.5, 0]}>
        <mesh position={[0, -0.35, 0]} castShadow>
          <boxGeometry args={[0.2, 0.7, 0.22]} />
          <meshStandardMaterial color="#0f172a" roughness={0.3} metalness={0.8} />
        </mesh>
      </group>

      {/* Right Leg */}
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
