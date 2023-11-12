import { writable } from 'svelte/store';

export const isShowingMenu = writable<boolean>(false);
export const toggleMenu = () => isShowingMenu.update((val) => !val);
