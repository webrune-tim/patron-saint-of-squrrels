<script lang="ts">
  import { onMount } from "svelte";
  import { browser } from "$app/environment";
  import { scrollStory, SquirrelProgress } from "$lib";

  import intro from "$lib/assets/images/intro.png?enhanced";
  import scene1 from "$lib/assets/images/scene-1.png?enhanced";
  import scene2a from "$lib/assets/images/scene-2-a.png?enhanced";
  import scene2b from "$lib/assets/images/scene-2-b.png?enhanced";
  import scene3 from "$lib/assets/images/scene-3.png?enhanced";
  import scene4 from "$lib/assets/images/scene-4.png?enhanced";
  import music from "$lib/assets/audio/music.mp3";

  // State
  let audioComponent = $state() as HTMLAudioElement | undefined;
  let isAutoplayBlocked = $state(false);
  let isScrolling = $state(false);
  let isInView = $state(false);
  let isStoryStarted = $state(false);

  let scenesElement = $state() as HTMLElement | undefined;
  let footerElement = $state() as HTMLElement | undefined;
  let hasFiredConfetti = $state(false);

  onMount(() => {
    if (audioComponent) {
      audioComponent.volume = 0.35;
    }
  });

  // Manage viewport tracker and smooth parallax scroll listener
  $effect(() => {
    if (!browser || !scenesElement) return;

    let scrollTimeout: number | undefined;

    // Gather all interactive image components for mobile timeline injection
    const imageWrappers = scenesElement.querySelectorAll('.story-image-wrapper');

    const handleScrollState = () => {
      isScrolling = true;
      clearTimeout(scrollTimeout);
      scrollTimeout = window.setTimeout(() => {
        isScrolling = false;
      }, 100);


      // --- iOS Safari Smooth Viewport Progress Engine ---
      imageWrappers.forEach((wrapper) => {
        const rect = wrapper.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        // Total scrollable span from entering screen bottom to leaving screen top
        const totalRange = windowHeight + rect.height;
        const currentProgress = windowHeight - rect.top;

        // Clamp the progress ratio safely between 0 and 1
        let ratio = currentProgress / totalRange;
        ratio = Math.max(0, Math.min(1, ratio));

        // Inject the ratio as a live style property directly into the node
        (wrapper as HTMLElement).style.setProperty('--scroll-ratio', ratio.toString());
      });
    };

    const observer = new IntersectionObserver(([entry]) => {
      isInView = entry.isIntersecting;

      if (entry.isIntersecting) {
        window.addEventListener("scroll", handleScrollState, { passive: true });
        handleScrollState(); // Force structural pass on initial trigger frame
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

  // Confetti intersection observer
  $effect(() => {
    if (!browser || !footerElement) return;

    const footerObserver = new IntersectionObserver(
      async ([entry]) => {
        if (entry.isIntersecting && !hasFiredConfetti) {
          try {
            const module = await import("@hiseb/confetti");
            const confetti = module.default;

            confetti({
              particleCount: 150,
              spread: 80,
              origin: { y: 0.8 },
              colors: ['#f7f4eb', '#3d5a45', '#8b5a2b', '#a2b997']
            } as any);
            hasFiredConfetti = true;
          } catch (err) {
            console.error("Confetti dynamic initialization failure:", err);
          }
        } else if (!entry.isIntersecting) {
          hasFiredConfetti = false;
        }
      },
      { threshold: 0.1 }
    );

    footerObserver.observe(footerElement);

    return () => {
      footerObserver.disconnect();
    };
  });

  const handleStart = (e: MouseEvent) => {
    e.preventDefault();
    if (audioComponent) {
      audioComponent.play()
        .then(() => {
          isStoryStarted = true;
          isAutoplayBlocked = false;
          document.getElementById("intro")?.scrollIntoView({ behavior: "smooth" });
        })
        .catch((err) => {
          console.error("Audio playback intercepted:", err);
          isAutoplayBlocked = true;
          isStoryStarted = true;
          document.getElementById("intro")?.scrollIntoView({ behavior: "smooth" });
        });
    }
  };
</script>

<audio bind:this={audioComponent} loop preload="auto">
  <source src={music} type="audio/mpeg" />
</audio>

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
      >
        <path d="M12 5v14M19 12l-7 7-7-7" />
      </svg>
    </div>
  {/if}

  <div class="container">
    <header class="scene center-content">
      <div class="scene-content">
        <h1 class="story-heading">The Patron Saint of the Squirrels</h1>

        <div class="story-image-wrapper intro-pic">
          <enhanced:img
            src={intro}
            alt="A realistic photograph of a smiling woman with dark curly hair lying down on a parking lot asphalt, wearing an elegant teal velvet robe with gold embroidery, gently feeding a red squirrel from her open hands."
          />
        </div>
      </div>

      <a class="story-paragraph start-btn" href="#intro" onclick={handleStart}>
        {isStoryStarted ? "Playing ♪" : "Start"}
      </a>
    </header>

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
          </div>

          <div class="step">
            <div class="story-image-wrapper">
              <enhanced:img
                src={scene3}
                alt="A vertical, comic-style illustration looking straight down through the thick metal bars of a closed animal crate. Inside, huddled safely on bundles of dark cloth, a small cluster of baby red squirrels rests together amidst a couple of scattered oak leaves and a soft, magical green glow with floating fireflies."
              />
            </div>
          </div>
        </div>
      </section>

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
          </div>

          <div class="step">
            <div class="story-image-wrapper" id="scene-4-wrapper">
              <enhanced:img
                src={scene4}
                alt="A comic-style illustration of a smiling woman standing outside a building labeled 'HOSPITAL' at twilight. She features a glowing neon green oak leaf halo over her head, framed by an archway of trees filled with fireflies and squirrels."
              />
            </div>
          </div>
        </div>
      </section>
    </div>

    <footer bind:this={footerElement} class="scene closing">
      <div class="closing-content">
        <span>
          Happy Birthday Helen!!<br />
          <span class="spinX">🐿️</span>
          <span class="spinX">😘</span>
          <span class="spinX">🎉</span>
          <span class="spinX">🎂</span>
          <span class="spinX">🐿️</span>
        </span>

        <span>I pray this year bring you<br />all the happiness you deserve.</span>
        <span>I love you,<br />Timmy One Sock</span>
      </div>
    </footer>
  </div>
{/if}

<style>
  /* --- Layout & Typography Core --- */
  .container { display: flex; flex-direction: column; width: 100%; margin: 0 auto; box-sizing: border-box; }
  /* .scene { min-height: 100dvh; display: flex; flex-direction: column; justify-content: center; align-items: center; padding: var(--gap-xl) var(--gap-md); } */

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

  /* --- Advanced Image Layout & Parallax Engine --- */
  .bg-green .story-image-wrapper { --vignette-color: var(--dark-green); }
  .bg-grey .story-image-wrapper { --vignette-color: var(--dark-grey); }

  /* .story-image-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    max-width: 500px;
    margin: var(--gap-md) auto;
    max-height: 70svh;
    position: relative;
    overflow: hidden;
    border-radius: 12px;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.65);
    background-color: #0b0b0b;
    --scroll-ratio: 0.5;
  } */

  .story-image-wrapper.intro-pic {
    height: 60dvh;
    width: auto;
    aspect-ratio: 3 / 4;
  }

  .story-image-wrapper :global(picture) {
    display: block;
    width: 100%;
    height: 100%;
  }

  .story-image-wrapper :global(img) {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    position: relative;
    z-index: 1;
    will-change: transform, filter;

    /* Mobile WebKit/Safari Optimized Frame Transformations */
    transform:
      scale(calc(1.18 - (var(--scroll-ratio) * 0.12)))
      translateY(calc(-30px + (var(--scroll-ratio) * 60px)));

    filter: saturate(calc(0.8 + (var(--scroll-ratio) * 0.3)));
    transition: transform 0.1s cubic-bezier(0.25, 1, 0.5, 1), filter 0.1s linear;
  }

  /* Deeply Blended Radial Vignette Mask */
  .story-image-wrapper {
    display: flex; justify-content: center; align-items: center; width: 100%; max-width: 500px; margin: var(--gap-md) auto;
    position: relative; overflow: hidden; border-radius: 12px; box-shadow: 0 20px 40px rgba(0, 0, 0, 0.65);
    background-color: var(--vignette-color, #0b0b0b); --scroll-ratio: 0.5;
  }

  .story-image-wrapper::after {
    content: ""; position: absolute; inset: 0; z-index: 2; pointer-events: none; border-radius: 12px;
    background: radial-gradient(circle, transparent calc(42% + (var(--scroll-ratio) * 15%)), oklch(from var(--vignette-color, #0b0b0b) l c h / 0.5) 75%, var(--vignette-color, #0b0b0b) 100%);
    transition: background 0.1s linear;
  }

  /* Scoped Dynamic Clip Shape Modulations for Scene 4 Crown Frame */
  #scene-4-wrapper :global(img) {
    will-change: transform, filter, clip-path;
    clip-path: inset(
      calc(5% * (1 - var(--scroll-ratio)))
      calc(5% * (1 - var(--scroll-ratio)))
      calc(5% * (1 - var(--scroll-ratio)))
      calc(5% * (1 - var(--scroll-ratio)))
      round 16px
    );
    transition: transform 0.1s cubic-bezier(0.25, 1, 0.5, 1), clip-path 0.1s ease-out;
  }

  /* --- Interactive Canvas Elements & Animations --- */
  .start-btn {
    position: relative;
    z-index: 10;
    display: block;
    width: fit-content;
    text-align: center;
    text-decoration: none;
    color: var(--color-text-primary);
    padding: var(--gap-sm) var(--gap-md);
    margin: var(--gap-md) auto;
    border-radius: 1000px;
    border: 2px solid var(--color-text-primary);
    background-color: rgb(from var(--color-text-primary) r g b / 0.4);
    box-shadow: 0 15px 17px rgba(0, 0, 0, 0.5);
    text-shadow: 0px 0px 5px rgba(0, 0, 0, 0.7);
    cursor:
      url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><text y="20" font-size="20">🐿️</text></svg>')
        12 12,
      pointer;
    transition: background-color 0.2s ease, box-shadow 0.2s ease;
  }

  .start-btn:hover {
    box-shadow: 0 7px 8px rgba(0, 0, 0, 0.5);
    background-color: rgb(from var(--color-text-primary) r g b / 0.55);
  }

  .bounce-arrow {
    width: 24px;
    height: 24px;
    animation: bounce 2s infinite;
  }

  .spinX {
    display: inline-block;
    animation: spinX 2s ease-in-out infinite;
  }

  /* --- Global Floating Prompts --- */
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

  /* --- Outro & Footer Sequences --- */
  .closing {
    display: grid;
    place-content: center;
  }

  .closing-content {
    display: flex;
    flex-direction: column;
    gap: var(--gap-sm);
    font-size: var(--text-md);
    text-align: center;
  }

  footer {
    padding: var(--gap-sm);
    color: var(--color-text-primary);
  }

  /* --- Keyframes Engine --- */
  @keyframes bounce {
    0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
    40% { transform: translateY(-10px); }
    60% { transform: translateY(-5px); }
  }

  @keyframes spinX {
    0% { transform: rotateY(0deg); }
    50% { transform: rotateY(180deg); }
    100% { transform: rotateY(360deg); }
  }
</style>
