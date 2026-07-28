import * as SimpleIcons from 'simple-icons';

export interface BrandIconData {
  title: string;
  path: string;
  brandColor: string; // Official brand color
  darkAdaptiveColor?: string; // Color override in dark mode if default color is black/very dark
}

// Custom SVG path definitions for security tools not present in simple-icons
const GHIDRA_PATH =
  'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14.5v-9l6 4.5-6 4.5z';
const SQLMAP_PATH =
  'M4 3h16a1 1 0 011 1v4a1 1 0 01-1 1H4a1 1 0 01-1-1V4a1 1 0 011-1zm0 7h16a1 1 0 011 1v4a1 1 0 01-1 1H4a1 1 0 01-1-1v-4a1 1 0 011-1zm0 7h16a1 1 0 011 1v4a1 1 0 01-1 1H4a1 1 0 01-1-1v-4a1 1 0 011-1z';
const RADARE2_PATH =
  'M12 2L2 7v10l10 5 10-5V7L12 2zm0 2.8L19 8v8l-7 3.5L5 16V8l7-3.2zM9 10v4l6-2-6-2z';

// Brand icon mapping key dictionary
const brandMap: Record<string, { iconObj?: { title: string; path: string; hex: string }; custom?: BrandIconData }> = {
  python: { iconObj: SimpleIcons.siPython },
  go: { iconObj: SimpleIcons.siGo },
  java: { iconObj: SimpleIcons.siOpenjdk },
  cplusplus: { iconObj: SimpleIcons.siCplusplus },
  c: { iconObj: SimpleIcons.siC },
  javascript: { iconObj: SimpleIcons.siJavascript },
  typescript: { iconObj: SimpleIcons.siTypescript },
  html5: { iconObj: SimpleIcons.siHtml5 },
  css3: { iconObj: SimpleIcons.siCss },
  sql: { iconObj: SimpleIcons.siMysql },
  react: { iconObj: SimpleIcons.siReact },
  nextjs: { iconObj: SimpleIcons.siNextdotjs },
  django: { iconObj: SimpleIcons.siDjango },
  nodejs: { iconObj: SimpleIcons.siNodedotjs },
  mysql: { iconObj: SimpleIcons.siMysql },
  redis: { iconObj: SimpleIcons.siRedis },
  docker: { iconObj: SimpleIcons.siDocker },
  git: { iconObj: SimpleIcons.siGit },
  linux: { iconObj: SimpleIcons.siLinux },
  vercel: { iconObj: SimpleIcons.siVercel },
  search: { iconObj: SimpleIcons.siMeilisearch },
  'shield-check': { iconObj: SimpleIcons.siClerk },
  network: { iconObj: SimpleIcons.siWireshark },
  'shield-alert': { iconObj: SimpleIcons.siBurpsuite },
  binary: {
    custom: {
      title: 'Ghidra',
      path: GHIDRA_PATH,
      brandColor: '#EF4444',
      darkAdaptiveColor: '#F87171',
    },
  },
  database: {
    custom: {
      title: 'SQLMap',
      path: SQLMAP_PATH,
      brandColor: '#E11D48',
      darkAdaptiveColor: '#FB7185',
    },
  },
  terminal: {
    custom: {
      title: 'Radare2',
      path: RADARE2_PATH,
      brandColor: '#8B5CF6',
      darkAdaptiveColor: '#A78BFA',
    },
  },
};

export function getBrandIconData(iconSlug: string, isDark: boolean): BrandIconData {
  const entry = brandMap[iconSlug];

  if (entry?.custom) {
    return {
      title: entry.custom.title,
      path: entry.custom.path,
      brandColor: isDark && entry.custom.darkAdaptiveColor ? entry.custom.darkAdaptiveColor : entry.custom.brandColor,
    };
  }

  if (entry?.iconObj) {
    const icon = entry.iconObj;
    let color = `#${icon.hex}`;

    // Override official color for special cases
    if (iconSlug === 'css3') {
      color = '#1572B6'; // Official CSS3 Blue
    } else if (iconSlug === 'java') {
      color = '#E76F00'; // Official Java Orange
    }

    // Adaptive Theme Handling for Dark Icons (e.g. Next.js, Vercel, Django)
    if (icon.hex === '000000' || icon.hex === '092E20') {
      if (isDark) {
        color = iconSlug === 'django' ? '#44B78B' : '#FFFFFF';
      } else {
        color = iconSlug === 'django' ? '#092E20' : '#000000';
      }
    }

    return {
      title: icon.title,
      path: icon.path,
      brandColor: color,
    };
  }

  // Fallback default
  return {
    title: 'Code',
    path: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z',
    brandColor: isDark ? '#4CB7FF' : '#0284C7',
  };
}
