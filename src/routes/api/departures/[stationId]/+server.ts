import { fetchDeparturesForStation } from '$lib/server/api';
import type { RequestHandler } from '../$types';

export const GET: RequestHandler = async ({ params }) => {
	console.log(params.stationId);
	const departures = await fetchDeparturesForStation(params.stationId);

	return new Response(JSON.stringify(departures), {});
};
