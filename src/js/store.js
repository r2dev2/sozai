import { writable } from 'svelte/store';

export const fontLoaded = writable(false);
export const theme = writable('light');
