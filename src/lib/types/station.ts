export interface Station {
	stationId: string;
	complexId: string;
	gtfsStopId: string;
	division: string;
	line: string;
	stopName: string;
	borough: string;
	trains: string[];
	structure: string;
	gtfsLatitude: number;
	gtfsLongitude: number;
	northDirectionLabel: string;
	southDirectionLabel: string;
	ada: boolean;
	adaNotes: string;
}

export type SimplifiedStation = Pick<
	Station,
	'gtfsStopId' | 'gtfsLatitude' | 'gtfsLongitude' | 'trains' | 'stopName' | 'borough'
>;

export type SimplifiedStationWithDistance = SimplifiedStation & { distance: number };
