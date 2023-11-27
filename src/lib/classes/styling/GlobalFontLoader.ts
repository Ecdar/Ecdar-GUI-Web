import { get, set, del } from "idb-keyval";

class GlobalFontLoader {
	private readonly _idbKey = "customFontBinary";

	init() {
		if (!("document" in globalThis)) {
			throw new Error("The CSS loader needs access to the DOM elements");
		}

		this.setCustomFont();
	}

	/**
	 * Clears the custom font from the document and deletes it from the IndexedDB.
	 */
	async clearCustomFont() {
		document.fonts.clear();
		await del(this._idbKey);
	}

	/**
	 * Sets a custom font for the application.
	 * If a new font is provided, it will be used. Otherwise, the font will be retrieved from the IndexedDB using the specified key.
	 * @param newFont - Optional. The new font to be set.
	 * @throws TypeError if the fontBlob is undefined.
	 */
	async setCustomFont(newFont?: Blob) {
		const fontBlob: Blob | undefined = newFont ?? (await get(this._idbKey));

		if (fontBlob === undefined) {
			throw new TypeError("Expected type Blob but got undefined");
		}

		const fontFace: FontFace = new FontFace(
			"CustomFont",
			`url(${URL.createObjectURL(fontBlob)})`,
		);

		const loadedFont = await fontFace.load();

		// Remove any previously added fonts and add the new one
		document.fonts.clear();
		document.fonts.add(loadedFont);
	}

	/**
	 * Uploads a custom font file and sets it as the custom font.
	 * @param file - The font file to upload.
	 * @throws Error if the loaded font file is null.
	 */
	async uploadCustomFont(file: File) {
		const reader = new FileReader();

		reader.onload = async () => {
			if (reader.result === null)
				throw new Error("Loaded font file is null");

			const fontBlob = new Blob([reader.result]);
			this.setCustomFont(fontBlob);

			await set(this._idbKey, fontBlob);
		};

		reader.readAsArrayBuffer(file);
	}
}

const shared: GlobalFontLoader = new GlobalFontLoader();
export default shared;
