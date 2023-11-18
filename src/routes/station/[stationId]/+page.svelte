<script lang="ts">
	import type { PageServerData } from './$types';
	import DeparturesList from '$components/DeparturesList.svelte';
	import { onDestroy, onMount } from 'svelte';
	import { isShowingMenu } from '$lib/stores/showMenu';
	import { selectedStation } from '$lib/stores/selectedStation';
	import TrainIcon from '$components/TrainIcon.svelte';
	import type { ArrivalDepartureTime } from '$lib/types/departures';
	import StationList from '$components/StationList.svelte';
	export let data: PageServerData;

	let fetchCurrentDeparturesIntervalId: number;
	let currentTimeIntervalId: number;

	let lastUpdatedTime = Date.now();
	let currentTime = Date.now();
	$: updatedSecondsAgo = Math.max(0, Math.floor((currentTime - lastUpdatedTime) / 1000));

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
		clearInterval(currentTimeIntervalId);
	});

	$: ({ departures: onLoadDepartures, station, connectedStations } = data);

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
			<TrainIcon {train} size="max(1.25em, 1.5vw)" alignMiddle />
		{/each}
	</div>
	{data.station.stopName}
</div>

{#if departures.length}
	<DeparturesList {departures} {station} />
{:else}
	<div class="no-departures">
		There are no trains at this station. Maybe they aren't running right now!
	</div>
{/if}

{#if connectedStations.length}
	<div class="connected-stations">
		<h2>Connected Stations</h2>
		<StationList stations={connectedStations} />
	</div>
{/if}

<div class="last-updated">
	Last updated {updatedSecondsAgo}s ago
</div>

<style>
	.station-title {
		margin: 0.5rem auto;

		display: flex;
		align-items: center;
		justify-content: center;
		gap: 0.5rem;

		font-size: max(1.5vw, 1.5em);
		font-weight: bold;
	}

	.icons {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 0.1rem;
	}

	.no-departures {
		text-align: center;
		font-size: 1.5rem;
		/* font-weight: bold; */
		margin: 2rem auto;
	}

	.last-updated {
		text-align: center;
		font-size: 0.75rem;
		color: var(--gray);
	}

	.connected-stations {
		margin: 2rem auto;
		width: min(96%, 22rem);
	}
</style>
