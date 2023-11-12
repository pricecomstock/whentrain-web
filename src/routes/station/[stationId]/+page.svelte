<script lang="ts">
	import type { PageServerData } from './$types';
	import DeparturesList from '$components/DeparturesList.svelte';
	import { onDestroy, onMount } from 'svelte';
	import { isShowingMenu } from '$lib/stores/showMenu';
	import { selectedStation } from '$lib/stores/selectedStation';
	import TrainIcon from '$components/TrainIcon.svelte';
	import type { ArrivalDepartureTime } from '$lib/types/departures';
	export let data: PageServerData;

	let fetchCurrentDeparturesIntervalId: number;
	let currentTimeIntervalId: number;

	let lastUpdatedTime = Date.now();
	let currentTime = Date.now();

	onMount(() => {
		isShowingMenu.set(false);
		selectedStation.set(data.station);
		fetchCurrentDeparturesIntervalId = setInterval(getCurrentDepartures, 30e3);

		currentTimeIntervalId = setInterval(() => {
			currentTime = Date.now();
		}, 1000);
	});

	onDestroy(() => {
		selectedStation.set(null);
		clearInterval(fetchCurrentDeparturesIntervalId);
	});

	$: ({ departures: onLoadDepartures, station } = data);

	let freshDepartures: ArrivalDepartureTime[] = [];

	$: departures = freshDepartures.length ? freshDepartures : onLoadDepartures;

	async function getCurrentDepartures() {
		freshDepartures = await fetch(`/api/departures/${data.station.gtfsStopId}`).then((r) => {
			lastUpdatedTime = Date.now();
			return r.json();
		});
	}
</script>

<svelte:head>
	<title>{station.stopName}</title>
</svelte:head>

<!-- Train or station icons -->
<div class="station-title">
	<div class="icons">
		{#each data.station.trains as train}
			<TrainIcon {train} size="max(1.5rem, 2vw)" alignMiddle />
		{/each}
	</div>
	{data.station.stopName}
</div>

<DeparturesList {departures} {station} />

<div class="last-updated">
	Last updated {Math.max(0, Math.floor((currentTime - lastUpdatedTime) / 1000))}s ago
</div>

<style>
	.station-title {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 0.5rem;

		font-size: max(1.25rem, 2vw);
		font-weight: bold;
	}

	.last-updated {
		text-align: center;
		font-size: 0.75rem;
		color: var(--gray);
	}
</style>
