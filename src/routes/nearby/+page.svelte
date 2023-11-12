<script lang="ts">
	import { calculateDistanceMiles } from '$lib/helpers/utils';
	import { hasLocationPermission } from '$lib/stores/locationPermission';
	import { onMount } from 'svelte';
	import type { PageServerData } from './$types';
	import type { SimplifiedStationWithDistance } from '$lib/types/station';

	import StationList from '$components/StationList.svelte';

	export let data: PageServerData;
	$: ({ stations } = data);

	// TODO use localstorage to check if we have previously gotten permission for the user's location
	// If not, do not prompt until they click the button.

	const distanceThresholdMiles = 0.7;
	let nearbyStations: SimplifiedStationWithDistance[] = [];

	const getNearbyStations = async () => {
		if (!navigator) {
			return;
		}
		navigator.geolocation.getCurrentPosition(
			(position) => {
				const { latitude, longitude } = position.coords;

				hasLocationPermission.set(true);

				nearbyStations = [];
				for (const station of stations) {
					const distance = calculateDistanceMiles(
						latitude,
						longitude,
						station.gtfsLatitude,
						station.gtfsLongitude
					);
					if (distance < distanceThresholdMiles) {
						nearbyStations.push({ ...station, distance });
					}
				}
				nearbyStations.sort((a, b) => a.distance - b.distance);
			},
			() => {
				console.log("can't get location");
			}
		);
	};

	onMount(() => {
		if ($hasLocationPermission) {
			getNearbyStations();
		}
	});
</script>

{#if !$hasLocationPermission}
	<div class="location-prompt">
		<p>
			To view nearby stations, we need to use your location. This data is never sent to the server.
		</p>
		<button class="button" on:click={getNearbyStations}>Ok, use my location.</button>
		<p>In the future, this page will show you nearby stations automatically when you load it.</p>
	</div>
{/if}

<div class="station-list">
	{#if $hasLocationPermission && nearbyStations.length === 0}
		<p>No nearby stations found.</p>
		<p>Maybe you're not here in the big apple?</p>
	{/if}
	<h2>Nearby Stations</h2>
	<StationList stations={nearbyStations} />
</div>

{#if $hasLocationPermission}
	<p class="info">
		Hey! You've given this page location permission, but that data never leaves your device. You can
		bookmark this page to instantly see nearby stations when you load it.
	</p>
{/if}

<style>
	.station-list {
		margin: 0 auto;
		width: min(100%, 27rem);
	}

	p {
		max-width: 50ch;
		margin: 1rem auto;
		text-align: center;
	}

	.location-prompt {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.info {
		font-size: 0.8rem;
		color: #777;
	}
</style>
