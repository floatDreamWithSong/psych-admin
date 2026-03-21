import { defineConfig } from "vite";
import { devtools } from "@tanstack/devtools-vite";
import tsconfigPaths from "vite-tsconfig-paths";
import viteReact from "@vitejs/plugin-react";
import { tanstackRouter } from "@tanstack/router-plugin/vite";
import tailwindcss from "@tailwindcss/vite";
import { fileURLToPath } from "node:url";
import { codeInspectorPlugin } from "code-inspector-plugin";

const config = defineConfig({
	plugins: [
		codeInspectorPlugin({
			bundler: "vite",
			hotKeys: ["ctrlKey", "altKey"],
		}),
		devtools(),
		tsconfigPaths({ projects: ["./tsconfig.json"] }),
		tailwindcss(),
		// tanstackStart({
		// 	spa: {
		// 		enabled: true,
		// 		prerender: {
		// 			enabled: true,
		// 			outputPath: "index.html",
		// 		},
		// 	},
		// 	router: {
		// 		routeFileIgnorePattern: "components|layouts|data",
		// 	},
		// }),
		tanstackRouter({
			target: "react",
			routesDirectory: "src/routes",
			autoCodeSplitting: true,
			routeFileIgnorePattern: "components|layouts|data",
		}),
		viteReact({
			babel: {
				plugins: ["babel-plugin-react-compiler"],
			},
		}),
	],
	resolve: {
		alias: {
			"@": fileURLToPath(new URL("./src", import.meta.url)),
			"@admin": fileURLToPath(
				new URL("./src/routes/_authenticated/admin", import.meta.url),
			),
			"@unit": fileURLToPath(
				new URL("./src/routes/_authenticated/unit", import.meta.url),
			),
			"@layouts": fileURLToPath(
				new URL("./src/components/layouts", import.meta.url),
			),
			"@components": fileURLToPath(
				new URL("./src/components", import.meta.url),
			),
		},
	},
});

export default config;
