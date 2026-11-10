'use client';

import type { ComponentPropsWithoutRef } from 'react';
import { trackContactClick, trackProjectView, trackResumeDownload } from '@/lib/gtag';

type Event = { type: 'resume' } | { type: 'project' | 'contact'; label: string };

export function PortfolioLink({ event, ...props }: ComponentPropsWithoutRef<'a'> & { event: Event }) {
  return (
    <a
      {...props}
      onClick={() => {
        switch (event.type) {
          case 'resume':
            trackResumeDownload();
            break;
          case 'project':
            trackProjectView(event.label);
            break;
          case 'contact':
            trackContactClick(event.label);
            break;
        }
      }}
    />
  );
}
