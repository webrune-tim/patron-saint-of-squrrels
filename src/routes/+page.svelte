<script lang="ts">
    import { onMount } from 'svelte';
    import intro from '$lib/assets/images/intro.png?enhanced';
    import scene1 from '$lib/assets/images/scene-1.png?enhanced';
    import scene2 from '$lib/assets/images/scene-2-a.png?enhanced';
    import scene3 from '$lib/assets/images/scene-3.png?enhanced';
    import scene4 from '$lib/assets/images/scene-4.png?enhanced';
    import music from '$lib/assets/audio/music.mp3';

    let audioComponent: HTMLAudioElement;
    let isAutoplayBlocked = false; // Declared to avoid reference errors

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
    }
</script>

<audio autoplay bind:this={audioComponent}>
    <source src={music} type="audio/mpeg">
</audio>

<div class="container">
    <header class="scene">
        <div class="scene-content">
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

    <section id="intro" class="scene">
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
        </div>
    </section>

    <section id="scene-1" class="scene">
        <div class="scene-number">1</div>
        <div class="scene-content">
            <h3 class="story-heading">The Inciting Incident:<br /> The Gray Labyrinth</h3>

            <div class="story-image-wrapper">
                <enhanced:img src={scene1} alt="Gray Labyrinth" />
            </div>

            <div class="story-text-group">
                <p class="story-paragraph">
                    The world of Asphalt-Under-Grid was entirely gray, completely flat, and altogether too
                    loud. To the creatures who lived in the high branches of the border-pines, it was a
                    forbidden ocean of concrete where rumbling metal monsters roamed.
                </p>

                <p class="story-paragraph">
                    Helen did not look like a monster, but she did drive one. It was a Tuesday, an ordinary
                    afternoon filled with an ordinary list of mundane, human tasks: milk to buy, packages to
                    mail, clocks to chase.
                </p>

                <p class="story-paragraph">
                    She parked her metal machine on the edge of the gray expanse, her mind already halfway
                    down her shopping list. But as she stepped onto the pavement, a flicker of movement caught
                    her eye near a lonely concrete barrier.
                </p>

                <p class="story-paragraph">
                    It wasn't the frantic, joyful leap of a healthy squirrel. It was a slow, agonizing crawl.
                    A tiny tuft of gray fur was struggling against the heat of the sun-baked asphalt, dragging
                    a useless, broken back leg behind it.
                </p>
            </div>
        </div>
    </section>

    <section id="scene-2" class="scene">
        <div class="scene-number">2</div>
        <div class="scene-content">
            <h3 class="story-heading">The Compassion:<br /> The Kneeling Saint</h3>

            <div class="story-image-wrapper">
                <enhanced:img src={scene2} alt="Kneeling Saint" />
            </div>

            <div class="story-text-group">
                <p class="story-paragraph">
                    Helen stopped. The bustling world around her seemed to lose its audio, fading into a
                    quiet, heavy stillness. She knelt, her shadow falling over the tiny creature like a
                    cooling canopy.
                </p>

                <p class="story-paragraph">
                    The squirrel looked up with wide, obsidian eyes, its chest heaving with exhaustion. It was
                    terrified, hurt, and entirely stranded in a desert of human indifference.
                </p>

                <p class="story-paragraph">
                    "Hold on, little one," Helen whispered. But the ticking clock of the day pulled at her
                    sleeve. She had responsibilities that could not wait, groceries that would spoil, and no
                    safe way to carry a frightened, fragile patient just yet.
                </p>
            </div>
        </div>
    </section>

    <section id="scene-3" class="scene">
        <div class="scene-number">3</div>
        <div class="scene-content">
            <h3 class="story-heading">The Rescue:<br /> The Velvety Sanctuary</h3>

            <div class="story-image-wrapper">
                <enhanced:img src={scene3} alt="Velvety Sanctuary" />
            </div>

            <div class="story-text-group">
                <p class="story-paragraph">
                    With a heavy heart, she had to leave. For the next hour, as she walked through bright
                    supermarket aisles and stood in long lines, she didn't see the items on the shelves. She
                    only saw those two dark, frightened eyes on the hot pavement.
                </p>

                <p class="story-paragraph">
                    The moment her errands were complete, Helen raced back. The parking lot felt larger now,
                    more menacing. Fear tightened in her chest—what if she was too late? What if the metal
                    monsters had returned?
                </p>

                <p class="story-paragraph">
                    She scrambled to the concrete barrier. There, tucked into a sliver of shade, the tiny
                    squirrel remained, its strength nearly spent. It hadn't given up, because it was waiting
                    for her.
                </p>

                <p class="story-paragraph">
                    Gentale as a summer breeze, Helen wrapped the little traveler in a soft cloth and nestled
                    him into a makeshift sanctuary. She drove with absolute precision, treating every turn
                    like a promise, straight to the doors of the animal hospital.
                </p>
            </div>
        </div>
    </section>

    <section id="scene-4" class="scene">
        <div class="scene-number">4</div>
        <div class="scene-content">
            <h3 class="story-heading">The Epilogue:<br /> The Acorn Crown</h3>

            <div class="story-image-wrapper">
                <enhanced:img src={scene4} alt="The Epilogue" />
            </div>

            <div class="story-text-group">
                <p class="story-paragraph">
                    The healers took him in, promising that his branch-leaping days were far from over. And as
                    Helen walked back out into the evening air, the trees seemed to lean down, their leaves
                    rustling a new title into the wind: The Patron Saint of Squirrels.
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
        align-items: center;
        gap: 0.5rem;
        text-decoration: none;
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
