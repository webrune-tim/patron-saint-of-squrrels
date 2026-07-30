<script lang="ts">
	import { browser } from '$app/env';

	let footerRef = $state<HTMLElement>();
	let hasFiredConfetti = $state(false);

	$effect(() => {
		if (!browser || !footerRef) return;

		const observer = new IntersectionObserver(
			async ([entry]) => {
				if (entry.isIntersecting && !hasFiredConfetti) {
					try {
						const module = await import('@hiseb/confetti');
						const confetti = module.default;

						confetti({
							particleCount: 150,
							spread: 80,
							origin: { y: 0.8 },
							colors: ['#f7f4eb', '#3d5a45', '#8b5a2b', '#a2b997']
						} as Parameters<typeof confetti>[0]);
						hasFiredConfetti = true;
					} catch (err) {
						console.error('Confetti dynamic initialization failure:', err);
					}
				} else if (!entry.isIntersecting) {
					hasFiredConfetti = false;
				}
			},
			{ threshold: 0.1 }
		);

		observer.observe(footerRef);

		return () => {
			observer.disconnect();
		};
	});
</script>

<footer bind:this={footerRef} class="scene closing">
	<div class="closing-content">
		<span>
			Happy Birthday Helen!!<br />
			<span class="spinX" aria-hidden="true">🐿️</span>
			<span class="spinX" aria-hidden="true">😘</span>
			<span class="spinX" aria-hidden="true">🎉</span>
			<span class="spinX" aria-hidden="true">🎂</span>
			<span class="spinX" aria-hidden="true">🐿️</span>
		</span>

		<span>I pray this year bring you<br />all the happiness you deserve.</span>
		<span>I love you,<br />Timmy One Sock</span>
	</div>
</footer>

<style>
	.closing {
		display: grid;
		place-content: center;
	}

	.closing-content {
		display: flex;
		flex-direction: column;
		gap: var(--gap-sm);
		font-size: var(--text-md);
		text-align: center;
	}

	footer {
		padding: var(--gap-sm);
		color: var(--color-text-primary);
	}

	.spinX {
		display: inline-block;
		animation: spinX 2s ease-in-out infinite;
	}

	@keyframes spinX {
		0% {
			transform: rotateY(0deg);
		}
		50% {
			transform: rotateY(180deg);
		}
		100% {
			transform: rotateY(360deg);
		}
	}
</style>
