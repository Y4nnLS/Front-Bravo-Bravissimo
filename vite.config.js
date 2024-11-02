/** @type {import('vite').UserConfig} */
import { resolve } from "path";
import tailwindcss, { postcss } from "tailwindcss";

export default {
  root: './src',
  css: {
    postcss: {
      plugins: [tailwindcss()]
    }
  },
  pages: {
    '/': {
      entry: 'src/index.html'
    },
    '/historia': {
      entry: 'src/historia.html'
    },
    '/cardapio': {
      entry: 'src/cardapio.html'
    }
  },
  build: {
    outDir: '../dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, "./src/index.html"),
        historia: resolve(__dirname, "./src/historia.html"),
        cardapio: resolve(__dirname, "./src/cardapio.html")
      }
    }
  }
}