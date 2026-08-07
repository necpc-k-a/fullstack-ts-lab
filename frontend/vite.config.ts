import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@shared': path.resolve(__dirname, '../shared'),
    }
  },
  server: {
    host: '0.0.0.0',
    port: 5173,
    strictPort: true, // 5173が使えない時に勝手に別ポートへ逃げるのを防ぐ
    watch: {
      usePolling: true, // WindowsのDockerマウント時、ホットリロードを確実に効かせる設定
    },
  },
});