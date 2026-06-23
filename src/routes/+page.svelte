<script lang="ts">
	import { onMount } from 'svelte';
	import { scrollStory } from '$lib/actions/scrollStory';

	import intro from '$lib/assets/images/intro.png?enhanced';
	import scene1 from '$lib/assets/images/scene-1.png?enhanced';
	import scene2 from '$lib/assets/images/scene-2-a.png?enhanced';
	import scene3 from '$lib/assets/images/scene-3.png?enhanced';
	import scene4 from '$lib/assets/images/scene-4.png?enhanced';
	import music from '$lib/assets/audio/music.mp3';

	let audioComponent: HTMLAudioElement;
	let isAutoplayBlocked = false;

	onMount(() => {
		if (audioComponent) {
			audioComponent.volume = 0.5;
		}
	});

	const handleStart = () => {
		if (audioComponent) {
			audioComponent.play().catch(() => {
				isAutoplayBlocked = true;
			});
		}
	};
</script>

<audio autoplay bind:this={audioComponent}>
    <source src={music} type="audio/mpeg">
</audio>

<div class="container">
    <header class="scene">
        <div class="scene-content center-content">
            <h1 class="story-heading">The Patron Saint of the Squirrels</h1>

            <div class="story-image-wrapper">
                <enhanced:img src={intro} alt="Introduction Scene" />
            </div>
        </div>

        <a class="story-paragraph start-btn" href="#intro" onclick={handleStart}>
            <span>Start</span>
            <svg class="bounce-arrow" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <path d="M12 5v14M19 12l-7 7-7-7"/>
            </svg>
        </a>
    </header>

    <section id="intro" class="scene center-content">
        <div class="scene-content">
            <div class="story-text-group">
                <h2 class="story-heading">Introduction</h2>
                <p class="story-paragraph">
                    In the middle of a routine afternoon, an ordinary stop in a sprawling concrete parking lot
                    abruptly halts when Helen spots a tiny, injured squirrel dragging itself across the
                    sun-baked asphalt. Haunted by its terrified eyes but forced to briefly tend to urgent
                    responsibilities, she finds herself locked in a desperate mental race against the clock.
                    Returning to the menacing expanse, she can only hope she isn't too late to save a fragile
                    life stranded in a desert of indifference.
                </p>
            </div>
            <div class="story-paragraph start-btn">
                <span>Scroll</span>
                <svg class="bounce-arrow" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M12 5v14M19 12l-7 7-7-7"/>
                </svg>
            </div>
        </div>
    </section>

    <section id="scene-1" class="scene" use:scrollStory>
		<div class="sticky-content">
			<div class="step">
				<h3 class="story-heading">
					The Inciting Incident:<br />
					The Gray Labyrinth
				</h3>
			</div>

			<div class="step">
				<div class="story-image-wrapper">
					<enhanced:img src={scene1} alt="The Gray Labyrinth" />
				</div>
			</div>

			<div class="step">
				<p class="story-paragraph">
					The world of Asphalt-Under-Grid was entirely defined by structural constraints, a brutal monolith of high-contrast stone and calculation.
				</p>
			</div>

			<div class="step">
				<p class="story-paragraph">
					Helen did not look like a monster, but the machine she operated hummed with a terrifying architectural intent.
				</p>
			</div>
		</div>
	</section>

	<section id="scene-2" class="scene" use:scrollStory>
		<div class="sticky-content">
			<div class="step">
				<h3 class="story-heading">
					The Fracture Line:<br />
					Neon and Stone
				</h3>
			</div>

			<div class="step">
				<div class="story-image-wrapper">
					<enhanced:img src={scene2} alt="Neon and Stone" />
				</div>
			</div>

			<div class="step">
				<p class="story-paragraph">
					The neon grid flickered in precise intervals, casting sharp, synthetic green hues onto the wet concrete blocks below.
				</p>
			</div>

			<div class="step">
				<p class="story-paragraph">
					Every citizen walked with calculated paces. To step outside the design system was to invite immediate computational parsing.
				</p>
			</div>
		</div>
	</section>

	<section id="scene-3" class="scene" use:scrollStory>
		<div class="sticky-content">
			<div class="step">
				<h3 class="story-heading">
					The Descent:<br />
					Below the Sub-Basement
				</h3>
			</div>

			<div class="step">
				<div class="story-image-wrapper">
					<enhanced:img src={scene3} alt="Below the Sub-Basement" />
				</div>
			</div>

			<div class="step">
				<p class="story-paragraph">
					She found the missing arrays deep inside the forgotten system layers. Old code, written before the strict layout mechanics were put in place.
				</p>
			</div>

			<div class="step">
				<p class="story-paragraph">
					It wasn't the frantic, joyful leap of raw chaos; it was a legacy architecture waiting patiently to be executed once more.
				</p>
			</div>
		</div>
	</section>

	<section id="scene-4" class="scene" use:scrollStory>
		<div class="sticky-content">
			<div class="step">
				<h3 class="story-heading">
					The Resolution:<br />
					Recompiling the World
				</h3>
			</div>

			<div class="step">
				<div class="story-image-wrapper">
					<enhanced:img src={scene4} alt="Recompiling the World" />
				</div>
			</div>

			<div class="step">
				<p class="story-paragraph">
					As the final block initialized, the boundaries shifted. The hard limits of the grid dissolved into soft, manageable layers.
				</p>
			</div>

			<div class="step">
				<p class="story-paragraph">
					The story didn't end. It simply evolved past its initial layout parameters, fully integrated, and gracefully complete.
				</p>
			</div>
		</div>
	</section>

    <footer class="attribution">
        <small>
            Music: <a href="https://www.scottbuckley.com.au/" target="_blank" rel="noopener noreferrer">Simplicity by Scott Buckley</a><br>
            License: <a href="https://creativecommons.org/licenses/by/4.0/" target="_blank" rel="noopener noreferrer">Creative Commons — Attribution 4.0 International — CC BY 4.0</a><br>
            Free Download / Stream: <a href="https://links.al/BfM" target="_blank" rel="noopener noreferrer">https://links.al/BfM</a><br>
            Music promoted by <a href="https://links.al/youtube" target="_blank" rel="noopener noreferrer">Audio Library</a>
        </small>
    </footer>
</div>

<style>
    .scene-number {
        font-size: var(--text-xxxl);
        font-family: var(--font-story);
        position: absolute;
        top: -2rem;
        left: 0;
        color: rgb(from var(--color-text-primary) r g b /0.75);
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

    .story-image-wrapper :global(picture) {
        display: block;
        max-height: 60vh;
    }

    .story-image-wrapper :global(img) {
        width: auto;
        max-height: 60vh;
    }

    /* --- New Styles for Bouncing Button Assembly --- */
    .start-btn {
        display: flex;
        place-content: center;
        gap: 0.5rem;
        text-decoration: none;
        padding: var(--gap-sm);
    }

    .bounce-arrow {
        width: 24px;
        height: 24px;
        animation: bounce 2s infinite;
    }

    @keyframes bounce {
        0%, 20%, 50%, 80%, 100% {
            transform: translateY(0);
        }
        40% {
            transform: translateY(-8px);
        }
        60% {
            transform: translateY(-4px);
        }
    }

    footer {
        padding: var(--gap-sm);
        color: rgb(from var(--color-text-primary) r g b /0.75);
    }
</style>
