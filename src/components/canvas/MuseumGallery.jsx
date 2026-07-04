import React from 'react';
import { Float, Text, RoundedBox } from '@react-three/drei';
import { RigidBody } from '@react-three/rapier';
import { MOTIFS_DATA } from '../../data/motifsData';
import SasiranganPortal from './SasiranganPortal';
import * as THREE from 'three';

// THE GRAND PRESIDENTIAL GALLERY CORRIDOR (LORONG PANJANG MEWAH):
// 1. Width: 16m (Spacious, majestic, not cramped, but keeps paintings prominent and close on left/right walls!).
// 2. Length: 60m (From South entrance Z=30 down to North Presidential Altar Z=-30).
// 3. ZERO-CRASH RAPIER COLLIDER FIX:
//    Replaced 0-thickness <planeGeometry> with a 1-meter thick <boxGeometry> floor at Y = -0.5!
//    This guarantees Rapier WASM never generates a degenerate NaN bounding box, preventing silent unmounting of the gallery!
export default function MuseumGallery() {
  return (
    <group>
      
      {/* ==========================================
          0. RAPIER PHYSICS FLOOR AT EXACT GROUND ZERO (Y = 0)
         ========================================== */}
      {/* 
          CRITICAL FIX: A 2D planeGeometry has 0 thickness, which causes Rapier WASM to throw degenerate collider exceptions!
          We use a solid boxGeometry of thickness 1.0 at Y = -0.5 so its top surface is exactly at Y = 0!
      */}
      <RigidBody type="fixed" colliders="cuboid" friction={1} restitution={0.1} position={[0, -0.5, 0]}>
        <mesh receiveShadow>
          <boxGeometry args={[20, 1.0, 70]} />
          <meshStandardMaterial color="#f8fafc" roughness={0.18} metalness={0.08} />
        </mesh>
      </RigidBody>

      {/* Subtle architectural floor tile grid sitting exactly on top of the marble floor at Y = 0.01 */}
      <gridHelper args={[70, 35, '#cbd5e1', '#e2e8f0']} position={[0, 0.01, 0]} rotation={[0, Math.PI / 2, 0]} />

      {/* ==========================================
          1. GRAND RED VELVET CARPET RUNNER (Y = 0.02)
         ========================================== */}
      {/* Center Aisle Red Velvet Carpet Runner */}
      <mesh position={[0, 0.02, 0]} receiveShadow>
        <boxGeometry args={[4.8, 0.02, 58]} />
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
          2. GRAND CORRIDOR WALLS & CEILING (16m wide x 60m long x 14m high)
         ========================================== */}
      {/* North End Wall (Presidential Altar where Bayam Raja hangs) */}
      <RigidBody type="fixed" colliders="cuboid">
        <mesh position={[0, 7, -29]} receiveShadow castShadow>
          <boxGeometry args={[17, 14, 1]} />
          <meshStandardMaterial color="#fcf8f2" roughness={0.3} />
        </mesh>
        {/* Obsidian Slate Baseboard */}
        <mesh position={[0, 0.9, -28.45]}>
          <boxGeometry args={[17, 1.8, 0.1]} />
          <meshStandardMaterial color="#0f172a" roughness={0.2} />
        </mesh>
        {/* Gold Wainscoting Trim */}
        <mesh position={[0, 2.9, -28.45]}>
          <boxGeometry args={[17, 0.2, 0.15]} />
          <meshStandardMaterial color="#f59e0b" roughness={0.2} metalness={0.9} />
        </mesh>
      </RigidBody>

      {/* South Entrance Wall (Behind Spawn) */}
      <RigidBody type="fixed" colliders="cuboid">
        <mesh position={[0, 7, 29]} receiveShadow castShadow>
          <boxGeometry args={[17, 14, 1]} />
          <meshStandardMaterial color="#fcf8f2" roughness={0.3} />
        </mesh>
      </RigidBody>

      {/* Left Corridor Wall (Where Gigi Haruan hangs) */}
      <RigidBody type="fixed" colliders="cuboid">
        <mesh position={[-8, 7, 0]} rotation={[0, Math.PI / 2, 0]} receiveShadow castShadow>
          <boxGeometry args={[58, 14, 1]} />
          <meshStandardMaterial color="#fcf8f2" roughness={0.3} />
        </mesh>
        <mesh position={[-7.45, 0.9, 0]} rotation={[0, Math.PI / 2, 0]}>
          <boxGeometry args={[58, 1.8, 0.1]} />
          <meshStandardMaterial color="#0f172a" roughness={0.2} />
        </mesh>
        <mesh position={[-7.45, 2.9, 0]} rotation={[0, Math.PI / 2, 0]}>
          <boxGeometry args={[58, 0.2, 0.15]} />
          <meshStandardMaterial color="#f59e0b" roughness={0.2} metalness={0.9} />
        </mesh>
      </RigidBody>

      {/* Right Corridor Wall (Where Kambang Kacang hangs) */}
      <RigidBody type="fixed" colliders="cuboid">
        <mesh position={[8, 7, 0]} rotation={[0, -Math.PI / 2, 0]} receiveShadow castShadow>
          <boxGeometry args={[58, 14, 1]} />
          <meshStandardMaterial color="#fcf8f2" roughness={0.3} />
        </mesh>
        <mesh position={[7.45, 0.9, 0]} rotation={[0, -Math.PI / 2, 0]}>
          <boxGeometry args={[58, 1.8, 0.1]} />
          <meshStandardMaterial color="#0f172a" roughness={0.2} />
        </mesh>
        <mesh position={[7.45, 2.9, 0]} rotation={[0, -Math.PI / 2, 0]}>
          <boxGeometry args={[58, 0.2, 0.15]} />
          <meshStandardMaterial color="#f59e0b" roughness={0.2} metalness={0.9} />
        </mesh>
      </RigidBody>

      {/* Majestic Corridor Ceiling */}
      <mesh position={[0, 14, 0]} rotation={[Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[16, 58]} />
        <meshStandardMaterial color="#f1f5f9" roughness={0.5} />
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
          3. FLUTED MARBLE COLUMNS & VELVET ROPES
         ========================================== */}
      {/* Fluted Marble Columns along Left Wall (X = -6.5) and Right Wall (X = +6.5) */}
      {[22, 14, 6, -2, -10, -18, -26].map((z, idx) => (
        <React.Fragment key={`col-${idx}`}>
          {/* Left Column */}
          <RigidBody type="fixed" colliders="cuboid" position={[-6.5, 6.5, z]}>
            <mesh receiveShadow castShadow>
              <cylinderGeometry args={[0.6, 0.65, 13, 32]} />
              <meshStandardMaterial color="#ffffff" roughness={0.15} />
            </mesh>
            <mesh position={[0, 6.2, 0]}>
              <boxGeometry args={[1.5, 0.6, 1.5]} />
              <meshStandardMaterial color="#f59e0b" roughness={0.2} metalness={0.8} />
            </mesh>
            <mesh position={[0, -6.2, 0]}>
              <boxGeometry args={[1.6, 0.6, 1.6]} />
              <meshStandardMaterial color="#0f172a" roughness={0.2} />
            </mesh>
          </RigidBody>
          {/* Right Column */}
          <RigidBody type="fixed" colliders="cuboid" position={[6.5, 6.5, z]}>
            <mesh receiveShadow castShadow>
              <cylinderGeometry args={[0.6, 0.65, 13, 32]} />
              <meshStandardMaterial color="#ffffff" roughness={0.15} />
            </mesh>
            <mesh position={[0, 6.2, 0]}>
              <boxGeometry args={[1.5, 0.6, 1.5]} />
              <meshStandardMaterial color="#f59e0b" roughness={0.2} metalness={0.8} />
            </mesh>
            <mesh position={[0, -6.2, 0]}>
              <boxGeometry args={[1.6, 0.6, 1.6]} />
              <meshStandardMaterial color="#0f172a" roughness={0.2} />
            </mesh>
          </RigidBody>
        </React.Fragment>
      ))}

      {/* Velvet Rope Stanchions along Red Carpet Edge */}
      {[26, 22, 18, 14, 10, 6, 2, -2, -6, -10, -14, -18, -22, -26].map((z, idx) => (
        <React.Fragment key={`stanchion-${idx}`}>
          <RigidBody type="fixed" colliders="cuboid" position={[-2.7, 0.5, z]}>
            <mesh castShadow>
              <cylinderGeometry args={[0.07, 0.16, 1.0, 16]} />
              <meshStandardMaterial color="#f59e0b" roughness={0.1} metalness={0.9} />
            </mesh>
            <mesh position={[0, 0.52, 0]}>
              <sphereGeometry args={[0.1, 16, 16]} />
              <meshStandardMaterial color="#f59e0b" roughness={0.1} metalness={0.9} />
            </mesh>
          </RigidBody>
          <RigidBody type="fixed" colliders="cuboid" position={[2.7, 0.5, z]}>
            <mesh castShadow>
              <cylinderGeometry args={[0.07, 0.16, 1.0, 16]} />
              <meshStandardMaterial color="#f59e0b" roughness={0.1} metalness={0.9} />
            </mesh>
            <mesh position={[0, 0.52, 0]}>
              <sphereGeometry args={[0.1, 16, 16]} />
              <meshStandardMaterial color="#f59e0b" roughness={0.1} metalness={0.9} />
            </mesh>
          </RigidBody>
        </React.Fragment>
      ))}

      {/* ==========================================
          4. CRYSTAL CHANDELIERS DOWN THE CORRIDOR
         ========================================== */}
      {[20, 10, 0, -10, -20].map((cz, idx) => (
        <group key={`chan-${idx}`} position={[0, 11.5, cz]}>
          <mesh castShadow>
            <cylinderGeometry args={[1.8, 0.8, 0.6, 16]} />
            <meshStandardMaterial color="#f59e0b" roughness={0.1} metalness={0.9} />
          </mesh>
          <mesh position={[0, -0.5, 0]}>
            <sphereGeometry args={[0.7, 32, 32]} />
            <meshStandardMaterial color="#ffffff" roughness={0.1} metalness={0.1} emissive="#fbbf24" emissiveIntensity={0.8} />
          </mesh>
          <pointLight position={[0, -0.8, 0]} intensity={4.5} distance={24} color="#fbbf24" castShadow />
        </group>
      ))}

      {/* ==========================================
          5. THE 3 WALL-MOUNTED SASIRANGAN MASTERPIECES
         ========================================== */}
      {MOTIFS_DATA.map((motif) => (
        <React.Fragment key={motif.id}>
          <RigidBody type="fixed" colliders="cuboid" position={motif.position}>
            <mesh>
              <boxGeometry args={[3.5, 5, 0.5]} />
              <meshBasicMaterial transparent opacity={0} />
            </mesh>
          </RigidBody>
          <SasiranganPortal motif={motif} />
        </React.Fragment>
      ))}

      {/* ==========================================
          6. ENTRANCE MONUMENT: KNOCKDOWN LETTERS S-A-S-I-R-A-N-G-A-N (Z = 16)
         ========================================== */}
      <group position={[0, 0, 16]}>
        {/* Welcome Pedestal */}
        <RigidBody type="fixed" colliders="cuboid" position={[0, 0.4, 0]}>
          <mesh receiveShadow castShadow>
            <boxGeometry args={[14, 0.8, 1.8]} />
            <meshStandardMaterial color="#0f172a" roughness={0.2} metalness={0.8} />
          </mesh>
          <mesh position={[0, 0.41, 0]}>
            <boxGeometry args={[13.6, 0.05, 1.6]} />
            <meshStandardMaterial color="#f59e0b" roughness={0.2} metalness={0.8} />
          </mesh>
        </RigidBody>

        {/* 10 Dynamic Knockdown Physics Letters */}
        {["S", "A", "S", "I", "R", "A", "N", "G", "A", "N"].map((letter, idx) => {
          const xPos = (idx - 4.5) * 1.3;
          return (
            <RigidBody
              key={`letter-${idx}`}
              type="dynamic"
              colliders="cuboid"
              position={[xPos, 1.8, 0]}
              mass={1.5}
              restitution={0.6}
              friction={0.4}
            >
              <RoundedBox args={[1.0, 1.5, 0.4]} radius={0.1} smoothness={4} castShadow receiveShadow>
                <meshStandardMaterial
                  color={idx % 2 === 0 ? "#f59e0b" : "#06b6d4"}
                  roughness={0.15}
                  metalness={0.7}
                  emissive={idx % 2 === 0 ? "#f59e0b" : "#06b6d4"}
                  emissiveIntensity={0.3}
                />
              </RoundedBox>
              <Text position={[0, 0, 0.21]} fontSize={0.85} color="#0f172a" anchorX="center" anchorY="middle">
                {letter}
              </Text>
            </RigidBody>
          );
        })}

        {/* Interactive Instruction Sign */}
        <Text position={[0, 3.4, 0]} fontSize={0.28} color="#0f172a" outlineWidth={0.01} outlineColor="#ffffff">
          ✦ LORONG UTAMA: TABRAK & LOMPATI HURUF SECARA FISIKA ✦
        </Text>
      </group>

      {/* ==========================================
          7. CULTURAL ARTIFACT SHOWCASES & ROYAL BENCHES
         ========================================== */}
      {/* Showcases at Z = 0 and Z = -14 along Left/Right walls */}
      {[[-5.2, 0], [5.2, -14]].map(([x, z], idx) => (
        <RigidBody key={`showcase-${idx}`} type="fixed" colliders="cuboid" position={[x, 0.6, z]}>
          <mesh receiveShadow castShadow>
            <boxGeometry args={[2.0, 1.2, 2.0]} />
            <meshStandardMaterial color="#0f172a" roughness={0.2} />
          </mesh>
          <mesh position={[0, 0.6, 0]}>
            <boxGeometry args={[1.8, 1.2, 1.8]} />
            <meshStandardMaterial color="#06b6d4" transparent opacity={0.25} roughness={0.1} metalness={0.9} />
          </mesh>
          <Float speed={3} rotationIntensity={2} floatIntensity={0.5} position={[0, 0.8, 0]}>
            <mesh castShadow>
              {idx === 0 ? <dodecahedronGeometry args={[0.4]} /> : <octahedronGeometry args={[0.4]} />}
              <meshStandardMaterial color="#f59e0b" roughness={0.1} metalness={0.9} emissive="#f59e0b" emissiveIntensity={0.4} />
            </mesh>
          </Float>
          <Text position={[0, 1.8, 0]} fontSize={0.2} color="#0f172a">
            {idx === 0 ? "ARTEFAK TENUN TRADISIONAL" : "PRASASTI FILOSOFI WARISAN"}
          </Text>
        </RigidBody>
      ))}

      {/* Royal Benches along walls */}
      {[[-5.2, 10], [5.2, 10], [-5.2, -10], [5.2, -10]].map(([x, z], idx) => (
        <RigidBody key={`bench-${idx}`} type="fixed" colliders="cuboid" position={[x, 0.3, z]}>
          <mesh receiveShadow castShadow>
            <boxGeometry args={[2.5, 0.6, 1.0]} />
            <meshStandardMaterial color="#1e293b" roughness={0.5} />
          </mesh>
        </RigidBody>
      ))}

    </group>
  );
}
