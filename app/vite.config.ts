import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  // En build (prod) sirve bajo la subruta de GitHub Pages; en dev sirve en /.
  base: process.env.NODE_ENV === 'production' ? '/juan-pablos-first-project/' : '/',
  plugins: [react()],
});
