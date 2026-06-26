<script lang="ts">
	import { SCENE_CONFIG } from '$lib/utils/scenes'

	let { sceneId, stepCount = 5 } = $props()

	let containerWidth = $state(0)
	const BASELINE_Y = 120

	const generatedPathString = $derived.by(() => {
		if (!containerWidth) return `path('M 0 ${BASELINE_Y} L 100 ${BASELINE_Y}')`

		const peakHeight = SCENE_CONFIG[sceneId].peakHeight

		if (peakHeight === 0) {
			return `path('M 0 ${BASELINE_Y} L ${containerWidth} ${BASELINE_Y}')`
		}

		let pathStr = `M 0 ${BASELINE_Y}`
		const actualStepCount = stepCount ?? SCENE_CONFIG[sceneId].defaultSteps
		const stepWidth = containerWidth / actualStepCount

		for (let i = 0; i < actualStepCount; i++) {
			const startX = i * stepWidth
			const endX = (i + 1) * stepWidth
			const controlX = startX + stepWidth / 2
			const controlY = BASELINE_Y - peakHeight

			pathStr += ` Q ${controlX} ${controlY}, ${endX} ${BASELINE_Y}`
		}

		return `path('${pathStr}')`
	})
</script>

<div class="squirrel-track-wrapper" bind:clientWidth={containerWidth}>
	<div class="squirrel-mover" style="--dynamic-path: {generatedPathString};">
		<div class="squirrel-flipper">🐿️</div>
		<div class="dust-cloud"></div>
	</div>
</div>

<style>
	.squirrel-track-wrapper {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100px;
		pointer-events: none;
		overflow: visible;
		z-index: 5;
	}

	.squirrel-mover {
		position: absolute;
		top: -55px;
		left: 0;

		/* Aggressive WebKit prefixes pointing to the inline variable */
		-webkit-offset-path: var(--dynamic-path);
		offset-path: var(--dynamic-path);

		-webkit-offset-distance: calc((var(--active-step-index, 0) + 1) / var(--step-count, 1) * 100%);
		offset-distance: calc((var(--active-step-index, 0) + 1) / var(--step-count, 1) * 100%);

		-webkit-offset-rotate: 0deg;
		offset-rotate: 0deg;

		transition:
			-webkit-offset-distance 0.4s cubic-bezier(0.25, 1, 0.5, 1),
			offset-distance 0.4s cubic-bezier(0.25, 1, 0.5, 1);
	}

	.squirrel-flipper {
		width: 40px;
		height: 40px;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 2.2rem;

		/* Isolated hardware transform matrix */
		transform: scaleX(-1);
		transform-origin: center center;
		z-index: 2;
	}

	.dust-cloud {
		position: absolute;
		width: 12px;
		height: 12px;
		background: var(--color-text-secondary);
		border-radius: 50%;
		opacity: 0;
		filter: blur(4px);
		left: 10px;
		bottom: 5px;
		z-index: 1;
	}

	/* Tie dust to scenes that have a peak height > 0 */
	/* Since scene-1 is the only one with peakHeight 0, we target others */
	div[style*="path('M 0 120 Q"] .dust-cloud {
		animation: dust-puff 0.4s ease-out infinite;
	}

	@keyframes dust-puff {
		0% { transform: scale(0.5) translate(0, 0); opacity: 0.4; }
		100% { transform: scale(1.5) translate(-10px, 5px); opacity: 0; }
	}
</style>
