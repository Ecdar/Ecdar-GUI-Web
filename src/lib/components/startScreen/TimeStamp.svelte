<script lang="ts">
	import { onMount } from "svelte";

	export let timeStamp: number;
	let time = Date.now();

	let days: number, hours: number, minutes: number, seconds: number;

	$: days = Math.floor((timeStamp - time) / (24 * 60 * 60 * 1000));
	$: hours = Math.floor((timeStamp - time) / (60 * 60 * 1000));
	$: minutes = Math.floor(((timeStamp - time) / (60 * 1000)) % 60);
	$: seconds = Math.floor(((timeStamp - time) / 1000) % 60);

	export const relativeTimeFormat = new Intl.RelativeTimeFormat("en", {
		numeric: "auto",
	});

	onMount(() => {
		const interval = setInterval(() => {
			time = Date.now();
		}, 10 * 1000); // Update every 10 seconds

		return () => {
			clearInterval(interval);
		};
	});
</script>

{#if days < -1}
	{relativeTimeFormat.format(days, "day")}
{:else if hours < -1}
	{relativeTimeFormat.format(hours, "hour")}
{:else if minutes < -1}
	{relativeTimeFormat.format(minutes, "minute")}
{:else if seconds < -10}
	{relativeTimeFormat.format(seconds, "second")}
{:else}
	Just now
{/if}
