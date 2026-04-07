import {
  defineConfig,
  // loadEnv
} from 'vite'
import react from '@vitejs/plugin-react'
// import { nodePolyfills } from 'vite-plugin-node-polyfills'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // Load environment variables from .env files
  // const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [
      react(),
      tailwindcss(),
      // nodePolyfills({
      //   include: ['process'],
      //   globals: { global: true, process: true },
      // }),
    ],
    // define: {
    //   // Inject the loaded environment variables as process.env
    //   'process.env': env,
    //   // Optional: Define global if 'global is not defined' error also occurs
    //   global: {},
    // },
    resolve: {
      alias: {
        '~': '/src',
        '~pages': '/src/pages',
        '~components': '/src/components',
        '~utils': '/src/utils',
        '~redux': '/src/redux',
        '~assets': '/src/assets',
        '~hooks': '/src/hooks',
      },
    },
  }
})
