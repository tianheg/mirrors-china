import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { viteStaticCopy } from 'vite-plugin-static-copy'
import Components from 'unplugin-vue-components/vite'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  plugins: [
    vue(), process.env.NODE_ENV === 'production' && viteStaticCopy({
      targets: [
        {
          src: 'static/data.json',
          dest: 'static'
        }
      ]
    }),
    Components({
      resolvers: [AntDesignVueResolver()],
      dirs: ['src'],
    })
  ],
})
