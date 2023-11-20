import type { FileEntry } from "@tauri-apps/api/fs";
import { FileSystem } from "./FileSystem";
import { inTauri } from "$lib/tauri";

export class FileSystemTauri extends FileSystem {
	static supported = inTauri;

	async saveDialog(path: string | undefined): Promise<string | undefined> {
		const dialog = await import("@tauri-apps/api/dialog");
		const result = await dialog.save({
			title: "Save project",
			defaultPath: path,
		});
		if (typeof result === "string") return result;
		return undefined;
	}

	async openDialog(): Promise<string | undefined> {
		const dialog = await import("@tauri-apps/api/dialog");
		const result = await dialog.open({
			multiple: false,
			directory: true,
			title: "Open project",
			defaultPath: "$DOCUMENTS",
		});
		if (typeof result === "string") return result;
		return undefined;
	}

	async readDir(path: string): Promise<string[]> {
		const fs = await import("@tauri-apps/api/fs");
		const entries: FileEntry[] = await fs.readDir(path);
		return entries
			.map((entry) => entry.name)
			.filter((name) => name !== undefined) as string[];
	}

	async readFile(path: string): Promise<string> {
		const fs = await import("@tauri-apps/api/fs");
		return fs.readTextFile(path);
	}

	async exists(path: string): Promise<boolean> {
		const fs = await import("@tauri-apps/api/fs");
		return fs.exists(path);
	}

	async createDir(path: string): Promise<void> {
		const fs = await import("@tauri-apps/api/fs");
		await fs.createDir(path);
	}

	async writeFile(path: string, content: string): Promise<void> {
		const fs = await import("@tauri-apps/api/fs");
		await fs.writeFile(path, content);
	}

	isFile(path: string): boolean {
		// if the path isn't .json or .json/ then it is a folder
		return path.endsWith(".json") || path.endsWith(".json/");
	}

	isDirectory(path: string): boolean {
		return !this.isFile(path);
	}
}
