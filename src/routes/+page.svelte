<script lang="ts">
    import { onMount } from 'svelte';
    import { scrollStory } from '$lib/actions/scrollStory';

    import intro from '$lib/assets/images/intro.png?enhanced';
    import scene1 from '$lib/assets/images/scene-1-b.png?enhanced';
    import scene2 from '$lib/assets/images/scene-2-a.png?enhanced';
    import scene3 from '$lib/assets/images/scene-3.png?enhanced';
    import scene4 from '$lib/assets/images/scene-4.png?enhanced';
    import music from '$lib/assets/audio/music.mp3';

    let audioComponent: HTMLAudioElement;
    let isAutoplayBlocked = false;
    let isScrolling = false;
    let scrollTimeout: number;

    onMount(() => {
        if (audioComponent) {
            audioComponent.volume = 0.5;
        }

        const handleScrollState = () => {
            isScrolling = true;
            clearTimeout(scrollTimeout);
            scrollTimeout = window.setTimeout(() => {
                isScrolling = false;
            }, 1200); // Re-appear 1.2s after they stop scrolling
        };

        window.addEventListener('scroll', handleScrollState, { passive: true });
        return () => {
            window.removeEventListener('scroll', handleScrollState);
            clearTimeout(scrollTimeout);
        };
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

<div class="global-scroll-prompt ui-element" class:hidden={isScrolling}>
    <span>Scroll to progress</span>
    <svg class="bounce-arrow" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <path d="M12 5v14M19 12l-7 7-7-7"/>
    </svg>
</div>

<div class="container">
    <header class="scene">
        <div class="scene-content center-content">
            <h1 class="story-heading">The Patron Saint of the Squirrels</h1>

            <div class="story-image-wrapper">
                <enhanced:img src={intro} alt="Introduction Scene" />
            </div>
        </div>

        <a class="story-paragraph start-btn" href="#intro" on:click={handleStart}>
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
                    In the middle of a routine afternoon, an ordinary stop in a sprawling concrete parking lot abruptly halts when Helen spots a tiny, injured squirrel dragging itself across the sun-baked asphalt. Haunted by its terrified eyes but forced to briefly tend to urgent responsibilities, she finds herself locked in a desperate mental race against the clock. Returning to the menacing expanse, she can only hope she isn't too late to save a fragile life stranded in a desert of indifference.
                </p>
            </div>
        </div>
    </section>

    <section id="scene-1" class="scene" use:scrollStory>
        <div class="sticky-content">
            <div class="scene-progress-bar"></div>
            
            <div class="step">
                <h3 class="story-heading">
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
                    The world of Asphalt-Under-Grid was entirely gray, completely flat, and altogether too loud. To the creatures who lived in the high branches of the border-pines, it was a forbidden ocean of concrete where rumbling metal monkers roamed.
                </p>
            </div>

            <div class="step">
                <p class="story-paragraph">
                    Helen was not a monker, but she did drive one. It was a Tuesday, an ordinary afternoon filled with an ordinary list of mundane, human tasks: milk to buy, packages to mail, clocks to chase. 
She parked her metal machine on the edge of the gray expanse, her mind already halfway down her shopping list. But as she stepped onto the pavement, a flicker of movement caught her eye near a lonely concrete barrier.
                </p>
            </div>

            <div class="step">
                <p class="story-paragraph">
                    It wasn't the frantic, joyful leap of a healthy squirrel. It was a slow, agonizing crawl. A tiny tuft of gray fur was struggling against the heat of the sun-baked asphalt, dragging a useless, broken back leg behind it.
                </p>
            </div>
        </div>
    </section>

    <section id="scene-2" class="scene" use:scrollStory>
        <div class="sticky-content">
            <div class="scene-progress-bar"></div>

            <div class="step">
                <h3 class="story-heading">
                    The Kneeling Saint
                </h3>
            </div>

            <div class="step">
                <div class="story-image-wrapper">
                    <enhanced:img src={scene2} alt="Neon and Stone" />
                </div>
            </div>

            <div class="step">
                <p class="story-paragraph">
                    Helen stopped. The bustling world around her seemed to lose its audio, fading into a quiet, heavy stillness. She knelt, her shadow falling over the tiny creature like a cooling canopy.
                </p>
            </div>

            <div class="step">
                <p class="story-paragraph">
                    The squirrel looked up with wide, obsidian eyes, its chest heaving with exhaustion. It was terrified, hurt, and entirely stranded in a desert of human indifference.
                </p>
            </div>

            <div class="step">
                <p class="story-paragraph">
                   "Hold on, little one," Helen whispered. But the ticking clock of the day pulled at her sleeve. She had responsibilities that could not wait, groceries that would spoil, and no safe way to carry a frightened, fragile patient just yet.
                </p>
            </div>
        </div>
    </section>

    <section id="scene-3" class="scene" use:scrollStory>
        <div class="sticky-content">
            <div class="scene-progress-bar"></div>

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
            <div class="scene-progress-bar"></div>

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

    /* --- Dynamic Chapter Progress Bar Indicator --- */
    .scene-progress-bar {
        position: absolute;
        top: 8px;
        left: 0;
        width: 100%;
        height: 6px;
        background: rgb(from var(--color-text-secondary) r g b / 0.25);
    }

    .scene-progress-bar::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        width: calc((var(--active-step-index, 0) + 1) / var(--step-count, 1) * 100%);
        background: var(--color-text-primary);
        transition: width 0.4s cubic-bezier(0.25, 1, 0.5, 1);
    }

    /* --- Global Ambient Scrolling Cue --- */
    .global-scroll-prompt {
        position: fixed;
        bottom: var(--gap-md);
        left: 50%;
        transform: translateX(-50%);
        z-index: 10;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0.25rem;
        opacity: 0.8;
        pointer-events: none;
        transition: opacity 0.5s ease, transform 0.5s ease;
    }

    .global-scroll-prompt.hidden {
        opacity: 0;
        transform: translateX(-50%) translateY(10px);
    }

    .global-scroll-prompt .bounce-arrow {
        width: 16px;
        height: 16px;
    }

    footer {
        padding: var(--gap-sm);
        color: rgb(from var(--color-text-primary) r g b /0.75);
    }
</style>
