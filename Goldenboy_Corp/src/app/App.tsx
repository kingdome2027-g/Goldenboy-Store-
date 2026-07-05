import { useState, useEffect } from "react";
import { motion } from "motion/react";
import {
  Play,
  Music2,
  MessageSquareText,
  Send,
  Menu,
  X,
  ChevronRight,
  Star,
  Users,
  Eye,
  Crown,
  TrendingUp,
  Zap,
  Tv2,
  MapPin,
  Quote,
} from "lucide-react";
import heroImage from "@/imports/1000587930.png";

const NAV_LINKS = ["Home", "About", "Store", "Blog", "Career", "Contact"];

const SKILLS = [
  { label: "Content Creation", pct: 95 },
  { label: "Video Editing", pct: 88 },
  { label: "Brand Building", pct: 82 },
  { label: "Entrepreneurship", pct: 78 },
  { label: "Public Speaking", pct: 85 },
];

const JOURNEY = [
  { year: "2019", title: "The Beginning", desc: "Started creating content from a bedroom with nothing but a phone and a dream." },
  { year: "2020", title: "First Breakthrough", desc: "Hit 10K followers. The grind was real. No shortcuts, just consistency." },
  { year: "2021", title: "Going Viral", desc: "First viral video hit 2M views overnight. Changed everything." },
  { year: "2022", title: "Brand Launched", desc: "The Golden Store was born. Merch, mindset, movement." },
  { year: "2023", title: "Multi-Platform King", desc: "Crossed 500K across all platforms. YouTube, TikTok, Instagram — all growing." },
  { year: "2024", title: "Legacy Mode", desc: "Building systems, teams, and a business that outlasts the algorithm." },
];

const DIRECTORY = [
  { icon: <Play className="w-7 h-7" />, platform: "YouTube", label: "@Goldenboy_Mjuluki", sub: "Video essays, vlogs & reactions", action: "Visit Channel", color: "#ff0000" },
  { icon: <Music2 className="w-7 h-7" />, platform: "TikTok", label: "@Goldenboy_za", sub: "Short-form hits & raw moments", action: "Follow Me", color: "#00f2ea" },
  { icon: <MessageSquareText className="w-7 h-7" />, platform: "Facebook", label: "@Goldenboy.za.creates", sub: "Page: @Goldenboy.media", action: "Follow Page", color: "#1877f2" },
  { icon: <Send className="w-7 h-7" />, platform: "X  /  Kick", label: "@Goldenboy_MJ", sub: "Kick: @Goldenboy_Mj", action: "Follow Now", color: "#f5c842" },
];

const STATS = [
  { value: "500K+", label: "Followers" },
  { value: "1M+", label: "Monthly Views" },
  { value: "10+", label: "Brand Deals" },
  { value: "4", label: "Platforms" },
];

/* ─── Skill bar ─── */
function SkillBar({ label, pct, delay }: { label: string; pct: number; delay: number }) {
  const [width, setWidth] = useState(0);
  useEffect(() => {
    const t = setTimeout(() => setWidth(pct), delay);
    return () => clearTimeout(t);
  }, [pct, delay]);
  return (
    <div className="space-y-1">
      <div className="flex justify-between text-xs font-medium">
        <span className="text-gray-300">{label}</span>
        <span style={{ color: "#f5c842" }}>{pct}%</span>
      </div>
      <div className="h-2 rounded-full bg-white/10 overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-1000 ease-out"
          style={{ width: `${width}%`, background: "linear-gradient(90deg,#d4a017,#f5c842)" }}
        />
      </div>
    </div>
  );
}

/* ─── T-Shirt 3D Mockup ─── */
function TShirtMockup() {
  return (
    <svg width="200" height="240" viewBox="0 0 200 240" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ overflow: "visible" }}>
      <defs>
        {/* Cast shadow */}
        <radialGradient id="ts-shadow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgba(0,0,0,0.7)" />
          <stop offset="100%" stopColor="rgba(0,0,0,0)" />
        </radialGradient>
        {/* Base fabric – key light from upper-left */}
        <linearGradient id="ts-base" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#2c2c2c" />
          <stop offset="30%" stopColor="#181818" />
          <stop offset="100%" stopColor="#060606" />
        </linearGradient>
        {/* Left sleeve – catching the key light */}
        <linearGradient id="ts-sleeve-l" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#242424" />
          <stop offset="100%" stopColor="#0e0e0e" />
        </linearGradient>
        {/* Right sleeve – in shadow */}
        <linearGradient id="ts-sleeve-r" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#111111" />
          <stop offset="100%" stopColor="#050505" />
        </linearGradient>
        {/* Chest spotlight */}
        <radialGradient id="ts-chest" cx="38%" cy="32%" r="48%">
          <stop offset="0%" stopColor="rgba(255,255,255,0.11)" />
          <stop offset="60%" stopColor="rgba(255,255,255,0.03)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0)" />
        </radialGradient>
        {/* Bottom darkening */}
        <linearGradient id="ts-bottom" x1="0" y1="0" x2="0" y2="1">
          <stop offset="55%" stopColor="rgba(0,0,0,0)" />
          <stop offset="100%" stopColor="rgba(0,0,0,0.55)" />
        </linearGradient>
        {/* Rim light on right edge */}
        <linearGradient id="ts-rim" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="rgba(245,200,66,0)" />
          <stop offset="78%" stopColor="rgba(245,200,66,0)" />
          <stop offset="100%" stopColor="rgba(245,200,66,0.28)" />
        </linearGradient>
        {/* Left edge cool fill */}
        <linearGradient id="ts-fill" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="rgba(180,210,255,0.06)" />
          <stop offset="18%" stopColor="rgba(180,210,255,0)" />
        </linearGradient>
        {/* Fabric texture */}
        <filter id="ts-texture" x="-5%" y="-5%" width="110%" height="110%">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" result="noise" />
          <feColorMatrix type="saturate" values="0" in="noise" result="gray" />
          <feBlend in="SourceGraphic" in2="gray" mode="overlay" result="blend" />
          <feComposite in="blend" in2="SourceGraphic" operator="in" />
        </filter>
        {/* Depth shadow */}
        <filter id="ts-depth">
          <feDropShadow dx="4" dy="18" stdDeviation="16" floodColor="rgba(0,0,0,0.9)" />
          <feDropShadow dx="-2" dy="4" stdDeviation="8" floodColor="rgba(0,0,0,0.5)" />
        </filter>
      </defs>

      {/* Floor shadow */}
      <ellipse cx="100" cy="236" rx="70" ry="7" fill="url(#ts-shadow)" />

      {/* Left sleeve */}
      <path
        d="M56,50 C42,52 24,68 18,92 L44,102 C48,104 54,103 60,104 L56,50 Z"
        fill="url(#ts-sleeve-l)"
        filter="url(#ts-depth)"
      />
      {/* Right sleeve */}
      <path
        d="M144,50 C158,52 176,68 182,92 L156,102 C152,104 146,103 140,104 L144,50 Z"
        fill="url(#ts-sleeve-r)"
        filter="url(#ts-depth)"
      />

      {/* Main body – base */}
      <path
        id="ts-body"
        d="M56,50 C64,44 72,40 80,38 Q90,54 100,56 Q110,54 120,38 C128,40 136,44 144,50 L140,104 L156,102 L158,228 L42,228 L44,102 L60,104 Z"
        fill="url(#ts-base)"
        filter="url(#ts-depth)"
      />
      {/* Chest spotlight layer */}
      <path
        d="M56,50 C64,44 72,40 80,38 Q90,54 100,56 Q110,54 120,38 C128,40 136,44 144,50 L140,104 L156,102 L158,228 L42,228 L44,102 L60,104 Z"
        fill="url(#ts-chest)"
      />
      {/* Bottom shadow layer */}
      <path
        d="M56,50 C64,44 72,40 80,38 Q90,54 100,56 Q110,54 120,38 C128,40 136,44 144,50 L140,104 L156,102 L158,228 L42,228 L44,102 L60,104 Z"
        fill="url(#ts-bottom)"
      />
      {/* Rim light layer */}
      <path
        d="M56,50 C64,44 72,40 80,38 Q90,54 100,56 Q110,54 120,38 C128,40 136,44 144,50 L140,104 L156,102 L158,228 L42,228 L44,102 L60,104 Z"
        fill="url(#ts-rim)"
      />
      {/* Cool fill left edge */}
      <path
        d="M56,50 C64,44 72,40 80,38 Q90,54 100,56 Q110,54 120,38 C128,40 136,44 144,50 L140,104 L156,102 L158,228 L42,228 L44,102 L60,104 Z"
        fill="url(#ts-fill)"
      />

      {/* Collar raised edge */}
      <path d="M80,38 Q90,54 100,56 Q110,54 120,38" fill="none" stroke="rgba(60,60,60,1)" strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M80,38 Q90,53 100,55 Q110,53 120,38" fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="1" />

      {/* Seam lines */}
      <line x1="100" y1="56" x2="100" y2="228" stroke="rgba(255,255,255,0.022)" strokeWidth="1" />
      {/* Shoulder seams */}
      <line x1="60" y1="104" x2="44" y2="102" stroke="rgba(255,255,255,0.04)" strokeWidth="0.8" />
      <line x1="140" y1="104" x2="156" y2="102" stroke="rgba(0,0,0,0.4)" strokeWidth="0.8" />

      {/* Wrinkle lines */}
      <path d="M74,118 C84,115 96,117 108,115" fill="none" stroke="rgba(0,0,0,0.22)" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M82,148 C92,145 108,147 118,145" fill="none" stroke="rgba(0,0,0,0.18)" strokeWidth="1" strokeLinecap="round" />
      <path d="M88,178 C96,176 104,177 112,175" fill="none" stroke="rgba(0,0,0,0.14)" strokeWidth="0.8" strokeLinecap="round" />

      {/* Hem rib detail */}
      <line x1="42" y1="220" x2="158" y2="220" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
      <line x1="42" y1="224" x2="158" y2="224" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />

      {/* KINGDOM print */}
      <text
        x="100" y="140"
        textAnchor="middle"
        fontFamily="'Oswald', sans-serif"
        fontWeight="500"
        fontSize="15"
        letterSpacing="5"
        fill="rgba(255,255,255,0.88)"
        style={{ filter: "drop-shadow(0 1px 6px rgba(255,255,255,0.15))" }}
      >
        KINGDOM
      </text>
      <line x1="64" y1="147" x2="136" y2="147" stroke="rgba(245,200,66,0.55)" strokeWidth="0.7" />

      {/* Sleeve cuff details */}
      <path d="M18,89 Q19,94 20,98" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="1.5" />
      <path d="M182,89 Q181,94 180,98" fill="none" stroke="rgba(0,0,0,0.5)" strokeWidth="1.5" />
    </svg>
  );
}

/* ─── Hoodie 3D Mockup ─── */
function HoodieMockup() {
  return (
    <svg width="220" height="285" viewBox="0 0 220 285" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ overflow: "visible" }}>
      <defs>
        <radialGradient id="hd-shadow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgba(0,0,0,0.75)" />
          <stop offset="100%" stopColor="rgba(0,0,0,0)" />
        </radialGradient>
        {/* Hood base */}
        <linearGradient id="hd-hood" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#2a2a2a" />
          <stop offset="50%" stopColor="#141414" />
          <stop offset="100%" stopColor="#060606" />
        </linearGradient>
        {/* Hood inner shadow */}
        <radialGradient id="hd-hood-inner" cx="50%" cy="80%" r="55%">
          <stop offset="0%" stopColor="rgba(0,0,0,0.8)" />
          <stop offset="100%" stopColor="rgba(0,0,0,0.2)" />
        </radialGradient>
        {/* Body base */}
        <linearGradient id="hd-body" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#282828" />
          <stop offset="35%" stopColor="#161616" />
          <stop offset="100%" stopColor="#050505" />
        </linearGradient>
        {/* Chest spotlight */}
        <radialGradient id="hd-chest" cx="40%" cy="38%" r="52%">
          <stop offset="0%" stopColor="rgba(255,255,255,0.12)" />
          <stop offset="55%" stopColor="rgba(255,255,255,0.03)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0)" />
        </radialGradient>
        {/* Bottom shadow */}
        <linearGradient id="hd-bottom" x1="0" y1="0" x2="0" y2="1">
          <stop offset="50%" stopColor="rgba(0,0,0,0)" />
          <stop offset="100%" stopColor="rgba(0,0,0,0.6)" />
        </linearGradient>
        {/* Rim light */}
        <linearGradient id="hd-rim" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="rgba(245,200,66,0)" />
          <stop offset="80%" stopColor="rgba(245,200,66,0)" />
          <stop offset="100%" stopColor="rgba(245,200,66,0.3)" />
        </linearGradient>
        {/* Cool fill */}
        <linearGradient id="hd-fill" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="rgba(160,200,255,0.07)" />
          <stop offset="15%" stopColor="rgba(160,200,255,0)" />
        </linearGradient>
        {/* Pocket shadow */}
        <linearGradient id="hd-pocket" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgba(0,0,0,0.5)" />
          <stop offset="50%" stopColor="rgba(0,0,0,0.2)" />
          <stop offset="100%" stopColor="rgba(0,0,0,0.45)" />
        </linearGradient>
        {/* Left sleeve */}
        <linearGradient id="hd-sl" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#222222" />
          <stop offset="100%" stopColor="#0c0c0c" />
        </linearGradient>
        {/* Right sleeve */}
        <linearGradient id="hd-sr" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#101010" />
          <stop offset="100%" stopColor="#040404" />
        </linearGradient>
        <filter id="hd-depth">
          <feDropShadow dx="4" dy="22" stdDeviation="20" floodColor="rgba(0,0,0,0.95)" />
          <feDropShadow dx="-2" dy="6" stdDeviation="10" floodColor="rgba(0,0,0,0.5)" />
        </filter>
        <filter id="hd-hood-depth">
          <feDropShadow dx="2" dy="8" stdDeviation="10" floodColor="rgba(0,0,0,0.8)" />
        </filter>
      </defs>

      {/* Floor shadow */}
      <ellipse cx="110" cy="280" rx="82" ry="8" fill="url(#hd-shadow)" />

      {/* Left sleeve */}
      <path
        d="M60,80 C44,85 24,108 18,136 L18,158 L26,160 C30,161 36,159 42,156 L50,124 L64,106 Z"
        fill="url(#hd-sl)" filter="url(#hd-depth)"
      />
      {/* Left cuff rib */}
      <path d="M18,152 L26,158" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="2" />
      <path d="M18,156 L26,162" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="2" />

      {/* Right sleeve */}
      <path
        d="M160,80 C176,85 196,108 202,136 L202,158 L194,160 C190,161 184,159 178,156 L170,124 L156,106 Z"
        fill="url(#hd-sr)" filter="url(#hd-depth)"
      />
      {/* Right cuff */}
      <path d="M202,152 L194,158" fill="none" stroke="rgba(0,0,0,0.5)" strokeWidth="2" />
      <path d="M202,156 L194,162" fill="none" stroke="rgba(0,0,0,0.4)" strokeWidth="2" />

      {/* Body base */}
      <path
        id="hd-body-path"
        d="M60,80 L50,124 L42,156 L38,268 L182,268 L178,156 L170,124 L160,80 C148,72 136,67 124,65 L118,78 C114,90 106,94 110,94 C114,94 106,90 102,78 L96,65 C84,67 72,72 60,80 Z"
        fill="url(#hd-body)" filter="url(#hd-depth)"
      />
      <path
        d="M60,80 L50,124 L42,156 L38,268 L182,268 L178,156 L170,124 L160,80 C148,72 136,67 124,65 L118,78 C114,90 106,94 110,94 C114,94 106,90 102,78 L96,65 C84,67 72,72 60,80 Z"
        fill="url(#hd-chest)"
      />
      <path
        d="M60,80 L50,124 L42,156 L38,268 L182,268 L178,156 L170,124 L160,80 C148,72 136,67 124,65 L118,78 C114,90 106,94 110,94 C114,94 106,90 102,78 L96,65 C84,67 72,72 60,80 Z"
        fill="url(#hd-bottom)"
      />
      <path
        d="M60,80 L50,124 L42,156 L38,268 L182,268 L178,156 L170,124 L160,80 C148,72 136,67 124,65 L118,78 C114,90 106,94 110,94 C114,94 106,90 102,78 L96,65 C84,67 72,72 60,80 Z"
        fill="url(#hd-rim)"
      />
      <path
        d="M60,80 L50,124 L42,156 L38,268 L182,268 L178,156 L170,124 L160,80 C148,72 136,67 124,65 L118,78 C114,90 106,94 110,94 C114,94 106,90 102,78 L96,65 C84,67 72,72 60,80 Z"
        fill="url(#hd-fill)"
      />

      {/* Hood outer shape */}
      <path
        d="M96,65 C82,64 68,62 58,56 C44,48 38,30 42,14 C46,0 70,-4 90,2 C100,6 108,12 110,18 C112,12 120,6 130,2 C150,-4 174,0 178,14 C182,30 176,48 162,56 C152,62 138,64 124,65 L118,78 C114,90 110,94 110,94 C110,94 106,90 102,78 Z"
        fill="url(#hd-hood)" filter="url(#hd-hood-depth)"
      />
      {/* Hood key light */}
      <path
        d="M96,65 C82,64 68,62 58,56 C44,48 38,30 42,14 C46,0 70,-4 90,2 C100,6 108,12 110,18 C112,12 120,6 130,2 C150,-4 174,0 178,14 C182,30 176,48 162,56 C152,62 138,64 124,65 L118,78 C114,90 110,94 110,94 C110,94 106,90 102,78 Z"
        fill="url(#hd-chest)"
        opacity="0.7"
      />
      {/* Hood inner shadow (the opening) */}
      <ellipse cx="110" cy="60" rx="18" ry="22" fill="url(#hd-hood-inner)" />
      {/* Hood opening edge */}
      <path d="M102,78 C106,90 110,94 110,94 C110,94 114,90 118,78" fill="none" stroke="rgba(30,30,30,1)" strokeWidth="2" />
      <path d="M102,78 C106,89 110,93 110,93 C110,93 114,89 118,78" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />

      {/* Hood crown seam */}
      <path d="M86,8 Q110,18 134,8" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="1.2" strokeLinecap="round" />

      {/* Drawstrings */}
      <path d="M102,78 C100,90 96,105 92,120" fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M118,78 C120,90 124,105 128,120" fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth="1.2" strokeLinecap="round" />
      {/* String tips */}
      <circle cx="92" cy="122" r="2.5" fill="rgba(245,200,66,0.7)" />
      <circle cx="128" cy="122" r="2.5" fill="rgba(245,200,66,0.7)" />

      {/* Center zip seam */}
      <line x1="110" y1="94" x2="110" y2="268" stroke="rgba(255,255,255,0.03)" strokeWidth="1" strokeDasharray="5 4" />

      {/* Kangaroo pocket */}
      <path d="M68,192 Q68,182 78,180 L142,180 Q152,180 152,192 L152,226 Q152,232 146,232 L74,232 Q68,232 68,226 Z"
        fill="url(#hd-pocket)" stroke="rgba(255,255,255,0.04)" strokeWidth="0.8"
      />
      {/* Pocket highlight top edge */}
      <path d="M78,180 L142,180" fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="0.8" />
      {/* Pocket center divider */}
      <line x1="110" y1="180" x2="110" y2="232" stroke="rgba(255,255,255,0.04)" strokeWidth="0.8" />

      {/* KINGDOM print */}
      <text
        x="110" y="166"
        textAnchor="middle"
        fontFamily="'Oswald', sans-serif"
        fontWeight="500"
        fontSize="16"
        letterSpacing="5"
        fill="rgba(255,255,255,0.9)"
        style={{ filter: "drop-shadow(0 1px 8px rgba(255,255,255,0.15))" }}
      >
        KINGDOM
      </text>
      <line x1="70" y1="173" x2="150" y2="173" stroke="rgba(245,200,66,0.55)" strokeWidth="0.7" />

      {/* Wrinkle details */}
      <path d="M72,110 C84,107 96,109 108,107" fill="none" stroke="rgba(0,0,0,0.25)" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M112,107 C124,109 136,107 148,110" fill="none" stroke="rgba(0,0,0,0.2)" strokeWidth="1.2" strokeLinecap="round" />

      {/* Hem rib */}
      <line x1="38" y1="260" x2="182" y2="260" stroke="rgba(255,255,255,0.05)" strokeWidth="1.5" />
      <line x1="38" y1="264" x2="182" y2="264" stroke="rgba(255,255,255,0.03)" strokeWidth="1.5" />
    </svg>
  );
}

/* ─── Main App ─── */
export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("Home");

  return (
    <div className="min-h-screen text-white" style={{ background: "#0a0a0a", fontFamily: "'Inter', sans-serif" }}>

      {/* NAV */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-4"
        style={{ background: "rgba(10,10,10,0.92)", backdropFilter: "blur(12px)", borderBottom: "1px solid rgba(245,200,66,0.12)" }}
      >
        <div className="flex items-center gap-2">
          <Crown className="w-5 h-5" style={{ color: "#f5c842" }} />
          <span className="font-black tracking-widest text-sm uppercase" style={{ fontFamily: "'Oswald', sans-serif", color: "#f5c842", letterSpacing: "0.25em" }}>
            GoldenBoy
          </span>
        </div>
        <ul className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((l) => (
            <li key={l}>
              <button onClick={() => setActive(l)} className="text-xs font-medium uppercase tracking-wider transition-colors duration-200"
                style={{ color: active === l ? "#f5c842" : "#aaa", letterSpacing: "0.12em" }}>
                {l}
              </button>
            </li>
          ))}
        </ul>
        <button className="hidden md:block text-xs font-bold uppercase tracking-widest px-5 py-2 rounded-full hover:scale-105 transition-all"
          style={{ background: "#f5c842", color: "#0a0a0a" }}>
          Join the Journey
        </button>
        <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X className="w-5 h-5" style={{ color: "#f5c842" }} /> : <Menu className="w-5 h-5" style={{ color: "#f5c842" }} />}
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-8" style={{ background: "rgba(10,10,10,0.98)" }}>
          {NAV_LINKS.map((l) => (
            <button key={l} onClick={() => { setActive(l); setMenuOpen(false); }}
              className="text-2xl font-bold uppercase tracking-widest"
              style={{ fontFamily: "'Oswald', sans-serif", color: active === l ? "#f5c842" : "#fff" }}>
              {l}
            </button>
          ))}
          <button className="mt-4 text-sm font-bold uppercase tracking-widest px-8 py-3 rounded-full"
            style={{ background: "#f5c842", color: "#0a0a0a" }}>
            Join the Journey
          </button>
        </div>
      )}

      {/* HERO */}
      <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
        {/* Ambient gold glow */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(245,200,66,0.07) 0%, transparent 70%)", filter: "blur(60px)" }}
        />
        <div className="absolute left-0 bottom-0 w-[400px] h-[400px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(100,150,255,0.04) 0%, transparent 70%)", filter: "blur(80px)" }}
        />

        <div className="relative w-full max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center gap-12 md:gap-0">
          {/* Left content */}
          <div className="flex-1 space-y-6 z-10">
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
              className="text-xs font-semibold uppercase tracking-[0.3em]" style={{ color: "#f5c842" }}>
              Welcome to my world
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}>
              <h1 className="text-6xl sm:text-7xl md:text-8xl font-black uppercase leading-none"
                style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.02em" }}>
                <span className="block text-white">Reactions.</span>
                <span className="block" style={{ color: "#f5c842" }}>Real.</span>
                <span className="block text-white">Raw.</span>
              </h1>
            </motion.div>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.25 }}
              className="text-sm leading-relaxed max-w-md" style={{ color: "#888" }}>
              Content creator. Entrepreneur. Dreamer. Building a legacy through content, creativity, and continuous growth — straight from South Africa.
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.35 }}
              className="flex flex-wrap items-center gap-2">
              {[
                { icon: <Play className="w-4 h-4" />, label: "@Goldenboy_Mjuluki" },
                { icon: <Music2 className="w-4 h-4" />, label: "@Goldenboy_za" },
                { icon: <Send className="w-4 h-4" />, label: "@Goldenboy_MJ" },
                { icon: <MessageSquareText className="w-4 h-4" />, label: "@Goldenboy.media" },
                { icon: <Tv2 className="w-4 h-4" />, label: "@Goldenboy_Mj" },
              ].map((s) => (
                <div key={s.label} className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium cursor-pointer hover:scale-105 transition-transform"
                  style={{ background: "rgba(245,200,66,0.1)", border: "1px solid rgba(245,200,66,0.2)", color: "#f5c842" }}>
                  {s.icon}
                  <span className="hidden sm:block">{s.label}</span>
                </div>
              ))}
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.45 }}
              className="flex flex-wrap items-center gap-4 pt-2">
              <button className="flex items-center gap-2 px-7 py-3 rounded-full font-bold text-sm uppercase tracking-widest hover:scale-105 transition-transform"
                style={{ background: "#f5c842", color: "#0a0a0a" }}>
                Explore My Universe <ChevronRight className="w-4 h-4" />
              </button>
              <button className="flex items-center gap-2 px-7 py-3 rounded-full font-bold text-sm uppercase tracking-widest hover:scale-105 transition-transform"
                style={{ border: "1px solid rgba(245,200,66,0.4)", color: "#f5c842" }}>
                Watch Intro
              </button>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.6 }}
              className="inline-flex items-center gap-3 px-4 py-3 rounded-xl"
              style={{ background: "rgba(245,200,66,0.08)", border: "1px solid rgba(245,200,66,0.2)" }}>
              <TrendingUp className="w-4 h-4" style={{ color: "#f5c842" }} />
              <div>
                <p className="text-[10px] uppercase tracking-widest" style={{ color: "#888" }}>Building Future</p>
                <p className="text-xs font-bold uppercase tracking-wider" style={{ color: "#f5c842" }}>Legacy Tomorrow</p>
              </div>
            </motion.div>
          </div>

          {/* Right: 3D Garment Mockups */}
          <div className="relative flex-1 flex justify-center md:justify-end">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.3 }}
              className="relative"
              style={{ width: 380, maxWidth: "92vw" }}
            >
              {/* Studio spotlight beams */}
              <div className="absolute inset-0 pointer-events-none" style={{
                background: "radial-gradient(ellipse at 30% 20%, rgba(245,200,66,0.08) 0%, transparent 55%), radial-gradient(ellipse at 70% 10%, rgba(200,220,255,0.04) 0%, transparent 45%)",
              }} />

              {/* Garments row */}
              <div className="flex items-end justify-center gap-4 pb-6">
                {/* T-Shirt */}
                <div className="flex flex-col items-center gap-3">
                  <motion.div
                    animate={{ y: [0, -12, 0] }}
                    transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
                    style={{
                      transform: "perspective(700px) rotateY(-9deg) rotateX(4deg)",
                      filter: "drop-shadow(0 30px 40px rgba(0,0,0,0.9)) drop-shadow(-4px 0 20px rgba(180,210,255,0.06)) drop-shadow(4px 0 15px rgba(245,200,66,0.1))",
                    }}
                  >
                    <TShirtMockup />
                  </motion.div>
                  <span className="text-[10px] uppercase tracking-[0.25em] font-semibold" style={{ color: "#3a3a3a" }}>Tee</span>
                </div>

                {/* Hoodie */}
                <div className="flex flex-col items-center gap-3">
                  <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut", delay: 1.1 }}
                    style={{
                      transform: "perspective(700px) rotateY(8deg) rotateX(3deg)",
                      filter: "drop-shadow(0 35px 45px rgba(0,0,0,0.95)) drop-shadow(4px 0 22px rgba(245,200,66,0.12)) drop-shadow(-3px 0 18px rgba(180,210,255,0.05))",
                    }}
                  >
                    <HoodieMockup />
                  </motion.div>
                  <span className="text-[10px] uppercase tracking-[0.25em] font-semibold" style={{ color: "#3a3a3a" }}>Hoodie</span>
                </div>
              </div>

              {/* Floor reflection */}
              <div className="absolute bottom-0 left-0 right-0 h-16 pointer-events-none"
                style={{ background: "linear-gradient(to top, rgba(245,200,66,0.04) 0%, transparent 100%)" }}
              />

              {/* KingDome label */}
              <div className="absolute top-0 right-0">
                <div className="px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest"
                  style={{ background: "rgba(245,200,66,0.12)", border: "1px solid rgba(245,200,66,0.3)", color: "#f5c842" }}>
                  KingDome Collection
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <div className="w-px h-10 animate-pulse" style={{ background: "linear-gradient(to bottom, #f5c842, transparent)" }} />
          <span className="text-[10px] uppercase tracking-widest" style={{ color: "#555" }}>Scroll</span>
        </div>
      </section>

      {/* CONNECT STRIP */}
      <div className="py-4 overflow-hidden" style={{ background: "#f5c842" }}>
        <div className="flex items-center gap-12 animate-[marquee_20s_linear_infinite] whitespace-nowrap">
          {Array(6).fill(null).map((_, i) => (
            <span key={i} className="flex items-center gap-3 text-xs font-black uppercase tracking-widest" style={{ color: "#0a0a0a" }}>
              <Star className="w-3 h-3 fill-current" /> Content Creator
              <Star className="w-3 h-3 fill-current" /> Entrepreneur
              <Star className="w-3 h-3 fill-current" /> Storyteller
              <Star className="w-3 h-3 fill-current" /> Goldenboy
            </span>
          ))}
        </div>
      </div>

      {/* ABOUT */}
      <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Image side */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex justify-center"
          >
            <div className="relative">
              {/* Outer glow ring */}
              <div className="absolute -inset-4 rounded-full pointer-events-none"
                style={{ background: "radial-gradient(circle, rgba(245,200,66,0.15) 0%, transparent 70%)", filter: "blur(20px)" }}
              />
              {/* Gold border ring */}
              <div className="w-72 h-72 md:w-80 md:h-80 rounded-full p-1"
                style={{ background: "linear-gradient(135deg, #f5c842 0%, #8a6a00 50%, #f5c842 100%)" }}>
                <img
                  src={typeof heroImage === 'string' ? heroImage : heroImage.src}
                  alt="GoldenBoy — Reactions. Real. Raw."
                  className="w-full h-full rounded-full object-cover object-top"
                  style={{ filter: "brightness(1.05) contrast(1.05)" }}
                />
              </div>
              {/* Location badge */}
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider whitespace-nowrap"
                style={{ background: "#111", border: "1px solid rgba(245,200,66,0.3)", color: "#f5c842" }}>
                <MapPin className="w-3 h-3" /> South Africa
              </div>
            </div>
          </motion.div>

          {/* Text side */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="space-y-6"
          >
            <p className="text-xs uppercase tracking-[0.3em]" style={{ color: "#f5c842" }}>Who is he?</p>
            <h2 className="text-4xl md:text-5xl font-black uppercase leading-tight"
              style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.04em" }}>
              Meet <span style={{ color: "#f5c842" }}>GoldenBoy</span>
            </h2>
            <div className="space-y-4 text-sm leading-relaxed" style={{ color: "#888" }}>
              <p>
                Born and raised in South Africa, GoldenBoy Mjuluki is a content creator, entrepreneur, and storyteller who turned a phone and a dream into a multi-platform movement.
              </p>
              <p>
                Known for raw reactions, real conversations, and unfiltered energy — he builds communities that don't just watch, they feel. Every video, every post, every drop is a piece of the legacy.
              </p>
            </div>

            {/* Pull quote */}
            <div className="p-5 rounded-2xl relative" style={{ background: "rgba(245,200,66,0.06)", border: "1px solid rgba(245,200,66,0.15)" }}>
              <Quote className="w-5 h-5 mb-3" style={{ color: "#f5c842" }} />
              <p className="text-sm font-semibold italic text-white leading-relaxed">
                "Discipline today, freedom tomorrow. That's not just a motto — it's a lifestyle."
              </p>
              <p className="mt-2 text-xs uppercase tracking-widest" style={{ color: "#555" }}>— GoldenBoy Mjuluki</p>
            </div>

            <div className="flex flex-wrap gap-3 pt-2">
              {[
                { label: "YouTube", handle: "@Goldenboy_Mjuluki" },
                { label: "TikTok", handle: "@Goldenboy_za" },
                { label: "X", handle: "@Goldenboy_MJ" },
                { label: "Facebook", handle: "@Goldenboy.za.creates" },
                { label: "Kick", handle: "@Goldenboy_Mj" },
              ].map((p) => (
                <div key={p.label} className="px-3 py-2 rounded-xl text-xs" style={{ background: "#111", border: "1px solid rgba(255,255,255,0.06)" }}>
                  <span style={{ color: "#555" }}>{p.label} </span>
                  <span className="font-semibold text-white">{p.handle}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* EXPLORE DIRECTORY */}
      <section className="py-20 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="mb-12">
          <p className="text-xs uppercase tracking-[0.3em] mb-2" style={{ color: "#f5c842" }}>Explore My World</p>
          <h2 className="text-4xl md:text-5xl font-black uppercase" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.04em" }}>
            Directory
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {DIRECTORY.map((d, i) => (
            <motion.div key={d.platform}
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ delay: i * 0.1 }} whileHover={{ y: -6, scale: 1.02 }}
              className="group cursor-pointer rounded-2xl p-6 space-y-4"
              style={{ background: "#111", border: "1px solid rgba(255,255,255,0.06)" }}>
              <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: `${d.color}20`, color: d.color }}>
                {d.icon}
              </div>
              <div>
                <h3 className="font-black text-base uppercase tracking-wide" style={{ fontFamily: "'Oswald', sans-serif" }}>{d.platform}</h3>
                <p className="text-sm font-semibold text-white mt-0.5">{d.label}</p>
                <p className="text-xs mt-1" style={{ color: "#666" }}>{d.sub}</p>
              </div>
              <button className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest" style={{ color: d.color }}>
                {d.action} <ChevronRight className="w-3 h-3" />
              </button>
            </motion.div>
          ))}
        </div>
      </section>

      {/* QUOTE BANNER */}
      <div className="py-16 px-6 md:px-12 text-center relative overflow-hidden" style={{ background: "#111" }}>
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse at center, rgba(245,200,66,0.07) 0%, transparent 70%)" }}
        />
        <Crown className="w-8 h-8 mx-auto mb-6" style={{ color: "#f5c842" }} />
        <blockquote className="text-2xl md:text-4xl font-black uppercase max-w-3xl mx-auto"
          style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.04em", color: "#fff" }}>
          "I'm not here to be average. I'm here to be{" "}
          <span style={{ color: "#f5c842" }}>iconic.</span>"
        </blockquote>
        <p className="mt-4 text-xs uppercase tracking-[0.3em]" style={{ color: "#555" }}>— GoldenBoy</p>
      </div>

      {/* MY JOURNEY + SKILLS */}
      <section className="py-20 px-6 md:px-12 max-w-7xl mx-auto grid md:grid-cols-2 gap-16">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] mb-2" style={{ color: "#f5c842" }}>The Story</p>
          <h2 className="text-4xl font-black uppercase mb-10" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.04em" }}>
            My Journey So Far
          </h2>
          <div className="relative pl-6 space-y-8" style={{ borderLeft: "1px solid rgba(245,200,66,0.2)" }}>
            {JOURNEY.map((item, i) => (
              <motion.div key={item.year}
                initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="relative">
                <div className="absolute -left-[1.65rem] top-1 w-3 h-3 rounded-full border-2"
                  style={{ background: "#0a0a0a", borderColor: "#f5c842" }} />
                <span className="text-xs font-bold uppercase tracking-widest" style={{ color: "#f5c842" }}>{item.year}</span>
                <p className="font-bold text-sm mt-0.5 text-white">{item.title}</p>
                <p className="text-xs mt-1 leading-relaxed" style={{ color: "#666" }}>{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.3em] mb-2" style={{ color: "#f5c842" }}>What I Bring</p>
          <h2 className="text-4xl font-black uppercase mb-10" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.04em" }}>
            Career Growth & Skills
          </h2>
          <div className="space-y-6">
            {SKILLS.map((s, i) => <SkillBar key={s.label} label={s.label} pct={s.pct} delay={300 + i * 150} />)}
          </div>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ delay: 0.5 }} className="mt-10 p-6 rounded-2xl"
            style={{ background: "rgba(245,200,66,0.06)", border: "1px solid rgba(245,200,66,0.15)" }}>
            <div className="flex items-center gap-3 mb-3">
              <Zap className="w-5 h-5" style={{ color: "#f5c842" }} />
              <span className="font-bold text-sm uppercase tracking-wider" style={{ color: "#f5c842" }}>Always Leveling Up</span>
            </div>
            <p className="text-xs leading-relaxed" style={{ color: "#777" }}>
              Constantly investing in new skills, tools, and perspectives. Growth is the only direction.
            </p>
          </motion.div>
        </div>
      </section>

      {/* STATS CTA */}
      <section className="py-20 px-6 md:px-12 relative overflow-hidden" style={{ background: "#111" }}>
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse at 50% 100%, rgba(245,200,66,0.1) 0%, transparent 60%)" }}
        />
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs uppercase tracking-[0.3em] mb-3" style={{ color: "#f5c842" }}>This is just the beginning</p>
            <h2 className="text-4xl md:text-6xl font-black uppercase"
              style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.04em" }}>
              Join the Movement.<br />
              <span style={{ color: "#f5c842" }}>Build the Legacy.</span>
            </h2>
            <p className="mt-4 text-sm max-w-lg mx-auto" style={{ color: "#666" }}>
              Be part of something bigger than content. A community of creators, dreamers, and doers building something that lasts.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            {STATS.map((s, i) => (
              <motion.div key={s.label}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: i * 0.1 }} className="text-center p-6 rounded-2xl"
                style={{ background: "rgba(245,200,66,0.06)", border: "1px solid rgba(245,200,66,0.12)" }}>
                <div className="text-3xl md:text-4xl font-black"
                  style={{ fontFamily: "'Bebas Neue', sans-serif", color: "#f5c842", letterSpacing: "0.04em" }}>
                  {s.value}
                </div>
                <div className="text-xs uppercase tracking-widest mt-1" style={{ color: "#666" }}>{s.label}</div>
              </motion.div>
            ))}
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            <button className="flex items-center gap-2 px-8 py-4 rounded-full font-bold text-sm uppercase tracking-widest hover:scale-105 transition-transform"
              style={{ background: "#f5c842", color: "#0a0a0a" }}>
              <Users className="w-4 h-4" /> Join the Journey
            </button>
            <button className="flex items-center gap-2 px-8 py-4 rounded-full font-bold text-sm uppercase tracking-widest hover:scale-105 transition-transform"
              style={{ border: "1px solid rgba(245,200,66,0.3)", color: "#f5c842" }}>
              <Eye className="w-4 h-4" /> View Full Portfolio
            </button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-12 px-6 md:px-12" style={{ background: "#060606", borderTop: "1px solid rgba(245,200,66,0.1)" }}>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-2">
            <Crown className="w-5 h-5" style={{ color: "#f5c842" }} />
            <span className="font-black tracking-widest text-sm uppercase" style={{ fontFamily: "'Oswald', sans-serif", color: "#f5c842" }}>
              GoldenBoy
            </span>
          </div>
          <p className="text-xs uppercase tracking-[0.3em] text-center" style={{ color: "#555", letterSpacing: "0.2em" }}>
            Discipline Today, Freedom Tomorrow
          </p>
          <div className="flex items-center gap-4">
            {[Play, Music2, MessageSquareText, Send, Tv2].map((Icon, i) => (
              <button key={i} className="w-9 h-9 rounded-full flex items-center justify-center hover:scale-110 transition-transform"
                style={{ background: "rgba(245,200,66,0.1)", color: "#f5c842" }}>
                <Icon className="w-4 h-4" />
              </button>
            ))}
          </div>
        </div>
        <div className="mt-8 text-center text-xs" style={{ color: "#333" }}>
          © 2026 GoldenBoy. All rights reserved.
        </div>
      </footer>

      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}
