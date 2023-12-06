import { writable } from "svelte/store"

export enum CanvasModes {
	Draw,
	Editor
}

export enum CanvasSupports {
	OnlyDraw,
	OnlyEditor,
	Both
}

export const canvasSupports = writable(CanvasSupports.OnlyEditor);
export const canvasModes = writable(CanvasModes.Editor);

canvasSupports.subscribe((newSupports) => {
	canvasModes.update((currentMode) => {
		if(newSupports == CanvasSupports.OnlyEditor && currentMode == CanvasModes.Draw)
			return CanvasModes.Editor;
		else if(newSupports == CanvasSupports.OnlyDraw && currentMode == CanvasModes.Editor)
			return CanvasModes.Draw;
		else 
			return currentMode;
	})
})


