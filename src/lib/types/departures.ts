export interface ArrivalDepartureTime {
	stationId: string;
	direction: string;
	stationDirection: string;
	train: string;
	timestamp: number;
	tripId: string;
	routeId: string;
	directionName: string;
}

export interface TrainDirection {
	train: string;
	direction: string;
}
