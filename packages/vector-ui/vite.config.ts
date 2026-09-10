import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dts from "vite-plugin-dts";
import { libInjectCss } from "vite-plugin-lib-inject-css";
import { resolve } from "node:path";
import { globSync } from "node:fs";

const tsEntries = globSync("src/**/index.ts", { exclude: ["src/test/**"] }).map((file) =>
    resolve(import.meta.dirname, file),
);
const cssEntries = globSync("src/theme/*.css").map((file) => resolve(import.meta.dirname, file));

const entries = [...tsEntries, ...cssEntries];

export default defineConfig({
    server: { open: true, port: 4444 },
    plugins: [
        react(),
        libInjectCss(),
        dts({
            include: ["src"],
            exclude: ["src/**/*.test.*", "src/App.tsx", "src/main.tsx", "src/test/**"],
        }),
    ],

    resolve: {
        alias: {
            "@types": resolve(import.meta.dirname, "./src/types"),
        },
    },
    build: {
        copyPublicDir: false,
        lib: { entry: entries, formats: ["es"] },
        rollupOptions: {
            external: ["react", "react-dom", "react/jsx-runtime"],
            output: {
                preserveModules: true,
                preserveModulesRoot: "src",
                entryFileNames: (chunkInfo) => {
                    const name = chunkInfo.name.split("?")[0];
                    return `${name}.js`;
                },
                assetFileNames: "[name][extname]",
            },
        },
    },
});
