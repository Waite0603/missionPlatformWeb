import { createRouter, createWebHistory } from 'vue-router'

const routes = createRouter({
	history: createWebHistory(),
	routes: [
		{
			path: '/login',
			name: 'Login',
			component: () => import('@/views/Login.vue')
		},
		{
			path: '/register',
			name: 'Register',
			component: () => import('@/views/Register.vue')
		}
	]
})

export default routes
