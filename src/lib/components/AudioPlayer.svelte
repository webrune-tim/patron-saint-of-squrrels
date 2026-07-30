<script lang="ts">
	import { onMount } from 'svelte';
	import music from '$lib/assets/audio/music.mp3';

	interface Props {
		isStoryStarted?: boolean;
	}

	let { isStoryStarted = $bindable(false) }: Props = $props();

	let audioRef = $state<HTMLAudioElement>();
	let isPlaying = $state(false);
	let isMuted = $state(false);
	let isAutoplayBlocked = $state(false);

	onMount(() => {
		if (audioRef) {
			audioRef.volume = 0.35;
		}
	});

	export function startMusic() {
		if (!audioRef) return Promise.resolve();

		return audioRef
			.play()
			.then(() => {
				isPlaying = true;
				isStoryStarted = true;
				isAutoplayBlocked = false;
			})
			.catch((err) => {
				console.warn('Autoplay prevented or interrupted:', err);
				isAutoplayBlocked = true;
				isStoryStarted = true;
			});
	}

	function togglePlay() {
		if (!audioRef) return;
		if (isPlaying) {
			audioRef.pause();
			isPlaying = false;
		} else {
			audioRef.play().then(() => {
				isPlaying = true;
				isAutoplayBlocked = false;
			});
		}
	}

	function toggleMute() {
		if (!audioRef) return;
		audioRef.muted = !audioRef.muted;
		isMuted = audioRef.muted;
	}
</script>

<audio bind:this={audioRef} loop preload="auto">
	<source src={music} type="audio/mpeg" />
</audio>

{#if isStoryStarted}
	<div class="audio-controls ui-element" role="region" aria-label="Audio Controls">
		<button
			type="button"
			class="audio-btn"
			onclick={togglePlay}
			aria-label={isPlaying ? 'Pause background music' : 'Play background music'}
			title={isPlaying ? 'Pause music' : 'Play music'}
		>
			{isPlaying ? '⏸' : '▶'}
		</button>

		<button
			type="button"
			class="audio-btn"
			onclick={toggleMute}
			aria-label={isMuted ? 'Unmute background music' : 'Mute background music'}
			title={isMuted ? 'Unmute music' : 'Mute music'}
		>
			{isMuted ? '🔇' : '🔊'}
		</button>

		{#if isAutoplayBlocked}
			<span class="audio-notice">Tap play to enable audio</span>
		{/if}
	</div>
{/if}

<style>
	.audio-controls {
		position: fixed;
		top: var(--gap-md);
		right: var(--gap-md);
		z-index: 100;
		display: flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.4rem 0.75rem;
		background: rgba(15, 23, 18, 0.75);
		backdrop-filter: blur(8px);
		border: 1px solid rgba(247, 244, 235, 0.2);
		border-radius: 9999px;
		box-shadow: 0 4px 15px rgba(0, 0, 0, 0.4);
		transition: all 0.3s ease;
	}

	.audio-btn {
		background: transparent;
		border: none;
		color: var(--color-text-primary);
		font-size: 1rem;
		cursor: pointer;
		padding: 0.25rem 0.4rem;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		transition: transform 0.15s ease, opacity 0.15s ease;
	}

	.audio-btn:hover {
		transform: scale(1.15);
		opacity: 0.9;
	}

	.audio-btn:focus-visible {
		outline: 2px solid var(--color-text-primary);
		outline-offset: 2px;
	}

	.audio-notice {
		font-size: 0.75rem;
		color: var(--color-text-secondary);
		padding-left: 0.25rem;
	}

	@media (max-width: 600px) {
		.audio-controls {
			top: var(--gap-sm);
			right: var(--gap-sm);
		}
	}
</style>
