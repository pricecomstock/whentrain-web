import { fetchDeparturesForStation, fetchStationById } from '$lib/server/api';
import type { PageServerLoad } from './$types';

export const load = (async ({ params }) => {
	const [station, departures] = await Promise.all([
		fetchStationById(params.stationId),
		fetchDeparturesForStation(params.stationId)
	]);
	return {
		station,
		departures
	};
}) satisfies PageServerLoad;
