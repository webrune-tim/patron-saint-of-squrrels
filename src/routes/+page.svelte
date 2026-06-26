<script lang="ts">
  import { onMount } from "svelte";
  import { scrollStory } from "$lib/actions/scrollStory";
  import SquirrelProgress from "$lib/components/SquirrelProgress.svelte";

  import intro from "$lib/assets/images/intro.png?enhanced";
  import scene1 from "$lib/assets/images/scene-1-b.png?enhanced";
  import scene2 from "$lib/assets/images/scene-2-a.png?enhanced";
  import scene3 from "$lib/assets/images/scene-3.png?enhanced";
  import scene4 from "$lib/assets/images/scene-4.png?enhanced";
  import music from "$lib/assets/audio/music.mp3";

  // State
  let audioComponent = $state();
  let isAutoplayBlocked = $state(false);

  // Separate states: one for interaction, one for visibility
  let isScrolling = $state(false);
  let isInView = $state(false);

  // Reference for the viewport observer
  let scenesElement = $state();

  onMount(() => {
    if (audioComponent) {
      audioComponent.volume = 0.5;
    }
  });

  // Manage observer and scroll listener
  $effect(() => {
    if (!scenesElement) return;

    let scrollTimeout;

    const handleScrollState = () => {
      isScrolling = true;
      clearTimeout(scrollTimeout);
      scrollTimeout = window.setTimeout(() => {
        isScrolling = false;
      }, 100);
    };

    const observer = new IntersectionObserver(([entry]) => {
      isInView = entry.isIntersecting;

      if (entry.isIntersecting) {
        window.addEventListener("scroll", handleScrollState, { passive: true });
      } else {
        window.removeEventListener("scroll", handleScrollState);
      }
    });

    observer.observe(scenesElement);

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScrollState);
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
  <source src={music} type="audio/mpeg" />
</audio>

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
    >
      <path d="M12 5v14M19 12l-7 7-7-7" />
    </svg>
  </div>
{/if}

<div class="container">
  <header class="scene">
    <div class="scene-content center-content">
      <h1 class="story-heading">The Patron Saint of the Squirrels</h1>

      <div class="story-image-wrapper">
        <enhanced:img src={intro} alt="Introduction Scene" />
      </div>
    </div>

    <a class="story-paragraph start-btn" href="#intro" onclick={handleStart}>
      Start
    </a>
  </header>

  <section id="intro" class="scene center-content">
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
  <section bind:this={scenesElement}>
    <section id="scene-1" class="scene" use:scrollStory>
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
        </div>

        <div class="step">
          <div class="story-image-wrapper">
            <enhanced:img src={scene1} alt="The Gray Labyrinth" />
          </div>
        </div>
      </div>
    </section>

    <section id="scene-2" class="scene" use:scrollStory>
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
            <enhanced:img src={scene2} alt="Neon and Stone" />
          </div>
        </div>
      </div>
    </section>

    <section id="scene-3" class="scene" use:scrollStory>
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
            Gentle as a summer breeze, Helen wrapped the little traveler in a
            soft cloth and nestled him into a makeshift sanctuary. She drove
            with absolute precision, treating every turn like a promise,
            straight to the relative safety of her home.
          </p>
        </div>

        <div class="step">
          <p class="story-paragraph">
            Once home safe on Ellinwood Drive, Helen began searching for a
            secure place to keep the little soldier for the night, away from a
            menacing cat. A spot under her backyard deck, with a dog gate to
            separate the squirrel from the cat and other outdoor dangers, would
            do nicely until the morning.
          </p>
        </div>

        <div class="step">
          <div class="story-image-wrapper">
            <enhanced:img src={scene3} alt="Below the Sub-Basement" />
          </div>
        </div>
      </div>
    </section>

    <section id="scene-4" class="scene" use:scrollStory>
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
        </div>

        <div class="step">
          <div class="story-image-wrapper">
            <enhanced:img src={scene4} alt="Recompiling the World" />
          </div>
        </div>
      </div>
    </section>
  </section>

  <footer class="scene closing">
    <div class="closing-content">
      <span>
        Happy Birthday Helen!!<br />
        <span class="spinX">😘</span>
        <span class="spinX">🎉</span>
        <span class="spinX">🎂</span>
      </span>

      <span
        >I pray this year bring you<br />
        all the happiness you deserve.</span
      >

      <span
        >I love you,<br />
        Timmy One Sock</span
      >
    </div>
  </footer>
</div>

<style>
  :global(:root) {
    --isVisible: 0;
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

  .start-btn {
    display: block;
    width: fit-content;
    text-align: center;
    text-decoration: none;
    padding: var(--gap-xs) var(--gap-sm);
    margin: var(--gap-md) auto;
    border: 2px solid var(--color-text-primary);
    background-color: rgb(from var(--color-text-primary) r g b / 0.1);
    cursor:
      url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><text y="20" font-size="20">🌰</text></svg>')
        12 12,
      pointer;
  }

  .bounce-arrow {
    width: 24px;
    height: 24px;
    animation: bounce 2s infinite;
  }

  @keyframes bounce {
    0%,
    20%,
    50%,
    80%,
    100% {
      transform: translateY(0);
    }
    40% {
      transform: translateY(-8px);
    }
    60% {
      transform: translateY(-4px);
    }
  }

  .spinX {
    /* 1. Allows the transform calculation matrix to target the container */
    display: inline-block;
    /* 2. Uses an alternate direction or a 3-way keyframe loop for smoothness */
    animation: spinX 2s ease-in-out infinite;
  }

  @keyframes spinX {
    0%,
    100% {
      transform: scaleX(1);
    }
    50% {
      transform: scaleX(-1);
    }
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

  .closing {
    display: grid;
    place-content: center;

    .closing-content {
      display: flex;
      flex-direction: column;
      gap: var(--gap-sm);
      font-size: var(--text-md);
      text-align: center;
    }
  }

  footer {
    padding: var(--gap-sm);
    color: rgb(from var(--color-text-primary) r g b / 0.75);
  }
</style>
