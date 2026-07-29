import React from 'react';

interface LogoProps {
  className?: string;
  isDark?: boolean;
}

// 1. Python (Official Blue #3776AB + Yellow #FFD43B)
export function PythonLogo({ className = 'w-6 h-6' }: LogoProps) {
  return (
    <svg viewBox="0 0 128 128" className={className}>
      <path
        fill="#3776AB"
        d="M62.6 0c-16.5.1-27.1 7.2-27.1 21.6v11.3h27.6v3.8H24.5C8.9 36.7 0 46.8 0 63.8c0 17.5 9.7 27.2 25.3 27.2h8v-12c0-14.7 10.6-22.3 26.6-22.3h28.1v-3.8H60.4V36.7h45.2c16.2 0 22.4-7.6 22.4-21.6C108 3.5 94.6 0 62.6 0zM45 11.8c2.6 0 4.7 2.1 4.7 4.7s-2.1 4.7-4.7 4.7-4.7-2.1-4.7-4.7 2.1-4.7 4.7-4.7z"
      />
      <path
        fill="#FFD43B"
        d="M65.4 128c16.5-.1 27.1-7.2 27.1-21.6V95.1H64.9v-3.8h38.6c15.6 0 24.5-10.1 24.5-27.1 0-17.5-9.7-27.2-25.3-27.2h-8v12c0 14.7-10.6 22.3-26.6 22.3H40.1v3.8h27.6v19H22.5c-16.2 0-22.4 7.6-22.4 21.6 0 11.6 13.4 15.1 45.3 15.3zM83 116.2c-2.6 0-4.7-2.1-4.7-4.7s2.1-4.7 4.7-4.7 4.7 2.1 4.7 4.7-2.1 4.7-4.7 4.7z"
      />
    </svg>
  );
}

// 2. JavaScript (Official Yellow #F7DF1E Box + Black JS)
export function JavaScriptLogo({ className = 'w-6 h-6' }: LogoProps) {
  return (
    <svg viewBox="0 0 128 128" className={className}>
      <rect width="128" height="128" fill="#F7DF1E" rx="16" />
      <path
        fill="#000000"
        d="M67.3 104c3.3 5.4 7.7 9.4 15.3 9.4 6.5 0 10.7-3.2 10.7-7.7 0-5.3-4.2-7.2-11.3-10.3l-3.9-1.7c-11.4-4.8-19.1-10.8-19.1-23.7 0-12.8 9.9-22.5 25.5-22.5 11.2 0 19.1 3.9 24.6 13.7l-11.8 7.6c-2.7-4.8-6.1-7-12.4-7-5.3 0-8.8 3.5-8.8 7.3 0 5 3.3 6.9 10.2 9.9l3.9 1.7c13.7 5.9 20.6 11.8 20.6 24.2 0 14.8-11.7 23.5-28.5 23.5-16.4 0-26.2-7.9-31.5-18.7l12.5-5.7zM24 104c2.8 4.9 6.6 8.5 13.2 8.5 6.1 0 10.1-2.4 10.1-11.9V49.3h15.2v51.8c0 17.8-10.3 25.4-25.5 25.4-12.8 0-21.4-6.8-25.5-16.8L24 104z"
      />
    </svg>
  );
}

// 3. TypeScript (Official Blue #3178C6 Box + White TS)
export function TypeScriptLogo({ className = 'w-6 h-6' }: LogoProps) {
  return (
    <svg viewBox="0 0 128 128" className={className}>
      <rect width="128" height="128" fill="#3178C6" rx="16" />
      <path
        fill="#FFFFFF"
        d="M71.2 104c3.3 5.4 7.7 9.4 15.3 9.4 6.5 0 10.7-3.2 10.7-7.7 0-5.3-4.2-7.2-11.3-10.3l-3.9-1.7c-11.4-4.8-19.1-10.8-19.1-23.7 0-12.8 9.9-22.5 25.5-22.5 11.2 0 19.1 3.9 24.6 13.7l-11.8 7.6c-2.7-4.8-6.1-7-12.4-7-5.3 0-8.8 3.5-8.8 7.3 0 5 3.3 6.9 10.2 9.9l3.9 1.7c13.7 5.9 20.6 11.8 20.6 24.2 0 14.8-11.7 23.5-28.5 23.5-16.4 0-26.2-7.9-31.5-18.7l12.5-5.7zM18 49.3h42v12.2H32.4v48.6H18V49.3z"
      />
    </svg>
  );
}

// 4. HTML5 (Official Orange #E34F26 Shield + White 5)
export function HTML5Logo({ className = 'w-6 h-6' }: LogoProps) {
  return (
    <svg viewBox="0 0 128 128" className={className}>
      <path fill="#E34F26" d="M19.2 115.2L7.7 0h112.6l-11.5 115.2L64 128z" />
      <path fill="#EF652A" d="M64 10.5v106.8l37.2-10.3 9.7-96.5z" />
      <path
        fill="#FFFFFF"
        d="M64 52.8H43.3l-1.4-16H64V21.3H24.3l4.3 48H64zm0 35.8l-18.4-5-1.2-13.3H28.8l2.3 26.2L64 106.4z"
      />
      <path
        fill="#ECECEC"
        d="M64 52.8v15.5h19.2l-1.8 20.3L64 93.6v15.8l32.6-9 4.4-49.4zM64 21.3v15.5h38.4l1.3-15.5z"
      />
    </svg>
  );
}

// 5. CSS3 (Official Blue #1572B6 Shield + White 3)
export function CSS3Logo({ className = 'w-6 h-6' }: LogoProps) {
  return (
    <svg viewBox="0 0 128 128" className={className}>
      <path fill="#1572B6" d="M19.2 115.2L7.7 0h112.6l-11.5 115.2L64 128z" />
      <path fill="#33A9DC" d="M64 10.5v106.8l37.2-10.3 9.7-96.5z" />
      <path
        fill="#FFFFFF"
        d="M64 52.8H43.3l-1.4-16H64V21.3H24.3l4.3 48H64zm0 35.8l-18.4-5-1.2-13.3H28.8l2.3 26.2L64 106.4z"
      />
      <path
        fill="#ECECEC"
        d="M64 52.8v15.5h19.2l-1.8 20.3L64 93.6v15.8l32.6-9 4.4-49.4zM64 21.3v15.5h38.4l1.3-15.5z"
      />
    </svg>
  );
}

// 6. MySQL (Official Blue #4479A1 + Orange Dolphin #F29111)
export function MySQLLogo({ className = 'w-6 h-6' }: LogoProps) {
  return (
    <svg viewBox="0 0 128 128" className={className}>
      <path
        fill="#F29111"
        d="M87.6 15c-11.2 0-19.4 6.7-22.6 15.6-3.2-8.9-11.4-15.6-22.6-15.6-14.7 0-25.4 11.5-25.4 27.5 0 25.1 36.8 55.5 48 64.3 11.2-8.8 48-39.2 48-64.3C113 26.5 102.3 15 87.6 15z"
      />
      <path
        fill="#4479A1"
        d="M64 35c-12 0-20 8-20 20s8 20 20 20 20-8 20-20-8-20-20-20zm0 32c-6.6 0-12-5.4-12-12s5.4-12 12-12 12 5.4 12 12-5.4 12-12 12z"
      />
    </svg>
  );
}

// 7. Java (Official Coffee Cup Steam #E76F00 + Saucer Rings #5382A1 - User Image 1)
export function JavaLogo({ className = 'w-6 h-6' }: LogoProps) {
  return (
    <svg viewBox="0 0 200 240" className={className}>
      {/* Orange Steam Curves */}
      <path
        fill="#E76F00"
        d="M102.4 0C88.6 28.5 119.8 45.7 132.8 65c13.7 20.4 12.8 35.3 2.4 52.8-9.8 16.8-6.7 31.1 8 46.1 13.8-14.7 17.5-28.7 8.6-46.1-11-21.4-7-35.8 5.8-53.5 13.5-18.7 5.2-35.5-30.2-52.6zM68.5 24.3C52.9 44.8 77.2 60.1 87.3 75.9c10.7 16.7 10 28.9 1.9 43.2-7.7 13.7-5.2 25.4 6.2 37.7 10.8-12 13.7-23.5 6.7-37.7-8.6-17.5-5.5-29.3 4.5-43.8 10.5-15.3 4.1-29-23.6-43z"
      />
      {/* Blue Saucer Rings & Handle */}
      <path
        fill="#5382A1"
        d="M32.5 140c-15.2 12.4 5.3 21.6 34.2 26.5 35.8 6 86.8 5.2 108.5-2 15.6-5.2 22.8-12.8 8.1-18.5-14.7-5.7-41.2-8.5-74.8-8.5-35 0-63.5 3.3-76 9.7zm-6.2 34c-14.5 11.5 6.8 20.3 35.5 24.8 37.3 5.8 90.6 4.7 113.2-2.2 16.3-5 23.8-12.2 8.4-17.7-15.3-5.5-43-8.1-78-8.1-36.5 0-66.3 3.1-79.1 9.2zm11.2 33.5c-11.8 9.3 9.4 16.5 36.8 20 35.5 4.5 86.3 3.4 107.8-2 15.5-3.9 22.6-9.6 8-14-14.6-4.4-41-6.5-74.5-6.5-34.8 0-65.7 2.4-78.1 7.2zM155 125c15.2 4.2 33.5 11.5 33.5 23.5 0 17-32.5 27.5-65 31-25 2.7-57.5 1.5-75-3.5 15 7.5 49 11 75 11 48 0 85-12.5 85-33.5 0-14.5-20.5-24.5-53.5-28.5z"
      />
    </svg>
  );
}

// 8. Ghidra (Official Red Dragon Circle Logo - User Image 2)
export function GhidraLogo({ className = 'w-6 h-6' }: LogoProps) {
  return (
    <svg viewBox="0 0 500 500" className={className}>
      {/* Outer Black Circle Frame */}
      <circle cx="250" cy="250" r="236" fill="none" stroke="#111827" strokeWidth="24" />
      {/* Red Dragon Body Profile */}
      <path
        fill="#DC2626"
        d="M230 460c115 0 210-85 210-200 0-75-40-130-100-165-35 45-75 60-120 40 45 45 30 95-20 120-40 20-80 0-110-35-25 45-15 90 25 120-60-25-80-70-65-130C80 280 60 330 80 380c35 50 85 80 150 80z"
      />
      {/* Dragon Head & Snout */}
      <path
        fill="#EF4444"
        d="M120 280c-35-30-40-75-10-120 40-60 110-80 170-60-40-35-90-40-140-10-50 30-70 80-55 135 10 20 22 38 35 55z"
      />
      {/* Orange Dragon Tail Accent */}
      <path
        fill="#F97316"
        d="M140 435c75 35 170 30 235-20 40-30 65-75 65-125-35 75-105 130-190 135-40 2-75-5-110-20z"
      />
      {/* Binary Bits (10010) coming out of snout */}
      <text x="75" y="325" fill="#EAB308" fontSize="24" fontFamily="monospace" fontWeight="bold">1 0 0 1</text>
      <text x="85" y="355" fill="#EAB308" fontSize="22" fontFamily="monospace" fontWeight="bold">0 1 0</text>
    </svg>
  );
}

// 9. SQLMap (Official Terminal Banner Logo - User Image 3)
export function SqlmapLogo({ className = 'w-6 h-6' }: LogoProps) {
  return (
    <svg viewBox="0 0 320 160" className={className}>
      {/* Yellow ASCII Text Border & Letter Outlines */}
      <path
        fill="none"
        stroke="#EAB308"
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M20 70h40v40H20V70zm40 0h40v40H60V70zm80 0h40v40h-40V70zm40 0h40v40h-40V70zm40 0h40v40h-40V70zM120 30h30M135 30v110M120 140h30"
      />
      {/* Central Red Highlight Banner */}
      <rect x="123" y="42" width="24" height="76" fill="#DC2626" rx="3" />
      {/* White/Yellow Inner Bracket Characters ["] [)] ['] */}
      <text x="127" y="60" fill="#FEF08A" fontSize="16" fontFamily="monospace" fontWeight="bold">"</text>
      <text x="127" y="85" fill="#FEF08A" fontSize="16" fontFamily="monospace" fontWeight="bold">)</text>
      <text x="127" y="110" fill="#FEF08A" fontSize="16" fontFamily="monospace" fontWeight="bold">'</text>
    </svg>
  );
}

// 10. Radare2 (Official r<< Logo - User Image 4)
export function Radare2Logo({ className = 'w-6 h-6', isDark = true }: LogoProps) {
  const fillColor = isDark ? '#FFFFFF' : '#111827';
  return (
    <svg viewBox="0 0 300 160" className={className}>
      {/* Stylized Serif 'r' with Left Ball/Dot */}
      <circle cx="45" cy="65" r="22" fill={fillColor} />
      <rect x="62" y="45" width="38" height="75" fill={fillColor} />
      <rect x="52" y="112" width="58" height="8" fill={fillColor} />
      <path fill={fillColor} d="M62 45c0-12 10-22 22-22h16v14H84c-4.4 0-8 3.6-8 8v10H62V45z" />

      {/* Rewind Arrow Triangle 1 (<<) */}
      <polygon points="175,45 115,82 175,120" fill={fillColor} />
      {/* Rewind Arrow Triangle 2 (<<) */}
      <polygon points="255,45 195,82 255,120" fill={fillColor} />
    </svg>
  );
}

// 11. React (Official Cyan #61DAFB Atom)
export function ReactLogo({ className = 'w-6 h-6' }: LogoProps) {
  return (
    <svg viewBox="-11.5 -10.23174 23 20.46348" className={className}>
      <circle cx="0" cy="0" r="2.05" fill="#61DAFB" />
      <g stroke="#61DAFB" strokeWidth="1" fill="none">
        <ellipse rx="11" ry="4.2" />
        <ellipse rx="11" ry="4.2" transform="rotate(60)" />
        <ellipse rx="11" ry="4.2" transform="rotate(120)" />
      </g>
    </svg>
  );
}

// 12. Go (Official Cyan #00ADD8 Gopher Silhouette)
export function GoLogo({ className = 'w-6 h-6' }: LogoProps) {
  return (
    <svg viewBox="0 0 128 128" className={className}>
      <path
        fill="#00ADD8"
        d="M21.2 56.4c0-11.7 9.5-21.2 21.2-21.2s21.2 9.5 21.2 21.2-9.5 21.2-21.2 21.2-21.2-9.5-21.2-21.2zm64.4 0c0-11.7 9.5-21.2 21.2-21.2s21.2 9.5 21.2 21.2-9.5 21.2-21.2 21.2-21.2-9.5-21.2-21.2z"
      />
    </svg>
  );
}

// 13. Docker (Official Blue #2496ED Whale)
export function DockerLogo({ className = 'w-6 h-6' }: LogoProps) {
  return (
    <svg viewBox="0 0 128 128" className={className}>
      <path
        fill="#2496ED"
        d="M124.6 52.8c-3.6-2.7-10.4-3.5-16.4-1.7-1.4-4.8-4.9-8.7-9.5-11.1l-2.6-1.3-1.8 2.3c-3.7 4.7-4.7 11.2-3 16.7-3.1 1.8-7.3 3.6-12.2 3.6H4V84c0 15.5 12.5 28 28 28h64c15.5 0 28-12.5 28-28 0-11.4-6.8-21.2-16.4-25.6l.6-5.6z"
      />
    </svg>
  );
}

// 14. Git (Official Orange #F03C2E Diamond + White Branch)
export function GitLogo({ className = 'w-6 h-6' }: LogoProps) {
  return (
    <svg viewBox="0 0 128 128" className={className}>
      <path
        fill="#F03C2E"
        d="M123.6 56.4L71.6 4.4c-4.4-4.4-11.6-4.4-16 0L4.4 55.6c-4.4 4.4-4.4 11.6 0 16l52 52c4.4 4.4 11.6 4.4 16 0l51.2-51.2c4.4-4.4 4.4-11.6 0-16.4z"
      />
      <path
        fill="#FFFFFF"
        d="M89.4 58.4c-2.3 0-4.3 1.3-5.3 3.2L68.4 45.9V44c2.8-1.5 4.7-4.4 4.7-7.8 0-4.9-4-8.9-8.9-8.9s-8.9 4-8.9 8.9c0 3.4 1.9 6.3 4.7 7.8v38.9C57.2 84.4 55.3 87.3 55.3 90.7c0 4.9 4 8.9 8.9 8.9s8.9-4 8.9-8.9c0-3.3-1.8-6.1-4.4-7.6l15.4-15.4c1.6.5 3.3.7 5.1.7 4.9 0 8.9-4 8.9-8.9s-3.9-9.1-8.7-9.1z"
      />
    </svg>
  );
}

// 15. Linux (Official Yellow #FCC624 Tux Penguin)
export function LinuxLogo({ className = 'w-6 h-6' }: LogoProps) {
  return (
    <svg viewBox="0 0 128 128" className={className}>
      <path
        fill="#FCC624"
        d="M64 4c-19.9 0-36 16.1-36 36v48c0 19.9 16.1 36 36 36s36-16.1 36-36V40c0-19.9-16.1-36-36-36zm-12 40c0-4.4 3.6-8 8-8s8 3.6 8 8-3.6 8-8 8-8-3.6-8-8zm24 0c0-4.4 3.6-8 8-8s8 3.6 8 8-3.6 8-8 8-8-3.6-8-8z"
      />
    </svg>
  );
}

// 16. Clerk (Official C Person Emblem from User Image)
export function ClerkLogo({ className = 'w-6 h-6', isDark = true }: LogoProps) {
  const arcColor = '#6C47FF';
  const personColor = isDark ? '#FFFFFF' : '#111827';
  return (
    <svg viewBox="0 0 500 500" className={className}>
      <path
        fill={arcColor}
        d="M256 50C142.2 50 50 142.2 50 256c0 58.1 24.1 110.6 62.9 148.1l50.3-50.3C135.5 328.2 122 293.7 122 256c0-74 60-134 134-134 38.3 0 73 16 97.7 41.7l50.3-50.3C367.6 76.1 315.1 50 256 50z"
      />
      <circle cx="256" cy="240" r="58" fill={personColor} />
      <path
        fill={personColor}
        d="M256 325c-56.5 0-107.5 25.6-141.5 66 8.6 8.3 18.1 15.7 28.4 22.1 29.8-35.4 73.6-58.1 113.1-58.1s83.3 22.7 113.1 58.1c10.3-6.4 19.8-13.8 28.4-22.1C363.5 350.6 312.5 325 256 325z"
      />
    </svg>
  );
}

// 17. Meilisearch (Official 3 Slanted Rounded Bars /// from User Image)
export function MeilisearchLogo({ className = 'w-6 h-6' }: LogoProps) {
  return (
    <svg viewBox="0 0 100 100" className={className}>
      <g transform="skewX(-22)">
        <rect x="22" y="10" width="18" height="80" rx="9" fill="#FF2E93" />
        <rect x="47" y="10" width="18" height="80" rx="9" fill="#FF2E93" />
        <rect x="72" y="10" width="18" height="80" rx="9" fill="#FF2E93" />
      </g>
    </svg>
  );
}
