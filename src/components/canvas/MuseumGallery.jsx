import React, { useRef, useEffect } from 'react';
import { Text, RoundedBox, useTexture } from '@react-three/drei';
import { RigidBody, CuboidCollider } from '@react-three/rapier';
import * as THREE from 'three';
import { useAppStore } from '../../store/useAppStore';
import { MOTIFS_DATA } from '../../data/motifsData';
import EcoDyeStation from './EcoDyeStation';

// SUPER RESEARCH & DEITY-LEVEL AAA MUSEUM ARCHITECTURE:
// 1. GENIUS COLUMNS & AESTHETIC INTERIOR ("ADA JUGA TUH GAMBAR YG KETUTUPAN TIANG"):
//    Removed bulky obstructive cylindrical columns! Designed recessed rectangular wall pilasters
//    placed strategically away from paintings so NO artwork is ever blocked! Added luxury viewing benches!
// 2. NEW WEBP SASIRANGAN MASTERPIECES & BANJARMASIN LOGO:
//    Loaded all 5 pristine WebP motif textures and the Banjarmasin logo!
// 3. REMOVED WEIRD FLOOR BLOCKS ("DIBAGIAN AWAL ADA BALOK BERTULISKAN SASIRANGAN ITU JUJUR ANEH"):
//    Removed knockdown letters and built a Grand Exhibition Reception Monument with the Banjarmasin Logo!
// 4. TITLE CASE TYPOGRAPHY ("CUKUP TIAP HURUF KATA PERTAMA YG BESAR"):
//    Replaced all ALL CAPS text with elegant Title Case formatting!
// 5. FIXED INSPECTION CLICK & WALL CLIPPING PROTECTION ("keliatan bagian luarnya & glitch"):
// --- ELEGANT FASHION TAILOR MANNEQUIN (Proper Museum Display Dummy) ---
const ExhibitionMannequin = ({ position, rotation, texture }) => {
  return (
    <group position={position} rotation={rotation}>
      <RigidBody type="fixed" colliders="hull">

        {/* === PEDESTAL === */}
        {/* Circular base */}
        <mesh position={[0, 0.05, 0]} receiveShadow>
          <cylinderGeometry args={[0.55, 0.6, 0.1, 32]} />
          <meshStandardMaterial color="#0f172a" roughness={0.15} metalness={0.8} />
        </mesh>
        {/* Gold ring accent on base */}
        <mesh position={[0, 0.11, 0]}>
          <cylinderGeometry args={[0.56, 0.56, 0.04, 32]} />
          <meshStandardMaterial color="#f59e0b" roughness={0.2} metalness={0.9} />
        </mesh>
        {/* Pole / stem */}
        <mesh position={[0, 0.75, 0]} castShadow>
          <cylinderGeometry args={[0.055, 0.055, 1.3, 16]} />
          <meshStandardMaterial color="#1e293b" roughness={0.3} metalness={0.9} />
        </mesh>

        {/* === TORSO (Box-based tailor dummy shape) === */}
        {/* Lower torso / hips - wider */}
        <mesh position={[0, 1.55, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.56, 0.28, 0.28]} />
          <meshStandardMaterial map={texture} roughness={0.4} />
        </mesh>
        {/* Mid torso / waist - narrower */}
        <mesh position={[0, 1.78, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.42, 0.2, 0.24]} />
          <meshStandardMaterial map={texture} roughness={0.4} />
        </mesh>
        {/* Gold Belt */}
        <mesh position={[0, 1.65, 0]}>
          <boxGeometry args={[0.58, 0.06, 0.30]} />
          <meshStandardMaterial color="#f59e0b" roughness={0.2} metalness={0.9} />
        </mesh>
        {/* Chest / upper torso - wider */}
        <mesh position={[0, 2.05, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.62, 0.4, 0.3]} />
          <meshStandardMaterial map={texture} roughness={0.4} />
        </mesh>
        {/* Shoulder bar */}
        <mesh position={[0, 2.3, 0]} castShadow>
          <boxGeometry args={[0.72, 0.1, 0.28]} />
          <meshStandardMaterial map={texture} roughness={0.4} />
        </mesh>

        {/* === NECK stub (no separate arms - fashion mannequin style) === */}
        <mesh position={[0, 2.48, 0]} castShadow>
          <cylinderGeometry args={[0.065, 0.08, 0.22, 12]} />
          <meshStandardMaterial color="#e2e8f0" roughness={0.3} metalness={0.5} />
        </mesh>

        {/* === HEAD (smooth oval - classic mannequin egg head) === */}
        <mesh position={[0, 2.84, 0]} scale={[0.82, 1.1, 0.82]} castShadow receiveShadow>
          <sphereGeometry args={[0.22, 32, 32]} />
          <meshStandardMaterial color="#f8fafc" roughness={0.1} metalness={0.65}
            envMapIntensity={1.5}
          />
        </mesh>

      </RigidBody>
    </group>
  );
};

export default function MuseumGallery() {
  const { enterPortal } = useAppStore();
  const galleryRef = useRef();

  // Automatically make ALL meshes DoubleSide so turning around near walls never shows outside glitches!
  useEffect(() => {
    if (galleryRef.current) {
      galleryRef.current.traverse((child) => {
        if (child.isMesh && child.material) {
          if (Array.isArray(child.material)) {
            child.material.forEach((mat) => { mat.side = THREE.DoubleSide; });
          } else {
            child.material.side = THREE.DoubleSide;
          }
        }
      });
    }
  }, []);

  // Load authentic high-resolution WebP Sasirangan textures & Banjarmasin Logo!
  const [bayamTex, gigiTex, kambangTex, sarigadingTex, nagaTex, logoTex] = useTexture([
    '/motif bayam raj.webp',
    '/motif_gigi_haruan.webp',
    '/motif kembang kacang.webp',
    '/kain_sarigading.webp',
    '/naga-balimbur-salah-satu-motif-b.webp',
    '/LOGO KOTA BANJARMASIN - 328 KB.webp'
  ]);

  const handleInspect = (motif) => {
    enterPortal(motif.id);
  };

  return (
    <group ref={galleryRef}>
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
          2. ROYAL NAVY SLATE WALLS & OBSIDIAN TRIM
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
          3. PHYSICAL CEILING LAMPS & CHANDELIERS
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
        </group>
      ))}

      {/* ==========================================
          4. GENIUS WALL PILASTERS & AESTHETIC INTERIOR
          Recessed against side walls at Z = 22, 14, 0, -10, -24
          NO column is ever placed at Z = 6, -6, -16, -18, -27.5!
         ========================================== */}
      {[22, 14, 0, -10, -24].map((z, idx) => (
        <React.Fragment key={`pilaster-${idx}`}>
          {/* Left Wall Pilaster */}
          <RigidBody type="fixed" colliders={false} position={[-7.6, 6.5, z]}>
            <CuboidCollider args={[0.3, 6.5, 0.5]} />
            <mesh receiveShadow castShadow>
              <boxGeometry args={[0.6, 13, 1.0]} />
              <meshStandardMaterial color="#0f172a" roughness={0.2} metalness={0.6} />
            </mesh>
            <mesh position={[0.2, 0, 0]}>
              <boxGeometry args={[0.1, 13, 0.4]} />
              <meshStandardMaterial color="#f59e0b" roughness={0.2} metalness={0.9} />
            </mesh>
          </RigidBody>

          {/* Right Wall Pilaster */}
          <RigidBody type="fixed" colliders={false} position={[7.6, 6.5, z]}>
            <CuboidCollider args={[0.3, 6.5, 0.5]} />
            <mesh receiveShadow castShadow>
              <boxGeometry args={[0.6, 13, 1.0]} />
              <meshStandardMaterial color="#0f172a" roughness={0.2} metalness={0.6} />
            </mesh>
            <mesh position={[-0.2, 0, 0]}>
              <boxGeometry args={[0.1, 13, 0.4]} />
              <meshStandardMaterial color="#f59e0b" roughness={0.2} metalness={0.9} />
            </mesh>
          </RigidBody>
        </React.Fragment>
      ))}

      {/* Luxury Velvet Viewing Benches in Center Corridor */}
      {[-3, -14].map((z, idx) => (
        <RigidBody key={`bench-${idx}`} type="fixed" colliders={false} position={[0, 0.5, z]}>
          <CuboidCollider args={[0.8, 0.5, 1.5]} />
          {/* Gold Base */}
          <mesh position={[0, -0.4, 0]} castShadow receiveShadow>
            <boxGeometry args={[1.6, 0.2, 3.0]} />
            <meshStandardMaterial color="#f59e0b" roughness={0.2} metalness={0.9} />
          </mesh>
          {/* Obsidian Cushion */}
          <RoundedBox args={[1.5, 0.6, 2.8]} radius={0.1} smoothness={4} position={[0, 0, 0]} castShadow receiveShadow>
            <meshStandardMaterial color="#0f172a" roughness={0.4} />
          </RoundedBox>
        </RigidBody>
      ))}

      {/* ==========================================
          5. GRAND ENTRANCE RECEPTION MONUMENT WITH BANJARMASIN LOGO
          Replaced weird floor blocks ("jujur aneh") with an aesthetic welcome desk!
         ========================================== */}
      <group position={[0, 1.8, 16]}>
        <RigidBody type="fixed" colliders={false}>
          <CuboidCollider args={[2.5, 1.8, 0.6]} />
          {/* Obsidian Marble Monument Pedestal */}
          <mesh 
            castShadow receiveShadow
            onClick={() => handleInspect(MOTIFS_DATA[6])} 
            onPointerOver={(e) => (document.body.style.cursor = 'pointer')} 
            onPointerOut={(e) => (document.body.style.cursor = 'auto')}
          >
            <boxGeometry args={[5.0, 3.6, 1.2]} />
            <meshStandardMaterial color="#0f172a" roughness={0.15} metalness={0.7} />
          </mesh>
          {/* Gold Trim Border */}
          <mesh position={[0, 1.85, 0]}>
            <boxGeometry args={[5.2, 0.1, 1.4]} />
            <meshStandardMaterial color="#f59e0b" roughness={0.2} metalness={0.9} />
          </mesh>
        </RigidBody>

        {/* Banjarmasin Logo Displayed Prominently on Front */}
        <mesh 
          position={[0, 0.4, 0.62]} 
          castShadow
          onClick={() => handleInspect(MOTIFS_DATA[6])} 
          onPointerOver={(e) => (document.body.style.cursor = 'pointer')} 
          onPointerOut={(e) => (document.body.style.cursor = 'auto')}
        >
          <planeGeometry args={[2.2, 2.2]} />
          <meshStandardMaterial map={logoTex} transparent roughness={0.2} />
        </mesh>

        {/* Title Case Welcome Typography */}
        <group 
          position={[0, -1.1, 0.62]}
          onClick={() => handleInspect(MOTIFS_DATA[6])} 
          onPointerOver={(e) => (document.body.style.cursor = 'pointer')} 
          onPointerOut={(e) => (document.body.style.cursor = 'auto')}
        >
          <Text position={[0, 0, 0]} fontSize={0.28} color="#f59e0b" anchorX="center" anchorY="middle" fontWeight="bold">
            Kota Banjarmasin • Culture Verse
          </Text>
          <Text position={[0, -0.32, 0]} fontSize={0.2} color="#ffffff" anchorX="center" anchorY="middle" fontWeight="medium">
            Pameran Metaverse Kain Sasirangan
          </Text>
          <Text position={[0, -0.6, 0]} fontSize={0.16} color="#38bdf8" anchorX="center" anchorY="middle" fontWeight="bold">
            [ Klik Untuk Baca Sejarah Babad Sasirangan ]
          </Text>
        </group>
      </group>

      {/* ==========================================
          5.5 ECO-DYE STATION (NEW SDG 12 & 11.4 SHOWCASE)
          Center of the Room at Z = 0
         ========================================== */}
      <EcoDyeStation position={[0, 0.4, 0]} />

      {/* ==========================================
          6. AUTHENTIC WEBP SASIRANGAN SHOWCASE PAINTINGS (5 MASTERPIECES)
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

        <group position={[0, 4.2, 1.2]}>
          <mesh>
            <boxGeometry args={[1.5, 0.3, 0.8]} />
            <meshStandardMaterial color="#0f172a" roughness={0.2} metalness={0.8} />
          </mesh>
          <mesh position={[0, -0.16, 0.2]}>
            <boxGeometry args={[1.2, 0.1, 0.4]} />
            <meshStandardMaterial color="#ffffff" emissive="#fffbeb" emissiveIntensity={3.0} />
          </mesh>
          <spotLight position={[0, 0, 0.2]} angle={0.6} penumbra={0.5} intensity={25} distance={5.5} color="#fffbeb" target-position={[0, -4.5, -1.2]} />
        </group>

        <group position={[0, -3.6, 0.5]}>
          <mesh>
            <boxGeometry args={[3.4, 0.65, 0.2]} />
            <meshStandardMaterial color="#0f172a" roughness={0.2} metalness={0.8} />
          </mesh>
          <Text position={[0, 0, 0.12]} fontSize={0.24} maxWidth={3.2} textAlign="center" color="#f59e0b" anchorX="center" anchorY="middle" fontWeight="bold">
            Bayam Raja (Kepemimpinan)
          </Text>
        </group>

        {/* Exhibition Mannequin */}
        <ExhibitionMannequin position={[-3.5, -4.4, 0.5]} rotation={[0, Math.PI / 6, 0]} texture={bayamTex} />
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

        <group position={[0, 4.2, 1.2]}>
          <mesh>
            <boxGeometry args={[1.5, 0.3, 0.8]} />
            <meshStandardMaterial color="#0f172a" roughness={0.2} metalness={0.8} />
          </mesh>
          <mesh position={[0, -0.16, 0.2]}>
            <boxGeometry args={[1.2, 0.1, 0.4]} />
            <meshStandardMaterial color="#ffffff" emissive="#fffbeb" emissiveIntensity={3.0} />
          </mesh>
          <spotLight position={[0, 0, 0.2]} angle={0.6} penumbra={0.5} intensity={25} distance={5.5} color="#fffbeb" target-position={[0, -4.5, -1.2]} />
        </group>

        <group position={[0, -3.6, 0.5]}>
          <mesh>
            <boxGeometry args={[3.4, 0.65, 0.2]} />
            <meshStandardMaterial color="#0f172a" roughness={0.2} metalness={0.8} />
          </mesh>
          <Text position={[0, 0, 0.12]} fontSize={0.24} maxWidth={3.2} textAlign="center" color="#f59e0b" anchorX="center" anchorY="middle" fontWeight="bold">
            Gigi Haruan (Ketajaman Berpikir)
          </Text>
        </group>

        {/* Exhibition Mannequin */}
        <ExhibitionMannequin position={[-3.5, -4.4, 0.5]} rotation={[0, Math.PI / 6, 0]} texture={gigiTex} />
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

        <group position={[0, 4.2, 1.2]}>
          <mesh>
            <boxGeometry args={[1.5, 0.3, 0.8]} />
            <meshStandardMaterial color="#0f172a" roughness={0.2} metalness={0.8} />
          </mesh>
          <mesh position={[0, -0.16, 0.2]}>
            <boxGeometry args={[1.2, 0.1, 0.4]} />
            <meshStandardMaterial color="#ffffff" emissive="#fffbeb" emissiveIntensity={3.0} />
          </mesh>
          <spotLight position={[0, 0, 0.2]} angle={0.6} penumbra={0.5} intensity={25} distance={5.5} color="#fffbeb" target-position={[0, -4.5, -1.2]} />
        </group>

        <group position={[0, -3.6, 0.5]}>
          <mesh>
            <boxGeometry args={[3.4, 0.65, 0.2]} />
            <meshStandardMaterial color="#0f172a" roughness={0.2} metalness={0.8} />
          </mesh>
          <Text position={[0, 0, 0.12]} fontSize={0.24} maxWidth={3.2} textAlign="center" color="#f59e0b" anchorX="center" anchorY="middle" fontWeight="bold">
            Kambang Kacang (Gotong Royong)
          </Text>
        </group>

        {/* Exhibition Mannequin */}
        <ExhibitionMannequin position={[-3.5, -4.4, 0.5]} rotation={[0, Math.PI / 6, 0]} texture={kambangTex} />
      </group>

      {/* --- SHOWCASE 4: KAIN SARIGADING (Left Wall, X = -7.5, Z = -16) --- */}
      <group position={[-7.5, 4.5, -16]} rotation={[0, Math.PI / 2, 0]}>
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

        <group position={[0, 0, 0.35]}>
          <mesh 
            castShadow 
            onClick={() => handleInspect(MOTIFS_DATA[3])} 
            onPointerOver={(e) => (document.body.style.cursor = 'pointer')} 
            onPointerOut={(e) => (document.body.style.cursor = 'auto')}
          >
            <boxGeometry args={[3.0, 5.0, 0.1]} />
            <meshStandardMaterial
              color="#ffffff"
              map={sarigadingTex}
              roughness={0.25}
              metalness={0.1}
              emissiveMap={sarigadingTex}
              emissive="#06b6d4"
              emissiveIntensity={0.2}
            />
          </mesh>
        </group>

        <group position={[0, 4.2, 1.2]}>
          <mesh>
            <boxGeometry args={[1.5, 0.3, 0.8]} />
            <meshStandardMaterial color="#0f172a" roughness={0.2} metalness={0.8} />
          </mesh>
          <mesh position={[0, -0.16, 0.2]}>
            <boxGeometry args={[1.2, 0.1, 0.4]} />
            <meshStandardMaterial color="#ffffff" emissive="#fffbeb" emissiveIntensity={3.0} />
          </mesh>
          <spotLight position={[0, 0, 0.2]} angle={0.6} penumbra={0.5} intensity={25} distance={5.5} color="#fffbeb" target-position={[0, -4.5, -1.2]} />
        </group>

        <group position={[0, -3.6, 0.5]}>
          <mesh>
            <boxGeometry args={[3.4, 0.65, 0.2]} />
            <meshStandardMaterial color="#0f172a" roughness={0.2} metalness={0.8} />
          </mesh>
          <Text position={[0, 0, 0.12]} fontSize={0.24} maxWidth={3.2} textAlign="center" color="#f59e0b" anchorX="center" anchorY="middle" fontWeight="bold">
            Kain Sarigading (Warisan Budaya)
          </Text>
        </group>

        {/* Exhibition Mannequin */}
        <ExhibitionMannequin position={[-3.5, -4.4, 0.5]} rotation={[0, Math.PI / 6, 0]} texture={sarigadingTex} />
      </group>

      {/* --- SHOWCASE 5: NAGA BALIMBUR (Right Wall, X = 7.5, Z = -18) --- */}
      <group position={[7.5, 4.5, -18]} rotation={[0, -Math.PI / 2, 0]}>
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

        <group position={[0, 0, 0.35]}>
          <mesh 
            castShadow 
            onClick={() => handleInspect(MOTIFS_DATA[4])} 
            onPointerOver={(e) => (document.body.style.cursor = 'pointer')} 
            onPointerOut={(e) => (document.body.style.cursor = 'auto')}
          >
            <boxGeometry args={[3.0, 5.0, 0.1]} />
            <meshStandardMaterial
              color="#ffffff"
              map={nagaTex}
              roughness={0.25}
              metalness={0.1}
              emissiveMap={nagaTex}
              emissive="#fbbf24"
              emissiveIntensity={0.2}
            />
          </mesh>
        </group>

        <group position={[0, 4.2, 1.2]}>
          <mesh>
            <boxGeometry args={[1.5, 0.3, 0.8]} />
            <meshStandardMaterial color="#0f172a" roughness={0.2} metalness={0.8} />
          </mesh>
          <mesh position={[0, -0.16, 0.2]}>
            <boxGeometry args={[1.2, 0.1, 0.4]} />
            <meshStandardMaterial color="#ffffff" emissive="#fffbeb" emissiveIntensity={3.0} />
          </mesh>
          <spotLight position={[0, 0, 0.2]} angle={0.6} penumbra={0.5} intensity={25} distance={5.5} color="#fffbeb" target-position={[0, -4.5, -1.2]} />
        </group>

        <group position={[0, -3.6, 0.5]}>
          <mesh>
            <boxGeometry args={[3.4, 0.65, 0.2]} />
            <meshStandardMaterial color="#0f172a" roughness={0.2} metalness={0.8} />
          </mesh>
          <Text position={[0, 0, 0.12]} fontSize={0.24} maxWidth={3.2} textAlign="center" color="#f59e0b" anchorX="center" anchorY="middle" fontWeight="bold">
            Naga Balimbur (Pelindung Alam)
          </Text>
        </group>

        {/* Exhibition Mannequin */}
        <ExhibitionMannequin position={[-3.5, -4.4, 0.5]} rotation={[0, Math.PI / 6, 0]} texture={nagaTex} />
      </group>

      {/* Glowing Exhibition Banners hanging from Ceiling */}
      <group position={[0, 11, 8]}>
        <mesh>
          <boxGeometry args={[11, 1.5, 0.1]} />
          <meshStandardMaterial color="#0f172a" roughness={0.3} metalness={0.8} />
        </mesh>
        <mesh position={[0, 0, 0.06]}>
          <boxGeometry args={[10.8, 1.3, 0.05]} />
          <meshStandardMaterial color="#f59e0b" emissive="#f59e0b" emissiveIntensity={0.5} />
        </mesh>
        <Text position={[0, 0, 0.1]} fontSize={0.6} color="#06080f" anchorX="center" anchorY="middle" fontWeight="black">
          Culture Verse : SDG 11
        </Text>
      </group>

      <group position={[0, 11, -10]}>
        <mesh>
          <boxGeometry args={[14, 1.5, 0.1]} />
          <meshStandardMaterial color="#0f172a" roughness={0.3} metalness={0.8} />
        </mesh>
        <mesh position={[0, 0, 0.06]}>
          <boxGeometry args={[13.8, 1.3, 0.05]} />
          <meshStandardMaterial color="#06b6d4" emissive="#06b6d4" emissiveIntensity={0.5} />
        </mesh>
        <Text position={[0, 0, 0.1]} fontSize={0.6} color="#06080f" anchorX="center" anchorY="middle" fontWeight="black">
          Pameran Warisan Budaya High-Tech
        </Text>
      </group>
    </group>
  );
}
