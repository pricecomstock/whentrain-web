import { redirect } from '@sveltejs/kit';
import type { LayoutLoad } from './$types';

export const load = (async ({ url }) => {
	const legacyStation = url.searchParams.get('s') ?? url.searchParams.get('station');
	if (legacyStation) {
		throw redirect(301, `/station/${legacyStation}`);
	}
}) satisfies LayoutLoad;
