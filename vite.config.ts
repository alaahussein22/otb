import { fileURLToPath, URL } from "node:url";

import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  return {
    server: {
      watch: {
        usePolling: true,
      },
      host: "localhost", // needed for the Docker Container port mapping to work
      strictPort: true,
      port: Number(env.APP_PORT) || 80, // you can replace this port with any port
    },

    plugins: [vue()],
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
        "@assets": fileURLToPath(new URL("./src/assets", import.meta.url)),
        "@modules": fileURLToPath(new URL("./src/modules", import.meta.url)),
        "@cmp": fileURLToPath(new URL("./src/components", import.meta.url)),
        "@layouts": fileURLToPath(new URL("./src/layouts", import.meta.url)),
        "@router": fileURLToPath(new URL("./src/router", import.meta.url)),
        "@plugins": fileURLToPath(new URL("./src/plugins", import.meta.url)),
        "@composables": fileURLToPath(
          new URL("./src/composables", import.meta.url)
        ),
        "@interfaces": fileURLToPath(
          new URL("./src/interfaces", import.meta.url)
        ),
      },
    },
  };
});
