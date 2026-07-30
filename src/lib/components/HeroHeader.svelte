<script lang="ts">
	import intro from '$lib/assets/images/intro.png?enhanced';

	interface Props {
		isStoryStarted: boolean;
		onStart: (e: MouseEvent) => void;
	}

	let { isStoryStarted, onStart }: Props = $props();
</script>

<header class="scene center-content hero-scene">
	<div class="scene-content">
		<div class="title-badge ui-element">A True Story Dedicated to Helen</div>
		<h1 class="story-heading hero-title">The Patron Saint of the Squirrels</h1>
		<p class="hero-subtitle">Scroll or tap start to embark on the journey</p>

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
		<span class="btn-glow"></span>
		<span class="btn-text">{isStoryStarted ? 'Playing ♪' : 'Begin Story ✨'}</span>
	</button>
</header>

<style>
	.hero-scene {
		position: relative;
		padding-top: calc(var(--gap-lg) + env(safe-area-inset-top, 0px));
	}

	.scene-content {
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 100%;
		max-width: var(--fluid-max-width);
	}

	.title-badge {
		background: rgba(247, 244, 235, 0.12);
		border: 1px solid rgba(247, 244, 235, 0.25);
		backdrop-filter: blur(8px);
		-webkit-backdrop-filter: blur(8px);
		padding: 0.35rem 1rem;
		border-radius: 9999px;
		color: var(--color-text-secondary);
		font-size: 0.72rem;
		letter-spacing: 0.1em;
		margin-bottom: 0.5rem;
		box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
	}

	.hero-title {
		font-size: clamp(2rem, 5vw, 4rem);
		text-shadow: 0 4px 25px rgba(0, 0, 0, 0.7);
		margin-bottom: 0.25rem;
		background: linear-gradient(180deg, #f7f4eb 0%, #d4e0ce 100%);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
	}

	.hero-subtitle {
		font-family: var(--font-ui);
		font-size: 0.9rem;
		color: var(--color-text-secondary);
		opacity: 0.85;
		margin-bottom: var(--gap-sm);
		letter-spacing: 0.03em;
		text-align: center;
	}

	.story-image-wrapper {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		max-width: 360px;
		aspect-ratio: 3 / 4;
		margin: var(--gap-md) auto;
		position: relative;
		overflow: hidden;
		border-radius: 16px;
		box-shadow: 0 25px 50px rgba(0, 0, 0, 0.75);
		background-color: var(--vignette-color, #0b0b0b);
		--scroll-ratio: 0.5;
		border: 1px solid rgba(247, 244, 235, 0.2);
	}

	.story-image-wrapper.intro-pic {
		width: 82vw;
		max-width: 290px;
		aspect-ratio: 3 / 4;
		height: auto;
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
		transform: scale(calc(1.05 - (var(--scroll-ratio, 0.5) * 0.05)))
			translateY(calc(-10px + (var(--scroll-ratio, 0.5) * 20px)));
		filter: saturate(calc(0.85 + (var(--scroll-ratio, 0.5) * 0.25)));
		transition: transform 0.1s cubic-bezier(0.25, 1, 0.5, 1), filter 0.1s linear;
	}

	.story-image-wrapper::after {
		content: '';
		position: absolute;
		inset: 0;
		z-index: 2;
		pointer-events: none;
		border-radius: 16px;
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
		display: flex;
		align-items: center;
		justify-content: center;
		min-height: 48px;
		min-width: 160px;
		width: fit-content;
		text-align: center;
		text-decoration: none;
		color: var(--color-text-primary);
		padding: var(--gap-sm) calc(var(--gap-md) * 1.5);
		margin: var(--gap-md) auto;
		border-radius: 1000px;
		border: 2px solid var(--color-text-primary);
		background-color: rgba(30, 48, 35, 0.75);
		backdrop-filter: blur(12px);
		-webkit-backdrop-filter: blur(12px);
		box-shadow: 0 15px 25px rgba(0, 0, 0, 0.5);
		text-shadow: 0px 0px 5px rgba(0, 0, 0, 0.7);
		cursor:
			url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><text y="20" font-size="20">🐿️</text></svg>')
				12 12,
			pointer;
		overflow: hidden;
		transition: all 0.3s cubic-bezier(0.25, 1, 0.5, 1);
		-webkit-tap-highlight-color: transparent;
	}

	.btn-glow {
		position: absolute;
		inset: -50%;
		background: radial-gradient(circle, rgba(247, 244, 235, 0.3) 0%, transparent 70%);
		opacity: 0;
		transition: opacity 0.3s ease;
		pointer-events: none;
	}

	.start-btn:hover,
	.start-btn:active {
		box-shadow: 0 10px 30px rgba(247, 244, 235, 0.3);
		background-color: rgba(45, 68, 50, 0.9);
		transform: translateY(-2px) scale(1.03);
	}

	.start-btn:hover .btn-glow {
		opacity: 1;
	}

	.start-btn:focus-visible {
		outline: 3px solid var(--color-text-primary);
		outline-offset: 4px;
	}

	@media (max-width: 600px) {
		.hero-title {
			font-size: clamp(1.8rem, 7.5vw, 2.8rem);
		}

		.story-image-wrapper.intro-pic {
			width: 82vw;
			max-width: 290px;
			aspect-ratio: 3 / 4;
			height: auto;
		}
	}
</style>
