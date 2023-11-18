import { fetchDeparturesForStation } from '$lib/server/api';
import type { RequestHandler } from '../$types';

export const GET: RequestHandler = async ({ params }) => {
	const departures = await fetchDeparturesForStation(params.stationId);

	return new Response(JSON.stringify(departures), {});
};
