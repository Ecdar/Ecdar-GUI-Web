<script lang="ts">
	export let timeStamp: number;

	const days = Math.floor(timeStamp / (24 * 60 * 60 * 1000));
	const hours = Math.floor(timeStamp / (60 * 60 * 1000));
	const minutes = Math.floor((timeStamp / (60 * 1000)) % 60);
	const seconds = Math.floor((timeStamp / 1000) % 60);

	$: console.log(days, hours, minutes, seconds);

	export const relativeTimeFormat = new Intl.RelativeTimeFormat("en", {
		numeric: "auto",
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
