import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig(() => ({
    server: {
        port: 5173,
        // Fail loudly if 5173 is taken instead of silently moving to 5174,
        // which the backend's CORS / Socket.IO origin list would reject.
        strictPort: true,
    },
    plugins: [react(), tailwindcss()],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
    },
}));