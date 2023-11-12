<script lang="ts">
	import TrainPicker from '$components/TrainPicker.svelte';
	import TrainPickerButton from '$components/TrainPickerButton.svelte';
	import { isShowingMenu } from '$lib/stores/showMenu';
	import { Locate } from 'lucide-svelte';

	import { fly } from 'svelte/transition';
</script>

<div class="header">
	<a href="/" class="title">whentrain.nyc</a>
	<div class="menu">
		<TrainPickerButton />
	</div>
</div>

<div class="picker-container" style={`max-height: ${$isShowingMenu ? '15rem' : '0'}`}>
	{#if $isShowingMenu}
		<div class="picker" in:fly={{ y: -50, duration: 150 }} out:fly={{ y: -50, duration: 100 }}>
			<TrainPicker />
			<a class="button" href="/nearby">Nearby Stations <Locate /></a>
		</div>
	{/if}
</div>

<style>
	.header {
		display: flex;
		align-items: center;
		justify-content: space-between;

		margin: 0.5rem;
	}

	.title {
		font-size: 1.25rem;
		margin-right: 0.5rem;

		text-decoration: none;
		color: var(--black);
	}

	.picker-container {
		max-height: 3rem;
		overflow: hidden;
		transition: max-height 0.15s linear;
		margin-bottom: 1rem;
	}

	.picker {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
</style>
