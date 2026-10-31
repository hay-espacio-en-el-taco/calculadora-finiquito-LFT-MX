import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig({
  // GitHub Pages publica el sitio en /<nombre-del-repositorio>/
  base: '/calculadora-finiquito-LFT-MX/',
  plugins: [react(), tailwindcss()],
});
