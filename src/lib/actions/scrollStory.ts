// src/lib/actions/scrollStory.ts
export default function scrollStory(node: HTMLElement) {
	const steps = [...node.querySelectorAll<HTMLElement>('.step')];
	const stepCount = steps.length;

	node.style.setProperty('--step-count', String(stepCount));

	let ticking = false;

	function handleScroll() {
		const rect = node.getBoundingClientRect();
		const viewHeight = window.innerHeight;
		const totalScrollDistance = rect.height - viewHeight;

		if (totalScrollDistance <= 0) return;

		const scrolledDistance = -rect.top;
		const progress = Math.min(
			Math.max(scrolledDistance / totalScrollDistance, 0),
			1
		);

		const activeIndex = Math.min(
			Math.floor(progress * stepCount),
			stepCount - 1
		);

		node.style.setProperty('--active-step-index', String(activeIndex));

		steps.forEach((step, index) => {
			if (index === activeIndex) {
				step.classList.add('active');
			} else {
				step.classList.remove('active');
			}
		});
	}

	function requestTick() {
		if (!ticking) {
			requestAnimationFrame(() => {
				handleScroll();
				ticking = false;
			});
			ticking = true;
		}
	}

	window.addEventListener('scroll', requestTick, { passive: true });
	window.addEventListener('resize', requestTick, { passive: true });

	requestAnimationFrame(handleScroll);

	return {
		destroy() {
			window.removeEventListener('scroll', requestTick);
			window.removeEventListener('resize', requestTick);
		}
	};
}
