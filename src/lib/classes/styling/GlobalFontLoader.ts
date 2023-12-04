import Console from "$lib/classes/console/Console";
import { get, set, del } from "idb-keyval";
import { browser } from "$app/environment";

class GlobalFontLoader {
	private readonly _idbKey = "customFontBinary";

	init() {
		if (!("document" in globalThis)) {
			throw new Error("The CSS loader needs access to the DOM elements");
		}

		this.setCustomFont().catch((error: Error) => {
			Console.writeLineFrontend(
				`Failed to set cutom fonts: ${error.message}`,
			);
		});
	}

	/**
	 * Clears the custom font from the document and deletes it from the IndexedDB.
	 */
	async clearCustomFont() {
		const storedFont: Blob | undefined = await get(this._idbKey);

		if (storedFont) {
			await del(this._idbKey);
			document.fonts.clear();
		}
	}

	/**
	 * Sets a custom font for the application.
	 * If a new font is provided, it will be used. Otherwise, the font will be retrieved from the IndexedDB using the specified key.
	 * @param newFont - Optional. The new font to be set.
	 * @throws TypeError if the fontBlob is undefined.
	 * @returns A promise that resolves to a boolean indicating whether the font was set successfully.
	 */
	async setCustomFont(newFont?: Blob): Promise<boolean> {
		const fontBlob: Blob | undefined = newFont ?? (await get(this._idbKey));

		// Fontblob is undefined if no custom font has been set.
		// The correct font has therefore been set (The standard one)
		if (fontBlob === undefined) {
			return true;
		}

		const fontFace: FontFace = new FontFace(
			"CustomFont",
			`url(${URL.createObjectURL(fontBlob)})`,
		);

		try {
			const loadedFont = await fontFace.load();

			// Remove any previously added fonts and add the new one
			document.fonts.clear();
			document.fonts.add(loadedFont);
		} catch (error: unknown) {
			if (error instanceof TypeError) {
				Console.writeLineFrontend(
					`A font could not be loaded: ${error.message}`,
				);
			} else if (error instanceof DOMException) {
				Console.writeLineFrontend(`Unable to parse font`);
			}

			return false;
		}

		return true;
	}

	/**
	 * Uploads a custom font file and sets it as the custom font.
	 * @param file - The font file to upload.
	 * @throws Error if the loaded font file is null.
	 */
	uploadCustomFont(event: Event, uploadButtonReference: HTMLButtonElement) {
		const target = event.target as HTMLInputElement;

		if (target.files === null) {
			Console.writeLineFrontend(
				`A font could not be loaded: File is null`,
			);
			// Alert user about the error
			this.setButtonStyleWarning(uploadButtonReference);
			return;
		}

		const file: File = target.files[0];
		const reader = new FileReader();

		const supportedTypes = ["ttf", "otf"];
		const fileType = file.name.split(".").at(-1);

		if (fileType !== undefined && !supportedTypes.includes(fileType)) {
			Console.writeLineFrontend(
				`Uploaded font has type ".${fileType}" which is not supported.`,
			);
			// Alert user about the error
			this.setButtonStyleWarning(uploadButtonReference);
			return;
		}

		reader.onload = async () => {
			if (reader.result === null) {
				Console.writeLineFrontend("Loaded font file is null");
				return;
			}

			const fontBlob = new Blob([reader.result]);
			const loadingSuccess = await this.setCustomFont(fontBlob);

			if (loadingSuccess) {
				await set(this._idbKey, fontBlob);
				// Remove possible warning styling
				uploadButtonReference.removeAttribute("title");
				uploadButtonReference.removeAttribute("style");
			} else {
				// Alert user about the error
				this.setButtonStyleWarning(uploadButtonReference);
			}
		};

		reader.readAsArrayBuffer(file);
	}

	/**
	 * Sets the button style for warning state.
	 * @param uploadButtonReference - The reference to the upload button element.
	 */
	private setButtonStyleWarning(uploadButtonReference: HTMLButtonElement) {
		// Alert user about the error
		uploadButtonReference.setAttribute(
			"title",
			"Read the error in the console",
		);
		uploadButtonReference.style.backgroundColor =
			"var(--settings-danger-button-color)";
	}
}

const shared: GlobalFontLoader = new GlobalFontLoader();

if (browser) {
	// Catch errors here and show error popup
	try {
		shared.init();
	} catch (error) {
		if (error instanceof TypeError || error instanceof Error)
			Console.writeLineFrontend(error.message);
	}
}

export default shared;
