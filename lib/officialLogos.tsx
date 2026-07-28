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

// 7. Java (Official Cup Blue #5382A1 + Steam Red #E76F00)
export function JavaLogo({ className = 'w-6 h-6' }: LogoProps) {
  return (
    <svg viewBox="0 0 128 128" className={className}>
      <path
        fill="#E76F00"
        d="M48.8 15.2c-5.2 6.1-2.1 11.7 1.8 17.5 4.5 6.7 4.2 11.6.8 17.3-3.2 5.5-2.2 10.2 2.6 15.1 4.5-4.8 5.7-9.4 2.8-15.1-3.6-7-2.3-11.7 1.9-17.5 4.4-6.1 1.7-11.6-9.9-17.3z"
      />
      <path
        fill="#5382A1"
        d="M32 72c0 22 14.3 32 32 32s32-10 32-32H32zm72 4c0-4.4 3.6-8 8-8s8 3.6 8 8-3.6 8-8 8h-8v-8z"
      />
    </svg>
  );
}

// 8. React (Official Cyan #61DAFB Atom)
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

// 9. Go (Official Cyan #00ADD8 Gopher Silhouette)
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

// 10. Docker (Official Blue #2496ED Whale)
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

// 11. Git (Official Orange #F03C2E Diamond + White Branch)
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

// 12. Linux (Official Yellow #FCC624 Tux Penguin)
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
