import { bundleProjectExamples } from "./bundleProjectExamples";
import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vitest/config";
import { compileProtobuffers } from "./compileProtobuffers";

export default defineConfig({
	plugins: [compileProtobuffers, bundleProjectExamples, sveltekit()],
	test: {
		include: ["src/**/*.{test,spec}.{js,ts}"],
	},
});
