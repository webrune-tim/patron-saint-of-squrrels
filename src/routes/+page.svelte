<script lang="ts">
	import { browser } from '$app/env';
	import scrollStory from '$lib/actions/scrollStory';
	import SquirrelProgress from '$lib/components/SquirrelProgress.svelte';
	import AudioPlayer from '$lib/components/AudioPlayer.svelte';
	import HeroHeader from '$lib/components/HeroHeader.svelte';
	import ClosingFooter from '$lib/components/ClosingFooter.svelte';
	import ParticleCanvas from '$lib/components/ParticleCanvas.svelte';
	import { playSoftPop, playSaintHaloSound, playChime } from '$lib/utils/soundEffects';

	import scene1 from '$lib/assets/images/scene-1.png?enhanced';
	import scene2a from '$lib/assets/images/scene-2-a.png?enhanced';
	import scene2b from '$lib/assets/images/scene-2-b.png?enhanced';
	import scene3 from '$lib/assets/images/scene-3.png?enhanced';
	import scene4 from '$lib/assets/images/scene-4.png?enhanced';

	// State
	let audioPlayerRef = $state<ReturnType<typeof AudioPlayer>>();
	let isScrolling = $state(false);
	let isInView = $state(false);
	let isStoryStarted = $state(false);
	let activeSceneId = $state<string>('intro');
	let scenesElement = $state<HTMLElement>();

	// Interactive Micro-Moments State
	let scene1Found = $state(false);
	let scene2Comforted = $state(false);
	let scene3LanternOn = $state(false);
	let scene4HaloActive = $state(false);

	// Parallax scroll ratio calculation & Scene tracking
	$effect(() => {
		if (!browser || !scenesElement) return;

		let scrollTimeout: number | undefined;
		let ticking = false;

		const imageWrappers = scenesElement.querySelectorAll<HTMLElement>('.story-image-wrapper');
		const sceneSections = document.querySelectorAll<HTMLElement>('section.scene');

		const updateParallax = () => {
			const windowHeight = window.innerHeight;
			imageWrappers.forEach((wrapper) => {
				const rect = wrapper.getBoundingClientRect();
				const totalRange = windowHeight + rect.height;
				const currentProgress = windowHeight - rect.top;
				const ratio = Math.max(0, Math.min(1, currentProgress / totalRange));
				wrapper.style.setProperty('--scroll-ratio', ratio.toFixed(3));
			});

			// Detect active section for particle canvas
			sceneSections.forEach((section) => {
				const rect = section.getBoundingClientRect();
				if (rect.top <= windowHeight * 0.5 && rect.bottom >= windowHeight * 0.2) {
					if (activeSceneId !== section.id) {
						activeSceneId = section.id;
					}
				}
			});

			ticking = false;
		};

		const handleScrollState = () => {
			isScrolling = true;
			clearTimeout(scrollTimeout);
			scrollTimeout = window.setTimeout(() => {
				isScrolling = false;
			}, 150);

			if (!ticking) {
				requestAnimationFrame(updateParallax);
				ticking = true;
			}
		};

		const observer = new IntersectionObserver(([entry]) => {
			isInView = entry.isIntersecting;
			if (entry.isIntersecting) {
				window.addEventListener('scroll', handleScrollState, { passive: true });
				handleScrollState();
			} else {
				window.removeEventListener('scroll', handleScrollState);
			}
		});

		observer.observe(scenesElement);

		return () => {
			observer.disconnect();
			window.removeEventListener('scroll', handleScrollState);
			clearTimeout(scrollTimeout);
		};
	});

	const handleStart = (e: MouseEvent) => {
		e.preventDefault();
		audioPlayerRef?.startMusic();
		document.getElementById('intro')?.scrollIntoView({ behavior: 'smooth' });
	};

	function handleScene1Click() {
		scene1Found = !scene1Found;
		playSoftPop();
	}

	function handleScene2Click() {
		scene2Comforted = !scene2Comforted;
		playChime();
	}

	function handleScene3Click() {
		scene3LanternOn = !scene3LanternOn;
		playSoftPop();
	}

	function handleScene4Click() {
		scene4HaloActive = !scene4HaloActive;
		if (scene4HaloActive) {
			playSaintHaloSound();
		} else {
			playSoftPop();
		}
	}
</script>

<ParticleCanvas activeScene={activeSceneId} />

<AudioPlayer bind:this={audioPlayerRef} bind:isStoryStarted />

{#if browser}
	{#if isInView}
		<div class="global-scroll-prompt ui-element" class:hidden={isScrolling}>
			<span>Scroll to progress</span>
			<svg
				class="bounce-arrow"
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="2.5"
				stroke-linecap="round"
				stroke-linejoin="round"
				aria-hidden="true"
			>
				<path d="M12 5v14M19 12l-7 7-7-7" />
			</svg>
		</div>
	{/if}

	<div class="container">
		<HeroHeader {isStoryStarted} onStart={handleStart} />

		<section id="intro" class="scene center-content bg-green">
			<div class="scene-content">
				<div class="story-text-group">
					<h2 class="story-heading">Introduction</h2>
					<p class="story-paragraph">
						In the middle of a routine afternoon, an ordinary stop in a sprawling
						concrete parking lot abruptly halts when Helen spots a tiny, injured
						squirrel dragging itself across the sun-baked asphalt. Haunted by its
						terrified eyes but forced to briefly tend to urgent responsibilities,
						she finds herself locked in a desperate mental race against the clock.
						Returning to the menacing expanse, she can only hope she isn't too
						late to save a fragile life stranded in a desert of indifference.
					</p>
				</div>
			</div>
		</section>

		<div bind:this={scenesElement}>
			<!-- Scene 1 -->
			<section id="scene-1" class="scene bg-grey" style="--step-count: 5" use:scrollStory>
				<div class="sticky-content">
					<SquirrelProgress sceneId="scene-1" />

					<div class="step">
						<h3 class="story-heading">The Gray Labyrinth</h3>
					</div>

					<div class="step">
						<p class="story-paragraph">
							The world of Asphalt-Under-Grid was entirely gray, completely flat,
							and altogether too loud. To the creatures who lived in the high
							branches of the border-pines, it was a forbidden ocean of concrete
							where rumbling metal monkers roamed.
						</p>
					</div>

					<div class="step">
						<p class="story-paragraph">
							Helen was not a monker, but she did drive one. It was a Tuesday, an
							ordinary afternoon filled with an ordinary list of mundane, human
							tasks: milk to buy, packages to mail, clocks to chase. She parked
							her metal machine on the edge of the gray expanse, her mind already
							halfway down her shopping list. But as she stepped onto the
							pavement, a flicker of movement caught her eye near a lonely
							concrete barrier.
						</p>
					</div>

					<div class="step">
						<p class="story-paragraph">
							It wasn't the frantic, joyful leap of a healthy squirrel. It was a
							slow, agonizing crawl. A tiny tuft of gray fur was struggling
							against the heat of the sun-baked asphalt, dragging a useless,
							broken back leg behind it.
						</p>

						<button
							type="button"
							class="micro-action-btn"
							class:active={scene1Found}
							onclick={handleScene1Click}
						>
							{scene1Found ? '❤️ Helen notices the little creature...' : '🔍 Look closely near the barrier'}
						</button>
					</div>

					<div class="step">
						<div class="story-image-wrapper">
							<enhanced:img
								src={scene1}
								alt="A comic-style illustration of a smiling woman with dark curly hair standing in a parking lot. She is wearing a long blue and gold embroidered dress under a grey winter parka, with a single red squirrel perched nearby on a parking line."
							/>
						</div>
					</div>
				</div>
			</section>

			<!-- Scene 2 -->
			<section id="scene-2" class="scene bg-green" style="--step-count: 4" use:scrollStory>
				<div class="sticky-content">
					<SquirrelProgress sceneId="scene-2" />

					<div class="step">
						<h3 class="story-heading">The Kneeling Saint</h3>
					</div>

					<div class="step">
						<p class="story-paragraph">
							Helen stopped. The bustling world around her seemed to lose its
							audio, fading into a quiet, heavy stillness. She knelt, her shadow
							falling over the tiny creature like a cooling canopy.
						</p>

						<button
							type="button"
							class="micro-action-btn"
							class:active={scene2Comforted}
							onclick={handleScene2Click}
						>
							{scene2Comforted ? '✨ Warm canopy of comfort offered' : '🤲 Reach down gently to comfort him'}
						</button>
					</div>

					<div class="step">
						<p class="story-paragraph">
							The squirrel looked up with wide, obsidian eyes, its chest heaving
							with exhaustion. It was terrified, hurt, and entirely stranded in a
							desert of human indifference.
						</p>
					</div>

					<div class="step">
						<p class="story-paragraph">
							"Hold on, little one," Helen whispered. But the ticking clock of the
							day pulled at her sleeve. She had responsibilities that could not
							wait, groceries that would spoil, and no safe way to carry a
							frightened, fragile patient just yet.
						</p>
					</div>

					<div class="step">
						<div class="story-image-wrapper">
							<enhanced:img
								src={scene2b}
								alt="A comic-style illustration from a low angle under a car, showing a small red squirrel crouching cautiously on the dark asphalt next to a tire, surrounded by scattered oak leaves and acorns."
							/>
						</div>
					</div>
				</div>
			</section>

			<!-- Scene 3 -->
			<section id="scene-3" class="scene bg-grey" style="--step-count: 8" use:scrollStory>
				<div class="sticky-content">
					<SquirrelProgress sceneId="scene-3" />

					<div class="step">
						<h3 class="story-heading">The Velvety Sanctuary</h3>
					</div>

					<div class="step">
						<p class="story-paragraph">
							With a heavy heart, she had to leave. For the next hour, as she
							walked through bright supermarket aisles and stood in long lines,
							she didn't see the items on the shelves. She only saw those two
							dark, frightened eyes on the hot pavement.
						</p>
					</div>

					<div class="step">
						<p class="story-paragraph">
							The moment her errands were complete, Helen raced back. The parking
							lot felt larger now, more menacing. Fear tightened in her chest—what
							if she was too late? What if the metal monkers had returned?!
						</p>
					</div>

					<div class="step">
						<p class="story-paragraph">
							She scrambled to the concrete barrier. There, tucked into a sliver
							of shade, the tiny squirrel remained, its strength nearly spent. It
							hadn't given up, because it was waiting for her.
						</p>
					</div>

					<div class="step">
						<p class="story-paragraph">
							At first, it was hesitant, and ran for cover under Helen's car. But
							the little creature was too weak to escape, and it soon realized
							that Helen was not a threat. With a trembling paw, it reached out to
							her.
						</p>
					</div>

					<div class="step">
						<div class="story-image-wrapper">
							<enhanced:img
								src={scene2a}
								alt="An illustration of a smiling woman standing centered in a parking lot, wearing a flowing, long teal velvet robe with ornate gold trim. She is holding a tiny baby squirrel in her cupped hands, surrounded by several other red squirrels on the ground and parked cars."
							/>
						</div>
					</div>

					<div class="step">
						<p class="story-paragraph">
							Gentle as a summer breeze, Helen wrapped the little traveler in a
							soft cloth and nestled him into a makeshift sanctuary. She drove
							with absolute precision, treating every turn like a promise,
							straight to the relative safety of her home.
						</p>
					</div>

					<div class="step">
						<p class="story-paragraph">
							Once home safe on Westwood, Helen began searching for a secure place
							to keep the little soldier for the night, away from a menacing cat.
							A spot under her backyard deck, with a dog gate to separate the
							squirrel from the cat and other outdoor dangers, would do nicely
							until the morning.
						</p>

						<button
							type="button"
							class="micro-action-btn"
							class:active={scene3LanternOn}
							onclick={handleScene3Click}
						>
							{scene3LanternOn ? '🕯️ Warm Sanctuary Lantern lit under the deck' : '💡 Light the Westwood Sanctuary Lantern'}
						</button>
					</div>

					<div class="step">
						<div class="story-image-wrapper" class:lantern-glow={scene3LanternOn}>
							<enhanced:img
								src={scene3}
								alt="A vertical, comic-style illustration looking straight down through the thick metal bars of a closed animal crate. Inside, huddled safely on bundles of dark cloth, a small cluster of baby red squirrels rests together amidst a couple of scattered oak leaves and a soft, magical green glow with floating fireflies."
							/>
						</div>
					</div>
				</div>
			</section>

			<!-- Scene 4 -->
			<section id="scene-4" class="scene bg-green" style="--step-count: 4" use:scrollStory>
				<div class="sticky-content">
					<SquirrelProgress sceneId="scene-4" />

					<div class="step">
						<h3 class="story-heading">The Acorn Crown</h3>
					</div>

					<div class="step">
						<p class="story-paragraph">
							Bright and early the next morning, Helen gently prepared the tiny
							patient for a journey to Sacramento, where the nearest animal
							hospital was located. Once again driving with care yet urgent speed,
							Helen called back to the squirrel, "Hang on, little man! Your misery
							is nearly at an end."
						</p>
					</div>

					<div class="step">
						<p class="story-paragraph">
							In the parking lot of the animal hospital, Helen held the injured
							animal like a small child as she recounted the journey they had been
							through. "We made it, little man. You are going to be all right. I
							promise. Thank you for waiting for me."
						</p>
					</div>

					<div class="step">
						<p class="story-paragraph">
							The healers took him in, promising that his branch-leaping days were
							far from over. And as Helen walked back out into the morning air,
							the trees seemed to lean down, their leaves rustling a new title
							into the wind: Helen, <em>The Patron Saint of Squirrels</em>.
						</p>

						<button
							type="button"
							class="micro-action-btn halo-btn"
							class:active={scene4HaloActive}
							onclick={handleScene4Click}
						>
							{scene4HaloActive ? '👑 The Acorn Crown Shines Bright!' : '✨ Bestow the Acorn Crown on Helen'}
						</button>
					</div>

					<div class="step">
						<div
							class="story-image-wrapper"
							id="scene-4-wrapper"
							class:saint-halo={scene4HaloActive}
						>
							<enhanced:img
								src={scene4}
								alt="A comic-style illustration of a smiling woman standing outside a building labeled 'HOSPITAL' at twilight. She features a glowing neon green oak leaf halo over her head, framed by an archway of trees filled with fireflies and squirrels."
							/>
						</div>
					</div>
				</div>
			</section>
		</div>

		<ClosingFooter />
	</div>
{/if}

<style>
	/* --- Layout & Typography Core --- */
	.container {
		display: flex;
		flex-direction: column;
		width: 100%;
		margin: 0 auto;
		box-sizing: border-box;
	}

	.scene-content {
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 100%;
		max-width: var(--fluid-max-width);
	}

	.story-text-group {
		width: 100%;
		margin-top: var(--gap-md);
	}

	.story-heading {
		text-align: center;
		color: var(--color-text-primary);
		margin-bottom: var(--gap-sm);
	}

	.story-paragraph {
		color: var(--color-text-primary);
		text-shadow: var(--text-shadow);
		max-width: 38ch;
		text-align: center;
		line-height: 1.6;
		margin: 0 auto;
	}

	/* --- Micro Action Buttons --- */
	.micro-action-btn {
		display: block;
		margin: 0.8rem auto 0;
		padding: 0.5rem 1.1rem;
		min-height: 44px;
		background: rgba(15, 23, 18, 0.78);
		backdrop-filter: blur(10px);
		-webkit-backdrop-filter: blur(10px);
		border: 1px solid rgba(247, 244, 235, 0.3);
		border-radius: 9999px;
		color: var(--color-text-primary);
		font-family: var(--font-ui);
		font-size: 0.82rem;
		letter-spacing: 0.04em;
		cursor: pointer;
		box-shadow: 0 4px 15px rgba(0, 0, 0, 0.4);
		transition: all 0.3s cubic-bezier(0.25, 1, 0.5, 1);
		-webkit-tap-highlight-color: transparent;
	}

	.micro-action-btn:hover,
	.micro-action-btn:active {
		transform: translateY(-2px) scale(1.03);
		border-color: rgba(247, 244, 235, 0.6);
		box-shadow: 0 8px 20px rgba(0, 0, 0, 0.6);
	}

	.micro-action-btn.active {
		background: rgba(45, 68, 50, 0.9);
		border-color: rgba(240, 200, 120, 0.8);
		box-shadow: 0 0 20px rgba(240, 200, 120, 0.4);
	}

	.micro-action-btn.halo-btn.active {
		background: linear-gradient(135deg, rgba(80, 140, 90, 0.95), rgba(240, 200, 120, 0.9));
		color: #0b150d;
		font-weight: 700;
	}

	/* --- Dynamic Vignettes & Image Wrappers --- */
	.bg-green :global(.story-image-wrapper) {
		--vignette-color: var(--dark-green);
	}
	.bg-grey :global(.story-image-wrapper) {
		--vignette-color: var(--dark-grey);
	}

	:global(.story-image-wrapper) {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		max-width: 360px;
		aspect-ratio: 3 / 4; /* STRICT PORTRAIT 3:4 ASPECT RATIO */
		margin: var(--gap-md) auto;
		position: relative;
		overflow: hidden;
		border-radius: 16px;
		box-shadow: 0 20px 45px rgba(0, 0, 0, 0.65);
		background-color: var(--vignette-color, #0b0b0b);
		--scroll-ratio: 0.5;
		transition: border-color 0.5s ease, box-shadow 0.5s ease;
	}

	:global(.story-image-wrapper.lantern-glow) {
		box-shadow: 0 0 40px rgba(240, 200, 120, 0.6), 0 20px 45px rgba(0, 0, 0, 0.65);
		border: 1px solid rgba(240, 200, 120, 0.7);
	}

	:global(.story-image-wrapper.saint-halo) {
		box-shadow: 0 0 50px rgba(180, 230, 160, 0.8), 0 0 100px rgba(255, 223, 130, 0.5);
		border: 2px solid rgba(255, 223, 130, 0.9);
	}

	:global(.story-image-wrapper picture) {
		display: block;
		width: 100%;
		height: 100%;
	}

	:global(.story-image-wrapper img) {
		width: 100%;
		height: 100%;
		object-fit: cover;
		display: block;
		position: relative;
		z-index: 1;
		will-change: transform, filter;

		transform: scale(calc(1.05 - (var(--scroll-ratio, 0.5) * 0.05)))
			translateY(calc(-10px + (var(--scroll-ratio, 0.5) * 20px)));
		filter: saturate(calc(0.85 + (var(--scroll-ratio, 0.5) * 0.25)));
		transition: transform 0.1s cubic-bezier(0.25, 1, 0.5, 1), filter 0.1s linear;
	}

	:global(.story-image-wrapper::after) {
		content: '';
		position: absolute;
		inset: 0;
		z-index: 2;
		pointer-events: none;
		border-radius: 16px;
		background: radial-gradient(
			circle,
			transparent calc(42% + (var(--scroll-ratio, 0.5) * 15%)),
			oklch(from var(--vignette-color, #0b0b0b) l c h / 0.5) 75%,
			var(--vignette-color, #0b0b0b) 100%
		);
		transition: background 0.1s linear;
	}

	/* Scoped Clip Shape Modulations for Scene 4 Crown Frame */
	:global(#scene-4-wrapper img) {
		will-change: transform, filter, clip-path;
		clip-path: inset(
			calc(5% * (1 - var(--scroll-ratio, 0.5)))
			calc(5% * (1 - var(--scroll-ratio, 0.5)))
			calc(5% * (1 - var(--scroll-ratio, 0.5)))
			calc(5% * (1 - var(--scroll-ratio, 0.5)))
			round 16px
		);
		transition: transform 0.1s cubic-bezier(0.25, 1, 0.5, 1), clip-path 0.1s ease-out;
	}

	.bounce-arrow {
		width: 24px;
		height: 24px;
		animation: bounce 2s infinite;
	}

	/* --- Global Floating Prompts --- */
	.global-scroll-prompt {
		position: fixed;
		bottom: calc(var(--gap-md) + env(safe-area-inset-bottom, 0px));
		left: 50%;
		transform: translateX(-50%);
		z-index: 10;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.25rem;
		opacity: 0.9;
		pointer-events: none;
		transition:
			opacity 0.5s ease,
			transform 0.5s ease;
	}

	.global-scroll-prompt.hidden {
		opacity: 0;
		transform: translateX(-50%) translateY(10px);
	}

	.global-scroll-prompt .bounce-arrow {
		width: 16px;
		height: 16px;
	}

	@keyframes bounce {
		0%, 20%, 50%, 80%, 100% {
			transform: translateY(0);
		}
		40% {
			transform: translateY(-10px);
		}
		60% {
			transform: translateY(-5px);
		}
	}

	@media (max-width: 600px) {
		:global(.story-image-wrapper) {
			width: 82vw;
			max-width: 290px;
			aspect-ratio: 3 / 4;
			height: auto;
			margin: var(--gap-xs) auto;
		}

		.micro-action-btn {
			font-size: 0.78rem;
			padding: 0.45rem 0.9rem;
		}
	}
</style>
