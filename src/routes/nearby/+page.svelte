<script lang="ts">
	import { calculateDistanceMiles } from '$lib/helpers/utils';
	import { hasLocationPermission } from '$lib/stores/locationPermission';
	import { onMount } from 'svelte';
	import type { PageServerData } from './$types';
	import type { SimplifiedStationWithDistance } from '$lib/types/station';

	import StationList from '$components/StationList.svelte';
	import { fly } from 'svelte/transition';
	import { isShowingMenu } from '$lib/stores/showMenu';

	export let data: PageServerData;
	$: ({ stations } = data);

	let isLoading = false;
	let error = '';

	const distanceThresholdMiles = 0.75;
	let latLongDisplay = '';
	let nearbyStations: SimplifiedStationWithDistance[] = [];

	const getNearbyStations = async () => {
		if (!navigator) {
			return;
		}
		isLoading = true;
		navigator.geolocation.getCurrentPosition(
			(position) => {
				const { latitude, longitude } = position.coords;

				latLongDisplay = `${latitude.toFixed(3)}, ${longitude.toFixed(3)}`;

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
				isLoading = false;

				isShowingMenu.set(false);
			},
			() => {
				isLoading = false;
				error = 'Either you denied location permission, or your browser does not support it.';
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

<svelte:head>
	<title>whentrain.nyc - nearby</title>
</svelte:head>

{#if !$hasLocationPermission}
	<div class="location-prompt">
		<p>
			To view nearby stations, we need to use your location. This data is never sent to the server.
		</p>
		<button class="button" on:click={getNearbyStations}>Ok, use my location.</button>
		<p>In the future, this page will show you nearby stations automatically when you load it.</p>
	</div>
{/if}

{#if isLoading}
	<div class="loader-container">
		<div class="loader-spin">
			<img src="img/subway-icons/l.svg" alt="" />
		</div>
		oading...
	</div>
{/if}

{#if error}
	<p>{error}</p>
{/if}

{#if !isLoading && $hasLocationPermission && nearbyStations.length === 0}
	<p>No nearby stations found.</p>
	<p>Maybe you're not here in the big apple? Your location is {latLongDisplay}</p>
{/if}

{#if nearbyStations.length > 0}
	<div class="station-list" in:fly={{ x: -100, duration: 150 }}>
		<h2>Nearby Stations</h2>
		<StationList stations={nearbyStations} />
	</div>
{/if}

{#if $hasLocationPermission}
	<p class="info">
		Hey! You've given this page location permission, but that data never leaves your device. You can
		bookmark this page to instantly see nearby stations when you load it.
	</p>
{/if}

<style>
	.station-list {
		margin: 0 auto;
		width: min(96%, 27rem);
	}

	p {
		max-width: 50ch;
		margin: 1rem auto;
		text-align: center;
	}

	.loader-container {
		display: flex;
		/* flex-direction: column; */
		justify-content: center;
		align-items: center;
		gap: 0.25rem;

		font-size: 1.5em;
	}

	.loader-spin {
		animation: spin 2s linear infinite;

		width: 2rem;
		height: 2rem;
	}

	@keyframes spin {
		from {
			transform: rotate(0deg);
		}
		to {
			transform: rotate(360deg);
		}
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
