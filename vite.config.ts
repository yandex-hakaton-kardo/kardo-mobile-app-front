import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import checker from 'vite-plugin-checker';
import typescriptPaths from 'vite-tsconfig-paths';
import svgr from 'vite-plugin-svgr';

// https://vitejs.dev/config/
export default defineConfig(() => {
  const port = Number(import.meta.env?.FRONT_PORT ?? 3000);
  const host = import.meta.env?.FRONT_HOST ?? 'http://localhost:5000';

  return {
    server: {
      port,
      strictPort: true,
      proxy: {
        '/api': { target: host },
      },
    },
    envPrefix: 'FRONT_',
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
