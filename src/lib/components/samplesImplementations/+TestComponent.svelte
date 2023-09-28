<script lang="ts">
	import { Payment, Payments } from 'svelte-google-materialdesign-icons';
	import { ContextMenuItem } from './components/svelte-modifiers/rightClickableComponents/contextMenuItem';
	import RightClickable from './components/svelte-modifiers/+RightClickable.svelte';

	const menuItems: ContextMenuItem[] = [
		new ContextMenuItem(false, 'Testings', () => {}, Payment),
		new ContextMenuItem(true),
		new ContextMenuItem(
			false,
			'Delete',
			(target) => {
				target.remove();
			},
			Payments,
			'danger'
		),
		new ContextMenuItem(
			false,
			'Deattach',
			() => {
				console.log('Du en hat');
			},
			Payments,
			'warning'
		),
		new ContextMenuItem(
			false,
			'WIN THE MONEYZ',
			() => {
				console.log('Du en hat');
			},
			Payments,
			'success'
		),
		new ContextMenuItem(
			false,
			'Delete',
			() => {
				console.log('Du en hat');
			},
			Payments,
			'danger'
		)
	];
	const menuItems2: ContextMenuItem[] = [
		new ContextMenuItem(
			false,
			'WEE WOO',
			() => {
				console.log('Du en hat');
			},
			Payments,
			''
		),
		new ContextMenuItem(true),
		new ContextMenuItem(
			false,
			'BING BONG',
			() => {
				console.log('Du en hat');
			},
			Payments,
			''
		)
	];
</script>

<div>
	<RightClickable {menuItems}>
		<h1>Test Component 1 Here</h1>
	</RightClickable>
	<RightClickable menuItems={menuItems2}>
		<h1>Test Component 2 Here</h1>
	</RightClickable>
</div>
