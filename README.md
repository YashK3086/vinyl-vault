# The Vinyl Vault — Procedurally Audio-Synthesized Interactive Portfolio

[![Framework: Next.js 16](https://img.shields.io/badge/Framework-Next.js%2016-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![Styling: Tailwind CSS 4](https://img.shields.io/badge/Styling-Tailwind%20CSS%204-06B6D4?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Animation: Framer Motion](https://img.shields.io/badge/Animation-Framer%20Motion-purple?style=for-the-badge&logo=framer)](https://www.framer.com/motion/)
[![Web Audio API](https://img.shields.io/badge/Audio-Web%20Audio%20API-ff69b4?style=for-the-badge)](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API)

An interactive, high-fidelity digital record player room showcasing engineering projects as playable vinyl releases. Designed to replace static text-based resumes with an immersive, tactile, and responsive portfolio experience.

🎥 **Live Portfolio Platform**: [yashvardhankhanna-portfolio.vercel.app](https://yashvardhankhanna-portfolio.vercel.app/)

---

## 📌 Problem Statement & Engineering Justification

Standard developer portfolios and resumes are static, non-interactive, and fail to demonstrate real-time client-side performance tuning. Recruiter engagement is low when scanning generic grids of text.

### The Solution: An Interactive Audio-Synthesized Dashboard
The Vinyl Vault solves this by modeling a vintage hi-fi console:
- **Interactive Record Rack**: Multi-category record sleeves utilizing Framer Motion accordion fanning, physical disc ejection, and drag-and-drop turntable physics.
- **Procedural Audio Synthesis**: Bypasses heavy static MP3 assets. Synthesizes authentic vinyl surface noise, mains hum, and stylus pops entirely in real-time using Web Audio API nodes.
- **Dynamic Repository Parsing**: Includes an ETL-like parser utility that dynamically ingests raw GitHub API metadata and README markdown, converting code repositories into structured "A-Side/B-Side" vinyl tracks.

---

## 📐 System Architecture & Data Flow

### Core Architecture

<p align="center">
  <img src="docs/architecture.png" alt="Vinyl Vault Architecture" width="100%" />
</p>

### Interactive Playback Lifecycle

```mermaid
sequenceDiagram
    autonumber
    actor User as Recruiter
    participant UI as RecordShelf Component
    participant TT as TurntableDeck Component
    participant State as Next.js Global State
    participant Audio as VinylAudioEngine (Web Audio)
    participant Sleeve as GatefoldSleeve Component

    User->>UI: Hover over record spine
    UI->>UI: Trigger accordion fanning & pop-up disc animation
    User->>UI: Click record spine (Select Record)
    UI->>State: Set Active Record (id, tracks, theme)
    
    State->>TT: Trigger tonearm rotation & record spin (Framer Motion)
    State->>Audio: Initialize AudioContext & invoke .play()
    
    critical Web Audio Node Graph Setup
        Audio->>Audio: Start 55Hz Hum Oscillator (sine wave)
        Audio->>Audio: Generate Pink Noise Buffer (surface static)
        Audio->>Audio: Schedule random pop spikes with exponential decay
        Audio->>Audio: Route through BiquadFilter (Low-Pass/High-Pass)
        Audio->>Audio: Connect Node Graph to AudioContext Destination
    end
    
    Audio-->>User: Playback warm analog vinyl crackle
    State->>Sleeve: Render project details as A-Side/B-Side tracks
    User->>Sleeve: Hover over tracks to inspect engineering outcomes
```

---

## ⚡ Procedural Audio Synthesis Engine

The application synthesizes vintage vinyl sound effects procedurally, avoiding network requests for heavy audio files:

1. **Amplifier Mains Hum**: An oscillator node generating a continuous 55Hz (A1 frequency) sine wave at very low volume (`gain = 0.005`) to simulate vintage tube amplifier warmth.
2. **Vinyl Surface Static**: A pink noise generator approximated inside a custom 4-second audio buffer. Output is filtered by a low-pass biquad node to isolate low frequencies, mimicking physical stylus-to-groove friction:
   $$\text{pink}[i] = (\text{lastOut} + (0.02 \times \text{white})) / 1.02$$
3. **Stylus Dust Pops**: Random impulse spikes generated at a density rate of $0.00015$ per sample, shaped by an exponential decay envelope to simulate the physical stylus settling after striking a dust particle:
   $$\text{amplitude}[i] = A \times e^{-t \times 0.3}$$

All nodes are connected to a master gain node with smooth linear ramps (`linearRampToValueAtTime`) to prevent pop clicks when dropping or lifting the needle.

---

## 📂 Codebase Structure & Clean Layout

The project structure is organized to isolate presentation logic from utilities:

```
vinyl-vault/
├── app/                        # Next.js App Router Entrypoint
│   ├── layout.js               # Global layouts & metadata
│   ├── page.js                 # Primary landing layout & state coordinator
│   └── globals.css             # Tailwind v4 directives & root animations
├── components/                 # Modular Presentation Layers
│   ├── RecordShelf.js          # Interactive horizontal vinyl rack (accordion fan)
│   ├── TurntableDeck.js        # Tonearm physics & spinning record graphics
│   ├── GatefoldSleeve.js       # Dynamic repository details (A-Side/B-Side tracks)
│   ├── ExperiencePanel.js      # Certifications, credentials & education panels
│   ├── AmbientBackground.js    # Glowing grid overlays
│   └── Preloader.js            # Initial console system boot sequence
├── data/
│   └── vault.js                # Central JSON project specs & credentials database
├── utils/
│   ├── audioSynthesizer.js     # Web Audio API procedural synthesis engine
│   └── githubParser.js         # Automated README/API to vinyl record converter
├── public/                     # Static assets (Resume, Favicon, icons)
├── docs/                       # Architecture diagrams & media
└── LICENSE                     # MIT License
```

---

## 🛠️ Quickstart & Local Execution

### Prerequisites
- Node.js (v18.0.0 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/YashK3086/vinyl-vault.git
   cd vinyl-vault
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) to view the application.

4. Build the production application bundle:
   ```bash
   npm run build
   ```

---

## 📐 Key Optimizations & Recruiter Checklist

- **SSR-Safe Web Audio**: Audio nodes are strictly guarded against server-side rendering execution (`typeof window !== "undefined"`), ensuring clean hydration.
- **Framer Motion Orchestration**: Framer Motion components utilize GPU-accelerated transform operations (`scale`, `rotate`, `y`) to maintain 60 FPS transitions during heavy fanning animations.
- **Tailwind CSS 4**: Implements Tailwind's modern `@tailwindcss/postcss` compiler for faster, leaner production CSS bundles.
- **Strict Linting**: Configured with ESLint and JSConfig for clean code quality and strict import paths.
