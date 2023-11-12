import { WHENTRAIN_API_URL, WHENTRAIN_API_KEY } from '$env/static/private';
import { getCachedFunction, getTimedMemoizedFunction } from '$lib/helpers/cache';
import type { ArrivalDepartureTime } from '$lib/types/departures';
import type { Station } from '$lib/types/station';

export interface TrainDetails {
	stations: Station[];
}

const authHeaders = {
	Authorization: `Bearer ${WHENTRAIN_API_KEY}`
};

async function fetchTrainDetailsExternal(train: string): Promise<TrainDetails> {
	return fetch(`${WHENTRAIN_API_URL}/trains/${train}`, { headers: authHeaders }).then((r) =>
		r.json()
	);
}
export const fetchTrainDetails = getTimedMemoizedFunction<
	ReturnType<typeof fetchTrainDetailsExternal>,
	typeof fetchTrainDetailsExternal
>(fetchTrainDetailsExternal, 1000 * 60 * 60 * 24);

async function fetchAllStationsExternal(): Promise<Station[]> {
	const response = await fetch(`${WHENTRAIN_API_URL}/stations`, { headers: authHeaders }).then(
		(r) => r.json()
	);

	return response.stations;
}
export const fetchAllStations = getCachedFunction<
	ReturnType<typeof fetchAllStationsExternal>,
	typeof fetchAllStationsExternal
>(fetchAllStationsExternal, 1000 * 60 * 60 * 24 * 7);

export async function fetchStationById(id: string): Promise<Station> {
	const response = await fetch(`${WHENTRAIN_API_URL}/stations/${id}`, {
		headers: authHeaders
	}).then((r) => r.json());

	return response;
}

async function fetchDeparturesForStationExternal(
	stationId: string
): Promise<ArrivalDepartureTime[]> {
	const response = await fetch(`${WHENTRAIN_API_URL}/departures/${stationId}`, {
		headers: authHeaders
	}).then((r) => r.json());

	return response;
}
export const fetchDeparturesForStation = getTimedMemoizedFunction<
	ReturnType<typeof fetchDeparturesForStationExternal>,
	typeof fetchDeparturesForStationExternal
>(fetchDeparturesForStationExternal, 1000 * 10);
