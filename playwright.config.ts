import type { PlaywrightTestConfig } from "@playwright/test";

const config: PlaywrightTestConfig = {
	webServer: {
		command: "yarn build && yarn preview",
		port: 4173,
		timeout: 10 * 60 * 1000,
	},
	testDir: "tests",
	testMatch: /(.+\.)?(test|spec)\.[jt]s/,
};

export default config;
