// src/lib/actions/scrollStory.ts
export function scrollStory(node: HTMLElement) {
    const steps = [...node.querySelectorAll<HTMLElement>('.step')];
    const stepCount = steps.length;
    
    node.style.setProperty('--step-count', String(stepCount));

    function handleScroll() {
        const rect = node.getBoundingClientRect();
        const viewHeight = window.innerHeight;
        const totalScrollDistance = rect.height - viewHeight;
        
        if (totalScrollDistance <= 0) return;

        const scrolledDistance = -rect.top;
        const progress = Math.min(Math.max(scrolledDistance / totalScrollDistance, 0), 1);

        const activeIndex = Math.min(
            Math.floor(progress * stepCount),
            stepCount - 1
        );

        // Feed index into the CSS layer for the progress calculation loop
        node.style.setProperty('--active-step-index', String(activeIndex));

        steps.forEach((step, index) => {
            if (index === activeIndex) {
                step.classList.add('active');
            } else {
                step.classList.remove('active');
            }
        });
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    setTimeout(handleScroll, 0);

    return {
        destroy() {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', handleScroll);
        }
    };
}