<script lang="ts">
	import { onMount } from 'svelte';
	import music from '$lib/assets/audio/music.mp3';
	import { playChime, playSoftPop } from '$lib/utils/soundEffects';

	interface Props {
		isStoryStarted?: boolean;
	}

	let { isStoryStarted = $bindable(false) }: Props = $props();

	let audioRef = $state<HTMLAudioElement>();
	let isPlaying = $state(false);
	let isMuted = $state(false);
	let volume = $state(0.35);
	let isAutoplayBlocked = $state(false);

	onMount(() => {
		if (audioRef) {
			audioRef.volume = volume;
		}
	});

	export function startMusic() {
		if (!audioRef) return Promise.resolve();

		playChime();

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
		playSoftPop();
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
		playSoftPop();
		audioRef.muted = !audioRef.muted;
		isMuted = audioRef.muted;
	}

	function handleVolumeChange(e: Event) {
		const target = e.target as HTMLInputElement;
		volume = parseFloat(target.value);
		if (audioRef) {
			audioRef.volume = volume;
			if (volume === 0) {
				isMuted = true;
				audioRef.muted = true;
			} else if (isMuted) {
				isMuted = false;
				audioRef.muted = false;
			}
		}
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

		<input
			type="range"
			min="0"
			max="1"
			step="0.05"
			value={volume}
			oninput={handleVolumeChange}
			class="volume-slider"
			aria-label="Volume slider"
			title="Volume"
		/>

		{#if isAutoplayBlocked}
			<span class="audio-notice">Tap play to enable audio</span>
		{/if}
	</div>
{/if}

<style>
	.audio-controls {
		position: fixed;
		top: calc(var(--gap-md) + env(safe-area-inset-top, 0px));
		right: calc(var(--gap-md) + env(safe-area-inset-right, 0px));
		z-index: 100;
		display: flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.4rem 0.85rem;
		background: rgba(15, 23, 18, 0.82);
		backdrop-filter: blur(12px);
		-webkit-backdrop-filter: blur(12px);
		border: 1px solid rgba(247, 244, 235, 0.25);
		border-radius: 9999px;
		box-shadow: 0 8px 25px rgba(0, 0, 0, 0.5);
		transition: all 0.3s ease;
		-webkit-tap-highlight-color: transparent;
	}

	.audio-btn {
		background: transparent;
		border: none;
		color: var(--color-text-primary);
		font-size: 1.05rem;
		cursor: pointer;
		min-width: 44px;
		min-height: 44px;
		padding: 0;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		transition: transform 0.15s ease, opacity 0.15s ease;
		-webkit-tap-highlight-color: transparent;
	}

	.audio-btn:hover {
		transform: scale(1.12);
		opacity: 0.9;
	}

	.audio-btn:focus-visible {
		outline: 2px solid var(--color-text-primary);
		outline-offset: 2px;
	}

	.volume-slider {
		width: 60px;
		height: 4px;
		accent-color: var(--color-text-primary);
		cursor: pointer;
	}

	.audio-notice {
		font-size: 0.75rem;
		color: var(--color-text-secondary);
		padding-left: 0.25rem;
	}

	@media (max-width: 600px) {
		.audio-controls {
			top: calc(var(--gap-sm) + env(safe-area-inset-top, 0px));
			right: calc(var(--gap-sm) + env(safe-area-inset-right, 0px));
			padding: 0.2rem 0.5rem;
		}

		.volume-slider {
			display: none;
		}
	}
</style>
