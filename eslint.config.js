import js from '@eslint/js';
import svelte from 'eslint-plugin-svelte';
import ts from 'typescript-eslint';
import globals from 'globals';

export default [
	js.configs.recommended,
	...ts.configs.recommended,
	...svelte.configs['flat/recommended'],
	{
		languageOptions: {
			globals: {
				...globals.browser,
				...globals.node,
				$state: 'readonly',
				$derived: 'readonly',
				$props: 'readonly',
				$effect: 'readonly',
				$inspect: 'readonly'
			}
		}
	}
];
