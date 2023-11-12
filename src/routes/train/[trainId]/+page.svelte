<script lang="ts">
	import StationList from '$components/StationList.svelte';
	import { compareBoroughs, getBoroughName } from '$lib/helpers/utils';
	import type { SimplifiedStation } from '$lib/types/station';
	import type { PageServerData } from './$types';
	export let data: PageServerData;

	$: stationsByBorough = data.stations.reduce((acc, station) => {
		if (!acc[station.borough]) {
			acc[station.borough] = [];
		}
		acc[station.borough].push(station);
		return acc;
	}, {} as Record<string, SimplifiedStation[]>);
	$: stationsByBoroughSorted = Object.entries(stationsByBorough).sort(([boroughA], [boroughB]) => {
		return compareBoroughs(boroughA, boroughB);
	});
</script>

<div class="station-lists">
	{#each stationsByBoroughSorted as [borough, stations]}
		<div class="borough-station-list">
			<h2>{getBoroughName(borough)}</h2>
			<StationList {stations} />
		</div>
	{/each}
</div>

<style>
	/* styles go here */

	.station-lists {
		display: grid;
		justify-content: center;
		justify-items: center;
		align-content: start;
		grid-template-columns: repeat(auto-fit, 22rem);
		gap: 1rem 3rem;
		max-width: 80rem;
		margin: auto;
	}

	.borough-station-list {
		margin: 0 auto;
		width: min(100%, 22rem);
	}
</style>
