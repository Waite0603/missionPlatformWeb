import {
	createRouter,
	createWebHistory,
	RouteLocationNormalized
} from 'vue-router'

const router = createRouter({
	history: createWebHistory(),
	routes: [
		{
			path: '/auth',
			name: 'auth',
			component: () => import('@/views/auth/Index.vue'),
			children: [
				{
					path: 'login',
					name: 'login',
					component: () => import('@/views/auth/Login.vue')
				},
				{
					path: 'register',
					name: 'register',
					component: () => import('@/views/auth/Register.vue')
				}
			]
		}
	]
})

router.beforeEach(
	(
		to: RouteLocationNormalized,
		from: RouteLocationNormalized,
		next: () => void
	) => {
		console.log(from, document)
		console.log(to)
		if (to.name) {
			document.title = String(to.name)
		}
		next()
	}
)

export default router
