import fs from 'fs';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig, type Plugin} from 'vite';

function spaRouteHtmlPlugin(): Plugin {
  return {
    name: 'spa-route-html-fallback',
    closeBundle() {
      const distDir = path.resolve(__dirname, 'dist');
      const indexHtmlPath = path.join(distDir, 'index.html');
      if (!fs.existsSync(indexHtmlPath)) return;

      const baseHtml = fs.readFileSync(indexHtmlPath, 'utf-8');

      const routeOutputs: Array<{outPath: string; title?: string}> = [
        {
          outPath: path.join(distDir, 'privacy-policy', 'index.html'),
          title: 'SiftMates - Privacy Policy',
        },
        {
          outPath: path.join(distDir, 'privacy-policy.html'),
          title: 'SiftMates - Privacy Policy',
        },
        {
          outPath: path.join(distDir, 'terms-and-conditions', 'index.html'),
          title: 'SiftMates - Terms & Conditions',
        },
        {
          outPath: path.join(distDir, 'terms-and-conditions.html'),
          title: 'SiftMates - Terms & Conditions',
        },
        {
          outPath: path.join(distDir, '404.html'),
        },
      ];

      for (const route of routeOutputs) {
        fs.mkdirSync(path.dirname(route.outPath), {recursive: true});
        const html = route.title
          ? baseHtml.replace(/<title>.*?<\/title>/, `<title>${route.title}</title>`)
          : baseHtml;
        fs.writeFileSync(route.outPath, html, 'utf-8');
      }
    },
  };
}

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), spaRouteHtmlPlugin()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
