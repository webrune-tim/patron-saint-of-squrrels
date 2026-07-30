<script lang="ts">
	import { browser } from '$app/env';
	import MemoryCards from '$lib/components/MemoryCards.svelte';
	import { playChime } from '$lib/utils/soundEffects';

	let footerRef = $state<HTMLElement>();
	let hasFiredConfetti = $state(false);

	$effect(() => {
		if (!browser || !footerRef) return;

		const observer = new IntersectionObserver(
			async ([entry]) => {
				if (entry.isIntersecting && !hasFiredConfetti) {
					try {
						playChime();
						const module = await import('@hiseb/confetti');
						const confetti = module.default;

						confetti({
							particleCount: 180,
							spread: 90,
							origin: { y: 0.75 },
							colors: ['#f7f4eb', '#3d5a45', '#8b5a2b', '#a2b997', '#ffd700']
						} as Parameters<typeof confetti>[0]);
						hasFiredConfetti = true;
					} catch (err) {
						console.error('Confetti dynamic initialization failure:', err);
					}
				} else if (!entry.isIntersecting) {
					hasFiredConfetti = false;
				}
			},
			{ threshold: 0.15 }
		);

		observer.observe(footerRef);

		return () => {
			observer.disconnect();
		};
	});
</script>

<footer bind:this={footerRef} class="scene closing">
	<div class="closing-content">
		<div class="birthday-badge">
			<span class="heart-pulse">❤️</span>
			<span class="birthday-tag">HAPPY BIRTHDAY HELEN</span>
			<span class="heart-pulse">❤️</span>
		</div>

		<h2 class="closing-heading">To My Patron Saint of Squirrels</h2>

		<div class="emoji-row">
			<span class="spinX" aria-hidden="true">🐿️</span>
			<span class="spinX" aria-hidden="true">😘</span>
			<span class="spinX" aria-hidden="true">🎉</span>
			<span class="spinX" aria-hidden="true">🎂</span>
			<span class="spinX" aria-hidden="true">🐿️</span>
		</div>

		<MemoryCards />

		<div class="final-wish-box">
			<p class="final-wish-text">
				May this year bring you all the endless joy, warmth, and magic you give to the world every day.
			</p>
			<p class="love-signature">
				With all my love,<br />
				<span class="signature-name">Timmy One Sock</span>
			</p>
		</div>
	</div>
</footer>

<style>
	.closing {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: var(--gap-lg) var(--gap-md);
		position: relative;
		z-index: 10;
	}

	.closing-content {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: var(--gap-md);
		width: 100%;
		max-width: var(--fluid-max-width);
		text-align: center;
	}

	.birthday-badge {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		background: rgba(247, 244, 235, 0.12);
		border: 1px solid rgba(247, 244, 235, 0.3);
		backdrop-filter: blur(8px);
		padding: 0.4rem 1.2rem;
		border-radius: 9999px;
		box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
	}

	.birthday-tag {
		font-family: var(--font-ui);
		font-size: 0.82rem;
		letter-spacing: 0.12em;
		font-weight: 700;
		color: var(--color-text-primary);
	}

	.heart-pulse {
		animation: pulse-heart 1.5s ease-in-out infinite;
	}

	@keyframes pulse-heart {
		0%, 100% {
			transform: scale(1);
		}
		50% {
			transform: scale(1.25);
		}
	}

	.closing-heading {
		font-family: var(--font-story);
		font-size: clamp(2rem, 4vw, 3.2rem);
		color: var(--color-text-primary);
		text-shadow: 0 4px 20px rgba(0, 0, 0, 0.6);
		margin: 0;
	}

	.emoji-row {
		display: flex;
		gap: 0.75rem;
		font-size: 1.8rem;
		margin-bottom: var(--gap-xs);
	}

	.spinX {
		display: inline-block;
		animation: spinX 3s ease-in-out infinite;
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

	.final-wish-box {
		margin-top: var(--gap-lg);
		padding: var(--gap-md) var(--gap-lg);
		background: linear-gradient(135deg, rgba(30, 48, 35, 0.75), rgba(15, 23, 18, 0.85));
		backdrop-filter: blur(12px);
		border: 1px solid rgba(247, 244, 235, 0.25);
		border-radius: 20px;
		box-shadow: 0 15px 35px rgba(0, 0, 0, 0.5);
		max-width: 32ch;
	}

	.final-wish-text {
		font-family: var(--font-story);
		font-size: 1.15rem;
		line-height: 1.6;
		color: var(--color-text-primary);
		margin-bottom: var(--gap-md);
	}

	.love-signature {
		font-family: var(--font-story);
		font-size: 1rem;
		color: var(--color-text-secondary);
	}

	.signature-name {
		font-size: 1.35rem;
		font-weight: 700;
		font-style: italic;
		color: var(--color-text-primary);
	}
</style>
