import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // 禁用 Vite 缓存
  server: {
    watch: {
      usePolling: true, // 强制开启文件监听
      ignored: [
        '!**/.vite/**',
        '!**/.vite-dev/**',
        '!**/.vite-test/**',
        '!**/.vite-test-dev/**',
        '!**/node_modules/**',
      ],
      hmr: {
        overlay: true,
      },
      cache: false,
    },
  },
});
