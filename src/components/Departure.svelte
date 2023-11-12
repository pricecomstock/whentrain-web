<script lang="ts">
	import type { ArrivalDepartureTime } from '$lib/types/departures';
	import type { Station } from '$lib/types/station';
	import TrainIcon from './TrainIcon.svelte';
	export let departure: ArrivalDepartureTime;
	export let station: Station;

	let debug = false;

	let currentMs = Date.now();
	const arrivingThresholdMs = -20000;

	setInterval(() => {
		currentMs = Date.now();
	}, 5000);

	function displayMinutesFromMs(ms: number) {
		return Math.max(Math.round(ms / 60000), 0);
	}

	function toggleDebug() {
		debug = !debug;
	}

	let defaultStationLabel =
		departure.direction === 'N'
			? station.northDirectionLabel || 'End of line'
			: station.southDirectionLabel || 'End of line';

	$: arrivalTimestamp = departure.timestamp * 1000;
	$: arrivalTimeHHMMSS = new Date(arrivalTimestamp).toLocaleTimeString('en-us');
	$: directionLabel = departure.directionName || defaultStationLabel;
	$: msRemaining = arrivalTimestamp - currentMs;
	$: minutesRemaining = displayMinutesFromMs(msRemaining);
	$: isArrivingSoon = msRemaining < arrivingThresholdMs;
</script>

{#if departure.timestamp && station.gtfsStopId}
	<div class="arrival" class:arriving={isArrivingSoon} on:click={toggleDebug}>
		<!-- <div class="train-icon"> -->
		<TrainIcon train={departure.train} size="max(3vw, 2rem)" />
		<!-- </div> -->
		<div class="direction-label">{directionLabel}</div>
		{#if debug}
			<div class="eta">
				<div class="debug">
					<span class="debug-bold">{minutesRemaining} min</span> ({(msRemaining / 1000).toFixed(
						0
					)}s)
					<br />
					{arrivalTimeHHMMSS}
				</div>
			</div>
		{:else}
			<div class="eta">
				{minutesRemaining} min
			</div>
		{/if}
	</div>
{/if}

<style>
	.arrival {
		display: flex;
		align-items: center;
		justify-content: stretch;
		font-weight: bold;
		font-size: max(2vw, 2em);
	}

	.train-icon {
		flex: 0 1;
		align-self: baseline;
	}

	.small-eta {
	}

	.direction-label {
		flex: 1 0;
		text-align: left;
		margin-left: max(1.5vw, 0.5rem);
		/* overflow: hidden;
    white-space: nowrap; */
	}

	.debug-bold {
		font-weight: bold;
		color: #333;
	}

	.eta {
		flex: 0 1 7ch;
		text-align: right;
	}

	.debug {
		font-size: 0.5em;
		margin-left: 0.3rem;
		font-weight: normal;
		color: #888;
	}

	@keyframes arrivingFlash {
		from {
			opacity: 1;
		}

		to {
			opacity: 0;
		}
	}
	.arriving {
		animation: arrivingFlash 1s ease-in infinite alternate;
	}
</style>
