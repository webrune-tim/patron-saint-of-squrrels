// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

declare module '*?enhanced' {
	const value: string;
	export default value;
}

declare module '$app/environment' {
	export const browser: boolean;
	export const dev: boolean;
	export const building: boolean;
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

export {};
