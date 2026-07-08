# Sasirangan Showcase 3D — Culture Verse 🏛️✨
**Virtual 3D Museum & Interactive Showcase | SDGs Creative Web Competition — Bytesfest 2026**

---

## 🌟 Overview
**Sasirangan Showcase 3D** is an advanced, high-fidelity **3D Virtual Museum & Interactive RPG Experience** engineered to preserve and promote the cultural heritage of **Batik Sasirangan** from Banjarmasin, South Kalimantan. 

Built for the **Bytesfest 2026 Creative Web Competition** under the **Culture Verse** theme (**SDG Target 11.4 - Protecting and Safeguarding the World’s Cultural and Natural Heritage**), this project bridges traditional Indonesian craftsmanship with cutting-edge 3D WebGL technologies. The aesthetic fuses a sophisticated, world-class gallery design with modern lighting mechanics to produce an engaging educational experience.

---

## 📐 Strict Competition Rule Compliance
Developed in absolute alignment with the official Guidebook rules:
*   **100% Client-Side Static Web:** Pure front-end application built with React 18, Three.js, and Tailwind CSS. No external server, database dependency, or backend processing.
*   **Zero Storage Footprint:** Completely state-driven. It **does not** read or write to `localStorage`, `sessionStorage`, or any client-side database. All state variables are managed in volatile, volatile-only memory (via Zustand).
*   **Asset & Code Integrity:** Custom 3D structures, interaction zones, high-resolution WebP motifs, and UI layouts built from scratch without templates, page builders, or CMS platforms.

---

## 🏛️ Key Features & Innovations

### 1. The Grand Exhibition Gallery (60-Meter Corridor)
*   **World-Class Interior Architecture:** Fully realized virtual gallery featuring dark navy slate floors, velvet runner guides, recessed geometric wall pilasters, point-light source chandeliers with physical decay rates, and custom seating benches.
*   **Dynamic Global Reflections:** Real-time reflections powered by high-dynamic range environment mapping (`Environment` preset) that highlights material metallic surfaces and textures under physical lighting.

### 2. Immersive Navigation & RPG Control
*   **Multi-Input Controls:** Move around using traditional **WASD / Arrow Keys** on desktop, or a custom **On-Screen Joystick & Jump Button** overlay on mobile screens.
*   **Pointer Lock System:** Engage cursor lock on canvas click, locking aiming crosshairs in the center for an immersive walkthrough experience. Use standard browser mouse looks, or touch drag gestures to rotate view and tilt the character's head dynamically.
*   **Dynamic POV Toggle:** Swap instantly between **Close 3rd-Person (Over-the-shoulder)** and **1st-Person POV** views. Free-vertical look enabled up to 171 degrees for high-angle views of ceiling displays.

### 3. Customized Sasirangan Wearables (Shirt Customizer)
*   **Real-time Apparel Dressing:** Customize the 3D character in real-time with **10 authentic, full-coverage Sasirangan textile patterns** loaded dynamically via WebP assets.
*   **Advanced Texture Mapping:** Cloned and scaled texture sets applied to torso and arm meshes, supporting wrapping repeat rules to avoid layout stretching or distortions on complex 3D geometries.

### 4. Interactive Motif Showcases
*   **5 Classic Interactive Masterpieces:** Featuring detail panels, cultural background, and direct marketplace UMKM links for *Bayam Raja, Gigi Haruan, Kambang Kacang, Kain Sarigading*, and *Naga Balimbur*.
*   **Eco-Dye Station:** Explorable interactive zone highlighting sustainable natural color dyes (Turmeric, Secang, Mango Leaves) to promote **SDG 12 (Responsible Consumption and Production)**.
*   **Motif Discovery HUD:** Progress-tracking gamified HUD. Unlocking all 5 motifs awards the **"Culture Verse Ambassador Certificate"**.

---

## 🛠️ High-Tech Stack
*   **Framework & Core:** React 18, Vite, JavaScript (ES6+), Tailwind CSS (curated high-contrast HSL color system).
*   **3D Core Engine:** Three.js, `@react-three/fiber` (R3F), `@react-three/drei`.
*   **Physics Engine:** `@react-three/rapier` (WASM-based Rapier Physics Engine).
*   **Character Controller:** `ecctrl` v2.0 (physics-based character navigation controller).
*   **State Management:** Zustand (RAM-only store).
*   **Visual Assets:** High-resolution optimized WebP textures, SVG indicators.

---

## 🚀 Local Installation & Deployment

### 1. Prerequisites
Ensure you have **Node.js** (v18.x or later recommended) and **npm** installed on your machine.

### 2. Clone & Install
```bash
# Clone the repository
git clone https://github.com/codesbykhairannoor/sasiranganshowcase3d.git

# Navigate to project directory
cd sasiranganshowcase3d

# Install dependencies
npm install
```

### 3. Run Development Server
```bash
npm run dev
```
Open **`http://localhost:5173`** in your browser to experience the gallery.

### 4. Build Static Assets
To generate highly-optimized static web files (Vite compilation bundle in `dist/` directory):
```bash
npm run build
```
The compiled output in `dist/` can be deployed directly to static hosting services like Vercel, Netlify, Cloudflare Pages, or GitHub Pages.

---

## 🏆 SDG Impact Framework
*   **Target 11.4 (Cultural Preservation):** Preserves Banjarmasin's textile history by projecting physical art into a modern digital medium.
*   **Target 12.2 & 12.4 (Responsible Production):** Spreads awareness of toxic synthetic chemical dyes versus local, biodegradable organic natural dye alternatives.
*   **SDG 8 & 9 (Creative Economy & Innovation):** Empowers local craftsmen by linking virtual exhibits directly to real-world UMKM marketplaces.

---
*© 2026 Sasirangan Showcase 3D — Culture Verse. Crafted with passion for SDGs Creative Web Competition.*
