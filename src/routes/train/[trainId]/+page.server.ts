import { fetchTrainDetails } from '$lib/server/api';
import type { PageServerLoad } from './$types';

export const load = (async ({ params }) => {
	const data = await fetchTrainDetails(params.trainId);
	return {
		...data
	};
}) satisfies PageServerLoad;
