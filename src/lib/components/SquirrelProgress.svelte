<script lang="ts">
	interface Props {
		sceneId: 'scene-1' | 'scene-2' | 'scene-3' | 'scene-4'
		stepCount?: number
	}

	let { sceneId, stepCount = 5 }: Props = $props()

	let containerWidth = $state(0)
	const BASELINE_Y = 120

	const bounceHeights = {
		'scene-1': 0,
		'scene-2': 30,
		'scene-3': 65,
		'scene-4': 110,
	}

	const generatedPathString = $derived.by(() => {
		if (!containerWidth) return `path('M 0 ${BASELINE_Y} L 100 ${BASELINE_Y}')`

		const peakHeight = bounceHeights[sceneId]

		if (peakHeight === 0) {
			return `path('M 0 ${BASELINE_Y} L ${containerWidth} ${BASELINE_Y}')`
		}

		let pathStr = `M 0 ${BASELINE_Y}`
		const stepWidth = containerWidth / stepCount

		for (let i = 0; i < stepCount; i++) {
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
		top: -35px;
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
	}
</style>
