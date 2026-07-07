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
    { color: '#ca8a04', liquid: '#fbbf24', pos: [-1.6, 0, 0], name: 'Kunyit' },
    { color: '#92400e', liquid: '#b45309', pos: [0, 0, 0],    name: 'Kulit Jengkol' },
    { color: '#991b1b', liquid: '#ef4444', pos: [1.6, 0, 0],  name: 'Secang' }
  ];

  return (
    <group position={position} rotation={rotation} ref={groupRef}>

      {/* Thin display platform (NOT blocking the path - narrow Z depth) */}
      <RigidBody type="fixed" colliders={false}>
        <CuboidCollider args={[2.6, 0.12, 0.9]} position={[0, 0.02, 0]} />
        <mesh position={[0, -0.1, 0]} receiveShadow>
          <boxGeometry args={[5.2, 0.22, 1.8]} />
          <meshStandardMaterial color="#0f172a" roughness={0.3} metalness={0.8} />
        </mesh>
        {/* Gold edge trim */}
        <mesh position={[0, 0.02, 0]}>
          <boxGeometry args={[5.3, 0.06, 1.9]} />
          <meshStandardMaterial color="#f59e0b" roughness={0.2} metalness={0.9} />
        </mesh>
      </RigidBody>

      {/* 3 Dye Vats */}
      <group
        onClick={handleClick}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        {dyes.map((dye, idx) => (
          <group key={idx} position={dye.pos}>
            {/* Outer barrel ring (gold) */}
            <mesh position={[0, 0.78, 0]} castShadow>
              <cylinderGeometry args={[0.62, 0.62, 0.08, 24]} />
              <meshStandardMaterial color="#f59e0b" roughness={0.2} metalness={0.9} />
            </mesh>
            <mesh position={[0, 0.38, 0]}>
              <cylinderGeometry args={[0.62, 0.62, 0.06, 24]} />
              <meshStandardMaterial color="#f59e0b" roughness={0.2} metalness={0.9} />
            </mesh>
            {/* Dark wooden barrel body */}
            <mesh position={[0, 0.5, 0]} castShadow receiveShadow>
              <cylinderGeometry args={[0.58, 0.52, 0.82, 24]} />
              <meshStandardMaterial color={dye.color} roughness={0.85} />
            </mesh>
            {/* Liquid cap on top */}
            <mesh position={[0, 0.84, 0]}>
              <cylinderGeometry args={[0.5, 0.5, 0.07, 24]} />
              <meshStandardMaterial
                color={dye.liquid}
                emissive={dye.liquid}
                emissiveIntensity={hovered ? 1.2 : 0.35}
                roughness={0.05}
              />
            </mesh>
            {/* Glow from liquid */}
            <pointLight
              position={[0, 1.3, 0]}
              intensity={hovered ? 4 : 1.2}
              distance={2.5}
              color={dye.liquid}
            />
            {/* Name label on barrel */}
            <Text
              position={[0, 0.5, 0.6]}
              fontSize={0.13}
              color="#fef3c7"
              anchorX="center"
              anchorY="middle"
              outlineWidth={0.008}
              outlineColor="#000000"
            >
              {dye.name}
            </Text>
          </group>
        ))}

        {/* Floating info plaque above vats */}
        <group position={[0, 2.1, 0]}>
          <Float speed={1.8} floatIntensity={0.35}>
            {/* Gold border */}
            <mesh>
              <boxGeometry args={[3.2, 0.88, 0.06]} />
              <meshStandardMaterial color={hovered ? "#fbbf24" : "#d97706"} roughness={0.2} metalness={0.9} />
            </mesh>
            {/* Dark bg */}
            <mesh position={[0, 0, 0.04]}>
              <boxGeometry args={[3.0, 0.76, 0.04]} />
              <meshStandardMaterial
                color="#060f1c"
                emissive={hovered ? "#1a0a00" : "#000000"}
                emissiveIntensity={1}
              />
            </mesh>
            <Text
              position={[0, 0.14, 0.08]}
              fontSize={0.2}
              color={hovered ? "#fbbf24" : "#f1f5f9"}
              anchorX="center"
              anchorY="middle"
              fontWeight="bold"
              outlineWidth={0.005}
              outlineColor="#000000"
            >
              INOVASI PEWARNA ALAM
            </Text>
            <Text
              position={[0, -0.15, 0.08]}
              fontSize={0.12}
              color={hovered ? "#fde68a" : "#94a3b8"}
              anchorX="center"
              anchorY="middle"
            >
              {hovered ? '[ KLIK UNTUK INFO SDG 11.4 & SDG 12 ]' : '[ Klik untuk baca selengkapnya ]'}
            </Text>
          </Float>
        </group>
      </group>

    </group>
  );
}
