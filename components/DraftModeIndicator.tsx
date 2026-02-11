'use client';

import { useEffect, useState } from 'react';

export default function DraftModeIndicator() {
  const [draftMode, setDraftMode] = useState<boolean | null>(null);

  useEffect(() => {
    const cookies = document.cookie.split(';');
    const hasDraftCookie = cookies.some((cookie) =>
      cookie.trim().startsWith('__prerender_bypass='),
    );
    setDraftMode(hasDraftCookie);

    console.log('Draft Mode Indicator - Cookie check:', hasDraftCookie);
    console.log('All cookies:', document.cookie);
  }, []);

  if (draftMode === null) return null;

  if (!draftMode) {
    return (
      <div
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          background: '#ef4444',
          color: 'white',
          padding: '12px 20px',
          borderRadius: '8px',
          fontSize: '14px',
          fontWeight: 'bold',
          zIndex: 9999,
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
        }}
      >
        ❌ Draft Mode: DISABLED
      </div>
    );
  }

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        background: '#10b981',
        color: 'white',
        padding: '12px 20px',
        borderRadius: '8px',
        fontSize: '14px',
        fontWeight: 'bold',
        zIndex: 9999,
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
      }}
    >
      ✅ Draft Mode: ENABLED
      <a
        href="/api/draft-mode/disable"
        style={{
          marginLeft: '12px',
          color: 'white',
          textDecoration: 'underline',
          cursor: 'pointer',
        }}
      >
        Disable
      </a>
    </div>
  );
}
