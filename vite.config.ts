import adapter from '@sveltejs/adapter-vercel';
import { sveltekit } from '@sveltejs/kit/vite';
import { enhancedImages } from '@sveltejs/enhanced-img';
import { defineConfig, lazyPlugins } from 'vite-plus';

export default defineConfig({
	staged: {
		'*': 'vp check --fix'
	},
	lint: {
		plugins: ['oxc', 'typescript', 'unicorn', 'react'],
		jsPlugins: [
			'eslint-plugin-svelte',
			{
				name: 'vite-plus',
				specifier: 'vite-plus/oxlint-plugin'
			}
		],
		categories: {
			correctness: 'warn'
		},
		env: {
			builtin: true,
			browser: true,
			node: true
		},

		ignorePatterns: [
			'**/node_modules',
			'**/.output',
			'**/.vercel',
			'**/.netlify',
			'**/.wrangler',
			'.svelte-kit',
			'build',
			'**/.DS_Store',
			'**/Thumbs.db',
			'**/.env',
			'**/.env.*',
			'!**/.env.example',
			'!**/.env.test',
			'**/vite.config.js.timestamp-*',
			'**/vite.config.ts.timestamp-*'
		],
		rules: {
			// ... other rules
			'no-this-before-super': 'error',
			'no-unassigned-vars': 'error',

			// CHANGE THIS LINE: Turn off linter-level undefined tracking
			'no-undef': 'off',

			'no-unexpected-multiline': 'error'
			// ... rest of your rules
		},
		overrides: [
			{
				files: ['**/*.ts', '**/*.tsx', '**/*.mts', '**/*.cts'],
				rules: {
					// ... TS specific rules
				}
			},
			{
				files: ['*.svelte', '**/*.svelte'],
				rules: {
					'no-inner-declarations': 'off',
					'no-self-assign': 'off',
					// Double safety layer for Svelte components:
					'no-undef': 'off'
				},
				jsPlugins: ['eslint-plugin-svelte']
			}
		],
		options: {
			typeAware: true,
			typeCheck: true
		}
	},
	fmt: {
		useTabs: true,
		singleQuote: true,
		tabWidth: 2,
		trailingComma: 'none',
		printWidth: 80,
		sortPackageJson: false,
		ignorePatterns: [
			'package-lock.json',
			'pnpm-lock.yaml',
			'yarn.lock',
			'bun.lock',
			'bun.lockb',
			'/static/'
		]
	},
	plugins: lazyPlugins(() => [
		enhancedImages(),
		sveltekit({
			compilerOptions: {
				// Force runes mode for the project, except for libraries. Can be removed in svelte 6.
				runes: ({ filename }) =>
					filename.split(/[/\\]/).includes('node_modules') ? undefined : true,
				experimental: { async: true }
			},
			adapter: adapter(),
			experimental: { remoteFunctions: true, handleRenderingErrors: true }
		})
	])
});
