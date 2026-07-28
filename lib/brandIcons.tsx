import React from 'react';
import * as SimpleIcons from 'simple-icons';
import {
  PythonLogo,
  JavaScriptLogo,
  TypeScriptLogo,
  HTML5Logo,
  CSS3Logo,
  MySQLLogo,
  JavaLogo,
  ReactLogo,
  GoLogo,
  DockerLogo,
  GitLogo,
  LinuxLogo,
} from './officialLogos';

export interface BrandIconConfig {
  title: string;
  renderLeftLogo: (isDark: boolean) => React.ReactNode;
  watermarkPath: string;
}

const GHIDRA_PATH =
  'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14.5v-9l6 4.5-6 4.5z';
const SQLMAP_PATH =
  'M4 3h16a1 1 0 011 1v4a1 1 0 01-1 1H4a1 1 0 01-1-1V4a1 1 0 011-1zm0 7h16a1 1 0 011 1v4a1 1 0 01-1 1H4a1 1 0 01-1-1v-4a1 1 0 011-1zm0 7h16a1 1 0 011 1v4a1 1 0 01-1 1H4a1 1 0 01-1-1v-4a1 1 0 011-1z';
const RADARE2_PATH =
  'M12 2L2 7v10l10 5 10-5V7L12 2zm0 2.8L19 8v8l-7 3.5L5 16V8l7-3.2zM9 10v4l6-2-6-2z';

const brandConfigMap: Record<string, BrandIconConfig> = {
  python: {
    title: 'Python',
    renderLeftLogo: () => <PythonLogo className="w-5 h-5 sm:w-6 sm:h-6" />,
    watermarkPath: SimpleIcons.siPython.path,
  },
  javascript: {
    title: 'JavaScript',
    renderLeftLogo: () => <JavaScriptLogo className="w-5 h-5 sm:w-6 sm:h-6" />,
    watermarkPath: SimpleIcons.siJavascript.path,
  },
  typescript: {
    title: 'TypeScript',
    renderLeftLogo: () => <TypeScriptLogo className="w-5 h-5 sm:w-6 sm:h-6" />,
    watermarkPath: SimpleIcons.siTypescript.path,
  },
  html5: {
    title: 'HTML5',
    renderLeftLogo: () => <HTML5Logo className="w-5 h-5 sm:w-6 sm:h-6" />,
    watermarkPath: SimpleIcons.siHtml5.path,
  },
  css3: {
    title: 'CSS3',
    renderLeftLogo: () => <CSS3Logo className="w-5 h-5 sm:w-6 sm:h-6" />,
    watermarkPath: SimpleIcons.siCss.path,
  },
  sql: {
    title: 'SQL',
    renderLeftLogo: () => <MySQLLogo className="w-5 h-5 sm:w-6 sm:h-6" />,
    watermarkPath: SimpleIcons.siMysql.path,
  },
  mysql: {
    title: 'MySQL',
    renderLeftLogo: () => <MySQLLogo className="w-5 h-5 sm:w-6 sm:h-6" />,
    watermarkPath: SimpleIcons.siMysql.path,
  },
  java: {
    title: 'Java',
    renderLeftLogo: () => <JavaLogo className="w-5 h-5 sm:w-6 sm:h-6" />,
    watermarkPath: SimpleIcons.siOpenjdk.path,
  },
  react: {
    title: 'React',
    renderLeftLogo: () => <ReactLogo className="w-5 h-5 sm:w-6 sm:h-6" />,
    watermarkPath: SimpleIcons.siReact.path,
  },
  go: {
    title: 'Go',
    renderLeftLogo: () => <GoLogo className="w-5 h-5 sm:w-6 sm:h-6" />,
    watermarkPath: SimpleIcons.siGo.path,
  },
  docker: {
    title: 'Docker',
    renderLeftLogo: () => <DockerLogo className="w-5 h-5 sm:w-6 sm:h-6" />,
    watermarkPath: SimpleIcons.siDocker.path,
  },
  git: {
    title: 'Git',
    renderLeftLogo: () => <GitLogo className="w-5 h-5 sm:w-6 sm:h-6" />,
    watermarkPath: SimpleIcons.siGit.path,
  },
  linux: {
    title: 'Linux',
    renderLeftLogo: () => <LinuxLogo className="w-5 h-5 sm:w-6 sm:h-6" />,
    watermarkPath: SimpleIcons.siLinux.path,
  },
  cplusplus: {
    title: 'C++',
    renderLeftLogo: () => (
      <svg viewBox="0 0 24 24" className="w-5 h-5 sm:w-6 sm:h-6 fill-[#00599C]">
        <path d={SimpleIcons.siCplusplus.path} />
      </svg>
    ),
    watermarkPath: SimpleIcons.siCplusplus.path,
  },
  c: {
    title: 'C',
    renderLeftLogo: () => (
      <svg viewBox="0 0 24 24" className="w-5 h-5 sm:w-6 sm:h-6 fill-[#A8B9CC]">
        <path d={SimpleIcons.siC.path} />
      </svg>
    ),
    watermarkPath: SimpleIcons.siC.path,
  },
  nextjs: {
    title: 'Next.js',
    renderLeftLogo: (isDark) => (
      <svg
        viewBox="0 0 24 24"
        className="w-5 h-5 sm:w-6 sm:h-6"
        style={{ fill: isDark ? '#FFFFFF' : '#000000' }}
      >
        <path d={SimpleIcons.siNextdotjs.path} />
      </svg>
    ),
    watermarkPath: SimpleIcons.siNextdotjs.path,
  },
  django: {
    title: 'Django REST',
    renderLeftLogo: (isDark) => (
      <svg
        viewBox="0 0 24 24"
        className="w-5 h-5 sm:w-6 sm:h-6"
        style={{ fill: isDark ? '#44B78B' : '#092E20' }}
      >
        <path d={SimpleIcons.siDjango.path} />
      </svg>
    ),
    watermarkPath: SimpleIcons.siDjango.path,
  },
  nodejs: {
    title: 'Node.js',
    renderLeftLogo: () => (
      <svg viewBox="0 0 24 24" className="w-5 h-5 sm:w-6 sm:h-6 fill-[#5FA04E]">
        <path d={SimpleIcons.siNodedotjs.path} />
      </svg>
    ),
    watermarkPath: SimpleIcons.siNodedotjs.path,
  },
  redis: {
    title: 'Redis',
    renderLeftLogo: () => (
      <svg viewBox="0 0 24 24" className="w-5 h-5 sm:w-6 sm:h-6 fill-[#FF4438]">
        <path d={SimpleIcons.siRedis.path} />
      </svg>
    ),
    watermarkPath: SimpleIcons.siRedis.path,
  },
  vercel: {
    title: 'Vercel',
    renderLeftLogo: (isDark) => (
      <svg
        viewBox="0 0 24 24"
        className="w-5 h-5 sm:w-6 sm:h-6"
        style={{ fill: isDark ? '#FFFFFF' : '#000000' }}
      >
        <path d={SimpleIcons.siVercel.path} />
      </svg>
    ),
    watermarkPath: SimpleIcons.siVercel.path,
  },
  search: {
    title: 'Meilisearch',
    renderLeftLogo: () => (
      <svg viewBox="0 0 24 24" className="w-5 h-5 sm:w-6 sm:h-6 fill-[#FF5CAA]">
        <path d={SimpleIcons.siMeilisearch.path} />
      </svg>
    ),
    watermarkPath: SimpleIcons.siMeilisearch.path,
  },
  'shield-check': {
    title: 'Clerk',
    renderLeftLogo: () => (
      <svg viewBox="0 0 24 24" className="w-5 h-5 sm:w-6 sm:h-6 fill-[#6C47FF]">
        <path d={SimpleIcons.siClerk.path} />
      </svg>
    ),
    watermarkPath: SimpleIcons.siClerk.path,
  },
  network: {
    title: 'Wireshark',
    renderLeftLogo: () => (
      <svg viewBox="0 0 24 24" className="w-5 h-5 sm:w-6 sm:h-6 fill-[#1679A7]">
        <path d={SimpleIcons.siWireshark.path} />
      </svg>
    ),
    watermarkPath: SimpleIcons.siWireshark.path,
  },
  'shield-alert': {
    title: 'Burp Suite',
    renderLeftLogo: () => (
      <svg viewBox="0 0 24 24" className="w-5 h-5 sm:w-6 sm:h-6 fill-[#FF6633]">
        <path d={SimpleIcons.siBurpsuite.path} />
      </svg>
    ),
    watermarkPath: SimpleIcons.siBurpsuite.path,
  },
  binary: {
    title: 'Ghidra',
    renderLeftLogo: () => (
      <svg viewBox="0 0 24 24" className="w-5 h-5 sm:w-6 sm:h-6 fill-[#EF4444]">
        <path d={GHIDRA_PATH} />
      </svg>
    ),
    watermarkPath: GHIDRA_PATH,
  },
  database: {
    title: 'SQLMap',
    renderLeftLogo: () => (
      <svg viewBox="0 0 24 24" className="w-5 h-5 sm:w-6 sm:h-6 fill-[#E11D48]">
        <path d={SQLMAP_PATH} />
      </svg>
    ),
    watermarkPath: SQLMAP_PATH,
  },
  terminal: {
    title: 'Radare2',
    renderLeftLogo: () => (
      <svg viewBox="0 0 24 24" className="w-5 h-5 sm:w-6 sm:h-6 fill-[#8B5CF6]">
        <path d={RADARE2_PATH} />
      </svg>
    ),
    watermarkPath: RADARE2_PATH,
  },
};

export function getBrandIconConfig(iconSlug: string): BrandIconConfig {
  return (
    brandConfigMap[iconSlug] || {
      title: 'Code',
      renderLeftLogo: () => (
        <svg viewBox="0 0 24 24" className="w-5 h-5 sm:w-6 sm:h-6 fill-[#4CB7FF]">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" />
        </svg>
      ),
      watermarkPath: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z',
    }
  );
}
