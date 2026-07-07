import React, { useRef } from 'react';
import { Text, Float, useTexture } from '@react-three/drei';
import { RigidBody, CuboidCollider } from '@react-three/rapier';
import { useFrame } from '@react-three/fiber';
import { useAppStore } from '../../store/useAppStore';

// Rotating fabric roll display stand
function FabricRoll({ textureUrl, color, position, label, speed = 0.3 }) {
  const rollRef = useRef();
  const tex = useTexture(textureUrl);

  useFrame((_, delta) => {
    if (rollRef.current) {
      rollRef.current.rotation.y += delta * speed;
    }
  });

  return (
    <group position={position}>
      {/* Pedestal base */}
      <mesh position={[0, 0.06, 0]} receiveShadow>
        <cylinderGeometry args={[0.5, 0.55, 0.12, 24]} />
        <meshStandardMaterial color="#0f172a" roughness={0.2} metalness={0.8} />
      </mesh>
      <mesh position={[0, 0.13, 0]}>
        <cylinderGeometry args={[0.51, 0.51, 0.04, 24]} />
        <meshStandardMaterial color="#f59e0b" roughness={0.2} metalness={0.9} />
      </mesh>
      {/* Slim pole */}
      <mesh position={[0, 0.8, 0]} castShadow>
        <cylinderGeometry args={[0.04, 0.04, 1.35, 12]} />
        <meshStandardMaterial color="#1e293b" roughness={0.3} metalness={0.9} />
      </mesh>
      {/* Rotating fabric cylinder */}
      <group ref={rollRef} position={[0, 1.8, 0]}>
        <mesh castShadow receiveShadow>
          <cylinderGeometry args={[0.38, 0.38, 1.6, 32]} />
          <meshStandardMaterial map={tex} roughness={0.5} />
        </mesh>
        {/* Top/bottom caps */}
        <mesh position={[0, 0.82, 0]}>
          <cylinderGeometry args={[0.4, 0.4, 0.04, 24]} />
          <meshStandardMaterial color={color} roughness={0.3} metalness={0.6} />
        </mesh>
        <mesh position={[0, -0.82, 0]}>
          <cylinderGeometry args={[0.4, 0.4, 0.04, 24]} />
          <meshStandardMaterial color={color} roughness={0.3} metalness={0.6} />
        </mesh>
        {/* Glow light from inside */}
        <pointLight position={[0, 0, 0]} intensity={2.5} distance={1.8} color={color} />
      </group>
      {/* Label below */}
      <Text
        position={[0, 0, 0.56]}
        fontSize={0.12}
        color="#fef3c7"
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.006}
        outlineColor="#000000"
      >
        {label}
      </Text>
    </group>
  );
}

export default function EcoDyeStation({ position, rotation }) {
  const { setEcoModalOpen } = useAppStore();

  return (
    <group position={position} rotation={rotation}>

      {/* Thin walkable platform below — very low profile */}
      <RigidBody type="fixed" colliders={false}>
        <CuboidCollider args={[3.5, 0.08, 1.0]} position={[0, -0.08, 0]} />
        <mesh position={[0, -0.12, 0]} receiveShadow>
          <boxGeometry args={[7.0, 0.16, 2.0]} />
          <meshStandardMaterial color="#0f172a" roughness={0.3} metalness={0.8} />
        </mesh>
        <mesh position={[0, -0.02, 0]}>
          <boxGeometry args={[7.1, 0.05, 2.1]} />
          <meshStandardMaterial color="#f59e0b" roughness={0.2} metalness={0.9} />
        </mesh>
      </RigidBody>

      {/* 3 Rotating Fabric Rolls with actual Sasirangan textures */}
      <FabricRoll
        textureUrl="/textures/bayam_raja.png"
        color="#10b981"
        position={[-2.2, 0.12, 0]}
        label="Motif Bayam Raja"
        speed={0.25}
      />
      <FabricRoll
        textureUrl="/textures/gigi_haruan.png"
        color="#f43f5e"
        position={[0, 0.12, 0]}
        label="Motif Gigi Haruan"
        speed={0.3}
      />
      <FabricRoll
        textureUrl="/textures/kambang_kacang.png"
        color="#a855f7"
        position={[2.2, 0.12, 0]}
        label="Motif Kambang Kacang"
        speed={0.2}
      />

      {/* Clickable floating info banner */}
      <group
        position={[0, 3.5, 0]}
        onClick={(e) => { e.stopPropagation(); setEcoModalOpen(true); }}
        onPointerOver={(e) => (document.body.style.cursor = 'pointer')}
        onPointerOut={(e) => (document.body.style.cursor = 'auto')}
      >
        <Float speed={1.5} floatIntensity={0.3}>
          {/* Gold border frame */}
          <mesh>
            <boxGeometry args={[3.4, 0.9, 0.06]} />
            <meshStandardMaterial color="#d97706" roughness={0.2} metalness={0.9} />
          </mesh>
          {/* Dark panel */}
          <mesh position={[0, 0, 0.04]}>
            <boxGeometry args={[3.2, 0.78, 0.04]} />
            <meshStandardMaterial color="#060f1c" />
          </mesh>
          <Text
            position={[0, 0.16, 0.08]}
            fontSize={0.22}
            color="#fbbf24"
            anchorX="center"
            anchorY="middle"
            fontWeight="bold"
            outlineWidth={0.005}
            outlineColor="#000000"
          >
            PAMERAN KAIN SASIRANGAN
          </Text>
          <Text
            position={[0, -0.18, 0.08]}
            fontSize={0.13}
            color="#94a3b8"
            anchorX="center"
            anchorY="middle"
          >
            [ Klik Untuk Info Pewarna Alam · SDG 11.4 ]
          </Text>
        </Float>
      </group>

    </group>
  );
}
