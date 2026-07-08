# 📘 SASIRANGAN SHOWCASE 3D: DOKUMENTASI TEKNIS & ARSITEKTUR
**Versi:** 1.0.0 | **Tema:** Culture Verse (SDG 11.4 & 12) | **Kompetisi:** Bytesfest 2026

Dokumen ini memuat penjelasan mendalam mengenai arsitektur sistem, teknologi inti, dan rekayasa perangkat lunak (*software engineering*) di balik pembuatan ekosistem museum virtual 3D Sasirangan Showcase.

---

## 🏗️ 1. Arsitektur Dasar & Stack Teknologi
Platform ini dibangun dengan fondasi murni **Client-Side Rendering (CSR)** tanpa bergantung pada server backend maupun database eksternal. Hal ini sengaja dirancang untuk memaksimalkan kecepatan akses, keamanan data, dan kepatuhan absolut terhadap regulasi kompetisi.

**Tech Stack Inti:**
- **Framework Utama:** React 18 & Vite (Super fast HMR build tool).
- **Styling:** Tailwind CSS (Utilitas CSS modern dengan palet warna kustom berdefinisi tinggi).
- **State Management:** Zustand (Ringan, volatile, dan *unopinionated* — menggantikan Redux demi efisiensi).
- **3D Engine:** Three.js via `@react-three/fiber` (R3F).

---

## 🎨 2. Implementasi Grafis 3D (WebGL & R3F)
Pemrosesan grafis dilakukan sepenuhnya melalui GPU klien menggunakan WebGL.

### 2.1. Pencahayaan Berbasis Fisika (Physically Based Rendering / PBR)
- **Lingkungan Global (Environment Mapping):** Menggunakan `preset="apartment"` dari `@react-three/drei` untuk memproyeksikan pencahayaan dan refleksi global (*Global Illumination*) secara realistis ke objek-objek berbahan dasar metalik (seperti bingkai lukisan atau armor robot).
- **Lampu Sorot Volumetrik (SpotLights):** Diaplikasikan pada lorong galeri dengan nilai *penumbra* tinggi dan fungsi atenuasi jarak (*distance decay*) untuk menciptakan suasana ruangan yang sinematik dan elegan.
- **Dynamic Device Pixel Ratio (DPR):** Dioptimalkan secara otomatis ke `Math.max(1.3, window.devicePixelRatio)` pada layar sentuh/mobile guna menghindari *pixelation* tanpa memberikan beban *rendering* berlebih pada perangkat *low-end*.

### 2.2. Manajemen Tekstur Tingkat Lanjut (Texture Skinning & Cloning)
- **Asinkronisasi Aset:** Seluruh lukisan motif dan tekstur kain diload menggunakan `useTexture` yang bersifat *suspense-ready*.
- **Kloning Tekstur Independen:** Untuk mengakali distorsi (peregangan / *stretching*) pemetaan UV 3D saat satu tekstur diterapkan ke dua geometri berbeda (misal: badan dan tangan robot), tekstur lengan dikloning menggunakan `useMemo`. Ini memungkinkan modifikasi tingkat repetisi (*texture repeat coordinate*) mandiri untuk rasio ukuran yang sempit seperti `repeat.set(0.5, 2.0)`.

---

## ⚙️ 3. Mesin Fisika (Physics Engine) & Kontroler Karakter
Website ini mendobrak batas pengembangan web konvensional dengan mengintegrasikan kalkulasi fisika *real-time* ke dalam *browser*.

### 3.1. Rapier WASM (WebAssembly)
Menggunakan `@react-three/rapier` sebagai *engine* fisika yang sangat cepat berkat kompilasi *WebAssembly*. Setiap tembok, lantai, dan ornamen pameran dalam galeri diberikan komponen `RigidBody (type="fixed")` agar memicu tabrakan (*collision*) akurat saat diintervensi oleh pemain.

### 3.2. Physics-Based Character Controller (ecctrl)
- Memanfaatkan paket `ecctrl` (versi 2) untuk menangani gravitas, gesekan, intertia, dan lompatan mekanis *(kinematic controls)* karakter pemain.
- **Kamera Immersive Pointer Lock:** Pergerakan sudut pandang menggunakan sinkronisasi pointer-mouse API absolut, mengunci kursor kaku di tengah dan memungkinkan pengguna *look-around* secara organik (analog 360 derajat), dengan sistem batasan rotasi vertikal untuk menghindari kamera *clipping* *(bug kamera berputar menembus kepala)*.

---

## 📱 4. Responsivitas dan Lapisan Antarmuka (HTML-over-WebGL)
Menggabungkan keindahan WebGL dengan interaktivitas DOM HTML tradisional melalui `<Html>` dari Drei dan lapisan *z-index* absolut.

- **Deteksi Perangkat Keras Dinamis:** Menggunakan injeksi regex spesifik (mencocokkan *userAgent* `Mobi|Android|iPhone|iPad` dan deteksi `ontouchstart`) untuk memutuskan apakah sistem kontrol harus merender tata letak WASD (PC) atau *On-Screen Joystick* + *Swipe Controls* (Mobile).
- **Optimasi Landscape Viewport (`svh` limits):** Memastikan modal (seperti kotak penjelasan, penghargaan) tidak terpotong oleh bilah alamat peramban *(URL bar browser)* di *smartphone* dengan perhitungan tinggi berbasis batasan absolut `@media (max-height: 560px)` dengan kombinasi metrik `80svh`.

---

## 💾 5. Siklus Hidup Memori dan Kepatuhan Lomba
Proyek ini didesain 100% nir-jejak-penyimpanan (*Zero-Storage Footprint*):
- Tidak ada data (*progress* pemain, *history* motif, dll.) yang disuntikkan ke dalam `localStorage`, `sessionStorage`, `IndexedDB`, ataupun `Cookies`.
- Semua data interaksi hidup dan mati bersiklus bersama siklus aplikasi (`volatile RAM-only state` via Zustand). Ketika *browser* di-refresh, galeri kembali ke tahap aslinya. Hal ini menjamin keamanan privasi tingkat tinggi, kepatuhan teknis terhadap aturan web statis lomba *Bytesfest 2026*, serta ketiadaan kerentanan serangan *Cross-Site Scripting* (XSS) persisten.

## 📐 6. Wireframe & Struktur Layout
Secara garis besar, *wireframe* aplikasi ini terbagi menjadi dua lapisan utama (*layering*):
1. **Lapisan Canvas WebGL (Z-Index: 0):** Memuat seluruh lingkungan 3D, pencahayaan, robot karakter, galeri pameran, dan mekanisme fisika.
2. **Lapisan UI Overlay HTML (Z-Index: 10 - 50):** Antarmuka transparan (*glassmorphism*) yang membungkus kanvas 3D, terdiri dari:
   - *Crosshair* statis di tengah layar untuk *aiming*.
   - *HUD (Heads-Up Display)* di pojok kiri/kanan atas untuk progres motif dan tombol pengaturan POV.
   - *Action Tooltips* di bagian bawah (misal: "Tekan E untuk Inspeksi").
   - *Modal Pop-up* di tengah layar saat melakukan interaksi membaca deskripsi motif atau mengganti baju.
   - *Mobile Controls* (Joystick dan *Jump Button*) pada perangkat berlayar sentuh.

---

## 🎯 7. Fungsi Website
Sasirangan Showcase 3D berfungsi ganda sebagai:
- **Media Edukasi Interaktif:** Mengenalkan 5 motif klasik Sasirangan (Bayam Raja, Gigi Haruan, dll.) beserta filosofinya lewat eksplorasi gamifikasi *(scrollytelling & walking simulator)*.
- **Katalisator Ekonomi Kreatif:** Menghubungkan pengunjung secara langsung (via tautan UMKM) ke pengrajin lokal yang memproduksi Sasirangan.
- **Kampanye Ramah Lingkungan:** Memberikan literasi (di bagian *Eco-Dye Station*) tentang urgensi transisi menuju pewarna berbahan dasar alam.

---

## 🖥️ 8. Tampilan Website (Visual Interface)
Tampilan situs ini mengusung estetika **"Dark & Cyber-Cultural"**:
- **Lingkungan Galeri:** Berdesain premium dengan lantai *slate* hitam, pencahayaan *low-key lighting*, dan *spotlight* hangat yang menyorot karya seni layaknya pameran seni murni kelas dunia.
- **Karakter:** Sesosok robot *(Droid)* bergaya futuristik namun dibalut kemeja *Culture Verse* bermotif Sasirangan klasik, melambangkan pelestarian budaya tradisional dalam era metaverse digital.
- **Desain UI/UX:** Memanfaatkan efek *Glassmorphism* (panel kaca *blur* tembus pandang), tipografi tajam bertemakan antarmuka video game (kombinasi font *Cinzel*, *Rajdhani*, dan *Montserrat*), serta animasi mikro (seperti *bouncing UI*) demi mencapai nuansa AAA-game.

---

## 🔄 9. Alur Kerja Situs (User Workflow)
Alur interaksi pengguna (*User Journey*) dirancang natural tanpa interupsi layar memuat ulang (*refresh*):
1. **Landing / Hero:** Pengguna tiba di layar judul sinematik, membaca visi misi SDGs, dan menekan tombol "Mulai Eksplorasi" untuk menjatuhkan karakter ke dalam galeri 3D.
2. **Eksplorasi:** Pengguna mengontrol karakter (menggunakan *WASD/Joystick*) berjalan menyusuri lorong pameran.
3. **Inspeksi:** Ketika karakter mendekati bingkai lukisan atau zona *Eco-Dye*, sistem deteksi jarak memunculkan instruksi "Tekan E" (atau tombol sentuh) di tengah layar.
4. **Learning & Customizing:** Kamera otomatis berpindah mulus *(cinematic tween)* mendekati lukisan. Muncul panel kaca berisi penjelasan sejarah motif. Di tahap ini, pengguna juga dapat membuka menu *Customizer* baju untuk menyamakan pakaian robot dengan motif yang dipelajari.
5. **Reward & Gamification:** Setiap kali motif baru selesai dipelajari, indikator HUD bertambah (misal 1/5). Jika semua (5/5) mahakarya dieksplorasi, pengguna akan diberikan **Sertifikat Duta Budaya** *(Culture Verse Ambassador)* sebagai bentuk apresiasi penamat (*completionist*).

---
**Kesimpulan:**
Secara komprehensif, Sasirangan Showcase 3D merupakan rekayasa perangkat lunak front-end kelas atas yang memadukan komputasi matematika GPU kompleks dengan estetika UI/UX terkini yang memanjakan mata, membuktikan bahwa media web *browser* mampu menyajikan simulasi *gamification* interaktif berstandar Museum Digital modern.
