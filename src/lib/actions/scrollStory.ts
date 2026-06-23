// lib/actions/scrollStory.ts
export function scrollStory(node: HTMLElement) {
	const steps = [...node.querySelectorAll<HTMLElement>('.step')];
	const stepCount = steps.length;
	
	// Automatically handle the height layout dynamically
	node.style.setProperty('--step-count', String(stepCount));

	function handleScroll() {
		const rect = node.getBoundingClientRect();
		const viewHeight = window.innerHeight;

		// Calculate total distance the element tracks (from sticking to unsticking)
		const totalScrollDistance = rect.height - viewHeight;
		
		if (totalScrollDistance <= 0) return;

		// Quantize current progress between 0 and 1
		const scrolledDistance = -rect.top;
		const progress = Math.min(Math.max(scrolledDistance / totalScrollDistance, 0), 1);

		// Determine current active step index based on progress distribution
		const activeIndex = Math.min(
			Math.floor(progress * stepCount),
			stepCount - 1
		);

		steps.forEach((step, index) => {
			if (index === activeIndex) {
				step.classList.add('active');
			} else {
				step.classList.remove('active');
			}
		});
	}

	// Attach passive listeners for maximum performance
	window.addEventListener('scroll', handleScroll, { passive: true });
	window.addEventListener('resize', handleScroll, { passive: true });
	
	// Initialize position immediately on mount
	setTimeout(handleScroll, 0);

	return {
		destroy() {
			window.removeEventListener('scroll', handleScroll);
			window.removeEventListener('resize', handleScroll);
		}
	};
}