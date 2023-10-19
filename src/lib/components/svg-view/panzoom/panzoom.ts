/**
 * @file
 * Code adapted from https://www.npmjs.com/package/@panzoom/panzoom/v/4.5.1
 * The original code is not very optimized for svelte. CSS values are set at runtime instead of compile time, and events are handled outside of the svelte event loop.
 * We have forked the code to integrate it correctly with svelte.
 *
 * PLEASE DO NOT MODIFY unless it is very necessary. This code is intentionally structured to follow the source code, to make future upgrades/debugging easier.
 */

import type {
	PanOptions,
	PanzoomEvent,
	PanzoomEventDetail,
	PanzoomObject,
	PanzoomOptions,
	ZoomOptions,
} from "./types";
import { addPointer, getDistance, getMiddle, removePointer } from "./pointers";
import { getDimensions, type setTransform, type setTransition } from "./css";

import isExcluded from "./isExcluded";

const defaultOptions: PanzoomOptions = {
	animate: false,
	canvas: false,
	disablePan: false,
	disableZoom: false,
	disableXAxis: false,
	disableYAxis: false,
	exclude: [],
	excludeClass: "panzoom-exclude",
	force: false,
	handleStartEvent: (e: Event) => {
		e.preventDefault();
		e.stopPropagation();
	},
	maxScale: 4,
	minScale: 0.125,
	panOnlyWhenZoomed: false,
	pinchAndPan: false,
	relative: false,
	roundPixels: false,
	silent: false,
	startX: 0,
	startY: 0,
	startScale: 1,
	step: 0.3,
};

type OptionalPanzoomOptions = Partial<Omit<PanzoomOptions, "force">>;

class Panzoom implements PanzoomObject {
	constructor(
		private elem: HTMLElement | SVGElement,
		private parent: HTMLElement | SVGElement,
		private setTransform: setTransform,
		private setTransition: setTransition,
		options?: OptionalPanzoomOptions,
	) {
		this.options = {
			...defaultOptions,
			...options,
		};

		this.zoom(this.options.startScale, { animate: false, force: true });
		// Wait for scale to update
		// for accurate dimensions
		// to constrain initial values
		setTimeout(() => {
			this.pan(this.options.startX, this.options.startY, {
				animate: false,
				force: true,
			});
		});
	}

	private options: PanzoomOptions = defaultOptions;

	setOptions(opts: OptionalPanzoomOptions = {}) {
		this.options = { ...this.options, ...opts };
	}

	private x = 0;
	private y = 0;
	private scale = 0;

	trigger(
		eventName: PanzoomEvent,
		detail: PanzoomEventDetail,
		opts: OptionalPanzoomOptions,
	) {
		if (opts.silent) {
			return;
		}
		const event = new CustomEvent(eventName, { detail });
		this.elem.dispatchEvent(event);
	}

	setTransformWithEvent(
		eventName: PanzoomEvent,
		opts: OptionalPanzoomOptions,
		originalEvent?: PanzoomEventDetail["originalEvent"],
	) {
		const value = {
			x: this.x,
			y: this.y,
			scale: this.scale,
			originalEvent,
		};
		this.setTransition(Boolean(opts.animate));
		this.setTransform(value);
		this.trigger(eventName, value, opts);
		this.trigger("panzoomchange", value, opts);
		return value;
	}

	constrainXY(
		toX: number | string,
		toY: number | string,
		toScale: number,
		panOptions?: Partial<PanOptions>,
	) {
		const opts = { ...this.options, ...panOptions };
		const result = { x: this.x, y: this.y, opts };
		if (
			!opts.force &&
			(opts.disablePan ||
				(opts.panOnlyWhenZoomed && this.scale === opts.startScale))
		) {
			return result;
		}
		if (isString(toX)) toX = parseFloat(toX);
		if (isString(toY)) toY = parseFloat(toY);

		if (!opts.disableXAxis) {
			result.x = (opts.relative ? this.x : 0) + toX;
		}

		if (!opts.disableYAxis) {
			result.y = (opts.relative ? this.y : 0) + toY;
		}

		if (opts.contain) {
			const dims = getDimensions(this.elem);
			const realWidth = dims.elem.width / this.scale;
			const realHeight = dims.elem.height / this.scale;
			const scaledWidth = realWidth * toScale;
			const scaledHeight = realHeight * toScale;
			const diffHorizontal = (scaledWidth - realWidth) / 2;
			const diffVertical = (scaledHeight - realHeight) / 2;

			if (opts.contain === "inside") {
				const minX =
					(-dims.elem.margin.left -
						dims.parent.padding.left +
						diffHorizontal) /
					toScale;
				const maxX =
					(dims.parent.width -
						scaledWidth -
						dims.parent.padding.left -
						dims.elem.margin.left -
						dims.parent.border.left -
						dims.parent.border.right +
						diffHorizontal) /
					toScale;
				result.x = Math.max(Math.min(result.x, maxX), minX);
				const minY =
					(-dims.elem.margin.top -
						dims.parent.padding.top +
						diffVertical) /
					toScale;
				const maxY =
					(dims.parent.height -
						scaledHeight -
						dims.parent.padding.top -
						dims.elem.margin.top -
						dims.parent.border.top -
						dims.parent.border.bottom +
						diffVertical) /
					toScale;
				result.y = Math.max(Math.min(result.y, maxY), minY);
			} else if (opts.contain === "outside") {
				const minX =
					(-(scaledWidth - dims.parent.width) -
						dims.parent.padding.left -
						dims.parent.border.left -
						dims.parent.border.right +
						diffHorizontal) /
					toScale;
				const maxX =
					(diffHorizontal - dims.parent.padding.left) / toScale;
				result.x = Math.max(Math.min(result.x, maxX), minX);
				const minY =
					(-(scaledHeight - dims.parent.height) -
						dims.parent.padding.top -
						dims.parent.border.top -
						dims.parent.border.bottom +
						diffVertical) /
					toScale;
				const maxY = (diffVertical - dims.parent.padding.top) / toScale;
				result.y = Math.max(Math.min(result.y, maxY), minY);
			}
		}

		if (opts.roundPixels) {
			result.x = Math.round(result.x);
			result.y = Math.round(result.y);
		}

		return result;
	}

	constrainScale(toScale: number, zoomOptions?: Partial<ZoomOptions>) {
		const opts = { ...this.options, ...zoomOptions };
		const result = { scale: this.scale, opts };
		if (!opts.force && opts.disableZoom) {
			return result;
		}

		let minScale = this.options.minScale;
		let maxScale = this.options.maxScale;

		if (opts.contain) {
			const dims = getDimensions(this.elem);
			const elemWidth = dims.elem.width / this.scale;
			const elemHeight = dims.elem.height / this.scale;
			if (elemWidth > 1 && elemHeight > 1) {
				const parentWidth =
					dims.parent.width -
					dims.parent.border.left -
					dims.parent.border.right;
				const parentHeight =
					dims.parent.height -
					dims.parent.border.top -
					dims.parent.border.bottom;
				const elemScaledWidth = parentWidth / elemWidth;
				const elemScaledHeight = parentHeight / elemHeight;
				if (this.options.contain === "inside") {
					maxScale = Math.min(
						maxScale,
						elemScaledWidth,
						elemScaledHeight,
					);
				} else if (this.options.contain === "outside") {
					minScale = Math.max(
						minScale,
						elemScaledWidth,
						elemScaledHeight,
					);
				}
			}
		}

		result.scale = Math.min(Math.max(toScale, minScale), maxScale);
		return result;
	}

	pan(
		toX: number | string,
		toY: number | string,
		panOptions?: Partial<PanOptions>,
		originalEvent?: PanzoomEventDetail["originalEvent"],
	) {
		const result = this.constrainXY(toX, toY, this.scale, panOptions);

		// Only try to set if the result is somehow different
		if (this.x !== result.x || this.y !== result.y) {
			this.x = result.x;
			this.y = result.y;
			return this.setTransformWithEvent(
				"panzoompan",
				result.opts,
				originalEvent,
			);
		}
		return { x: this.x, y: this.y, scale: this.scale, originalEvent };
	}

	zoom(
		toScale: number,
		zoomOptions?: Partial<ZoomOptions>,
		originalEvent?: PanzoomEventDetail["originalEvent"],
	) {
		const result = this.constrainScale(toScale, zoomOptions);
		const opts = result.opts;
		if (!opts.force && opts.disableZoom) {
			return;
		}
		toScale = result.scale;
		let toX = this.x;
		let toY = this.y;

		if (opts.focal) {
			// The difference between the point after the scale and the point before the scale
			// plus the current translation after the scale
			// neutralized to no scale (as the transform scale will apply to the translation)
			const focal = opts.focal;
			toX =
				(focal.x / toScale - focal.x / this.scale + this.x * toScale) /
				toScale;
			toY =
				(focal.y / toScale - focal.y / this.scale + this.y * toScale) /
				toScale;
		}
		const panResult = this.constrainXY(toX, toY, toScale, {
			relative: false,
			force: true,
		});
		this.x = panResult.x;
		this.y = panResult.y;
		this.scale = toScale;
		return this.setTransformWithEvent("panzoomzoom", opts, originalEvent);
	}

	zoomInOut(isIn: boolean, zoomOptions?: Partial<ZoomOptions>) {
		const opts = { ...this.options, animate: true, ...zoomOptions };
		return this.zoom(
			this.scale * Math.exp((isIn ? 1 : -1) * opts.step),
			opts,
		);
	}

	zoomIn(zoomOptions?: Partial<ZoomOptions>) {
		return this.zoomInOut(true, zoomOptions);
	}

	zoomOut(zoomOptions?: Partial<ZoomOptions>) {
		return this.zoomInOut(false, zoomOptions);
	}

	zoomToPoint(
		toScale: number,
		point: { clientX: number; clientY: number },
		zoomOptions?: Partial<ZoomOptions>,
		originalEvent?: PanzoomEventDetail["originalEvent"],
	) {
		const dims = getDimensions(this.elem);

		// Instead of thinking of operating on the panzoom element,
		// think of operating on the area inside the panzoom
		// element's parent
		// Subtract padding and border
		const effectiveArea = {
			width:
				dims.parent.width -
				dims.parent.padding.left -
				dims.parent.padding.right -
				dims.parent.border.left -
				dims.parent.border.right,
			height:
				dims.parent.height -
				dims.parent.padding.top -
				dims.parent.padding.bottom -
				dims.parent.border.top -
				dims.parent.border.bottom,
		};

		// Adjust the clientX/clientY to ignore the area
		// outside the effective area
		const clientX =
			point.clientX -
			dims.parent.left -
			dims.parent.padding.left -
			dims.parent.border.left -
			dims.elem.margin.left;
		const clientY =
			point.clientY -
			dims.parent.top -
			dims.parent.padding.top -
			dims.parent.border.top -
			dims.elem.margin.top;

		// Convert the mouse point from it's position over the
		// effective area before the scale to the position
		// over the effective area after the scale.
		const focal = {
			x:
				(clientX / effectiveArea.width) *
				(effectiveArea.width * toScale),
			y:
				(clientY / effectiveArea.height) *
				(effectiveArea.height * toScale),
		};

		return this.zoom(
			toScale,
			{ ...zoomOptions, animate: false, focal },
			originalEvent,
		);
	}

	zoomWithWheel(event: WheelEvent, zoomOptions?: Partial<ZoomOptions>) {
		// Need to prevent the default here
		// or it conflicts with regular page scroll
		event.preventDefault();

		const opts = { ...this.options, ...zoomOptions, animate: false };

		// Normalize to deltaX in case shift modifier is used on Mac
		const delta =
			event.deltaY === 0 && event.deltaX ? event.deltaX : event.deltaY;
		const wheel = delta < 0 ? 1 : -1;
		const toScale = this.constrainScale(
			this.scale * Math.exp((wheel * opts.step) / 3),
			opts,
		).scale;

		return this.zoomToPoint(toScale, event, opts, event);
	}

	reset(resetOptions?: OptionalPanzoomOptions) {
		const opts = {
			...this.options,
			animate: true,
			force: true,
			...resetOptions,
		};
		this.scale = this.constrainScale(opts.startScale, opts).scale;
		const panResult = this.constrainXY(
			opts.startX,
			opts.startY,
			this.scale,
			opts,
		);
		this.x = panResult.x;
		this.y = panResult.y;
		return this.setTransformWithEvent("panzoomreset", opts);
	}

	private origX: number | undefined;
	private origY: number | undefined;
	private startClientX: number | undefined;
	private startClientY: number | undefined;
	private startScale: number = 1;
	private startDistance: number = 0;
	private pointers: PointerEvent[] = [];

	private listenerController: AbortController | undefined;

	handleDown(event: PointerEvent) {
		// Don't handle this event if the target is excluded
		if (isExcluded(event.target as Element, this.options)) {
			return;
		}
		this.parent.setPointerCapture(event.pointerId);
		addPointer(this.pointers, event);
		this.options.handleStartEvent(event);
		this.origX = this.x;
		this.origY = this.y;

		this.trigger(
			"panzoomstart",
			{ x: this.x, y: this.y, scale: this.scale, originalEvent: event },
			this.options,
		);

		// This works whether there are multiple
		// pointers or not
		const point = getMiddle(this.pointers);
		this.startClientX = point.clientX;
		this.startClientY = point.clientY;
		this.startScale = this.scale;
		this.startDistance = getDistance(this.pointers);

		// Register event listeners for panning
		this.listenerController?.abort();
		this.listenerController = new AbortController();
		this.parent.addEventListener(
			"pointermove",
			(event) => {
				this.handleMove(event as PointerEvent);
			},
			{
				passive: true,
				signal: this.listenerController.signal,
			},
		);
		this.parent.addEventListener(
			"pointerup",
			(event) => {
				this.handleUp(event as PointerEvent);
			},
			{
				passive: true,
				once: true,
				signal: this.listenerController.signal,
			},
		);
		this.parent.addEventListener(
			"pointercancel",
			(event) => {
				this.handleUp(event as PointerEvent);
			},
			{
				passive: true,
				once: true,
				signal: this.listenerController.signal,
			},
		);
	}

	handleMove(event: PointerEvent) {
		if (
			this.origX === undefined ||
			this.origY === undefined ||
			this.startClientX === undefined ||
			this.startClientY === undefined
		) {
			return;
		}
		addPointer(this.pointers, event);
		const current = getMiddle(this.pointers);
		const hasMultiple = this.pointers.length > 1;
		let toScale = this.scale;

		if (hasMultiple) {
			// A startDistance of 0 means
			// that there weren't 2 pointers
			// handled on start
			if (this.startDistance === 0) {
				this.startDistance = getDistance(this.pointers);
			}
			// Use the distance between the first 2 pointers
			// to determine the current scale
			const diff = getDistance(this.pointers) - this.startDistance;
			toScale = this.constrainScale(
				(diff * this.options.step) / 80 + this.startScale,
			).scale;
			this.zoomToPoint(toScale, current, { animate: false }, event);
		}

		// Pan during pinch if pinchAndPan is true.
		// Note: some calculations may be off because the zoom
		// above has not yet rendered. However, the behavior
		// was removed before the new scale was used in the following
		// pan calculation.
		// See https://github.com/timmywil/panzoom/issues/512
		// and https://github.com/timmywil/panzoom/issues/606
		if (!hasMultiple || this.options.pinchAndPan) {
			this.pan(
				this.origX + (current.clientX - this.startClientX) / toScale,
				this.origY + (current.clientY - this.startClientY) / toScale,
				{
					animate: false,
				},
				event,
			);
		}
	}

	handleUp(event: PointerEvent) {
		// Don't call panzoomend when panning with 2 touches
		// until both touches end
		if (this.pointers.length === 1) {
			this.trigger(
				"panzoomend",
				{
					x: this.x,
					y: this.y,
					scale: this.scale,
					originalEvent: event,
				},
				this.options,
			);
		}
		// Note: don't remove all pointers
		// Can restart without having to reinitiate all of them
		this.parent.releasePointerCapture(event.pointerId);
		removePointer(this.pointers, event);
		this.origX = undefined;
		this.origY = undefined;
		this.startClientX = undefined;
		this.startClientY = undefined;

		this.listenerController?.abort();
	}

	getPan() {
		return { x: this.x, y: this.y };
	}

	getScale() {
		return this.scale;
	}

	getOptions() {
		return { ...this.options };
	}
}

function isString(value: unknown): value is string {
	return typeof value === "string";
}

export * from "./types";
export default Panzoom;
