<script lang="ts">
	import type {
		SimplifiedStation,
		SimplifiedStationWithDistance,
		Station
	} from '$lib/types/station';
	import { ChevronRight } from 'lucide-svelte';
	import TrainIcon from './TrainIcon.svelte';

	export let stations: SimplifiedStation[] | Station[] | SimplifiedStationWithDistance[];
</script>

<div class="stations-list">
	{#each stations as station}
		<div class="train-icons">
			{#each station.trains as train}
				<TrainIcon {train} />
			{/each}
		</div>
		<a href={`/station/${station.gtfsStopId}`} class="stop-name"
			>{station.stopName}
			<div class="right">
				{#if station?.distance}<span class="distance">({station?.distance.toFixed(2)} mi)</span
					>{/if}
				<ChevronRight />
			</div></a
		>
	{/each}
</div>

<style>
	.stations-list {
		display: grid;
		grid-template-columns: 4rem 1fr;
		gap: 0.2rem 0.35rem;

		font-size: 1.2rem;
	}

	.train-icons {
		display: flex;
		justify-content: flex-end;
		gap: 0.05rem;
		line-height: 1.75rem;
	}

	a {
		text-decoration: none;
		color: var(--link-color);
		padding-left: 0.25rem;

		display: flex;
		justify-content: space-between;
		align-items: center;

		transition: color 0.1s ease-in-out, background-color 0.1s ease-in-out;
	}

	a:hover {
		text-decoration: underline 2px solid;
	}

	.right {
		display: flex;
		align-items: center;
		gap: 0.25rem;
	}

	.distance {
		color: #777;
		font-size: 0.75em;
	}
</style>
