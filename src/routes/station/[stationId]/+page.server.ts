import { fetchDeparturesForStation, fetchStationById } from '$lib/server/api';
import { getConnectedStations } from '$lib/server/connectedStations';
import type { PageServerLoad } from './$types';

export const load = (async ({ params }) => {
	const [station, departures, connectedStations] = await Promise.all([
		fetchStationById(params.stationId),
		fetchDeparturesForStation(params.stationId),
		getConnectedStations(params.stationId)
	]);

	return {
		station,
		departures,
		connectedStations
	};
}) satisfies PageServerLoad;
