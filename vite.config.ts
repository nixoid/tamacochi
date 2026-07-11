import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'Tamacochi',
        short_name: 'Tamacochi',
        description: 'A pocket-sized pixel pig pet.',
        theme_color: '#e99897',
        background_color: '#f8b9b4',
        display: 'standalone',
        icons: [
          { src: '/pig-icon.svg', sizes: 'any', type: 'image/svg+xml', purpose: 'any' },
          { src: '/pig-icon.svg', sizes: 'any', type: 'image/svg+xml', purpose: 'maskable' },
        ],
      },
    }),
  ],
})
