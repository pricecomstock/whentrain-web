<script lang="ts">
	import TrainIcon from './TrainIcon.svelte';
	import { Menu } from 'lucide-svelte';

	import { page } from '$app/stores';
	import { toggleMenu } from '$lib/stores/showMenu';
	import { selectedStation } from '$lib/stores/selectedStation';
</script>

<div class="container">
	<button class="current-selection" on:click={toggleMenu}>
		<div class="text">select station</div>
		<Menu size="1.75rem" />
	</button>
</div>

<style>
	button {
		background: none;
		border: none;
		padding: 0;
		font: inherit;
		cursor: pointer;
		outline: inherit;
	}

	.container {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.current-selection {
		font-size: 1rem;

		align-self: end;
		display: flex;
		align-items: center;
		gap: 0.5rem;
		cursor: pointer;
	}
	.icons {
		display: flex;
		gap: 0.05rem;
	}

	.text {
		text-align: left;
	}
</style>
