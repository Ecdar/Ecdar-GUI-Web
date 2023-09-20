<script lang="ts">
	import { onMount } from 'svelte';
	import type { Point } from './canvas';
	import points from './objects.json';

	let backCanvas: HTMLCanvasElement;
	let frontCanvas: HTMLCanvasElement;

	onMount(() => {
		const canvasContainer: HTMLDivElement | null = document.getElementById(
			'canvas-container'
		) as HTMLDivElement;
		if (canvasContainer === null) {
			throw new Error('Could not get canvas container.');
		}

		backCanvas.width = window.innerWidth - 20;
		backCanvas.height = window.innerHeight - 20;
		frontCanvas.width = window.innerWidth - 20;
		frontCanvas.height = window.innerHeight - 20;

		const backCtx: CanvasRenderingContext2D | null = backCanvas.getContext('2d', {
			alpha: false
		});
		const frontCtx: CanvasRenderingContext2D | null = frontCanvas.getContext('2d');
		if (backCtx === null || frontCtx === null) {
			throw new Error(`Could not get 2d context from canvas.`);
		}

		const prototype = new Prototype(backCtx, frontCtx);

		canvasContainer.onmousedown = (e) => {
			prototype.mouseDown(e);
		};
		canvasContainer.onmouseup = (e) => {
			prototype.mouseUp(e);
		};
		canvasContainer.onmousemove = (e) => {
			prototype.mouseMove(e);
		};
		canvasContainer.onwheel = (e) => {
			prototype.mouseWheel(e);
		};
		canvasContainer.ondblclick = (e) => {
			prototype.doubleClick(e);
		};

		prototype.drawBack();
	});

	class Prototype {
		private backCtx: CanvasRenderingContext2D;
		private frontCtx: CanvasRenderingContext2D;
		private offset: Point;
		private moveOffset: Point;
		private activePoint: number;
		private lastMouse: Point;

		constructor(backCtx: CanvasRenderingContext2D, frontCtx: CanvasRenderingContext2D) {
			this.backCtx = backCtx;
			this.backCtx.fillStyle = 'blue';
			this.backCtx.font = 'bold 10px Arial';
			this.frontCtx = frontCtx;
			this.frontCtx.fillStyle = 'blue';
			this.frontCtx.font = 'bold 10px Arial';
			this.frontCtx.strokeStyle = 'red';
			this.offset = {
				x: backCanvas.getBoundingClientRect().left,
				y: backCanvas.getBoundingClientRect().top
			};
			this.moveOffset = {
				x: 0,
				y: 0
			};
			this.activePoint = -1;
			this.lastMouse = {
				x: backCanvas.width / 2,
				y: backCanvas.height / 2
			};
		}

		drawBack() {
			this.backCtx.save();
			this.backCtx.setTransform(1, 0, 0, 1, 0, 0);
			this.backCtx.clearRect(0, 0, backCanvas.width, backCanvas.height);
			this.backCtx.restore();

			const transform = this.backCtx.getTransform().invertSelf();
			const topLeft = transform.transformPoint({ x: 0, y: 0 });
			const bottomRight = transform.transformPoint({
				x: backCanvas.width,
				y: backCanvas.height
			});

			const isSmall = this.backCtx.getTransform().a < 3;

			// With strokes around circles, but slower
			// for (const point of points) {
			// 	if (point === points[this.activePoint]) continue;

			// 	this.backCtx.beginPath();
			// 	this.backCtx.arc(point.x, point.y, 5, 0, Math.PI * 2);
			// 	this.backCtx.closePath();
			// 	this.backCtx.fill();
			// 	this.backCtx.stroke();
			// 	if (!isSmall) this.backCtx.fillText('N', point.x - 3.5, point.y + 12.5);
			// }

			this.backCtx.beginPath();
			if (isSmall) {
				for (const point of points) {
					if (point === points[this.activePoint]) continue;

					this.backCtx.fillRect(point.x - 5, point.y - 5, 10, 10);
				}
			} else {
				for (const point of points) {
					if (point === points[this.activePoint]) continue;
					if (
						point.x + 5 > topLeft.x &&
						point.x - 5 < bottomRight.x &&
						point.y + 5 > topLeft.y &&
						point.y - 5 < bottomRight.y
					) {
						this.backCtx.moveTo(point.x, point.y);
						this.backCtx.arc(point.x, point.y, 5, 0, Math.PI * 2);
						this.backCtx.fillText('N', point.x - 3.5, point.y + 12.5);
					}
				}
			}
			this.backCtx.fill();
		}

		drawFront() {
			this.frontCtx.save();
			this.frontCtx.setTransform(1, 0, 0, 1, 0, 0);
			this.frontCtx.clearRect(0, 0, frontCanvas.width, frontCanvas.height);
			this.frontCtx.restore();

			if (this.activePoint < 0) return;

			const activePoint: Point = points[this.activePoint];

			this.frontCtx.beginPath();
			this.frontCtx.arc(activePoint.x, activePoint.y, 5, 0, Math.PI * 2);
			this.frontCtx.closePath();
			this.frontCtx.fill();
			this.frontCtx.stroke();
			this.frontCtx.fillText('N', activePoint.x - 3.5, activePoint.y + 12.5);
		}

		mouseDown(e: MouseEvent) {
			const scaledPoint = this.backCtx
				.getTransform()
				.invertSelf()
				.transformPoint({
					x: e.clientX - this.offset.x,
					y: e.clientY - this.offset.y
				});

			for (let i = points.length - 1; i >= 0; i--) {
				const p: Point = points[i];
				const d: Point = {
					x: p.x - scaledPoint.x,
					y: p.y - scaledPoint.y
				};
				if (d.x ** 2 + d.y ** 2 < 5 ** 2) {
					this.activePoint = i;
					break;
				}
			}

			this.drawBack();
			this.drawFront();

			this.moveOffset = scaledPoint;

			e.preventDefault();
		}

		mouseMove(e: MouseEvent) {
			this.lastMouse = this.backCtx.getTransform().invertSelf().transformPoint({
				x: e.offsetX,
				y: e.offsetY
			});

			if (this.activePoint >= 0) {
				const mouse: Point = {
					x: e.clientX - this.offset.x,
					y: e.clientY - this.offset.y
				};

				const scaledPoint = this.backCtx.getTransform().invertSelf().transformPoint(mouse);

				const d: Point = {
					x: scaledPoint.x - this.moveOffset.x,
					y: scaledPoint.y - this.moveOffset.y
				};

				points[this.activePoint].x += d.x;
				points[this.activePoint].y += d.y;

				this.drawFront();

				this.moveOffset = scaledPoint;
			} else {
				if (e.buttons === 1) {
					frontCanvas.style.cursor = 'grabbing';

					this.backCtx.translate(
						e.movementX / this.backCtx.getTransform().a,
						e.movementY / this.backCtx.getTransform().a
					);
					this.frontCtx.translate(
						e.movementX / this.backCtx.getTransform().a,
						e.movementY / this.backCtx.getTransform().a
					);

					this.drawBack();
				}
			}

			e.preventDefault();
		}

		mouseUp(e: MouseEvent) {
			this.activePoint = -1;

			frontCanvas.style.cursor = 'default';

			this.drawFront();
			this.drawBack();

			e.preventDefault();
		}

		#zoom(direction: number, multiplier: number) {
			this.backCtx.translate(this.lastMouse.x, this.lastMouse.y);
			this.backCtx.scale(1 + direction * multiplier, 1 + direction * multiplier);
			this.backCtx.translate(-this.lastMouse.x, -this.lastMouse.y);
			this.frontCtx.translate(this.lastMouse.x, this.lastMouse.y);
			this.frontCtx.scale(1 + direction * multiplier, 1 + direction * multiplier);
			this.frontCtx.translate(-this.lastMouse.x, -this.lastMouse.y);

			this.drawBack();
		}

		mouseWheel(e: WheelEvent) {
			this.#zoom(e.deltaY > 0 ? -1 : 1, 0.05);

			e.preventDefault();
		}

		doubleClick(e: MouseEvent) {
			if (e.shiftKey) {
				this.#zoom(-1, 1 / 3);
			} else {
				this.#zoom(1, 0.5);
			}

			e.preventDefault();
		}
	}
</script>

<div id="canvas-container">
	<canvas bind:this={backCanvas}>This browser does not support Canvas.</canvas>
	<canvas bind:this={frontCanvas}>This browser does not support Canvas.</canvas>
</div>

<style>
	canvas {
		position: absolute;
		margin: 0;
		padding: 0;
	}
	canvas:nth-child(1) {
		background-color: black;
	}
</style>
