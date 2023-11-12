<script lang="ts">
	import { isShowingMenu } from '$lib/stores/showMenu';
	import { onMount } from 'svelte';

	onMount(() => {
		isShowingMenu.set(true);
	});
</script>

<div />

<style>
	/* styles go here */
</style>
