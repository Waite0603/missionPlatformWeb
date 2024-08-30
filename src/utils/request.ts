import { UserToken } from '@/types/user'
import axios from 'axios'
import { formatTime } from './utils'

const request = axios.create({
	baseURL: '/api',
	timeout: 5000
})

const timeDeal: string[] = [
	'date_joined',
	'last_login',
	'create_time',
	'update_time'
]

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

// 数据响应拦截器
request.interceptors.response.use(
	(response) => {
		// 如果相应状态码为200，并且有 data 字段，处理其中的time数据
		console.log(response)
		if (response.status === 200 && response.data.data) {
			const data = response.data.data
			// 如果data是数组，遍历数组，处理其中的time数据
			if (Array.isArray(data)) {
				data.forEach((item) => {
					timeDeal.forEach((key) => {
						if (item[key]) {
							item[key] = formatTime(item[key])
						}
					})
				})
			}
			// 如果data是对象，处理其中的time数据
			else {
				timeDeal.forEach((key) => {
					if (data[key]) {
						data[key] = formatTime(data[key])
					}
				})
			}
		}

		return Promise.resolve(response)
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
