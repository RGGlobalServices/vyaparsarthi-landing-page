'use client';

import { useCallback, useEffect, useRef } from 'react';
import { config } from '@/lib/config';
import { storeAuth, redirectAfterAuth } from '@/lib/auth';

declare global {
  interface Window { google?: any }
}

// Renders Google's "Sign in with Google" button (Google Identity Services).
// On success it exchanges the id_token at the app's /auth/google endpoint for
// the app JWT, stores it like the email login does, and redirects. Renders
// nothing when NEXT_PUBLIC_GOOGLE_CLIENT_ID isn't configured.
export default function GoogleSignInButton() {
  const ref = useRef<HTMLDivElement>(null);

  const handleCredential = useCallback(async (response: { credential?: string }) => {
    if (!response?.credential) return;
    try {
      const res = await fetch(`${config.API_BASE}/auth/google`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ credential: response.credential }),
      });
      if (!res.ok) {
        const e = await res.json().catch(() => ({}));
        throw new Error(e.detail || 'Google sign-in failed');
      }
      const data = await res.json();
      storeAuth(data);
      redirectAfterAuth('/');
    } catch (err) {
      alert((err as Error).message || 'Google sign-in failed');
    }
  }, []);

  useEffect(() => {
    if (!config.GOOGLE_CLIENT_ID) return;
    function init() {
      if (!window.google || !ref.current) return;
      window.google.accounts.id.initialize({ client_id: config.GOOGLE_CLIENT_ID, callback: handleCredential });
      window.google.accounts.id.renderButton(ref.current, {
        theme: 'outline', size: 'large', text: 'continue_with', shape: 'pill', width: 320,
      });
    }
    if (window.google) { init(); return; }
    const existing = document.getElementById('gsi-client');
    if (existing) { existing.addEventListener('load', init); return; }
    const s = document.createElement('script');
    s.src = 'https://accounts.google.com/gsi/client';
    s.async = true; s.defer = true; s.id = 'gsi-client';
    s.onload = init;
    document.head.appendChild(s);
  }, [handleCredential]);

  if (!config.GOOGLE_CLIENT_ID) return null;
  return <div ref={ref} className="flex justify-center" />;
}
