import { fetchAllStations } from '$lib/server/api';
import type { SimplifiedStation } from '$lib/types/station';
import type { PageServerLoad } from './$types';

export const ssr = false;

export const load = (async () => {
	const stationsFull = await fetchAllStations();
	const stations: SimplifiedStation[] = stationsFull.map((station) => ({
		borough: station.borough,
		gtfsStopId: station.gtfsStopId,
		gtfsLatitude: station.gtfsLatitude,
		gtfsLongitude: station.gtfsLongitude,
		trains: station.trains,
		stopName: station.stopName
	}));

	return {
		stations
	};
}) satisfies PageServerLoad;
