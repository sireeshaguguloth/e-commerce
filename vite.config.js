import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // Makes the Spring Boot API look same-origin to the browser during development,
    // so the httpOnly refresh cookie is stored and returned without CORS or
    // SameSite getting in the way. Requires the backend running on port 8081.
    proxy: {
      '/api': {
        target: 'http://localhost:8081',
        changeOrigin: true,
      },
    },
  },
})
