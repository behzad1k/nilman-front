import { useState, useEffect } from 'react';

export const useInstallPrompt = () => {
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    const hasUserDismissed = localStorage.getItem('installPromptDismissed');
    let isInstalled = false;

    window.addEventListener('beforeinstallprompt', (e) => {
      isInstalled = false;
    });

    window.addEventListener('appinstalled', (e) => {
      isInstalled = true;
    });

    if (!hasUserDismissed && !isInstalled) {
      setShowPrompt(true);
    }
  }, []);

  const dismissPrompt = () => {
    localStorage.setItem('installPromptDismissed', 'true');
    setShowPrompt(false);
  };

  return { showPrompt, dismissPrompt };
};
