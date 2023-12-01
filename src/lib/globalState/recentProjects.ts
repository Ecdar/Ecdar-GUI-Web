import { writable, type Writable } from "svelte/store";
import { get, set } from "idb-keyval";
import {
	isSerializedProjectAccess,
	type IProjectAccess,
} from "../classes/projectHandler/ProjectAccess";
import type {
	IDirectoryHandle,
	IFileHandle,
	IFileSystemHandle,
} from "$lib/classes/fileSystem/FileSystemImplementation";

const localStorageKey = "recent-projects";
const maxRecentProjects = 20;

/**
 * Defines all recently opened projects.
 */
export const recentProjects: Writable<
	IProjectAccess<
		IFileSystemHandle,
		IFileHandle,
		IDirectoryHandle<IFileSystemHandle, IFileHandle>
	>[]
> = (() => {
	const store: Writable<
		IProjectAccess<
			IFileSystemHandle,
			IFileHandle,
			IDirectoryHandle<IFileSystemHandle, IFileHandle>
		>[]
	> = writable([]);
	function set(
		value: IProjectAccess<
			IFileSystemHandle,
			IFileHandle,
			IDirectoryHandle<IFileSystemHandle, IFileHandle>
		>[],
	) {
		value = value.sort((a, b) => b.lastAccessed - a.lastAccessed);
		while (value.length > maxRecentProjects) {
			value.pop();
		}
		store.set(value);
	}
	return {
		subscribe: store.subscribe,
		set,
		update: store.update,
	};
})();

/**
 * If there are projects saved in localstorage, we get them on startup.
 * After that, we write any changes to localstorage.
 * Recent projects can be expensive to compute and they are not critical, so we allow the browser to get them when it is idle.
 */
if ("indexedDB" in globalThis) {
	const connector = async () => {
		const arrayCandidate: unknown = await get(localStorageKey);
		const projectAcceses: IProjectAccess<
			IFileSystemHandle,
			IFileHandle,
			IDirectoryHandle<IFileSystemHandle, IFileHandle>
		>[] = [];
		if (arrayCandidate) {
			if (Array.isArray(arrayCandidate)) {
				for (const projectAccessCandidate of arrayCandidate) {
					if (isSerializedProjectAccess(projectAccessCandidate)) {
						const { projectHandler } = await import(
							"$lib/classes/projectHandler/ProjectHandler"
						);
						projectAcceses.push(
							projectHandler.deserializeProjectAccess(
								projectAccessCandidate,
							),
						);
					} else {
						console.warn(
							"Could not parse one of the recent projects, the value does not implement the correct interface:",
							projectAccessCandidate,
						);
					}
				}
			} else {
				console.warn(
					"Could not parse recent projects, the value is not an array:",
					arrayCandidate,
				);
			}
		}
		recentProjects.set(projectAcceses);
		recentProjects.subscribe((recentProjects) => {
			void set(localStorageKey, recentProjects);
		});
	};
	/**
	 * TODO: remove this compatibility fix when Safari support is better:
	 * https://caniuse.com/requestidlecallback
	 */
	if ("requestIdleCallback" in globalThis) {
		requestIdleCallback(
			() => {
				void connector();
			},
			{ timeout: 700 },
		);
	} else {
		/**
		 * Doing this allows the browser to defer the work a little bit while doing the first render.
		 * It is not as good as explicitly requesting an idle callback.
		 */
		setTimeout(() => {
			void connector();
		}, 10);
	}
}
