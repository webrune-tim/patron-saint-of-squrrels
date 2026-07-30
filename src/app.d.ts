/// <reference types="svelte" />

declare module '*.svelte' {
	import type { Component } from 'svelte';
	const component: Component<any, any, any>;
	export default component;
}

declare module '$app/env' {
	export const browser: boolean;
	export const dev: boolean;
	export const building: boolean;
	export const version: string;
}

declare module '$app/stores' {
	export const page: any;
	export const navigating: any;
	export const updated: any;
}

declare module '$app/paths' {
	export const base: string;
	export const assets: string;
}

declare module '*?enhanced' {
	const value: any;
	export default value;
}

declare module '*.mp3' {
	const value: string;
	export default value;
}
