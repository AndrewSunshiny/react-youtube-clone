import {
  defineConfig,
  // loadEnv
} from 'vite'
import react from '@vitejs/plugin-react'
// import { nodePolyfills } from 'vite-plugin-node-polyfills'
import tailwindcss from '@tailwindcss/vite'

import rsc from '@vitejs/plugin-rsc'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // Load environment variables from .env files
  // const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [
      react(),
      rsc(),
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
    environments: {
      // `rsc` environment loads modules with `react-server` condition.
      // this environment is responsible for:
      // - RSC stream serialization (React VDOM -> RSC stream)
      // - server functions handling
      rsc: {
        build: {
          rollupOptions: {
            input: {
              index: './src/framework/entry.rsc.tsx',
            },
          },
        },
      },

      // `ssr` environment loads modules without `react-server` condition.
      // this environment is responsible for:
      // - RSC stream deserialization (RSC stream -> React VDOM)
      // - traditional SSR (React VDOM -> HTML string/stream)
      ssr: {
        build: {
          rollupOptions: {
            input: {
              index: './src/framework/entry.ssr.tsx',
            },
          },
        },
      },

      // client environment is used for hydration and client-side rendering
      // this environment is responsible for:
      // - RSC stream deserialization (RSC stream -> React VDOM)
      // - traditional CSR (React VDOM -> Browser DOM tree mount/hydration)
      // - refetch and re-render RSC
      // - calling server functions
      client: {
        build: {
          rollupOptions: {
            input: {
              index: './src/framework/entry.browser.tsx',
            },
          },
        },
      },
    },
    resolve: {
      alias: {
        '~': '/src',
        '~pages': '/src/pages',
        '~components': '/src/components',
        '~utils': '/src/utils',
        '~redux': '/src/redux',
        '~assets': '/src/assets',
        '~hooks': '/src/hooks',
        '~framework': '/src/framework',
      },
    },
  }
})
