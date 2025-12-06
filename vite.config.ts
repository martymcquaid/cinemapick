import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/chipify/projects/dec66884-07bf-449e-aae5-0fa25bda5b6e/preview',
  plugins: [react()],
  css: {
    // Ensure CSS is processed and injected correctly
    devSourcemap: true,
  },
  server: {
    port: 5246,
    host: true,
    strictPort: true,
    hmr: {
      // HMR will be proxied through our backend
      port: 5246,
    },
  },
})
