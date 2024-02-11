import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import viteTsconfigPaths from "vite-tsconfig-paths"
import biomePlugin from 'vite-plugin-biome';
export default defineConfig({
  // depending on your application, base can also be "/"
  build: {
    outDir: "build",
  },
  base: "/",
  plugins: [
    react(),
    biomePlugin(),
    viteTsconfigPaths(),
  ],
  server: {
    // this ensures that the browser opens upon server start
    open: true,
    // this sets a default port to 3000
    port: 3000,
  },
  resolve: {
    alias:{
      '@cpages': '/src/pages/contable',
      '@clpages' : '/src/pages/cliente',
      
    }
  }
})
