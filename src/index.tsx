import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter as Router} from 'react-router-dom';
import App from './App';
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <Router>
      <App />
    </Router>
);

interface ServiceWorkerConfig {
  onUpdate: (registration: ServiceWorkerRegistration) => void;
}

// Register the service worker with custom options
serviceWorkerRegistration.register({
  onUpdate: (registration: ServiceWorkerRegistration) => {
    // This callback is triggered when a new service worker has been installed
    const waitingServiceWorker: ServiceWorker | null = registration.waiting;

    if (waitingServiceWorker) {
      waitingServiceWorker.addEventListener('statechange', (event: Event) => {
        const target = event.target as ServiceWorker;
        if (target.state === 'activated') {
          window.location.reload();
        }
      });

      waitingServiceWorker.postMessage({ type: 'SKIP_WAITING' });
    }
  }
} as ServiceWorkerConfig);