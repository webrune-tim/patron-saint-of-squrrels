<script lang="ts">
	import intro from '$lib/assets/images/intro.png?enhanced';

	interface Props {
		isStoryStarted: boolean;
		onStart: (e: MouseEvent) => void;
	}

	let { isStoryStarted, onStart }: Props = $props();
</script>

<header class="scene center-content">
	<div class="scene-content">
		<h1 class="story-heading">The Patron Saint of the Squirrels</h1>

		<div class="story-image-wrapper intro-pic">
			<enhanced:img
				src={intro}
				alt="A realistic photograph of a smiling woman with dark curly hair lying down on a parking lot asphalt, wearing an elegant teal velvet robe with gold embroidery, gently feeding a red squirrel from her open hands."
				loading="eager"
				fetchpriority="high"
			/>
		</div>
	</div>

	<button
		type="button"
		class="story-paragraph start-btn"
		onclick={onStart}
		aria-label={isStoryStarted ? 'Story playing' : 'Start story experience'}
	>
		{isStoryStarted ? 'Playing ♪' : 'Start'}
	</button>
</header>

<style>
	.scene-content {
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 100%;
		max-width: var(--fluid-max-width);
	}

	.story-heading {
		text-align: center;
		color: var(--color-text-primary);
		margin-bottom: var(--gap-sm);
	}

	.story-paragraph {
		color: var(--color-text-primary);
		text-shadow: var(--text-shadow);
		max-width: 38ch;
		text-align: center;
		line-height: 1.6;
		margin: 0 auto;
	}

	.story-image-wrapper {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		max-width: 500px;
		margin: var(--gap-md) auto;
		position: relative;
		overflow: hidden;
		border-radius: 12px;
		box-shadow: 0 20px 40px rgba(0, 0, 0, 0.65);
		background-color: var(--vignette-color, #0b0b0b);
		--scroll-ratio: 0.5;
	}

	.story-image-wrapper.intro-pic {
		height: 55dvh;
		width: auto;
		aspect-ratio: 3 / 4;
	}

	.story-image-wrapper :global(picture) {
		display: block;
		width: 100%;
		height: 100%;
	}

	.story-image-wrapper :global(img) {
		width: 100%;
		height: 100%;
		object-fit: cover;
		display: block;
		position: relative;
		z-index: 1;
		will-change: transform, filter;
		transform: scale(calc(1.18 - (var(--scroll-ratio, 0.5) * 0.12)))
			translateY(calc(-30px + (var(--scroll-ratio, 0.5) * 60px)));
		filter: saturate(calc(0.8 + (var(--scroll-ratio, 0.5) * 0.3)));
		transition: transform 0.1s cubic-bezier(0.25, 1, 0.5, 1), filter 0.1s linear;
	}

	.story-image-wrapper::after {
		content: '';
		position: absolute;
		inset: 0;
		z-index: 2;
		pointer-events: none;
		border-radius: 12px;
		background: radial-gradient(
			circle,
			transparent calc(42% + (var(--scroll-ratio, 0.5) * 15%)),
			oklch(from var(--vignette-color, #0b0b0b) l c h / 0.5) 75%,
			var(--vignette-color, #0b0b0b) 100%
		);
		transition: background 0.1s linear;
	}

	.start-btn {
		position: relative;
		z-index: 10;
		display: block;
		width: fit-content;
		text-align: center;
		text-decoration: none;
		color: var(--color-text-primary);
		padding: var(--gap-sm) var(--gap-md);
		margin: var(--gap-md) auto;
		border-radius: 1000px;
		border: 2px solid var(--color-text-primary);
		background-color: rgb(from var(--color-text-primary) r g b / 0.4);
		box-shadow: 0 15px 17px rgba(0, 0, 0, 0.5);
		text-shadow: 0px 0px 5px rgba(0, 0, 0, 0.7);
		cursor:
			url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><text y="20" font-size="20">🐿️</text></svg>')
				12 12,
			pointer;
		transition: background-color 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease;
	}

	.start-btn:hover {
		box-shadow: 0 7px 8px rgba(0, 0, 0, 0.5);
		background-color: rgb(from var(--color-text-primary) r g b / 0.55);
		transform: translateY(-2px);
	}

	.start-btn:focus-visible {
		outline: 3px solid var(--color-text-primary);
		outline-offset: 4px;
	}
</style>
