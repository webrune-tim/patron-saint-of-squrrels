<script lang="ts">
    /* eslint-disable no-undef */
    let { sceneId }: { sceneId: 'scene-1' | 'scene-2' | 'scene-3' | 'scene-4' } = $props();

    /* eslint-disable no-undef */
    const paths = {
        'scene-1': "M 0 50 L 1000 50", 
        'scene-2': "M 0 50 Q 125 10, 250 50 Q 375 10, 500 50 Q 625 10, 750 50 Q 875 10, 1000 50", 
        'scene-3': "M 0 50 Q 125 -20, 250 50 Q 375 -20, 500 50 Q 625 -20, 750 50 Q 875 -20, 1000 50", 
        'scene-4': "M 0 50 Q 125 -80, 250 50 Q 375 -80, 500 50 Q 625 -80, 750 50 Q 875 -80, 1000 50" 
    };
</script>

<div class="squirrel-track-wrapper">
    <div 
        class="squirrel-avatar" 
        style="offset-path: path('{paths[sceneId]}');"
    >
        🐿️
    </div>
</div>

<style>
    .squirrel-track-wrapper {
        position: absolute;
        top: var(--gap-lg);
        left: 0;
        width: 100%;
        height: 120px; 
        pointer-events: none;
        overflow: visible;
        z-index: 5;
    }

    .squirrel-avatar {
        position: absolute;
        font-size: 2.2rem;
        width: max-content;
        height: max-content;
        
        transform: scaleX(-1); 
        transform-origin: center center;

        /* Pulls active values directly from your scroll action state */
        offset-distance: calc((var(--active-step-index, 0) + 1) / var(--step-count, 1) * 100%);
        offset-rotate: 0deg; 
        
        transition: offset-distance 0.5s cubic-bezier(0.25, 1, 0.5, 1);
    }
</style>