import React, { useRef, useState } from 'react';
import { useCursor, Text, Float } from '@react-three/drei';
import { useAppStore } from '../../store/useAppStore';

export default function EcoDyeStation({ position, rotation }) {
  const groupRef = useRef();
  const [hovered, setHovered] = useState(false);
  useCursor(hovered);

  const { setEcoModalOpen } = useAppStore();

  const handleClick = (e) => {
    e.stopPropagation();
    setEcoModalOpen(true);
  };

  // Drum colors: Kunyit (Yellow), Jengkol (Brown), Secang (Red)
  const dyes = [
    { color: '#fbbf24', pos: [-1.5, 0, 0], name: 'Kunyit' },
    { color: '#92400e', pos: [0, 0, 0], name: 'Kulit Jengkol' },
    { color: '#ef4444', pos: [1.5, 0, 0], name: 'Secang' }
  ];

  return (
    <group position={position} rotation={rotation} ref={groupRef}>
      
      {/* Platform/Base */}
      <mesh position={[0, -0.4, 0]} receiveShadow castShadow>
        <boxGeometry args={[4.5, 0.2, 2]} />
        <meshStandardMaterial color="#1e293b" roughness={0.8} />
      </mesh>

      {/* 3 Dye Vats */}
      <group onClick={handleClick} onPointerOver={() => setHovered(true)} onPointerOut={() => setHovered(false)}>
        {dyes.map((dye, idx) => (
          <group key={idx} position={dye.pos}>
            {/* Wooden Vat Cylinder */}
            <mesh position={[0, 0.5, 0]} castShadow receiveShadow>
              <cylinderGeometry args={[0.6, 0.5, 1, 16]} />
              <meshStandardMaterial color="#451a03" roughness={0.9} />
            </mesh>
            {/* Liquid Surface */}
            <mesh position={[0, 0.95, 0]}>
              <cylinderGeometry args={[0.55, 0.55, 0.05, 16]} />
              <meshPhysicalMaterial 
                color={dye.color} 
                transmission={0.9} 
                opacity={1} 
                roughness={0.1}
                ior={1.5}
                thickness={2}
                emissive={dye.color}
                emissiveIntensity={hovered ? 0.8 : 0.2}
              />
            </mesh>
            {/* Label */}
            <Text
              position={[0, 0.4, 0.62]}
              fontSize={0.15}
              color="#f8fafc"
              anchorX="center"
              anchorY="middle"
            >
              {dye.name}
            </Text>
          </group>
        ))}

        {/* Hover / Interact Indicator Plaque */}
        <group position={[0, 1.8, 0]} scale={hovered ? 1.1 : 1}>
          <Float speed={2} floatIntensity={0.5}>
            <mesh castShadow>
              <boxGeometry args={[2.5, 0.6, 0.1]} />
              <meshStandardMaterial color={hovered ? "#fbbf24" : "#0f172a"} roughness={0.2} metalness={0.8} />
            </mesh>
            <mesh position={[0, 0, 0.06]}>
              <boxGeometry args={[2.4, 0.5, 0.05]} />
              <meshStandardMaterial color="#1e293b" />
            </mesh>
            <Text
              position={[0, 0.05, 0.1]}
              fontSize={0.16}
              color={hovered ? "#fbbf24" : "#e2e8f0"}
              anchorX="center"
              anchorY="middle"
            >
              INOVASI PEWARNA ALAM
            </Text>
            <Text
              position={[0, -0.15, 0.1]}
              fontSize={0.1}
              color="#fbbf24"
              anchorX="center"
              anchorY="middle"
            >
              ✦ KLIK UNTUK INFO SDG 11.4 ✦
            </Text>
          </Float>
        </group>

      </group>

    </group>
  );
}
