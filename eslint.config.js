import js from '@eslint/js';
import svelte from 'eslint-plugin-svelte';
import ts from 'typescript-eslint';
import globals from 'globals';

export default [
	js.configs.recommended,
	...ts.configs.recommended,
	...svelte.configs['flat/recommended'],
	{
		// Global environments for standard JS/TS files
		languageOptions: {
			globals: {
				...globals.browser,
				...globals.node
			}
		}
	},
	{
		// Targets Svelte files specifically
		files: ['**/*.svelte'],
		languageOptions: {
			parserOptions: {
				parser: ts.parser
			},
			globals: {
				// Explicitly register Svelte 5 compiler runes as valid globals
				$state: 'readonly',
				$derived: 'readonly',
				$props: 'readonly',
				$effect: 'readonly',
				$inspect: 'readonly',
				$bindable: 'readonly',
				$host: 'readonly'
			}
		},
		rules: {
			// Disable legacy JS undefined check in Svelte files;
			// TypeScript handles missing/undefined variables perfectly instead.
			'no-undef': 'off'
		}
	}
];
