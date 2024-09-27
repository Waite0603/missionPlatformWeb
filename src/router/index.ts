import {
	createRouter,
	createWebHistory,
	RouteLocationNormalized
} from 'vue-router'
import { i18n } from '@/lang/index'

const $t = i18n.global.t

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
					name: $t('layout.login'),
					component: () => import('@/views/auth/Login.vue')
				},
				{
					path: 'register',
					name: $t('layout.register'),
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
					name: $t('layout.home'),
					component: () => import('@/views/home/Index.vue')
				},
				{
					path: 'articles',
					name: $t('layout.article'),
					component: () => import('@/views/article/Index.vue')
				},
				{
					path: 'article/detail/:id',
					name: 'articleDetail',
					component: () => import('@/views/article/detail/Index.vue')
				},
				{
					path: 'contact',
					name: 'contact',
					component: () => import('@/views/contact/Index.vue')
				},
				{
					path: 'vip',
					name: 'vip',
					component: () => import('@/views/vip/Index.vue')
				},
				{
					path: 'user',
					name: 'user',
					component: () => import('@/views/user/Index.vue'),
					children: [
						{
							path: 'profile',
							name: 'profile',
							component: () => import('@/views/user/profile/Index.vue')
						}
					]
				},
				{
					path: 'course',
					name: 'course',
					component: () => import('@/views/course/Index.vue')
				},
				{
					path: 'course/:id',
					name: 'courseDetail',
					component: () => import('@/views/course/detail/Index.vue')
				},
				{
					path: 'course/detail/:id/:videoId',
					name: 'courseVideo',
					component: () => import('@/views/course/videoWatch/Index.vue')
				},
				{
					path: 'search',
					name: 'search',
					component: () => import('@/views/search/Index.vue')
				}
			]
		},
		{
			path: '/:pathMatch(.*)*',
			name: 'notFound',
			component: () => import('@/views/Error/404NoFound.vue')
		}
	]
})

router.beforeEach(
	(
		to: RouteLocationNormalized,
		from: RouteLocationNormalized,
		next: () => void
	) => {
		if (to.name) {
			document.title = String(to.name)
		}
		next()
	}
)

export default router
