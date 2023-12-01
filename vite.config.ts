import { bundleProjectExamples } from "./bundleProjectExamples";
import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vitest/config";

export default defineConfig({
	plugins: [bundleProjectExamples, sveltekit()],
	test: {
		include: ["src/**/*.{test,spec}.{js,ts}"],
	},
});
