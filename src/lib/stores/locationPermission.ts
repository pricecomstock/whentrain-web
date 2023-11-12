import { writable, type Writable } from 'svelte/store';

export const hasLocationPermission: Writable<boolean> = writable(
	localStorage.getItem('hasLocationPermission') === 'true' || false
);

hasLocationPermission.subscribe((val) => {
	localStorage.setItem('hasLocationPermission', String(val));
});
