import React, { useRef, useState } from 'react';
import { RoundedBox, Text, Float, useCursor } from '@react-three/drei';
import * as THREE from 'three';
import { useAppStore } from '../../store/useAppStore';
import WavingFabric from './WavingFabric';

// WHITE HOUSE / LOUVRE PALACE STYLE:
// Paintings mounted directly on enclosed neoclassical walls with Ornate Gold Frames, Museum Sconces, and Gold Plaques!
// STRICT COMPLIANCE: When clicked, DO NOT teleport to another dimension! Stay in the room with smooth camera zoom!
export default function SasiranganPortal({ motif }) {
  const groupRef = useRef();
  const [hovered, setHovered] = useState(false);
  useCursor(hovered);

  const { activePortalId, enterPortal, discoveredMotifs } = useAppStore();
  const isActive = activePortalId === motif.id;
  const isDiscovered = discoveredMotifs.includes(motif.id);

  const handleClick = (e) => {
    e.stopPropagation();
    if (!isActive) {
      enterPortal(motif.id);
    }
  };

  return (
    <group 
      ref={groupRef}
      position={motif.position} 
      rotation={motif.rotation}
    >
      {/* 1. MUSEUM SCONCE LIGHT ABOVE PAINTING (Lampu Dinding Emas Ala Gedung Putih) */}
      <group position={[0, 2.8, 0.4]}>
        {/* Gold Light Fixture Arm */}
        <mesh position={[0, 0, -0.2]} castShadow>
          <boxGeometry args={[1.2, 0.1, 0.4]} />
          <meshStandardMaterial color="#f59e0b" roughness={0.15} metalness={0.9} />
        </mesh>
        {/* Glowing LED Tube */}
        <mesh position={[0, -0.08, 0]}>
          <cylinderGeometry args={[0.06, 0.06, 1.4, 16]} rotation={[0, 0, Math.PI / 2]} />
          <meshBasicMaterial color="#fbbf24" />
        </mesh>
        {/* Spotlight shining down on the Sasirangan painting */}
        <pointLight position={[0, -0.3, 0.2]} intensity={3.5} distance={6} color="#fbbf24" />
      </group>

      {/* 2. ORNATE GOLD PICTURE FRAME & INTERACTIVE BOUNDARY */}
      <group 
        onClick={handleClick}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        scale={hovered ? [1.04, 1.04, 1.04] : [1, 1, 1]}
      >
        {/* Outer Ornate Gold Frame (Bingkai Emas Mewah Ala Gedung Putih) */}
        <RoundedBox args={[3.4, 4.4, 0.3]} radius={0.1} smoothness={4} position={[0, 0, -0.15]} castShadow>
          <meshStandardMaterial 
            color={hovered ? "#fbbf24" : "#d97706"} 
            roughness={0.15} 
            metalness={0.9}
            emissive={hovered ? "#f59e0b" : "#000000"}
            emissiveIntensity={hovered ? 0.4 : 0}
          />
        </RoundedBox>

        {/* Inner Dark Velvet Frame Accent */}
        <mesh position={[0, 0, -0.02]}>
          <boxGeometry args={[3.0, 4.0, 0.1]} />
          <meshStandardMaterial color="#0f172a" roughness={0.4} />
        </mesh>

        {/* Title Text above frame */}
        <Text
          position={[0, 2.5, 0.1]}
          fontSize={0.24}
          color="#0f172a"
          anchorX="center"
          anchorY="middle"
          outlineWidth={0.01}
          outlineColor="#ffffff"
        >
          {motif.title.toUpperCase()}
        </Text>

        {/* 3. ENGRAVED GOLD PLAQUE BELOW PAINTING */}
        <group position={[0, -2.5, 0.1]}>
          <mesh castShadow receiveShadow>
            <boxGeometry args={[2.4, 0.5, 0.1]} />
            <meshStandardMaterial color="#0f172a" roughness={0.2} metalness={0.8} />
          </mesh>
          <mesh position={[0, 0, 0.02]}>
            <boxGeometry args={[2.3, 0.4, 0.08]} />
            <meshStandardMaterial color={isDiscovered ? "#10b981" : "#f59e0b"} roughness={0.2} metalness={0.8} />
          </mesh>
          <Text
            position={[0, 0, 0.08]}
            fontSize={0.16}
            color="#0f172a"
            anchorX="center"
            anchorY="middle"
          >
            {isDiscovered ? "✓ ARTEFAK TERVERIFIKASI" : "✦ KLIK UNTUK INSPEKSI FILOSOFI ✦"}
          </Text>
        </group>

        {/* Floating Verified Badge */}
        {isDiscovered && (
          <Float speed={4} floatIntensity={0.5} position={[1.4, 2.0, 0.4]}>
            <mesh castShadow>
              <sphereGeometry args={[0.22, 24, 24]} />
              <meshStandardMaterial color="#10b981" roughness={0.2} metalness={0.8} emissive="#10b981" emissiveIntensity={0.6} />
            </mesh>
          </Float>
        )}

        {/* 4. THE WALL-MOUNTED SASIRANGAN MASTERPIECE CANVAS (STAYS IN ROOM!) */}
        <group position={[0, 0, 0.05]}>
          <WavingFabric 
            textureUrl={motif.textureUrl} 
            color={motif.color}
            width={2.8}
            height={3.8}
            distort={0.2}
            speed={2.0}
            isInsidePortal={false}
          />
        </group>
      </group>

    </group>
  );
}
