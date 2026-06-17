'use client';

import { useEffect } from 'react';
import { appUrl } from '@/lib/config';

// Auth lives on the app domain (app.<domain>). The landing "Start Free Trial"
// forwards to the app's signup page so the account + token are created on the
// correct origin and the user lands in the dashboard.
export default function RegisterRedirect() {
  useEffect(() => {
    window.location.replace(appUrl('/en/signup'));
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center text-slate-400">
      Redirecting to sign up…
    </div>
  );
}
