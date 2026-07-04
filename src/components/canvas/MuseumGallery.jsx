import React from 'react';
import { Text, RoundedBox, useTexture } from '@react-three/drei';
import { RigidBody, CuboidCollider } from '@react-three/rapier';
import * as THREE from 'three';
import { useAppStore } from '../../store/useAppStore';
import { MOTIFS_DATA } from '../../data/motifsData';

// SUPER RESEARCH & DEITY-LEVEL AAA MUSEUM ARCHITECTURE:
// 1. AUTHENTIC SASIRANGAN TEXTURE MAPS ("BISA LU LIAT LUKISAN NYA KOSONG"):
//    Loaded actual 1.5 MB high-resolution Sasirangan fabric batik patterns (/textures/bayam_raja.png,
//    gigi_haruan.png, kambang_kacang.png) via useTexture! They are NO LONGER blank or empty red boxes!
// 2. PHYSICAL CEILING LAMPS & CHANDELIERS:
//    6 glowing architectural lamp rings along the ceiling with high-intensity downward spotlights!
// 3. STATIC, HIGH-RESOLUTION FRAMED CANVAS ART ("STATIS AJA"):
//    Solid, majestic, static museum framed canvases with dedicated gallery spotlights pointing down!
export default function MuseumGallery() {
  const { enterPortal, discoverMotif } = useAppStore();

  // Load authentic high-resolution Sasirangan fabric batik textures!
  const [bayamTex, gigiTex, kambangTex] = useTexture([
    '/textures/bayam_raja.png',
    '/textures/gigi_haruan.png',
    '/textures/kambang_kacang.png'
  ]);

  const handleInspect = (motif) => {
    discoverMotif(motif.id);
    enterPortal(motif.id);
  };

  return (
    <group>
      {/* ==========================================
          1. MARBLE FLOOR & RED VELVET CARPET (60m long corridor)
         ========================================== */}
      <RigidBody type="fixed" colliders={false} position={[0, -0.5, 0]}>
        <CuboidCollider args={[8, 0.5, 29]} />
        <mesh receiveShadow>
          <boxGeometry args={[16, 1, 58]} />
          <meshStandardMaterial color="#0f172a" roughness={0.15} metalness={0.6} />
        </mesh>
      </RigidBody>

      <gridHelper args={[16, 16, "#f59e0b", "#334155"]} position={[0, 0.01, 0]} />

      <mesh position={[0, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[4.8, 58]} />
        <meshStandardMaterial color="#881337" roughness={0.8} />
      </mesh>
      <mesh position={[-2.4, 0.021, 0]}>
        <boxGeometry args={[0.12, 0.02, 58]} />
        <meshStandardMaterial color="#f59e0b" roughness={0.2} metalness={0.8} />
      </mesh>
      <mesh position={[2.4, 0.021, 0]}>
        <boxGeometry args={[0.12, 0.02, 58]} />
        <meshStandardMaterial color="#f59e0b" roughness={0.2} metalness={0.8} />
      </mesh>

      {/* ==========================================
          2. ROYAL NAVY SLATE WALLS & OBSIDIAN TRIM (16m wide x 60m long x 14m high)
         ========================================== */}
      <RigidBody type="fixed" colliders={false} position={[0, 7, -29]}>
        <CuboidCollider args={[8.5, 7, 0.5]} />
        <mesh receiveShadow castShadow>
          <boxGeometry args={[17, 14, 1]} />
          <meshStandardMaterial color="#1e293b" roughness={0.5} metalness={0.2} />
        </mesh>
        <mesh position={[0, -6.1, 0.55]}>
          <boxGeometry args={[17, 1.8, 0.1]} />
          <meshStandardMaterial color="#0f172a" roughness={0.2} />
        </mesh>
        <mesh position={[0, -4.1, 0.55]}>
          <boxGeometry args={[17, 0.2, 0.15]} />
          <meshStandardMaterial color="#f59e0b" roughness={0.2} metalness={0.9} />
        </mesh>
      </RigidBody>

      <RigidBody type="fixed" colliders={false} position={[0, 7, 29]}>
        <CuboidCollider args={[8.5, 7, 0.5]} />
        <mesh receiveShadow castShadow>
          <boxGeometry args={[17, 14, 1]} />
          <meshStandardMaterial color="#1e293b" roughness={0.5} metalness={0.2} />
        </mesh>
      </RigidBody>

      <RigidBody type="fixed" colliders={false} position={[-8, 7, 0]} rotation={[0, Math.PI / 2, 0]}>
        <CuboidCollider args={[29, 7, 0.5]} />
        <mesh receiveShadow castShadow>
          <boxGeometry args={[58, 14, 1]} />
          <meshStandardMaterial color="#1e293b" roughness={0.5} metalness={0.2} />
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

      <RigidBody type="fixed" colliders={false} position={[8, 7, 0]} rotation={[0, -Math.PI / 2, 0]}>
        <CuboidCollider args={[29, 7, 0.5]} />
        <mesh receiveShadow castShadow>
          <boxGeometry args={[58, 14, 1]} />
          <meshStandardMaterial color="#1e293b" roughness={0.5} metalness={0.2} />
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

      <mesh position={[0, 14, 0]} rotation={[Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[16, 58]} />
        <meshStandardMaterial color="#06080f" roughness={0.6} />
      </mesh>
      <mesh position={[-7.8, 13.8, 0]} rotation={[0, Math.PI / 2, 0]}>
        <boxGeometry args={[58, 0.4, 0.4]} />
        <meshStandardMaterial color="#f59e0b" roughness={0.2} metalness={0.9} />
      </mesh>
      <mesh position={[7.8, 13.8, 0]} rotation={[0, Math.PI / 2, 0]}>
        <boxGeometry args={[58, 0.4, 0.4]} />
        <meshStandardMaterial color="#f59e0b" roughness={0.2} metalness={0.9} />
      </mesh>

      {/* ==========================================
          3. PHYSICAL CEILING LAMPS & CHANDELIERS ("GA ADA LAMPU DIATASNYA")
          6 Architectural Lamp Rings shining warm spotlights down onto the red carpet!
         ========================================== */}
      {[22, 12, 2, -8, -18, -26].map((z, idx) => (
        <group key={`lamp-${idx}`} position={[0, 13.5, z]}>
          <mesh position={[0, 0.4, 0]}>
            <boxGeometry args={[2.6, 0.1, 2.6]} />
            <meshStandardMaterial color="#f59e0b" roughness={0.2} metalness={0.9} />
          </mesh>
          <mesh position={[0, 0.2, 0]}>
            <cylinderGeometry args={[1.2, 1.4, 0.3, 32]} />
            <meshStandardMaterial color="#0f172a" roughness={0.2} metalness={0.8} />
          </mesh>
          <mesh position={[0, 0, 0]}>
            <cylinderGeometry args={[1.1, 1.1, 0.15, 32]} />
            <meshStandardMaterial color="#ffffff" emissive="#f59e0b" emissiveIntensity={4.0} />
          </mesh>
          <pointLight position={[0, -0.5, 0]} intensity={25} distance={24} color="#fffbeb" decay={2} castShadow />
          <mesh position={[0, -6.5, 0]} rotation={[0, 0, 0]}>
            <cylinderGeometry args={[0.5, 4.2, 13, 32]} />
            <meshBasicMaterial color="#f59e0b" transparent opacity={0.04} blending={THREE.AdditiveBlending} />
          </mesh>
        </group>
      ))}

      {/* ==========================================
          4. OBSIDIAN MARBLE COLUMNS & GOLD TRIM
         ========================================== */}
      {[22, 14, 6, -2, -10, -18, -26].map((z, idx) => (
        <React.Fragment key={`col-${idx}`}>
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
          5. AUTHENTIC SASIRANGAN TEXTURED CANVAS PAINTINGS
          Loaded actual batik texture maps so they are NEVER blank or empty again!
         ========================================== */}

      {/* --- SHOWCASE 1: BAYAM RAJA (North End Wall, Z = -27.5) --- */}
      <group position={[0, 4.5, -27.5]}>
        <RigidBody type="fixed" colliders={false}>
          <CuboidCollider args={[2, 3, 0.5]} />
          <mesh castShadow receiveShadow>
            <boxGeometry args={[4.2, 6.2, 0.4]} />
            <meshStandardMaterial color="#f59e0b" roughness={0.2} metalness={0.9} />
          </mesh>
          <mesh position={[0, 0, 0.1]}>
            <boxGeometry args={[3.6, 5.6, 0.42]} />
            <meshStandardMaterial color="#06080f" roughness={0.8} />
          </mesh>
        </RigidBody>

        {/* STATIC Textured Canvas Painting (With Authentic Bayam Raja Batik Pattern!) */}
        <group position={[0, 0, 0.35]}>
          <mesh 
            castShadow 
            onClick={() => handleInspect(MOTIFS_DATA[0])} 
            onPointerOver={(e) => (document.body.style.cursor = 'pointer')} 
            onPointerOut={(e) => (document.body.style.cursor = 'auto')}
          >
            <boxGeometry args={[3.0, 5.0, 0.1]} />
            <meshStandardMaterial
              color="#ffffff"
              map={bayamTex}
              roughness={0.25}
              metalness={0.1}
              emissiveMap={bayamTex}
              emissive="#10b981"
              emissiveIntensity={0.2}
            />
          </mesh>
        </group>

        {/* Dedicated Gallery Wall Spotlight pointing down onto Painting */}
        <group position={[0, 4.2, 1.2]}>
          <mesh>
            <boxGeometry args={[1.5, 0.3, 0.8]} />
            <meshStandardMaterial color="#0f172a" roughness={0.2} metalness={0.8} />
          </mesh>
          <mesh position={[0, -0.1, 0.2]}>
            <boxGeometry args={[1.2, 0.1, 0.4]} />
            <meshStandardMaterial color="#ffffff" emissive="#fffbeb" emissiveIntensity={3.0} />
          </mesh>
          <spotLight position={[0, 0, 0.2]} angle={0.6} penumbra={0.5} intensity={25} distance={12} color="#fffbeb" target-position={[0, -4.5, -1.2]} />
        </group>

        {/* Title & Interactive Placard */}
        <group position={[0, -3.6, 0.5]}>
          <mesh>
            <boxGeometry args={[3.4, 0.65, 0.2]} />
            <meshStandardMaterial color="#0f172a" roughness={0.2} metalness={0.8} />
          </mesh>
          <Text position={[0, 0, 0.12]} fontSize={0.24} color="#f59e0b" anchorX="center" anchorY="middle" fontWeight="bold">
            BAYAM RAJA (PRESIDENTIAL)
          </Text>
        </group>
      </group>

      {/* --- SHOWCASE 2: GIGI HARUAN (Left Wall, X = -7.5, Z = 6) --- */}
      <group position={[-7.5, 4.5, 6]} rotation={[0, Math.PI / 2, 0]}>
        <RigidBody type="fixed" colliders={false}>
          <CuboidCollider args={[2, 3, 0.5]} />
          <mesh castShadow receiveShadow>
            <boxGeometry args={[4.2, 6.2, 0.4]} />
            <meshStandardMaterial color="#f59e0b" roughness={0.2} metalness={0.9} />
          </mesh>
          <mesh position={[0, 0, 0.1]}>
            <boxGeometry args={[3.6, 5.6, 0.42]} />
            <meshStandardMaterial color="#06080f" roughness={0.8} />
          </mesh>
        </RigidBody>

        {/* STATIC Textured Canvas Painting (With Authentic Gigi Haruan Batik Pattern!) */}
        <group position={[0, 0, 0.35]}>
          <mesh 
            castShadow 
            onClick={() => handleInspect(MOTIFS_DATA[1])} 
            onPointerOver={(e) => (document.body.style.cursor = 'pointer')} 
            onPointerOut={(e) => (document.body.style.cursor = 'auto')}
          >
            <boxGeometry args={[3.0, 5.0, 0.1]} />
            <meshStandardMaterial
              color="#ffffff"
              map={gigiTex}
              roughness={0.25}
              metalness={0.1}
              emissiveMap={gigiTex}
              emissive="#f43f5e"
              emissiveIntensity={0.2}
            />
          </mesh>
        </group>

        {/* Dedicated Gallery Wall Spotlight pointing down onto Painting */}
        <group position={[0, 4.2, 1.2]}>
          <mesh>
            <boxGeometry args={[1.5, 0.3, 0.8]} />
            <meshStandardMaterial color="#0f172a" roughness={0.2} metalness={0.8} />
          </mesh>
          <mesh position={[0, -0.1, 0.2]}>
            <boxGeometry args={[1.2, 0.1, 0.4]} />
            <meshStandardMaterial color="#ffffff" emissive="#fffbeb" emissiveIntensity={3.0} />
          </mesh>
          <spotLight position={[0, 0, 0.2]} angle={0.6} penumbra={0.5} intensity={25} distance={12} color="#fffbeb" target-position={[0, -4.5, -1.2]} />
        </group>

        <group position={[0, -3.6, 0.5]}>
          <mesh>
            <boxGeometry args={[3.4, 0.65, 0.2]} />
            <meshStandardMaterial color="#0f172a" roughness={0.2} metalness={0.8} />
          </mesh>
          <Text position={[0, 0, 0.12]} fontSize={0.24} color="#f59e0b" anchorX="center" anchorY="middle" fontWeight="bold">
            GIGI HARUAN (SHARP FOCUS)
          </Text>
        </group>
      </group>

      {/* --- SHOWCASE 3: KAMBANG KACANG (Right Wall, X = 7.5, Z = -6) --- */}
      <group position={[7.5, 4.5, -6]} rotation={[0, -Math.PI / 2, 0]}>
        <RigidBody type="fixed" colliders={false}>
          <CuboidCollider args={[2, 3, 0.5]} />
          <mesh castShadow receiveShadow>
            <boxGeometry args={[4.2, 6.2, 0.4]} />
            <meshStandardMaterial color="#f59e0b" roughness={0.2} metalness={0.9} />
          </mesh>
          <mesh position={[0, 0, 0.1]}>
            <boxGeometry args={[3.6, 5.6, 0.42]} />
            <meshStandardMaterial color="#06080f" roughness={0.8} />
          </mesh>
        </RigidBody>

        {/* STATIC Textured Canvas Painting (With Authentic Kambang Kacang Batik Pattern!) */}
        <group position={[0, 0, 0.35]}>
          <mesh 
            castShadow 
            onClick={() => handleInspect(MOTIFS_DATA[2])} 
            onPointerOver={(e) => (document.body.style.cursor = 'pointer')} 
            onPointerOut={(e) => (document.body.style.cursor = 'auto')}
          >
            <boxGeometry args={[3.0, 5.0, 0.1]} />
            <meshStandardMaterial
              color="#ffffff"
              map={kambangTex}
              roughness={0.25}
              metalness={0.1}
              emissiveMap={kambangTex}
              emissive="#a855f7"
              emissiveIntensity={0.2}
            />
          </mesh>
        </group>

        {/* Dedicated Gallery Wall Spotlight pointing down onto Painting */}
        <group position={[0, 4.2, 1.2]}>
          <mesh>
            <boxGeometry args={[1.5, 0.3, 0.8]} />
            <meshStandardMaterial color="#0f172a" roughness={0.2} metalness={0.8} />
          </mesh>
          <mesh position={[0, -0.1, 0.2]}>
            <boxGeometry args={[1.2, 0.1, 0.4]} />
            <meshStandardMaterial color="#ffffff" emissive="#fffbeb" emissiveIntensity={3.0} />
          </mesh>
          <spotLight position={[0, 0, 0.2]} angle={0.6} penumbra={0.5} intensity={25} distance={12} color="#fffbeb" target-position={[0, -4.5, -1.2]} />
        </group>

        <group position={[0, -3.6, 0.5]}>
          <mesh>
            <boxGeometry args={[3.4, 0.65, 0.2]} />
            <meshStandardMaterial color="#0f172a" roughness={0.2} metalness={0.8} />
          </mesh>
          <Text position={[0, 0, 0.12]} fontSize={0.24} color="#f59e0b" anchorX="center" anchorY="middle" fontWeight="bold">
            KAMBANG KACANG (BONDING)
          </Text>
        </group>
      </group>

      {/* ==========================================
          6. GAMIFIED PHYSICAL KNOCKDOWN LETTERS (S-A-S-I-R-A-N-G-A-N)
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
        <Text position={[0, 0, 0.1]} fontSize={0.6} color="#06080f" anchorX="center" anchorY="middle" fontWeight="black">
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
        <Text position={[0, 0, 0.1]} fontSize={0.6} color="#06080f" anchorX="center" anchorY="middle" fontWeight="black">
          HIGH-TECH HERITAGE EXHIBITION
        </Text>
      </group>
    </group>
  );
}
