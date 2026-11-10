'use client';

import { useSyncExternalStore } from 'react';
import { useTheme } from 'next-themes';

const subscribe = () => () => {};

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useSyncExternalStore(subscribe, () => true, () => false);
  const isDark = mounted && resolvedTheme === 'dark';

  return (
    <button
      type="button"
      className="theme-toggle"
      aria-label="Dark theme"
      aria-pressed={isDark}
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
    >
      <span className="theme-symbol" aria-hidden="true">◐</span>
      <span>{isDark ? 'Paper' : 'Ink'}</span>
    </button>
  );
}
