import React from 'react';
import * as SimpleIcons from 'simple-icons';
import {
  ClerkLogo,
  GhidraLogo,
  SqlmapLogo,
  Radare2Logo,
} from './officialLogos';

export interface BrandIconConfig {
  title: string;
  renderLeftLogo: (isDark: boolean) => React.ReactNode;
  watermarkPath: string;
  getWatermarkColor: (isDark: boolean) => string;
  viewBox?: string;
}

const GHIDRA_PATH =
  'M250 14c-130 0-236 106-236 236s106 236 236 236 236-106 236-236S380 14 250 14zm-20 446c-115 0-210-85-210-200 0-75 40-130 100-165 35 45 75 60 120 40-45 45-30 95-20 120 40 20 80 0 110-35 25 45 15 90-25 120 60-25 80-70 65-130 35 65 15 115-5 165-35 50-85 80-150 80z';
const SQLMAP_PATH =
  'M20 70h40v40H20V70zm40 0h40v40H60V70zm80 0h40v40h-40V70zm40 0h40v40h-40V70zm40 0h40v40h-40V70zM120 30h30M135 30v110M120 140h30';
const RADARE2_PATH =
  'M45 43c-12 0-22 10-22 22s10 22 22 22h17v45h38V43H45zm130 2l-60 37 60 38V45zm80 0l-60 37 60 38V45z';

// Helper to render consistent official SVG path for both left box & right watermark
function createStandardBrandConfig(
  title: string,
  path: string,
  colorFn: (isDark: boolean) => string,
  customRender?: (isDark: boolean) => React.ReactNode,
  viewBox = '0 0 24 24'
): BrandIconConfig {
  return {
    title,
    watermarkPath: path,
    getWatermarkColor: colorFn,
    viewBox,
    renderLeftLogo: (isDark: boolean) =>
      customRender ? (
        customRender(isDark)
      ) : (
        <svg
          viewBox={viewBox}
          className="w-5 h-5 sm:w-6 sm:h-6"
          style={{ fill: colorFn(isDark) }}
        >
          <path d={path} />
        </svg>
      ),
  };
}

const brandConfigMap: Record<string, BrandIconConfig> = {
  python: createStandardBrandConfig('Python', SimpleIcons.siPython.path, () => '#3776AB'),
  javascript: createStandardBrandConfig('JavaScript', SimpleIcons.siJavascript.path, () => '#F7DF1E'),
  typescript: createStandardBrandConfig('TypeScript', SimpleIcons.siTypescript.path, () => '#3178C6'),
  html5: createStandardBrandConfig('HTML5', SimpleIcons.siHtml5.path, () => '#E34F26'),
  css3: createStandardBrandConfig('CSS3', SimpleIcons.siCss.path, () => '#1572B6'),
  sql: createStandardBrandConfig('SQL', SimpleIcons.siMysql.path, () => '#4479A1'),
  mysql: createStandardBrandConfig('MySQL', SimpleIcons.siMysql.path, () => '#4479A1'),
  java: createStandardBrandConfig('Java', SimpleIcons.siOpenjdk.path, () => '#E76F00'),
  react: createStandardBrandConfig('React', SimpleIcons.siReact.path, () => '#61DAFB'),
  go: createStandardBrandConfig('Go', SimpleIcons.siGo.path, () => '#00ADD8'),
  docker: createStandardBrandConfig('Docker', SimpleIcons.siDocker.path, () => '#2496ED'),
  git: createStandardBrandConfig('Git', SimpleIcons.siGit.path, () => '#F03C2E'),
  linux: createStandardBrandConfig('Linux', SimpleIcons.siLinux.path, () => '#FCC624'),
  cplusplus: createStandardBrandConfig('C++', SimpleIcons.siCplusplus.path, () => '#00599C'),
  nextjs: createStandardBrandConfig('Next.js', SimpleIcons.siNextdotjs.path, (isDark) =>
    isDark ? '#FFFFFF' : '#000000'
  ),
  django: createStandardBrandConfig('Django REST', SimpleIcons.siDjango.path, (isDark) =>
    isDark ? '#44B78B' : '#092E20'
  ),
  nodejs: createStandardBrandConfig('Node.js', SimpleIcons.siNodedotjs.path, () => '#5FA04E'),
  redis: createStandardBrandConfig('Redis', SimpleIcons.siRedis.path, () => '#FF4438'),
  vercel: createStandardBrandConfig('Vercel', SimpleIcons.siVercel.path, (isDark) =>
    isDark ? '#FFFFFF' : '#000000'
  ),
  search: createStandardBrandConfig('Meilisearch', SimpleIcons.siMeilisearch.path, () => '#FF2E93'),
  'shield-check': createStandardBrandConfig('Clerk', SimpleIcons.siClerk.path, () => '#6C47FF', (isDark) => <ClerkLogo className="w-5 h-5 sm:w-6 sm:h-6" isDark={isDark} />),
  network: createStandardBrandConfig('Wireshark', SimpleIcons.siWireshark.path, () => '#1679A7'),
  'shield-alert': createStandardBrandConfig('Burp Suite', SimpleIcons.siBurpsuite.path, () => '#FF6633'),
  binary: createStandardBrandConfig('Ghidra', GHIDRA_PATH, () => '#EF4444', () => <GhidraLogo className="w-5 h-5 sm:w-6 sm:h-6" />, '0 0 500 500'),
  database: createStandardBrandConfig('SQLMap', SQLMAP_PATH, () => '#EAB308', () => <SqlmapLogo className="w-5 h-5 sm:w-6 sm:h-6" />, '0 0 320 160'),
  terminal: createStandardBrandConfig('Radare2', RADARE2_PATH, (isDark) => isDark ? '#FFFFFF' : '#111827', (isDark) => <Radare2Logo className="w-5 h-5 sm:w-6 sm:h-6" isDark={isDark} />, '0 0 300 160'),
};

export function getBrandIconConfig(iconSlug: string): BrandIconConfig {
  return (
    brandConfigMap[iconSlug] ||
    createStandardBrandConfig('Code', 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z', () => '#4CB7FF')
  );
}
