import type { Station } from '$lib/types/station';
import { writable } from 'svelte/store';

export const selectedStation = writable<Station | null>(null);
