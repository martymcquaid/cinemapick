import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'node:path'

// Derive the project folder name so the base URL adapts automatically
// when this template is duplicated for other Chipify projects.
const projectId = path.basename(process.cwd())
const basePath = `/chipify/projects/${projectId}/preview`

export default defineConfig({
  base: basePath,
  plugins: [react()],
  css: {
    devSourcemap: true,
  },
  server: {
    port: 5246,
    host: true,
    strictPort: true,
    // Disable HMR to stop the preview iframe from reconnecting in environments
    // where websocket ports are blocked by the proxy (prevents infinite reloads).
    hmr: false,
  },
})
