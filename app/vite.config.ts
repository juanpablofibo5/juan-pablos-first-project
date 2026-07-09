import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  // Producción canónica (Vercel, dominio propio) sirve en /; el espejo de
  // GitHub Pages sigue bajo su subruta; dev sirve en /. Vercel define VERCEL=1.
  base: process.env.VERCEL
    ? '/'
    : process.env.NODE_ENV === 'production'
      ? '/juan-pablos-first-project/'
      : '/',
  plugins: [react()],
});
