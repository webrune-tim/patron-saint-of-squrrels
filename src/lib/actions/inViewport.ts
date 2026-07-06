export function inViewport(node: HTMLElement, callback: (isVisible: boolean) => void) {
    const observer = new IntersectionObserver(
        ([entry]) => callback(entry.isIntersecting),
        { threshold: 0.5 } // Trigger when 50% of the scene is visible
    );

    observer.observe(node);
    return {
        destroy: () => observer.disconnect()
    };
}