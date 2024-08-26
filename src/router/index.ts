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
		},
		{
			path: '/',
			name: 'home',
			component: () => import('@/views/Index.vue'),
			children: [
				{
					path: '',
					name: 'home',
					component: () => import('@/views/home/Index.vue')
				},
				{
					path: 'article/detail/:id',
					name: 'articleDetail',
					component: () => import('@/views/article/detail/Index.vue')
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
