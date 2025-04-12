// export default {
//   server: {
//     port: 3000,
//     open: true
//   },
//   build: {
//     outDir: 'dist',
//     assetsDir: 'assets'
//   },
//   resolve: {
//     alias: {
//       '/src': '/src'
//     }
//   }
// }
import { resolve } from "path";
import { defineConfig } from "vite";
export default defineConfig({
  root: "src/",
  build: {
    outDir: "../dist",
    rollupOptions: {
      input: {
        main: resolve(__dirname, "src/index.html"),
        about: resolve(__dirname, "src/pages/about.html"),
        favorites: resolve(__dirname, "src/pages/favorites.html"),
      },
    },
  },
});
