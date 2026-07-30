// src/lib/utils/soundEffects.ts
import { browser } from '$app/env';

let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
	if (!browser) return null;
	if (!audioCtx) {
		const AudioContextClass =
			window.AudioContext ||
			(window as unknown as { webkitAudioContext: typeof AudioContext })
				.webkitAudioContext;
		if (AudioContextClass) {
			audioCtx = new AudioContextClass();
		}
	}
	if (audioCtx && audioCtx.state === 'suspended') {
		void audioCtx.resume();
	}
	return audioCtx;
}

export function playChime() {
	const ctx = getAudioContext();
	if (!ctx) return;

	const now = ctx.currentTime;
	const freqs = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6 notes

	freqs.forEach((freq, index) => {
		const osc = ctx.createOscillator();
		const gain = ctx.createGain();

		osc.type = 'sine';
		osc.frequency.setValueAtTime(freq, now + index * 0.08);

		gain.gain.setValueAtTime(0.001, now + index * 0.08);
		gain.gain.exponentialRampToValueAtTime(0.12, now + index * 0.08 + 0.02);
		gain.gain.exponentialRampToValueAtTime(0.0001, now + index * 0.08 + 0.6);

		osc.connect(gain);
		gain.connect(ctx.destination);

		osc.start(now + index * 0.08);
		osc.stop(now + index * 0.08 + 0.65);
	});
}

export function playSoftPop() {
	const ctx = getAudioContext();
	if (!ctx) return;

	const now = ctx.currentTime;
	const osc = ctx.createOscillator();
	const gain = ctx.createGain();

	osc.type = 'sine';
	osc.frequency.setValueAtTime(320, now);
	osc.frequency.exponentialRampToValueAtTime(140, now + 0.06);

	gain.gain.setValueAtTime(0.15, now);
	gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);

	osc.connect(gain);
	gain.connect(ctx.destination);

	osc.start(now);
	osc.stop(now + 0.07);
}

export function playSaintHaloSound() {
	const ctx = getAudioContext();
	if (!ctx) return;

	const now = ctx.currentTime;
	const freqs = [440, 554.37, 659.25, 880, 1108.73, 1318.51]; // A major magic chord

	freqs.forEach((freq, idx) => {
		const osc = ctx.createOscillator();
		const gain = ctx.createGain();

		osc.type = 'triangle';
		osc.frequency.setValueAtTime(freq, now + idx * 0.06);

		gain.gain.setValueAtTime(0.001, now + idx * 0.06);
		gain.gain.exponentialRampToValueAtTime(0.1, now + idx * 0.06 + 0.05);
		gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.06 + 1.2);

		osc.connect(gain);
		gain.connect(ctx.destination);

		osc.start(now + idx * 0.06);
		osc.stop(now + idx * 0.06 + 1.25);
	});
}
