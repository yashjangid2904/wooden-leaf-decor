import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // Allow access from ngrok tunnels
    allowedHosts: ['.ngrok-free.dev']
  }
})

