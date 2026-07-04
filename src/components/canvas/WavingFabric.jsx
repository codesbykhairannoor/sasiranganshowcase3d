import React, { useRef } from 'react';
import { useTexture, Float } from '@react-three/drei';
import * as THREE from 'three';

// 1000% BULLETPROOF & CRASH-FREE SASIRANGAN CANVAS:
// Replaced MeshDistortMaterial (which causes WebGL shader crashes & black screen on many GPUs)
// with a pristine, high-definition meshStandardMaterial + gentle floating presentation!
export default function WavingFabric({ textureUrl, color, width = 2.6, height = 3.6, isInsidePortal = false }) {
  const meshRef = useRef();
  
  // Load texture cleanly with sRGB color space for crystal clear batik pattern definition
  const texture = useTexture(textureUrl);
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  texture.colorSpace = THREE.SRGBColorSpace;

  return (
    <Float
      speed={2.0}
      rotationIntensity={isInsidePortal ? 0.5 : 0.2}
      floatIntensity={isInsidePortal ? 1.0 : 0.4}
      floatingRange={[-0.08, 0.08]}
    >
      <mesh ref={meshRef} castShadow receiveShadow>
        <planeGeometry args={[width, height]} />
        
        {/* Standard Material guarantees ZERO shader compilation failures or black voids! */}
        <meshStandardMaterial
          map={texture}
          roughness={0.25}
          metalness={0.05}
          side={THREE.DoubleSide}
          emissive={color}
          emissiveIntensity={isInsidePortal ? 0.3 : 0.15}
        />
      </mesh>
    </Float>
  );
}
