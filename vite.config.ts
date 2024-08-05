import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import checker from 'vite-plugin-checker';
import typescriptPaths from 'vite-tsconfig-paths';
import svgr from 'vite-plugin-svgr';

// https://vitejs.dev/config/
export default defineConfig(() => {
  return {
    server: {
      port: 3000,
      strictPort: true,
      proxy: {
        '/api': {
          target: 'https://localhost:5000',
          changeOrigin: true,
          secure: false,
          rewrite: path => path.replace('/api', ''),
        },
      },
    },
    plugins: [
      react(),
      typescriptPaths(),
      checker({
        overlay: false,
        typescript: {
          tsconfigPath: './tsconfig.app.json',
        },
      }),
      svgr(),
    ],
    esbuild: {
      supported: {
        'top-level-await': true,
      },
    },
  };
});
