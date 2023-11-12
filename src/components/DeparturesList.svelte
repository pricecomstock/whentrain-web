<script lang="ts">
	import type { ArrivalDepartureTime, TrainDirection } from '$lib/types/departures';
	import type { Station } from '$lib/types/station';
	import Departure from './Departure.svelte';

	const options = {
		hiddenTrainDirections: [] as TrainDirection[],
		soonestTrainDeparture: 0,
		latestTrainArrival: 1000 * 60 * 30,
		maxDeparturesPerTrainDirection: 8,
		maxDepartures: 16
	};

	export let departures: ArrivalDepartureTime[];
	export let station: Station;

	function stationHasDirection(direction: string) {
		return direction === 'N'
			? station.northDirectionLabel !== ''
			: station.southDirectionLabel !== '';
	}

	$: trains = [...new Set(departures.map(({ train }) => train))];
	$: trainDirections = trains.flatMap((train) => [
		{ train, direction: 'S' },
		{ train, direction: 'N' }
	]);
	$: filteredDepartures = departures.filter((departure) => {
		const matchingHiddenTrainDirection = options.hiddenTrainDirections.some((trainDirection) => {
			return (
				trainDirection.train === departure.train && trainDirection.direction === departure.direction
			);
		});
		const departureMs = departure.timestamp * 1000 - Date.now();

		const keep =
			departureMs > options.soonestTrainDeparture &&
			departureMs < options.latestTrainArrival &&
			!matchingHiddenTrainDirection;

		return keep;
	});
	$: departuresByTrainDirections = new Map<TrainDirection, ArrivalDepartureTime[]>(
		trainDirections.map((trainDirection) => {
			return [
				trainDirection,
				filteredDepartures
					.filter((departure) => {
						return (
							departure.direction === trainDirection.direction &&
							departure.train === trainDirection.train
						);
					})
					.slice(0, options.maxDeparturesPerTrainDirection) // Limit to 2 for each train direction
			];
		})
	);

	$: relevantDepartures = [...departuresByTrainDirections.values()]
		.flat()
		.filter((departure) => stationHasDirection(departure.direction))
		.sort((a, b) => a.timestamp - b.timestamp)
		.slice(0, options.maxDepartures);
	// $: relevantArrivals =
	// [...trains].map((train) => {
	//   return arrivals
	//   // get arrivals for train
	//   .filter((arrival) => arrival.train === train)
	//   // Get first 2 arrivals in each direction for train
	//   .flatMap(arrival => [
	//   ...arrivals.filter(({direction}) => direction === "S").slice(0,2),
	//   ...arrivals.filter(({direction}) => direction === "N").slice(0,2)
	// ]
	// })
	// .sort((a, b) => a.timestamp - b.timestamp)
</script>

<div>
	{#each relevantDepartures as departure}
		<div class="departure-container">
			<Departure {station} {departure} />
		</div>
	{/each}
</div>

<style>
	.departure-container {
		padding: max(0.75rem, 0.75vmin) max(0.75rem, 1vw);
		border-bottom: 1px solid #ccc;
	}

	.departure-container:last-child {
		border-bottom: none;
	}
</style>
