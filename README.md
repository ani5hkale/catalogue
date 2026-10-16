# Belgrade Arbor — Architectural & Residential Landmark

An award-inspired digital experience for **Belgrade Arbor**, a luxury residential and commercial complex located at Bulevar heroja sa Košara in New Belgrade. Built with React, TypeScript, Tailwind CSS, and Three.js.

![Belgrade Arbor Preview](https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80)

---

## ✨ Features

- **🌲 Biophilic Tree-Canopy Architecture:** Immersive design ethos inspired by organic tree-canopy forms, solar shading fins, and urban botanical balance.
- **🏛️ Real-Time 3D Building & Floor Explorer (Three.js WebGL):**
  - Fully interactive 3D procedural tower model with orbit controls (rotation, zoom, tilt).
  - Dynamic level inspector (Ground retail colonnade, boutique offices, residential tiers, and crown sky penthouse).
  - Multi-atmosphere lighting modes: **Sunlight (Day)**, **Golden Hour (Dusk)**, and **Illuminated Night**.
  - Real-time floor elevation and unit availability HUD.
- **💊 Floating Capsule Navigation Bar:**
  - Frosted glass capsule (`backdrop-blur-xl`) with kinetic rolling text CTA buttons (`Inquire`).
  - Animated SVG hamburger that smoothly unfolds into an architectural directory.
  - Dual-language toggle (ENG / SRB).
- **📐 Interactive Residences & Floor Plan Blueprints:**
  - Filterable by Studio, 1-Bedroom, 2-Bedroom, 3-Bedroom, and Penthouse suites.
  - Interactive schematic blueprint modal displaying room layouts, square meter breakdowns, and loggia dimensions.
  - Pre-filled private consultation request triggers.
- **📍 "What's Around" Connectivity Index:**
  - Interactive neighborhood matrix featuring walk and drive transit times to West 65, Airport City, Tošin Bunar Station, and Nikola Tesla Airport.
  - Feathered vignette visual previews.
- **💼 Commercial & Retail Colonnades:**
  - Dedicated showcase for high-street boulevard pavilions and LEED Gold corporate suites.
- **📝 Confidential Consultation & Booking Modal:**
  - Streamlined booking with instant feedback and downloadable architectural catalog preview.

---

## 🎨 Design System

| Element | Specification |
| :--- | :--- |
| **Serif Display** | *Playfair Display* & *Cormorant Garamond* (High-contrast editorial prestige) |
| **Sans Body** | *Work Sans* (Humanist architectural grotesque) |
| **Primary Canopy** | `#151D14` & `#1F2A1E` (Deep Pine Forest) |
| **Warm Earth** | `#E8DFD1` & `#F5F3ED` (Travertine Sand & Cream) |
| **Metallic Accent** | `#C8A97E` & `#DFC79B` (Muted Warm Gold & Brass) |

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd belgrade-arbor

# Install dependencies
npm install

# Start local development server
npm run dev
```

Visit `http://localhost:5173` to experience the site locally.

### Production Build

```bash
# Type check and bundle for production
npm run build

# Preview production build locally
npm run preview
```

---

## 🛠️ Tech Stack

- **Framework:** React 19 + TypeScript + Vite
- **3D Graphics & Shaders:** Three.js
- **Styling:** Tailwind CSS + PostCSS + Autoprefixer
- **Icons:** Lucide React

---

## 📜 Credits

- **Architectural Design:** Bureau Cube Partners
- **Development & Real Estate:** Perose Property Group
- **Original Inspiration:** Belgrade Arbor (`belgradearbor.rs`) designed by Square43 Studio.
