<script lang="ts">
	import { browser } from '$app/env';

	interface Props {
		activeScene?: string;
	}

	let { activeScene = 'intro' }: Props = $props();

	let canvasRef = $state<HTMLCanvasElement>();

	$effect(() => {
		if (!browser || !canvasRef) return;

		const canvas = canvasRef;
		const ctx = canvas.getContext('2d');
		if (!ctx) return;

		let animationFrameId: number;
		let width = (canvas.width = window.innerWidth);
		let height = (canvas.height = window.innerHeight);

		const handleResize = () => {
			if (!canvas) return;
			width = canvas.width = window.innerWidth;
			height = canvas.height = window.innerHeight;
		};

		window.addEventListener('resize', handleResize);

		// Particle definition
		interface Particle {
			x: number;
			y: number;
			size: number;
			speedX: number;
			speedY: number;
			alpha: number;
			targetAlpha: number;
			pulseSpeed: number;
			color: string;
			type: 'mote' | 'leaf' | 'sparkle';
			rotation: number;
			rotationSpeed: number;
		}

		const getScenePalette = (scene: string) => {
			switch (scene) {
				case 'scene-1':
					// Dim gray, cold concrete feel with rare silver sparkles
					return ['rgba(200, 210, 220, 0.4)', 'rgba(170, 180, 195, 0.3)', 'rgba(230, 230, 240, 0.5)'];
				case 'scene-2':
				case 'scene-3':
					// Warm emerald, golden ember sanctuary
					return ['rgba(240, 200, 120, 0.7)', 'rgba(162, 185, 151, 0.6)', 'rgba(255, 230, 150, 0.8)'];
				case 'scene-4':
					// Divine saintly halo glow: emerald green, amber gold, warm white
					return ['rgba(255, 223, 130, 0.85)', 'rgba(180, 230, 160, 0.75)', 'rgba(255, 255, 255, 0.9)'];
				case 'closing':
					// Festive celebrate
					return ['rgba(255, 215, 0, 0.9)', 'rgba(255, 105, 180, 0.8)', 'rgba(144, 238, 144, 0.85)', 'rgba(135, 206, 250, 0.85)'];
				default:
					// Intro
					return ['rgba(247, 244, 235, 0.5)', 'rgba(162, 185, 151, 0.5)', 'rgba(210, 180, 140, 0.6)'];
			}
		};

		const particleCount = 45;
		const particles: Particle[] = [];

		const createParticle = (): Particle => {
			const palette = getScenePalette(activeScene);
			const isLeaf = Math.random() < 0.25;
			const isSparkle = Math.random() < 0.2;
			return {
				x: Math.random() * width,
				y: Math.random() * height,
				size: isLeaf ? Math.random() * 4 + 3 : isSparkle ? Math.random() * 3 + 2 : Math.random() * 2.5 + 1,
				speedX: (Math.random() - 0.5) * 0.4,
				speedY: isLeaf ? Math.random() * 0.5 + 0.3 : (Math.random() - 0.5) * 0.3 - 0.1,
				alpha: Math.random() * 0.5 + 0.2,
				targetAlpha: Math.random() * 0.7 + 0.3,
				pulseSpeed: Math.random() * 0.02 + 0.008,
				color: palette[Math.floor(Math.random() * palette.length)],
				type: isLeaf ? 'leaf' : isSparkle ? 'sparkle' : 'mote',
				rotation: Math.random() * Math.PI * 2,
				rotationSpeed: (Math.random() - 0.5) * 0.02
			};
		};

		for (let i = 0; i < particleCount; i++) {
			particles.push(createParticle());
		}

		let mouseX = width / 2;
		let mouseY = height / 2;
		const handleMouseMove = (e: MouseEvent) => {
			mouseX = e.clientX;
			mouseY = e.clientY;
		};
		window.addEventListener('mousemove', handleMouseMove, { passive: true });

		const render = () => {
			ctx.clearRect(0, 0, width, height);

			const currentPalette = getScenePalette(activeScene);

			particles.forEach((p) => {
				// Update position with slight mouse influence
				const dx = mouseX - p.x;
				const dy = mouseY - p.y;
				const dist = Math.sqrt(dx * dx + dy * dy);
				if (dist < 120) {
					p.x -= (dx / dist) * 0.5;
					p.y -= (dy / dist) * 0.5;
				}

				p.x += p.speedX;
				p.y += p.speedY;
				p.rotation += p.rotationSpeed;

				// Alpha pulsing
				if (Math.abs(p.alpha - p.targetAlpha) < 0.01) {
					p.targetAlpha = Math.random() * 0.7 + 0.2;
				} else {
					p.alpha += (p.targetAlpha - p.alpha) * p.pulseSpeed;
				}

				// Wrap around screen boundaries
				if (p.y > height + 20) p.y = -20;
				if (p.y < -20) p.y = height + 20;
				if (p.x > width + 20) p.x = -20;
				if (p.x < -20) p.x = width + 20;

				// Refresh color gradually based on scene
				if (Math.random() < 0.01) {
					p.color = currentPalette[Math.floor(Math.random() * currentPalette.length)];
				}

				ctx.save();
				ctx.translate(p.x, p.y);
				ctx.rotate(p.rotation);
				ctx.globalAlpha = p.alpha;

				if (p.type === 'leaf') {
					// Draw small stylized leaf shape
					ctx.fillStyle = p.color;
					ctx.beginPath();
					ctx.ellipse(0, 0, p.size * 1.5, p.size * 0.7, Math.PI / 4, 0, Math.PI * 2);
					ctx.fill();
				} else if (p.type === 'sparkle') {
					// Draw 4-point star
					ctx.fillStyle = p.color;
					ctx.beginPath();
					ctx.moveTo(0, -p.size * 1.8);
					ctx.quadraticCurveTo(0, 0, p.size * 1.8, 0);
					ctx.quadraticCurveTo(0, 0, 0, p.size * 1.8);
					ctx.quadraticCurveTo(0, 0, -p.size * 1.8, 0);
					ctx.quadraticCurveTo(0, 0, 0, -p.size * 1.8);
					ctx.fill();
				} else {
					// Soft glowing orb / firefly
					const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, p.size * 2);
					gradient.addColorStop(0, p.color);
					gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
					ctx.fillStyle = gradient;
					ctx.beginPath();
					ctx.arc(0, 0, p.size * 2, 0, Math.PI * 2);
					ctx.fill();
				}

				ctx.restore();
			});

			animationFrameId = requestAnimationFrame(render);
		};

		render();

		return () => {
			window.removeEventListener('resize', handleResize);
			window.removeEventListener('mousemove', handleMouseMove);
			cancelAnimationFrame(animationFrameId);
		};
	});
</script>

<canvas bind:this={canvasRef} class="particle-canvas" aria-hidden="true"></canvas>

<style>
	.particle-canvas {
		position: fixed;
		inset: 0;
		width: 100vw;
		height: 100vh;
		pointer-events: none;
		z-index: 2;
		opacity: 0.85;
		transition: opacity 0.5s ease;
	}
</style>
