// src/lib/index.ts

// Actions
export { inViewport, scrollStory } from './actions';

// Components
export { default as AudioPlayer } from './components/AudioPlayer.svelte';
export { default as ClosingFooter } from './components/ClosingFooter.svelte';
export { default as HeroHeader } from './components/HeroHeader.svelte';
export { default as SquirrelProgress } from './components/SquirrelProgress.svelte';

// Utils & Types
export { SCENE_CONFIG } from './utils/scenes';
export type { SceneConfig, SceneId, SceneMetadata } from './utils/scenes';
