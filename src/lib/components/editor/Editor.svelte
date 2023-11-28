<script lang="ts">
	import { onMount } from "svelte";
	import { default as hljs } from "highlight.js";

	let editor: HTMLElement;
	hljs.registerLanguage("ecdar", _ => {
		return {
			case_insensitive : false,
			keywords : "clock",
			contains : [],
		}
	});

	onMount(async () => {
		let { CodeJar } = await import("codejar");
		let node = document.createElement("div");
		node.style.maxHeight= "80vh";
		CodeJar(node, ((n : HTMLElement) => {
			let code = n.textContent as string;
			code = hljs.highlight(code, {language : "ecdar"}).value;
			n.innerHTML = code;
		}));
		editor.appendChild(node);
	});
</script>

<div id="editor" bind:this={editor} />

<style>
  #editor {
	  width: 100%;
	  height: 100%;
  }
</style>
