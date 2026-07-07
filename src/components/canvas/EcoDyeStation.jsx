import React, { useRef, useState } from 'react';
import { Text, Float } from '@react-three/drei';
import { RigidBody, CuboidCollider } from '@react-three/rapier';
import { useAppStore } from '../../store/useAppStore';

export default function EcoDyeStation({ position, rotation }) {
  const groupRef = useRef();
  const [hovered, setHovered] = useState(false);

  const { setEcoModalOpen } = useAppStore();

  const handleClick = (e) => {
    e.stopPropagation();
    setEcoModalOpen(true);
  };

  const dyes = [
    { color: '#fbbf24', emissive: '#ca8a04', pos: [-1.5, 0, 0], name: 'Kunyit' },
    { color: '#78350f', emissive: '#451a03', pos: [0, 0, 0],    name: 'Kulit Jengkol' },
    { color: '#dc2626', emissive: '#7f1d1d', pos: [1.5, 0, 0],  name: 'Secang' }
  ];

  return (
    <group position={position} rotation={rotation} ref={groupRef}>
      
      {/* Platform/Base with Physics Collider */}
      <RigidBody type="fixed" colliders={false}>
        <CuboidCollider args={[2.4, 0.2, 1.1]} position={[0, -0.3, 0]} />
        <mesh position={[0, -0.4, 0]} receiveShadow castShadow>
          <boxGeometry args={[4.8, 0.2, 2.2]} />
          <meshStandardMaterial color="#1e293b" roughness={0.8} />
        </mesh>
        {/* Gold trim */}
        <mesh position={[0, -0.28, 0]}>
          <boxGeometry args={[4.9, 0.06, 2.3]} />
          <meshStandardMaterial color="#f59e0b" roughness={0.2} metalness={0.9} />
        </mesh>
      </RigidBody>

      {/* 3 Dye Vats — Interactable */}
      <group 
        onClick={handleClick} 
        onPointerOver={() => setHovered(true)} 
        onPointerOut={() => setHovered(false)}
      >
        {dyes.map((dye, idx) => (
          <group key={idx} position={dye.pos}>
            {/* Wooden Vat Body */}
            <mesh position={[0, 0.45, 0]} castShadow receiveShadow>
              <cylinderGeometry args={[0.55, 0.48, 1.0, 20]} />
              <meshStandardMaterial color="#451a03" roughness={0.9} />
            </mesh>
            {/* Liquid Surface - simple emissive material instead of physical */}
            <mesh position={[0, 0.92, 0]}>
              <cylinderGeometry args={[0.5, 0.5, 0.06, 20]} />
              <meshStandardMaterial 
                color={dye.color} 
                emissive={dye.emissive}
                emissiveIntensity={hovered ? 1.5 : 0.4}
                roughness={0.05}
                metalness={0.1}
              />
            </mesh>
            {/* Glow light */}
            <pointLight 
              position={[0, 1.2, 0]} 
              intensity={hovered ? 3 : 0.8} 
              distance={2} 
              color={dye.color} 
            />
            {/* Label */}
            <Text
              position={[0, 0.42, 0.58]}
              fontSize={0.14}
              color="#f8fafc"
              anchorX="center"
              anchorY="middle"
            >
              {dye.name}
            </Text>
          </group>
        ))}

        {/* Floating Info Plaque */}
        <group position={[0, 2.2, 0]}>
          <Float speed={2} floatIntensity={0.4}>
            {/* Plaque background */}
            <mesh>
              <boxGeometry args={[2.8, 0.7, 0.08]} />
              <meshStandardMaterial 
                color={hovered ? "#0f172a" : "#0a0f1a"} 
                roughness={0.2} 
                metalness={0.8}
                emissive={hovered ? "#fbbf24" : "#000000"}
                emissiveIntensity={hovered ? 0.08 : 0}
              />
            </mesh>
            {/* Gold border */}
            <mesh position={[0, 0, -0.02]}>
              <boxGeometry args={[2.9, 0.8, 0.04]} />
              <meshStandardMaterial color={hovered ? "#fbbf24" : "#d97706"} roughness={0.2} metalness={0.9} />
            </mesh>
            <Text
              position={[0, 0.1, 0.07]}
              fontSize={0.18}
              color={hovered ? "#fbbf24" : "#e2e8f0"}
              anchorX="center"
              anchorY="middle"
              fontWeight="bold"
            >
              INOVASI PEWARNA ALAM
            </Text>
            <Text
              position={[0, -0.15, 0.07]}
              fontSize={0.11}
              color={hovered ? "#ffffff" : "#94a3b8"}
              anchorX="center"
              anchorY="middle"
            >
              {hovered ? '— KLIK UNTUK BACA INFO SDG 11.4 —' : '[ SDG 11.4 & SDG 12 ]'}
            </Text>
          </Float>
        </group>

      </group>
    </group>
  );
}
