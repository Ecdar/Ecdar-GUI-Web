import Console from "$lib/classes/console/Console";
import { get, set, del } from "idb-keyval";

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
	 */
	async setCustomFont(newFont?: Blob) {
		const fontBlob: Blob | undefined = newFont ?? (await get(this._idbKey));

		// No fonts have been set
		if (fontBlob === undefined) {
			console.log("No fonts have been loaded");
			return;
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
			if (error instanceof TypeError || error instanceof DOMException)
				Console.writeLineFrontend(
					`A font could not be loaded: ${error.message}`,
				);
		}
	}

	/**
	 * Uploads a custom font file and sets it as the custom font.
	 * @param file - The font file to upload.
	 * @throws Error if the loaded font file is null.
	 */
	uploadCustomFont(event: Event) {
		const target = event.target as HTMLInputElement;

		if (target.files === null) {
			Console.writeLineFrontend(
				`A font could not be loaded: File is null`,
			);
			return;
		}

		const file: File = target.files[0];
		const reader = new FileReader();

		reader.onload = async () => {
			if (reader.result === null)
				throw new Error("Loaded font file is null");

			const fontBlob = new Blob([reader.result]);
			await this.setCustomFont(fontBlob);

			await set(this._idbKey, fontBlob);
		};

		reader.readAsArrayBuffer(file);
	}
}

const shared: GlobalFontLoader = new GlobalFontLoader();
export default shared;
