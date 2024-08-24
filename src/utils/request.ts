import { UserToken } from '@/types/user'
import axios from 'axios'

const request = axios.create({
	baseURL: '/api',
	timeout: 5000
})

// 数据请求拦截器
request.interceptors.request.use(
	(config) => {
		const token: UserToken | null = localStorage.getItem(
			'token'
		) as UserToken | null
		if (token) {
			config.headers['Authorization'] = `${token['access']}`
			config.headers['Refresh'] = `${token['refresh']}`
		}
		return config
	},
	(error) => {
		return Promise.reject(error)
	}
)

// 封装请求方法
export const get = (url: string, params?: object) => {
	return request.get(url, { params })
}

export const post = (url: string, data: object) => {
	return request.post(url, data)
}
