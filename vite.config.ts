import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    rollupOptions: {
      input: './index.html', // This should point to your HTML file in the root directory
    },
    assetsDir: 'assets', // Ensure assets are placed in the 'assets' folder
  },
});
