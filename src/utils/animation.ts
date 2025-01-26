export interface ScrollAnimationOptions {
	threshold?: number // Percentage of element visible before triggering
	animation?: string // Animation class to apply
	delay?: number // Delay before animation starts (ms)
}

export function setupScrollAnimation(element: HTMLElement, options: ScrollAnimationOptions = {}) {
	const {
		threshold = 0.3,
		animation = 'slide-up',
		delay = 0
	} = options

	const observer = new IntersectionObserver(
		(entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					setTimeout(() => {
						element.classList.add('animate', animation)
					}, delay)
					observer.unobserve(element)
				}
			})
		},
		{
			threshold
		}
	)

	element.classList.add('animate-init')
	observer.observe(element)

	return () => observer.unobserve(element)
}
