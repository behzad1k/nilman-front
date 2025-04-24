// Add a version number that you increment with each significant update
import { APP_VERSION, CACHE_NAME } from './config/app-version';
// List of assets to cache
const urlsToCache = [
  // Core HTML, JS, and CSS
  '/',
  '/index.html',
  '/static/js/main.js',
  '/static/js/bundle.js',
  '/static/js/vendors~main.chunk.js',
  '/static/js/main.chunk.js',
  '/static/css/main.css',
  '/static/css/main.chunk.css',

  // PWA essentials
  '/manifest.json',
  '/favicon.ico',

  // App shell components
  '/static/media/logo.png',
  '/static/media/background.jpg',

  // Fonts
  '/static/fonts/roboto.woff2',
  '/static/fonts/material-icons.woff2',

  // Critical third-party resources
  'https://fonts.googleapis.com/css?family=Roboto:300,400,500&display=swap',

  // Offline fallback page
  '/offline.html',

  // Common API responses (if they don't change frequently)
  '/api/static-content.json',

  // Common images
  '/static/media/avatar-placeholder.png',
  '/static/media/error-image.svg',
  '/static/media/loading-spinner.gif',

  // App icons
  '/static/icons/icon-72x72.png',
  '/static/icons/icon-96x96.png',
  '/static/icons/icon-128x128.png',
  '/static/icons/icon-144x144.png',
  '/static/icons/icon-152x152.png',
  '/static/icons/icon-192x192.png',
  '/static/icons/icon-384x384.png',
  '/static/icons/icon-512x512.png',

  // Splash screens
  '/static/splashscreens/iphone5_splash.png',
  '/static/splashscreens/iphone6_splash.png',
  '/static/splashscreens/iphoneplus_splash.png',
  '/static/splashscreens/iphonex_splash.png',
  '/static/splashscreens/ipad_splash.png',
  '/static/splashscreens/ipadpro1_splash.png',
  '/static/splashscreens/ipadpro2_splash.png',
]


// Install event - cache initial assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
    .then((cache) => {
      return cache.addAll(urlsToCache);
    })
    .then(() => {
      // Force the waiting service worker to become active
      return self.skipWaiting();
    })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            // Delete old caches
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      // Take control of all clients immediately
      return self.clients.claim();
    })
  );
});

// Fetch event - network first, fallback to cache
self.addEventListener('fetch', (event) => {
  event.respondWith(
    fetch(event.request)
    .then((response) => {
      // Clone the response to store in cache
      const responseToCache = response.clone();

      caches.open(CACHE_NAME)
      .then((cache) => {
        // Only cache successful responses
        if (event.request.method === 'GET' && response.status === 200) {
          cache.put(event.request, responseToCache);
        }
      });

      return response;
    })
    .catch(() => {
      // If network fails, try to serve from cache
      return caches.match(event.request);
    })
  );
});

// Listen for messages from the client
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
