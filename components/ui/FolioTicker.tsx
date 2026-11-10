'use client';

import { useState } from 'react';

const topics = ['Chennai, India', 'Full-stack development', 'Security assessment', 'Applied research'];

export function FolioTicker() {
  const [paused, setPaused] = useState(false);

  return (
    <div className="folio-ticker" data-paused={paused}>
      <div className="ticker-window" aria-hidden="true">
        <div className="ticker-track folio-label">
          {[0, 1].map((copy) => (
            <div className="ticker-strip" key={copy}>
              {topics.map((topic) => (
                <span key={topic}>✳ <span>{topic}</span></span>
              ))}
            </div>
          ))}
        </div>
      </div>
      <button
        className="ticker-toggle"
        type="button"
        aria-label={paused ? 'Play ticker' : 'Pause ticker'}
        onClick={() => setPaused(!paused)}
      >
        {paused ? 'Play' : 'Pause'}
      </button>
    </div>
  );
}
