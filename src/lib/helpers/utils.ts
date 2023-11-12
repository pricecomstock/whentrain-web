const MILES_PER_DEGREE_LAT_NYC = 68.96;
const MILES_PER_DEGREE_LONG_NYC = 52.33;

export function calculateDistance(latA, longA, latB, longB) {
	const distLat = latB - latA;
	const distLong = longB - longA;
	return Math.sqrt(distLat * distLat + distLong * distLong);
}

export function calculateDistanceMiles(latA, longA, latB, longB) {
	const distLat = (latB - latA) * MILES_PER_DEGREE_LAT_NYC;
	const distLong = (longB - longA) * MILES_PER_DEGREE_LONG_NYC;
	return Math.sqrt(distLat * distLat + distLong * distLong);
}

/** For ordering boroughs vaguely geographically */
export function getBoroughOrder(abbr: string) {
	const boroughOrder = {
		bx: 0,
		m: 1,
		bk: 2,
		q: 3,
		si: 3
	};

	return boroughOrder[abbr.toLowerCase() as keyof typeof boroughOrder];
}

export function compareBoroughs(a: string, b: string) {
	return getBoroughOrder(a) - getBoroughOrder(b);
}

export function getBoroughName(abbr: string) {
	const boroughs = {
		m: 'Manhattan',
		bk: 'Brooklyn',
		bx: 'Bronx',
		q: 'Queens',
		si: 'Staten Island'
	};
	return boroughs[abbr.toLowerCase() as keyof typeof boroughs];
}
