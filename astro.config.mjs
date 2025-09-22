import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://frankfurt-ai.de',
  integrations: [
    react(),
    tailwind()
  ],
  output: 'static',
  build: {
    assets: '_astro'
  },
  vite: {
    build: {
      rollupOptions: {
        output: {
          entryFileNames: `_astro/[name].[hash].js`,
          chunkFileNames: `_astro/[name].[hash].js`,
          assetFileNames: `_astro/[name].[hash].[ext]`
        }
      }
    },
    define: {
      __BUILD_TIME__: JSON.stringify(Date.now())
    }
  }
});
