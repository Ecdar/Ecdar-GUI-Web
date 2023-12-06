// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { firefox } from "playwright";

export default async function launchBrowser() {
	global.browser = await firefox.launch({
		firefoxUserPrefs: {
			"dom.element.popover.enabled": true,
		},
	});
}
