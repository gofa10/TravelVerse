import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 5173,
    proxy: {
      '/storage': {
        target: 'http://localhost:8000',
        changeOrigin: true,
      },
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // React Core
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          // State Management
          'vendor-redux': ['@reduxjs/toolkit', 'react-redux'],
          // Material UI + Emotion
          'vendor-mui': ['@mui/material', '@mui/icons-material', '@emotion/react', '@emotion/styled'],
          // UI Components
          'vendor-bootstrap': ['bootstrap', 'react-bootstrap'],
          'vendor-mdb': ['mdb-react-ui-kit'],
          // Other heavy libraries
          'vendor-motion': ['framer-motion'],
          'vendor-icons': ['react-icons', 'lucide-react'],
          // Utils
          'vendor-utils': ['axios', 'react-toastify', 'react-hot-toast', 'react-i18next', 'i18next', 'styled-components'],
        }
      }
    },
    // Optional: Slightly increase warning limit to avoid annoyance if small chunks cross 500kb
    chunkSizeWarningLimit: 800,
  }
})
