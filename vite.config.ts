import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@/images': '/src/assets',
      '@/components': '/src/components',
      '@/hooks': '/src/hooks',
      '@/pages': '/src/pages',
      '@/services': '/src/services',
    },
  },
});
