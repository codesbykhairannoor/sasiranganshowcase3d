import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, Text, MeshDistortMaterial, RoundedBox } from '@react-three/drei';
import { RigidBody, CuboidCollider } from '@react-three/rapier';
import * as THREE from 'three';
import { useAppStore } from '../../store/useAppStore';
import { MOTIFS_DATA } from '../../data/motifsData';

// SUPER RESEARCH & DEITY-LEVEL AAA MUSEUM AESTHETICS:
// 1. REPLACED UGLY STERILE WHITE WALLS (#fcf8f2) with Rich Royal Navy Slate (#1e293b) & Obsidian Wainscoting!
// 2. REPLACED PLAIN WHITE COLUMNS with Polished Dark Obsidian Marble (#0f172a) & Brilliant Gold Trim (#f59e0b)!
// 3. ZERO WASM CRASHES: All interactive letters and showcases use colliders={false} with explicit CuboidCollider!
export default function MuseumGallery() {
  const { enterPortal, discoverMotif, motifsDiscovered } = useAppStore();

  const bayamRef = useRef();
  const gigiRef = useRef();
  const kambangRef = useRef();

  // Gentle floating animation for Sasirangan fabric showcases
  useFrame((state) => {
    const time = state.clock.elapsedTime;
    if (bayamRef.current) {
      bayamRef.current.position.y = Math.sin(time * 1.5) * 0.15;
      bayamRef.current.rotation.y = Math.sin(time * 0.8) * 0.1;
    }
    if (gigiRef.current) {
      gigiRef.current.position.y = Math.cos(time * 1.5) * 0.15;
      gigiRef.current.rotation.y = Math.cos(time * 0.8) * 0.1;
    }
    if (kambangRef.current) {
      kambangRef.current.position.y = Math.sin(time * 1.5 + 2) * 0.15;
      kambangRef.current.rotation.y = Math.sin(time * 0.8 + 2) * 0.1;
    }
  });

  const handleInspect = (motif) => {
    discoverMotif(motif.id);
    enterPortal(motif.id);
  };

  return (
    <group>
      {/* ==========================================
          1. MARBLE FLOOR & RED VELVET CARPET (60m long corridor)
         ========================================== */}
      {/* 1m thick solid floor box to prevent Rapier WASM tunneling */}
      <RigidBody type="fixed" colliders={false} position={[0, -0.5, 0]}>
        <CuboidCollider args={[8, 0.5, 29]} />
        <mesh receiveShadow>
          <boxGeometry args={[16, 1, 58]} />
          <meshStandardMaterial color="#0f172a" roughness={0.15} metalness={0.4} />
        </mesh>
      </RigidBody>

      {/* Gold Grid Floor Motif (Royal Sasirangan Hall Pattern) */}
      <gridHelper args={[16, 16, "#f59e0b", "#334155"]} position={[0, 0.01, 0]} />

      {/* Central Royal Red Velvet Carpet (4.8m wide x 58m long) */}
      <mesh position={[0, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[4.8, 58]} />
        <meshStandardMaterial color="#881337" roughness={0.8} />
      </mesh>
      {/* Left Gold Border Strip */}
      <mesh position={[-2.4, 0.021, 0]}>
        <boxGeometry args={[0.12, 0.02, 58]} />
        <meshStandardMaterial color="#f59e0b" roughness={0.2} metalness={0.8} />
      </mesh>
      {/* Right Gold Border Strip */}
      <mesh position={[2.4, 0.021, 0]}>
        <boxGeometry args={[0.12, 0.02, 58]} />
        <meshStandardMaterial color="#f59e0b" roughness={0.2} metalness={0.8} />
      </mesh>

      {/* ==========================================
          2. ROYAL NAVY SLATE WALLS & OBSIDIAN TRIM (16m wide x 60m long x 14m high)
          Replaced plain white #fcf8f2 with luxury gallery aesthetics!
         ========================================== */}
      {/* North End Wall (Presidential Altar where Bayam Raja hangs) */}
      <RigidBody type="fixed" colliders={false} position={[0, 7, -29]}>
        <CuboidCollider args={[8.5, 7, 0.5]} />
        <mesh receiveShadow castShadow>
          <boxGeometry args={[17, 14, 1]} />
          <meshStandardMaterial color="#1e293b" roughness={0.4} metalness={0.2} />
        </mesh>
        {/* Obsidian Slate Baseboard */}
        <mesh position={[0, -6.1, 0.55]}>
          <boxGeometry args={[17, 1.8, 0.1]} />
          <meshStandardMaterial color="#0f172a" roughness={0.2} />
        </mesh>
        {/* Gold Wainscoting Trim */}
        <mesh position={[0, -4.1, 0.55]}>
          <boxGeometry args={[17, 0.2, 0.15]} />
          <meshStandardMaterial color="#f59e0b" roughness={0.2} metalness={0.9} />
        </mesh>
      </RigidBody>

      {/* South Entrance Wall (Behind Spawn) */}
      <RigidBody type="fixed" colliders={false} position={[0, 7, 29]}>
        <CuboidCollider args={[8.5, 7, 0.5]} />
        <mesh receiveShadow castShadow>
          <boxGeometry args={[17, 14, 1]} />
          <meshStandardMaterial color="#1e293b" roughness={0.4} metalness={0.2} />
        </mesh>
      </RigidBody>

      {/* Left Corridor Wall (Where Gigi Haruan hangs) */}
      <RigidBody type="fixed" colliders={false} position={[-8, 7, 0]} rotation={[0, Math.PI / 2, 0]}>
        <CuboidCollider args={[29, 7, 0.5]} />
        <mesh receiveShadow castShadow>
          <boxGeometry args={[58, 14, 1]} />
          <meshStandardMaterial color="#1e293b" roughness={0.4} metalness={0.2} />
        </mesh>
        <mesh position={[0, -6.1, 0.55]}>
          <boxGeometry args={[58, 1.8, 0.1]} />
          <meshStandardMaterial color="#0f172a" roughness={0.2} />
        </mesh>
        <mesh position={[0, -4.1, 0.55]}>
          <boxGeometry args={[58, 0.2, 0.15]} />
          <meshStandardMaterial color="#f59e0b" roughness={0.2} metalness={0.9} />
        </mesh>
      </RigidBody>

      {/* Right Corridor Wall (Where Kambang Kacang hangs) */}
      <RigidBody type="fixed" colliders={false} position={[8, 7, 0]} rotation={[0, -Math.PI / 2, 0]}>
        <CuboidCollider args={[29, 7, 0.5]} />
        <mesh receiveShadow castShadow>
          <boxGeometry args={[58, 14, 1]} />
          <meshStandardMaterial color="#1e293b" roughness={0.4} metalness={0.2} />
        </mesh>
        <mesh position={[0, -6.1, 0.55]}>
          <boxGeometry args={[58, 1.8, 0.1]} />
          <meshStandardMaterial color="#0f172a" roughness={0.2} />
        </mesh>
        <mesh position={[0, -4.1, 0.55]}>
          <boxGeometry args={[58, 0.2, 0.15]} />
          <meshStandardMaterial color="#f59e0b" roughness={0.2} metalness={0.9} />
        </mesh>
      </RigidBody>

      {/* Majestic Midnight Vault Ceiling */}
      <mesh position={[0, 14, 0]} rotation={[Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[16, 58]} />
        <meshStandardMaterial color="#090d16" roughness={0.5} />
      </mesh>
      {/* Gold Ceiling Border Molding */}
      <mesh position={[-7.8, 13.8, 0]} rotation={[0, Math.PI / 2, 0]}>
        <boxGeometry args={[58, 0.4, 0.4]} />
        <meshStandardMaterial color="#f59e0b" roughness={0.2} metalness={0.9} />
      </mesh>
      <mesh position={[7.8, 13.8, 0]} rotation={[0, Math.PI / 2, 0]}>
        <boxGeometry args={[58, 0.4, 0.4]} />
        <meshStandardMaterial color="#f59e0b" roughness={0.2} metalness={0.9} />
      </mesh>

      {/* ==========================================
          3. OBSIDIAN MARBLE COLUMNS & GOLD TRIM
         ========================================== */}
      {/* Polished Obsidian Columns along Left Wall (X = -6.5) and Right Wall (X = +6.5) */}
      {[22, 14, 6, -2, -10, -18, -26].map((z, idx) => (
        <React.Fragment key={`col-${idx}`}>
          {/* Left Column */}
          <RigidBody type="fixed" colliders={false} position={[-6.5, 6.5, z]}>
            <CuboidCollider args={[0.6, 6.5, 0.6]} />
            <mesh receiveShadow castShadow>
              <cylinderGeometry args={[0.6, 0.65, 13, 32]} />
              <meshStandardMaterial color="#0f172a" roughness={0.15} metalness={0.5} />
            </mesh>
            <mesh position={[0, 6.2, 0]}>
              <boxGeometry args={[1.5, 0.6, 1.5]} />
              <meshStandardMaterial color="#f59e0b" roughness={0.2} metalness={0.9} />
            </mesh>
            <mesh position={[0, -6.2, 0]}>
              <boxGeometry args={[1.6, 0.8, 1.6]} />
              <meshStandardMaterial color="#f59e0b" roughness={0.2} metalness={0.9} />
            </mesh>
          </RigidBody>

          {/* Right Column */}
          <RigidBody type="fixed" colliders={false} position={[6.5, 6.5, z]}>
            <CuboidCollider args={[0.6, 6.5, 0.6]} />
            <mesh receiveShadow castShadow>
              <cylinderGeometry args={[0.6, 0.65, 13, 32]} />
              <meshStandardMaterial color="#0f172a" roughness={0.15} metalness={0.5} />
            </mesh>
            <mesh position={[0, 6.2, 0]}>
              <boxGeometry args={[1.5, 0.6, 1.5]} />
              <meshStandardMaterial color="#f59e0b" roughness={0.2} metalness={0.9} />
            </mesh>
            <mesh position={[0, -6.2, 0]}>
              <boxGeometry args={[1.6, 0.8, 1.6]} />
              <meshStandardMaterial color="#f59e0b" roughness={0.2} metalness={0.9} />
            </mesh>
          </RigidBody>
        </React.Fragment>
      ))}

      {/* ==========================================
          4. INTERACTIVE SASIRANGAN SHOWCASES (EXPLICIT CUBOID COLLIDERS)
         ========================================== */}

      {/* --- SHOWCASE 1: BAYAM RAJA (North End Wall, Z = -27.5) --- */}
      <group position={[0, 4.5, -27.5]}>
        <RigidBody type="fixed" colliders={false}>
          <CuboidCollider args={[2, 3, 0.5]} />
          {/* Gold Exhibition Frame */}
          <mesh castShadow receiveShadow>
            <boxGeometry args={[3.8, 5.8, 0.4]} />
            <meshStandardMaterial color="#f59e0b" roughness={0.2} metalness={0.9} />
          </mesh>
          <mesh position={[0, 0, 0.1]}>
            <boxGeometry args={[3.4, 5.4, 0.4]} />
            <meshStandardMaterial color="#090d16" roughness={0.5} />
          </mesh>
        </RigidBody>

        {/* Waving Sasirangan Fabric (MeshDistortMaterial) */}
        <group ref={bayamRef} position={[0, 0, 0.35]}>
          <mesh castShadow onClick={() => handleInspect(MOTIFS_DATA[0])} onPointerOver={(e) => (document.body.style.cursor = 'pointer')} onPointerOut={(e) => (document.body.style.cursor = 'auto')}>
            <planeGeometry args={[2.8, 4.6, 32, 32]} />
            <MeshDistortMaterial
              color="#059669"
              speed={2}
              distort={0.15}
              radius={1}
              roughness={0.3}
              metalness={0.2}
            />
          </mesh>
        </group>

        {/* Title & Interactive Placard */}
        <group position={[0, -3.4, 0.5]}>
          <mesh>
            <boxGeometry args={[3, 0.6, 0.2]} />
            <meshStandardMaterial color="#1e293b" roughness={0.2} metalness={0.8} />
          </mesh>
          <Text position={[0, 0, 0.12]} fontSize={0.22} color="#f59e0b" anchorX="center" anchorY="middle" fontWeight="bold">
            BAYAM RAJA (PRESIDENTIAL)
          </Text>
        </group>
        {/* Glowing Floor Spotlight on Showcase */}
        <pointLight position={[0, -3, 2]} intensity={3} color="#059669" distance={8} />
      </group>

      {/* --- SHOWCASE 2: GIGI HARUAN (Left Wall, X = -7.5, Z = 6) --- */}
      <group position={[-7.5, 4.5, 6]} rotation={[0, Math.PI / 2, 0]}>
        <RigidBody type="fixed" colliders={false}>
          <CuboidCollider args={[2, 3, 0.5]} />
          <mesh castShadow receiveShadow>
            <boxGeometry args={[3.8, 5.8, 0.4]} />
            <meshStandardMaterial color="#f59e0b" roughness={0.2} metalness={0.9} />
          </mesh>
          <mesh position={[0, 0, 0.1]}>
            <boxGeometry args={[3.4, 5.4, 0.4]} />
            <meshStandardMaterial color="#090d16" roughness={0.5} />
          </mesh>
        </RigidBody>

        <group ref={gigiRef} position={[0, 0, 0.35]}>
          <mesh castShadow onClick={() => handleInspect(MOTIFS_DATA[1])} onPointerOver={(e) => (document.body.style.cursor = 'pointer')} onPointerOut={(e) => (document.body.style.cursor = 'auto')}>
            <planeGeometry args={[2.8, 4.6, 32, 32]} />
            <MeshDistortMaterial
              color="#dc2626"
              speed={2.5}
              distort={0.2}
              radius={1}
              roughness={0.3}
              metalness={0.2}
            />
          </mesh>
        </group>

        <group position={[0, -3.4, 0.5]}>
          <mesh>
            <boxGeometry args={[3, 0.6, 0.2]} />
            <meshStandardMaterial color="#1e293b" roughness={0.2} metalness={0.8} />
          </mesh>
          <Text position={[0, 0, 0.12]} fontSize={0.22} color="#f59e0b" anchorX="center" anchorY="middle" fontWeight="bold">
            GIGI HARUAN (SHARP FOCUS)
          </Text>
        </group>
        <pointLight position={[0, -3, 2]} intensity={3} color="#dc2626" distance={8} />
      </group>

      {/* --- SHOWCASE 3: KAMBANG KACANG (Right Wall, X = 7.5, Z = -6) --- */}
      <group position={[7.5, 4.5, -6]} rotation={[0, -Math.PI / 2, 0]}>
        <RigidBody type="fixed" colliders={false}>
          <CuboidCollider args={[2, 3, 0.5]} />
          <mesh castShadow receiveShadow>
            <boxGeometry args={[3.8, 5.8, 0.4]} />
            <meshStandardMaterial color="#f59e0b" roughness={0.2} metalness={0.9} />
          </mesh>
          <mesh position={[0, 0, 0.1]}>
            <boxGeometry args={[3.4, 5.4, 0.4]} />
            <meshStandardMaterial color="#090d16" roughness={0.5} />
          </mesh>
        </RigidBody>

        <group ref={kambangRef} position={[0, 0, 0.35]}>
          <mesh castShadow onClick={() => handleInspect(MOTIFS_DATA[2])} onPointerOver={(e) => (document.body.style.cursor = 'pointer')} onPointerOut={(e) => (document.body.style.cursor = 'auto')}>
            <planeGeometry args={[2.8, 4.6, 32, 32]} />
            <MeshDistortMaterial
              color="#e11d48"
              speed={1.8}
              distort={0.18}
              radius={1}
              roughness={0.3}
              metalness={0.2}
            />
          </mesh>
        </group>

        <group position={[0, -3.4, 0.5]}>
          <mesh>
            <boxGeometry args={[3, 0.6, 0.2]} />
            <meshStandardMaterial color="#1e293b" roughness={0.2} metalness={0.8} />
          </mesh>
          <Text position={[0, 0, 0.12]} fontSize={0.22} color="#f59e0b" anchorX="center" anchorY="middle" fontWeight="bold">
            KAMBANG KACANG (BONDING)
          </Text>
        </group>
        <pointLight position={[0, -3, 2]} intensity={3} color="#e11d48" distance={8} />
      </group>

      {/* ==========================================
          5. GAMIFIED PHYSICAL KNOCKDOWN LETTERS (S-A-S-I-R-A-N-G-A-N)
          Explicit CuboidCollider prevents Troika Text WASM async crashes!
         ========================================== */}
      {["S", "A", "S", "I", "R", "A", "N", "G", "A", "N"].map((letter, index) => {
        const xPos = (index - 4.5) * 1.1;
        return (
          <RigidBody
            key={`letter-${index}`}
            position={[xPos, 1.2, 12]}
            mass={0.8}
            restitution={0.4}
            friction={0.6}
            colliders={false}
          >
            <CuboidCollider args={[0.4, 0.5, 0.2]} />
            <RoundedBox args={[0.8, 1.0, 0.4]} radius={0.08} smoothness={4} castShadow receiveShadow>
              <meshStandardMaterial color={index % 2 === 0 ? "#f59e0b" : "#06b6d4"} roughness={0.2} metalness={0.8} />
            </RoundedBox>
            <Text
              position={[0, 0, 0.21]}
              fontSize={0.65}
              color="#ffffff"
              anchorX="center"
              anchorY="middle"
              fontWeight="black"
            >
              {letter}
            </Text>
          </RigidBody>
        );
      })}

      {/* Glowing Exhibition Banners hanging from Ceiling */}
      <group position={[0, 11, 8]}>
        <mesh>
          <boxGeometry args={[8, 1.5, 0.1]} />
          <meshStandardMaterial color="#0f172a" roughness={0.3} metalness={0.8} />
        </mesh>
        <mesh position={[0, 0, 0.06]}>
          <boxGeometry args={[7.8, 1.3, 0.05]} />
          <meshStandardMaterial color="#f59e0b" emissive="#f59e0b" emissiveIntensity={0.5} />
        </mesh>
        <Text position={[0, 0, 0.1]} fontSize={0.6} color="#090d16" anchorX="center" anchorY="middle" fontWeight="black">
          CULTURE VERSE : SDG 11
        </Text>
      </group>

      <group position={[0, 11, -10]}>
        <mesh>
          <boxGeometry args={[8, 1.5, 0.1]} />
          <meshStandardMaterial color="#0f172a" roughness={0.3} metalness={0.8} />
        </mesh>
        <mesh position={[0, 0, 0.06]}>
          <boxGeometry args={[7.8, 1.3, 0.05]} />
          <meshStandardMaterial color="#06b6d4" emissive="#06b6d4" emissiveIntensity={0.5} />
        </mesh>
        <Text position={[0, 0, 0.1]} fontSize={0.6} color="#090d16" anchorX="center" anchorY="middle" fontWeight="black">
          HIGH-TECH HERITAGE EXHIBITION
        </Text>
      </group>
    </group>
  );
}
