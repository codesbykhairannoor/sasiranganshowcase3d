# Sasirangan Showcase 3D — Culture Verse 🏛️✨
**SDGs Creative Web Competition — Bytesfest 2026 (Sub-Tema: Culture Verse / SDG 11)**

![Sasirangan Metaverse Banner](/public/textures/bayam_raja.png)

## 🌟 Tentang Proyek (About The Project)
**Sasirangan Showcase 3D (`sasiranganshowcase3d`)** adalah sebuah terobosan inovasi landing page interaktif berformat **3D Virtual Metaverse Museum & RPG Game** berbasis web statis modern. Proyek ini didesain khusus untuk menjawab tantangan **SDGs Creative Web Competition - Bytesfest 2026** pada sub-tema **Culture Verse: Preserving Heritage Through Design (SDG Target 11.4 - Pelestarian Warisan Budaya & Alam)**.

Web ini mengangkat keagungan seni **Kain Batik Sasirangan khas Banjarmasin, Kalimantan Selatan** ke panggung digital global dengan memadukan estetika *high-tech cyberpunk / sci-fi* dan keanggunan arsitektur istana galeri kelas dunia (*The Grand Presidential Gallery*).

---

## ⚖️ Kepatuhan Mutlak Terhadap Aturan Lomba (Rule Compliance Check)
Sesuai dengan **Ketentuan Karya (Bagian D)** pada Guidebook Bytesfest 2026, website ini memenuhi 100% kriteria teknis berikut:
*   ✅ **Murni Web Statis (Front End Only):** Berjalan sepenuhnya di sisi klien (*client-side*) menggunakan HTML5, CSS3, dan JavaScript / React 18 tanpa server backend.
*   ✅ **Zero Database & Zero Storage:** **TIDAK MENGGUNAKAN** Database apapun, dan **TIDAK MENGGUNAKAN** `localStorage` maupun `sessionStorage`. Seluruh manajemen state diakses secara *pure in-memory* (Zustand State).
*   ✅ **Orisinalitas Aset & Kode:** Seluruh arsitektur 3D, sistem kontrol kamera, motif kain Sasirangan asli (resolusi tinggi WebP), dan logo resmi Kota Banjarmasin disiapkan secara mandiri tanpa menggunakan template atau CMS instant (WordPress, Wix, dll).
*   ✅ **Instruksi Build Lengkap:** Menggunakan *module bundler* modern **Vite + React + Tailwind CSS**. Instruksi instalasi dan eksekusi tersedia lengkap di bagian bawah dokumen ini.

---

## 🏛️ Fitur Unggulan & Inovasi (Key Features)
1. **Lorong Galeri Megah 60 Meter (*The Grand Exhibition Corridor*):**
   * Arsitektur lorong sepanjang 60 meter berlantai marmer slate malam (*Royal Navy Slate*), karpet merah beludru (*Red Velvet Carpet*), pilar dinding *recessed pilasters*, bangku penonton mewah, dan lampu gantung kristal emas yang memancarkan pencahayaan realistis (*Physical Light Decay*).
2. **5 Mahakarya Sasirangan 3D Interaktif & Logo Banjarmasin:**
   * **Motif Bayam Raja:** Melambangkan martabat kepemimpinan luhur dan kemakmuran masyarakat (*Presidential Centerpiece*).
   * **Motif Gigi Haruan:** Melambangkan ketajaman berpikir dan ketangkasan menghadapi tantangan hidup.
   * **Motif Kambang Kacang:** Melambangkan persaudaraan abadi dan keharmonisan sosial.
   * **Motif Kain Sarigading:** Melambangkan keanggunan nilai spiritual dan tradisi keraton.
   * **Motif Naga Balimbur:** Melambangkan kekuatan regenerasi alam dan kesuburan bumi.
   * **Monumen Sambutan:** Menampilkan Logo Resmi Kota Banjarmasin pada tugu marmer di pintu masuk galeri.
3. **Kendali RPG & Kamera Minecraft Style (*Pointer Lock & Center Crosshair*):**
   * Kendali karakter droid interaktif menggunakan **WASD / Arrow Keys**, dukungan **Joystick Mobile & Jump Button** untuk perangkat seluler.
   * **Minecraft Pointer Lock:** Klik pada layar untuk mengunci kursor menjadi bidikan *Crosshair (+)* di tengah layar! Gerakkan mouse untuk memutar kamera 360° dan menengokkan kepala karakter secara mulus (*Head Tracking*). Tekan **`ESC`** untuk kembali ke kursor UI Windows.
   * **Sudut Pandang Super Intim (Over-The-Shoulder & 1st Person):** Tekan tombol **`V` / `F5`** untuk berpindah instan antara mode *Over-The-Shoulder 3rd Person* (jarak kamera dekat 2.0m ala game AAA) dan mode *1st Person POV* (sudut pandang langsung dari mata karakter). Bebas mendongak ke atas (*Full Vertical Look* hingga 171°) untuk menikmati keindahan langit-langit galeri!
4. **Gamification & SDG 11 Impact Center:**
   * **Motif Discovery HUD:** Sistem pencarian 5 motif Sasirangan yang progresnya terdata secara *real-time*.
   * **Klaim Sertifikat & Badge:** Setelah menemukan seluruh motif, pengunjung dapat mengklaim penghargaan **"Culture Verse Ambassador — SDG 11"**.
   * **Pusat Edukasi & E-Commerce:** Modal inspeksi mendalam untuk setiap motif, dilengkapi filosofi budaya dan tombol penghubung langsung ke pengrajin lokal UMKM di Banjarmasin.

---

## 🛠️ Teknologi yang Digunakan (Tech Stack)
*   **Core:** React 18, Vite, JavaScript (ES6+), HTML5, Vanilla CSS3 & Tailwind CSS (Custom Design System with AAA Video Game Fonts: Orbitron, Chakra Petch, Rajdhani).
*   **3D WebGL & Rendering:** Three.js, `@react-three/fiber` (R3F), `@react-three/drei`.
*   **Physics & Character Controller:** `@react-three/rapier` (Rapier WASM Physics Engine), `ecctrl` v2.0.0 (Character & Camera Controls).
*   **State Management:** Zustand (*Pure In-Memory Client-Side State, Zero LocalStorage*).
*   **Audio & Atmosphere:** Web Audio API procedural sound effects & immersive ambient soundscape.

---

## 🚀 Cara Menjalankan Secara Lokal (Build & Run Instructions)
Sesuai syarat kompetisi untuk aplikasi berbasis web framework/bundler, berikut langkah mudah menjalankan project ini:

### 1. Prasyarat System
Pastikan komputer Anda memiliki **Node.js** (v18 atau lebih baru direkomendasikan) serta **npm** terinstal.

### 2. Instalasi Dependensi
Clone repositori ini ke dalam komputer Anda, lalu masuk ke folder project dan lakukan instalasi modul:
```bash
git clone https://github.com/codesbykhairannoor/sasiranganshowcase3d.git
cd sasiranganshowcase3d
npm install
```

### 3. Menjalankan Mode Development
Untuk membuka website secara lokal dalam mode pengembangan dengan *Hot Module Replacement*:
```bash
npm run dev
```
Buka browser Anda dan akses tautan **`http://localhost:5173`** untuk mulai menjelajahi dunia Sasirangan!

### 4. Build untuk Produksi (Static Web Bundle)
Untuk menghasilkan bundle file HTML/CSS/JS statis murni yang siap dideploy ke layanan *hosting front-end* (Netlify, Vercel, GitHub Pages, Cloudflare Pages, dll):
```bash
npm run build
```
Proses build akan mengompilasi seluruh kode dan aset ke dalam folder **`dist/`**. Folder ini berisi web statis murni yang dapat langsung dijalankan atau diunggah tanpa memerlukan database atau server backend!

---

## 🏆 Filosofi & Dampak SDG 11.4
> *"Melestarikan tradisi bukan dengan menyimpannya di dalam museum yang sunyi, melainkan dengan menghidupkannya kembali di dalam peradaban digital masa depan."*

Melalui digitalisasi mahakarya motif Sasirangan ke dalam ekosistem *interactive metaverse*, proyek ini berkontribusi nyata pada:
1.  **Pelestarian Warisan Budaya (SDG 11.4):** Mendokumentasikan dan memvisualisasikan filosofi batik Sasirangan Kalimantan Selatan agar dikenal oleh generasi Z dan masyarakat dunia.
2.  **Pemberdayaan Ekonomi Lokal (SDG 8 & 9):** Menjembatani pengunjung dengan para pengrajin lokal melalui integrasi promosi digital langsung dari dalam galeri virtual.
3.  **Edukasi Berkelanjutan (SDG 12):** Mengedukasi masyarakat tentang pentingnya penggunaan pewarna alami ramah lingkungan dalam proses pembuatan kain Sasirangan tradisional.

---
*© 2026 Sasirangan Showcase 3D — Culture Verse Team. Built with Passion for SDGs Creative Web Competition - Bytesfest 2026.*
