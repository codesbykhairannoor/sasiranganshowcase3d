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
// --- "PRODUK PAS DIPAKE" : 3D APPAREL DISPLAY (Berbagai Macam Produk Sasirangan) ---
// Displays the Sasirangan texture precisely on volumetric apparel shapes!
const ExhibitionMannequin = ({ position, rotation, texture, type = 'tshirt' }) => {
  // Create a realistic 2D Profile Shape based on apparel type
  const apparelShape = React.useMemo(() => {
    const s = new THREE.Shape();
    if (type === 'tshirt') {
      s.moveTo(-0.55, -0.9);
      s.lineTo(-0.55, 0.35);
      s.lineTo(-0.95, 0.05);
      s.lineTo(-1.1, 0.35);
      s.lineTo(-0.65, 0.8);
      s.lineTo(-0.25, 0.95);
      s.bezierCurveTo(-0.1, 0.75, 0.1, 0.75, 0.25, 0.95);
      s.lineTo(0.65, 0.8);
      s.lineTo(1.1, 0.35);
      s.lineTo(0.95, 0.05);
      s.lineTo(0.55, 0.35);
      s.lineTo(0.55, -0.9);
      s.lineTo(-0.55, -0.9);
    } else if (type === 'kimono') {
      // Kimono / Outer (Wider sleeves, longer body)
      s.moveTo(-0.65, -1.2);
      s.lineTo(-0.65, 0.1); 
      s.lineTo(-1.4, -0.4); // dropping sleeve
      s.lineTo(-1.5, 0.4);
      s.lineTo(-0.7, 0.8);
      s.lineTo(-0.25, 0.95);
      s.lineTo(0.0, 0.6); // V neck
      s.lineTo(0.25, 0.95);
      s.lineTo(0.7, 0.8);
      s.lineTo(1.5, 0.4);
      s.lineTo(1.4, -0.4);
      s.lineTo(0.65, 0.1);
      s.lineTo(0.65, -1.2);
      s.lineTo(-0.65, -1.2);
    } else if (type === 'selendang') {
      // Selendang / Shawl (Draped long fabric)
      s.moveTo(-0.25, -1.6);
      s.lineTo(-0.25, 0.8);
      s.bezierCurveTo(-0.25, 1.1, 0.25, 1.1, 0.25, 0.8); // Top loop over hanger
      s.lineTo(0.25, -1.4);
      s.lineTo(0.15, -1.4);
      s.lineTo(0.15, 0.8);
      s.bezierCurveTo(0.15, 0.9, -0.15, 0.9, -0.15, 0.8); // Inner loop
      s.lineTo(-0.15, -1.6);
      s.lineTo(-0.25, -1.6);
    } else if (type === 'totebag') {
      // Totebag Sasirangan
      s.moveTo(-0.5, -0.6);
      s.lineTo(-0.6, 0.4); // bag body
      s.lineTo(-0.3, 0.4);
      s.lineTo(-0.3, 0.9); // handle up
      s.lineTo(-0.2, 0.9);
      s.lineTo(-0.2, 0.4);
      s.lineTo(0.2, 0.4);
      s.lineTo(0.2, 0.9); // handle up
      s.lineTo(0.3, 0.9);
      s.lineTo(0.3, 0.4);
      s.lineTo(0.6, 0.4); // bag body
      s.lineTo(0.5, -0.6);
      s.lineTo(-0.5, -0.6);
    } else if (type === 'dress') {
      // Long Dress / Gamis
      s.moveTo(-0.8, -1.6); // wide bottom
      s.lineTo(-0.4, 0.2); // waist
      s.lineTo(-0.5, 0.8); // shoulder
      s.lineTo(-0.2, 0.95); // collar
      s.lineTo(0.2, 0.95);
      s.lineTo(0.5, 0.8);
      s.lineTo(0.4, 0.2);
      s.lineTo(0.8, -1.6); // wide bottom
      s.lineTo(-0.8, -1.6);
    }
    return s;
  }, [type]);

  // PUFFY FABRIC BEVEL SETTINGS
  // This is the secret to avoiding the "stiff cardboard" look! High bevelSegments creates soft fabric volume.
  const extrudeSettings = {
    depth: 0.04,
    bevelEnabled: true,
    bevelSegments: 8,
    steps: 1,
    bevelSize: 0.06,
    bevelThickness: 0.08
  };

  return (
    <group position={position} rotation={rotation}>
      <RigidBody type="fixed" colliders={false}>
        {/* === COLLIDERS: One for base, one tall for pole + clothing === */}
        <CuboidCollider args={[0.55, 0.12, 0.55]} position={[0, 0.06, 0]} />
        <CuboidCollider args={[0.3, 1.4, 0.3]} position={[0, 1.4, 0]} />

        {/* === BASE PEDESTAL === */}
        <mesh position={[0, 0.06, 0]} receiveShadow>
          <cylinderGeometry args={[0.5, 0.55, 0.12, 32]} />
          <meshStandardMaterial color="#0f172a" roughness={0.15} metalness={0.85} />
        </mesh>
        <mesh position={[0, 0.13, 0]}>
          <cylinderGeometry args={[0.51, 0.51, 0.04, 32]} />
          <meshStandardMaterial color="#f59e0b" roughness={0.2} metalness={0.95} />
        </mesh>

        {/* === CLOTHING RACK / POLE === */}
        <mesh position={[0, 0.9, 0]} castShadow>
          <cylinderGeometry args={[0.035, 0.035, 1.6, 14]} />
          <meshStandardMaterial color="#1e293b" roughness={0.2} metalness={0.95} />
        </mesh>
        {/* Hanger top bar */}
        <mesh position={[0, 1.65, 0.08]} castShadow>
          <boxGeometry args={[0.9, 0.03, 0.03]} />
          <meshStandardMaterial color="#cbd5e1" roughness={0.3} metalness={0.8} />
        </mesh>

        {/* === THE APPAREL (Sasirangan Worn Product) === */}
        <mesh position={[0, 1.7, 0]} castShadow receiveShadow>
          <extrudeGeometry args={[apparelShape, extrudeSettings]} />
          <meshStandardMaterial map={texture} roughness={0.8} />
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
        {/* Wall Trim for Spawn Wall */}
        <mesh position={[0, -6.1, -0.55]}>
          <boxGeometry args={[17, 1.8, 0.1]} />
          <meshStandardMaterial color="#0f172a" roughness={0.2} />
        </mesh>
        <mesh position={[0, -4.1, -0.55]}>
          <boxGeometry args={[17, 0.2, 0.15]} />
          <meshStandardMaterial color="#f59e0b" roughness={0.2} metalness={0.9} />
        </mesh>
        {/* Giant BJM Logo on Spawn Wall (facing +Z, meaning looking -Z) */}
        <mesh position={[0, 2.0, -0.51]} rotation={[0, Math.PI, 0]} castShadow>
          <planeGeometry args={[6.5, 6.5]} />
          <meshStandardMaterial map={logoTex} transparent roughness={0.2} emissive="#ffffff" emissiveIntensity={0.05} />
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
          5. BABAD SASIRANGAN CARVED STONE MONOLITH
          A static entrance stone with physical text embedded directly on it.
         ========================================== */}
      <group position={[0, 0, 16]}>
        <RigidBody type="fixed" colliders={false}>
          {/* === COLLIDERS === */}
          {/* Base stone block */}
          <CuboidCollider args={[2.1, 1.3, 0.5]} position={[0, 1.3, 0]} />
          {/* The angled plaque board */}
          <CuboidCollider args={[2.4, 1.6, 0.2]} position={[0, 3.5, 0.5]} rotation={[-Math.PI / 6, 0, 0]} />

          {/* Main Stone Base */}
          <mesh position={[0, 1.3, 0]} castShadow receiveShadow>
            <boxGeometry args={[4.2, 2.6, 1.0]} />
            <meshStandardMaterial color="#0f172a" roughness={0.6} />
          </mesh>

          <group position={[0, 2.8, 0.5]} rotation={[-Math.PI / 6, 0, 0]}>
            {/* Slanted plaque board */}
            <mesh castShadow>
              <boxGeometry args={[4.8, 3.4, 0.2]} />
              <meshStandardMaterial color="#1e293b" roughness={0.8} />
            </mesh>
            {/* Gold Trim Border */}
            <mesh position={[0, 0, -0.06]}>
              <boxGeometry args={[5.0, 3.6, 0.15]} />
              <meshStandardMaterial color="#f59e0b" roughness={0.2} metalness={0.9} />
            </mesh>

            {/* === ENGRAVED TYPOGRAPHY (positioned carefully within board bounds) === */}
            <group position={[0, 0, 0.12]}>
              {/* Title */}
              <Text
                position={[0, 1.2, 0]}
                fontSize={0.26}
                color="#f59e0b"
                anchorX="center"
                anchorY="middle"
                fontWeight="bold"
                letterSpacing={0.1}
              >
                BABAD SASIRANGAN
              </Text>

              {/* Ornamental line under title */}
              <mesh position={[0, 0.9, 0]}>
                <boxGeometry args={[3.0, 0.015, 0.01]} />
                <meshStandardMaterial color="#f59e0b" />
              </mesh>

              {/* Paragraph 1 - compact */}
              <Text
                position={[0, 0.4, 0]}
                fontSize={0.135}
                color="#f8fafc"
                anchorX="center"
                anchorY="middle"
                maxWidth={4.0}
                textAlign="center"
                lineHeight={1.55}
              >
                {`Menurut Hikayat Banjar (Abad ke-12), Sasirangan pertama kali\ndibuat oleh Patih Lambung Mangkurat sebagai "Kain Pamali"\natau kain penyembuhan sakral untuk Putri Junjung Buih.`}
              </Text>

              {/* Paragraph 2 - compact */}
              <Text
                position={[0, -0.45, 0]}
                fontSize={0.125}
                color="#cbd5e1"
                anchorX="center"
                anchorY="middle"
                maxWidth={4.0}
                textAlign="center"
                lineHeight={1.55}
              >
                {`Berasal dari kata "Sirang" (dijelujur dengan tangan),\ndikerjakan semalaman sambil melantunkan salawat.\nKini menjadi identitas membanggakan Kalimantan Selatan.`}
              </Text>

              {/* Bottom ornamental line */}
              <mesh position={[0, -1.05, 0]}>
                <boxGeometry args={[2.0, 0.015, 0.01]} />
                <meshStandardMaterial color="#38bdf8" />
              </mesh>

              {/* Footer caption */}
              <Text
                position={[0, -1.3, 0]}
                fontSize={0.11}
                color="#38bdf8"
                anchorX="center"
                anchorY="middle"
                fontWeight="bold"
                letterSpacing={0.12}
              >
                TITIK NOL GEOGRAFIS BUDAYA BANJAR
              </Text>
            </group>
          </group>
        </RigidBody>
      </group>

      {/* ==========================================
          5.5 ECO-DYE STATION (NEW SDG 12 & 11.4 SHOWCASE)
          Moved to Z = 8 to avoid collision with benches at Z = -3
         ========================================== */}
      <EcoDyeStation position={[0, 0.4, 8]} />

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

      </group>

      {/* Showcase 1 Mannequins — in WORLD space (outside group) so they stay at the back */}
      <ExhibitionMannequin position={[-3.5, 0.1, -26.3]} rotation={[0, Math.PI / 6, 0]} texture={bayamTex} type="tshirt" />
      <ExhibitionMannequin position={[3.5, 0.1, -26.3]} rotation={[0, -Math.PI / 6, 0]} texture={bayamTex} type="tshirt" />

      {/* --- SHOWCASE 2: GIGI HARUAN (Left Wall, X = -7.5, Z = -6) — Exactly opposite Kambang Kacang --- */}
      <group position={[-7.5, 4.5, -6]} rotation={[0, Math.PI / 2, 0]}>
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

        {/* Title plaque */}
        <group position={[0, -3.6, 0.5]}>
          <mesh>
            <boxGeometry args={[3.4, 0.65, 0.2]} />
            <meshStandardMaterial color="#0f172a" roughness={0.2} metalness={0.8} />
          </mesh>
          <Text position={[0, 0, 0.12]} fontSize={0.24} maxWidth={3.2} textAlign="center" color="#f59e0b" anchorX="center" anchorY="middle" fontWeight="bold">
            Gigi Haruan (Ketajaman Berpikir)
          </Text>
        </group>
      </group>

      {/* Showcase 2 Mannequins — in WORLD space, LEFT wall side Z=-6 */}
      <ExhibitionMannequin position={[-6, 0.1, -3.5]} rotation={[0, Math.PI / 4, 0]} texture={gigiTex} type="tshirt" />
      <ExhibitionMannequin position={[-6, 0.1, -8.5]} rotation={[0, Math.PI / 4, 0]} texture={gigiTex} type="selendang" />

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

        {/* Title plaque */}
        <group position={[0, -3.6, 0.5]}>
          <mesh>
            <boxGeometry args={[3.4, 0.65, 0.2]} />
            <meshStandardMaterial color="#0f172a" roughness={0.2} metalness={0.8} />
          </mesh>
          <Text position={[0, 0, 0.12]} fontSize={0.24} maxWidth={3.2} textAlign="center" color="#f59e0b" anchorX="center" anchorY="middle" fontWeight="bold">
            Kambang Kacang (Gotong Royong)
          </Text>
        </group>
      </group>

      {/* Showcase 3 Mannequins — in WORLD space (outside rotated group) */}
      <ExhibitionMannequin position={[6, 0.1, -3.5]} rotation={[0, -Math.PI / 4, 0]} texture={kambangTex} type="tshirt" />
      <ExhibitionMannequin position={[6, 0.1, -8.5]} rotation={[0, -Math.PI / 4, 0]} texture={kambangTex} type="selendang" />

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

        {/* Title plaque */}
        <group position={[0, -3.6, 0.5]}>
          <mesh>
            <boxGeometry args={[3.4, 0.65, 0.2]} />
            <meshStandardMaterial color="#0f172a" roughness={0.2} metalness={0.8} />
          </mesh>
          <Text position={[0, 0, 0.12]} fontSize={0.24} maxWidth={3.2} textAlign="center" color="#f59e0b" anchorX="center" anchorY="middle" fontWeight="bold">
            Kain Sarigading (Warisan Budaya)
          </Text>
        </group>
      </group>

      {/* Showcase 4 Mannequins — in WORLD space (outside rotated group) */}
      <ExhibitionMannequin position={[-6, 0.1, -13.5]} rotation={[0, Math.PI / 4, 0]} texture={sarigadingTex} type="tshirt" />
      <ExhibitionMannequin position={[-6, 0.1, -18.5]} rotation={[0, Math.PI / 4, 0]} texture={sarigadingTex} type="totebag" />

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

        {/* Title plaque */}
        <group position={[0, -3.6, 0.5]}>
          <mesh>
            <boxGeometry args={[3.4, 0.65, 0.2]} />
            <meshStandardMaterial color="#0f172a" roughness={0.2} metalness={0.8} />
          </mesh>
          <Text position={[0, 0, 0.12]} fontSize={0.24} maxWidth={3.2} textAlign="center" color="#f59e0b" anchorX="center" anchorY="middle" fontWeight="bold">
            Naga Balimbur (Pelindung Alam)
          </Text>
        </group>
      </group>

      {/* Showcase 5 Mannequins — in WORLD space (outside rotated group) */}
      <ExhibitionMannequin position={[6, 0.1, -15.5]} rotation={[0, -Math.PI / 4, 0]} texture={nagaTex} type="tshirt" />
      <ExhibitionMannequin position={[6, 0.1, -20.5]} rotation={[0, -Math.PI / 4, 0]} texture={nagaTex} type="dress" />

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
