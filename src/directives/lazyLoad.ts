import type { DirectiveBinding } from 'vue'

export default {
	mounted(el: HTMLImageElement, binding: DirectiveBinding) {
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						el.src = binding.value
						observer.unobserve(el)
					}
				})
			},
			{
				threshold: 0.1
			}
		)

		// 设置默认的占位图
		el.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'
		observer.observe(el)
	}
}
