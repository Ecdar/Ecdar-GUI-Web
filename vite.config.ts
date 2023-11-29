import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vitest/config";
import { compileProtobuffers } from "./compileProtobuffers";

export default defineConfig({
	plugins: [sveltekit(), compileProtobuffers],
	test: {
		include: ["src/**/*.{test,spec}.{js,ts}"],
	},
});
