<script lang="ts">
	import { onMount } from "svelte";
	import { default as hljs } from "highlight.js";
	import { editor } from "./state";

	export let isHidden: boolean;
	let editorDiv: HTMLElement;

	hljs.registerLanguage("ecdar", () => {
		return {
			case_insensitive: false,
			keywords: ["clock", "broadcast", "chan"],
			contains: [hljs.COMMENT("/\\*", "\\*/"), hljs.COMMENT("//", "\\n")],
		};
	});

	function createLineNr(i: number) {
		let num = document.createElement("div");
		num.innerHTML = String(i);
		num.classList.add("editor-linenum");
		return num;
	}

	onMount(async () => {
		let { CodeJar } = await import("codejar");
		let node = document.createElement("div");
		node.style.float = "right";
		node.style.width =
			"calc(100% - var(--editor-lineno-width) - var(--editor-lineno-margin-right))";
		node.classList.add("editor-text");

		let linenr = document.createElement("div");
		linenr.style.display = "flex";
		linenr.style.flexDirection = "column";
		linenr.style.justifyContent = "start";
		linenr.style.float = "left";
		linenr.style.width = "var(--editor-lineno-width)";

		function updateLines(text: string) {
			linenr.innerHTML = "";
			if (!text.includes("\n")) {
				linenr.appendChild(createLineNr(1));
				return;
			}
			// Fixes line numbers in chrome and webkit
			let substr = text.substring(text.length - 1);
			if (substr == "\n") {
				text = text.substring(0, text.length - 1);
			}
			linenr.appendChild(createLineNr(1));
			let lines = 1;
			for (let i = 0; i <= text.length; i++)
				if (text[i] == "\n") linenr.appendChild(createLineNr(++lines));
		}

		function updateCode(node: HTMLElement, code: string) {
			updateLines(code);
			let highlight = hljs.highlight(code, { language: "ecdar" }).value;
			node.innerHTML = highlight;
		}

		editor.change.subscribe((newCode) => {
			updateCode(node, newCode);
		});

		updateLines("");
		CodeJar(
			node,
			(n: HTMLElement) => {
				let code = n.textContent as string;
				editor.push.update((push) => (push(code), push));
				updateCode(n, code);
			},
			{
				history: false,
				addClosing: false,
			},
		);

		node.style.overflowY = "visible";
		editorDiv.appendChild(linenr);
		editorDiv.appendChild(node);
		editorDiv.style.visibility = isHidden ? "hidden" : "visible";
	});
</script>

<div
	id="editor"
	bind:this={editorDiv}
	style={isHidden ? "visibility:hidden; height:0px;" : "visibility:visible;"}
/>

<style>
	:global(:root) {
		--editor-lineno-width: 2.5em;
		--editor-lineno-margin-right: 0.3em;
	}

	#editor {
		width: 100%;
		height: 100%;
		max-width: 80vw;
		overflow: auto;
	}

	:global(.editor-text) {
		height: 100%;
		text-wrap: nowrap !important;
		font-family: monospace;
		font-size: 20px;
	}

	:global(.hljs-keyword) {
		color: var(--editor-keyword-color);
		font-family: monospace;
	}

	:global(.hljs-comment) {
		color: var(--editor-comment-color);
		font-family: monospace;
	}

	:global(.editor-linenum) {
		font-size: 20px;
		background-color: var(--canvas-topbar-color);
		border-color: var(--canvas-topbar-color);
		font-family: monospace;
		text-align: right;
		padding-right: var(--editor-lineno-margin-right);
	}
</style>
