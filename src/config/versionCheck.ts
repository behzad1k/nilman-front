import { APP_VERSION } from './app-version';

export interface UpdateInfo {
  isUpdateAvailable: boolean;
  currentVersion: string;
  clientVersion: string;
}

export const checkForUpdates = (): Promise<UpdateInfo> => {
  return new Promise((resolve, reject) => {
    if (!('serviceWorker' in navigator) || !navigator.serviceWorker.controller) {
      resolve({
        isUpdateAvailable: false,
        currentVersion: APP_VERSION,
        clientVersion: APP_VERSION
      });
      return;
    }

    // Create a message channel
    const messageChannel = new MessageChannel();

    // Set a timeout to reject the promise if we don't get a response
    const timeoutId = setTimeout(() => {
      reject(new Error('Service worker did not respond'));
    }, 3000);

    // Set up the message handler
    messageChannel.port1.onmessage = (event) => {
      clearTimeout(timeoutId);

      if (event.data && event.data.type === 'UPDATE_AVAILABLE') {
        console.log(`Version check: Client version ${event.data.clientVersion}, Current version ${event.data.currentVersion}`);
        resolve({
          isUpdateAvailable: event.data.isUpdateAvailable,
          currentVersion: event.data.currentVersion,
          clientVersion: event.data.clientVersion
        });
      } else {
        resolve({
          isUpdateAvailable: false,
          currentVersion: APP_VERSION,
          clientVersion: APP_VERSION
        });
      }
    };

    // Send a message to the service worker to check the version
    navigator.serviceWorker.controller.postMessage(
      {
        type: 'CHECK_VERSION',
        version: APP_VERSION
      },
      [messageChannel.port2]
    );
  });
};

// Helper function to update the service worker
export const updateServiceWorker = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (!('serviceWorker' in navigator)) {
      reject(new Error('Service worker not supported'));
      return;
    }

    navigator.serviceWorker.ready
    .then((registration) => {
      if (registration.waiting) {
        // If there's a waiting service worker, activate it
        registration.waiting.postMessage({ type: 'SKIP_WAITING' });

        // Listen for controllerchange event to know when the new service worker takes over
        const onControllerChange = () => {
          navigator.serviceWorker.removeEventListener('controllerchange', onControllerChange);
          window.location.reload();
          resolve();
        };

        navigator.serviceWorker.addEventListener('controllerchange', onControllerChange);
      } else {
        // Check for updates
        registration.update()
        .then(() => {
          if (registration.waiting) {
            registration.waiting.postMessage({ type: 'SKIP_WAITING' });

            const onControllerChange = () => {
              navigator.serviceWorker.removeEventListener('controllerchange', onControllerChange);
              window.location.reload();
              resolve();
            };

            navigator.serviceWorker.addEventListener('controllerchange', onControllerChange);
          } else {
            resolve();
          }
        })
        .catch(reject);
      }
    })
    .catch(reject);
  });
};
