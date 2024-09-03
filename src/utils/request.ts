import { UserToken } from '@/types/user'
import axios from 'axios'
import { formatTimeData } from './utils'

const request = axios.create({
	baseURL: '/api',
	timeout: 5000
})

// 数据请求拦截器
request.interceptors.request.use(
	(config) => {
		const token: UserToken | null = JSON.parse(
			localStorage.getItem('token') || 'null'
		)
		if (token) {
			config.headers['Authorization'] = `${token.access}`
			config.headers['Refresh'] = `${token.refresh}`
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
		if (response.status === 200 && response.data.data) {
			formatTimeData(response.data.data)
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

// 上传文件
export const upload = (url: string, data: FormData) => {
	return request.post(url, data, {
		headers: {
			'Content-Type': 'multipart/form-data'
		}
	})
}
