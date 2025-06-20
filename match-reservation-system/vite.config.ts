import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import { nodePolyfills } from 'vite-plugin-node-polyfills'
import path from 'path'

export default defineConfig(({ mode }) => {
  // 加载环境变量
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [
      vue(),
      nodePolyfills({
        include: ['crypto']
      })
    ],
    define: {
      'process.env': env,
      __VUE_OPTIONS_API__: true,
      __VUE_PROD_DEVTOOLS__: false
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
        crypto: 'crypto-browserify',
        stream: 'stream-browserify'
      },
      extensions: ['.mjs', '.js', '.mts', '.ts', '.jsx', '.tsx', '.json']
    },
    optimizeDeps: {
      include: ['crypto-js', 'vue', 'vue-router', 'pinia', 'element-plus', 'axios'],
      esbuildOptions: {
        target: 'es2020'
      }
    },
    build: {
      commonjsOptions: {
        transformMixedEsModules: true
      },
      target: 'esnext'
    },
    server: {
      port: 5175,
      strictPort: true,
      host: '127.0.0.1',
      open: true,
      cors: true,
      proxy: {
        // 配置代理，解决跨域问题
        '/api': {
          target: env.VITE_API_BASE_URL || 'http://localhost:3000',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, '')
        }
      },
      hmr: {
        overlay: true
      }
    },
    esbuild: {
      pure: process.env.NODE_ENV === 'production' ? ['console.log'] : undefined,
      supported: {
        'top-level-await': true
      }
    }
  }
}) 