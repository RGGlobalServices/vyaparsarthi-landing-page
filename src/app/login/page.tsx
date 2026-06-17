'use client';

import { useEffect } from 'react';
import { appUrl } from '@/lib/config';

// Auth lives on the app domain (app.<domain>), where the token is stored on the
// correct origin and the dashboard is served. The landing page only markets the
// product, so /login just forwards to the app's login page.
export default function LoginRedirect() {
  useEffect(() => {
    window.location.replace(appUrl('/en/login'));
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center text-slate-400">
      Redirecting to sign in…
    </div>
  );
}
