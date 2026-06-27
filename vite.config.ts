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
		enhancedImages({
			defaultDirectives: new URLSearchParams({
				w: '384;768;1200',
				format: 'avif;webp;png'
			})
		}),
		sveltekit({
			compilerOptions: {
				runes: ({ filename }) =>
					filename.split(/[/\\]/).includes('node_modules') ? undefined : true,
				experimental: { async: true }
			},
			adapter: adapter(),
			experimental: { remoteFunctions: true, handleRenderingErrors: true }
		})
	])
});
