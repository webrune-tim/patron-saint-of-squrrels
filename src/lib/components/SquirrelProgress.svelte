<script lang="ts">
	import { SCENE_CONFIG, type SceneId } from '$lib/utils/scenes';

	interface Props {
		sceneId: SceneId;
		stepCount?: number;
	}

	let { sceneId, stepCount = 5 }: Props = $props();

	let containerWidth = $state(0);
	const BASELINE_Y = 80;

	const chapterTitle = $derived(SCENE_CONFIG[sceneId]?.chapterName ?? '');
	const hasPeaks = $derived(SCENE_CONFIG[sceneId]?.peakHeight > 0);

	const generatedPathString = $derived.by(() => {
		if (!containerWidth) return `path('M 0 ${BASELINE_Y} L 100 ${BASELINE_Y}')`;

		const peakHeight = SCENE_CONFIG[sceneId]?.peakHeight ?? 0;

		if (peakHeight === 0) {
			return `path('M 0 ${BASELINE_Y} L ${containerWidth} ${BASELINE_Y}')`;
		}

		let pathStr = `M 0 ${BASELINE_Y}`;
		const actualStepCount = stepCount ?? SCENE_CONFIG[sceneId]?.defaultSteps ?? 5;
		const stepWidth = containerWidth / actualStepCount;

		for (let i = 0; i < actualStepCount; i++) {
			const endX = (i + 1) * stepWidth;
			const controlX = i * stepWidth + stepWidth / 2;
			const controlY = BASELINE_Y - peakHeight;

			pathStr += ` Q ${controlX} ${controlY}, ${endX} ${BASELINE_Y}`;
		}

		return `path('${pathStr}')`;
	});
</script>

<div
	class="squirrel-track-wrapper"
	bind:clientWidth={containerWidth}
	data-has-peaks={hasPeaks}
>
	<div class="chapter-badge ui-element">{chapterTitle}</div>

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
		height: 90px;
		pointer-events: none;
		overflow: visible;
		z-index: 10;
		display: flex;
		justify-content: center;
	}

	.chapter-badge {
		position: absolute;
		top: calc(10px + env(safe-area-inset-top, 0px));
		background: rgba(15, 23, 18, 0.8);
		backdrop-filter: blur(10px);
		-webkit-backdrop-filter: blur(10px);
		border: 1px solid rgba(247, 244, 235, 0.25);
		padding: 0.35rem 0.85rem;
		border-radius: 9999px;
		color: var(--color-text-primary);
		font-size: 0.75rem;
		letter-spacing: 0.06em;
		box-shadow: 0 4px 15px rgba(0, 0, 0, 0.4);
		pointer-events: none;
		z-index: 4;
	}

	.squirrel-mover {
		position: absolute;
		top: -45px;
		left: 0;

		-webkit-offset-path: var(--dynamic-path);
		offset-path: var(--dynamic-path);

		-webkit-offset-distance: calc(
			(var(--active-step-index, 0) + 1) / var(--step-count, 1) * 100%
		);
		offset-distance: calc(
			(var(--active-step-index, 0) + 1) / var(--step-count, 1) * 100%
		);

		-webkit-offset-rotate: 0deg;
		offset-rotate: 0deg;

		transition:
			-webkit-offset-distance 0.4s cubic-bezier(0.25, 1, 0.5, 1),
			offset-distance 0.4s cubic-bezier(0.25, 1, 0.5, 1);
	}

	.squirrel-flipper {
		width: 42px;
		height: 42px;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 2.4rem;
		transform: scaleX(-1);
		transform-origin: center center;
		z-index: 2;
		filter: drop-shadow(0 4px 10px rgba(0, 0, 0, 0.6));
		animation: squirrel-wiggle 3s ease-in-out infinite alternate;
	}

	@keyframes squirrel-wiggle {
		0% {
			transform: scaleX(-1) translateY(0deg);
		}
		50% {
			transform: scaleX(-1) translateY(-3px) rotate(-3deg);
		}
		100% {
			transform: scaleX(-1) translateY(0px) rotate(3deg);
		}
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

	.squirrel-track-wrapper[data-has-peaks='true'] .dust-cloud {
		animation: dust-puff 0.4s ease-out infinite;
	}

	@keyframes dust-puff {
		0% {
			transform: scale(0.5) translate(0, 0);
			opacity: 0.4;
		}
		100% {
			transform: scale(1.5) translate(-10px, 5px);
			opacity: 0;
		}
	}

	@media (max-width: 600px) {
		.chapter-badge {
			font-size: 0.7rem;
			padding: 0.28rem 0.7rem;
		}
	}
</style>
