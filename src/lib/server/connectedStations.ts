import type { Station } from '$lib/types/station';
import { fetchAllStations } from './api';

let stationsByGTFSId: Map<string, Station>;
let stationsByComplexId: Map<string, Station[]>;

export async function getConnectedStations(gtfsId: string): Promise<Station[]> {
	// This should only run once and then we can uh, cache it forever.
	// Sorry in 2038 when the 2nd Ave Subway opens and this breaks maybe?
	if (!stationsByGTFSId?.size || !stationsByComplexId?.size) {
		const stations = await fetchAllStations();
		stationsByGTFSId = new Map(stations.map((s) => [s.gtfsStopId, s]));
		stationsByComplexId = new Map();
		stations.forEach((s) => {
			const complexId = s.complexId ?? 'NONE';
			const existing = stationsByComplexId.get(complexId) ?? [];
			existing.push(s);
			stationsByComplexId.set(complexId, existing);
		});
	}

	const complexId = stationsByGTFSId.get(gtfsId)?.complexId;
	return (stationsByComplexId.get(complexId ?? '') ?? []).filter((s) => s.gtfsStopId !== gtfsId);
}
