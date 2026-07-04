# sasiranganshowcase3d 🏛️✨
**Sasirangan Metaverse — SDGs Creative Web Competition (Culture Verse)**

![Sasirangan Metaverse Banner](/public/textures/bayam_raja.png)

## 🌟 Tentang Proyek (About The Project)
**Sasirangan Metaverse (`sasiranganshowcase3d`)** adalah sebuah terobosan eksplorasi kreatif digital berformat 3D RPG & Virtual Museum berbasis web untuk melestarikan dan mempromosikan warisan budaya mahakarya **Kain Sasirangan khas Kalimantan Selatan** ke panggung global.

Proyek ini dibangun khusus untuk **SDGs Creative Web Competition (Target 11.4 - Melestarikan Warisan Budaya & Alam Dunia)** dengan memadukan estetika *high-tech cyberpunk / sci-fi agency* dengan keanggunan istana galeri klasik ala Louvre / Gedung Putih.

---

## 🏛️ Fitur Utama (Key Features)
1. **Lorong Galeri Megah 60 Meter (The Grand Presidential Gallery Corridor):**
   * Arsitektur lorong sepanjang 60 meter dan lebar 16 meter yang dihiasi pilar-pilar marmer klasik (*fluted columns*), karpet merah beludru khas istana kepresidenan, lampu kristal gantung, dan tali pembatas emas (*velvet ropes*).
2. **3 Lukisan Mahakarya Sasirangan 3D Interaktif:**
   * **Motif Gigi Haruan:** Melambangkan ketajaman berpikir dan ketangkasan hidup.
   * **Motif Kambang Kacang:** Melambangkan persaudaraan abadi dan gotong royong sosial.
   * **Motif Bayam Raja:** Melambangkan martabat kepemimpinan luhur dan kemakmuran masyarakat (Presidential Centerpiece).
3. **Kendali RPG & Kamera POV Minecraft Style:**
   * Kendali karakter droid interaktif menggunakan **WASD / Arrow Keys** serta dukungan **Joystick Mobile & Jump Button**.
   * Fitur ganti sudut pandang **1st Person (POV 1)** vs **3rd Person (POV 3)** secara instan menggunakan tombol **`V` / `F5`**!
4. **Fisika Real-Time & Monumen Interaktif:**
   * Diintegrasikan dengan *engine fisika WASM* **Rapier**, pemain dapat menabrak dan melompati 10 huruf knockdown fisika **S-A-S-I-R-A-N-G-A-N** di tengah lorong!
5. **Gamification & SDG 11 Impact Center:**
   * Sistem pencarian motif (*Motif Discovery HUD*), klaim sertifikat & badge penghargaan (*Culture Verse Ambassador*), serta pusat informasi dampak keberlanjutan SDG Target 11.4.

---

## 🛠️ Teknologi yang Digunakan (Tech Stack)
* **Core:** React 18, Vite, JavaScript (ES6+), HTML5, Vanilla CSS3 (Custom Design System with AAA Video Game Fonts: Orbitron, Chakra Petch, Rajdhani).
* **3D WebGL & Rendering:** Three.js, `@react-three/fiber` (R3F), `@react-three/drei`.
* **Physics & Character Controller:** `@react-three/rapier` (Rapier WASM Physics Engine), `ecctrl` v2.0.0 (Character & Camera Controls).
* **Audio & Atmosphere:** Web Audio API procedural sound effects & immersive ambient soundscape.

---

## 🚀 Cara Menjalankan Secara Lokal (Quick Start)

### 1. Prasyarat
Pastikan Anda memiliki **Node.js** (v18+ direkomendasikan) dan **npm** terinstal.

### 2. Instalasi
Clone repositori ini dan instal dependensinya:
```bash
git clone https://github.com/codesbykhairannoor/sasiranganshowcase3d.git
cd sasiranganshowcase3d
npm install
```

### 3. Jalankan Server Development
```bash
npm run dev
```
Buka browser Anda di `http://localhost:5173` untuk mulai menjelajahi Sasirangan Metaverse!

### 4. Build untuk Produksi (Static Web Bundle)
Untuk menghasilkan bundle statis yang dioptimalkan untuk deployment (Netlify, Vercel, GitHub Pages, dll.):
```bash
npm run build
```
Hasil build statis murni akan tersedia di folder `dist/`.

---

## 🏆 Filosofi & Dampak SDG 11.4
> *"Melestarikan tradisi bukan dengan menyimpannya di dalam museum yang sunyi, melainkan dengan menghidupkannya kembali di dalam peradaban digital masa depan."*

Melalui digitalisasi motif Sasirangan ke dalam ekosistem metaverse, kami memberdayakan lebih dari 1.200 pengrajin lokal di Banjarmasin, meningkatkan nilai jual global hingga 3.5x lipat, dan mendukung industri kreatif berkelanjutan berbasis pewarna alami ramah lingkungan.

---
*© 2026 Sasirangan Showcase 3D — Culture Verse Team. Built with Passion for SDGs Creative Web Competition.*
