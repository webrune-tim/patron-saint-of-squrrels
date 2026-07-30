<script lang="ts">
	import { playSoftPop, playChime } from '$lib/utils/soundEffects';

	interface Card {
		id: string;
		title: string;
		frontSubtitle: string;
		backText: string;
		icon: string;
		isFlipped: boolean;
	}

	let cards = $state<Card[]>([
		{
			id: 'compassion',
			title: 'The Compassionate Heart',
			frontSubtitle: 'Tap to open memory',
			backText:
				'Helen, your gentle heart never hesitates when a helpless soul needs saving. Standing up for the tiny squirrel dragging its leg in a busy parking lot showed the rare, pure kindness that makes you so deeply special.',
			icon: '🐿️',
			isFlipped: false
		},
		{
			id: 'westwood',
			title: 'Safe Haven at Westwood',
			frontSubtitle: 'Tap to open memory',
			backText:
				'From building safe shelters under the deck away from sneaky cats to driving across miles with absolute tender care — you turn everywhere you touch into a warm sanctuary of love.',
			icon: '🏡',
			isFlipped: false
		},
		{
			id: 'patron-saint',
			title: 'Patron Saint of My Heart',
			frontSubtitle: 'Tap to open memory',
			backText:
				'You aren’t just the Patron Saint of Squirrels — you are the patron saint of my world. Thank you for your warmth, your courage, and your beautiful laughter. Happy Birthday my love!',
			icon: '👑',
			isFlipped: false
		}
	]);

	function toggleFlip(index: number) {
		cards[index].isFlipped = !cards[index].isFlipped;
		if (cards[index].isFlipped) {
			playChime();
		} else {
			playSoftPop();
		}
	}
</script>

<div class="memory-container">
	<h3 class="memory-title">Love Notes & Birthday Memories</h3>
	<p class="memory-subtitle">Tap each card to unlock a birthday message</p>

	<div class="cards-grid">
		{#each cards as card, idx (card.id)}
			<button
				type="button"
				class="card-wrapper"
				class:flipped={card.isFlipped}
				onclick={() => toggleFlip(idx)}
				aria-label={`Toggle flip card: ${card.title}`}
			>
				<div class="card-inner">
					<div class="card-front">
						<span class="card-icon">{card.icon}</span>
						<h4 class="card-front-title">{card.title}</h4>
						<span class="card-hint">{card.frontSubtitle} ✨</span>
					</div>
					<div class="card-back">
						<span class="card-back-icon">{card.icon}</span>
						<p class="card-back-text">{card.backText}</p>
						<span class="card-signature">— Timmy One Sock ❤️</span>
					</div>
				</div>
			</button>
		{/each}
	</div>
</div>

<style>
	.memory-container {
		width: 100%;
		max-width: var(--fluid-max-width);
		margin: var(--gap-lg) auto 0;
		padding: 0 var(--gap-md);
		text-align: center;
	}

	.memory-title {
		font-family: var(--font-story);
		color: var(--color-text-primary);
		font-size: var(--text-md);
		margin-bottom: 0.25rem;
		text-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
	}

	.memory-subtitle {
		font-family: var(--font-ui);
		font-size: 0.85rem;
		color: var(--color-text-secondary);
		margin-bottom: var(--gap-md);
		letter-spacing: 0.04em;
		opacity: 0.85;
	}

	.cards-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
		gap: var(--gap-md);
		justify-content: center;
	}

	.card-wrapper {
		background: transparent;
		border: none;
		perspective: 1000px;
		-webkit-perspective: 1000px;
		height: 250px;
		cursor: pointer;
		padding: 0;
		text-align: inherit;
		outline: none;
		-webkit-tap-highlight-color: transparent;
	}

	.card-inner {
		position: relative;
		width: 100%;
		height: 100%;
		transition: transform 0.7s cubic-bezier(0.4, 0.2, 0.2, 1);
		transform-style: preserve-3d;
		-webkit-transform-style: preserve-3d;
		border-radius: 16px;
		box-shadow: 0 10px 30px rgba(0, 0, 0, 0.45);
	}

	.card-wrapper.flipped .card-inner {
		transform: rotateY(180deg);
	}

	.card-front,
	.card-back {
		position: absolute;
		inset: 0;
		backface-visibility: hidden;
		-webkit-backface-visibility: hidden;
		border-radius: 16px;
		padding: var(--gap-md);
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		border: 1px solid rgba(247, 244, 235, 0.25);
		box-sizing: border-box;
	}

	.card-front {
		background: linear-gradient(135deg, rgba(30, 48, 35, 0.88), rgba(15, 25, 18, 0.96));
		backdrop-filter: blur(10px);
		-webkit-backdrop-filter: blur(10px);
		color: var(--color-text-primary);
	}

	.card-back {
		background: linear-gradient(135deg, rgba(45, 68, 50, 0.96), rgba(22, 36, 25, 0.98));
		backdrop-filter: blur(10px);
		-webkit-backdrop-filter: blur(10px);
		color: var(--color-text-primary);
		transform: rotateY(180deg);
		justify-content: space-between;
	}

	.card-wrapper:hover .card-front,
	.card-wrapper:focus-visible .card-front,
	.card-wrapper:active .card-front {
		border-color: rgba(247, 244, 235, 0.5);
		box-shadow: 0 0 20px rgba(247, 244, 235, 0.15);
	}

	.card-icon {
		font-size: 2.8rem;
		margin-bottom: 0.5rem;
		filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.4));
	}

	.card-front-title {
		font-family: var(--font-story);
		font-size: 1.2rem;
		margin-bottom: 0.4rem;
		color: var(--color-text-primary);
	}

	.card-hint {
		font-family: var(--font-ui);
		font-size: 0.75rem;
		color: var(--color-text-secondary);
		opacity: 0.8;
		letter-spacing: 0.05em;
		text-transform: uppercase;
	}

	.card-back-icon {
		font-size: 1.5rem;
		opacity: 0.7;
	}

	.card-back-text {
		font-family: var(--font-story);
		font-size: 0.9rem;
		line-height: 1.5;
		color: var(--color-text-primary);
		text-align: center;
		margin: 0;
	}

	.card-signature {
		font-family: var(--font-story);
		font-style: italic;
		font-size: 0.85rem;
		color: rgba(247, 244, 235, 0.85);
	}

	@media (max-width: 600px) {
		.cards-grid {
			grid-template-columns: 1fr;
		}

		.card-wrapper {
			height: 240px;
		}

		.card-back-text {
			font-size: 0.86rem;
		}
	}
</style>
