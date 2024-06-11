import { createRouter, createWebHistory } from 'vue-router'

const routes = createRouter({
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

export default routes
