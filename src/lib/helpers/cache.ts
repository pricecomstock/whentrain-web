// export function getCachedFunction<T, F extends (args: T) => ReturnType<F>>(fn: F, cacheMs: number) {
export function getCachedFunction<R, T extends () => R>(fn: T, cacheMs: number) {
	let result: R;
	let lastCallTime = 0;

	return function () {
		const timeSinceLastCall = Date.now() - lastCallTime;
		if (timeSinceLastCall > cacheMs) {
			try {
				result = fn();
				lastCallTime = Date.now();
			} catch (error) {
				// Do not cache if we get an error
				console.error(error);
				throw error;
			}
		}

		return result;
	};
}

/**
 * Hey maybe a little weird depending on args!
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getTimedMemoizedFunction<R, T extends (...args: any[]) => R>(fn: T, ttlMs: number) {
	const resultMap = new Map<string, { timestamp: number; result: R }>();

	return function (...args: Parameters<T>) {
		const cachedResult = resultMap.get(JSON.stringify(args));
		if (cachedResult && cachedResult.timestamp + ttlMs > Date.now()) {
			return cachedResult.result;
		}

		const result = fn(...args);
		resultMap.set(JSON.stringify(args), { result, timestamp: Date.now() });

		// Maybe to ensure we delete it but shouldn't be necessary
		setTimeout(() => {
			resultMap.delete(JSON.stringify(args));
		}, ttlMs);

		return result;
	};
}
