import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import checker from 'vite-plugin-checker';
import typescriptPaths from 'vite-tsconfig-paths';

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
    envDir: '../',
    plugins: [
      react(),
      typescriptPaths(),
      checker({
        overlay: false,
        typescript: true,
      }),
    ],
    esbuild: {
      supported: {
        'top-level-await': true,
      },
    },
  };
});
