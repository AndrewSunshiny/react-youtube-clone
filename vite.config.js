import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { ViteAliases } from 'vite-aliases'

// https://vite.dev/config/
export default defineConfig({
  // esbuild: {
  //   loader: { '.js': 'jsx' },
  //   include: [/.*\.js$/],
  //   exclude: [],
  // },
  optimizeDeps: {
    rolldownOptions: {
      moduleTypes: { '.js': 'jsx' },
      include: [/.*\.js$/],
      exclude: [],
    },
  },
  plugins: [react(), tailwindcss(), ViteAliases()],
})
