// This file tells Vite (our dev server) how to run the project
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()], // Enable React support
  server: {
    port: 3000,        // Run on http://localhost:3000
    open: true         // Auto-open browser when you run npm run dev
  }
})
