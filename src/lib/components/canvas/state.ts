import { Component, GlobalDeclarations, System } from "$lib/classes/automaton";
import { activeView } from "$lib/globalState/activeProject";
import { writable } from "svelte/store";
import { editor } from "$lib/components/editor/state";

export enum CanvasModes {
	Draw,
	Editor,
}

export enum CanvasSupports {
	OnlyDraw,
	OnlyEditor,
	Both,
}

export const canvasSupports = writable(CanvasSupports.OnlyEditor);
export const canvasModes = writable(CanvasModes.Editor);

canvasSupports.subscribe((newSupports) => {
	canvasModes.update((currentMode) => {
		if (
			newSupports == CanvasSupports.OnlyEditor &&
			currentMode == CanvasModes.Draw
		)
			return CanvasModes.Editor;
		else if (
			newSupports == CanvasSupports.OnlyDraw &&
			currentMode == CanvasModes.Editor
		)
			return CanvasModes.Draw;
		else return currentMode;
	});
});

activeView.subscribe((view) => {
	if (view instanceof Component) {
		canvasSupports.set(CanvasSupports.Both);
		editor.change.set(view.declarations);
		editor.push.set((code: string) => {
			view.declarations = code;
		});
	} else if (view instanceof System) {
		canvasSupports.set(CanvasSupports.OnlyDraw);
	} else if (view instanceof GlobalDeclarations) {
		canvasSupports.set(CanvasSupports.OnlyEditor);
		editor.change.set(view.declarations);
		editor.push.set((code: string) => {
			view.declarations = code;
		});
	} else {
		canvasSupports.set(CanvasSupports.OnlyEditor);
	}
});
