import { useState, useEffect } from 'react';

export const useInstallPrompt = (expirationDays = 7) => {
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    const checkMobileAndInstallation = () => {
      const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
      // @ts-ignore
      const isInstalled = window.matchMedia('(display-mode: standalone)').matches || (window.navigator && window.navigator.standalone && window.navigator.standalone === true);
      const dismissedTimestamp = localStorage.getItem('installPromptDismissedAt');

      if (!isMobile || isInstalled) {
        setShowPrompt(false);
        return;
      }

      if (dismissedTimestamp) {
        const dismissedDate = new Date(parseInt(dismissedTimestamp));
        const expirationDate = new Date(dismissedDate.getTime() + (expirationDays * 24 * 60 * 60 * 1000));

        setShowPrompt(new Date() > expirationDate);
      } else {
        setShowPrompt(true);
      }
    };

    checkMobileAndInstallation();

    window.addEventListener('beforeinstallprompt', checkMobileAndInstallation);
    window.addEventListener('appinstalled', () => setShowPrompt(false));

    return () => {
      window.removeEventListener('beforeinstallprompt', checkMobileAndInstallation);
    };
  }, [expirationDays]);

  const dismissPrompt = () => {
    localStorage.setItem('installPromptDismissedAt', Date.now().toString());
    setShowPrompt(false);
  };

  return { showPrompt, dismissPrompt };
};